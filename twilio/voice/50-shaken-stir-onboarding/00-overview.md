# SHAKEN/STIR Onboarding - Overview

(information)
Info
This page provides information about Twilio's SHAKEN/STIR onboarding process and links to onboarding directions.
If you're looking for information on SHAKEN/STIR and implementation details, go to the __Trusted Calling with SHAKEN/STIR__page.
SHAKEN/STIR is automatically added to all the approved Primary Customer Profiles. To complete SHAKEN/STIR, assign phone numbers in your account to the approved Primary Customer Profile. This associates a single identity with the phone number.
There are two different options for enabling SHAKEN/STIR on your account(s):
1. Using the Twilio Console
2. Twilio's Trust Hub REST API.
For both methods, you will need to know whether you are a direct customer or an ISV/Reseller.
* You are considered a Direct Customer if your employees are responsible for making the calls. This includes Business Process Outsourcing (BPO) Call Centers.
* You are considered an Independent Software Vendor (ISV)/Reseller if your customers are responsible for making the calls using your product.
SHAKEN/STIR Onboarding in the Twilio Console
If you want to use the Twilio Console to enable SHAKEN/STIR, refer to the __SHAKEN/STIR Console Onboarding Instructions__.
SHAKEN/STIR Onboarding with the Trust Hub REST API
If you'd prefer to use the Trust Hub REST API, choose the instructions that correspond to your business structure.
* __Direct Customer, no subaccounts__
* __Direct Customer using subaccounts__
* __ISV/Reseller with single, top-level project__
* __ISV/Reseller using subaccounts__
Vetting and Attestation Levels
The Twilio onboarding process for SHAKEN/STIR involves a vetting process.
(information)
Info
Twilio's Compliance operations team is responsible for vetting the Business Profile and the SHAKEN/STIR Trust Product. The time to vet is 24 hours for Business Profile and 72 hours for SHAKEN/STIR Trust Product.
When will a Twilio call be signed with level `A` attestation?
When a customer has the following, the call will be signed with `A` level attestation:
* Approved Business Profile
* Approved SHAKEN/STIR Trust Product that is linked to the Business Profile
* Phone number(s) assigned to both the Business Profile & SHAKEN/STIR Trust Product (only calls from those assigned Phone Numbers will be signed "A")
When will a Twilio call be signed with level `B` attestation?
When a customer has at a minimum the following, their calls from Parent and Sub-Accounts will be signed with `B` level attestation:
* Approved Primary Business Profile
* Approved SHAKEN/STIR Trust Product linked to their Parent Account
   * Note: There is no need to assign Phone Numbers or use Secondary Business Profiles to achieve `B` level attestation.
* This would also be the highest level of attestation possible if a customer is using non-Twilio phone numbers,
   * This is because Twilio cannot attest to a customer's right to use a phone number if it is not a Twilio phone number. Twilio is currently investigating solutions to this.
When will a Twilio call be signed with level `C` attestation?
When a customer does the following, their calls will be signed with `C` level attestation:
* No approved Business Profile(s) and SHAKEN/STIR Trust Product(s) (ie if customer does nothing) OR Rejected Business Profile(s) and SHAKEN/STIR Trust Product(s)
(information)
Info
Today, Twilio is signing all US calls with the appropriate attestation in order to meet our obligations per the TRACED ACT.