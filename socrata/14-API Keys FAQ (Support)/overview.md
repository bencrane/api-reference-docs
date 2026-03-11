# API Keys FAQ (Support)

**Author:** Palmer
**Last Updated:** December 20, 2022 at 4:49 PM

> ⚠️ **Note:** This article is from December 20th, 2022 and may be outdated. Refer to the latest SODA3 documentation for the most current information.

---

Users of Data & Insights APIs now have more flexibility with the ability to authenticate using API Keys. API Keys are personal authentication credentials that you can create and pass in place of a username and password when using HTTP Basic Auth to perform API calls. Keys are owned by a single user and have identical rights, roles, and permissions to that user.

---

## Why use API Keys?

- Access Data & Insights APIs without the risk of embedding your username and password in scripts or code
- Users on domains that require SSO (and thus without passwords) can access Data & Insights APIs
- Create individual keys for different apps or jobs so that if any one needs to be revoked or rotated, other apps are unaffected
- Change your account password without disrupting apps or rotate API Keys without disrupting logins

---

## How do I create an API Key?

1. Navigate to your user profile, then click **Edit Profile**.
2. Navigate to the **Developer Settings** pane.
3. Click on **Create New API Key** and give it a name.
4. Upon clicking **Create**, you'll be shown a modal with your API Key ID and Key Secret. Make sure to copy the Key Secret — you won't be able to see it again!

---

## How do I delete an API Key?

You can delete API Keys from the **Actions** dropdown of the API Key table.

---

## How do I use my API Key(s)?

API Keys take the place of your username and password that you would use to sign in through the user interface, and that you are using if you manage any scripts or automations that require user authentication. When you create your API key, you will be provided with a `keyID` and `keySecret`, which are analogous to your username and password, respectively. In your script, simply replace your username with the `keyID` and password with the `keySecret`, and you're good to go.

---

## Are my API Keys tied only to the domain they were created on?

No, they are tied to your account. If you are a roled user on multiple domains, the same key(s) will work on all of them. Be aware that your role may be different from domain to domain, so your permissions on one domain might not allow you all of the same actions as they would on another domain.

---

## How many API Keys can I associate with an account?

You may have at most **100 API Keys** associated with your account.