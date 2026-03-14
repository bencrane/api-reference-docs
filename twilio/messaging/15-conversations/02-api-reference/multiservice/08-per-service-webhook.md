# Per-Service Webhook

The Per-Service Webhook resource allows you to control the effects of webhooks in a particular Conversation Service. The webhooks will only fire for activity at the service-level.

Services allow you to:

- Create multiple, distinct environments (such as dev, stage, and prod) under a single Twilio account
- Scope access to resources through both the REST and client APIs
- Configure different service instances with specific behaviors

Every service can have unique webhook targets. This means you can include different metadata in the URLs or even trigger different behavior for different services.

Webhook targets for the Service Instance (the URL that Twilio will invoke) are configured in the Twilio Console.

If configured, service-scoped webhooks will override your global webhook settings such that only the service-scoped hooks will fire. This applies only to the services where service-level hooks are configured. See Conversations Webhooks for more information.

## Webhook Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | Optional | Not PII | The unique ID of the Account responsible for this service. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| chat_service_sid | SID<IS> | Optional | Not PII | The unique ID of the Conversation Service this conversation belongs to. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| pre_webhook_url | string<uri> | Optional | Not PII | The absolute url the pre-event webhook request should be sent to. |
| post_webhook_url | string<uri> | Optional | Not PII | The absolute url the post-event webhook request should be sent to. |
| filters | array[string] | Optional | Not PII | The list of events that your configured webhook targets will receive. Events not configured here will not fire. Possible values are `onParticipantAdd`, `onParticipantAdded`, `onDeliveryUpdated`, `onConversationUpdated`, `onConversationRemove`, `onParticipantRemove`, `onConversationUpdate`, `onMessageAdd`, `onMessageRemoved`, `onParticipantUpdated`, `onConversationAdded`, `onMessageAdded`, `onConversationAdd`, `onConversationRemoved`, `onParticipantUpdate`, `onMessageRemove`, `onMessageUpdated`, `onParticipantRemoved`, `onMessageUpdate` or `onConversationStateUpdated`. |
| method | enum<string> | Optional | Not PII | The HTTP method to be used when sending a webhook request. One of `GET` or `POST`. |
| url | string<uri> | Optional | Not PII | An absolute API resource URL for this webhook. |

---

## Fetch a ServiceWebhookConfiguration resource

```
GET https://conversations.twilio.com/v1/Services/{ChatServiceSid}/Configuration/Webhooks
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| chat_service_sid | SID<IS> | required | Not PII | The unique ID of the Conversation Service this conversation belongs to. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Fetch a Service Webhook

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

webhook = (
    client.conversations.v1.services("ISXXXXXXXXXXXXXXXXXXXXXX")
    .configuration.webhooks()
    .fetch()
)

print(webhook.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISXXXXXXXXXXXXXXXXXXXXXX",
  "pre_webhook_url": "https://www.example.com/pre",
  "post_webhook_url": "https://www.example.com/post",
  "filters": [
    "onMessageRemove",
    "onParticipantAdd"
  ],
  "method": "POST",
  "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Configuration/Webhooks"
}
```

---

## Update a ServiceWebhookConfiguration resource

```
POST https://conversations.twilio.com/v1/Services/{ChatServiceSid}/Configuration/Webhooks
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| chat_service_sid | SID<IS> | required | Not PII | The unique ID of the Conversation Service this conversation belongs to. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| pre_webhook_url | string<uri> | Optional | Not PII | The absolute url the pre-event webhook request should be sent to. |
| post_webhook_url | string<uri> | Optional | Not PII | The absolute url the post-event webhook request should be sent to. |
| filters | array[string] | Optional | Not PII | The list of events that your configured webhook targets will receive. Events not configured here will not fire. Possible values are `onParticipantAdd`, `onParticipantAdded`, `onDeliveryUpdated`, `onConversationUpdated`, `onConversationRemove`, `onParticipantRemove`, `onConversationUpdate`, `onMessageAdd`, `onMessageRemoved`, `onParticipantUpdated`, `onConversationAdded`, `onMessageAdded`, `onConversationAdd`, `onConversationRemoved`, `onParticipantUpdate`, `onMessageRemove`, `onMessageUpdated`, `onParticipantRemoved`, `onMessageUpdate` or `onConversationStateUpdated`. |
| method | string | Optional | Not PII | The HTTP method to be used when sending a webhook request. One of `GET` or `POST`. |

### Update a Service Webhook

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

service_webhook_configuration = (
    client.conversations.v1.services("ISXXXXXXXXXXXXXXXXXXXXXX")
    .configuration.webhooks()
    .update(
        filters=["onConversationUpdated", "onMessageRemoved"],
        method="POST",
        post_webhook_url="https://example.com/archive-every-action",
        pre_webhook_url="https://example.com/filtering-and-permissions",
    )
)

print(service_webhook_configuration.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISXXXXXXXXXXXXXXXXXXXXXX",
  "pre_webhook_url": "https://example.com/filtering-and-permissions",
  "post_webhook_url": "https://example.com/archive-every-action",
  "filters": [
    "onConversationUpdated",
    "onMessageRemoved"
  ],
  "method": "POST",
  "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Configuration/Webhooks"
}
```