# Application Tokens

The Socrata Open Data API uses application tokens for two purposes:

- Using an application token allows us to throttle by application, rather than via IP address, which gives you a higher throttling limit
- Authentication using OAuth

---

## Throttling Limits

Without an application token, we can only track usage and perform throttling based on a few simple criteria, mainly source IP address. As such, requests that aren't using an application token come from a shared pool via IP address. IP addresses that make too many requests during a given period may be subject to throttling.

When requests are made using an application token, we can actually attribute each request to a particular application and developer, granting each their own pool of API requests. Currently we do not throttle API requests that are using an application token, unless those requests are determined to be abusive or malicious.

We reserve the right to change these throttling limits with notice, and we will post an update to announce any such change.

If you are throttled for any reason, you will receive a status code `429` response.

> **Don't be a jerk!**
>
> Yes, I know it says you get unlimited requests. But keep in mind that you're using a shared platform, and you should still be deliberate in how you design your application to use our API. Applications that are determined to be abusive or malicious, or that otherwise monopolize the use of our API may be throttled.
>
> If we detect that your application is nearing the point where we may have to throttle it, we will likely pro-actively reach out to you to discuss how you can optimize your usage. If you have any questions, feel free to contact us and we'd be glad to help!

---

## Obtaining an Application Token

You can obtain an application token by registering for one in your Socrata profile.

---

## Using your Application Token

While it is possible to perform simple unauthenticated queries against the Socrata Open Data API without making use of an application token, you'll receive much higher throttling limits if you include an application token in your requests. If you elect not to use an application token, you'll be subjected to a much lower throttling limit for all requests originating from your IP address.

Here's how you include the application token in the request:

| SODA Version | Method |
|---|---|
| 3.0, 2.x | Use the `X-App-Token` HTTP header. |
| 2.1, 2.0 | Use the `$$app_token` parameter in your request. |
| 1.0 | Use the `app_token` parameter in your request. |

Using the header is the preferred method.

> **Note:** Application tokens are not necessarily used for authentication, but you should still preserve the security of your application token by always using `HTTPS` requests. If your application token is duplicated by another developer, their requests will count against your quota.

The following is an example of using the `X-App-Token` HTTP header to pass an application token:

```http
POST /api/v3/views/kzjm-xkqj/query.json HTTP/1.1
Host: data.seattle.gov
Accept: application/json
X-App-Token: [REDACTED]
```

---

## Using the Application Token as Part of the OAuth 2.0 Authentication Process

Application tokens can also be used for authentication using OAuth 2.0. For more information, see the authentication section.