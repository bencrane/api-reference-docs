# Conversations Limits

The Conversations API has a few limits that you should be aware of when building conversational messaging features.

These limits are enforced at the Conversation, Participant, Message, and Operation levels.

## Length limits

### Resource: Conversation

| Field | Maximum length/size |
|-------|---------------------|
| FriendlyName | 256 characters |
| Attributes | 16KB |

### Resource: Conversation Message

| Field | Maximum length/size |
|-------|---------------------|
| Body | Inbound: 32KB / Outbound: depends on channel (WhatsApp and SMS: 1600 Characters, Chat: 32KB) |
| Attributes | 4KB |

### Resource: Conversation Participant

| Field | Maximum length/size |
|-------|---------------------|
| Identity | 256 characters |
| MessagingBinding.Address | 256 characters |
| MessagingBinding.ProxyAddress | 256 characters |
| Attributes | 4KB |

## Counter limits

### Participants per Conversation

A Conversation can have up to 1000 Participants, including up to 50 non-chat Participants (e.g., SMS and WhatsApp). The non-chat Participants will receive a blast-type Message from the group in the Conversation. For example, an SMS-based Participant will receive Messages from a single phone number and won't experience the group-style Conversation. When the SMS Participant responds, their Message will go to all Participants.

To create a group Conversation for SMS Participants, refer to our guide, Group Texting in Conversations.

> **Note:** Group MMS can have up to 10 Participants.

### Maximum channels/conversations per identity

A Chat identity (Chat user) can be part of 1000 active or inactive Conversations and Chat Channels. Adding a participant whose identity already belongs to 1000 or more Conversations/Chat Channels will result in an error.

### Channels per Service Instance

Unlimited — each Service Instance can hold as many channels as you wish!

## Media limits

### Media limits from Chat Participants

Any media file type of up to 150MB is supported between chat-based participants. The Chat client must contain logic for Chat members to consume media of the various types.

JPG, PNG, MP3, AMR, MP4, and PDF files with a filesize of less than 5MB will be delivered from Chat participants to SMS. If a message originating from a Chat SDK client contains a media file that is greater than 5MB in size, it will not be fanned out as an MMS message. However, Chat SDK consumers will still be able to retrieve the media file. Chat participants are also able to send and receive multiple pieces of media in addition to a text body in the same message, while SMS and WhatsApp participants will only receive a single piece of media and the text body will be dropped.

WhatsApp messages are currently limited to media files of up to 16MB in size.

### Media limits from non-Chat participants

For non-Chat participants, the channel's own limits apply. Examples of channels include MMS and WhatsApp.

A single MMS message can contain no more than ten media files, and the total size of all media within the message cannot exceed 5MB. Please see Accepted Content Types for Media to learn what media types are supported by MMS.

Any single file cannot exceed 2MB, but you should note that a carrier may impose additional limits on file size.

A single WhatsApp message may contain one piece of media, of maximum size 16MB. Supported filetypes include JPG, PNG, MP3, AMR, MP4, and PDF.

## Operational limits

### APS ("Actions per Second")

An action is an operation that mutates the state of a Conversation and other resources, such as sending a message, updating the friendly_name of a Conversation, or adding/removing a participant, etc. Read actions are not limited under APS.

All operations are rate-limited with a default maximum set at 30 APS. Some operations are rate-limited globally, ie. per Service, while others are limited per conversation. Refer to the table below to see whether a given resource is limited per Service or per Conversation.

| Resource | Create | Update | Delete |
|----------|--------|--------|--------|
| Conversation | Service | Conversation | Service |
| Participant | Conversation | Conversation | Conversation |
| Message | Conversation | Conversation | Conversation |
| User | Service | Service | Service |
| Role | Service | Service | Service |

### Connection Limits

Twilio Conversations also apply rate limits to the actions (reads/writes/updates) in order to ensure quality of service for all our customers.

The following tables summarize the various connection limits that are applied for SDKs:

| Limited Quantity | Prescribed Limit | Notes |
|------------------|------------------|-------|
| Number of Concurrent Connections | up to 7,000 in each Twilio Subaccount and 100,000 overall, shared among all your Subaccounts. | The number of concurrent connections through Twilio's internal websockets |
| Rate of Connection Establishment | up to 110/s in each Twilio Subaccount and 1,000/s overall, shared among all your Subaccounts. | The number of new or re-established connections per second through Twilio's internal websockets |
| Rate of Upstream Requests | up to 500/s per connection and up to 20,000/s per Subaccounts | The number of upstream requests per second that pass through Twilio's internal websockets. Conversations internal upstream systems help with responses for a particular request |