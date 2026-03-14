# Modifying a Conversation, Message, or Participant

You can modify certain objects in the Conversations SDK (i.e. Conversation, Message, Participant) for connected **Users** with appropriate **permissions**.

---

## Updating

You can update a Conversation object by calling one of the appropriate methods for your chosen language.

For the Conversation, Message, or Participant data object, you could update some specific properties. Please refer to Update a Conversation, Message or Participant code sample.

### Update a Conversation, Message or Participant

**Node.js / TypeScript**

```javascript
/* Updating Conversations/Messages/Participants */

/* Conversations */ 
await conversation.updateAttributes({}); 
await conversation.updateFriendlyName("foo"); 
await conversation.updateLastReadMessageIndex(0); 
await conversation.updateUniqueName("foo"); 

/* Messages */ 
await message.updateAttributes([1, {foo: "bar"}]); 
await message.updateBody("bar"); 

/* Participants */ 
await participant.updateAttributes({foo: 8});
```

---

## Deleting

You can delete a Conversation object by calling the appropriate method for your chosen language. When you remove a Conversation object, all its Messages, attached Media, and Participants will be deleted.

If you want to only delete a Message from a Conversation, call the specific method to remove it from the Conversation, and destroy any attached Media.

If you want to only delete a Participant from a Conversation, call the specific method to remove them from the Conversation.

### Delete a Conversation, Message or Participant

**Node.js / TypeScript**

```javascript
/* Deleting and updating Conversations/Messages/Participants */

/* Conversations */ 
// destroys the conversation, with all its messages and attached media and removes all participants 
await conversation.delete(); 

/* Messages */ 
// remove a message from the conversation, destroying any attached media 
await message.remove(); 

/* Participants */ 
// remove participant from the conversation 
await participant.remove();
```

> ⚠️ **Warning**
> When you delete a parent object, you will also delete its child object. For example, if you remove a Conversation, then all Messages and Participants will be automatically deleted. Once deleted, these resources are unrecoverable.

Check out our auto-generated documentation for more information about Conversations SDK methods and properties: **JavaScript**, **Android** or **iOS**.

---

## What's Next?

Congratulations! 🎉 You've finished the getting started guides. Now, let's explore more Conversations SDK guides:

- Learn about the **Best Practices using the Conversations SDK**.
- Read about **Error Handling and Diagnostic** to help you debug your application.