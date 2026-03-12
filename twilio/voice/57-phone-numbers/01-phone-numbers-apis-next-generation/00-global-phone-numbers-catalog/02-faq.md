# Global Phone Numbers Catalog - FAQ

## FAQ - Global Phone Number Catalog

**Contents:**
- What is Twilio Announcing?
- Where are the Docs?
- Is this functionality supported in Console?
- Who is the typical customer for the Catalog and APIs?
- What functionality are you launching and when?
- How do customers get access to the new API?
- How is the Global Phone Numbers Catalog different from our current inventory?
- Will the existing API be deprecated?
- How do I search for, purchase, and manage numbers?
- What are Saved Searches?
- Are there changes to pricing of phone numbers?

---

## What is Twilio Announcing?

Twilio is announcing the Global Phone Numbers Catalog - a broader choice of phone numbers, available through the most powerful APIs in the industry. As we've grown our global coverage to offer phone numbers in over 100 countries, we've learned that numbers are not all created equal. In the past, we offered only numbers that could satisfy the broadest set of Twilio use cases. Today, with the Global Phone Numbers Catalog, we aim to offer not only the most feature-rich numbers but also those that best match the different needs of customers. We like to call these use case tailored phone numbers.

## Where are the Docs?

To search phone numbers available for purchase in the Catalog, use `preview.api.twilio.com/Numbers/AvailableNumbers`.

To purchase, list, configure, and release phone numbers on a user account, use the IncomingPhoneNumber resource.

## Is this functionality supported in Console?

Not yet, we plan to launch Console support before going to Beta.

## Who is the typical customer for the Catalog and APIs?

All Twilio users can benefit from the broader selection of numbers and enhanced functionality of the new APIs. In particular, users that are not familiar with characteristics of phone numbers will benefit from the new use case based search functionality, to help them find numbers ideal for their use case. For example, a user looking for phone numbers for a contact center application, can pass the `SavedSearch=twilio.use-case.contact-centers.voice` to see numbers with characteristics suitable for that use case.

## What functionality are you launching and when?

The first release will be delivered in three phases:

**Developer Preview:** Support for new APIs that will allow search, purchase, list, configure, and release of numbers with support for attribute-based search functions, including use case based search. Catalog will include all the existing inventory of numbers available, plus Developer Preview numbers and new limited capability numbers.

**Beta:** Console support, including ability to create and save custom searches.

**GA:** Fully-featured version 1.0. Broader selection of use case tailored numbers, offering more choice and pricing options.

## How do customers get access to the new API?

The API is currently in Developer Preview and new accounts are not being given access to the private resources. For more information, please visit Global Phone Numbers Catalog Twilio page.

## How is the Global Phone Numbers Catalog different from our current inventory?

The Catalog, searchable through the new APIs, will include all the inventory available through the existing APIs, plus: Developer Preview numbers, numbers previously held back due to their unique characteristics, and a limited group of premium numbers (high value, depleted prefixes: +1800, +1212, +44800).

## Will the existing API be deprecated?

No. The existing API endpoints (`/AvailablePhoneNumbers` and `/IncomingPhoneNumbers`) will continue operating as they do today. However, only fully featured phone numbers will be visible through `/AvailablePhoneNumbers` API.

The new Phone Numbers API will have full support for attributes and support a wider catalog of numbers. This new API will eventually support catalog search, number purchase, and porting/hosting order tracking.

## How do I search for, purchase, and manage numbers?

To search for available numbers, use the AvailableNumbers resource. To purchase, manage, and release numbers, use the IncomingPhoneNumber resource.

## What are Saved Searches?

Saved Searches give users a quick way to find numbers with specific characteristics, both in the Catalog, or in their account inventory. Twilio provides a set of predefined saved searches for the most common Twilio use cases: call tracking, contact centers, conversations, marketing, notifications, pbx-collaborations, and verifications. In a future release, users will be able to customize these searches, or create new ones, and save them to their account for convenience.

---

### twilio.use-case.conversations.voice

| Property | Description |
|----------|-------------|
| Lifecycle | generally-available |
| Type | [local, mobile, tollfree, shortcode, shared-cost, machine-to-machine, voip, national] |
| Capabilities.Voice.InboundConnectivity | true |
| Capabilities.Voice.OutboundConnectivity | true |
| Capabilities.Voice.InboundReachability | global |
| Capabilities.Voice.InboundCallerIdPreservation | international |
| Capabilities.Voice.SipTrunking | true |

### twilio.use-case.conversations.sms

| Property | Description |
|----------|-------------|
| Lifecycle | generally-available |
| Type | [local, mobile, tollfree, shortcode, shared-cost, machine-to-machine, voip, national] |
| Capabilities.Sms.InboundConnectivity | true |
| Capabilities.Sms.OutboundConnectivity | true |
| Capabilities.Sms.InboundSenderIdPreservation | international |
| Capabilities.Sms.InboundReachability | global |
| Capabilities.Sms.Gsm7 | true |
| Capabilities.Sms.Gsm7Concatenation | true |
| Capabilities.Sms.Ucs2 | true |
| Capabilities.Sms.Ucs2Concatenation | true |

### twilio.use-case.verifications.voice

| Property | Description |
|----------|-------------|
| Lifecycle | generally-available |
| Type | [local, mobile, tollfree, shortcode, shared-cost, machine-to-machine, voip, national] |
| Capabilities.Voice.OutboundConnectivity | true |
| Capabilities.Voice.InboundReachability | global |

### twilio.use-case.verifications.sms

| Property | Description |
|----------|-------------|
| Lifecycle | generally-available |
| Type | [local, mobile, tollfree, shortcode, shared-cost, machine-to-machine, voip, national] |
| Capabilities.Sms.OutboundConnectivity | true |
| Capabilities.Sms.InboundReachability | global |
| Capabilities.Sms.Gsm7 | true |
| Capabilities.Sms.Ucs2 | true |

