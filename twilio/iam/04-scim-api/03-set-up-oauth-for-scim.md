# Set up OAuth for SCIM

Before you can use the SCIM API, you must create an OAuth application and get an access token. This page explains how to create an OAuth application, authorize it, and generate an access token for SCIM API requests.

> ℹ️ **Info**
> Many identity providers perform authorization on your behalf. See Okta SCIM integration or the user documentation for your IdP for more information.

## Prerequisites

You must be an Organization Owner or Organization Admin to create and authorize OAuth applications.

> ⚠️ **Warning**
> To avoid service disruptions when users are deactivated or removed from your organization, create a dedicated user account (sometimes called a service account) with email-based login credentials that a group of people can access for this setup.

## Create an OAuth application

1. Sign in to the Twilio Console.
2. Click Admin in the top-right corner to open the Admin Center.
3. Go to Applications > OAuth apps.
4. Click Create OAuth app.
5. Select Authorization code as the grant type.
6. Enter the application details:
   - For Application name, enter a name for your OAuth app.
   - For Company Name, enter your company name.
   - For Redirect URL enter an identity provider URL where Twilio should redirect the user after they authorize your app. For example, https://example.com/token.
   - For Scopes and Permissions, select all managed-users scopes.
7. Click Save.

After you save your configuration, Twilio generates the Client ID, Client Secret, and Authorization URL. Copy these values and store the Client Secret securely. Twilio shows the Client Secret only once.

## Authorize the application

After you create the OAuth application, authorize it to obtain an authorization code.

Construct the authorization URL with the following query parameters:

```
https://oauth.twilio.com/v2/authorize?client_id=CLIENT_ID&response_type=code&scope=offline_access&redirect_uri=REDIRECT_URL&state=STATE
```

- Replace CLIENT_ID with the Client ID from your OAuth application.
- Replace REDIRECT_URL with the Redirect URL configured in your OAuth application.
- Replace STATE with a unique value to prevent CSRF attacks.

Open the authorization URL in a browser.

Sign in with your Twilio credentials.

> ℹ️ **Info**
> The authorization page doesn't support SSO login. Use an organization admin user whose SSO is deactivated.

Review the requested scopes and permissions, then click Approve access.

After approval, you're redirected to your Redirect URL with the authorization code:

```
REDIRECT_URL?code=AUTHORIZATION_CODE&state=STATE
```

The authorization code expires after five minutes. Use it immediately to generate access tokens.

## Generate access tokens

You can exchange the authorization code for access and refresh tokens.

### Example request

```bash
curl --location 'https://oauth.twilio.com/v2/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=CLIENT_ID' \
--data-urlencode 'client_secret=CLIENT_SECRET' \
--data-urlencode 'grant_type=authorization_code' \
--data-urlencode 'code=AUTHORIZATION_CODE' \
--data-urlencode 'redirect_uri=REDIRECT_URL'
```

Replace the following placeholders in the above cURL request:

- Replace CLIENT_ID with your OAuth application's Client ID.
- Replace CLIENT_SECRET with your OAuth application's Client Secret.
- Replace AUTHORIZATION_CODE with the authorization code from the previous step.
- Replace REDIRECT_URL with your configured Redirect URL.

### Example response

```json
{
    "access_token": "ACCESS_TOKEN",
    "id_token": null,
    "token_type": "Bearer",
    "expires_in": 3600,
    "refresh_token": "REFRESH_TOKEN"
}
```

This response includes the following values:

- ACCESS_TOKEN: the access token to authenticate SCIM API requests.
- REFRESH_TOKEN: the refresh token to obtain new access tokens.

The access token is a JSON Web Token (JWT) that expires after one hour. Use the refresh token to obtain new access tokens without reauthorizing.

## Make authenticated requests

Include the access token in the Authorization header for SCIM API requests:

```bash
curl --location 'https://iam.twilio.com/scim/v2/Users' \
--header 'Authorization: Bearer ACCESS_TOKEN'
```

Replace ACCESS_TOKEN with your access token.

## Next steps

After setting up OAuth, you can explore the following resources:

- SCIM API reference: View the complete API reference for user management endpoints.
- Okta integration: Configure SCIM provisioning with Okta as your identity provider.