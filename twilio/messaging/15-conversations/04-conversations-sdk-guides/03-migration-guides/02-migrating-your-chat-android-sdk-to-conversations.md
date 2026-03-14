# Migrate your Chat Android SDK to Conversations

We are happy you decided to migrate your Programmable Chat Android SDK to Conversations. It is a great decision and this guide will simplify the process a lot. You will need to perform several rather mechanical changes to convert your existing application code utilizing Twilio Chat to Conversations. One thing is important here, you will need to use Programmable Chat Android SDK 6.0.0 as a minimal version to be able to migrate without any breaking changes.

## Update supported Java version

Add to your project's `build.gradle` the following compile options, necessary to use Java8 syntax features:

```groovy
compileOptions {
    sourceCompatibility JavaVersion.VERSION_1_8
    targetCompatibility JavaVersion.VERSION_1_8
}

// Also if kotlin is used in the project
kotlinOptions {
    jvmTarget = '1.8'
}
```

## Rename imports

Rename java package imports from `com.twilio.chat` to `com.twilio.conversations`

## Rename entities

- `ChatClient` to `ConversationsClient`
- `Channel` to `Conversation`
- `Member` to `Participant`

## Remove or replace not supported methods

- **Public channels:** `ConversationsClient.getConversation(sid)` now returns error code `CONVERSATION_NOT_FOUND` if channel with the given SID is public.
- **Media.download()** is removed, use `Message.getMediaContentTemporaryUrl()` instead.
- **getSubscribedChannelsSortedBy()** method. Sort list returned by `ConversationsClient.getMyConversations()` instead.
- **ChannelDescriptor, UserDescriptor** are not needed anymore and removed. Use `Conversation` and `User` objects instead.
- **Paginator** class is not used anymore and is removed.
- **Invites to a channel** are not supported. Use `Conversation.addParticipantByIdentity()` and `addParticipantByAddress()` instead.
- **onConversationJoined()** callback is temporarily removed. Use `onConversationAdded()` instead.
- **Conversation** doesn't implement `Parcelable` interface anymore. Instead store Conversation objects in your ViewModel or Repository following the Recommended app architecture. Use `Conversation.sid` as unique key if necessary to pass around and retrieve the Conversation information.

## Refactor method calls

`someMethod()` here indicates any of the methods existing previously on certain objects, now they are slightly moved to make API more convenient to use.

- `ChatClient.getChannels().someMethod()` becomes `ConversationsClient.someMethod()`
- `Channel.getMembers().someMethod()` becomes `Conversation.someMethod()`
- `Channel.getMessages().someMethod()` becomes `Conversation.someMethod()`
- `Message.getMedia().someMethod()` becomes `Message.getMediaSomeMethod()`
- `ChatClient.getUsers().someMethod()` becomes `ConversationsClient.someMethod()`
- `ChatClient.getSubscribedChannels()` becomes `ConversationsClient.getMyConversations()`

## Rename consumptionHorizon to readHorizon

This highlights the fact that this horizon is best useful for implementing messages that have been read. Delivery horizon could be implemented through a combination of delivery receipts and custom attributes on messages.

- `getLastConsumedMessageIndex()` → `getLastReadMessageIndex()`
- `setNoMessagesConsumedWithResult()` → `setAllMessagesUnread()`
- `setAllMessagesConsumedWithResult()` → `setAllMessagesRead()`
- `setLastConsumedMessageIndexWithResult()` → `setLastReadMessageIndex()`
- `advanceLastConsumedMessageIndexWithResult()` → `advanceLastReadMessageIndex()`
- `getUnconsumedMessagesCount()` → `getUnreadMessagesCount()`
- `getLastConsumedMessageIndex()` → `getLastReadMessageIndex()`
- `getLastConsumptionTimestamp()` → `getLastReadTimestamp()`
- `UpdateReason.LAST_CONSUMED_MESSAGE_INDEX` → `UpdateReason.LAST_READ_MESSAGE_INDEX`
- `UpdateReason.LAST_CONSUMED_MESSAGE_TIMESTAMP` → `UpdateReason.LAST_READ_TIMESTAMP`

## Update Listeners syntax in Kotlin

`CallbackListener`, `StatusListener` and `ProgressListener` are now interfaces (not abstract classes). Remove constructor invocation in Kotlin code to make it compile:

```kotlin
object : StatusListener() { … }
```

becomes

```kotlin
object : StatusListener { … }
```