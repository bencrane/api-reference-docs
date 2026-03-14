# REST API: Credentials

The Credentials API helps you manage Public Keys or Amazon Web Services (AWS) credentials in your Twilio account.

* Use public key credentials for **Public Key Client Validation**.
* Use AWS credentials to store Twilio Voice and Video recordings in AWS S3. Learn more about **storing Video recordings in AWS S3** and **storing Voice recordings in AWS S3 (blog)**.

## API Base URL

All URLs in the Credentials API reference documentation use the following base URL:

```
https://accounts.twilio.com/v1/Credentials
```

The API is served over HTTPS. To ensure data privacy, unencrypted HTTP isn't supported.

## Authentication

To authenticate requests to the Twilio APIs, Twilio supports **HTTP Basic authentication**. Use your API key as the username and your API key secret as the password. You can create an API key either **in the Twilio Console** or **using the API**.

> **Note:** Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth Token as the password. You can find your Account SID and Auth Token in the **Twilio Console**.

Learn more about **Twilio API authentication**.

```bash
curl -G https://accounts.twilio.com/v1/Credentials/PublicKeys \
  -u $TWILIO_API_KEY:$TWILIO_API_KEY_SECRET
```

## Twilio SDKs

To interact with the `Credentials` endpoints, consider using the **Twilio SDKs**.

## Resources

The Credentials API contains the following resources:

| Resource | Description |
|----------|-------------|
| **PublicKeys** | Manage user-provided public keys. |
| **AWS** | Manage user-provided AWS credentials. |