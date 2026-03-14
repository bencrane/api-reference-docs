# A2P 10DLC Registration in Conversations

In this guide, you will find answers to common questions about A2P 10DLC and how it relates to Twilio Conversations in the U.S.

Note that this regulation applies only to messaging sent from 10DLC numbers to receiving numbers in the U.S. 10DLC format means a 'local' number such as (415) 123-4567, which is a format found only in the United States and Canada. 10DLC excludes Toll-Free numbers, which are subject to a different set of regulations, as well as short-code SMS numbers.

**A2P has no impact on WhatsApp** or any other Messaging channel, so those channels don't require A2P registration.

## What is A2P 10DLC?

U.S. Application-to-Person 10-digit long code (A2P 10DLC) messaging is the latest offering from U.S. carriers to help support the growing ecosystem of businesses texting their customers while protecting end users from unwanted messages. 10-digit long codes have traditionally been designed for Person-to-Person (P2P) traffic only, causing businesses to be constrained by limited throughput and heightened filtering.

The launch and support of A2P 10DLC across all carriers in the United States provides good actors with increased deliverability and throughput, but also requires additional registration to build trust with carriers. There are associated fees with this registration process and also per-message carrier fees.

The major U.S. carriers, acting through an entity called The Campaign Registry (TCR), have formalized regulations to make explicit throughput allowances, and to reduce filtering rates in exchange for pre-registration and compliance by customers.

Please see this A2P 10DLC Registration overview document, which contains links to specific registration procedures based on your customer type or use case.

As a Twilio Conversations user, A2P 10DLC applies to you if you are sending Conversations messages from a 10DLC phone number to a U.S. cell phone number.

## Is Conversations traffic subject to A2P governance?

Yes! As of September 1, 2023, any A2P messaging traffic to U.S. recipients using Twilio 10DLC numbers that has not been appropriately registered will be blocked.

## I think I'm a "small" use-case that doesn't need to register. Would carriers agree?

No they would not. All SMS messages sent from a Twilio 10DLC number to US cell phone numbers are subject to the A2P regulations, regardless of volume. However, The Campaign Registry had defined different registration tiers or Brand types based on volume: Sole Proprietor Brand, Low-Volume Standard Brand and Standard Brand. See our Overview for details on these three tiers/brand types.

## How do I map my Conversations to A2P Campaigns?

For A2P registration, you will register a Brand (Sole Proprietor, LVS or Standard) and then one or more Campaigns for that Brand, where each Campaign is defined around a single use case, and is associated with a single Messaging Service.

Add any 10DLC numbers from your Conversations implementation to the A2P Campaign's Messaging Service. This can be done before or after the Brand and Campaign are submitted for approval by TCR. Again, see the overview document for detailed walkthroughs of this registration process.

Once the Brand and Campaign have been approved, all 10DLC phone numbers in that Messaging Service are considered registered for A2P with The Campaign Registry. At this point the relevant carriers (such as T-Mobile) will be notified to add such numbers to their A2P whitelist; this process can take a few more days but does not require any further customer action (use the Console tool documented here to check the current status of your phone numbers).

Once the individual numbers in the Campaign's Messaging Service have been registered with the carriers, the new A2P Campaign is ready for use. For each outbound message, the A2P Campaign is selected based on your Twilio Number's Sender Pool membership. Newly created conversations will be assigned to the default Messaging Service configured in your project, as well as any auto-created conversations.