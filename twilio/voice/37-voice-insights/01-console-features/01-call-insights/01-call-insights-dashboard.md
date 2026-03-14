# Call Insights API Overview

The Call Insights REST API of **Voice Insights** provides programmatic access to call summaries, call metrics and call quality related events for use in your own applications and tools. Subject to regional availability, you can also use it for call annotations to capture subjective call experience details.

In order to use the resources in this REST API, **Advanced Features** has to be activated. You can use the **Voice Insights Settings Resource** for programmatic activation or perform it manually in Console.

## Base URL

Call Insights data is available under the following base URL. The REST API is served over HTTPS; unencrypted HTTP is not supported.

```
https://insights.twilio.com/v1/Voice/
```

## Authentication

To authenticate requests to the Twilio APIs, Twilio supports **HTTP Basic authentication**. Use your API key as the username and your API key secret as the password. You can create an API key either **in the Twilio Console** or **using the API**.

> **Note:** Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth token as the password. You can find your Account SID and Auth Token in the **Twilio Console**.

Learn more about **Twilio API authentication**.

```
curl -G https://insights.twilio.com/v1/Voice/[CALL SID]/Summary \
  -u $TWILIO_API_KEY:$TWILIO_API_KEY_SECRET
```

## Resources

The following resources are available in the Call Insights REST API.

| Resource | Description |
|----------|-------------|
| **Call Summary Resource** (single Call Summary) | Get a call summary for a single call. |
| **Call Summaries Resource** (list of Call Summaries) | Get a list of call summaries for multiple calls. |
| **Call Events Resource** | Get call progress and quality-related Voice SDK events data for a specific call. |
| **Call Metrics Resource** | Get quality-related metrics for a specific call. |
| **Call Annotations Resource** | Annotate calls to provide subjective experience details. Get the annotations for a specific call. |
| **Settings Resource** | Control Voice Insights Advanced Features and Voice Trace status for an account. |