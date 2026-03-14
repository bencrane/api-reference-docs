# Send a message with Facebook Messenger (public beta)

> **Public Beta**
> Facebook Messenger is available as a Public Beta product, and the information contained in this document is subject to change.
> Some features aren't yet implemented, and others may change before the product becomes Generally Available (GA). Public Beta products aren't covered by a Service Level Agreement (SLA).

On this page, you'll learn to use Twilio Programmable Messaging to programmatically send messages with Facebook Messenger using your web application or cURL.

## Review considerations

- Facebook users must initiate contact with you by messaging your Facebook Page before you can contact them. Once you receive a user's message, you can respond back to the user for 24 hours. To learn more, see Platform Policy Overview (Facebook for Developers).
  - If you send a message after the 24-hour window has elapsed, Twilio tags messages with `ACCOUNT_UPDATE`.
- You're responsible for managing consumer opt-ins and opt-outs to the Facebook Messenger platform. Users grant you permission to message them by initiating the conversation with your Facebook Page. When users request that you stop messaging, you must stop messaging them. Users also have the option to block your page.
- You must strictly adhere to Facebook's commerce and business policies and provide high-quality experiences in Messenger. During or after the interaction in Messenger, users can provide negative feedback to Facebook when a page's conversations are spammy, abusive, or unpleasant. Maintain high quality, value-adding conversations that align with the user's intentions when engaging with you. If a business shows a pattern of violating Facebook's policies, Facebook disables the page from using Facebook Messenger.

## Complete the prerequisites

Before you send a message with Facebook Messenger, complete the Facebook Messenger setup.

## Send a message with Facebook Messenger

You can send messages with Facebook Messenger using code that makes `HTTP POST` requests to the Message resource in the Twilio REST API.

To send a message with Facebook Messenger, follow the steps to send an SMS message, replacing the `from` field with `messenger:<facebook_page_id>` and `to` field with `messenger:<messenger_user_id>` as shown in the following example.

To find your Facebook Page ID:

1. Open the Channels page in the Twilio Console.
2. Click Facebook Messenger.
3. Check the Page ID field.

To find your recipient's Messenger User ID, check your callback URL. When a user sends a message to your Facebook Page, your callback URL receives the message with the same parameters as a standard Twilio SMS message.

To test your Facebook Messenger sender, you can send yourself a message by replacing the `to` field with `m.me/<page_id>`.

### Respond Using the Programmable Messaging API

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os 
from twilio.rest import Client 

# Find your Account SID and Auth Token at twilio.com/console 
# and set the environment variables. See http://twil.io/secure 
account_sid = os.environ["TWILIO_ACCOUNT_SID"] 
auth_token = os.environ["TWILIO_AUTH_TOKEN"] 
client = Client(account_sid, auth_token) 

message = client.messages.create( 
    to="messenger:{messenger_user_id}", 
    from_="messenger:{facebook_page_id}", 
    body="Would you like to play a game?", 
) 

print(message.body)
```