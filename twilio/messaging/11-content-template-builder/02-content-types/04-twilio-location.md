# twilio/location

The `twilio/location` content type allows you to send a location pin and an optional label, which you can use to enhance delivery notifications or provide location information to recipients.

> ℹ️ **Info**
> You can send location templates during an active 24-hour session with the recipient. You can't use them to initiate a **business-initiated session**.
> Location templates aren't supported for approval on WhatsApp and can't be submitted for approval.

## Supported channels

- WhatsApp

## Message preview

Expand image

## Data parameters

| Parameter | Type | Required | Variable support | Description |
|---|---|---|---|---|
| `longitude` | Number | Yes | No | The longitude value of the location pin to send. Value must be between -180.0 and +180.0. |
| `latitude` | Number | Yes | No | The latitude value of the location pin to send. Value must be between -90.0 and +90.0. |
| `label` | String | No | Yes | Label to be displayed to the recipient alongside the location pin. |

## Code examples and responses

### Create a location template

**C# / Java / curl**

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System; 
using Twilio; 
using Twilio.Rest.Content.V1; 

TwilioClient.Init(accountSid, authToken); 

// define the twilio/text 
var twilioText = new TwilioText.Builder(); 
twilioText.WithBody("Owl Air: Time to board, SFO is located at San Francisco International Airport, P.O. Box 8097, San Francisco, CA 94128 "); 

// define the twilio/location 
var twilioLocation = new TwilioLocation.Builder(); 
twilioLocation.WithLabel("Time to Board @ SFO"); 
twilioLocaiton.WithLatitude(37.62159755922449) 
twilioLocaiton.WithLongitude(-122.37888566473057) 

// define all the content types to be part of the template 
var types = new Types.Builder(); 
types.WithTwilioText(twilioText.Build()); 
types.WithTwilioLocation(twilioLocation.Build()); 

// build the create request object 
var contentCreateRequest = new ContentCreateRequest.Builder(); 
contentCreateRequest.WithTypes(types.Build()); 
contentCreateRequest.WithLanguage("en"); 
contentCreateRequest.WithFriendlyName("owl_air_location"); 

// create the twilio template 
var contentTemplate = await CreateAsync(contentCreateRequest.Build()); 
Console.WriteLine($"Created Twilio Content Template SID: {contentTemplate.Sid}");
```

### Output

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", 
  "date_created": "2022-08-29T15:23:12Z", 
  "date_updated": "2022-08-29T15:23:12Z", 
  "friendly_name": "owl_air_location", 
  "language": "en", 
  "links": { 
    "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp", 
    "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests" 
  }, 
  "sid": "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", 
  "types": { 
    "twilio/location": { 
      "label": "Time to Board @ SFO", 
      "latitude": 37.62159755922449, 
      "longitude": -122.37888566473057 
    }, 
    "twilio/text": { 
      "body": "Owl Air: Time to board, SFO is located at San Francisco International Airport, P.O. Box 8097, San Francisco, CA 94128 " 
    } 
  }, 
  "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", 
  "variables": {} 
}
```