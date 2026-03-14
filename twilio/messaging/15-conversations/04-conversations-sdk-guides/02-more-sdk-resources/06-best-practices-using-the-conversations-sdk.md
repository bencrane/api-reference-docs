# Best Practices using the Conversations SDK

Twilio Conversations is a highly customizable and flexible product with powerful features, like cross-channel messaging and group texting. We've learned a lot from our customers, and this guide provides some known best practices to make implementation easier and reliable.

The Conversations client-side SDKs (JavaScript, Android, and iOS) operate by sending commands to the backend and by receiving updates from the backend over an independent channel, such as SMS, WhatsApp, or chat. This means that most asynchronous operations require you to asynchronously wait for an update event before you can see actual updated values on the front end.

> ⚠️ **Warning**
> The Conversations client-side SDKs receive event-based updates regularly and need to be connected to the internet to function correctly. For a reasonable user experience, clients should have a minimum network bandwidth of 100kbps with lower than 200ms latency.

---

## The SDK lifecycle

- There is no need to implement a shutdown/create cycle on network drops because the SDK reconnects automatically after regaining network access.
- There is no need to implement a shutdown/create cycle for going to the background and then returning to foreground. The SDK reconnects automatically after becoming the foreground app.
- You only need to call shutdown when doing logout / login within the same SDK session.
- It is highly recommended to create a new Conversations SDK instance: do not reuse the old instance for the new SDK initialization after shutting down inside the same session.

---

## Push registration and lifecycle

- Register for push notifications on every application start in order to avoid the cumbersome logic of checking whether registration for push notifications exists or not. To avoid excessive registrations, you can preserve the current device token as provided by the OS in the persistent memory. Then compare the token values on startup and re-register only if the tokens differ.
- React to device token changes provided by the OS events (iOS, Android, and FCM in browsers support these events) and re-register with a new token.
- Push registration Time-To-Live (TTL) is 1 (one) year of idle time; it is worth unregistering from push notifications using SDK methods when re-launching applications with a different chat identity. Otherwise, your app might receive pushes for the previously logged-in user.
- Unregistering push notifications when uninstalling the application is still not fully solved. We rely on the OS to stop providing push notifications for the apps that are no longer installed. Currently, the guidance is to deregister push notifications once daily.
- We recommend that you reallocate and release all objects referencing the old SDK instances as this may complicate the troubleshooting process.

---

## The JWT / JWE token lifecycle

- It is highly recommended to use several hours (up to 24H) for a token's TTL.
- Tokens with TTL under five minutes (300 seconds) will not work reliably in the Twilio Conversations infrastructure. We recommend setting token TTL from at least 20 minutes and until 24 hours.
- Implement any update token methods in whichever SDK you are working with, reacting to the token expiration events provided by SDKs.
- We recommend that you pre-fetch the token and store it in temporary storage in case you would need faster startup. This way, you can save the round-trip time that it takes to fetch it from your token generator.
- A token is the authorization to use your Conversations Service instance (and thus charge you for your Conversations API usage), so make sure to secure it properly.

---

## JavaScript

Here are some additional details about the JavaScript SDK behavior:

1. The promise to create a Client is resolved after we start all connections, but not all Conversations are fetched.
2. Fetching of a user's subscribed Conversations starts asynchronously and continues after Client instance is resolved in the promise.
3. Due to points (1) and (2) above, in order to get the list of subscribed Conversations, you should first subscribe to the `Client#conversationAdded` event, and only after that, call the `getSubscribedConversations` method.
4. `getSubscribedConversations` is paginated. Hence, duplicated Conversations might arrive from two sources: from events and from this method call, it is up to the developer to resolve this duplication.

**Note:** for the `getSubscribedConversations` method, the pagination is set to 100 items per page.

5. A Conversation's Messages are not fetched on Conversation load automatically - so, only the `Conversation#messageAdded` event is emitted on new Messages.
6. If a customer deliberately fetched some messages, then `Conversation#messageUpdated` and `Conversation#messageRemoved` events are emitted only on those fetched messages.
7. Some methods are semi-real-time, i.e. guarded by caching with some lifetime. Calling them rapidly might not reflect their actual value, but will catch up after cached value expires:
   - `Conversation.getParticipantCount()`
   - `Conversation.getMessagesCount()`
   - `Conversation.getUnreadMessagesCount()`

---

## Mobile SDKs specifics

The following practices apply to Android and iOS SDKs.

- You could perform ConversationsClient operations only after the client has fully synchronized (you should have received the `ConversationsClient.onClientSynchronization` callback with status equivalent to `.ALL` → this means the synchronization operation has completed).
- Similarly, you can perform operations on the Conversation only after the Conversation has completed the synchronization process.
- When updating various attributes, you need to wait for the corresponding Updated event; otherwise, you may get stale data. All operations that take a listener or a delegate are asynchronous, so when you receive the successful result in the listener/delegate, it means the SDK has merely sent the command. And you must now wait for the actual Update event to arrive before you can see actual updated values.
- All references to Conversations objects (Conversations, Participants, Messages, Users, etc) must be released prior to releasing ConversationsClient.