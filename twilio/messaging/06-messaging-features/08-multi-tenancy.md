# Multi-Tenancy

**(new) Public Beta**

Multi-Tenancy is currently in Public Beta.

Multi-Tenancy is a Programmable Messaging product within the Traffic Optimization Engine that allows Twilio customers to fine-tune messaging throughput and allocate their total capacity by subaccount.

Multi-Tenancy allows you to prevent specific subaccounts and/or senders from using all of the parent Account's available throughput when other subaccounts and/or senders also need throughput. Multi-Tenancy allows you to skip manual configuration of throughput on each subaccount to achieve fair distribution. Instead, Twilio algorithmically determines capacity distribution in accordance with your parent Account's configuration for each destination country's sender type and channel combinations.

With Multi-Tenancy enabled, Twilio algorithmically distributes a minimum share of throughput to each subaccount in a fair manner at the moment it's needed. When the subaccount's messages have finished processing, Twilio dynamically redistributes the newly-available throughput across the remaining queues that contain messages waiting to leave the Twilio platform.

Multi-Tenancy applies to SMS and MMS messaging traffic from any of your senders (short code, toll-free, alphanumeric senders, and ten-digit long code phone numbers) except for US and Canada A2P 10DLC traffic.

## Configuration options

Multi-Tenancy is available in three forms, and is applied to all traffic sent towards the same destination country. For each destination country, Twilio can apply one of the following Multi-Tenancy options to your Account: None, Even, or Weighted.

Multi-Tenancy is interoperable with Traffic Shaping. You can use both products to allocate throughput both at the subaccount level with Multi-Tenancy, and at the message level with Traffic Shaping (Service Level, use case, and sender type).

### No Multi-Tenancy

If no Multi-Tenancy is applied to your traffic, throughput may not be distributed across all of the subaccounts in a way where each sender receives a guaranteed share of throughput.

Messages from different subaccounts enter a single queue, and leave the queue at the parent Account's maximum throughput (e.g., 100 MPS).

### Even Multi-Tenancy

With Even Multi-Tenancy, all subaccounts currently sending messages towards the same destination country receive an equal share of the total throughput available on your parent Account for that destination.

For example, with three subaccount queues, all have an equal share of the parent Account's maximum throughput. Since the parent Account's maximum throughput is 100 MPS, each of the three subaccounts has 33.33 MPS available. Whenever one subaccount's queue is empty, that subaccount's 33.33 MPS throughput is shared evenly between the other non-empty subaccount queues.

### Weighted Multi-Tenancy

With Weighted Multi-Tenancy, all subaccounts currently sending messages towards the same destination country receive a weighted share of the total throughput available on the parent Account for that destination country.

You can define weights on the subaccounts that send the greatest volume of traffic, which will ensure they receive a minimum share of throughput proportional to its weight at all times.

For example, in a Weighted Multi-Tenancy configuration, one subaccount (Subaccount 3) in Tier 1 is assigned 80% of the parent Account's throughput. If the parent Account has 100 MPS total throughput, Subaccount 3 has 80 MPS. The remaining 20% of throughput is split between the two other subaccounts (Subaccount 1 and 2) in Tier 2, providing 10 MPS for each subaccount. When a subaccount's queue is empty, the allocated throughput is evenly shared dynamically amongst the remaining subaccount queues in the same Tier.

## Get started

Multi-Tenancy is now available in Public Beta to all Programmable Messaging customers. Talk to your Account owner or Support for pricing details.

### Prerequisites

Before you can use Multi-Tenancy on your Twilio Account(s), you must be onboarded to Market Throughput. For more information, read the Market Throughput product guide.

### Onboarding

Onboarding to Multi-Tenancy is performed by the Twilio Support team in a few steps.

1. **Reach out to Twilio:** Talk to your Twilio Account owner (if applicable), or open a Support ticket asking for a demo and/or onboarding support for Multi-Tenancy.

2. **Forecast:** Work with your Twilio Account owner or Support representative to determine which Multi-Tenancy option (even, weighted, or none) you would like to apply to each destination country and sender type where it can be configured. This information is used to calculate the optimal allocation of throughput for your Twilio parent Account(s).

3. **Review:** Twilio Support reviews your requested Multi-Tenancy configurations.

4. **Configuration and migration:** Once your request is ready for onboarding, Twilio Support configures Multi-Tenancy on your parent Account(s) with the settings calculated from Step 2, and migrates your existing traffic during off-peak hours.

For Multi-Tenancy, you don't need to make any change to your existing Twilio integration.