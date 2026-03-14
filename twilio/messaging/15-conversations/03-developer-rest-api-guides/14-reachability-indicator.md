# Reachability Indicator

Your Conversations applications can display a chat user's online or offline status to other users of the application. This feature is called the Reachability Indicator, and the Conversations service automatically manages the online or offline state for each user if it is activated.

This feature also provides the User's reachability by Push Notification within the Conversations Service instance.

The reachability state is automatically updated and synchronized by the Conversations service, provided the feature is enabled. The feature is enabled on a "per Service instance" basis.

> **Note:** It is important to note that Users exist within the scope of a Conversations Service instance. Thus, the Reachability indicators are also within the same scope.

## Enable the Reachability Indicator

Each Service instance can have Reachability enabled or disabled. The default is disabled. The reachability state will not be updated if the feature is disabled for a given Service instance. Once enabled, the state will update and synchronize.

You must set the `ReachabilityEnabled` property using the Service Configuration REST resource to configure the Reachability Indicator feature.

### Enable the Reachability Indicator

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

service_configuration = (
    client.conversations.v1.services("ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .configuration()
    .update(reachability_enabled=True)
)

print(service_configuration.chat_service_sid)
```

### Response

```json
{
  "chat_service_sid": "ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "default_conversation_creator_role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "default_conversation_role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "default_chat_service_role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "reachability_enabled": true,
  "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Configuration",
  "links": {
    "notifications": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Configuration/Notifications",
    "webhooks": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Configuration/Webhooks"
  }
}
```

If you choose to enable Reachability Indicators and later wish to return to disabled, set the `ReachabilityEnabled` property back to `false`.

## User Reachability Properties

The Reachability indicators are exposed for Users in two places:

- REST API - Users resource
- Client SDKs - User objects

### REST API

The following read-only properties within the Users REST resource provide Reachability information for Users:

- `is_online`
- `is_notifiable`

These properties are set by the Conversations system if the Reachability Indicator feature is enabled for a User's Service instance.

> **Note:** These properties can be `null` under the following conditions:
> - The Reachability Indicator feature is disabled for the Service Instance
> - The User has not been online since the Reachability indicator has been enabled
> - LIST GET resource representations only have a true or false value for specific GET requests

Please see the REST Users resource documentation for more information.

### Client SDKs

Within the Conversations Client SDKs, the Reachability Indicator properties are exposed in the User objects.

Real-time updates to other Users' Reachability Indicator states are communicated via the update event mechanism for subscribed User objects. Please see the specific SDK API documentation for details, as each SDK/platform handles this update a little differently.

An indicator of your Service instance's Reachability status (`reachability_enabled`) is also exposed at the SDK client level.

The read only client SDK properties exposed are:

- `ConversationsClient.reachabilityEnabled`
- `User.isOnline`
- `User.isNotifiable`

> **Note:** The above are representations. The specifics of how these properties are accessed are distinct for each language/SDK.

> **Note:** These user properties are read only and cannot be set. Conversations will update these settings and synchronize them as necessary. The Service Configuration REST resource manages the Service-level Reachability feature from the back-end code.

### Handle Reachability updates

Handle an UpdateReason change and process the Reachability Indicators:

```javascript
// function called after client init to set up event handlers
function registerEventHandlers() {
  user = conversationsClient.user;
  // Register User updated event handler
  user.on('updated', function(event) {
    handleUserUpdate(event.user, event.updateReasons)
  });
}

// function to handle User updates
function handleUserUpdate(user, updateReasons) {
  // loop over each reason and check for reachability change
  updateReasons.forEach(function(reason) {
    if (reason == 'online') {
      //do something
    }
  });
}
```