# Get Started - Configure your default Sender ID

In this guide, you'll learn what a default Sender ID is, how it works, when to use it, and how to change it.

> **Default Sender ID rollout**
> 
> Twilio introduced default Sender IDs for destinations that require Sender ID registration on July 10, 2024. If you had only one Sender ID registered in a country at that time, Twilio set it as the default. Twilio doesn't set Sender IDs registered afterward as default. You can set or change the default Sender ID at any time.

## What is a default Sender ID?

You can set a default Sender ID for any country where you've registered one or more Sender IDs. It's usually an Alphanumeric Sender ID, but it can be a short code or long code phone number.

If you have a default Sender ID and the From value in your API request doesn't match any of your registered Sender IDs, Twilio replaces it. Twilio uses the default Sender ID instead when sending the message.

A default Sender ID guarantees that all your messages sent to a specific destination comply with local regulations when Sender ID registration is required. This prevents carriers from dropping or blocking messages if you accidentally use a long code or other non-compliant Sender ID as the From value of your API request.

If you don't have a default Sender ID or you remove it, Twilio tries to send your messages using the From value you provide. If this value doesn't comply with SMS guidelines, carriers could block your messages or they could fail to deliver.

## Example scenario

Let's say you registered two Alphanumeric Sender IDs in both Colombia and Mexico: "Owl Inc" and "Hoot Hoot." In this example, "Hoot Hoot" is set as the default Sender ID for Colombia, but there's no Default Sender ID in Mexico.

**When sending messages to Colombia:**

| From | Result |
|------|--------|
| "Owl Inc" | Message sent with "Owl Inc" (registered Sender ID) |
| "Hoot Hoot" | Message sent with "Hoot Hoot" (registered Sender ID) |
| "+15551234567" | Message sent with "Hoot Hoot" (Default Sender ID) |
| "Other Corp" | Message sent with "Hoot Hoot" (Default Sender ID) |

**When sending messages to Mexico:**

| From | Result |
|------|--------|
| "Owl Inc" | Message sent with "Owl Inc" (registered Sender ID) |
| "Hoot Hoot" | Message sent with "Hoot Hoot" (registered Sender ID) |
| "+15551234567" | Message sent with "+15551234567" (no Default Sender ID) |
| "Other Corp" | Message sent with "Other Corp" (no Default Sender ID) |

## Is the check for registered Sender IDs case sensitive?

Yes. In the scenario above, if your From parameter was "hoot hoot", it would not match the registered Sender ID "Hoot Hoot." In Colombia, Twilio uses the Default Sender "Hoot Hoot" to send the message. In Mexico, Twilio uses the original "hoot hoot" to send the message.

## Can you have more than one default Sender ID in a single country?

No, you can only have one default Sender ID per country. If you need to use two different Sender IDs in a single country, remove the default Sender ID. Then provide the appropriate Sender ID in the From value of your API request.

## Check your default Sender ID

To check if you have configured a default Sender ID in a specific country:

1. In the Twilio Console, go to **Phone numbers > Alphanumeric Sender IDs**.
2. Check the list of registered Sender IDs in the **Sender ID list** tab.
3. If a sender is set as default, you will see a **Default Sender ID** badge under the sender name and a blue tick beside the country where that sender is set as default.
4. If a sender is not set as default anywhere, there will be no badge under that sender.

## Change the default Sender ID for a country

To change the default Sender ID for a country:

1. In the Twilio Console, go to **Phone numbers > Alphanumeric Sender IDs**.
2. In the **Sender ID list** tab, expand the **Default Sender ID settings** section.
3. Click **Configure default Sender ID**.
4. In the modal, use the dropdown menus to select which countries you want each Sender ID to be the default.
5. Click **Save**.

## Remove the default Sender ID for a specific country

To remove the default Sender ID for a country:

1. In the Twilio Console, go to **Phone numbers > Alphanumeric Sender IDs**.
2. In the **Sender ID list** tab, expand the **Default Sender ID settings** section.
3. Click **Configure default Sender ID**.
4. In the modal, click the **X** next to the country name associated with the corresponding Sender ID.
5. Click **Save** for the changes to take effect.

> **Warning**
> 
> If you remove the Default Sender ID, make sure the From value you use for future messages to that destination follows SMS Guidelines and matches one of your registered Sender IDs for that country. Otherwise, your messages might be filtered or blocked.