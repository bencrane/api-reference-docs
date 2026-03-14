# TwiML Message - `<Message>`

> **Warning**
> This TwiML Verb is not currently available when using Twilio Regions Ireland (IE1) or Australia (AU1). This is currently only supported with the default US1 region. A full list of unsupported products and features with Twilio Regions is documented in the Global Infrastructure docs.

The `<Message>` verb sends a message to a phone number.

## Verb Attributes

The `<Message>` verb supports the following attributes that modify its behavior:

| Attribute Name | Allowed Values | Default Value |
|----------------|----------------|---------------|
| to | phone number | see below |
| from | phone number, 1-11 character string (A-Z, a-z, 0-9) | see below |
| statusCallback | relative or absolute URL | none |
| action | relative or absolute URL | none |
| method | GET, POST | POST |

### to

The 'to' attribute takes a valid phone number as an argument. Twilio will send the message to the number provided. If no 'to' attribute is provided, Twilio sends the message as a reply to the current sender.

Phone numbers should be formatted with a '+' and country code e.g., +16175551212 (E.164 format). For 'to' numbers without a '+', Twilio will use the same country code as the 'from' number. Twilio will also attempt to handle locally formatted numbers for that country code (e.g. (415) 555-1212 for US, 07400123456 for GB). If you are sending to a different country than the 'from' number, you must include a '+' and the country code to ensure proper delivery.

> **Warning**
> If you have a trial account, the to phone number must be verified with Twilio. But you don't need to specify the to attribute to just send a message reply to the current sender.

### from

The 'from' attribute takes a valid phone number or alphanumeric sender ID as an argument. If a phone number is used, it must be a number that you've purchased from or ported to Twilio.

Alphanumeric sender IDs can only be used when sending messages to countries where the feature is supported. Alphanumeric sender IDs are limited to 11 characters. Accepted characters include both upper- and lower-case ASCII letters, the digits 0 through 9, and space: [A-Za-z0-9]. The sender ID must represent or be associated with your company brand.

When sending a message in response to an incoming message, 'from' defaults to the Twilio number that received the message. If you specify a 'from' value, it must be a message-capable local phone number assigned to your account. If the phone number isn't message-capable, then `<Message>` will not send a message.

### statusCallback

The 'statusCallback' attribute takes a URL as an argument. Like the StatusCallback parameter when sending an outbound message via the REST API, this URL will receive an HTTP request with the status of a message sent in response to an inbound message.

The possible statuses for a message are queued, failed, sent, delivered, or undelivered. Twilio will send the MessageSid along with the other standard request parameters as well as MessageStatus and ErrorCode. Non-relative URLs must contain a valid hostname (underscores are not permitted).

The HTTP method used to make the request is configured in the method property.

> **Warning**
> **Behavior differences between statusCallback and action attributes**
>
> Historically, Twilio has processed the `<Message>` verb on a TwiML response differently depending on whether the inbound message triggering the webhook was SMS or MMS. For inbound MMS messages, an attribute of statusCallback was used to specify the URL at which you would receive status updates for that reply. For other inbound messages (SMS, WhatsApp, etc.) the action attribute is used to specify the status callback URL. Certain accounts have historic configuration where the action attribute is ignored and statusCallback is used for all messages.
>
> In the future Twilio will be removing this complexity and normalizing behavior of these attributes. Until then, if you want to specify a custom status callback URL, it is recommended to set both the statusCallback and the action attributes with the same URL value. Setting different values should be avoided as it would represent undefined behavior subject to change without notice.

### action

The 'action' attribute takes a URL as an argument. Like the StatusCallback parameter when sending an outbound message via the REST API, this URL will receive an HTTP request with the status of a message sent in response to an inbound message.

The possible statuses for a message are queued, failed, sent, delivered, or undelivered. Twilio will send the MessageSid along with the other standard request parameters as well as MessageStatus and ErrorCode. Non-relative URLs must contain a valid hostname (underscores are not permitted).

The HTTP method used to make the request is configured in the method property.

**Request Parameters**

Twilio will pass the MessageStatus parameter in addition to the standard TwiML Message request parameters with its request to the 'action' URL.

