# iOS SDK Documentation

**Current Version:** 4.0.3

**Full API Reference:**
https://sdk.twilio.com/ios/conversations/releases/4.0.3/docs/index.html

## Key Classes

- **TwilioConversationsClient** - Main entry point for the Conversations SDK
- **TCHConversation** - Represents a conversation between participants
- **TCHMessage** - Represents a message in a conversation
- **TCHParticipant** - Represents a participant in a conversation
- **TCHMedia** - Handles media attachments
- **TCHUser** - Represents a user in the system

## Installation

### Swift Package Manager

Add the package URL in Xcode:
```
https://github.com/twilio/conversations-ios
```

### CocoaPods

```ruby
pod 'TwilioConversationsClient'
```

## Minimum Requirements

- iOS 12.0+
- Swift 5.0+
- Xcode 13+

## Quick Start

```swift
TwilioConversationsClient.conversationsClient(
    withToken: token,
    properties: nil,
    delegate: self
) { result, client in
    if result.isSuccessful {
        // Client ready
    }
}
```
