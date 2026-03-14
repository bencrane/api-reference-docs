# Conversations Attributes

## Overview

The attributes property unlocks the potential to add additional context about specific objects. You can use this functionality to build many capabilities into your application. Some common use cases you could build are:

- Skill-based routing for Conversations
- Avatar URLs in a User profile
- Context about customers (i.e. referral source, product type, etc.)
- Message replies/threading
- Emoji reactions to messages
- Profile information
- Message metadata
- Customer loyalty status
- Non-chat Participant display name

This property is optional, and the field value is a JSON object that can store up to 16 KB depending on the object. If the attributes are not set, then an empty object is returned.

You can use the `attributes` field in any of the following Conversations objects:

| Object | Size Limit |
|--------|------------|
| Participant | up to 4 KB |
| User | up to 16 KB |
| Conversation | up to 16 KB |
| Message | up to 4 KiB |

Refer to **Conversations length limits** for more details.

---

## Set or modify Attributes

You can set the attributes of an object by calling the update method on the object you want to add to. For example, you can add attributes to an existing Message by passing the correct method and specifying the attributes on that Message object.

You can also add attributes to objects when you create them. For example, you can set attributes when you add a Participant to a Conversation.

To retrieve the attributes for an object, just make sure to invoke the corresponding method or property. The attributes will be returned in JSON format.

### Set or Modify Attributes

**Node.js / TypeScript**

```javascript
/* Using Attributes */

// add attributes to a message 
const message = await conversation.prepareMessage().setBody("message text"); 

await conversation.setAttributes("attribute"); 
await conversation.setAttributes(2); 
await conversation.setAttributes(true); 
await conversation.setAttributes({attributeKey: "attributeValue"}); 
await conversation.setAttributes(["attribute", "anotherAttribute"]); 

// get the attributes 
const messageAttributes = message.attributes; 

// add participant to the conversation with attributes 
await conversation.add("identity", "attribute"); 
await conversation.add("identity", 2); 
await conversation.add("identity", true); 
await conversation.add("identity", {attributeKey: "attributeValue"}); 
await conversation.add("identity", ["attribute", "anotherAttribute"]); 

// get the attributes 
const participant = await conversation.getParticipantByIdentity("identity"); 
const participantAttributes = participant.attributes;
```

---

## Listen for changes to these objects

To receive events about updates to object attributes, listen for "update" events at the Client object (e.g. `conversationUpdated`, `messageUpdated`, etc.). The event update reason will indicate that the attributes were changed and include the updated object.

---

## What's Next?

Well done! You can continue learning more about Conversations by checking out the following guides:

- Learn **how to Modify a Conversation, Message, or Participant**
- Explore the **Conversations Swift Quickstart (iOS)**