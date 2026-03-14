# Conversation Message Receipt Resource

Delivery Receipts in Conversations provide visibility into the status of Conversation Messages sent across different channels.

Using Delivery Receipts, you can verify that Messages have been sent, delivered, or even read (for OTT) by Conversations Participants.

## API Base URL

All URLs in the reference documentation use the following base URL:

```
https://conversations.twilio.com/v1
```

## Using the shortened base URL

Using the REST API, you can interact with Conversation Message Receipt resources in the default Conversation Service instance via a "shortened" URL that does not include the Conversation Service instance SID ("ISXXX..."). If you are only using one Conversation Service (the default), you do not need to include the Conversation Service SID in your URL, e.g.

```
GET /v1/Conversations/CHxx/Messages/IMXXX/Receipts
```

For Conversations applications that build on more than one Conversation Service instance, you will need to specify the Conversation Service SID in the REST API call:

```
GET /v1/Services/ISxx/Conversations/CHxx/Messages/IMXXX/Receipts
```

## Receipt Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | Optional | Not PII | The unique ID of the Account responsible for this participant. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| conversation_sid | SID<CH> | Optional | Not PII | The unique ID of the Conversation for this message. Pattern: `^CH[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sid | SID<DY> | Optional | Not PII | A 34 character string that uniquely identifies this resource. Pattern: `^DY[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| message_sid | SID<IM> | Optional | Not PII | The SID of the message within a Conversation the delivery receipt belongs to. Pattern: `^IM[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| channel_message_sid | SID | Optional | Not PII | A messaging channel-specific identifier for the message delivered to participant e.g. SMxx for SMS, WAxx for Whatsapp etc. Pattern: `^[a-zA-Z]{2}[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| participant_sid | SID<MB> | Optional | Not PII | The unique ID of the participant the delivery receipt belongs to. Pattern: `^MB[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| status | enum<string> | Optional | Not PII | The message delivery status. Possible values: `read`, `failed`, `delivered`, `undelivered`, `sent` |
| error_code | integer | Optional | Not PII | The message delivery error code for a failed status. Default: 0 |
| date_created | string<date-time> | Optional | Not PII | The date that this resource was created. |
| date_updated | string<date-time> | Optional | Not PII | The date that this resource was last updated. null if the delivery receipt has not been updated. |
| url | string<uri> | Optional | Not PII | An absolute API resource URL for this delivery receipt. |

## Fetch a ConversationMessageReceipt resource

```
GET https://conversations.twilio.com/v1/Conversations/{ConversationSid}/Messages/{MessageSid}/Receipts/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| conversation_sid | string | required | Not PII | The unique ID of the Conversation for this message. |
| message_sid | SID<IM> | required | Not PII | The SID of the message within a Conversation the delivery receipt belongs to. Pattern: `^IM[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sid | SID<DY> | required | Not PII | A 34 character string that uniquely identifies this resource. Pattern: `^DY[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Fetch a Receipt

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

delivery_receipt = (
    client.conversations.v1.conversations("ConversationSid")
    .messages("IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .delivery_receipts("DYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(delivery_receipt.account_sid)
```

### Response

```json
{
  "sid": "DYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
  "message_sid": "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "channel_message_sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "failed",
  "error_code": 3000,
  "participant_sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2016-03-24T20:37:57Z",
  "date_updated": "2016-03-24T20:37:57Z",
  "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Receipts/DYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Read multiple ConversationMessageReceipt resources

```
GET https://conversations.twilio.com/v1/Conversations/{ConversationSid}/Messages/{MessageSid}/Receipts
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| conversation_sid | string | required | Not PII | The unique ID of the Conversation for this message. |
| message_sid | SID<IM> | required | Not PII | The SID of the message within a Conversation the delivery receipt belongs to. Pattern: `^IM[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| page_size | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 50. Min: 1, Max: 50 |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Min: 0 |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

### List multiple Receipts

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

delivery_receipts = (
    client.conversations.v1.conversations("ConversationSid")
    .messages("IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .delivery_receipts.list(limit=20)
)

for record in delivery_receipts:
    print(record.account_sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Receipts?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Receipts?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "delivery_receipts"
  },
  "delivery_receipts": [
    {
      "sid": "DYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "conversation_sid": "CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "message_sid": "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "channel_message_sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "status": "failed",
      "error_code": 3000,
      "participant_sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2016-03-24T20:37:57Z",
      "date_updated": "2016-03-24T20:37:57Z",
      "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Receipts/DYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ]
}
```