# Migrate your Chat iOS SDK to Conversations

> **Info**
> If you are not using >=4.0.0 of our Chat SDK (or later), please follow the appropriate migration guides to get to v4+ before following this guide.

We are happy you decided to migrate your Programmable Chat iOS SDK to Conversations. It is a great decision and this guide will simplify the process a lot. The bulk of the work is primarily renaming, which will be covered here. You should also review this companion guide that covers the high-level changes and new APIs in Conversations.

## Update your CocoaPods or Carthage dependency

### CocoaPods

```ruby
# Replace

pod "TwilioChatClient"

# with

pod "TwilioConversationsClient"
```

## Rename project imports

### Swift

```swift
import TwilioChatClient

// becomes

import TwilioConversationsClient
```

## Rename entities

- `TCHTwilioChatClient` becomes `TCHTwilioConversationsClient`
- `TCHChannel` becomes `TCHConversation`
- `TCHMember` becomes `TCHParticipant`
- `TCHClientSynchronizationStatusChannelsListCompleted` becomes `TCHClientSynchronizationStatusConversationsListCompleted`

## Refactor method calls

Intermediate accessor objects were removed so your code will look cleaner.

### Client

```swift
TwilioChatClient.chatClient(withToken:properties:delegate:completion:)

// becomes

TwilioConversationsClient.conversationsClient(withToken:properties:delegate:completion:)
```

### Users

```swift
TwilioChatClient.users.subscribedUser(withIdentity:completion:)

// becomes

TwilioConversationsClient.subscribedUser(withIdentity:completion:)
```

### Channel

```swift
Channel.member(withIdentity:)

// becomes

Conversation.participant(withIdentity:)
```

### Channels

```swift
TwilioChatClient.channels.subscribedChannels()
// becomes
TwilioConversationsClient.myConversations()

//-------------------------------------------------------------

TwilioChatClient.channels.createChannel(options:completion:)
// becomes
TwilioConversationsClient.createConversation(options:completion:)

//-------------------------------------------------------------

TwilioChatClient.channels.channel(withSidOrUniqueName:completion:)
// becomes
TwilioConversationsClient.conversation(withSidOrUniqueName:completion:)
```

### Members

```swift
Channel.members.members(completion:)
// becomes
Conversation.participants()

//-------------------------------------------------------------

Channel.members.add(byIdentity:completion:)
// becomes
Conversation.addParticipant(byIdentity:attributes:completion:)

//-------------------------------------------------------------

Channel.members.remove(_:completion:)
// becomes
Conversation.removeParticipant(_:completion:)
```

### Messages

```swift
Channel.messages.sendMessage(with:completion:)
// becomes
Conversation.sendMessage(with:completion:)

//-------------------------------------------------------------

Channel.messages.removeMessage(_:completion:)
// becomes
Conversation.removeMessage(_:completion:)

//-------------------------------------------------------------

Channel.messages.getLastMessages(withCount:completion:)
// becomes
Conversation.getLastMessages(withCount:completion:)

//-------------------------------------------------------------

Channel.messages.getMessagesBefore(_:withCount:completion:)
// becomes
Conversation.getMessagesBefore(_:withCount:completion:)

//-------------------------------------------------------------

Channel.messages.getMessagesAfter(_:withCount:completion:)
// becomes
Conversation.getMessagesAfter(_:withCount:completion:)

//-------------------------------------------------------------

Channel.messages.message(withIndex:completion:)
// becomes
Conversation.message(withIndex:completion:)

//-------------------------------------------------------------

Channel.messages.message(forConsumptionIndex:completion:)
// becomes
Conversation.message(forReadIndex:completion:)

//-------------------------------------------------------------

Channel.messages.lastConsumedMessageIndex
// becomes
Channel.lastReadMessageIndex

//-------------------------------------------------------------

Channel.messages.setLastConsumedMessageIndex(_:completion:)
// becomes
Conversation.setLastReadMessageIndex(_:completion:)

//-------------------------------------------------------------

Channel.messages.advanceLastConsumedMessageIndex(_:completion:)
// becomes
Conversation.advanceLastReadMessageIndex(_:completion:)

//-------------------------------------------------------------

Channel.messages.setAllMessagesConsumedWithCompletion(_:)
// becomes
Conversation.setAllMessagesReadWithCompletion(_:)

//-------------------------------------------------------------

Channel.messages.setNoMessagesConsumedWithCompletion(_:)
// becomes
Conversation.setAllMessagesUnreadWithCompletion(_:)
```

## Remove or replace unsupported methods

- `Channels subscribedChannelsSortedBy`
- `Channels userChannelDescriptorsWithCompletion`
- `Channels publicChannelDescriptorsWithCompletion`
- `Members inviteByIdentity:completion:`

## New APIs

```swift
// added
Conversation.addParticipant(byAddress:proxyAddress:attributes:completion:)

// added
Conversation.removeParticipant(byIdentity:completion:)
```

## Added aggregated delivery receipts

You can get delivery receipts for each SMS or WhatsApp message to understand the current status of delivery.

## Added conversation state

Conversations now have state.

- Added update reason `TCHConversationUpdateState`.
- Current state of conversation you can get by calling `Conversation.state()`

## Rename consumptionHorizon to readHorizon

### Update reasons

- `TCHChannelUpdateLastConsumedMessageIndex` becomes `TCHConversationUpdateLastReadMessageIndex`
- `TCHParticipantUpdateLastConsumedMessageIndex` becomes `TCHParticipantUpdateLastReadMessageIndex`
- `TCHParticipantUpdateLastConsumedTimestamp` becomes `TCHParticipantUpdateLastReadTimestamp`
- `Channel.getUnconsumedMessagesCountWithCompletion` becomes `Conversation.getUnreadMessagesCountWithCompletion`
- `Member.lastConsumedMessageIndex` becomes `Participant.lastReadMessageIndex`
- `Member.lastConsumptionTimestamp` becomes `Participant.lastReadTimestamp`
- `Member.lastConsumptionTimestampAsDate` becomes `Participant.lastReadTimestampAsDate`

## Media changes

There are no more streams used to download media. Instead, you'll retrieve a temporary data URL to download it.

```swift
getMediaContentTemporaryUrl(completion:)
```

## Other changes

- Public conversations are unavailable for Conversations SDK, `conversationWithSidOrUniqueName` returns an error if the conversation is public.
- `TCHChannelType` is removed.
- Instead of removed `subscribedChannelsSortedBy` method, sort the list returned from `myConversations`.
- `TCHChannelDescriptor`, `TCHUserDescriptor` were removed. Use `TCHConversation` and `TCHUser` objects instead.
- Paginators were removed
- Invites are not supported by Conversations SDK. Use `addParticipantByIdentity` and `addParticipantByAddress` instead.
- `TCHConversationStatus` could be now either `joined` or `notParticipating`.