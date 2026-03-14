# Domains

> **Info:** The Admin Center has been renamed to Twilio Admin.

To invite your employees to the Organization with their company email addresses, associate your Organization with one or more internet domains that you own. Domain association also lets you treat ownership of one of your company email addresses as a sign of trust.

Before you can add a domain with your Organization, you must verify that you own it. Open the Twilio Admin Domains page. This section lists both any added domains and those undergoing verification. By default, Twilio limits each Organization to 100 domains. To increase this limit, contact support.

## Add a domain

To associate your Organization with a specific domain, add the domain in the Twilio Admin Console.

> **Warning:** Verification requires domain ownership. Common domains like Gmail or Hotmail can't be verified in Twilio's Organizations. You can't invite users to an Organization with an unverified domain.

1. Log in to the Twilio Admin Console.
2. Click Domains.
3. Click Add Domain. The Verify Domain page appears.
4. In Step 1: Add Domain, enter your company's domain name.
5. Click Save & continue. The Step 2: Verify Domain section appears.
6. Choose a domain verification method: DNS, HTTPS, or I am not sure which option to use.

### DNS Verification Method

1. Click Save & continue. The Step 3: Verify your domain using the DNS method section appears with a `twilio-domain-verification=` followed by 32-hexadecimal digits.
2. Click the copy button for this value.
3. Go to your DNS provider.
4. Following your DNS provider instructions, create a DNS record with the following values:

| Parameter | Value |
|-----------|-------|
| Type | `TXT` |
| Name | `_twilio` |
| Value | `twilio-domain-verification=<32-hexadecimal-characters>` |
| TTL | `3600` |

5. Click Verify domain.

After you click the button, Twilio checks your DNS record. DNS propagation can take up to 72 hours. Twilio might not mark your domain as verified straight away.

## Confirm continued ownership

To confirm your continued ownership, Twilio re-checks the file upload or DNS data every 24 hours.

- If the token gets altered or removed, an Organization's Owner or Administrator has 30 days to re-validate the domain before Twilio deletes it from the Organization.
- Until Twilio re-validates the domain, you can't add users that use email addresses from that domain.
- If your domain remains unvalidated for more than 30 days, Twilio removes any managed users added to the Organization. After validating the domain, add the managed users back to the Organization.

## Delete a domain

To remove a domain from your Organization, use the Twilio Admin Console.

1. Log in to the Twilio Admin Console.
2. Click Domains.
3. Click Delete Domain under the Actions column for the domain you want to delete.

## Verify a domain in more than one Organization

In some situations, Organizations might keep different business units as separate Twilio Organizations. To enable these units to access Organization-level functionalities, Twilio allows more than one Twilio Organization to verify the same internet domain. Twilio calls a domain a multi-verified domain.

### Organizations with a multi-verified domain can:

1. Verify the same domain in more than one Organization. Up to 20 Organizations can use the same domain.
2. Manage users and respective accounts in each Twilio Organization without dependencies from other Organizations with the same domain.
3. Enforce single sign-on for their specific set of users.

### Organizations with multi-verified domain can't:

1. Apply the Organization settings with get users to auto-join or join through invitation only settings.
2. Bulk import users without invitation.

Only one Organization at a time can manage a user or account.

When one Organization verifies the previously verified domain, Twilio notifies all Organizations and disables the previous functionalities. If you want to verify your company's internet domain in more than one Organization, contact support.

## User Import

To learn how to bulk import existing Twilio users from your verified domain into your Organization, see Import Users.