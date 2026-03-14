# Programmable Messaging RCS Regional Availability

You can send RCS messages in multiple regions using Twilio Programmable Messaging. This document outlines the supported regions and highlights requirements and considerations unique to each region.

---

## Supported regions

You can send RCS messages using Twilio's Programmable Messaging API to at least one major carrier in the following regions:

### North America (NAMER)

- Canada
- Mexico
- United States

### Europe, the Middle East, and Africa (EMEA)

- Austria
- Belgium
- Czech Republic
- Denmark
- Finland
- France
- Germany
- Ireland
- Italy
- Netherlands
- Norway
- Poland
- Portugal
- Romania
- Slovakia
- Spain
- Sweden
- United Kingdom

### Latin America (LATAM)

- Brazil
- Mexico

### Asia-Pacific (APAC)

- Singapore

---

## Special considerations

### Brazil

- RCS messaging in Brazil requires creating a RCS Sender specifically for use in Brazil. Brazil RCS Senders cannot be used to send messages in other countries. This cannot be done in the Twilio Console and requires manual steps.
- To get started in Brazil, submit the form.
- RCS Senders in Brazil may experience up to 60 minutes of downtime annually during a maintenance window. Twilio will provide a 30-day advance notice for this. During this period, all messages will default to SMS delivery instead of RCS.
- RCS Sender branded profile information, except for display name, can be changed without downtime.

### Germany

- Only one sender is allowed per name and per use case. If you need multiple senders, each must have a distinct name (e.g., Owl and Owl Inc.). Multiple senders cannot be used for the same use case (e.g., authentication).
- RCS Senders approved by German carriers must have their website, terms of service, and privacy policy links in German or easily translatable to German.
- During the onboarding process, you will be required to download, fill out and Docusign a Brand Verification Letter for carriers.

### Mexico

- RCS Senders in Mexico must have all of their information in Spanish, including the description.

### Singapore

- RCS Senders must follow the same SSIR Singapore registration process as A2P SMS sender IDs, explained in the Overview of SMS Sender ID Registry.

### Portugal

- RCS Senders must be approved by carriers in Spain before they can be approved by carriers for Portugal. Twilio will automatically submit Senders in Spain when selecting Portugal.

### United Kingdom

- To be approved on the UK Carriers, an RCS Sender may not contain international phone numbers within the branded profile information. Only UK phone numbers with a country code of +44 are permitted. Phone numbers are not required and may be requested to be removed manually after submission.

### United States

While all brands are able to submit RCS Senders for carrier approval, carriers currently prioritize:

- Notable brands, including Fortune 1000 companies or highly recognizable names
- High-quality experiences featuring rich content and conversational interactions
- Established messaging volume (100,000+ messages per month) or the migration of existing SMS/MMS traffic to RCS (this applies per brand for ISVs)

Brands that do not meet these criteria may face longer approval times as the ecosystem scales.