### twilio.use-case.notifications.voice

| Property | Description |
|----------|-------------|
| Lifecycle | generally-available |
| Type | [local, mobile, tollfree, shortcode, shared-cost, machine-to-machine, voip, national] |
| Capabilities.Voice.InboundConnectivity | true |
| Capabilities.Voice.OutboundConnectivity | true |
| Capabilities.Voice.InboundReachability | global |

### twilio.use-case.notifications.sms

| Property | Description |
|----------|-------------|
| Lifecycle | generally-available |
| Type | [local, mobile, tollfree, shortcode, shared-cost, machine-to-machine, voip, national] |
| Capabilities.Sms.InboundConnectivity | true |
| Capabilities.Sms.OutboundConnectivity | true |
| Capabilities.Sms.InboundReachability | global |
| Capabilities.Sms.Gsm7 | true |
| Capabilities.Sms.Ucs2 | true |

### twilio.use-case.marketing.voice

| Property | Description |
|----------|-------------|
| Lifecycle | generally-available |
| Type | [local, mobile, tollfree, shortcode, shared-cost, machine-to-machine, voip, national] |
| Capabilities.Voice.InboundConnectivity | true |
| Capabilities.Voice.OutboundConnectivity | true |
| Capabilities.Voice.InboundCallerDtmf | true |
| Capabilities.Voice.inboundCalledDtmf | true |
| Capabilities.Voice.InboundReachability | global |
| Capabilities.Voice.InboundCallerIdPreservation | international |

### twilio.use-case.marketing.sms

| Property | Description |
|----------|-------------|
| Lifecycle | generally-available |
| Type | [local, mobile, tollfree, shortcode, shared-cost, machine-to-machine, voip, national] |
| Capabilities.Sms.InboundConnectivity | true |
| Capabilities.Sms.OutboundConnectivity | true |
| Capabilities.Sms.InboundReachability | global |
| Capabilities.Sms.Gsm7 | true |
| Capabilities.Sms.Gsm7Concatenation | true |
| Capabilities.Sms.Ucs2 | true |
| Capabilities.Sms.Ucs2Concatenation | true |

### twilio.use-case.lead-tracking.voice

| Property | Description |
|----------|-------------|
| Lifecycle | generally-available |
| Type | [local] |
| Capabilities.Voice.InboundConnectivity | true |
| Capabilities.Voice.InboundCallerDtmf | true |
| Capabilities.Voice.inboundCalledDtmf | true |
| Capabilities.Voice.InboundReachability | global |
| Capabilities.Voice.InboundCallerIdPreservation | international |
| Capabilities.Voice.SipTrunking | true |

### twilio.use-case.lead-tracking.sms

| Property | Description |
|----------|-------------|
| Lifecycle | generally-available |
| Type | [local] |
| Capabilities.Sms.InboundConnectivity | true |
| Capabilities.Sms.InboundSenderIdPreservation | international |
| Capabilities.Sms.InboundReachability | global |
| Capabilities.Sms.Gsm7 | true |
| Capabilities.Sms.Gsm7Concatenation | true |
| Capabilities.Sms.Ucs2 | true |
| Capabilities.Sms.Ucs2Concatenation | true |

### twilio.use-case.contact-centers.voice

| Property | Description |
|----------|-------------|
| Lifecycle | generally-available |
| Type | [local, mobile, tollfree, shortcode, shared-cost, machine-to-machine, voip, national] |
| Capabilities.Voice.InboundConnectivity | true |
| Capabilities.Voice.OutboundConnectivity | true |
| Capabilities.Voice.InboundCallerDtmf | true |
| Capabilities.Voice.inboundCalledDtmf | true |
| Capabilities.Voice.InboundCallerIdPreservation | international |
| Capabilities.Voice.SipTrunking | true |
| Capabilities.Voice.E911 | true |

### twilio.use-case.contact-centers.sms

| Property | Description |
|----------|-------------|
| Lifecycle | generally-available |
| Type | [local, mobile, tollfree, shortcode, shared-cost, machine-to-machine, voip, national] |
| Capabilities.Sms.InboundConnectivity | true |
| Capabilities.Sms.OutboundConnectivity | true |
| Capabilities.Sms.InboundSenderIdPreservation | international |
| Capabilities.Sms.InboundReachability | global |
| Capabilities.Sms.Gsm7 | true |
| Capabilities.Sms.Gsm7Concatenation | true |
| Capabilities.Sms.Ucs2 | true |
| Capabilities.Sms.Ucs2Concatenation | true |

### twilio.use-case.pbx-collaborations.voice

| Property | Description |
|----------|-------------|
| Lifecycle | generally-available |
| Type | [local, tollfree, voip] |
| Capabilities.Voice.InboundConnectivity | true |
| Capabilities.Voice.OutboundConnectivity | true |
| Capabilities.Voice.InboundCallerDtmf | true |
| Capabilities.Voice.inboundCalledDtmf | true |
| Capabilities.Voice.InboundCallerIdPreservation | international |
| Capabilities.Voice.InboundReachability | global |
| Capabilities.Voice.SipTrunking | true |
| Capabilities.Voice.E911 | true |

---

## Are there changes to pricing of phone numbers?

Pricing of existing numbers in our inventory has not been affected. The new Phone Numbers API exposes a broader selection of numbers due to its ability to present numbers with differing capabilities. For some searches, this broader selection will result in multiple options available to users, likely at different price points. For example, a search for UK phone numbers for 'Marketing Alerts', might return both 2-way voice+sms mobile numbers and 1-way SMS-only numbers, at two different prices. Vanity numbers and numbers in depleted area codes are now also available and can be priced differently.