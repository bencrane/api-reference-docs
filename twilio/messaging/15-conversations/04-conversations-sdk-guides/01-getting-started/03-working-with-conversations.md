# Working with Conversations

A Conversation is a distinct omni-channel messaging thread (i.e. a place where users from multiple channels can exchange messages), in which Participants from any channel Conversations supports (e.g. SDK, SMS, WhatsApp) can communicate with each other.

You can create and manage new Conversations using either the Conversations REST API or the client-side Conversations SDK (what we're covering here). Let's start to dive in!

---

## Create your first Conversation

You'll create a new Conversation using the Conversation creation (JS, iOS) or Conversation Builder methods on your new initialized Client object. Optionally, you can pass in the following parameters: `attributes`, `friendlyName`, and `uniqueName`.

### Create Conversation

```javascript
/* Creating Conversation */

// create new conversation, all the parameters are optional
await client.createConversation({
    attributes: {},
    friendlyName: "new conversation",
    uniqueName: "new conversation",
});
```

---

## Join or Leave a Conversation

After creating the Conversation, you'll need to join it to participate. Joining will create a Participant object in the Conversation that is associated with your User. This also subscribes you to events from the Conversation.

If you'd like to stop receiving events from this Conversation and remove your Participant, you can call the appropriate method to leave the Conversation.

### Join or Leave a Conversation

```javascript
//join the Conversation
await conversation.join();

//leave the Conversation
await conversation.leave();
```

---

## Add a Participant

There are two types of Participants:

1. Chat (SDK-based) Participants, or
2. Non-chat (e.g. SMS, WhatsApp) Participant

SDK-based (chat) Participant objects have a many-to-one relationship with User objects. A User represents a human using the SDK, and that User can be associated with multiple Participant objects: a unique Participant object for each Conversation they are participating in. In contrast, non-chat Participants (i.e. SMS, WhatsApp, etc.) are not linked by a User object even when they are the same human participating in multiple Conversations.

### Add chat participant (user)

Users are uniquely identified by the identity property in the Access Token they initialized their Client with. You can create a Chat Participant belonging to that User in the Conversation by specifying their User's identity in the corresponding creation method.

### Add non-chat participant

To add a non-chat Participant to the Conversation, you'll have to pass the `proxyAddress` and `address` parameters to the specific creation method on the Conversation object. The `proxyAddress` parameter is a Twilio address (e.g. Twilio phone number, WhatsApp sender) and the `address` parameter is the real-world phone number or address that the non-chat Participant is using.

The following code sample shows how to add both chat and non-chat Participants to a conversation.

### Add a Participant

```javascript
/* Adding Participants (chat and non-chat) */

// add chat participant to the conversation by its identity
await conversation.add("identity");

// add a non-chat participant to the conversation
const proxyAddress = "+11222333";
const address = "+12345678";
await conversation.addNonChatParticipant(proxyAddress, address);

// adds yourself as a conversations sdk user to this conversation
// use after creating the conversation from the SDK
await conversation.join();

conversation.on("participantJoined", (participant) => {
    // fired when a participant has joined the conversation
});
```

---

## List all Participants

You can get the list of all Participants within the Conversation by invoking the corresponding method on the Conversation object.

### List Participants

```javascript
/* Get participants of the conversation */

let participants = await conversation.getParticipants();
```

---

## List new Messages

To list the latest messages of a Conversation, call the appropriate method on the Conversation object and optionally specify the index of a specific Message to start from.

There are a few options, you can review the auto-generated documentation to familiarize yourself with the parameters you can use to modify this behavior.

### List Messages

```javascript
/* get the latest messages of the conversation. optional arguments:
  pageSize | 30,
  anchor | "end",
  direction | "backwards"
 */

// get the messages paginator the latest 30 messages
let messagesPaginator = await conversation.getMessages(30, 0, "backwards");

// get messages
const messages = messagesPaginator.items;
```

---

## List all Conversations

Because all Conversations are private, listing Conversations will only return Conversations that you are participating in. Call the appropriate method to retrieve them.

### List Conversations

```javascript
// get the conversations paginator
let conversationsPaginator = await client.getSubscribedConversations();

// get conversations
const conversations = conversationsPaginator.items;
```

---

## What's Next?

Well done! You've just learned how to create your first Conversation, add a Participant and list your conversations. To learn more, check out these helpful links:

- Learn **How to Send Text and Media Messages** with Conversations
- Check out the **User Reachability Indicator** guide