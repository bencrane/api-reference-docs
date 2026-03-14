# Connecting Twilio Studio to Conversations

Twilio Studio is a flexible low-code/no-code application builder for creating your own chatbots and interaction flows triggered by an incoming message from an end-user. You can leverage Studio to automate some level of interaction with your users.

By connecting to Studio via Conversations, you create a distinct message thread for that interaction and unlock the possibility of adding human Participants from other channels after you complete your automated handling. For example, you could add an agent from a web or mobile app that implements the Conversations SDK, or you could connect them to someone via SMS or WhatsApp.

Let's get started!

---

## Building a Studio Flow

First, let's create a basic Studio Flow:

1. Log into your Twilio account in the Twilio Console
2. Navigate to the Studio Flow section in the Console
3. Click the + icon underneath the Flows heading to create a new Flow
4. Name your Flow and click Next
5. You'll see a list of possible templates you can use. Select the **Start from scratch** option and click Next

Once you've created the Flow, you'll see the Flow's Canvas. Let's build out the rest of the project's logic.

---

## Add Widgets to the Canvas

Studio Flows are built from Widgets. These items represent pieces of logic that allow you to handle incoming actions and respond accordingly by performing specific tasks, like sending a message.

Let's start by adding a **Send & Wait For Reply Widget** to the "Incoming Conversation" Trigger.

Then, click on the Send & Wait For Reply Widget to show its Inspector Panel. In the Config tab, add a message body (i.e. "Hi, do you like bots?") and click Save. This tells Studio to receive the incoming message, and then reply with the message you see there in the Widget.

Next, add to the "Reply" transition the **"Split Based On…" Widget** to parse the user response.

Then, open the Split Based On... Widget Inspect Panel and in the Config tab, select the "inbound.Body" option for the "Variable to test" field. Click Save.

In the Split Based On... Transitions tab, let's add conditions that match the possible responses you want to test for.

The Split Based On... Widget lets you access a variable and test conditions on it to determine how to react. In this case, we're testing the body of the message the user sent in response to your "Hi, do you like bots?" message.

Finally, let's add **Send Message Widgets** on each transition with the response you want to send.

This will reply with different messages depending on how the user replied to your initial message. Your Canvas is now set up! To publish the Flow, click **Publish** from the top Canvas menu.

---

## Connecting to Conversations

There are two ways to connect Twilio Studio to Conversations. First, you can set a particular "sender" (e.g. Twilio SMS number or Twilio WhatsApp sender) to automatically create a new Conversation when it receives a message that wouldn't be mapped to an existing Conversation. Second, you can add the Studio Flow to a Conversation that already exists.

### Autocreating Conversations

> ℹ️ **Info**
> You'll need your Studio Flow's SID (FWXXX). You can get this in a few places, like the Studio Flow Console page or in the URL when you're editing the Flow.

> ℹ️ **Info**
> Your Twilio Phone Number should be in E.164 format, like this: +12345678901

For this example, we'll use the Address Configuration API. We're using SMS here, but you could also use other channels we support, like WhatsApp or Messenger.

```bash
twilio api:conversations:v1:configuration:addresses:create \
--type sms \
--address your_twilio_number \
--auto-creation.enabled \
--auto-creation.type studio \
--auto-creation.studio-flow-sid FWXXXXXXX
```

