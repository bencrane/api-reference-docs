# Conversations Fundamentals

Twilio Conversations is a cloud-based messaging product that natively supports conversations via SMS, MMS, and WhatsApp as well as chat. It provides a number of client SDKs and a REST API for integrating multichannel capabilities into your applications and websites.

## Data types

In Twilio Conversations, there are several core data types or objects that you will interact with.

### Conversation Services and Messaging Services in Conversations

| Resource Object | SID Format |
|-----------------|------------|
| Conversation Service Instance | ISXXX... |
| Messaging Service Instance | MGXXX... |

Conversations is a multichannel messaging API, so you can connect people ("Participants") over various channels, all in one interaction ("Conversation"). Underneath each Conversation are both Conversation Service Instances and Messaging Services, which provide the ability for chat and non-chat Participants to join.

If you want to have both chat and non-chat (e.g., SMS or WhatsApp) channels in the same Conversation, you need to configure two different types of services.

First, you need a Conversation Service in order to create a chat-to-chat Conversation. This Conversation Service instance is where all the Conversations, Messages, Participants, and other resources within a Conversation instance live. While you can have many Services in a Twilio Account, Conversation Service instances are entirely isolated from one another and do not overlap or interact in any way.

If you wish to add non-chat Participants to a Conversation, i.e., Participants using SMS, MMS, or WhatsApp, you must create and/or attach a Messaging Service to the Conversation instance. A Messaging Service is a Messaging Resource.

#### Configuring default Conversation Services and Messaging Services

You can find your "Defaults" (the default Chat and Messaging Services) in the Conversations Section of the Twilio Console.

You can create and configure Conversation Service instances in the following places and ways:

- Using the Twilio Console.
- Using the REST API Conversations Services endpoint.

You can create and configure Messaging Services in the following places and ways:

- Using the Twilio Console.
- Using the REST API Messaging Services endpoint.

### Conversations

> **Info:** Conversations can only be private. There are no public Conversations.

| Resource Object | SID Format |
|-----------------|------------|
| Conversation Instance (Formerly Chat Channel SID) | CHXXX... |

Conversations are the heart of all activity within the Conversation Service instance. Conversation Participants send Messages to the Conversation; these are then distributed to other Participants in the Conversation.

Conversations are private, so Participants must be added to a Conversation before they can see and interact with it. There are two ways to add Participants to Conversation:

- Another Participant with sufficient permissions adds the Participant to the Conversation.
- Your business logic on the backend uses the Conversations REST API to add the Participant to a Conversation.

### Messages

| Resource Object | SID Format |
|-----------------|------------|
| Conversation Message | IMXXX... |

All chat, SMS and WhatsApp Messages exist within a Conversation Service Instance as part of a Conversation. The Conversations API stores Messages in the order in which they were sent, and all Participants of a Conversation can access Messages and create new ones.

Messages can also be edited and removed (subject to Role permissions).

> **Info:** Every Conversation has an underlying Conversation Service. This Service instance captures all of the Conversation Messages, even if there are only non-chat Participants (SMS and WhatsApp).

### Conversation Participants

| Resource Object | SID Format |
|-----------------|------------|
| Conversation Participant Instance | MBXXX... |

Conversations is a Participant-centric system; a Participant is an entity that joins and interacts — reads and sends messages — within a Conversation.

Within the Conversation Service instance underneath a Conversation, everyone has an identity. Each unique chat identity that connects to a Conversation Service instance also creates a Conversation Participant.

Remember: If you add non-chat Participants to a Conversation, you must add them as part of the Messaging Service that is linked to the Conversation. This is often the default Conversations Message Service. Once added to a Messaging Service, a Participant can interact with chat and non-chat Participants by sending and receiving messages on their handset. The Conversations API sends these Conversation Messages as native SMS, WhatsApp, or chat messages, depending on the other Participants' channels.

#### Participant Roles in Conversations

