# SMS Geo Permissions

This guide shows you how to use SMS Geo Permissions to reduce your exposure to SMS-based fraud and related unexpected financial risks.

- Learn what SMS Geo Permissions are and why setting them appropriately is critical
- Follow the step-by-step guide on how to change SMS Geo Permissions
- Understand how to work with SMS Geo Permission when using Subaccounts or Twilio Organizations
- Find out how to audit SMS Geo Permission changes

## Purpose of SMS Geo Permissions

Twilio supports sending SMS messages to many countries globally. While this capability provides you with a wide reach to serve your use cases, it is just as important to use the tools available to you to manage your exposure to risks such as SMS Pumping Fraud.

SMS Geo Permissions are one such tool. Configuring SMS Geo Permissions allows you to control the list of countries to which you can send SMS messages. Given the rise of fraud in the SMS ecosystem, Twilio recommends disabling destination countries your business doesn't use or uses infrequently as a line of defense against fraudulent activity.

By default a newly created account allows messages to be sent to your home country as determined by the phone number you verified during signup. You can follow the steps in the following How to change SMS Geo Permissions section to judiciously enable and disable SMS Geo Permissions by country.

> **Warning:** Each country has its own regulatory framework governing the use of SMS messages. Regulatory provisions may differ by sender type and use case. They may include additional registration requirements and define prohibited use cases.
>
> You are responsible for compliance with the applicable country-specific regulations. Review the SMS Guidelines for a country before you consider enabling its SMS Geo Permissions.

As you decide whether to enable SMS Geo Permissions for additional countries, make sure to review the What's Next? section at the end of this page for further guidance on ways to mitigate your risk exposure using Twilio products and best practices.

## How to change SMS Geo Permissions

> **Info:** SMS Geo-Permissions can not be changed programmatically via the API for security reasons.

> **Warning:** Only users with Account Owner and Account Admin profiles can modify SMS Geo Permissions.

### Step 1 - Navigate to Messaging Geo Permissions settings

Ensure you are logged into the Twilio Account for which you want to change the permissions.

Navigate to **Console > Messaging > Settings > Geo Permissions**.

### Step 2 - Adjust your SMS Geo Permission settings

> **Info:** SMS Geographic Permissions generally work based on the country code of the destination phone number. However, exceptions exist for political and historical alignments and some may not map strictly to a country's political or cultural boundaries.

Find the country or region for which you want to adjust the SMS Geo Permissions. You can do so by scrolling through the displayed listing arranged by continent or you can use the Filter by Country input control to narrow the search.

Once you have found the country or region whose permissions you want to adjust, use the checkbox control next to its name to enable or disable it.

> **Warning:** Some countries or regions will have a High Risk marking next to their name. Twilio has assessed them to currently have the highest risk of SMS Traffic Pumping Fraud.
>
> As conditions change, e.g. due to enforcement actions or evolving bad actor behavior, Twilio's continuous monitoring activities may lead to adjustments of its risk assessments and result in changes to which countries or regions are marked as High Risk.
>
> Click on the High Risk marking to see a tooltip with additional information.

### Step 3 - Save your Geo Permission changes

Press the **Save geo permissions** button. An appropriate dialog opens to ask for your confirmation to proceed with saving the changes.

> **Danger:** Saved changes to SMS Geo Permissions take effect immediately.
>
> As a result, as soon as you save the changes that disable the SMS Geo Permissions for a destination region, SMS to this destination will no longer be sent.
>
> When trying to send an SMS to a recipient (to) whose region has disabled SMS Geo Permissions, you will receive an Error 21408.

#### Changes involving enabling High Risk Countries

If your changes include the enabling of SMS Geo Permissions for one or more countries that were marked High Risk for fraudulent activity, a Risk Acknowledgement Confirmation Dialog is shown. The dialog contains the list of affected countries and asks you to acknowledge:

