# Participant Conversation Resource

The ParticipantConversation resource lists all the Conversations for a specific participant. It performs the lookup using an exact match to the participant identifier.

This resource supports the lookup of conversations for a specific participant based on two types of query parameters:

- **Identity**: for Chat users
- **Address**: for non-Chat members, e.g., SMS or WhatsApp addresses

Users can provide only one parameter at a time, i.e. either identity or address. The returned data will be sorted by the conversationSid alphabetically.

## ParticipantConversation Properties

Each Participant Conversation resource contains these properties.

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | Optional | Not PII | The unique ID of the Account responsible for this conversation. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| chat_service_sid | SID<IS> | Optional | Not PII | The unique ID of the Conversation Service this conversation belongs to. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| participant_sid | SID<MB> | Optional | Not PII | The unique ID of the Participant. Pattern: `^MB[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| participant_user_sid | SID<US> | Optional | Not PII | The unique string that identifies the conversation participant as Conversation User. Pattern: `^US[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| participant_identity | string | Optional | PII MTL: 30 days | A unique string identifier for the conversation participant as Conversation User. This parameter is non-null if (and only if) the participant is using the Conversations SDK to communicate. Limited to 256 characters. |
| participant_messaging_binding | object | Optional | PII MTL: 30 days | Information about how this participant exchanges messages with the conversation. A JSON parameter consisting of type and address fields of the participant. |
| conversation_sid | SID<CH> | Optional | Not PII | The unique ID of the Conversation this Participant belongs to. Pattern: `^CH[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| conversation_unique_name | string | Optional | PII MTL: 30 days | An application-defined string that uniquely identifies the Conversation resource. |
| conversation_friendly_name | string | Optional | PII MTL: 30 days | The human-readable name of this conversation, limited to 256 characters. Optional. |
| conversation_attributes | string | Optional | PII MTL: 30 days | An optional string metadata field you can use to store any data you wish. The string value must contain structurally valid JSON if specified. Note that if the attributes are not set "{}" will be returned. |
| conversation_date_created | string<date-time> | Optional | Not PII | The date that this conversation was created, given in ISO 8601 format. |
| conversation_date_updated | string<date-time> | Optional | Not PII | The date that this conversation was last updated, given in ISO 8601 format. |
| conversation_created_by | string | Optional | Not PII | Identity of the creator of this Conversation. |
| conversation_state | enum<string> | Optional | Not PII | The current state of this User Conversation. One of inactive, active or closed. Possible values: `inactive`, `active`, `closed` |
| conversation_timers | object | Optional | Not PII | Timer date values representing state update for this conversation. |
| links | object<uri-map> | Optional | Not PII | Contains absolute URLs to access the participant and conversation of this conversation. |

## List All of a Participant's Conversations

```
GET https://conversations.twilio.com/v1/ParticipantConversations
```

The ParticipantConversation resource also supports pagination via additional parameters like: PageSize and PageToken.

> **Info:** It's expected that you will encode the url for the ParticipantConversations endpoint, for example, if a phone number is passed as an address parameter the + character should be encoded as %2B.

> **Warning:** In the Group MMS use case, it may happen that the participant might not have an identifier (no address and no identity). So, this endpoint will not return conversations for this participant. Similarly if the identity of this participant with Projected Address is created later then this endpoint will not return conversations to which this participant was added when it was without identity.

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| identity | string | Optional | Not PII | A unique string identifier for the conversation participant as Conversation User. This parameter is non-null if (and only if) the participant is using the Conversations SDK to communicate. Limited to 256 characters. |
| address | string | Optional | Not PII | A unique string identifier for the conversation participant who's not a Conversation User. This parameter could be found in messaging_binding.address field of Participant resource. It should be url-encoded. |
| page_size | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 50. Minimum: 1, Maximum: 50 |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

### List All of a Participant's Conversations

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

participant_conversations = (
    client.conversations.v1.participant_conversations.list(
        address="+375255555555", limit=20
    )
)

for record in participant_conversations:
    print(record.account_sid)
```

### Response

```json
{
  "conversations": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "conversation_sid": "CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "participant_sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "conversation_friendly_name": "friendly_name",
      "conversation_state": "inactive",
      "conversation_timers": {
        "date_inactive": "2015-12-16T22:19:38Z",
        "date_closed": "2015-12-16T22:28:38Z"
      },
      "conversation_attributes": "{}",
      "conversation_date_created": "2015-07-30T20:00:00Z",
      "conversation_date_updated": "2015-07-30T20:00:00Z",
      "conversation_created_by": "created_by",
      "conversation_unique_name": "unique_name",
      "participant_user_sid": null,
      "participant_identity": null,
      "participant_messaging_binding": {
        "address": "+375255555555",
        "proxy_address": "+12345678910",
        "type": "sms",
        "level": null,
        "name": null,
        "projected_address": null
      },
      "links": {
        "participant": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "conversation": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      }
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://conversations.twilio.com/v1/ParticipantConversations?Address=%2B375255555555&PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://conversations.twilio.com/v1/ParticipantConversations?Address=%2B375255555555&PageSize=50&Page=0",
    "next_page_url": null,
    "key": "conversations"
  }
}
```