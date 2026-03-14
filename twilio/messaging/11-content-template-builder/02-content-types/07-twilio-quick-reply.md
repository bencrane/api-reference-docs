# twilio/quick-reply

The twilio/quick-reply content type lets recipients tap, rather than type, to respond to a message. You can include up to ten quick-reply buttons. When you send an in-session WhatsApp message that does not require template approval, only three buttons are allowed.

> ⚠️ **Warning**
> twilio/quick-reply content templates can be sent over WhatsApp for out-of-session messages that include variables. If the template body starts or ends with a variable, or if two variables appear adjacent to each other, WhatsApp will reject the template. A sample value for each variable is required. For details, see Using Variables with Content Templates.

## Supported channels

- WhatsApp
- Facebook Messenger

## Message preview

Chat options: Check Flight Status, Check Gate Number, Speak with an Agent.

Expand image

Chat from Owl Air Support offering options to check flight status, gate number, or see all options.

Expand image

Menu with options for flight status, gate number, agent contact, and weather at DEP and ARR.

Expand image

## Data parameters

| Parameter | Type | Required | Variable support | Description |
|---|---|---|---|---|
| body | string | Yes | Yes | Text that appears above the quick-reply buttons. Maximum length: 1,024 characters. |
| actions | array | Yes | Yes | An array that contains between 1 and 10 quick-reply buttons. |

## actions properties

For an overview of shared properties, see Common components.

| Property | Supported channels | Parameters |
|---|---|---|
| QUICK_REPLY | WhatsApp, Facebook Messenger | `title`: Text that appears on the button. The same text is returned in the inbound Body and ButtonText fields when the end user selects the button. Variables are supported for in-session messages. Maximum length: 20 characters.<br>`id`: A developer-defined payload that is not visible to the end user. The value is returned in the inbound ButtonPayload field when the end user selects the button. Variables are supported. Maximum length: 200 characters. |

## Code examples and responses

### Create a quick-reply template

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Content.V1;

TwilioClient.Init(accountSid, authToken);

// define the twilio/text type for less rich channels (e.g. SMS)
var twilioText = new TwilioText.Builder();
twilioText.WithBody("Hi {{1}}.  Thanks for contacting Owl Air Support. How can we help?");

// define the twilio/quick-reply type for more rich channels
var twilioQuickReply = new TwilioQuickReply.Builder();
twilioQuickReply.WithBody("Owl Air Support");
var quickreply1 = new QuickReplyAction.Builder()
    .WithTitle("Contact Us")
    .WithId("flightid1")
    .Build();
var quickreply2 = new QuickReplyAction.Builder()
    .WithTitle("Check gate number")
    .WithId("gateid1")
    .Build();
var quickreply3 = new QuickReplyAction.Builder()
    .WithTitle("Speak with an agent")
    .WithId("agentid1")
    .Build();
twilioQuickReply.WithActions(new List<QuickReplyAction>() { quickreply1, quickreply2, quickreply3 });

// define all the content types to be part of the template
var types = new Types.Builder();
types.WithTwilioText(twilioText.Build());
types.WithTwilioQuickReply(twilioQuickReply.Build());

// build the create request object
var contentCreateRequest = new ContentCreateRequest.Builder();
contentCreateRequest.WithTypes(types.Build());
contentCreateRequest.WithLanguage("en");
contentCreateRequest.WithFriendlyName("owl_air_qr");
contentCreateRequest.WithVariables(new Dictionary<string, string>() { {"1", "John"} });

// create the twilio template
var contentTemplate = await CreateAsync(contentCreateRequest.Build());

Console.WriteLine($"Created Twilio Content Template SID: {contentTemplate.Sid}");
```

### Output

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2022-08-29T10:43:20Z",
  "date_updated": "2022-08-29T10:43:20Z",
  "friendly_name": "owl_air_qr",
  "language": "en",
  "links": {
    "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp",
    "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests"
  },
  "sid": "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "types": {
    "twilio/text": {
      "body": "Hi, {{ 1 }}. \n Thanks for contacting Owl Air Support. How can I help?."
    },
    "twilio/quick-reply": {
      "body": "Hi, {{ 1 }}. \n Thanks for contacting Owl Air Support. How can I help?",
      "actions": [
        {
          "id": "flightid1",
          "title": "Check flight status"
        },
        {
          "id": "gateid1",
          "title": "Check gate number"
        },
        {
          "id": "agentid1",
          "title": "Speak with an agent"
        }
      ]
    }
  },
  "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "variables": {
    "1": "Owl Air Customer"
  }
}
```