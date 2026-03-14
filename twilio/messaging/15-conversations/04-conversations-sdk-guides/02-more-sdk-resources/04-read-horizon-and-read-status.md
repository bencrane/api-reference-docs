# Read Horizon and Read Status in Conversations

In a Conversation, Participants often expect to see how far in the series of messages they and other Participants have read. The Read Horizon feature in Twilio Conversations allows the Read Status of a chat or WhatsApp Participant's Message to synchronize across devices and endpoints. By implementing the Read Horizon, your Conversations UI can indicate the last "read" message by a Participant in a Conversation.

> ℹ️ **Info**
> This guide applies to setting the Read Horizon for chat-based Conversations Participants. For non-chat Participants, consult our guide to Delivery Receipts in Conversations.

---

## Setting an in-app chat Participant's Read Horizon

Using the Read Horizon feature, you can mark messages as "read" for a Participant in a Conversation. Within a Conversation, every chat Participant has their own Read Horizon, which indicates how far they have read; that horizon is under the control of your application.

Whenever you move the Read Horizon in the application, Twilio reacts by informing other Conversation SDKs that the horizon has advanced. This way, they can display how far the Participant has read.

The Conversations API provides the required information and methods for indicating and reading the status of Messages. These are used for building the Read Horizon into your application's UI.

In the browser and on mobile, detecting the moment a Participant has "read" a message depends on your application's user experience. For example, a Participant using a Conversations-backed chat application on their phone or in the browser will scroll through the messages as they read them. Using scrolling as a proxy for reading messages, your application's UI advances the Read Horizon, updating where the Participant has read with the UI indicator of your choice (e.g., a horizon line). Once the Read Horizon is updated, the SDKs will deliver that information to other Participants in the Conversation.

The Participant's `lastReadMessageIndex` determines their Read Horizon in a Conversation. This Participant property references the index property of a Message. The same `lastReadMessageIndex` is also available from the REST API and can also be changed from your backend service.

Each client SDK provides a method that allows the Participant to send a Read Report; this supplies the Participant's last-read Message index for the Conversation.

```javascript
// advance consumption horizon to arbitrary index
activeConversation.getMessages().then(function (messages) {
  if (messages.items.length > 10) {
    // Assume the UI displays the first 5 messages out of many
    // and client wants to mark those as read
    var someMessageIndex = messages.items[4].index;
    activeConversation
      .updateLastReadMessageIndex(someMessageIndex)
      .then(function () {
        // updated
      });
  }
});
```

In addition, there are two helper methods for the most commonly used operations in the Read Horizon feature:

### Marking all Messages as read

You can use the `setAllMessagesRead` method to mark all Conversations Messages read.

```javascript
// Mark all messages read
await activeConversation.setAllMessagesRead();
```

### Marking read Messages back as unread

Use the `setAllMessagesUnread` method to mark all Conversations Messages as unread.

```javascript
// Mark all messages unread
await activeConversation.setAllMessagesUnread();
```

Once you've started using the Read Horizons, you can also start counting unread messages. The Participant's `unreadMessagesCount` indicates the number of unread Messages in a Conversation for a Participant. This is useful for custom badge counts on your mobile app or for your background notifications.

**Note:** Indexes are not always consecutive, but they are always sequential.

---

## Explicitly set the Read Horizon for new Participants

The Conversations SDKs do not automatically set the Read Horizon for chat Participants. If you do not explicitly set this within your application, no Read Horizon will exist for a chat Participant within a Conversation.

In other words, no messages will display a read or unread status. Additionally, without a Read Horizon, your Participant's read status (Read Horizon) will not synchronize across clients.

If a Participant in a Conversation has no read status, their last-read index and timestamp will be null or 0. If the Read Horizon hasn't been set, the following methods will return null on all platforms (Android, iOS, JavaScript):

