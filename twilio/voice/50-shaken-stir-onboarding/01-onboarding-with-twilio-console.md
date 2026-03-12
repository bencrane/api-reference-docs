# SHAKEN/STIR - Onboarding in the Twilio Console




Deliver a trusted impression on the called party's phone





In a few clicks in the Console, you can enable SHAKEN/STIR on your outgoing calls that deliver a trust indicator on the called party's phone.


(information)
Info
You are considered a direct customer if your employees are responsible for making the calls. This includes BPOs.

You are considered an ISV (independent software vendor) if your customers are responsible for making the calls using your product.

For ISVs, there is a REST API available to allow you to pass your customer's business information directly to Twilio to get vetted so your customers can also get highest attestation under SHAKEN/STIR.
Directions for Direct Customers with no Subaccounts





SHAKEN/STIR onboarding for direct customers with steps: Parent Account, Primary Business Profile, Trust Product, Attestation Level.

Expand image
Create a Primary Business Profile

 in your Parent Account in the Trust Hub part of the Console and submit for vetting.
Assign phone number(s) in your account to your Primary Business Profile. This associates a single identity with the phone number(s).
Create a SHAKEN/STIR Trust Product

 in the Trust Hub and submit for vetting.
Assign phone numbers already assigned to your Primary Business Profile identity to the SHAKEN/STIR Trust Product.
Directions for Direct Customers using Subaccounts





SHAKEN/STIR onboarding flow for ISVs with subaccounts, showing business profiles and attestation levels.

Expand image
Create a Primary Business Profile

 in your Parent Account in the Trust Hub part of the Console and submit for vetting.
Create a Secondary Business Profile under your Subaccount and submit for vetting (this would be same information as your Primary since you are a direct customer)
Assign phone number(s) from your Subaccount to its Secondary Business Profile. This associates a single identity with the phone number(s).
Create a SHAKEN/STIR Trust Product

 for each Secondary Business Profile in the Trust Hub and submit for vetting.
Make sure the appropriate Subaccount is shown in the top left corner of the Console.
Assign phone numbers in Subaccount already assigned to your Secondary Business Profile to the SHAKEN/STIR Trust Product
Directions for ISVs/Resellers with a Single, Top-Level Project





SHAKEN/STIR onboarding flow for ISVs with primary and secondary business profiles leading to trust products.

Expand image
Create a Primary Business Profile

 in your Parent Account in the Trust Hub part of the Console and submit for vetting.
Create a Secondary Business Profile under the Primary Business Profile and submit for vetting.
Assign phone number(s) from your Parent Account to the Secondary Business Profile. This associates a single identity with the phone number(s).
Create a SHAKEN/STIR Trust Product

 for each Secondary Business Profile in the Trust Hub and submit for vetting.
Assign phone numbers already assigned to your Secondary Business Profile to the SHAKEN/STIR Trust Product
Directions for ISVs/Resellers using Subaccounts





SHAKEN/STIR onboarding flow for ISVs with subaccounts, showing business profiles and attestation levels.

Expand image
Create a Primary Business Profile

 in your Parent Account in the Trust Hub part of the Console and submit for vetting.
Create a Secondary Business Profile under your Customer Subaccount and submit for vetting.
Assign phone number(s) from your Customer Subaccount to its Secondary Business Profile. This associates a single identity with the phone number(s).
Create a SHAKEN/STIR Trust Product

 for each Secondary Business Profile in the Trust Hub and submit for vetting.
Make sure the appropriate Subaccount is shown in the top left corner of the Console.
Assign phone numbers already assigned to your Secondary Business Profile to the SHAKEN/STIR Trust Product
That's it. No coding required.

Learn more about Business Profiles and other Trust Products in the Trust Hub Docs.


(information)
Info
Twilio's Compliance operations team is responsible for vetting the Business Profile and the SHAKEN/STIR Trust Product. The time to vet can be between 24 to 48 hours.

(information)
Info
Today, Twilio is signing all US calls with the appropriate attestation in order to meet our obligations per the TRACED ACT.