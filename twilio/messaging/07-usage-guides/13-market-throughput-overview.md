# Market Throughput Overview

This product guide introduces the concept of Market Throughput and helps developers decide if it's an optimal way to route traffic for their Twilio Programmable Messaging and MMS use cases.

## What is throughput?

Throughput is the rate at which you can send messages at a given time. It is measured per phone number (also known as a sender), per second. This is called Sender Throughput. Each type of phone number has a different throughput rate available to it. For example, Twilio short code numbers have a current available throughput of 100 messages per second (MPS).

### How Sender Throughput is calculated

In a typical setup, a customer has one number pool with multiple senders (short code numbers) inside of that pool. Each of these numbers has a sender capacity of 100 messages per second (MPS), meaning the available MPS for a customer with four senders is 400 MPS total.

However, like an individual vehicle's speed during rush hour traffic, the maximum potential MPS for a customer will be constrained by the total traffic congestion in the ecosystem and not by their own sending capacity alone. For this reason, purchasing more phone numbers won't necessarily increase the customer's total throughput during congested sending times.

Market Throughput, as well as Account Based Throughput, overcomes these limitations by providing you with the ideal level of throughput across your account, as opposed to within individual phone numbers.

### How Market Throughput is calculated

In this context, the term "market" refers to a country such as the United States. Within a country or market, there are carrier networks or destinations. With Market Throughput, all of the traffic produced across all of your phone numbers is serviced at rate limits configured for each destination you send towards. For example, in the United States, Market Throughput may optimize your messages across Verizon, AT&T, and any other destinations you send toward.

Market Throughput offers several advantages over sender and Account Based Throughput, including:

- Messaging capacity is set at the parent account level per country, allowing you to achieve high throughput on as many numbers as you need.
- Traffic is separated by destination carrier, which eliminates the risk of congestion in one network from affecting traffic going to other networks.

## Market Throughput variants

Market Throughput is available in two variants: Sender Type Throughput (STT) and Network Market Throughput (NMT).

### Sender Type Throughput (STT)

**Description:**
- Rate limits set on a parent account per TO destination provider and sender type.
- Carriers serviced for each provider are aggregated into tiers within the US and Canada.
- Multi-tenancy is not applied currently, but can be added as part of the Traffic Shaping private beta rollout during Q3 2023.

**Regional Availability:**
- Shortcode SMS/MMS, toll-free SMS in the US
- Shortcode SMS and toll-free SMS in Canada

### Network Market Throughput (NMT)

**Description:**
- Rate limits set on a parent account per TO destination mobile country code (MCC) and mobile network code (MNC), with even multi-tenancy applied.
- Will absorb Market Queues (MQ) as a part of Traffic Shaping private beta rollout during Q3 2023, where multi-tenancy may be added or removed.

**Regional Availability:**
- All international countries (SMS/MMS)
- Toll-free MMS in the US

## Advantages of Market Throughput

Compared to Sender and Account Based Throughput, Market Throughput leverages flexible traffic controls that more closely align with the unique downstream supply dynamics of each country. Configuring MPS at the account level for each destination allows your dedicated MPS to be optimally utilized on your traffic at all times, which in turn reduces message latency within the Twilio platform.

Additionally, Market Throughput isolates potential message congestion by carrier in each country, ensuring that deliverability of messages to one network does not impact or delay deliverability of your remaining traffic to other networks.

Servicing your messages over Market Throughput also includes access to advanced monitoring features in Messaging Insights Console where you can check the performance of your traffic by sender type and destination.

## Market Throughput constraints

Market Throughput is available for all destinations and sender types where throughput is not constrained by velocity filters or compliance restrictions. As a result, Market Throughput cannot be used for US 10DLC SMS and MMS, which instead is serviced with A2P campaign throughput at rate limits permitted by the destination carriers. However, Market Throughput can be used for your non-A2P traffic in parallel with A2P campaign throughput.

## Onboarding and maintenance

Onboarding to Market Throughput is performed by the Twilio Support team in a few steps. You will not need to make any changes to your existing Twilio integration in order to onboard to market throughput.

## Get Started

Twilio Support can help you set up Market Throughput on your account in a few steps:

1. **Forecast:** Work with your Twilio account owner to determine your estimated volumes per country. This forecast will be used to calculate the MPS requested for each destination.

2. **Review:** Your Twilio account owner submits an onboarding ticket to the Twilio Support team, who will review and approve the MPS to be configured on your parent account.

3. **Configuration and Migration:** After approval, Twilio Support configures the MPS values on your account, and migrates your existing traffic during off-peak hours.