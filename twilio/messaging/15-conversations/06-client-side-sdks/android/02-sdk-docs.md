# Android SDK Documentation

**Current Version:** 6.2.1

**Full API Reference:**
https://sdk.twilio.com/android/conversations/releases/6.2.1/docs/convo-android/index.html

## Key Classes

- **ConversationsClient** - Main entry point for the Conversations SDK
- **Conversation** - Represents a conversation between participants
- **Message** - Represents a message in a conversation
- **Participant** - Represents a participant in a conversation
- **Media** - Handles media attachments
- **User** - Represents a user in the system

## Installation

Add to your `build.gradle`:

```gradle
implementation 'com.twilio:conversations-android:6.2.1'
```

## Minimum Requirements

- Android SDK 21+
- Kotlin or Java

## Quick Start

```kotlin
val props = ConversationsClient.Properties.newBuilder().createProperties()
ConversationsClient.create(context, token, props, object : CallbackListener<ConversationsClient> {
    override fun onSuccess(client: ConversationsClient) {
        // Client ready
    }
})
```
