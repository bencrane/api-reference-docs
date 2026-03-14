# Push Notification Configuration for Conversations

Using push notifications with your Conversations implementation drives your customers to re-engage with your app. With Twilio Conversations, you can configure pushes for:

- New Messages
- New Media Messages (new since October 2021)
- Conversations you've joined
- Conversations you've left

Conversations integrates Apple Push Notifications (iOS) and Firebase Cloud Messaging (Android and browsers) using the Push credentials configured on your Twilio account. The content and payload of your push notifications will be different depending on the event that precipitates them.

Conversations Service instances provide some configuration options that allow push notification configuration on a per Service instance basis. These options allow for:

- Selecting which of the eligible Conversations events should trigger push notifications
- Specifying the payload template for each message type (overriding the default template)

## Table of Contents

- [Push Notification Configuration for Conversations](#push-notification-configuration-for-conversations)
  - [Table of Contents](#table-of-contents)
  - [Push Notification Types](#push-notification-types)
  - [Push Notification Templates](#push-notification-templates)
    - [Template Variables](#template-variables)
    - [Default Templates](#default-templates)
  - [Configure Push Notifications](#configure-push-notifications)
    - [Badge Count](#badge-count)
    - [Configure New Message Push Notifications](#configure-new-message-push-notifications)
    - [Enable Media Pushes](#enable-media-pushes)
    - [Setting Additional Notification Types](#setting-additional-notification-types)

## Push Notification Types

The following push notifications can be configured for a Conversations Service instance:

| Push Notification Type | Description |
|------------------------|-------------|
| New Message | This is sent to each chat participant in a Conversation whenever a new Message is posted. |
| New Media Message | This is sent to each chat participant in a Conversation whenever a new message is posted with Media (instead of text). |
| Added to Conversation | This is sent to chat participants that have been added to a Conversation |
| Removed from Conversation | This is sent to chat participants that have been removed from a Conversation |

> ℹ️ **Info:** The default enabled flag for new Service instances for all push notifications is false. This means that push notifications will be disabled until you explicitly set the flag to true.

## Push Notification Templates

Each of the push notification types has a default template for the payload (or notification body). Each of these templates can be overridden per Service instance via the push notification configuration. The templating employs markup for a limited set of variables:

### Template Variables

| Template Variable | Description |
|-------------------|-------------|
| `${PARTICIPANT}` | Will be replaced with the FriendlyName of the Participant's underlying User who triggered the push notification (if any). The User's Identity will be used if no FriendlyName has been set. For Proxy Participants engaged via a non-chat channel, the MessagingBinding.Address will be used instead. When group texting, the MessagingBinding.Address will be used, or the MessagingBinding.ProjectedAddress if the Participant uses a Twilio phone number and has no underlying User. |
| `${PARTICIPANT_FRIENDLY_NAME}` | Synonym of `${PARTICIPANT}`. |
| `${PARTICIPANT_IDENTITY}` | Synonym of `${PARTICIPANT}`. |
| `${PARTICIPANT_SID}` | Will be replaced with the Sid of the Participant who triggered the push notification (if any). The Participant's Identity will be used if no Sid is available. |
| `${CONVERSATION}` | Will be replaced with the UniqueName, FriendlyName or ConversationSid (if they exist, in that order of priority). These properties are tied to the Conversation related to the push notification. |
| `${CONVERSATION_FRIENDLY_NAME}` | Will be replaced with the FriendlyName, UniqueName or ConversationSid (if they exist, in that order of priority). These properties are tied to the Conversation related to the push notification. |
| `${CONVERSATION_SID}` | Will be replaced with the ConversationSid. This property is tied to the Conversation related to the push notification. |
| `${CONVERSATION_UNIQUE_NAME}` | Will be replaced with the UniqueName, or the FriendlyName, or ConversationSid (in that order) of the conversation to which this push pertains. |
| `${MESSAGE}` | Will be replaced with the body of the actual Message. Only used for notifications of type: New Message |
| `${MEDIA_COUNT}` | Sent exclusively for New Media Message pushes; counts the number of media files included. Presently, this will never be higher than 1; support for multiple media on the same message is coming soon. |
| `${MEDIA}` | Sent exclusively for New Media Message pushes; presents the filename of the first media attached to the message. |

> ℹ️ **Info:** The maximum length of the entire notification payload is 178 characters. This limit is applied after the notification payload is constructed and the variable data is applied. Thus, freeform text and the variable data are compiled into a string and the first 178 characters are then used as the notification payload.

> ℹ️ **Info:** Variables can be used multiple times within a template, but each variable will contribute to the maximum number of available characters.

### Default Templates

| Push Notification Type | Default Template |
|------------------------|------------------|
| New Message | `${CONVERSATION}:${PARTICIPANT}: ${MESSAGE}` |
| New Media Message | `You have a new message in ${CONVERSATION} with ${MEDIA_COUNT} media files: ${MEDIA}` |
| Added to Conversation | `You have been added to the conversation ${CONVERSATION} by ${PARTICIPANT}` |
| Removed from Conversation | `${PARTICIPANT} has removed you from the conversation ${CONVERSATION}` |

## Configure Push Notifications

Each push notification type can be configured for a Service instance. The configuration allows each notification type to be enabled or disabled. This also handles custom template configuration as per the templating mechanism described above.

The following are the eligible notification type names:

- NewMessage
- AddedToConversation
- RemovedFromConversation

The following are the configuration parameters used:

| Parameter Name | Description |
|----------------|-------------|
| `[type].Enabled` | Set true to send this type of push notification. Default: false |
| `[type].Template` | The customer template string for the notification type. |
| `[type].Sound` | The sound push payload parameter that will be set for this notification type, appropriately to the target platform. |
| `NewMessage.BadgeCountEnabled` | true if the NewMessage notification type should send a badge count value in the push payload. This parameter is only applicable to the NewMessage type. This is currently only used by the iOS APNS push notification type. |
| `NewMessage.WithMedia.Enabled` | Set true to send pushes for media messages. Default: false. |
| `NewMessage.WithMedia.Template` | A specific template for new media message pushes, different and independent of NewMessage.Template. |

### Badge Count

Badge count refers to a counter on an app's icon that displays how many unread notifications there are for that app. Currently, only APNS push notifications for iOS will use this and include the badge property in the payload.

The badge count setting applies only to the NewMessage notification type. If enabled, the value of this property will represent the count of one-to-one Conversations the User participates in where there are unread Messages for the User.

If `NewMessage.BadgeCountEnabled` is set to true, decrements to the count of Conversations with unread messages will be sent to all registered iOS endpoints for that User.

### Configure New Message Push Notifications

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

service_notification = (
    client.conversations.v1.services("ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .configuration.notifications()
    .update(
        added_to_conversation_enabled=True,
        added_to_conversation_sound="default",
        added_to_conversation_template="There is a new message in ${CONVERSATION} from ${PARTICIPANT}: ${MESSAGE}",
    )
)

print(service_notification.added_to_conversation)
```

**Response:**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "log_enabled": true,
  "added_to_conversation": {
    "enabled": false,
    "template": "You have been added to a Conversation: ${CONVERSATION}",
    "sound": "ring"
  },
  "new_message": {
    "enabled": false,
    "template": "You have a new message in ${CONVERSATION} from ${PARTICIPANT}: ${MESSAGE}",
    "badge_count_enabled": true,
    "sound": "ring",
    "with_media": {
      "enabled": false,
      "template": "You have a new message in ${CONVERSATION} with ${MEDIA_COUNT} media files: ${MEDIA}"
    }
  },
  "removed_from_conversation": {
    "enabled": false,
    "template": "You have been removed from a Conversation: ${CONVERSATION}",
    "sound": "ring"
  },
  "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Configuration/Notifications"
}
```

### Enable Media Pushes

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

service_notification = (
    client.conversations.v1.services("ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .configuration.notifications()
    .update(
        new_message_with_media_enabled=True,
        new_message_with_media_template="${PARTICIPANT} sent you a file: ${MEDIA}",
    )
)

print(service_notification.new_message)
```

**Response:**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "log_enabled": true,
  "added_to_conversation": {
    "enabled": false,
    "template": "You have been added to a Conversation: ${CONVERSATION}",
    "sound": "ring"
  },
  "new_message": {
    "enabled": false,
    "template": "You have a new message in ${CONVERSATION} from ${PARTICIPANT}: ${MESSAGE}",
    "badge_count_enabled": true,
    "sound": "ring",
    "with_media": {
      "enabled": false,
      "template": "You have a new message in ${CONVERSATION} with ${MEDIA_COUNT} media files: ${MEDIA}"
    }
  },
  "removed_from_conversation": {
    "enabled": false,
    "template": "You have been removed from a Conversation: ${CONVERSATION}",
    "sound": "ring"
  },
  "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Configuration/Notifications"
}
```

### Setting Additional Notification Types

Setting additional notification types requires including them in your configuration request. For instance, to include the AddedToConversation push notification type, you can add the following 3 rows to your curl request:

```
'AddedToConversation.Enabled=true'
'AddedToConversation.Template=You are now a participant of ${CONVERSATION}!  Added by ${PARTICIPANT}'
'AddedToConversation.Sound=default'
```