- The resulting assumption of the increased risk and financial exposure
- Your responsibility to take actions to mitigate such risks.

If you decide to proceed, check the **I Acknowledge this risk** checkbox and then press the **Enable Geo Permissions** button.

Otherwise, press the **Cancel** button and return to Step 2 - Adjust your SMS Geo Permission settings.

#### Changes without enabling High Risk Countries

Even if your changes do not involve the enablement of high risk countries, a confirmation dialog is shown to remind you that saved geo permissions take immediate effect, including the blocking of SMS sent to disabled countries.

If you decide to proceed, press the **Update geo permissions** button.

Otherwise, press the **Cancel** button and return to Step 2 - Adjust your SMS Geo Permission settings.

#### Successful updates

If a confirmed update to the SMS Geo Permissions is successful, the success alert "Messaging geo permissions updated successfully" appears in the top right corner of the screen.

## Permissions inheritance with Subaccounts and Organizations

Depending on the complexity of your company or your use case, you may have decided to:

- Add subaccounts under a Twilio account to segment messaging activities for compliance or other business reasons
- Manage multiple Twilio accounts using a Twilio Organization.

If that is the case, it is important to understand the role of permissions inheritance.

### Subaccounts

By default a subaccount inherits the SMS Geo Permissions settings of its parent account. Inheritance is only possible between a single parent and its owned subaccounts.

To control the SMS Geo Permissions of a subaccount independently of its parent account, a user with Account Owner or Account Administrator role has to disable inheritance for the subaccount.

Then you are able to individually change the SMS Geo Permissions for the subaccount following the process described in How to change SMS Geo Permissions.

### Organizations

If you utilize a Twilio Organization to manage multiple accounts, each account will have its own separate SMS Geo Permissions settings independent of other accounts in the same organization.

No SMS Geo Permissions settings can be inherited from the organization-level.

As a result, you must manage each account's SMS Geo Permissions individually following the steps in How to change SMS Geo Permissions.

## Auditing SMS Geo Permission changes

You may wish to review which changes were made to SMS Geo Permissions. Event logs for SMS Geo Permission changes can be found in Console or requested programmatically using the Monitor Event REST API resource.

### Console

In order to audit SMS Geo Permission changes in Console, you can follow these steps:

1. Ensure you are Logged into Console with the Twilio Account you want to audit.
2. Navigate to the **Monitor > Insights > Audit > Audit Event Logs** report.
3. Set the Start Date and End Date to narrow the period you want to audit.
4. Find and review entries with Event Type values of:
   - `sms-geographic-permissions.created`
   - `sms-geographic-permissions.deleted`
   - `sms-geographic-permissions.updated`
5. Click on an entry's Event SID to see full details of the SMS Geo Permissions Change.

The audit event details include:

- Event date and time
- Resource Type and Event Type
- Information about who made the change (Actor SID, Actor and Source IP Address)
- For updated SMS Geo Permissions, the Property column of the Changes table will contain the name of the country for which a change was made and its Previous Value and Updated Value.

### Monitor Event API

The Monitor Event API resource allows you to Read a list of monitored events for certain resource types and associated event types. Specifically for changes to the SMS Geo Permissions, you can obtain events for the resource type `sms-geographic-permissions` which is associated with the following three event types:

- `sms-geographic-permissions.created`
- `sms-geographic-permissions.deleted`
- `sms-geographic-permissions.updated`

Use the EventType parameter of the Read action to get a list of filtered SMS Geo Permission change events for any one of these event type values. To only see events within a specific time frame, you can additionally use the StartDate and EndDate parameters.

## What's Next?

Now that you know which role SMS Geo Permissions play and how to manage them, check out the following information to further protect yourself from SMS-based fraud:

- Read our guidance on Preventing Fraud and SMS Pumping Protection for Programmable Messaging
- Explore the use of Verify and its Verify Fraud Guard feature
- Follow our Anti-Fraud Developer's Guide for comprehensive guidance