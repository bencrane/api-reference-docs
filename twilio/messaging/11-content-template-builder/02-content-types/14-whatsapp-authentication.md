# whatsapp/authentication

The whatsapp/authentication content type allows companies to deliver a WhatsApp-approved one-time password button. Unlike other templates, the body is preset by WhatsApp. Some modifications can be made by specifying certain parameters. However, custom authentication templates aren't allowed.

> ℹ️ **Info**
> When sending whatsapp/authentication content templates, a single variable must be defined at send time and set to the one-time passcode.
>
> whatsapp/authentication content templates must be approved by WhatsApp before they can be sent to customers.

## Supported channels

- WhatsApp

## Message preview

WhatsApp message with verification code 1234, expires in 40 minutes.

*Expand image*

## Data parameters

| Parameter | Type | Required | Variable support | Description |
|---|---|---|---|---|
| add_security_recommendation | Boolean | No | No | Optional field to add the message "For your security, do not share this code" or the translated language's equivalent. This field defaults to TRUE. |
| code_expiration_minutes | integer | No | No | The amount of time you want to inform the customer that the one-time passcode is available for. Adds a footer message stating "This code expires in x minutes," where x is the number specified. Only whole numbers from 1–90 are allowed. |
| actions | array | Yes | No | Buttons that recipients can tap on to act on the message. |

### actions properties

To learn more about the actions parameter, see common components.

| Property | Parameters |
|---|---|
| COPY_CODE | `type`: COPY_CODE; `copy_code_text`: Must be specified. Meta will use approved localized wording. |

## Code examples and responses

### Create a WhatsApp OTP button template

**C#**

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Content.V1;

TwilioClient.Init(accountSid, authToken);

// define the whatsapp/authentication type
var whatsappAuthentication = new WhatsappAuthentication.Builder();
var auth1 = new WhatsappAuthAction.Builder()
    .WithType(WhatsappAuthActionType.CopyCode)
    .WithCopyCodeText("Check Flight Status")
    .Build();
whatsappAuthentication.WithActions(new List<WhatsappAuthAction>() { auth1 });

// define all the content types to be part of the template
var types = new Types.Builder();
types.WithWhatsappAuthentication(whatsappAuthentication.Build());

// build the create request object
var contentCreateRequest = new ContentCreateRequest.Builder();
contentCreateRequest.WithTypes(types.Build());
contentCreateRequest.WithLanguage("en");
contentCreateRequest.WithFriendlyName("whatsapp_otp");

// create the twilio template
var contentTemplate = await CreateAsync(contentCreateRequest.Build());

Console.WriteLine($"Created Twilio Content Template SID: {contentTemplate.Sid}");
```

**Output**

```json
{
    "account_sid": "$TWILIO_ACCOUNT_SID",
    "date_created": "2023-06-02T14:34:25Z",
    "date_updated": "2023-06-02T14:34:25Z",
    "friendly_name": "whatsapp_otp",
    "language": "en",
    "links": {
        "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp",
        "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests"
    },
    "sid": "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "types": {
        "whatsapp/authentication": {
            "actions": [
                {
                    "copy_code_text": "Copy verification code",
                    "type": "COPY_CODE"
                }
            ],
            "add_security_recommendation": true,
            "body": "{{1}}",
            "code_expiration_minutes": 30
        }
    },
    "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "variables": {}
}
```

## How to send different types of WhatsApp Authentication Templates

### Copy code

Copy code is the default authentication template. Copy code templates include a button that copies an OTP code to the user's clipboard.

1. Create the whatsapp/authentication template.
2. Follow the steps to send the template.

## Send WhatsApp authentication templates created with content templates

Authentication templates are slightly different from other content types in that the body field is preset and there is a pre-existing content variable.

To send these templates, you will need to send them as usual, but include a content variable containing the one-time password (OTP) you would like to send.

The OTP that you send must be fewer than 15 characters long.

```
--data-urlencode "ContentVariables={"1": "12345"}" \
```

### Sending WhatsApp authentication templates

**Python**

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
    content_sid="HXXXXXXXXXX",
    content_variables=json.dumps({"1": "123456"}),
    messaging_service_sid="MGXXXXXXXXXXX",
    from_="whatsapp:+18551234568",
    to="whatsapp:+18551234567",
)

print(message.body)
```

**Response**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "body": "Hello! 👍",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "whatsapp:+18551234568",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MGXXXXXXXXXXX",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "whatsapp:+18551234567",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```