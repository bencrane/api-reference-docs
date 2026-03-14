# OAuth apps

> **Public Beta Notice:** OAuth apps, including any applicable API, is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by the Twilio Support Terms or Twilio Service Level Agreement.
>
> Learn more about beta product support.

OAuth apps enable OAuth 2.0 authorization for Twilio APIs using the client credentials grant type defined in RFC 6749, section 4.4. This grant type is designed for machine-to-machine (server-to-server) interactions, such as backend services, where an application authenticates directly with another application rather than on behalf of a user.

You can create OAuth apps directly in the Twilio Console. When you create an OAuth app, Twilio automatically generates a Client ID and Client Secret for that app. Next, use these credentials to request an access token from the Twilio OAuth token endpoint. After you obtain an access token, you can authenticate calls to Twilio APIs.

Here are the key benefits of using OAuth Apps:

- Using OAuth credentials short lived access tokens are generated. Right now the expiry is fixed at 1 hr.
- Access tokens are scoped and have restricted access to only some APIs.

> **Note:** OAuth apps currently do not support the Authorization Code grant type, which is used for third-party delegated access scenarios. For third-party delegated access, use Twilio Connect instead.

---

## Create an OAuth App

1. Click Admin > Account management in the top right corner.
2. Under Keys & credentials, click OAuth apps (or go directly to the Console).
3. On the OAuth apps page, click Create an OAuth app.
4. On the Create an OAuth app page, enter App name and Description of the app.
5. Select OAuth Scopes which are permissions which an OAuth app needs access to.
6. Click Create app.
7. On the Credentials page, copy the Client ID and Client Secret and store it somewhere secure.
8. Select the Got it! checkbox and click Finish.

To generate the access token, use the Token API.

---

## View/Update an OAuth app

1. Click Admin > Account management in the top right corner.
2. Under Keys & credentials, click OAuth apps (or go directly to the Console).
3. On the OAuth apps page, click on the App name.
4. On the OAuth apps detail page view App name, Description of the app, Date created, Created by, OAuth Scopes and Client ID. You can update the App name, Description of the app and OAuth Scopes.
5. Click Save to update the app or Cancel to go back to the OAuth apps list page.

---

## Rotate Secret of an OAuth app

1. Click Admin > Account management in the top right corner.
2. Under Keys & credentials, click OAuth apps (or go directly to the Console).
3. On the OAuth apps page, click on the App name.
4. On the OAuth apps detail page click on the Credentials tab.
5. Click on Rotate secret, then click on Yes, rotate secret on the confirmation pop-up.
6. Copy the new Client Secret and store it somewhere secure.
7. Select the Got it! checkbox and click Done.

> **Note:** When a secret is rotated, the old secret remains valid for 24 hours before becoming inactive.

---

## Delete an OAuth App

1. Click Admin > Account management in the top right corner.
2. Under Keys & credentials, click OAuth apps (or go directly to the Console).
3. On the OAuth apps page, click on Delete under Actions.
4. In the pop-up, click Yes, delete application to confirm deletion.

---

## OAuth apps Audit Events

Audit Events can be viewed from Twilio Console under Monitor -> Insights -> Audit. There are 4 Audit Events related to OAuth apps:

- **oauth-apps.created:** This event is triggered when an oauth-app is created.
- **oauth-apps.updated:** This event is triggered every time an oauth-app is updated.
- **oauth-apps.deleted:** This event is triggered every time an oauth-app is deleted.
- **oauth-apps.secret-rotated:** This event is triggered every time the client secret of an OAuth app is rotated.

---

## Scopes/Permissions available with OAuth apps

> **Warning:** An OAuth app has a limit of 100 scopes/permissions that can be associated with it.

Each permission maps to one or more endpoints/actions for each API Resource.

Click on one of the product areas below to download a PDF of the permissions/endpoint actions:

- **Messaging Permissions**
- **Phone Numbers Permissions**
- **Studio Permissions**
- **TaskRouter Permissions**
- **Voice Permissions**
- **Lookup Permissions**
- **API keys Permissions**
- **Monitor Permissions**
- **Verify Permissions**
- **Event Streams Permissions**
- **Usage Records Permissions**