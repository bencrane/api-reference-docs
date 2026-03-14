# Getting Started - Overview

Twilio Conversations is an omni-channel messaging product. You can use it to build engaging experiences on any channel we support.

With Twilio Conversations, you can, for example:

- Connect customers with support agents via chat using our SDK
- Bridge previously siloed channels with each other, like SMS and WhatsApp
- Support customers on the channel they prefer from inside your existing tools
- Reduce friction by handling requests using bots
- Proxy messages between two SMS numbers

Any channel we support can be connected together. Conversations also supports common chat features like typing indicators and read horizon to build pure chat applications.

> **Info:** Use of the Conversations API is limited to interactions involving at least one human participant. For application-to-application communication, see www.twilio.com/sync.

This overview introduces key concepts you'll need when working with Conversations.

---

## What is a Conversation?

The Conversation object is a core component of Twilio Conversations. A Conversation is a distinct message thread that contains Participant objects, which represent humans or bots who are participating in the Conversation. A Participant sends a Message, which is relayed to every other Participant in the Conversation.

Messages are routed to a real-world endpoint, like an application that uses the Conversations SDK, a mobile phone's SMS application, or a user's inbox on Facebook Messenger.

Users connected via the Conversations SDK will be uniquely identified by their identity. This value is set in the Access Token you'll generate and provide to your application.

For external channels like SMS, WhatsApp, and Messenger, the external address is mapped to a Twilio-controlled proxy address. Examples include a Twilio phone number, a Twilio WhatsApp sender, or a Facebook page you connected to Twilio. This pair of addresses (external and Twilio-controlled) uniquely identifies a non-chat Participant in Conversations. The proxy address acts as the external user's "window" into the Conversation.

---

## What is a Message?

Messages in a Conversation can contain text, media, or both. You can attach up to ten Media objects to a single Message. Because different channels support different file types and file sizes, resizing, and delivery of media is best effort. Ensure that media conforms to the limits of the channels involved in your Conversations.

You can learn more about Media Messaging in the SDK and in the REST API.

---

## Connect Conversations to your application

Twilio provides SDKs for JavaScript, iOS, and Android so that you can integrate Conversations into your client-side applications. Our SDK connects your application to Conversations via a WebSocket, which allows you to receive events and objects that are relevant to your application's user in real time.

To connect, you'll generate a time-sensitive user-specific Access Token on your server and return it to your client-side application. The identity that you set in the Access Token will determine which User the SDK connects as.

> **Warning:** Never store your Twilio account credentials in your client-side application.

Once you've initialized the SDK, you can retrieve, create, modify, and delete Conversations, Messages, and other objects. Twilio also sends you real-time events when changes happen, like when a new Message is added to a Conversation or when your User is added to a new Conversation. You can use this information to build your user interface.

---

## What are Users

Your client-side application connects to Conversations as a specific User. Users can only access Conversations they have been added to. To add someone to a Conversation, you'll need to create a new Participant in the Conversation. A User controls a unique Participant in each Conversation they're a member of.

---

## How to join a Conversation

When joining a Conversation from an external channel, you will be mapped to the Conversation via a channel-appropriate address controlled by Twilio. Examples of these include phone numbers you've purchased from Twilio, WhatsApp senders you've configured on the Twilio platform, and Facebook pages you linked through the Twilio Console. These addresses are known as Proxy Addresses.

The Proxy Address acts as the person's "window" into the Conversation. In other words, they'll be exchanging messages natively with that address. For example, if someone using SMS was added to a Conversation, they'd receive Conversation Messages as SMS originating from the Proxy Address. To reply, they'd send an SMS back to the Proxy Address.

---

## How Twilio handles incoming messages

When Twilio receives a message from an external channel, we check the to and the from addresses. If this pair matches an existing mapping to a Conversation, we'll insert it into the Conversation as a Message from the Participant that uses that mapping. This mapping is known as a Messaging Binding.

If an incoming message doesn't match an existing mapping, we'll check if you've used the Address Configuration API or a Messaging Service. If you turned on autocreation for that Proxy Address, we'll create a Conversation. We'll add a Participant to it with that Messaging Binding, and insert the Message into the Conversation.

---

## What is a Service?

A Service is a unique instance of Twilio Conversations. If you have multiple Services, you'll notice that Conversations, Users, and other objects in one Service can't interact with objects from another Service. It's an opaque partition. Generally, use cases call for one Service. If you're an ISV or have another use case that you believe requires multiple instances, Subaccounts are usually a better option.

---

## How to use Conversations in Flex

If your organization uses Flex for its contact center, the Flex Conversations architecture lets you use Twilio Conversations to turn on async channel capabilities. To implement Conversations in Flex, you also need to use the Interactions API for the functionality to work correctly. To get started using Conversations to send and receive messages in Flex, see the following Flex developer guides:

- Receive Inbound Messages with Flex Conversations Channels
- Send Outbound Messages with Flex Conversations Channels

---

## Next steps

After you understand the basics of Conversations, explore these resources:

- Create your first Conversation with the Conversations Quickstart
- Explore the Conversations JavaScript Quickstart
- Learn more with our REST API documentation