# Programmable Messaging

Send messages to customers across preferred channels like SMS, MMS, RCS, and WhatsApp with one API.

## Quick Start

**1. TWILIO SERVERS → 2. YOUR APP**

```javascript
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    from: '+15557122661',
    body: 'Ahoy, world!',
    to: '+15558675310'
  })
  .then(message => console.log(message.sid));
```

**3. Output:** `Ahoy, world!`

[View complete examples](#)

---

## Take the next steps with Programmable Messaging

- [SMS and MMS](#sms-and-mms)
- [RCS](#rcs)
- [WhatsApp](#whatsapp)
- [Facebook Messenger (public beta)](#facebook-messenger-public-beta)

---

## SMS and MMS

Send and receive text and media messages programmatically. SMS messages don't require an app or an internet connection and have the highest open rates.

Build an app in minutes that sends your first SMS with Twilio.

### Getting Started

- [Send your first SMS using code](#)
- [Send your first SMS without using code](#)

### Find your use case

- Appointment scheduling and reminders
- Authentication & security
- Order updates and delivery notifications

### API reference

- [Create a new message](#)
- [Return a list of messages](#)
- [Delete a message](#)
- [More Message resource actions](#)
- [Media subresource actions for MMS](#)

### Go further with SMS and MMS

- Comply with [A2P 10DLC](#) and [TFN verification](#)
- Simplify scaling and get more features with [Messaging Services](#)
- [Reuse messaging templates](#)
- [Prevent fraud](#)

---

## RCS

Send text and media messages from your brand—not from a phone number—programmatically. RCS supports rich content (like [cards](#) or [carousels](#)), read receipts, and more.

### Getting Started

- [Get started with RCS](#)

### Find your use case

- Marketing and promotions
- Feedback and surveys

### API reference

- [Create a new message](#)
- [Return a list of messages](#)
- [Delete a message](#)
- [More Message resource actions](#)
- [Media subresource actions](#)
- [Rich content API](#)

### Go further with RCS

- Simplify scaling and get more features with [Messaging Services](#)
- [Reuse messaging templates](#)

---

## WhatsApp

Send and receive WhatsApp messages programmatically. WhatsApp supports more content types than SMS and allows end-to-end encryption.

### Getting Started

- [Get started with WhatsApp](#)

### Find your use case

- Marketing and promotions
- Customer support and chatbots
- Receipts and account updates
- Feedback and surveys

### API reference

- [Create a new message](#)
- [Return a list of messages](#)
- [Delete a message](#)
- [More Message resource actions](#)
- [Media subresource actions](#)
- [Rich content API](#)

### Go further with WhatsApp

- Simplify scaling and get more features with [Messaging Services](#)
- [Reuse messaging templates](#)

---

## Facebook Messenger (public beta)

Send and receive Facebook Messenger messages programmatically. Facebook Messenger supports more content types, persistent conversations, and can cost less for high-volume messaging than SMS.

### Getting Started

- [Get started with Facebook Messenger (public beta)](#)

### Find your use case

- Click-to-message marketing and promotions
- Customer support and chatbots

### API reference

- [Create a new message](#)
- [Return a list of messages](#)
- [Delete a message](#)
- [More Message resource actions](#)
- [Media subresource actions](#)
- [Rich content API](#)

### Go further with Facebook Messenger

- [Reuse messaging templates](#)

---

## Related Products

Verify, Conversations, and Flex are tailored toward specific use cases. Looking to build data-driven customer experiences? Check out Twilio Engage.

### Verify

Fight fraud and protect user accounts. Verify users via SMS, Silent Network Auth, voice, WhatsApp, TOTP, push, Silent Device Approval, and email.

[Product documentation](#)

### Conversations

Build conversational messaging on multiple channels—web chat, WhatsApp, and SMS.

[Product documentation](#)

### Studio

Twilio's no-code/low-code application builder. Build your messaging app in your browser.

[Product documentation](#)

### Flex

Build your digital engagement center for sales and customer support teams.

[Product documentation](#)

### Engage

Personalize your customer interactions on every channel from a unified, data-first multichannel marketing solution.

[Product documentation](#)