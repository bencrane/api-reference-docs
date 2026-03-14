# Read Horizon and Read Status Overview

The Read Horizon feature helps to indicate how far along a particular Chat (SDK) Participant is in the Conversation.

---

## Set a Chat Participant's Read Horizon

> ℹ️ **Info**
> The Read Horizon feature is not automatically set. You'll need to set it within your application.

You can mark all of a Conversation's Messages as read by calling the specific method on the Conversation object. For most implementations, marking all messages as read when a user views a particular Conversation in your application is sufficient.

You can also call a different method to set all messages in the Conversation to unread.

To set a Chat Participant's Read Horizon to a specific message, you'll need to retrieve the `index` property of the Message you want to set the horizon to and then call the appropriate method.

> ℹ️ **Info**
> Message indices are sequential (later messages will have a greater index than previous messages), but are not necessarily consecutive (indices between two messages may increment by more than 1).

You can also use an alternate method to advance the index of the last read message in a conversation to a specific index. This method only changes the Read Horizon if the index you provided is greater than the index that the Read Horizon is currently set to.

This action doesn't change the order of messages in the conversation. It only influences which messages are considered as having been viewed by a participant and which messages are still considered "unread."

### Set Read Horizon

**Node.js / TypeScript**

```javascript
/*
Setting Read Horizon (all forms, like setAllRead, setNoneRead, advanceIndex, etc) 
*/

// get a message from conversation 
const message = await conversation.getMessages().items[5]; 

// advance the conversation's last read message index to the current read horizon - won't allow you to move the marker backwards 
await conversation.advanceLastReadMessageIndex(message.index); 

// set last read message index of the conversation to a specific message 
await conversation.updateLastReadMessageIndex(message.index); 

// Mark all messages read 
await conversation.setAllMessagesRead(); 

// Mark all messages unread 
await conversation.setAllMessagesUnread();
```

---

## Display a Participant's Read Horizon

The Conversation SDK will report the Participant's read status and share it with other Participants in the Conversation.

To display how far a specific Participant has read in a Conversation, you will need to get the "last read message" value for that Participant within a Conversation. Once you have this value, you can render this however you want in your UI. For 1:1 messages, some type of checkmark or other visual indicator works well. For group conversations, you'll need to decide how to represent different read positions in the Conversation for each Participant.

From a Conversations list, you can get a specific content (Message) that another Participant has read, by referencing their last read message index.

You can count the number of unread Messages in a Conversation for a specific Participant. This is useful for displaying unread message counters in a list of Conversations.

### Retrieve Read Horizon

**Node.js / TypeScript**

```javascript
/*
Retrieving/checking Read Horizon for rendering 
*/

// get last read message index of your participant in the conversation 
conversation.lastReadMessageIndex(); 

// get last read message index of another participant in the conversation 
participant.lastReadMessageIndex(); 

// check the index of a message 
message.index; 

// get unread messages count for the user, that is, count of all the messages after message 
await conversation.getUnreadMessagesCount();
```

---

## What's Next?

You have finished reading the Read Horizon Overview guide. Let's continue learning more about Conversations:

- Check out our advanced guide for **Read Horizon and Read Status**
- Explore the **Delivery Receipts Overview guide**s