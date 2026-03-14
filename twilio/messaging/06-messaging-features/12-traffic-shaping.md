# Traffic Shaping

**(new) Public Beta**

Traffic Shaping is currently in Public Beta.

Traffic Shaping is a Programmable Messaging product within the Traffic Optimization Engine that allows high-volume Twilio customers to fine-tune messaging throughput by allocating capacity by messaging use case. It allows you to allocate your Twilio Account's throughput based on message priority and eliminates congestion at the sender level. This helps ensure that your time-sensitive messages like one-time passcodes and account notifications are sent faster, and aren't stuck in the same queue behind lower-priority messages.

Traffic Shaping applies to SMS and MMS messaging traffic from any of your senders (short code, toll-free, alphanumeric senders, and ten-digit long code phone numbers) except for US and Canada A2P 10DLC traffic.

## Service Levels

Traffic Shaping provides three different Service Levels, which you can think of as three separate queues, where each queue contains messages of the same priority. Each Service Level queue can be assigned a different throughput allocation, based on the relative priority of the messages within that Service Level. You decide the speed at which messages are sent from each Service Level queue by allocating a percentage of your Account's total throughput to each Service Level that you plan to use.

- **Service Level 1** is intended for your most time-sensitive, important messages, e.g., two-factor authorization (2FA), one-time passcodes (OTP), account notifications, and security alerts. Allocate a higher percentage of your Account's throughput to Service Level 1 (compared to Service Levels 2 and 3) to ensure timely delivery of high-priority messages.

- **Service Level 2** is assigned a lower throughput allocation than Service Level 1 and is intended for lower-priority messages, such as delivery notifications and event marketing.

- **Service Level 3** is assigned the lowest percentage of throughput allocation and is for your lowest-priority messages.

It is not required to provide throughput allocations to all three Service Levels. If you would like to separate your traffic using only two Service Levels (one for high priority time-sensitive traffic and one for lower-priority traffic), you can split your Account's total throughput between Service Level 1 and Service Level 3.

If you don't specify throughput allocation for any Service Levels, the system assigns a default value to each Service Level. The table below lists the default value for each Service Level, whenever a value is not explicitly assigned. When onboarding to Traffic Shaping, it is important that you choose values that will allocate enough throughput to fully service the messaging load expected for each Service Level you plan to use. Talk to your Account owner or Support if you need advice on how to allocate throughput.

| Traffic Shaping Service Level | Default Throughput Allocation (%) |
|-------------------------------|-----------------------------------|
| Level 1 | 50% |
| Level 2 | 30% |
| Level 3 | 20% |

## Assign a message's Service Level

Once you've configured your desired throughput allocations to each Traffic Shaping Service Level you plan to use, you're able to assign a Service Level for each message you send. This is done via the MessageIntent parameter on the Message Resource. The value of the MessageIntent parameter is a Twilio use case, and each use case is associated with one of the three Service Levels. If the MessageIntent parameter is left blank on a message request, the system will assign that message to Service Level 3 by default.

The table below lists all of the use cases that can be configured for the MessageIntent parameter, and the default Service Level assigned for the use case.

| Use Case | MessageIntent Parameter Value | Traffic Shaping Service Level |
|----------|-------------------------------|-------------------------------|
| Two-factor auth (2FA) and one-time passcodes (OTP) | otp | Level 1 |
| Account notifications, two-way conversational messaging | notifications | Level 1 |
| Fraud alerts | fraud | Level 1 |
| Security alerts, emergency | security | Level 1 |
| Customer care | customercare | Level 2 |
| Delivery notifications | delivery | Level 2 |
| Education | education | Level 2 |
| Event marketing | events | Level 2 |
| Polling and voting (non-political) | polling | Level 3 |
| Public service announcement (non-emergency) | announcements | Level 3 |
| General and campaign marketing | marketing | Level 3 |

