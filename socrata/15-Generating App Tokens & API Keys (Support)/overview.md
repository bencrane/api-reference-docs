# Generating App Tokens & API Keys (Support)

**Author:** Charlotte
**Last Updated:** October 17, 2025 at 3:23 PM

---

## What is an App Token?

An Application Token is an alphanumeric string that authorizes you to create an application. App tokens can be used as part of the authentication process to perform read operations through the API. Data & Insights users can leverage the app tokens to reach out to users in case their application is causing too many calls per unit time, and they need to be throttled.

## What is an API Key?

API Keys can be used to perform read, write, and delete operations through the API. These operations will be available to each user according to their role on the domain they are accessing. See also: [https://dev.socrata.com/docs/other/api-keys](https://dev.socrata.com/docs/other/api-keys#?route=overview).

An API Key comes with a secret key, which together serve as a proxy for a user's username and password. (Keep track of the secret key shown when you first get it, because it will not be shown again.) The advantage to using API Key + Secret Key is that it allows a user to authenticate without showing their username, and it will not change as the user's Data & Insights password changes.

---

## Obtaining App Tokens and API Keys

1. Start by logging into your Data & Insights account on any Data & Insights domain — you can use `evergreen.data.socrata.com`, for example.
2. Navigate to the **Developer Settings** section of the menu.
3. That will give you the option to edit your profile, account settings, and **Developer Settings** — which is what we are looking for regarding API keys and app tokens.
4. Click **Create New App Token**, then fill in the sections for **Name** and **Description**. For example, if you will be using this token to authorize automated DataSync updates, you could call the app token "Your Name - DataSync token" and as a description enter "App token used for updating datasets on 'x' domain".

> **Please note:** Your Application Name must be unique across all registered applications on all Data & Insights domains.

### For DataSync Users

You do not need to enter a Callback Prefix for the purpose of updating data via DataSync. Once your app token is generated, you can copy and paste it into the authentication details in DataSync. Once you've filled this field in, DataSync will remember it each time you open the program on your computer.

You can read more about the creation and use of App Tokens on the dev site at [https://dev.socrata.com/docs/app-tokens.html](https://dev.socrata.com/docs/app-tokens.html).