The same person (i.e., a single personal phone or WhatsApp number) can be a non-chat Participant in multiple Conversations concurrently as long as the address they are in contact with (the ProxyAddress) is unique.

A chat Participant can interact in multiple Conversations concurrently with the same identity. You can read more about user identities and "active" users here.

Each Participant has an assigned Role within a given Conversation that dictates what they can do within that Conversation. For example, every Participant has the ability to send Messages as part of their Role. You can also create administrator-type Roles, with the ability to add Conversations, delete Conversations, or invite new Participants to a Conversation.

Adding a new non-chat Participant to an ongoing Conversation immediately allows them to see all subsequent communications.

> **Info:** You can modify Participant permissions to limit the actions and data allowed within a Conversation via their assigned Role.

## The Conversations REST API

Your backend services make requests to the Conversations REST API to handle and delegate system usage. With the REST API, your backend logic can control most aspects of a Service including creating Conversations, adding or removing Participants, sending Messages, and more.

For example, you can use the REST API to create a Conversation and add to it Participants representing a customer service agent and a customer.

## The Conversations SDKs

The Conversations SDKs are intended for mobile and web apps. They share many of the API's fundamentals — understanding these will help you build smoothly and efficiently with the SDKs. The guide to initializing SDK clients introduces these fundamentals and provides code samples for each SDK.

### First-person client SDKs

The Conversations SDKs are used to build end-user Conversations experiences in mobile and web apps. These experiences are designed to be Participant-centric, authenticated, and identified by your backend.

All access and interactions from the Conversations SDK client endpoints happen in the context of a Participant identity interacting with Conversations and Messages Services from within the Conversation Service instance. It is therefore important for your application to perform any necessary authentication and authorization of the Participant before generating an Access Token for their identity.

### SDK connectivity

The client SDKs interact with the Conversation Service instance over a WebSocket connection. The Conversations SDK establishes and maintains this connection. Communication with the Conversation Service is in real-time and is bi-directional in nature. The following protocols and hostnames are used to communicate with Twilio's cloud. If necessary, use this information to configure your firewall to enable communication with Twilio.

| Region ID | Location | Host Name | Port and Protocol |
|-----------|----------|-----------|-------------------|
| us1 | US East Coast (Virginia) | wss://tsock.us1.twilio.com | 443 WSS (websocket over TLS) |
| us1 | US East Coast (Virginia) | https://media.us1.twilio.com | 443 HTTPS (HTTP over TLS) |
| us1 | US East Coast (Virginia) | https://mcs.us1.twilio.com | 443 HTTPS (HTTP over TLS) |

Unfortunately, at this moment it is not possible to use static IP addresses. This is due to the nature of the load-balancing setup. In case an allow-list is required, it is still possible to enable a larger range of Amazon Web Service IP addresses.

### Access Tokens

To interact with a Conversation from an SDK client, you need a valid Access Token. This Access Token is generated by your backend using the relevant Twilio SDK and is cryptographically signed to ensure the contents are trusted by the Conversation Service.

You will also need to implement the Access Token refresh logic if your client uses Access Tokens that are shorter-lived than your chat client sessions in Conversations.

Read more about generating Access Tokens and managing Token lifecycles.

### Asynchronous interactions

The Conversations SDKs all follow an asynchronous model of interaction with the Conversation Service instance. This means that commands from the SDK clients do not block while waiting for the final result of the command, though they will receive a response from the Service upon command acceptance. You implement event handlers (variously called "callbacks", "handlers" or "listeners") on the client side to receive and process the asynchronous responses from the Conversation Service instance.

Each SDK has a particular mechanism for asynchronous event handlers:

1. JavaScript promises.
2. iOS delegates and blocks.
3. Android listeners.

Examples of how these work within the Conversations SDKs can be found in our guide to Initializing SDK Clients.

## Where next?

This guide discusses the fundamental building blocks and data primitives of Twilio Conversations. Continue your Conversations building journey with the following resources:

- Initializing SDK Clients.
- Creating Access Tokens for Conversations SDKs.
- The Conversations REST API.