# Webhook Configuration Resource

The Webhook Configuration resource allows you to precisely control the effects of account-scoped webhooks. Sending a POST request to the Webhook Configuration endpoint is equivalent to configuring session webhooks in the Twilio Console.

Good applications of the configured webhooks in Conversations include:

- Implementing an archival system for all Conversations
- Feeding messages into Elasticsearch
- Implementing a profanity filter across all Conversations

**Note:** You can send pre-hooks and post-hooks to different targets.

Our guide to Conversations Webhooks includes the specific pre- and post-event webhooks that fire, as well as the webhook payloads.

## Webhook Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | Optional | Not PII | The unique ID of the Account responsible for this conversation. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| method | enum<string> | Optional | Not PII | The HTTP method to be used when sending a webhook request. Possible values: `GET`, `POST` |
| filters | array[string] | Optional | Not PII | The list of webhook event triggers that are enabled for this Service: onMessageAdded, onMessageUpdated, onMessageRemoved, onMessageAdd, onMessageUpdate, onMessageRemove, onConversationUpdated, onConversationRemoved, onConversationAdd, onConversationAdded, onConversationRemove, onConversationUpdate, onConversationStateUpdated, onParticipantAdded, onParticipantUpdated, onParticipantRemoved, onParticipantAdd, onParticipantRemove, onParticipantUpdate, onDeliveryUpdated, onUserAdded, onUserUpdate, onUserUpdated |
| pre_webhook_url | string | Optional | Not PII | The absolute url the pre-event webhook request should be sent to. |
| post_webhook_url | string | Optional | Not PII | The absolute url the post-event webhook request should be sent to. |
| target | enum<string> | Optional | Not PII | The routing target of the webhook. Can be ordinary or route internally to Flex. Possible values: `webhook`, `flex` |
| url | string<uri> | Optional | Not PII | An absolute API resource API resource URL for this webhook. |

## Fetch a ConfigurationWebhook resource

```
GET https://conversations.twilio.com/v1/Configuration/Webhooks
```

### FETCH: Retrieve a Webhook Configuration Resource

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

webhook = client.conversations.v1.configuration.webhooks().fetch()

print(webhook.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "pre_webhook_url": "https://example.com/pre",
  "post_webhook_url": "https://example.com/post",
  "method": "GET",
  "filters": [
    "onMessageSend",
    "onConversationUpdated"
  ],
  "target": "webhook",
  "url": "https://conversations.twilio.com/v1/Configuration/Webhooks"
}
```

## Update a ConfigurationWebhook resource

```
POST https://conversations.twilio.com/v1/Configuration/Webhooks
```

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| method | string | Optional | Not PII | The HTTP method to be used when sending a webhook request. |
| filters | array[string] | Optional | Not PII | The list of webhook event triggers that are enabled for this Service: onMessageAdded, onMessageUpdated, onMessageRemoved, onMessageAdd, onMessageUpdate, onMessageRemove, onConversationUpdated, onConversationRemoved, onConversationAdd, onConversationAdded, onConversationRemove, onConversationUpdate, onConversationStateUpdated, onParticipantAdded, onParticipantUpdated, onParticipantRemoved, onParticipantAdd, onParticipantRemove, onParticipantUpdate, onDeliveryUpdated, onUserAdded, onUserUpdate, onUserUpdated |
| pre_webhook_url | string | Optional | Not PII | The absolute url the pre-event webhook request should be sent to. |
| post_webhook_url | string | Optional | Not PII | The absolute url the post-event webhook request should be sent to. |
| target | enum<string> | Optional | Not PII | The routing target of the webhook. Can be ordinary or route internally to Flex. Possible values: `webhook`, `flex` |

### UPDATE: Enable all Webhooks with filters

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

configuration_webhook = client.conversations.v1.configuration.webhooks().update(
    post_webhook_url="https://example.com/archive-every-action",
    pre_webhook_url="https://example.com/filtering-and-permissions",
    method="POST",
    filters=["onConversationUpdated", "onMessageRemoved"],
)

print(configuration_webhook.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "pre_webhook_url": "https://example.com/filtering-and-permissions",
  "post_webhook_url": "https://example.com/archive-every-action",
  "method": "POST",
  "filters": [
    "onConversationUpdated",
    "onMessageRemoved"
  ],
  "target": "webhook",
  "url": "https://conversations.twilio.com/v1/Configuration/Webhooks"
}
```