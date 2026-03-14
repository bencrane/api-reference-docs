# twilio/media

The twilio/media content type allows you to send file attachments, or to send long text via MMS in the US and Canada. As such, the twilio/media type must contain at least one of text or media content. The total size of the text and media attachments must be less than 5MB (16MB for WhatsApp).

> ℹ️ **Info**
> If you plan to submit this content template to WhatsApp for approval, a valid media sample is required. Static media urls should resolve to publicly hosted media files. Variable media urls should include a valid media URL suffix in the variable declaration.
>
> Only one type of media can be sent per approved variable WhatsApp media template. WhatsApp classifies approved templates into 1 of 3 types of media headers (Image, Video, Document) based on the sample that was submitted. Once the content template has been approved another type of media header can't be sent using the template.
>
> For example, if a content template is approved with an image, a video cannot be sent using the same content template.
>
> During a 24-hour user-initiated session, content template approval is not required by WhatsApp for twilio/media content templates.
>
> For out of session (business-initiated) media templates, an additional approval step is required during the Beta. In the Media field of the content template you create, provide the URL of the publicly hosted file.
>
> If you are using a media template with a variable, please submit a sample path of a publicly hosted image URL in the variable array. The combined URL must contain the file type and must resolve to a publicly hosted file.
>
> For example, `"media": ["https://www.example.com/{{1}}"]` would include a path sample in the variables definition: `"variables": {"1": "images/library-logo-resource2x.width-1000.png"}`

> ⚠️ **Warning**
> The twilio/media content templates can be sent via WhatsApp for out of session messages with variables. If the content template's body starts or ends with a variable, it won't be approved by WhatsApp. The same applies if two variables are placed next to each other. A sample variable is required. For additional information about variables, see Using Variables with Content Templates.

## Supported channels

- MMS
- RCS
- WhatsApp
- Facebook Messenger

## Message preview

Twilio logo with message: Thank you for your order OrderNumber.

*Expand image*

## Data parameters

| Parameter | Type | Required | Variable support | Description |
|---|---|---|---|---|
| body | string | Only required to get content template approved by WhatsApp. | Yes | The text of the message you want to send. Maximum length: 1,600 characters. Each variable counts as one character at content creation time. |
| media | string[] | Yes | Yes | The URL of the media you want to send. Variables are only supported after the domain. For example: `www.twilio.com/images/{{1}}`. You can find the supported and accepted media types on Accepted Content Types for Media. |

## Code examples and responses

### Create a media template

**C#**

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Content.V1;

TwilioClient.Init(accountSid, authToken);

// define the twilio/media type 
var twilioMedia = new TwilioMedia.Builder();
twilioMedia.WithBody("Thank you for your order {{1}}");
var media1 = new Media.Builder()
    .WithMedia("https://raw.githubusercontent.com/twilio-samples/api-snippets/refs/heads/main/_images/library-logo-resource2x.width-1000.png")
    .Build();
twilioMedia.WithMedia(new List<Media>() { media1 });

// define all the content types to be part of the template
var types = new Types.Builder();
types.WithTwilioMedia(twilioMedia.Build());

// build the create request object
var contentCreateRequest = new ContentCreateRequest.Builder();
contentCreateRequest.WithTypes(types.Build());
contentCreateRequest.WithLanguage("en");
contentCreateRequest.WithFriendlyName("media_template");
contentCreateRequest.WithVariables(new Dictionary<string, string>() { {"1", "OrderNumber"} });

// create the twilio template
var contentTemplate = await CreateAsync(contentCreateRequest.Build());

Console.WriteLine($"Created Twilio Content Template SID: {contentTemplate.Sid}");
```

**Output**

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2022-08-29T15:12:22Z",
  "date_updated": "2022-08-29T15:12:22Z",
  "friendly_name": "media_template",
  "language": "en",
  "links": {
    "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp",
    "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests"
  },
  "sid": "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "types": {
    "twilio/media": {
      "body": "Thank you for your order {{1}}",
      "media": [
        "https://raw.githubusercontent.com/twilio-samples/api-snippets/refs/heads/main/_images/library-logo-resource2x.width-1000.png"
      ]
    }
  },
  "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "variables": {
    "1": "OrderNumber"
  }
}
```