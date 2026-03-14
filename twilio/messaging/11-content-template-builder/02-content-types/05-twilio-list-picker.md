# twilio/list-picker

The twilio/list-picker content type includes a menu of up to 10 options for users to make a selection.

> ℹ️ **Info**
> List-picker templates are only available once the end user is in a 24 hour session. They can't initiate a business initiated session.
>
> List-picker templates aren't supported for approval on WhatsApp and can't be submitted for approval.

## Supported channels

- WhatsApp

## Message preview

Owl Air Flash Sale message with destination selection options for flights to NYC, Denver, and Chicago.

*Expand image*

## Data parameters

| Parameter | Type | Required | Variable support | Description |
|---|---|---|---|---|
| body | string | Yes | Yes | The text of the message you want to send. This is included as a regular text message. Maximum length: 1,024 characters |
| button | string | Yes | Yes | Display value for the primary button. |
| items | array | Yes | See items properties. | Array of list item objects. Minimum: 1 item. Maximum: 10 items |

### items properties

| Property | Type | Required | Variable support | Description |
|---|---|---|---|---|
| item | string | Yes | Yes | Display value for the item. Maximum length: 24 characters |
| id | string | Yes | Yes | Unique item identifier. Not visible to the recipient. Maximum length: 200 characters |
| description | string | Yes | Yes | Description of the item. Maximum length: 72 characters |

## Code examples and responses

### Create a list picker template

**C#**

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Content.V1;

TwilioClient.Init(accountSid, authToken);

// define the twilio/list-picker
var twilioListPicker = new TwilioListPicker.Builder();
twilioListPicker.WithBody("Owl Air Flash Sale! Hurry! Sale ends on {{1}}!");
var item1 = new ListPickerItems.Builder()
    .WithItem("SFO to NYC for $299")
    .WithDescription("Owl Air Flight 1337 to LGA")
    .WithId("SFO1337")
    .Build();
var item2 = new ListPickerItems.Builder()
    .WithItem("OAK to Denver for $149")
    .WithDescription("Owl Air Flight 5280 to DEN")
    .WithId("OAK5280")
    .Build();
var item3 = new ListPickerItems.Builder()
    .WithItem("LAX to Chicago for $199")
    .WithDescription("Owl Air Flight 96 to ORD")
    .WithId("LAX96")
    .Build();
twilioListPicker.WithItems(new List<ListPickerItems>() { item1, item2, item3 });

// define all the content types to be part of the template
var types = new Types.Builder();
types.WithTwilioListPicker(twilioListPicker.Build());

// build the create request object
var contentCreateRequest = new ContentCreateRequest.Builder();
contentCreateRequest.WithTypes(types.Build());
contentCreateRequest.WithLanguage("en");
contentCreateRequest.WithFriendlyName("owl_sale_list");
contentCreateRequest.WithVariables(new Dictionary<string, string>() { {"1", "end_date"} });

// create the twilio template
var contentTemplate = await CreateAsync(contentCreateRequest.Build());

Console.WriteLine($"Created Twilio Content Template SID: {contentTemplate.Sid}");
```

**Output**

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2022-08-29T15:46:11Z",
  "date_updated": "2022-08-29T15:46:11Z",
  "friendly_name": "owl_air_list",
  "language": "en",
  "links": {
    "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp",
    "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests"
  },
  "sid": "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "types": {
    "twilio/list-picker": {
      "body": "Owl Air Flash Sale! Hurry! Sale ends on {{1}}!",
      "button": "Select a destination",
      "items": [
        {
          "description": "Owl Air Flight 1337 to LGA",
          "id": "SFO1337",
          "item": "SFO to NYC for $299"
        },
        {
          "description": "Owl Air Flight 5280 to DEN",
          "id": "OAK5280",
          "item": "OAK to Denver for $149"
        },
        {
          "description": "Owl Air Flight 96 to ORD",
          "id": "LAX96",
          "item": "LAX to Chicago for $199"
        }
      ]
    },
    "twilio/text": {
      "body": "We have flights to the following destinations: (1) SFO, (2) OAK, (3) LAX. Hurry! Sale ends on {{1}}!"
    }
  },
  "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "variables": {
    "1": "end_date"
  }
}
```