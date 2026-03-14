# Inbound Message Handling & Autocreation

Twilio Conversations is built for two-way messaging, so handling inbound messages is critical for your end-user experience. This guide describes the rules that determine where an inbound message goes, as well as how you can use the Conversations API to change that outcome.

## Key Principle: the To/From number pair

In all supported messaging channels (SMS, MMS, WhatsApp), a Participant in a Conversation is defined by their number pair. This is essentially the To/From pair on the Message:

- the sender, or From number, corresponds to a MessagingBinding.Address (a consumer's number)
- the receiver, or To number, corresponds to a ProxyAddress (a Twilio number)

You can think of a ProxyAddress as a Participant's window into a given Conversation, which may include another SMS or chat Participant. The sender sends Messages from their mobile number to the Twilio number in order to participate in the Conversation. Notably, the SMS Participant receives all of the messages through that one proxy address number, and they don't know how many people it represents.

> **Note:** Only one Conversation — that is, one Participant in an Active Conversation — can bind a number pair together. In other words, a Participant's to/from number pair can only be in one active Conversation at the same time.

Because that number pair is unique, it determines the Conversation where an inbound SMS or WhatsApp Message goes. And this constraint applies to the entire pair, meaning:

- The same consumer can be in contact with multiple Twilio numbers (different Participants, and different Conversations). For example, a consumer can be part of different Conversations by binding their personal mobile number to different ProxyAddresses (one ProxyAddress for each Conversation).
- The same Twilio number can be in contact with any number of consumers. For example, a single Twilio Proxy number can represent multiple customer service agents, each chatting with different end users in separate Conversations.

Once a Participant is created, that number-pair is bound together until one of the following happens:

- that Participant is removed,
- the Conversation is deleted, or
- the Conversation State is set to closed.

## Conversations vs. Programmable Messaging Inbound

If you're already familiar with Twilio Programmable Messaging, Conversations also uses webhooks to trigger actions. You can use Conversations webhooks to do things like add chatbots, add automatic replies, and implement spam filtering. However, Conversations has one significant difference: it does not send incoming SMS webhooks like Programmable Messaging does. Those webhooks fire independently.

There are two things determining how Conversations handles inbound messages. The first is the "to/from number pair" principle described above.

The second key factor is a rule: **If the Message belongs in a Conversation, the Conversation captures it first.**

Specifically, if the number-pair matches a Participant in an active Conversation, that Message is delivered to the Conversation. This triggers Conversations Webhooks and commits that Message to the Conversation Messages list. The message will also appear in the Programmable Messaging logs and will be processed as a normal SMS.

## Inbound Autocreation

A Console redesign is planned to allow selecting both the Programmable Messaging webhook and the Conversations Autocreation feature as per the flowchart above. Currently, you can select only one or the other.

If the Message does not belong to a Conversation, one of two things could happen. Either:

- The ordinary Programmable Messaging webhooks are invoked (with the Incoming Message Webhook) or
- Conversation Autocreation is invoked

For the second option, you can use the Address Configuration API to enable the Conversation Autocreation feature, or you can set the configuration in your Messaging Service. The latter takes effect for any Message to any numbers in that Messaging Service. For that reason, there's a separate opt-in switch in the Conversations console that you need to "unlock" first.

If the phone number's own webhook is set, it will always fire regardless of whether the number is tied to any Conversation.

## Settings for enabling Autocreation in Conversations

You can enable Autocreation through either the Address Configuration API or the Twilio Console.

### Enabling Autocreation through the Address Configuration API

You can now use the Address Configuration API to specify which unique address (i.e. WhatsApp or SMS phone number) should enable the Conversations Autocreation feature upon receiving an inbound message, independent of the usage of the Messaging Service. With this API, you can enable and configure inbound messaging for individual addresses to support your use case.

### Enabling Autocreation through the Twilio Console

You can also configure Autocreation for your Messaging Service in the Twilio Console so that any Message that does not already belong to a Conversation (as identified by the number-pair) will automatically have one created.

First, in the Messaging Service, the Handle Inbound Messages with Conversations option should be toggled to Unlocked.

Second, in the Integration Section of Programmable Messaging in the Console, the Autocreate a Conversation option should be selected. (You can select Autocreate a Conversation only if the Handle Inbound Messages with Conversations toggle is set to Unlocked.)

Make sure to click Save to implement your changes!

> ⚠️ **Warning:** After enabling or disabling Autocreation in the Twilio Console, your changes may take up to 60 seconds to take effect. During these 60 seconds, the previous setting will be in effect.

## Webhooks on Autocreation

Autocreation creates several resources in rapid succession, all of which produce webhooks:

- **onConversationAdd** (pre-action webhook) will fire, containing the Message body and the complete number pair. You can either accept this Conversation (triggering the remaining webhooks) or reject this request to prevent Conversation autocreation. If you reject this, the Message will be dropped, as specified for this webhook.

If your server code responds with 200 OK:

- **onConversationAdded** will fire, indicating the successful creation of a new Conversation.
- **onParticipantAdded** will fire, describing the number pair above.
- **onMessageAdded** will fire, describing the Message body.

> **Note:** onParticipantAdd and onMessageAdd do not fire during autocreation. The only opportunity to reject this Message is upon the creation of the Conversation itself. In other words, with Autocreation enabled, you can only reject a Conversation Message by stopping the entire creation of the Conversation.

> ℹ️ **Info:** Webhooks will not fire if you disable them globally or at the service level. If a webhook is not firing as expected, check your Webhook Filtering settings in the Twilio Console at the global level or Conversation Service level to make sure that the relevant webhooks are enabled.

### Example: How Webhooks and Conversation Participants interact

Let's say that you have already purchased a Twilio Phone Number and have set up the incoming SMS URL to point to your web application, as described in the SMS documentation. At this point, when you receive incoming SMS Messages on your Twilio Phone Number, Twilio will send a request to the webhook URL that you specified.

Next, suppose you create a Conversation Participant (with a to/from number pair, as described above) that binds a mobile number A to your Twilio Phone Number. That particular to/from number pair (and only that pair) is now bound to Conversations, but Messages from any other mobile numbers (B, C, D) remain unbound and continue to trigger webhooks to the SMS URL that you set above.

Effectively, you've moved a single relationship (mobile number A to your Twilio Phone Number) onto Conversations, but the rest of your customers (mobile numbers B, C, and D) remain on the pre-established setup.

As soon as you delete that Conversation Participant (mobile number A and Twilio Phone number), you start getting incoming SMS webhooks again, rather than having the Messages routed to Conversations.

## Guidance for migrating to Conversations with Autocreate

With Twilio Conversations, you can automatically create new Conversations for inbound messages. If you are already using Programmable Messaging to process inbound messages, we recommend that your switch to Conversations follow the following pattern.

### 1. Create Conversations explicitly via REST

Initially, you should leave Autocreate disabled and migrate one Conversation at a time, creating those Conversations using the Conversations REST API. The rules described above work in your favor here: Your existing Programmable Messaging logic (i.e., your incoming SMS webhook) will hold for all inbound Messages except those for which you create a Conversation Participant that binds to that number pair.

By doing this, you can test your logic on individual Conversations, which likely means one consumer-agent relationship at a time. Those migrated Conversations immediately receive full support from the browser and mobile SDKs, and Conversations webhooks fire specifically for those Conversations. This keeps risk low while you explore and develop.

### 2. Start with an empty Messaging Service, then enable Autocreation

Usually, to handle inbound Messages in customer service use-cases (where consumers reach out unsolicited), you'll want to enable Autocreation. In order to mitigate risk while migrating from Programmable Messaging, we recommend starting from an empty Messaging Service, i.e. remove all Senders from the Conversations Messaging Service. After doing so, it will be safe to enable Autocreation for Conversations.

With an empty Messaging Service sender pool attached to a Conversation, you can enable Autocreate without affecting your existing SMS applications and Phone Number webhook logic.

### 3. Migrate one Phone Number at a Time

At this point, your logic is in place, so you can begin moving over Phone Numbers to your Conversations Messaging Service slowly, ensuring that the logic is correct.

One at a time, add your Twilio Phone Numbers to the Conversations Messaging Service. Autocreate will immediately take hold for those numbers that you add to the sender pool — and only those numbers. We recommend observing and spot-testing between the first migrations, looking for any incidental errors.

### 4. Use the REST API to complete the migration

Once it's clear that no bugs are emerging, you can accelerate your migration by using the Messaging Service REST API to add phone numbers to your Messaging Service from a script. Once all the numbers are on the Messaging Service, Autocreation applies immediately to the full set of numbers in the Service's Sender Pool.

## How Group MMS handles inbound messages

If you're using our public-beta Group MMS support (from the US or Canada) the same rules apply as above: if the Message is destined for a Conversation, the Conversations API will deliver it to the correct Conversation, as well as fire the appropriate webhooks.

Otherwise, as above, either inbound Autocreation or ordinary (non-Conversations) Programmable Messaging webhooks take hold. (Note that Twilio Programmable Messaging does not support Group MMS). The switch to enable Autocreation for Group MMS is exactly the same.

## Autocreation in Group MMS

However, there are a few differences in inbound handling and Autocreation for Group MMS.

### The "Number Pair" becomes the "Number Group"

When managing 1:1 Conversations, it generally makes sense to use Address+ProxyAddress number pairs, with both numbers (the Twilio Phone Number and the personal mobile number) assigned to the SMS Participant in question. This is what we saw above.

In Group MMS Conversations, Participants look different:

- Participants on SMS only have Address (no ProxyAddress).
- Application-side Participants ("chat" Participants) will have a ProjectedAddress.
- You may have up to twenty (20) total Addresses and ProjectedAddresses in a Group MMS Conversation.

Therefore, for Group MMS, the "number pair" principle described above no longer applies. Instead, the inbound target of a Group MMS Message is the "number group." To arrive at a Conversation, the sorted set of all senders (From=) and receivers (To=) on the Message must match the sorted set of Addresses and ProjectedAddresses on some existing Conversation.

### Autocreation Webhooks for Group Texts

When autocreating a Group MMS Conversation, the order of webhooks has two important nuances:

First, onConversationAdd contains a complete list of all Participants across MessagingBinding.Address (the receivers) and MessagingBinding.AuthorAddress (the sender).

Second, the state of the Conversation remains at initializing — meaning that the Conversation cannot be changed except to accept or reject changes — until the onConversationStateUpdated webhook indicates that all the resources have been created.

## What's Next?

With inbound message handling and autocreation, you can create seamless conversational messaging for your end users. Check out some of our other resources to continue building with Twilio Conversations:

- Group Texting in Conversations
- Migrating to Conversations from Programmable Chat
- Using WhatsApp with Conversations