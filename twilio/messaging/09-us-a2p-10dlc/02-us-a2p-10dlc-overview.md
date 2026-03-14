# Programmable Messaging and A2P 10DLC

A2P (Application-to-Person) 10DLC (10-digit long code) is the standard that United States telecom carriers have put in place to ensure that SMS traffic to US end users through long code phone numbers is verified and consensual.

> **Warning**
> Due to an increase in campaign submissions, campaign reviews are currently taking 10–15 days. Twilio will contact you if additional information is needed. Once approved, you can begin sending A2P 10DLC messages. If this review period has passed and your campaign is still in a pending state, please reach out to Support for assistance.

## A2P 10DLC background

### What is A2P

Application to Person (A2P) messaging is SMS/MMS traffic in which a person is receiving messages from an application rather than another individual.

US telecom carriers consider any messages sent from a Twilio number (or any other messaging provider) to be application to person.

Traffic sent from an individual person to another person is called Person to Person (P2P) traffic.

### What is 10DLC

10DLC stands for 10-digit long code. A 10DLC phone number contains 10 digits, and is also called a local phone number. When you are buying a US phone number from Twilio, 10DLC numbers have "Local" as their Type.

You might also hear 10DLC numbers referred to as 10DLC routes.

You can also use Toll-Free numbers and short codes to send messages from Twilio to people in the US.

### Why A2P 10DLC was created

Ten-digit long code numbers in the US were originally designed for person to person (P2P) communication. These routes were unregulated, and in recent years have started seeing abuse from spam applications and unsolicited messaging.

Due to the increase in spam messages, many consumers have lost trust in SMS as a form of communication. US A2P 10DLC is the standard that carriers have implemented in the US to regulate this communication pathway.

A2P 10DLC improves the end user experience by making sure that people can opt in and out of messaging and also know who is sending them messages. It also benefits businesses, offering them higher messaging throughput, brand awareness, and accountability.

### Who needs to register for A2P 10DLC?

Anyone sending SMS/MMS messages over a 10DLC number from an application to the US must register for A2P 10DLC.

Carriers consider all SMS traffic from Twilio to be sent from an application. Anyone using a 10DLC number with Twilio to send SMS messages to the US will need to register. This includes individuals and hobbyists using Twilio.

> **Info**
> Toll-Free numbers and short code numbers aren't part of the A2P 10DLC system and can also be used for messaging end-users in the United States.

If you're only using 10DLC numbers to send user verification text messages, you can use Twilio Verify rather than registering for A2P 10DLC.

Registering for A2P 10DLC results in lower message filtering and higher messaging throughput. Additionally, customers who send messages from a Twilio 10DLC number but do not register will receive additional carrier fees for sending unregistered traffic.

## General A2P 10DLC registration steps

US A2P 10DLC has been put in place to ensure that all A2P 10DLC traffic to US phone numbers is verified and consensual. To meet this goal, there are two main components of A2P 10DLC registration:

1. **Create a Brand**
   - You provide information about who is sending these messages so that carriers know you are a legitimate sender

2. **Create a Campaign**
   - You provide information about how end users can opt-in, opt-out, and receive help. It also involves providing a description of the purpose of your messages.

You can create a Brand and Campaign either in the Twilio Console or via the Twilio API, depending on what type of customer you are.

## Determine your customer type

| Customer Type | Description | How do I register my business? |
|---------------|-------------|--------------------------------|
| Direct Brand | You're a business owner that uses Twilio messaging services to send and receive SMS to/from your customers. You have a business Tax ID (not including a US Social Security Number). | Using the Twilio Console |
| Independent Software Vendor (ISV) | You're a software company that embeds Twilio APIs into your software solutions to power digital communications for your customers. | Using the Twilio Console or API |
| Sole Proprietor | You're a student, hobbyist, someone working at an organization or someone trying out Twilio messaging products for the first time. | Using the Twilio Console |

## Determine your Brand type

Twilio offers different A2P 10DLC Brand types, depending on the type of customer you are and the messaging volume and throughput you need.

| | Sole Proprietor Brand | Low-Volume Standard Brand | Standard Brand |
|---|----------------------|---------------------------|----------------|
| Campaigns per Brand | One Campaign per Brand | Up to five Campaigns | Up to five Campaigns |
| Daily message volume | ~3,000 SMS segments/MMS per day across US carriers | ~6,000 SMS segments/MMS per day across US carriers | Up to unlimited, depending on Trust Score |

> **Info: Brands per Tax ID**
> Standard and Low-Volume Standard Brands require a Tax ID (e.g. EIN in U.S., Canadian Business Number in Canada). Each tax ID may be used to register up to five Standard/Low Volume Standard Brands.

## Determine your Campaign use case type

Your Campaign use case type describes the general type of messages you will be sending to end-users:

- **Standard** - Marketing, account notifications, 2FA, etc.
- **Low-Volume Mixed** - Lower messaging volume with lower monthly fee
- **Special** - Non-profits, emergency services, etc.

## Register for US A2P 10DLC with Twilio

Use the following guides to complete your A2P 10DLC registration based on your customer type:

- Direct Customer Standard and Low-Volume Standard A2P 10DLC registration instructions
- Direct Customer Sole Proprietor A2P 10DLC registration instructions
- ISV Customer Standard A2P 10DLC registration instructions
- ISV Customer Sole Proprietor A2P 10DLC registration instructions
