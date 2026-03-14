# Using Facebook Messenger with Content Templates

## Facebook Messenger Pre-requisites for Content Templates

- A Facebook page for your business
- A Facebook account with admin access for your business
- Install Facebook Messenger Channel in the Twilio Console

For more information about the prerequisites of using Facebook Messenger with the Content API, see the Twilio FBM channel help article here.

## Important Considerations

- Twilio/location and twilio/list-picker do not work on FBM.
- FBM is in-session (user initiated) only. It means:
  - You will not be able to start a conversation with a user, only respond to them.
  - Once they've messaged you, you can respond any number of times within a 24 hour period.
- FBM is subject to FB's commerce and business policies.
- Users can report spam, abuse, and unpleasant messages. If there is a pattern of such messages, FB will disable the page from FBM.
- Quick Reply button IDs are not returned in the msg metadata and therefore do not work. Quick reply button text will be returned instead.

## Find your Facebook Page's Messenger ID

1. Log into your Facebook Messenger Account.
2. Go to your Facebook Page.
3. Open a chat in Messenger
4. It will redirect you to another page.
5. Note the page URL's suffix. This is your page's FBM ID. (i.e. 103800709108123 in this URL). You will use this later in the configuration process.

## Set up your FBM Sender

1. Open your Twilio Console in a new browser. Click on Explore Products link in the left navigation pane and select Channels Beta product.
2. Navigate to the Facebook Messenger product.
3. Click New Messenger Sender, sign into the Facebook account with admin access to your Facebook Page.
4. Add the Facebook Page that you want to send messages from confirming the FBM ID matches.

> ⚠️ **Warning**
> Messages sent from Facebook Business Manager will not appear in Twilio. Please ensure that all messages intended for Twilio are sent directly from the Twilio platform.

## Add your FBM Sender to your Messaging Service

1. Set up a Messaging Service if you don't already have one. In the Twilio Console, go to Messaging > Services > Create Messaging Service. This is the same Messaging Service and sender pool to which you can add your WhatsApp and SMS/MMS senders.
2. To add a FBM Sender, navigate to the Messaging Service created previously. Go to the Sender Pool section and add the Facebook Sender that you've set up.

*This is not a hard requirement. But if you do not do this then you will need to set up the webhook in your FBM Sender. Additionally, you will need to specify a Messaging Service Sid parameter and put your FBM sender in the from field. Similar to here except replace phone numbers with the respective FBM sender id.

## Set up Webhooks for your Messaging Service

To send a message in FBM, you need to know your recipient's FBM ID. Facebook does not make FBM IDs public so you will need to use a webhook to retrieve the FBM ID from an inbound message. For setup purposes and testing purposes, you will need to set up a webhook and message yourself to get your personal FBM ID.

1. Navigate to Messaging Services and go to the Integration tab.
2. Select Send a webhook.
3. Add a "Request URL" where you can receive incoming messages from your end users. If you need a testing webhook, try going to webhook.site
4. Copy the webhook into the Delivery Status Callback URL section.

## Find your Customer's FBM ID

1. Send a message to your page from your personal Facebook Messenger:
   - Log into your FBM account and click Message on your FBM page.
   - Send any message.
2. After sending your FB page a message with your personal FBM account. Check the webhook for the FROM field. This will contain the end user's FBM ID.
3. In your send request, you'll use the FBM ID found in the From field for the incoming message's webhook response.

## Sending a Facebook Messenger Message with Content API

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
import json

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    from_="MGXXXXXXXXXXXXXXX",
    content_sid="HXXXXXXXXXXXXXXXX",
    content_variables=json.dumps({"1": "YOUR_VARIABLE1", "2": "YOURVARIABLE2"}),
    to="messenger:REPLACE_WITH_VALUE_FROM_WEBHOOK",
)

print(message.body)
```

### Response

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "Hello! 👍",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "MGXXXXXXXXXXXXXXX",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "messenger:REPLACE_WITH_VALUE_FROM_WEBHOOK",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```