# twilio/call-to-action

The twilio/call-to-action buttons let recipients tap to trigger actions such as launching a website, copying a coupon code, or making a phone call.

If you are using a URL button and want to submit the content template for WhatsApp approval, the URL must resolve to a publicly accessible website. If there is a variable, a valid path sample should be included in the variables array. The combined URL should resolve to a publicly accessible website.

For example, `"url": ["https://www.twilio.com/{{1}}"]` would include a path sample in the variables definition: `"variables": {"1": "docs"}`.

> ⚠️ **Warning**
> Twilio/call-to-action content templates can be sent via WhatsApp for out of session messages with variables. If the content template's body starts or ends with a variable, it won't be approved by WhatsApp. The same applies if two variables are placed next to each other. A sample variable is required. For additional information about variables, see Using Variables with Content Templates.

## Supported channels

- WhatsApp
- Facebook Messenger

## Channels specific information

### WhatsApp

- VOICE_CALL and VOICE_CALL_REQUEST are currently a private beta feature in select regions.
- If the content template is being sent in session over WhatsApp without approval, only three buttons are allowed.
- On WhatsApp, a card must be approved as a content template before it can be sent. Additional approval steps are required if you use variables with twilio/card. A valid media sample is required if a twilio/card content template is created with media and/or variables and you plan to submit this template to WhatsApp for approval. Static media URLs should resolve to publicly hosted media files. Variable media URLs should include a valid media URL suffix in the variable declaration.
- Each approved variable WhatsApp card template can include only one type of media. WhatsApp classifies approved templates into 1 of 3 types of media headers (Image, Video, Document) based on the sample that was submitted. Once the template has been approved another type of media header can't be sent using the template.
- For example, if a content template is approved with an image, you can't send a video using that same content template.
- If the content template's body starts or ends with a variable or has two variables next to each other, the content template won't be approved by WhatsApp without a sample variable. For additional information about variables, see Using Variables with Content Templates.
- When creating your content template, ensure that the phone number in the actions array below is valid. Otherwise, the content template will fail to send.
- WhatsApp footers translate to subtitles in twilio/cards.
- If your template contains more than one button, you must submit it for approval.
- For unapproved cards used during a session, the following rules apply:
  - Only the buttons types QUICK_REPLY, URL, VOICE_CALL_REQUEST and VOICE_CALL are supported. Templates that include a PHONE_NUMBER button type are not supported.
  - If you send a Content resource that contains buttons with different action types within a session in an unapproved template, the request fails. WhatsApp requires every button in an in session message to use the same action type. For example, an unapproved template that includes both a voice_call button and a url button fails validation.
  - There can only be one URL button in the Content. For example, a Content with two URL buttons will fail.

## Message preview

Owl Air flight details with links to check flight status and weather.

Expand image

## Data parameters

| Parameter | Type | Required | Variable support | Description |
|---|---|---|---|---|
| body | string | Yes | Yes | The text of the message you want to send. This is included as a regular text message. Maximum length: 640 characters |
| actions | array | Yes | Yes | Call to action content templates support URL, PHONE, COPY_CODE, and VOICE_CALL buttons. |

## actions properties

To learn more about see [common components], see common components.

> ℹ️ **Info**
> Limitations:
> - Only one of the two call options can be on a content template:
>   - PHONE
>   - VOICE_CALL
> - Up to two URL buttons are allowed.
> - Up to five quick reply buttons are allowed.

| Property | Supported channels | Parameters |
|---|---|---|
| URL | WhatsApp, Facebook Messenger | `type`: URL<br>`title`: Button text of URL redirect button. Variables aren't supported. Maximum length: 20 characters<br>`url`: URL opened when the user clicks the button. Variables are supported at the end of the URL string. |
| PHONE | WhatsApp, Facebook Messenger | `type`: PHONE<br>`title`: Button text of URL redirect button. Variables aren't supported. Maximum length: 20 characters<br>`phone`: E.164 formatted phone number to call when the recipient taps the button. Variables aren't supported. |
| VOICE_CALL | WhatsApp | `type`: VOICE_CALL<br>`title`: Button text of VoIP call button. Variables aren't supported. Maximum length: 20 characters<br>`ttl_minutes`: Optional parameter. The lifespan of the button in minutes. After this time expires, the button can't be used to start a call to the business. You can use variables. The default is 10,080 minutes (7 days). The expected value is an integer between 1 and 43,200 minutes (30 days). |
| VOICE_CALL_REQUEST | WhatsApp | `type`: VOICE_CALL_REQUEST |
| COPY_CODE | WhatsApp | `type`: COPY_CODE<br>`title`: Button text of copy code button. Variables aren't supported. Maximum length: 20 characters<br>`code`: Coupon code that is copied to end user clipboard after clicking button. Variables are supported. |

## Code examples and responses

### Create a Call-To-Action template

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Content.V1;

TwilioClient.Init(accountSid, authToken);

// define the twilio/call-to-action type
var twilioCallToAction = new TwilioCallToAction.Builder();
twilioCallToAction.WithBody("Owl Air: We will see you soon! Flight {{1}} to {{2}} departs at {{3}} from Gate {{4}}.");
var cta1 = new CallToAction.Builder()
    .WithType(CallToActionActionType.Url)
    .WithUrl("https://owlair.com/{{5}}")
    .WithTitle("Check Flight Status")
    .Build();
var cta2 = new CallToAction.Builder()
    .WithType(CallToActionActionType.PhoneNumber)
    .WithPhone("+15555551234")
    .WithTitle("Call Support")
    .Build();
twilioCallToAction.WithActions(new List<CallToAction>() { cta1, cta2 });

// define all the content types to be part of the template
var types = new Types.Builder();
types.WithTwilioCallToAction(twilioCallToAction.Build());

// build the create request object
var contentCreateRequest = new ContentCreateRequest.Builder();
contentCreateRequest.WithTypes(types.Build());
contentCreateRequest.WithLanguage("en");
contentCreateRequest.WithFriendlyName("owl_air_cta");
contentCreateRequest.WithVariables(new Dictionary<string, string>() { {"1", "flight_number"}, {"2", "arrival_city"}, {"3", "departure_time"}, {"4", "gate_number"}, {"5", "url_suffix"} });

// create the twilio template
var contentTemplate = await CreateAsync(contentCreateRequest.Build());

Console.WriteLine($"Created Twilio Content Template SID: {contentTemplate.Sid}");
```

### Output

```json
{
    "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "date_created": "2022-01-15T17:09:58Z",
    "date_updated": "2022-01-15T17:09:58Z",
    "friendly_name": "owl_air_cta",
    "language": "en",
    "links": {
        "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests",
        "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp"
    },
    "sid": "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "types": {
        "twilio/call-to-action": {
            "actions": [
                {
                    "url": "https://owlair.com/{{5}}",
                    "type": "URL",
                    "title": "Check Flight Status"
                },
                {
                    "phone_number": "+15555551234",
                    "type": "PHONE_NUMBER",
                    "title": "Call Support"
                }
            ],
            "body": "Owl Air: We will see you soon! Flight {{1}} to {{2}} departs at {{3}} from Gate {{4}}."
        }
    },
    "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "variables": {
        "1": "flight_number",
        "3": "departure_time",
        "2": "arrival_city",
        "5": "url_suffix",
        "4": "gate_number"
    }
}
```