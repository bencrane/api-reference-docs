# Using Variables with Content Templates

## Creating Templates Using Variables in Content API

Variables can be used in all templates created with the Content Template Builder. Variables are supported across all channels.

- Variables can be numeric or non-numeric. Variable names can't have spaces.
  - Not allowed: `{{id name}}`
  - Allowed: `{{IdName}}`
- You can use a maximum of 100 variables.
- The variable key has a maximum length of 16 characters.
- The variable value has a maximum length of 1,600 characters but we recommend using less than 250 characters. Some fields have lower maximum characters and the variable maximum for those fields align with the field maximum.

## Variable formatting

In the code sample shown, the block of code below corresponds to variable samples and also the default variable definition. This is what your variables will fall back to when sending if variables aren't defined at time of send. URL path samples must resolve to a publicly hosted media/url sample.

```json
"variables": {
    "1": "coupon_code",
    "2": "docs",
    "3": "library-logo-resource2x.width-1000.png"
}
```

## Using Content Variables

```bash
curl -X POST 'https://content.twilio.com/v1/Content' \
-H 'Content-Type: application/json' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
-d '{
    "friendly_name": "Owl Air elite status card template",
    "language": "en",
    "variables": {
        "1": "coupon_code", 
        "2": "docs",
        "3": "library-logo-resource2x.width-1000.png"
    },
    "types": {
        "twilio/card": {
                    "title": "Congratulations, you've reached Elite status! Add code {{1}} for 10% off.",
                    "subtitle": "To unsubscribe, reply Stop",
                    "actions": [
                        {
                            "url": "https://twilio.com/{{2}}",
                            "title": "Order Online",
                            "type": "URL"
                        }
                    ],
                    "media": ["https://raw.githubusercontent.com/twilio-samples/api-snippets/refs/heads/main/_images/{{3}}"]
                },
        "twilio/text": {
            "body": "Congratulations, you've reached Elite status! Add code {{1}} for 10% off."
        }
    }
}'
```

### Output

```json
{
    "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "date_created": "2022-11-17T08:52:12Z",
    "date_updated": "2022-11-17T08:52:12Z",
    "friendly_name": "Owl Air elite status card template",
    "language": "en",
    "links": {
        "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp",
        "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests"
    },
    "sid": "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "types": {
        "twilio/card": {
            "actions": [
                {
                    "title": "Order Online",
                    "type": "URL",
                    "url": "https://owlair.example.com/{{2}}"
                }
            ],
            "body": null,
            "media": [
                "https://raw.githubusercontent.com/twilio-samples/api-snippets/refs/heads/main/_images/{{3}}"
            ],
            "subtitle": "To unsubscribe, reply Stop",
            "title": "Congratulations, you've reached Elite status! Add code {{1}} for 10% off."
        },
        "twilio/text": {
            "body": "Congratulations, you've reached Elite status! Add code {{1}} for 10% off."
        }
    },
    "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "variables": {
        "1": "coupon_code",
        "2": "docs",
        "3": "library-logo-resource2x.width-1000.png"
    }
}
```

## Creating Templates Using Variables in Content Template Builder in Console

To add a variable, you can either use the Add Variable button to add a variable at the end of the field's string, or you can manually type in a variable.

Variables added on templates where samples may be required will ask for samples and default variables. Samples may be required depending on the template type.

## Sending Templates Using Variables with Content Template Builder

Use the notation below at time of sending.

```json
"variables": {
    "1": "coupon_code",
    "2": "docs",
    "3": "library-logo-resource2x.width-1000.png"
}
```

## Sending with Content Variables

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
import json

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    content_sid="HXXXXXXXXXXX",
    to="+18581234567",
    from_="MGXXXXXXXXXX",
    content_variables=json.dumps(
        {
            "1": "coupon_code",
            "2": "docs",
            "3": "library-logo-resource2x.width-1000.png",
        }
    ),
)

print(message.body)
```

### Response

```json
{
  "account_sid": "ACXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "Hello! 👍",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "MGXXXXXXXXXX",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "+18581234567",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## WhatsApp Variable Rules

There are a few differing rules for variables sent in a WhatsApp user and business initiated session. For templates sent in session a few extra features are available.

- Quick reply templates can set variable titles.
- Since Lists are in-session only on WhatsApp, they can be fully configurable with Variables.

To send templates out of session through WhatsApp, follow these rules:

### Content variables in approved WhatsApp templates can't contain newlines.

### Content variables need to be in sequential order.
They can be in non-sequential order within a template, but variable definitions should not skip over integers. For example, Meta does not allow `{{1}} words {{3}}` but they allow `{{1}} words {{3}} words {{2}}`.

- **Not allowed:** `"body": "Hi {{1}}, Your flight will depart from gate {{3}}. Please reply Stop to unsubscribe."`
- **Allowed:** `"body": "Hi {{1}}, Your flight will depart from gate {{2}}. Please reply Stop to unsubscribe."`

### Content variables shouldn't be right next to each other.
Meta considers variables separated only by a space as next to each other. Additionally, there needs to be characters separated by a space between the variables.

- **Bad practice:** `"body": "Hi {{1}} {{2}}, flight will depart from gate {{3}}. Please reply Stop to unsubscribe."`
- **Best practice:** `"body": "Hi {{1}} and {{2}}, flight will depart from gate {{3}}. Please reply Stop to unsubscribe."`

### Content variables shouldn't start or end a body string without a sample.
Meta considers variables strings ending in a variable followed by punctuation as a variable at the end of a string. There will need to be extra text after the variable.

- **Bad practice:** `"body": "Hi {{1}}, flight will depart from gate {{2}}."`
- **Best practice:** `"body": "Hi {{1}}, flight will depart from gate {{2}}. Please reply Stop to unsubscribe."`

### Templates can't have too many variables relative to the message length.
As a general rule, for every 'x' variables, there must be 2x+1 non-variable words. Here, words are defined as characters separated by spaces. There is also a limit of 100 variables per template.

- **Not allowed:** `"body": "Hi {{1}}, gate {{2}}. Thank you."`
- **Allowed:** `"body": "Hi {{1}}, Your flight will depart from gate {{2}}. Thank you."`

### URL variable must be preceded with a slash.
WhatsApp fails URLs that do not contain a slash after the core domain as an invalid URL.