# US Enhanced Branded Calling

Display the following information on recipients' mobile phones when they receive your call:

Display name: Maximum 35 characters
Logo: 32-bit BMP file sized 256x256 pixels
Call reason: Maximum 64 characters

(new)
Public Beta
US Enhanced Branded Calling is currently available as a Public Beta product, and the information contained in this document is subject to change. This means that some features aren't yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products aren't covered by the Twilio Support Terms or Twilio Service Level Agreement (SLA).
Note: Branded Calling works on mobile phones. For landlines, use Caller ID Name (CNAM) instead.

Coverage





US Enhanced Branded Calling supports the following networks:

Country	Network
United States	T-Mobile, Verizon
For the list of supported devices, see the Branded Calling FAQ

.

Eligibility





US Enhanced Branded Calling is available for both direct customers of Twilio and Independent Software Vendors (ISVs). If you're an ISV and need assistance with the Branded Calling registration process, contact your Twilio account manager.

To use Branded Calling, you must meet the following requirements:

You have legal authority to use the Branded Calling display name.
You can't use Branded Calling for illegal purposes, such as to deceive or mislead customers. If you get a high number of SIP 608 or 603 responses in your outbound calls, you might not be able to use Branded Calling. Learn more about recommendations and best practices for maintaining a positive caller reputation

.
Prerequisites





Before you begin, you must complete the following tasks:

Purchase one or more Twilio phone numbers.
Create a primary Business Profile and have it approved.
Your Business Profile must include a registration authority, either an Employer Identification Number (EIN) or a Data Universal Numbering System (DUNS) number.
You can optionally create a secondary Business Profile during the Branded Calling registration process.
Enable SHAKEN/STIR for your Twilio phone numbers.
Prepare your brand assets:
Display name
URL hosting your logo image
Call reason
Collect your business information:
Company name
Type
Address
Website URL
Company Privacy URL
Registration authority
Registration number
Brand contact information
Trade name, if not the same as company name
Employee count
Call purpose explanation
Use case description
Average calls per day
Download the LOA template

 and obtain a signed LOA.
Although not required, Twilio also recommends you create and get approval for a Voice Integrity instance. Voice Integrity lets you register your phone numbers with analytic vendors to reduce spam labeling. Learn more about onboarding Voice Integrity.

Register your brand





In the Twilio Console, on the Branded Calling Trust Product

 page, click Register branded calling and follow the instructions.

The registration process includes the following steps:

Select the country where you want to enable Branded Calling.
Choose your use case and an approved Business Profile. If you don't have a Business Profile, enter your business information.
(Optional) Assign phone numbers.
Provide business-related information, including brand contact details, use case description, and display details.
Download and sign the Letter of Authorization (LOA), which gives Twilio permission to obtain consent to use your brand name in outbound calls.
Submit your Branded Calling bundle by accepting Twilio's terms of service.
Note: Assigning phone numbers is optional during the registration process. You can assign phone numbers after your submission is approved.

Onboard customers using the Compliance API (ISV only)






(information)
Private Beta
The Compliance API is available as Private Beta. To request access, contact your account manager.
If you're an ISV, you can onboard your customers to Branded Calling by using the Compliance API.

Branded Calling bundle guidelines





When you register your brand, keep the following in mind:

A Branded Calling bundle is associated with one display name and one or more phone numbers.
A phone number can be associated with only one Branded Calling bundle.
You must create a new Branded Calling bundle for each display name you want to register.
Display name restrictions





Maximum 35 characters
Must be the official legal name, brand name, or "doing business as" (DBA) name of the caller or their affiliate. Any abbreviated display name must be associated with the customer brand and remain recognizable to the call recipient.
Must be legally registered in at least one jurisdiction within the United States
Must not contain:
Non-ASCII characters (127 and above) or control characters (0-31)
Hyperlinks that allow the recipient to:
Navigate to a webpage
Begin drafting an email, SMS, OTT, or other message
Take a separate action
Illegal content, including anything that infringes on third-party intellectual property rights (for example, trademark or copyright)
Fraudulent, deceptive, or misleading content
Content that endorses violence, contains profanity, SHAFT content, or hate speech
Personally Identifiable Information (PII)
Emojis or non-Latin characters
Logo restrictions





Must be a 32-bit BMP file sized 256x256 pixels
Must not contain:
Hyperlinks or QR codes that allow the recipient to:
Navigate to a webpage
Begin drafting an email, SMS, OTT, or other message
Take a separate action.
Illegal content, including anything that infringes on third-party intellectual property rights (for example, trademark or copyright)
Software designed to harm or exploit any programmable device, service, or network (for example, malware), including the recipient's device, service, or a voice service provider's network
Fraudulent, deceptive, or misleading content
Will be vetted against third-party trademark registries—including the USPTO's Trademark Electronic Search System (TESS), Trademark Now, Clarivate, and others—to confirm that the caller has the legal right to use the logo
Some devices might display the logo differently from other devices or might not display it at all. For more information, see the Branded Calling FAQ

.
Call reason restrictions





Maximum 64 characters.
Note: As a best practice, use 35 characters or fewer for better display on mobile devices.
Must accurately describe the intended reason for the call
Must be appropriate for the intended audience
Must not contain:
Non-ASCII characters (127 and above) or control characters (0-31)
Hyperlinks that allow the recipient to:
Navigate to a webpage
Begin drafting an email, SMS, OTT, or other message
Take a separate action
Illegal content, including anything that infringes on third-party intellectual property rights (for example, trademark or copyright)
Fraudulent, deceptive, or misleading content
Content that endorses violence, contains profanity, SHAFT content, or hate speech
Promotion of illegal drugs or substances
Emojis, non-Latin characters, non-standard spellings, or content designed to evade detection (for example, intentionally misspelled words or disguised links)
PII and any personal information, including appointment reminders that can be considered personal or health information
Call reason might not be available on all devices. For more information, see the Branded Calling FAQ

.
Review process





When you register your brand, Twilio reviews your submission to make sure it meets all requirements. The review process can take up to seven days.

Billing





Twilio charges all applicable Branded Calling fees to the account where the Branded Calling bundle is created.
Twilio bills you only when the brand information is successfully delivered. If the brand information isn't delivered, Twilio doesn't charge you for that call.
Learn more about Branded Calling pricing

.

Manage your Branded Calling bundle





You can manage your Branded Calling bundle in the Twilio Console.

Assign phone numbers to your Branded Calling bundle





In the Twilio Console, on the Branded Calling Trust Product

 page, click Branded Calling.
Select a Branded Calling bundle you want to update.
Click the Assigned phone numbers tab.
Click Add phone numbers, select the phone numbers you want to add, and click Save.
Twilio reviews the new assigned phone numbers before adding them to the Branded Calling bundle. This can take 24 to 48 hours.

Note: After you assign a phone number to an approved bundle, the branded information can take up to two hours to appear on recipients' mobile devices.

Unassign phone numbers from your Branded Calling bundle






(information)
Info
It can take 24 to 48 hours for the carrier to fully remove the branded display information from their system.
In the Twilio Console, on the Branded Calling Trust Product

 page, click Branded Calling.
Select a Branded Calling bundle you want to update.
Click the Assigned phone numbers tab.
Select the phone numbers you want to remove, and click Unassign.
The phone numbers will no longer be associated with the Branded Calling bundle and won't display the branded display name.

Next steps





Learn about using US Basic Branded Calling to display only your branded display name.