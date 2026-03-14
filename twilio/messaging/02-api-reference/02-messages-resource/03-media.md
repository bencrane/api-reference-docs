# Media subresource

Media is a subresource of Messages and represents a piece of media, such as an image, that is associated with a Message.

Twilio creates a Media subresource and stores the contents of the media when the following events occur:

- You send an MMS with an image via Twilio.
- You send a WhatsApp message with an image via Twilio.
- You receive media in a message sent to one of your Twilio numbers or messaging channel addresses.

Twilio retains the stored media until you delete the related Media subresource instance.

To secure access to media stored on Twilio, you can enable HTTP basic authentication in the Console settings for Programmable Messaging.

> **Warning:** Messages sent via Twilio can include up to 10 media files that have a total size of up to 5MB. Twilio resizes images as necessary for successful delivery based on carrier specifications. Messages with over 5MB of media will not be accepted.

## Medium Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `account_sid` | SID\<AC\> | Optional | Not PII | The SID of the Account associated with this Media resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `content_type` | string | Optional | Not PII | The default MIME type of the media, for example image/jpeg, image/png, or image/gif. |
| `date_created` | string\<date-time-rfc-2822\> | Optional | Not PII | The date and time in GMT when this Media resource was created, specified in RFC 2822 format. |
| `date_updated` | string\<date-time-rfc-2822\> | Optional | Not PII | The date and time in GMT when this Media resource was last updated, specified in RFC 2822 format. |
| `parent_sid` | SID\<SM\|MM\> | Optional | Not PII | The SID of the Message resource that is associated with this Media resource. Pattern: `^(SM|MM)[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `sid` | SID\<ME\> | Optional | Not PII | The unique string that identifies this Media resource. Pattern: `^ME[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `uri` | string | Optional | Not PII | The URI of this Media resource, relative to https://api.twilio.com. |

---

## Retrieve Media

```
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media/{Sid}.json
```

Returns a single Media subresource using one of several representations:

- content-type
- XML
- JSON

### Default: content-type

Without an extension, the media is returned using the mime-type provided when the media was generated.

```
GET /2010-04-01/Accounts/AC.../Message/MM.../Media/ME557ce644e5ab84fa21cc21112e22c485
```

### Alternative: XML

Appending ".xml" to the URI returns a familiar XML representation. For example:

```
GET /2010-04-01/Accounts/AC.../Message/MM.../Media/ME557ce644e5ab84fa21cc21112e22c485.xml
```

```xml
<TwilioResponse>
 <Media>
   <Sid>ME557ce644e5ab84fa21cc21112e22c485</Sid>
   <AccountSid>ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</AccountSid>
   <ParentSid>MM8dfedb55c129dd4d6bd1f59af9d11080</ParentSid>
   <ContentType>image/jpeg</ContentType>
   <DateCreated>Fri, 17 Jul 2009 01:52:49 +0000</DateCreated>
   <DateUpdated>Fri, 17 Jul 2009 01:52:49 +0000</DateUpdated>
   <Uri>/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Message/MM8dfedb55c129dd4d6bd1f59af9d11080/Media/ME557ce644e5ab84fa21cc21112e22c485.xml</Uri>
 </Media>
</TwilioResponse>
```

### Alternative: JSON

Appending ".json" to the URI returns a familiar JSON representation. For example:

```
GET /2010-04-01/Accounts/AC.../Message/MM.../Media/ME557ce644e5ab84fa21cc21112e22c485.json
```

```json
{
    "sid": "ME557ce644e5ab84fa21cc21112e22c485",
    "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "parent_sid": "MM8ff928b2451c0db925bd2d581f0fba79",
    "content_type": "image/jpeg",
    "date_created": "Fri, 26 Apr 2013 05:41:35 +0000",
    "date_updated": "Fri, 26 Apr 2013 05:41:35 +0000",
    "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Message/MM8dfedb55c129dd4d6bd1f59af9d11080/Media/ME557ce644e5ab84fa21cc21112e22c485.json"
}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `account_sid` | SID\<AC\> | required | Not PII | The SID of the Account associated with the Media resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `message_sid` | SID\<SM\|MM\> | required | Not PII | The SID of the Message resource that is associated with the Media resource. Pattern: `^(SM|MM)[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `sid` | SID\<ME\> | required | Not PII | The Twilio-provided string that uniquely identifies the Media resource to fetch. Pattern: `^ME[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

> **Info:** Because the stored media URLs are useful for many external applications, they are public and do not require HTTP Basic Auth to access. This allows you to embed the URL in a web application without revealing your Twilio API credentials.
>
> If you have a need to restrict access to media stored with Twilio, you can enable HTTP Auth in the Console settings. When you fetch your Message Media after enabling HTTP auth, you will be directed to a signed URL that is only valid for 4 hours.
>
> You can make subsequent API requests for new short-lived URLs for your media at any time.

### Fetch a Medium

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

media = (
    client.messages("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .media("MEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(media.account_sid)
```

**Response:**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "content_type": "image/jpeg",
  "date_created": "Sun, 16 Aug 2015 15:53:54 +0000",
  "date_updated": "Sun, 16 Aug 2015 15:53:55 +0000",
  "parent_sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "MEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media/MEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

---

## Retrieve a list of Media

```
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media.json
```

Returns a list of Media associated with your Message. The list includes paging information.

### Retrieve a list of Media associated with a Message

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

media = client.messages("MMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").media.list(
    limit=20
)

for record in media:
    print(record.account_sid)
```

**Response:**

```json
{
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json?DateCreated%3E=2008-01-02&PageSize=50&Page=0",
  "media_list": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "content_type": "image/jpeg",
      "date_created": "Sun, 16 Aug 2015 15:53:54 +0000",
      "date_updated": "Sun, 16 Aug 2015 15:53:55 +0000",
      "parent_sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "MEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media/MEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
    }
  ],
  "next_page_uri": null,
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json?DateCreated%3E=2008-01-02&PageSize=50&Page=0"
}
```

### Filter by date created

You may limit the list of Message Media to media created on a given date. Provide the following query string parameter to your API call:

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `account_sid` | SID\<AC\> | required | Not PII | The SID of the Account that is associated with the Media resources. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `message_sid` | SID\<SM\|MM\> | required | Not PII | The SID of the Message resource that is associated with the Media resources. Pattern: `^(SM|MM)[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `date_created` | string\<date-time\> | Optional | Not PII | Only include Media resources that were created on this date. Specify a date as YYYY-MM-DD in GMT, for example: 2009-07-06, to read Media that were created on this date. You can also specify an inequality, such as StartTime<=YYYY-MM-DD, to read Media that were created on or before midnight of this date, and StartTime>=YYYY-MM-DD to read Media that were created on or after midnight of this date. |
| `date_created_before` | string\<date-time\> | Optional | Not PII | Only include Media resources that were created on this date. Specify a date as YYYY-MM-DD in GMT, for example: 2009-07-06, to read Media that were created on this date. You can also specify an inequality, such as StartTime<=YYYY-MM-DD, to read Media that were created on or before midnight of this date, and StartTime>=YYYY-MM-DD to read Media that were created on or after midnight of this date. |
| `date_created_after` | string\<date-time\> | Optional | Not PII | Only include Media resources that were created on this date. Specify a date as YYYY-MM-DD in GMT, for example: 2009-07-06, to read Media that were created on this date. You can also specify an inequality, such as StartTime<=YYYY-MM-DD, to read Media that were created on or before midnight of this date, and StartTime>=YYYY-MM-DD to read Media that were created on or after midnight of this date. |
| `page_size` | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

---

## Delete Media

```
DELETE https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media/{Sid}.json
```

Deletes Media from your account.

If successful, returns HTTP 204 (No Content) with no body.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `account_sid` | SID\<AC\> | required | Not PII | The SID of the Account that is associated with the Media resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `message_sid` | SID\<SM\|MM\> | required | Not PII | The SID of the Message resource that is associated with the Media resource. Pattern: `^(SM|MM)[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `sid` | SID\<ME\> | required | Not PII | The unique identifier of the to-be-deleted Media resource. Pattern: `^ME[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Delete Media from your account

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.messages("MM800f449d0399ed014aae2bcc0cc2f2ec").media(
    "ME557ce644e5ab84fa21cc21112e22c485"
).delete()
```

---

## Hints and Advanced Uses

- Twilio attempts to cache the media file the first time it is used. This may add a slight delay in sending the message.
- Twilio caches files when HTTP headers allow it (via ETag and Last-Modified headers). Responding with Cache-Control: no-cache ensures Twilio always checks if the file has changed, allowing your web server to respond with a new version or with a 304 Not Modified to instruct Twilio to use its cached version.