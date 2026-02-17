# REOON - SINGLE EMAIL VERIFICATION - POWER MODE

## POWER MODE

Power mode checks everything just like the on-page verification of our website. However, the only downside is that this can take a few seconds to more than a minute to verify an email in depth based on the email provider's server response time.

### Advantages

- Verifies everything needed.
- Get all the information just like our on-page verification.
- Everything from the quick mode, except the verification time.

### Power Verification Mode Includes

- Email syntax validation.
- Disposable/temporary email check.
- MX validation and records.
- Domain email acceptance validation.
- Invalid email detection.
- Expired/invalid domain detection.
- Role account check.
- Check if the inbox is full or address disabled.
- Check if the individual email address exists.
- Check if the domain is catch-all.

---

## API Request Details

We use standard Rest-API formats. You can make a call (GET request) to our API using the following format.

### GET Request URL (HTTPS)

```
https://emailverifier.reoon.com/api/v1/verify?email=<email>&key=<key>&mode=power
```

| Parameter | Description |
|-----------|-------------|
| `email` | The email address you want to verify. i.e. jhon123@gmail.com |
| `key` | One of your API keys created above on this page. |
| `mode` | `"power"` (must be provided). |

In the URL above, replace the `<>` with your own data.

### Response (JSON)

```json
{
    "email": "jhon123@gmail.com",
    "status": "safe",
    "overall_score": 98,
    "username": "jhon123",
    "domain": "gmail.com",
    "is_safe_to_send": true,
    "is_valid_syntax": true,
    "is_disposable": false,
    "is_role_account": false,
    "can_connect_smtp": true,
    "has_inbox_full": false,
    "is_catch_all": false,
    "is_deliverable": true,
    "is_disabled": false,
    "is_spamtrap": false,
    "is_free_email": true,
    "mx_accepts_mail": true,
    "mx_records": [
        "alt3.gmail-smtp-in.l.google.com",
        "alt2.gmail-smtp-in.l.google.com",
        "alt4.gmail-smtp-in.l.google.com",
        "alt1.gmail-smtp-in.l.google.com",
        "gmail-smtp-in.l.google.com"
    ],
    "verification_mode": "power"
}
```

#### Status Values

| Status | Description |
|--------|-------------|
| `safe` | Email is safe to send |
| `invalid` | Email is invalid |
| `disabled` | Email address is disabled |
| `disposable` | Email is from a disposable/temporary provider |
| `inbox_full` | Recipient's inbox is full |
| `catch_all` | Domain accepts all emails (catch-all) |
| `role_account` | Email is a role account (e.g. info@, support@) |
| `spamtrap` | Email is a spam trap |
| `unknown` | Verification status could not be determined |

#### Additional Fields (vs Quick Mode)

| Field | Type | Description |
|-------|------|-------------|
| `overall_score` | integer | Deliverability score out of 100 |
| `is_safe_to_send` | boolean | Whether it is safe to send to this email |
| `can_connect_smtp` | boolean | Whether SMTP connection was successful |
| `has_inbox_full` | boolean | Whether the inbox is full |
| `is_catch_all` | boolean | Whether the domain is catch-all |
| `is_deliverable` | boolean | Whether the email is deliverable |
| `is_disabled` | boolean | Whether the email is disabled |

---

The API can be used in any programming language. Single API requests can also be directly tested in a browser.

Contact support if you do not understand anything.