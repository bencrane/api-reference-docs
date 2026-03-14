# Initializing Conversations SDK Clients

Initializing Conversations SDKs is an important step to ensure your client is ready for use on an end user's mobile or web device. The Conversations SDKs put necessary data in place and set up event handlers for new Messages and other events.

This guide covers how to initialize the Conversations SDKs, both for mobile and web.

---

## Mobile SDKs (Android and iOS)

Once your Conversations Client is fully synchronized at client startup, the following is applicable:

- The client is subscribed to events for all of the Participant's Conversations.
- The Messages and Participants collections are available for querying.

> ℹ️ **Info**
> You must maintain a strong reference to the client object you received, keeping it in scope for the entirety of your usage of the Conversations Client.
>
> Before releasing the client, it is important to release references to all objects created and returned by this Conversations Client (i.e., set all objects to nil) and to call the client's shutdown method to ensure proper cleanup of shared resources.

No previously existing Messages are fetched for the client on load. These will be loaded when you call the `getMessages` method to fetch Messages on demand. Messages are then cached and updated after loading.

**Note:** For the `getMessages` method, the default pageSize value is 30 and the maximum pageSize value is 100.

You receive feedback on client startup in two ways:

1. You will receive an asynchronous callback from the create client method when the client has been successfully created and is being synchronized.
2. You will receive an event to the client's listener or delegate via the `synchronizationStatusUpdated` method with a value of `StatusCompleted`. This is your indication that the client is ready for business and that all of the Participant's Conversations have been obtained and subscribed to.

---

## The JavaScript client

Once a user logs into the client, the JavaScript client will retrieve the list of Subscribed Conversations in which the user is a Participant.

Some additional details on the JavaScript SDK behavior:

- It will subscribe to notifications for changes to the Subscribed Conversations list itself
- It will subscribe to events from each Subscribed Conversation in the list
- It will retrieve the FriendlyName, UniqueName, and Attributes for each Subscribed Conversation in the list
- It will not retrieve any Messages for individual Conversation
- It will retrieve Participant lists for Conversations
- It will not retrieve, nor subscribe to Users linked to Participants of Subscribed Conversations
- It will retrieve a currently logged-in User object and subscribe to this User's events

To load Messages for a Subscribed Conversation and subscribe to other Conversation-level events you will need to load individual Conversations manually.

---

## Knowing when the SDK is ready for use

It is important to know when the SDK Client has completed its initialization and is ready for use. Once the client is connected, you can configure your listeners, event handlers, and other logic.

This manifests slightly differently for each SDK as detailed below:

### JavaScript

The Conversations Client is instantiated in one of two ways:

You can use promises directly:

```javascript
Conversations.Client.create(token).then(client => {
    // Use client
});
```

Or using the async/await pattern:

```javascript
let client = await Twilio.Conversations.Client.create(token);
// Use client
```

### iOS

First, we initialize the Conversations Client. Here we provide an initial Access Token:

```objective-c
NSString *token = <token goes here>;
__weak typeof(self) weakSelf = self;
[TwilioConversationsClient conversationsClientWithToken:token
    properties:nil
      delegate:<delegate>
    completion:^(TCHResult *result, TwilioConversationsClient *convoClient) {
        weakSelf.client = convoClient;
... }];
```

The iOS Conversations SDK then provides a `TCHClientSynchronizationStatus` delegate callback:

```objective-c
- (void)conversationsClient:(TwilioConversationsClient *)client
synchronizationStatusUpdated:(TCHClientSynchronizationStatus)status {
    if (status == TCHClientSynchronizationStatusCompleted) {
        // Client is now ready for business
    }
}
```

### Android

The Android Conversations SDK provides a Listener Interface which you must implement to check the init status and completion of the SDK client.

```java
ConversationsClient.Properties props = ConversationsClient.Properties.newBuilder().createProperties();

ConversationsClient.create(context.getApplicationContext(),
  accessToken,
  props,
  new CallbackListener<ChatClient>() {
    @Override
    public void onSuccess(final ConversationsClient client) {
      // save client for future use here
      client.addListener(new ConversationsClientListener() {
        @Override
        public void onClientSynchronization(ConversationsClient.SynchronizationStatus status) {
          if (status == ConversationsClient.SynchronizationStatus.COMPLETED) {
            // Client is now ready for business, start working
          }
        }
      });
    }
  });
```

---

## Troubleshooting

Before we dive deeper into showing how to get your Participants engaged through different channels, it's important to know where to look for logs and additional information if you need it. We have a guide about Error Handling and Diagnostics that you may find helpful as you build your Conversations integration.

---

## Access Tokens

All Conversations SDK clients need a valid Access Token in order to authenticate and interact with the Chat Service instance. You should generate the Access Token on your server. You can learn more about how to do that in the Access Token guide.

When instantiating the SDK client, you should use the Access Token that is returned by your backend. You will pass the Token string directly to the SDK Client constructor method.

The SDK also provides a method to update the Access Token, which is used when you need to update the Access Token before expiration. Please see the Creating Access Tokens guide for more information.

---

## What's Next?

Now that you've gotten your SDK initialized on the client, check out the rest of the Conversations documentation.

- Conversations Fundamentals
- Creating Access Tokens
- The Conversations REST API