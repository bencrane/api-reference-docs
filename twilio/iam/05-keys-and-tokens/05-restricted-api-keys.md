# Restricted API keys

Use Restricted API keys for fine-grained control over access to Twilio API resources. You can create and manage Restricted API keys using the REST API **Key resource v1** or the **Twilio Console**.

Restricted API keys allow you to grant API access to many Twilio API endpoints, including:

- **Studio**
- **Voice**, **Conversational Intelligence**, **Voice Insights**, and **SIP**
- **Messaging**
- **Long Codes**, **Regulatory Compliance**
- **TaskRouter**
- **Monitor Events** and **Monitor Alerts**
- **Lookup**
- **Verify**
- **Video**
- **Event Streams**
- **Usage Records**
- Flex: The Flex Insights Historical Reporting and Self-Signed Certificate API keys permissions are currently in private beta and not available for general use. For more information, contact your Twilio account executive.

For example, if your Programmable Voice application's testing suite makes test Voice calls, you can create a Restricted API key that permits only sending `POST` requests to **create Call Resources**.

Or you can create Restricted API keys that provide your engineering team with access to every Voice endpoint except the Call Recording Resource endpoints.

> **Warning:** You can't create **Access Tokens** for Twilio's client-side SDKs with Restricted API keys.

## Working with Restricted API keys

### Create and manage Restricted API keys

- Learn how to use the **Twilio Console to create and manage API keys**.
- Learn how to use the **REST API to create and manage API keys**.

### Authenticate with a Restricted API key

Twilio uses the Restricted key's SID and secret as your credentials when sending API requests.

Read the **Requests to Twilio** page to learn more.

## Permissions available with Restricted API keys

> **Warning:** Restricted API keys have a limit of 100 permissions that can be associated with each key.

Restricted API keys allow you grant permissions for keys to access specific API endpoints.

Each permission maps to one or more endpoints/actions for each API Resource.

Click on one of the product areas below to download a PDF of the permissions/endpoint actions.

- **Twilio Restricted API keys Permissions - Messaging Permissions**
- **Twilio Restricted API keys Permissions - Phone Numbers Permissions**
- **Twilio Restricted API keys Permissions - Studio Permissions**
- **Twilio Restricted API keys Permissions - TaskRouter Permissions**
- **Twilio Restricted API keys Permissions - Voice Permissions**
- **Twilio Restricted API keys Permissions - Lookup Permissions**
- **Twilio Restricted API keys Permissions - API keys Permissions**
- **Twilio Restricted API keys Permissions - Monitor Permissions**
- **Twilio Restricted API Keys Permissions - Verify Permissions**
- **Twilio Restricted API Keys Permissions - Video Permissions**
- **Twilio Restricted API Keys Permissions - Event Streams Permissions**
- **Twilio Restricted API Keys Permissions - Usage Records Permissions**