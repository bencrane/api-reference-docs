# SCIM API overview

Use the System for Cross-Domain Identity Management (SCIM) API to automate user provisioning and deprovisioning within your organization. The API integrates with identity providers (IdPs) through the __SCIM 2.0 standard__, allowing you to synchronize user management between your IdP and Twilio.

## How it works

The SCIM API uses the OAuth 2.0 Authorization Code grant for authentication. The workflow is as follows:

1. Create an OAuth application in the __Twilio Admin Center__ with the required SCIM scopes.
2. Authorize the application to obtain an authorization code.
3. Exchange the authorization code for access and refresh tokens.
4. Use the access token to make requests to the __SCIM API endpoints__. Use the SCIM endpoints to create Twilio users, update them, and deactivate them.

Steps 2–4 are typically handled by an identity provider (for example, Okta).

## Next steps

Get started with the SCIM API by using the following resources:

* __Okta integration__: Configure SCIM provisioning with Okta as your identity provider.
* __Set up OAuth for SCIM__: Create and configure an OAuth application for SCIM access.
* __SCIM API reference__: See the complete API reference for user management endpoints.