- `Conversation.getLastReadMessageIndex` for Android SDK and `Conversation.lastReadMessageIndex` for iOS and JavaScript SDKs
- `Conversation.getUnreadMessagesCount` (asynchronous, so null is passed to the listener)
- `Participant.getLastReadMessageIndex` for Android SDK and `Participant.lastReadMessageIndex` for iOS and JavaScript SDKs

**Note:** `getUnreadMessageCount()` returns a max count of 1000. If the active Participant has 1000 or more unread messages, you can render it as 1000+ in your UI.

---

## Configure the interval time for read reports

Remember that chat-based Conversations Participants do not emit delivery receipt information automatically. Therefore, the Read Horizon must be set manually from the Conversations SDK.

Implementing the Read Horizon in your chat UI allows you to show a chat Participant how far they have read in the Conversation. Once you implement the Read Horizon, this consumption information is also batched and fanned out via the SDK client to other Participants.

The Conversations client SDKs batch read reports; they do not send them with every report submission API call. Instead, the batch sends are time-based with a default submission every 10 seconds.

---

## How to display other Participants' Read Messages

You probably want to display how far other Participants have read in a Conversation. You can do this by referencing the "last read message" values on those other Participants. This allows you to build Conversations-backed applications that show who has seen which Messages.

Your Conversations SDK-based application will receive real-time notification whenever a Participant's Read Horizon advances. How this happens depends on the platform used by the remote Participant:

- For WhatsApp Participants, Twilio advances the Read Horizon automatically when they observe a message in the WhatsApp application.
- For browser- or mobile-based chat Participants, the application must tell Twilio when a Participant has scrolled far enough to indicate reading a message. From there, Twilio will trigger the real-time notification towards other Participants.

In other words, when you set the Read Horizon for a given Conversation Participant, the SDK will report that read status, fanning it out to other Participants in the Conversation.

For example, imagine a Conversation between two chat Participants: one joining from their chat application on their mobile device and another from a web-based chat interface.

- Each Participant has their own Read Horizon. First and foremost, this tells each of them how far they themselves have read in the Conversation
- That Read Horizon information is also published to all other Participants. Using that information, each Participant also can see how far the other Participants have read in the Conversation.

The following code is a sample of how you might display how far other Participants have read by using the Message Status.

```javascript
// retrieve the list of members for the active channel
var participants = activeConversation.getParticipants();
// for each Participant, set up a listener for when the Participant is updated
participants.then(function (currentParticipants) {
  currentParticipants.forEach(function (participant) {
    // handle the read status information for this Participant
    // note: this UI method uses the provided information to render
    // this to the given Participant in the UI.
    updateParticipantMessageReadStatus(
      participant.identity,
      participant.lastReadMessageIndex,
      participant.lastReadTimestamp
    );
  });
});
```

To determine which content (Message) another Participant has read, reference their `last_read_message_index`. It is also possible to show when a Participant last set their Read Horizon by referencing their `last_read_timestamp` property. These are both properties on the Participant instance.

For real-time display, you can also use these two properties to show changes to all Participants' Read Horizons by listening to the `participantUpdated` event on a Conversation instance. When the `participantUpdated` event fires, your application can check the Participant's identity, lastReadMessageIndex, and lastReadTimestamp via the SDK. For example, this could be displayed with the following code sample:

```javascript
// this code assumes you have a variable named activeConversation for
// the currently active channel in the chat UI
activeConversation.on("participantUpdated", function (event) {
  // your own UI method
  updateAppUI(
    event.participant.identity,
    event.participant.lastReadMessageIndex,
    event.participant.lastReadTimestamp
  );
});
```

**Note:** If the Read Horizon is not set for a Participant's Conversation Messages, other Conversation Participants will not know up to which message that Participant has read within the Conversation.

---

## What's next?

This guide covers the basics of implementing a Read Horizon in Conversations-backed chat applications. For more information:

- Read about delivery receipts for SMS and WhatsApp Participants
- Learn more about Conversations Webhooks
- Read up on Best Practices for using the Conversations SDKs