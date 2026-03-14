# Outbound Message Status in Status Callbacks

Message status changes occur throughout the lifecycle of an outbound message from creation, through sending, to delivery, and even read receipt for supporting messaging channels.

Twilio allows you to programmatically **track these status changes for outbound messages** sent with **Programmable Messaging** through the use of **status callbacks**.

This guide explains for which changes in outbound message status Twilio sends status callback requests.

The provided information applies to:

- Outbound messages created using the **Message Resource** of the **Programmable Messaging REST API**
- **Outbound TwiML-generated messages**

If your use case involves the sending of high volumes of messages or message scheduling, you may use a **Messaging Service**. Use of a Messaging Service has implications for the relevant message status changes as described in the following sections.

## Initial status of a Message resource

When you **create a Message resource for an outbound message**, it is created with an initial `status` value.

The following two tables show this initial `status` value, depending on how you created the Message:

| Creation Method | Initial Status |
|-----------------|----------------|
| Message created without a Messaging Service | `queued` |
| Message created with a Messaging Service for immediate sending (non-scheduled) | `accepted` |
| Message created with a Messaging Service for **scheduled sending** at a later time | `scheduled` |

> **Warning**
> A status callback request is not sent for the initial `status` of a newly created Message resource.

If you use the REST API to create the Message Resource, you can obtain the initial `status` value from the API response to the create action.

## Message status changes triggering status callback requests

Twilio sends status callback requests when the Message resource's `status` changes after creation.

The Message resource API Reference contains the **full list of possible status values and their descriptions**.

If you used a Messaging Service to create the message, then:

- An `accepted` (non-scheduled) or `scheduled` message transitions to `queued` status once the following two conditions are met:
  - A non-scheduled message is ready to be sent or a scheduled message's `SendAt` time has been reached.
  - The Messaging Service has dynamically determined the optimal sender from its Sender Pool or, otherwise, you explicitly provided a `From` sender out of the Messaging Service's Sender Pool on Message creation.
- A resulting status callback request is emitted with status `queued`.
- A `scheduled` message can be canceled before its `SendAt` time. In this case a status callback request is emitted with status `canceled`.

After queuing, Twilio sends status callback requests as follows, regardless of how the message was created:

- If sending is successful: `sent`, otherwise `failed`
- If delivery is successful: `delivered`, otherwise `undelivered`

If the messaging channel through which the message was sent supports read receipts, the Message resource may finally reach `read` status, provided the message recipient has read receipts enabled on their device (currently RCS and WhatsApp).

## What's next?

Now that you know when Twilio sends status callback requests triggered by outbound message status changes, check out the following resources:

- Read our guide **Track the Message Status of Outbound Messages** for the fundamentals of how to work with these status callbacks.
- Read our guide **Best Practices for Messaging Delivery Status Logging** for advanced considerations when implementing a production-grade status logging solution.