You are also able to override the default Traffic Shaping Service Level of a MessageIntent parameter value based on your deliverability needs. For example, MessageIntent parameter value customercare is assigned to Service Level 2 by default, but if your messages of this use case are highly time-sensitive, you can re-assign customercare to Service Level 1 instead during onboarding.

### Code example

The code sample below shows an example of how to use the MessageIntent parameter to send a time-sensitive message. The sample message is a one-time passcode (OTP), so the value of MessageIntent is otp. This means the message is sent using the Service Level 1 queue and its higher throughput.

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "From=+15557122661" \
--data-urlencode "Body=Your one-time passcode is: 8458881" \
--data-urlencode "To=+15558675310" \
--data-urlencode "MessageIntent=otp" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

## Dynamic throughput allocation

If there are no messages queued for a given Service Level, that Service Level's throughput allocation is dynamically redistributed to any other Service Level(s) currently being utilized to process message queues. You're always able to use 100% of your Account's throughput; the allocation for each Service Level is a maximum throughput when all three Service Levels are being utilized.

For example, there is an "Important" queue (i.e., a Service Level 1 queue) that is allocated 70% of the parent Account's total 100 MPS throughput and a "Regular" queue (i.e., a Service Level 2 or 3 queue) that is allocated 30% of the throughput. Important, time-sensitive messages enter the "Important" queue and leave the queue at a rate of 70 MPS, while lower-priority messages enter the "Regular" queue and leave the queue at a rate of 30 MPS. When the "Important" queue is empty, its 70 MPS is provided to the "Regular" queue.

## Advantages

Compared to using Market Throughput on a standalone basis, Traffic Shaping provides more fine-tuned, flexible controls for prioritizing your messages based on Service Level and use case, while ensuring your most important messages get a greater share of throughput. With Traffic Shaping, you can:

- **Distribute your total throughput capacity based on use case:** Messages that need to be delivered more quickly are mapped to Service Levels receiving a higher share of throughput. A use case is a configurable parameter that can be set on each message, and indicates the corresponding Service Level for that message. Messages without a use case specified will automatically be assigned to the lowest Service Level.

- **Eliminate congestion at the sender level:** Message deliverability in one Service Level does not interfere with performance in another level, even when the messages are sent from the same number.

Traffic Shaping is interoperable with Multi-Tenancy. You can use both products to allocate throughput both at the message level with Traffic Shaping (Service Level, use case, and sender type), and at the subaccount level with Multi-Tenancy.

## Constraints

Traffic Shaping is available for all destinations and sender types where throughput is not constrained by velocity filters or compliance restrictions. As a result, Traffic Shaping cannot be used for US 10DLC SMS and MMS, which instead is serviced with A2P campaign throughput at rate limits permitted by the destination carriers. However, Traffic Shaping can be used for your non-US 10DLC traffic in parallel with A2P campaign throughput.

## Get started

Traffic Shaping is available in Public Beta to all Programmable Messaging customers. Talk to your Account owner or Support representative for pricing details.

### Prerequisites

Before you can use Traffic Shaping on your Twilio Account(s), you must be onboarded to Market Throughput. For more information, read the Market Throughput product guide.

### Onboarding

Onboarding to Traffic Shaping is performed by the Twilio Support team in a few steps.

1. **Reach out to Twilio:** Talk to your Twilio account owner (if applicable), or open a Support ticket asking for a demo and/or onboarding support for Traffic Shaping.

2. **Forecast:** Work with your Twilio account owner or Support representative to determine your estimated hourly volumes for each use case associated with a Service Level, and the maximum amount of time any message in a given Service Level could spend in a Twilio queue. This information is used to calculate the optimal allocation of throughput for your Twilio parent Account(s).

3. **Review:** Twilio Support reviews your requested Traffic Shaping configurations.

4. **Configuration and migration:** Once your request is ready for onboarding, Twilio Support configures Traffic Shaping on your parent Account(s) with the settings calculated from Step 2, and migrates your existing traffic during off-peak hours.

For Traffic Shaping, you need to start using the MessageIntent parameter as described in the Assign a Message's Service Level section above.