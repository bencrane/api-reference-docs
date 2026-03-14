# Conference Insights API Overview

The Conference Insights REST API of the **Voice Insights** feature provides programmatic access to conference summaries and conference participant summaries for use in your own applications and tools.

## Base URL

Conference Insights data is available under the following base URL. The REST API is served over HTTPS; unencrypted HTTP is not supported.

```
https://insights.twilio.com/v1/Conferences/
```

## Authentication

To authenticate requests to the Twilio APIs, Twilio supports **HTTP Basic authentication**. Use your API key as the username and your API key secret as the password. You can create an API key either **in the Twilio Console** or **using the API**.

> **Note:** Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth Token as the password. You can find your Account SID and Auth Token in the **Twilio Console**.

Learn more about **Twilio API authentication**.

```bash
curl -G https://insights.twilio.com/v1/Conferences/{Conference_SID} \
  -u $TWILIO_API_KEY:$TWILIO_API_KEY_SECRET
```

## Resources

The following resources are available in the Conference Insights REST API.

| Resource | Description |
|----------|-------------|
| **Conference Summary Resource** | Get conference summaries with events and metadata. |
| **Conference Participant Summary Resource** | Get conference participant summaries with events and metadata for individual participants. |