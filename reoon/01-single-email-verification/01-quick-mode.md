# REOON - SINGLE EMAIL VERIFICATION - QUICK MODE

## API Endpoint: Single Email Verification

Do not use this endpoint for bulk email verification purposes. You should not verify continuously in more than 5 threads using this endpoint. This API endpoint is ideal for verifying email at its entry level. You can verify an email to check its validity before allowing it to enter your email database. This document contains the API documentation to be used by any programming language.

There are two verification modes available: the **QUICK** mode and the **POWER** mode.

---

## QUICK MODE

The QUICK mode allows the user to verify an email address extremely fast within 0.5 seconds. However, this mode does not support deep verification like the POWER mode. So individual inbox status will not be checked in this mode.

> **Important:** Quick Mode does not check individual inbox status. If the domain, syntax and a few other things are good, all emails including non-existing ones from that domain will be marked as valid in quick mode. Please use power mode if you need to check the status of individual inboxes.

### Advantages

- **Extremely fast verification:** Verify an email address in less than 0.5 seconds.
- Checks the most important things in the shortest time.
- Does not need to keep your user waiting.
- **Best for:** During user registration on your website. Prevent users from registering using temporary/disposable emails.

### Disadvantages

Deep verification and detailed information are less available compared to the POWER mode. Individual inbox status will not be checked in this mode.

### Quick Verification Mode Includes

- Email syntax validation.
- Disposable/temporary email check.
- MX validation and records.
- Domain email acceptance validation.
- Invalid email detection.
- Expired/invalid domain detection.
- Role account check.

---

## API Request Details

We use standard Rest-API formats. You can make a call (GET request) to our API using the following format.

### GET Request URL (HTTPS)

```
https://emailverifier.reoon.com/api/v1/verify?email=<email>&key=<key>&mode=quick
```

| Parameter | Description |
|-----------|-------------|
| `email` | The email address you want to verify. i.e. jhon123@gmail.com |
| `key` | One of your API keys created above on this page. |
| `mode` | `"quick"` (Default is `"quick"`, if not provided). |

In the URL above, replace the `<>` with your own data.

### Response (JSON)

```json
{
    "email": "jhon123@gmail.com",
    "status": "valid",
    "username": "jhon123",
    "domain": "gmail.com",
    "is_valid_syntax": true,
    "is_disposable": false,
    "is_role_account": false,
    "mx_accepts_mail": true,
    "is_spamtrap": false,
    "is_free_email": true,
    "mx_records": [
        "gmail-smtp-in.l.google.com",
        "alt1.gmail-smtp-in.l.google.com",
        "alt2.gmail-smtp-in.l.google.com",
        "alt3.gmail-smtp-in.l.google.com",
        "alt4.gmail-smtp-in.l.google.com"
    ],
    "verification_mode": "quick"
}
```

#### Status Values

| Status | Description |
|--------|-------------|
| `valid` | Email is valid |
| `invalid` | Email is invalid |
| `disposable` | Email is from a disposable/temporary provider |
| `spamtrap` | Email is a spam trap |