Well done! Now, inbound messages to this address (Twilio phone number) will create a new Conversation (if there isn't one for that number pair) and add the Studio Flow to it.

**Note:** To disable inbound conversation autocreation, delete the Address Configuration.

### Existing Conversations

Alternatively, you can set this up manually on a specific Conversation. First, create a Conversation:

```bash
twilio api:conversations:v1:conversations:create \
—-friendly-name "studio_test"
```

Next, add an external Participant (for this example, we'll use SMS, but it could be any channel):

> ℹ️ **Info**
> Make sure to replace CHXXXXX with your Conversations SID for the Conversation you created in the step above.

```bash
twilio api:conversations:v1:conversations:participants:create \
--conversation-sid CHXXXXXXXXXXXXX \
--messaging-binding.address +15558675310 \
--messaging-binding.proxy-address your_twilio_number
```

Finally, add a Conversation-Scoped Webhook that points to Studio:

```bash
twilio api:conversations:v1:conversations:webhooks:create \
--target studio \
--conversation-sid CHXXXXXXXXXXX \
--configuration.flow-sid FWXXXXXXXXXXX
```

Send a text to the ProxyAddress you specified in your MessagingBinding using the phone number you used as the Address and watch the magic happen! 🎉

---

## Optional: Importing Flow Data from JSON

Instead of adding Widgets to the Canvas, you can import this basic tutorial Flow. You can do this by creating a new Flow, selecting **Import from JSON** from the list of templates in the selection modal, and pasting the JSON Flow definition into the import window.

**Example JSON Flow definition:**

```json
{
  "description": "A New Flow",
  "states": [
    {
      "name": "Trigger",
      "type": "trigger",
      "transitions": [
        {
          "event": "incomingMessage"
        },
        {
          "event": "incomingCall"
        },
        {
          "next": "send_and_reply_1",
          "event": "incomingConversationMessage"
        },
        {
          "event": "incomingRequest"
        },
        {
          "event": "incomingParent"
        }
      ],
      "properties": {
        "offset": {
          "x": 0,
          "y": 0
        }
      }
    },
    {
      "name": "send_and_reply_1",
      "type": "send-and-wait-for-reply",
      "transitions": [
        {
          "next": "split_1",
          "event": "incomingMessage"
        },
        {
          "event": "timeout"
        },
        {
          "event": "deliveryFailure"
        }
      ],
      "properties": {
        "offset": {
          "x": 70,
          "y": 170
        },
        "service": "{{trigger.message.InstanceSid}}",
        "channel": "{{trigger.message.ChannelSid}}",
        "from": "{{flow.channel.address}}",
        "body": "Hi, do you like bots?",
        "timeout": "3600"
      }
    },
    {
      "name": "send_message_1",
      "type": "send-message",
      "transitions": [
        {
          "event": "sent"
        },
        {
          "event": "failed"
        }
      ],
      "properties": {
        "offset": {
          "x": -280,
          "y": 600
        },
        "service": "{{trigger.message.InstanceSid}}",
        "channel": "{{trigger.message.ChannelSid}}",
        "from": "{{flow.channel.address}}",
        "to": "{{contact.channel.address}}",
        "body": "👻"
      }
    },
    {
      "name": "send_message_2",
      "type": "send-message",
      "transitions": [
        {
          "event": "sent"
        },
        {
          "event": "failed"
        }
      ],
      "properties": {
        "offset": {
          "x": 30,
          "y": 600
        },
        "service": "{{trigger.message.InstanceSid}}",
        "channel": "{{trigger.message.ChannelSid}}",
        "from": "{{flow.channel.address}}",
        "to": "{{contact.channel.address}}",
        "body": "🤖"
      }
    },
    {
      "name": "send_message_3",
      "type": "send-message",
      "transitions": [
        {
          "event": "sent"
        },
        {
          "event": "failed"
        }
      ],
      "properties": {
        "offset": {
          "x": 340,
          "y": 590
        },
        "service": "{{trigger.message.InstanceSid}}",
        "channel": "{{trigger.message.ChannelSid}}",
        "from": "{{flow.channel.address}}",
        "to": "{{contact.channel.address}}",
        "body": "👽"
      }
    },
    {
      "name": "split_1",
      "type": "split-based-on",
      "transitions": [
        {
          "next": "send_message_1",
          "event": "noMatch"
        },
        {
          "next": "send_message_2",
          "event": "match",
          "conditions": [
            {
              "friendly_name": "If value matches_any_of yes,Yes",
              "arguments": [
                "{{widgets.send_and_reply_1.inbound.Body}}"
              ],
              "type": "matches_any_of",
              "value": "yes,Yes"
            }
          ]
        },
        {
          "next": "send_message_3",
          "event": "match",
          "conditions": [
            {
              "friendly_name": "If value matches_any_of no,No",
              "arguments": [
                "{{widgets.send_and_reply_1.inbound.Body}}"
              ],
              "type": "matches_any_of",
              "value": "no,No"
            }
          ]
        }
      ],
      "properties": {
        "input": "{{widgets.send_and_reply_1.inbound.Body}}",
        "offset": {
          "x": -100,
          "y": 370
        }
      }
    }
  ],
  "initial_state": "Trigger",
  "flags": {
    "allow_concurrent_calls": true
  }
}
```

---

## What's Next?

Well done! You've learned how to connect Twilio Studio with Conversations. To continue, check out these other resources:

- Learn how to use **Facebook Messenger with Twilio Conversations**
- Explore **Conversations API Quickstart**