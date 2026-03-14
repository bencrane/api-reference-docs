# Event Handling

The Conversations SDK is event-driven. Objects from the SDK will emit real-time events based on state changes in your Conversations instance. You can use these events to update your application's state and UI.

---

## Which objects emit events?

The SDK emits events on several objects (i.e. Client, Conversation, User, etc.).

These events are emitted, for example, when:

- A new Message is added to a Conversation that you are participating in
- The connection state of your Client changes
- A Participant leaves a Conversation
- A User comes online
- Your Access Token is about to expire
- The `friendlyName` of a Conversation is updated

A full list of events and objects can be found by referring to our generated SDK documentation:

- **JavaScript**
- **Android**
- **iOS**

---

## Event Handling

**Node.js / TypeScript**

```javascript
/* event handler examples */

client.on("conversationUpdated", ({conversation, updateReasons}) => { 
    // Fired when the attributes or the metadata of a conversation have been updated 
}); 

conversation.on("messageUpdated", ({message, updateReasons}) => { 
    // Fired when data of a message has been updated. 
}); 

participant.on("updated", ({participant, updateReasons}) => { 
    // Fired when the fields of the participant have been updated. 
});
```

---

## Best practices and tips for listening to events

- For the **JavaScript SDK**, you can receive most events from the Client object. This is more performant in browsers and recommended over setting up duplicate handlers on each Conversation/User. You can also set up handlers on specific objects (e.g. Conversation, User) as needed.

- For the **iOS SDK**, all events are emitted at the top level `TwilioConversationsClientDelegate`.

- For the **Android SDK**, only some events are emitted from the `ConversationsClientListener`. Other events are available from the `ConversationListener` and `MediaUploadListener`.

---

## What's Next?

As a next step, you can visit the following guides:

- Learn **How to work with Conversations**.
- Check out our **Conversations JavaScript Quickstart** to test the code by yourself.