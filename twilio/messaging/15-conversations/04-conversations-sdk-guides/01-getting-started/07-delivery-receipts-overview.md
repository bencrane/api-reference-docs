# Delivery Receipts Overview

With the Delivery Receipts feature, you can obtain information about the status of Conversations Messages sent to non-Chat Participants (i.e. SMS and WhatsApp channels).

You can verify if the Messages were sent, delivered or even read (for OTT) by other Conversations Participants.

Let's get started!

## What are Delivery Receipts?

Delivery Receipts are summaries that contain detailed information about the messages sent to Participants in non-Chat channels.

This feature includes information about:

- A summary of the Message's delivery statuses
- The number of Messages sent
- The number of Conversation Participants the message(s) was sent to

## Types of Delivery Receipt Message Statuses

Delivery Receipts can contain the following message statuses:

- sent
- delivered
- read
- failed
- undelivered

## Aggregated Delivery Receipts

An Aggregated Delivery Receipt contains a general summary of the delivery statuses of a Message to all non-Chat Participants in the Conversation.

Use aggregated receipts to represent the overall delivery status of a Message.

You can retrieve the Aggregated Delivery Receipts summaries from any Message object in a Conversation that contains non-Chat recipients. This is often enough to confirm successful delivery of the message.

### Aggregated Delivery Receipts Example

```javascript
/* Retrieving Delivery Receipts (aggregated and detailed) for rendering */

const aggregatedDeliveryReceipt = message.aggregatedDeliveryReceipt;

// get amount (DeliveryAmount) of participants with particular delivery status
const deliveredReceipts = aggregatedDeliveryReceipt?.delivered;
const failedReceipts = aggregatedDeliveryReceipt?.failed;
const readReceipts = aggregatedDeliveryReceipt?.read;
const sentReceipts = aggregatedDeliveryReceipt?.sent;
const undeliveredReceipts = aggregatedDeliveryReceipt?.undelivered;
// get the amount of participants which have the status for the message
const totalReceipts = aggregatedDeliveryReceipt?.total;

if (undeliveredReceipts !== "none") {
    // some delivery problems
    alert(`Out of ${totalReceipts} sent messages, ${deliveredReceipts} were delivered, ${failedReceipts} have failed.`);
}
```

## Detailed Delivery Receipts

A Detailed Delivery Receipt represents the Message delivery status to a specific non-Chat Participant in the Conversation.

Use detailed receipts when you want to show the specific recipient who didn't receive the message.

You can also get a list of the Detailed Delivery Receipts by calling the correct method on the same object. This is useful if you want to render separate sent/delivered/read statuses for specific Participants.

### Detailed Delivery Receipts Example

```javascript
// get the list of of delivery receipts
const detailedDeliveryReceipts = await message.getDetailedDeliveryReceipts();

const statusMap = {};

detailedDeliveryReceipts.map((detailedDeliveryReceipt) => {
    // get status of the delivery receipts
    const receiptStatus = detailedDeliveryReceipt.status;
    const participantSid = detailedDeliveryReceipt.participantSid;
    statusMap[participantSid] = receiptStatus;
});
```

## Delivery Receipts Error Handling

Retrieving detailed receipts is necessary for error retrieval and handling. Each detailed receipt for a message that failed will contain a Twilio error code indicating the failure reason.

If the message status is failed or undelivered, you can handle the error code accordingly.

Read more in the Troubleshooting Undelivered Twilio SMS Messages support article.

### Delivery Receipt Error Handling Example

```javascript
/* Checking delivery receipts for errors */

// get the list of aggregated delivery receipts
const aggregatedDeliveryReceipt = message.aggregatedDeliveryReceipt;

// retrieve delivery receipt status
if (aggregatedDeliveryReceipt.failed !== "none" || aggregatedDeliveryReceipt.undelivered !== "none") {
    // handle error
}

// get the list of delivery receipts
const detailedDeliveryReceipts = await message.getDetailedDeliveryReceipts();

detailedDeliveryReceipts.map((detailedDeliveryReceipt) => {
    // check delivery receipt status
    if (!detailedDeliveryReceipt.status === "undelivered" && !detailedDeliveryReceipt.status === "failed") {
        return;
    }

    // handle error. the error codes page: https://www.twilio.com/docs/sms/api/message-resource#delivery-related-errors
    if (detailedDeliveryReceipt.errorCode === 30006) {
        alert("The destination number is unable to receive this message.");
        return;
    }

    if (detailedDeliveryReceipt.errorCode === 30007) {
        alert("Your message was flagged as objectionable by the carrier.");
    }
});
```

## What's Next?

Great work! You've learned the foundations of Delivery Receipts, you can continue with any of the following guides:

- Learn about Conversations Attributes.
- Explore the Modifying a Conversation, Message or Participant guide.