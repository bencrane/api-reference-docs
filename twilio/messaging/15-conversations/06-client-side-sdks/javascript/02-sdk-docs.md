# JavaScript SDK Documentation

**Current Version:** 2.6.5

**Full API Reference:**
https://sdk.twilio.com/js/conversations/releases/2.6.5/docs/index.html

## Key Classes

- **Client** - Main entry point for the Conversations SDK
- **Conversation** - Represents a conversation between participants
- **Message** - Represents a message in a conversation
- **Participant** - Represents a participant in a conversation
- **Media** - Handles media attachments
- **User** - Represents a user in the system

## Installation

```bash
npm install @twilio/conversations
```

## Quick Start

```javascript
import { Client } from '@twilio/conversations';

const client = new Client(token);

client.on('connectionStateChanged', (state) => {
  console.log('Connection state:', state);
});

client.on('conversationJoined', (conversation) => {
  console.log('Joined conversation:', conversation.friendlyName);
});
```
