# Conversations API Overview

The Conversations API allows you to create conversational (back-and-forth) messaging across multiple channels: Chat, WhatsApp, and SMS.

## API Base URL

All URLs in the reference documentation use the following base URL:

```
https://conversations.twilio.com/v1
```

> **Info**
> You can control your connectivity into Twilio's platform by including your specific **edge location** in the subdomain. This will allow you to bring Twilio's public or private network connectivity closer to your applications for improved performance.
>
> For instance customers with infrastructure in Australia can make use of the `sydney` edge location by using the base url of:
>
> ```
> https://conversations.sydney.us1.twilio.com/v1
> ```

## Authentication

To authenticate requests to the Twilio APIs, Twilio supports **HTTP Basic authentication**. Use your API key as the username and your API key secret as the password. You can create an API key either **in the Twilio Console** or **using the API**.

**Note:** Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth token as the password. You can find your Account SID and Auth Token in the **Twilio Console**.

Learn more about **Twilio API authentication**.

## Resources

The **Conversation resource** is the primary resource, representing a unique thread of a conversation.

A Conversation has the following sub-resources:

- **Conversation Participants**
- **Conversation Messages**
- **Conversation-Scoped Webhooks**

The **Conversation Webhook resource** covers webhook configurations for all Conversations.

## Getting started

Refer to our **quickstart guide** for a step by step introduction to Conversations and an overview of commonly used features.