### method

The 'method' attribute takes the value GET or POST. This tells Twilio whether to request the action URL via HTTP GET or POST. This attribute is modeled after the HTML form 'method' attribute. POST is the default value.

**Request Parameters**

Twilio will pass the MessageStatus parameter in addition to the standard TwiML Message request parameters with its request to the 'statusCallback' URL.

### MessageStatus parameter

The MessageStatus parameter is sent with requests to the action URL or to the statusCallback URL. The parameter contains more information about the status of the message - whether it was successfully sent, or whether delivery failed (the number was invalid, or there was no message body, etc.)

| Parameter | Description |
|-----------|-------------|
| MessageStatus | The current status of the message. Either queued, sending, sent, or failed |

## Nouns

The "noun" of a TwiML verb is the stuff nested within the verb that's not a verb itself; it's the stuff the verb acts upon. These are the nouns for `<Message>`:

| Noun | Description |
|------|-------------|
| plain text | The text of the message you want to send. Must be less than 1600 characters. |
| `<Body>` | The text of the message you want to send. Must be less than 1600 characters. If more than one `<Body>` element is used in a single `<Message>` the contents of the two will be concatenated together into a single Body value. |
| `<Media>` | A nested XML element that indicates the URL of an image to be sent in the message. If you wish to send more than one image, include more than one `<Media>` element. The maximum number of `<Media>` that can be included in a given message is 10. |

> **Info**
> Want to send a message without waiting for an inbound message? See our outbound message documentation.

## Examples

### Example 1: Sending an SMS

Here, Twilio sends an SMS with the location of your wonderful retail establishment.

```python
from twilio.twiml.messaging_response import Message, MessagingResponse

response = MessagingResponse()
response.message('Store Location: 123 Easy St.')

print(response)
```

**Output:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>
        Store Location: 123 Easy St.
    </Message>
</Response>
```

### Example 2: Sending a Message with Media (MMS)

To add a picture to the message, you can specify a URL with the Media noun. You can also enclose the body in the Body noun. If you specify one or more Media nouns, the Body is optional.

```python
from twilio.twiml.messaging_response import Body, Media, Message, MessagingResponse

response = MessagingResponse()
message = Message()
message.body('Store Location: 123 Easy St.')
message.media('https://demo.twilio.com/owl.png')
response.append(message)

print(response)
```

**Output:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>
        <Body>Store Location: 123 Easy St.</Body>
        <Media>https://demo.twilio.com/owl.png</Media>
    </Message>
</Response>
```

### Example 3: MessageStatus reporting

In this use case, the 'action' and 'method' attributes are used. Now when the message is queued for delivery, Twilio will request the 'action' URL passing the parameter 'MessageStatus'. If the messages are queued and waiting to be sent, 'MessageStatus' will have the value 'sending'. If an invalid attribute was provided, then 'MessageStatus' will be 'invalid'.

Your web application can look at the 'MessageStatus' parameter and decide what TwiML to return.

If an 'action' URL is provided for `<Message>`, the flow of your application will continue with the TwiML received in response to the 'action' request. All verbs remaining in the document will be unreachable and ignored.

```python
from twilio.twiml.messaging_response import Message, MessagingResponse

response = MessagingResponse()
response.message(
    'Store Location: 123 Easy St.', action='/SmsHandler.php', method='POST'
)

print(response)
```

**Output:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message action="/SmsHandler.php" method="POST">
        Store Location: 123 Easy St.
    </Message>
</Response>
```

## Nesting Rules

You can't nest any verbs within `<Message>` and you can't nest `<Message>` in any other verbs. The only elements that can be nested within a `<Message>` are the nouns `<Body>` and `<Media>`.

Nest nouns inside a `<Message>` verb like so:

```python
from twilio.twiml.messaging_response import Body, Media, Message, MessagingResponse

response = MessagingResponse()
message = Message()
message.body('Hello friend')
message.media('https://demo.twilio.com/owl.png')
response.append(message)

print(response)
```

**Output:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>
        <Body>Hello friend</Body>
        <Media>https://demo.twilio.com/owl.png</Media>
    </Message>
</Response>
```