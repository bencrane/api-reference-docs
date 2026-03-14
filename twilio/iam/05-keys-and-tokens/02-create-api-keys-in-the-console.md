# Create API keys in the Twilio Console

You can create and manage all of your API keys in the Twilio Console. To create and manage API keys using the REST API, refer to **Key resource v1**.

API keys represent the required credentials that you'll use to **authenticate to Twilio's REST API** and to create and revoke **Access Tokens**.

> **Info:** If your API key requires access to the Accounts (`/Accounts`) or Keys (`/Accounts/{SID}/Keys`, `/v1/Keys`) endpoints, then you'll need to use a Main key. You can create Main keys only in the **Twilio Console**.

## Types of keys

The API key types are `Main`, `Standard`, and `Restricted` (Key resource v1 only). The following table describes each type:

| Key type | Access permissions | Create in Console | Create with REST API |
|----------|-------------------|-------------------|---------------------|
| Main | Full access to all Twilio API resources. Equivalent to using your Account SID and Auth Token for API requests. | Yes | No |
| Standard | Access to all Twilio API resources, except for Accounts (`/Accounts`) or Keys (`/Accounts/{SID}/Keys`, `/v1/Keys`) resources. | Yes | Yes |
| Restricted | Customized, fine-grained access to specific Twilio API resources. Learn more about **Restricted API keys**. | Yes | Yes (v1 only) |

## Create an API key in the Twilio Console

1. Click Admin > Account management in the top right corner.
2. Under Keys & credentials, click API keys & tokens (or go directly to the **Console**).
3. On the API keys & tokens page, click Create API key.
4. On the Create new API key page, enter a Friendly name for the API key.
5. Select the Region and the key type: Standard, Main, or Restricted. Restricted API keys are only available in the United States Region.
6. For Restricted keys, select the Permissions to grant.
7. Click Create.
8. On the Copy secret key page, Copy the secret and store it somewhere secure.
9. Select the Got it! checkbox and click Done.

## Duplicate a Restricted API key in the Twilio Console

Restricted API keys can have complex permissions. You can save time by duplicating a Restricted API key as a starting point for a new key.

1. Click Admin > Account management in the top right corner.
2. Under Keys & credentials, click API keys & tokens (or go directly to the **Console**).
3. On the API keys & tokens page, find the key to duplicate and then in the Actions column, click Duplicate key.
4. Make changes to the fields and Permissions as needed.
5. Click Create.
6. On the Copy secret key page, Copy the secret and store it somewhere secure.
7. Select the Got it! checkbox and click Done.

## Update an API key in the Twilio Console

For Standard and Main API keys, you can update only the Friendly name. For Restricted keys, you can update the Friendly name and the Permissions.

1. Click Admin > Account management in the top right corner.
2. Under Keys & credentials, click API keys & tokens (or **follow this link to the Console**).
3. On the API keys & tokens page, click the name of the API key to update.
4. On the API key's page, update the Friendly name or the Permissions to grant (Restricted keys only).
5. Click Save, then click Save again on the confirmation pop-up.

## Delete an API key in the Twilio Console

If you no longer use an API key or if a key has been compromised, then you can revoke the key's permissions by deleting the API key.

1. Click Admin > Account management in the top right corner.
2. Under Keys & credentials, click API keys & tokens (or **follow this link to the Console**).
3. On the API keys & tokens page, click the name of the API key to delete.
4. On the API key's page, click Delete this API key at the bottom of the page.
5. In the pop-up, click Delete this API key to confirm deletion.