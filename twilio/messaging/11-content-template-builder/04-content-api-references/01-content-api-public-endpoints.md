# Content API public endpoints

> **Info**
> The Content API supports an unlimited number of content templates, but WhatsApp limits each account to 6,000 approved templates. Most of this page refers to v1 of the Content API. Content template search is available only in v2.

## Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| date_created | string\<date-time\> | Optional | Not PII | The date and time in GMT that the resource was created specified in RFC 2822 format. |
| date_updated | string\<date-time\> | Optional | Not PII | The date and time in GMT that the resource was last updated specified in RFC 2822 format. |
| sid | SID\<HX\> | Optional | Not PII | The unique string that that we created to identify the Content resource. Pattern: `^HX[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| account_sid | SID\<AC\> | Optional | Not PII | The SID of the Account that created Content resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| friendly_name | string | Optional | Not PII | A string name used to describe the Content resource. Not visible to the end recipient. |
| language | string | Optional | Not PII | Two-letter (ISO 639-1) language code (e.g., en) identifying the language the Content resource is in. |
| variables | object | Optional | Not PII | Defines the default placeholder values for variables included in the Content resource. e.g. `{"1": "Customer_Name"}`. |
| types | object | Optional | Not PII | The Content types (e.g. twilio/text) for this Content resource. |
| url | string\<uri\> | Optional | Not PII | The URL of the resource, relative to https://content.twilio.com. |
| links | object\<uri-map\> | Optional | Not PII | A list of links related to the Content resource, such as approval_fetch and approval_create |

---

## Create a Content API template

```
POST https://content.twilio.com/v1/Content
```

> **Info**
> Save the ContentSid returned in the API response. You will reference this SID whenever you send a message or perform other operations with the template.

### Example (C#)

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

---

## Edit a Content Template

You can edit a content template if you haven't submitted it for approval on WhatsApp. You don't need to create a new template as editing a content template doesn't change its content SID. Updates to a content template affect only future messages that use the template. Previously sent messages remain unchanged.

You can't edit content submitted for WhatsApp approval or change the language.

### Example (cURL)

```bash
curl -X PUT 'https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' \
-H 'Content-Type: application/json' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
-d '{
    "friendly_name": "card_elite_status",
    "variables": {
        "1": "coupon_code"
    },
    "types": {
        "twilio/card": {
                    "title": "Congratulations, you've reached Elite status! Add code {{1}} for 10% off.",
                    "subtitle": "To unsubscribe, reply Stop",
                    "actions": [
                        {
                            "url": "https://twilio.com/",
                            "title": "Order Now",
                            "type": "URL"
                        },
                        {
                            "phone": "+15551234567",
                            "title": "Call Us",
                            "type": "PHONE_NUMBER"
                        }
                    ]
                }
    }
}'
```

### Output

```json
{
    "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "date_created": "2025-11-20T17:27:31Z",
    "date_updated": "2025-11-20T17:29:51Z",
    "friendly_name": "card_elite_status",
    "language": "en",
    "links": {
        "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp",
        "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests"
    },
    "sid": "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "types": {
        "twilio/card": {
            "actions": [
                {
                    "chip_list": null,
                    "id": null,
                    "title": "Order Now",
                    "type": "URL",
                    "url": "https://twilio.com/",
                    "webview_size": "NONE"
                },
                {
                    "chip_list": null,
                    "phone": "+15551234567",
                    "title": "Call Us",
                    "type": "PHONE_NUMBER"
                }
            ],
            "body": null,
            "media": [],
            "orientation": "VERTICAL",
            "subtitle": "To unsubscribe, reply Stop",
            "title": "Congratulations, you've reached Elite status! Add code {{1}} for 10% off."
        }
    },
    "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "variables": {
        "1": "coupon_code"
    }
}
```

---

## Fetch information about templates

### Fetch a content resource

```
GET https://content.twilio.com/v1/Content/{ContentSid}
```

Retrieve a single Content API template.

#### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID\<HX\> | required | Not PII | The Twilio-provided string that uniquely identifies the Content resource to fetch. Pattern: `^HX[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

#### Example (Python)

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

content = client.content.v1.contents(
    "HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(content.date_created)
```

#### Response

```json
{
  "sid": "HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Some content",
  "language": "en",
  "variables": {
    "name": "foo"
  },
  "types": {
    "twilio/text": {
      "body": "Foo Bar Co is located at 39.7392, 104.9903"
    },
    "twilio/location": {
      "longitude": 104.9903,
      "latitude": 39.7392,
      "label": "Foo Bar Co"
    }
  },
  "url": "https://content.twilio.com/v1/Content/HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T19:00:00Z",
  "date_updated": "2015-07-30T19:00:00Z",
  "links": {
    "approval_create": "https://content.twilio.com/v1/Content/HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ApprovalRequests/whatsapp",
    "approval_fetch": "https://content.twilio.com/v1/Content/HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ApprovalRequests"
  }
}
```

---

## Template search (v2)

| Filter | Number of filters | Behavior |
|--------|-------------------|----------|
| Language | Multiple | Matches the template's language field. |
| ContentType | Multiple | Checks for the existence of one or more contenttype fields (for example, twilio/text). |
| ChannelEligibility | Multiple | Matches entries in the approval_content.channel.status field by using the {channel}:{template_status} format. |
| Content | Single | Case-insensitive search pattern that looks for matches in body, title, sub_title, friendly_name, and approval_content.channel.name. Maximum length: 1,024 characters or 30 words. The search returns documents that match all supplied terms in the given order. |
| ContentName | Single | Search pattern for friendly_name (template name) and approval_content.channel.name. Maximum length: 450 characters or 30 words. |
| DateCreatedBefore | Single | Upper bound for template creation time. Format: YYYY-MM-DDThh:mm:ssZ. |
| DateCreatedAfter | Single | Lower bound for template creation time. Format: YYYY-MM-DDThh:mm:ssZ. |
| DateCreatedBefore and DateCreatedAfter | Single | Specifies a date-time range for the search. Combine the two parameters as shown: `DateCreatedBefore=YYYY-MM-DDThh:mm:ssZ&DateCreatedAfter=YYYY-MM-DDThh:mm:ssZ`. |

```
GET "https://content.twilio.com/v2/Content?PageSize=100&Content=hello"
```

```
GET "https://content.twilio.com/v2/ContentAndApprovals?ChannelEligibility=whatsapp:unsubmitted&Language=en"
```

---

## Fetch all content resources

```
GET "https://content.twilio.com/v1/Content"
```

Retrieve all content templates. This endpoint supports pagination.

### Example (cURL)

```bash
curl -X GET "https://content.twilio.com/v1/Content"
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

### Output

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://content.twilio.com/v1/Content?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://content.twilio.com/v1/Content?PageSize=50&Page=0",
    "next_page_url": "https://content.twilio.com/v1/Content?PageSize=50&Page=1&PageToken=DNHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-1678723520",
    "key": "contents"
  },
  "contents": [
    {
      "language": "en",
      "date_updated": "2023-03-31T16:06:50Z",
      "variables": {
        "1": "07:00",
        "3": "owl.jpg",
        "2": "03/01/2023"
      },
      "friendly_name": "whatsappcard2",
      "account_sid": "ACXXXXXXXXXXXXXXX",
      "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "sid": "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "date_created": "2023-03-31T16:06:50Z",
      "types": {
        "twilio/card": {
          "body": null,
          "media": [
            "https://twilio.example.com/{{3}}"
          ],
          "subtitle": null,
          "actions": [
            {
              "index": 0,
              "type": "QUICK_REPLY",
              "id": "Stop",
              "title": "Stop Updates"
            }
          ],
          "title": "See you at {{1}} on {{2}}. Thank you."
        }
      },
      "links": {
        "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests",
        "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp"
      }
    },
    {
      "language": "en",
      "date_updated": "2023-03-31T15:50:24Z",
      "variables": {
        "1": "07:00",
        "2": "03/01/2023"
      },
      "friendly_name": "whatswppward_01234",
      "account_sid": "ACXXXXXXXXXXXXXXX",
      "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "sid": "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "date_created": "2023-03-31T15:50:24Z",
      "types": {
        "twilio/card": {
          "body": null,
          "media": [
            "https://twilio.example.com/owl.jpg"
          ],
          "subtitle": null,
          "actions": [
            {
              "index": 0,
              "type": "QUICK_REPLY",
              "id": "Stop",
              "title": "Stop Updates"
            }
          ],
          "title": "See you at {{1}} on {{2}}. Thank you."
        }
      },
      "links": {
        "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests",
        "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp"
      }
    }
  ]
}
```

---

## Fetch content and approvals

```
GET https://content.twilio.com/v1/ContentAndApprovals
```

Retrieve templates together with their approval status. The WhatsApp Flow publish status appears in the approvals object. Pagination is supported.

For details, see WhatsApp approval statuses.

### Example (Python)

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

content_and_approvals = client.content.v1.content_and_approvals.list(limit=20)

for record in content_and_approvals:
    print(record.date_created)
```

### Response

```json
{
  "contents": [],
  "meta": {
    "page": 0,
    "page_size": 10,
    "first_page_url": "https://content.twilio.com/v1/ContentAndApprovals?PageSize=10&Page=0",
    "previous_page_url": null,
    "next_page_url": null,
    "url": "https://content.twilio.com/v1/ContentAndApprovals?PageSize=10&Page=0",
    "key": "contents"
  }
}
```

---

## Fetch mapping between legacy WhatsApp and content templates

```
GET https://content.twilio.com/v1/LegacyContent
```

If your existing WhatsApp Business Account (WABA) templates were migrated to the Content API, this endpoint returns a mapping between the legacy templates and their corresponding ContentSid values, languages, and body text. Pagination is supported.

### Example (Python)

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

legacy_contents = client.content.v1.legacy_contents.list(limit=20)

for record in legacy_contents:
    print(record.date_created)
```

### Response

```json
{
  "contents": [],
  "meta": {
    "page": 0,
    "page_size": 10,
    "first_page_url": "https://content.twilio.com/v1/LegacyContent?PageSize=10&Page=0",
    "previous_page_url": null,
    "url": "https://content.twilio.com/v1/LegacyContent?PageSize=10&Page=0",
    "next_page_url": null,
    "key": "contents"
  }
}
```

---

## Pagination

For endpoints that support pagination, append these query parameters to the request URL:

- **PageSize** (recommended maximum: 500). The response is limited to 1 MB, which is roughly 500 templates.
- **PageToken**. Use the `meta.next_page_url` value from the previous response to request the next page. Supplying a page number (`page=`) is not supported.

---

## Delete a content template

```
DELETE https://content.twilio.com/v1/Content/{ContentSid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID\<HX\> | required | Not PII | The Twilio-provided string that uniquely identifies the Content resource to fetch. Pattern: `^HX[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Example (Python)

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.content.v1.contents("HXXXXXXXX").delete()
```

### Additional parameter for WhatsApp

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| deleteInWaba | Boolean | No | If the template was synchronized from WABA or legacy templates, set this parameter to true to delete the template both in Twilio and in the WABA. Set to false to delete the template only from Twilio. Default: false. |

---

## Submit templates for approval

### Submit a template approval for WhatsApp

> **Info**
> To send outbound messages to WhatsApp users, the template must be approved by WhatsApp. If a user initiates a conversation, a 24-hour messaging session starts, during which certain outbound content types can be sent without a template.
>
> To learn more about approval requirements and session limits, see the approval requirements chart.

Submit the template for WhatsApp review by sending a POST request that includes the parameters listed in the next tables. For best practices, see WhatsApp notification messages with templates. WhatsApp review usually finishes within one business day.

```
POST https://content.twilio.com/v1/Content/{ContentSid}/ApprovalRequests/WhatsApp
```

#### Path parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| ContentSid | string | Yes | SID of the content resource you want to submit for approval. |

#### Additional parameters required by WhatsApp

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | Yes | Unique name for the template. Accepts only lowercase alphanumeric characters and underscores. |
| category | enum | Yes | Template use-case category as defined by WhatsApp. Valid values: UTILITY, MARKETING, AUTHENTICATION |

### Example (cURL)

```bash
curl -X POST 'https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp' \
-H 'Content-Type: application/json' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
-d '{
  "name": "flight_replies",
  "category": "UTILITY"
}'
```

### Output

```json
{
  "category": "TRANSPORTATION_UPDATE",
  "status": "received",
  "rejection_reason": "",
  "name": "flight_replies",
  "content_type": "twilio/quick-reply"
}
```

---

## Fetch an approval status request

```
GET https://content.twilio.com/v1/Content/{ContentSid}/ApprovalRequests
```

For a list of possible status values, see WhatsApp template approval statuses. Flow status values are returned in the approvals object.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID\<HX\> | required | Not PII | The Twilio-provided string that uniquely identifies the Content resource whose approval information to fetch. Pattern: `^HX[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Example (Python)

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

approval_fetch = (
    client.content.v1.contents("HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .approval_fetch()
    .fetch()
)

print(approval_fetch.sid)
```

### Response

```json
{
  "sid": "HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "whatsapp": {
    "type": "whatsapp",
    "name": "tree_fiddy",
    "category": "UTILITY",
    "content_type": "twilio/location",
    "status": "approved",
    "rejection_reason": "",
    "allow_category_change": true
  },
  "url": "https://content.twilio.com/v1/Content/HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ApprovalRequests"
}
```

---

## Send a template

### Send a message with pre-configured content

```
POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages
```

Include the ContentSid in the POST body to send a message based on the template. If the template contains variables, pass them in the ContentVariables parameter.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID\<AC\> | required | Not PII | The SID of the Account creating the Message resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| to | string\<phone-number\> | required | PII MTL: 120 days | The recipient's phone number in E.164 format (for SMS/MMS) or channel address, e.g. whatsapp:+15552229999. |
| status_callback | string\<uri\> | Optional | Not PII | The URL of the endpoint to which Twilio sends Message status callback requests. URL must contain a valid hostname and underscores are not allowed. If you include this parameter with the messaging_service_sid, Twilio uses this URL instead of the Status Callback URL of the Messaging Service. |
| application_sid | SID\<AP\> | Optional | Not PII | The SID of the associated TwiML Application. Message status callback requests are sent to the TwiML App's message_status_callback URL. Note that the status_callback parameter of a request takes priority over the application_sid parameter; if both are included application_sid is ignored. Pattern: `^AP[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| max_price | number | Optional | Not PII | [OBSOLETE] This parameter will no longer have any effect as of 2024-06-03. |
| provide_feedback | boolean | Optional | Not PII | Boolean indicating whether or not you intend to provide delivery confirmation feedback to Twilio (used in conjunction with the Message Feedback subresource). Default value is false. |
| attempt | integer | Optional | Not PII | Total number of attempts made (including this request) to send the message regardless of the provider used |
| validity_period | integer | Optional | Not PII | The maximum length in seconds that the Message can remain in Twilio's outgoing message queue. If a queued Message exceeds the validity_period, the Message is not sent. Accepted values are integers from 1 to 36000. Default value is 36000. A validity_period greater than 5 is recommended. |
| force_delivery | boolean | Optional | Not PII | Reserved |
| content_retention | enum\<string\> | Optional | Not PII | Determines if the message content can be stored or redacted based on privacy settings. Possible values: retain, discard |
| address_retention | enum\<string\> | Optional | Not PII | Determines if the address can be stored or obfuscated based on privacy settings. Possible values: retain, obfuscate |
| smart_encoded | boolean | Optional | Not PII | Whether to detect Unicode characters that have a similar GSM-7 character and replace them. Can be: true or false. |
| persistent_action | array[string] | Optional | Not PII | Rich actions for non-SMS/MMS channels. Used for sending location in WhatsApp messages. |
| traffic_type | enum\<string\> | Optional | Not PII | Possible values: free |
| shorten_urls | boolean | Optional | Not PII | For Messaging Services with Link Shortening configured only: A Boolean indicating whether or not Twilio should shorten links in the body of the Message. Default value is false. If true, the messaging_service_sid parameter must also be provided. |
| schedule_type | enum\<string\> | Optional | Not PII | For Messaging Services only: Include this parameter with a value of fixed in conjuction with the send_time parameter in order to schedule a Message. Possible values: fixed |
| send_at | string\<date-time\> | Optional | Not PII | The time that Twilio will send the message. Must be in ISO 8601 format. |
| send_as_mms | boolean | Optional | Not PII | If set to true, Twilio delivers the message as a single MMS message, regardless of the presence of media. |
| content_variables | string | Optional | Not PII | For Content Editor/API only: Key-value pairs of Template variables and their substitution values. content_sid parameter must also be provided. If values are not defined in the content_variables parameter, the Template's default placeholder values are used. |
| risk_check | enum\<string\> | Optional | Not PII | Include this parameter with a value of disable to skip any kind of risk check on the respective message request. Possible values: enable, disable |
| from | string\<phone-number\> | required if MessagingServiceSid is not passed | PII MTL: 120 days | The sender's Twilio phone number (in E.164 format), alphanumeric sender ID, Wireless SIM, short code, or channel address (e.g., whatsapp:+15554449999). The value of the from parameter must be a sender that is hosted within Twilio and belongs to the Account creating the Message. If you are using messaging_service_sid, this parameter can be empty (Twilio assigns a from value from the Messaging Service's Sender Pool) or you can provide a specific sender from your Sender Pool. |
| messaging_service_sid | SID\<MG\> | required if From is not passed | Not PII | The SID of the Messaging Service you want to associate with the Message. When this parameter is provided and the from parameter is omitted, Twilio selects the optimal sender from the Messaging Service's Sender Pool. You may also provide a from parameter if you want to use a specific Sender from the Sender Pool. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| body | string | required if MediaUrl or ContentSid is not passed | PII MTL: 30 days | The text content of the outgoing message. Can be up to 1,600 characters in length. SMS only: If the body contains more than 160 GSM-7 characters (or 70 UCS-2 characters), the message is segmented and charged accordingly. |
| media_url | array[string\<uri\>] | required if Body or ContentSid is not passed | Not PII | The URL of media to include in the Message content. jpeg, jpg, gif, and png file types are fully supported by Twilio and content is formatted for delivery on destination devices. The media size limit is 5 MB for supported file types (jpeg, jpg, png, gif) and 500 KB for other types of accepted media. To send more than one image in the message, provide multiple media_url parameters in the POST request. You can include up to ten media_url parameters per message. |
| content_sid | SID\<HX\> | required if Body or MediaUrl is not passed | Not PII | For Content Editor/API only: The SID of the Content Template to be used with the Message, e.g., HXXXXXXXXXXXXXXXXXXXXXXXXXXXXX. If this parameter is not provided, a Content Template is not used. Find the SID in the Console on the Content Editor page. For Content API users, the SID is found in Twilio's response when creating the Template or by fetching your Templates. Pattern: `^HX[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Example (Python)

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
    from_="MGXXXXXXXXX",
    content_sid="HXXXXXXXX",
    content_variables=json.dumps(
        {"1": "YOUR_VARIABLE1", "2": "YOUR_VARIABLE2"}
    ),
    to="whatsapp:+18005551234",
)

print(message.sid)
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
  "from": "MGXXXXXXXXX",
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
  "to": "whatsapp:+18005551234",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

> **Warning**
> The From value must be a Messaging Service SID that contains a WhatsApp or Facebook Messenger sender.

---

## Send templates with status callbacks

You can configure a status callback URL for all messages in a Messaging Service or for a single outbound message by including the StatusCallback parameter.

```
-d "StatusCallback=https://example.com/callback"
```

For details, see monitor the status of your WhatsApp outbound message.

---

## Send messages scheduled ahead of time

You can schedule RCS, SMS, MMS, and WhatsApp messages to be sent at a fixed time.

```
--data-urlencode "SendAt=2023-11-30T20:36:27Z" \
--data-urlencode "ScheduleType=fixed" \
```

### Example (Python)

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from datetime import datetime
import json

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    messaging_service_sid="MGXXXXXXXXXXX",
    content_sid="HXXXXXXXXXXXXXXX",
    content_variables=json.dumps(
        {"1": "YOUR_VARIABLE1", "2": "YOUR_VARIABLE2"}
    ),
    to="whatsapp:+18005551234",
    schedule_type="fixed",
    send_at=datetime(2023, 11, 30, 20, 36, 27),
)

print(message.body)
```

### Response

```json
{
  "account_sid": "ACXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "Hello! 👍",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+14155552345",
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
  "to": "whatsapp:+18005551234",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

---

## Template status change alerts

Twilio returns specific error codes for Alarms, Rejected, and Paused WhatsApp templates. With Twilio Alarms, you can receive webhook or email notifications when these events occur. Alerts for approved templates are available as a beta feature.

For more information, see alerts for rejected and paused WhatsApp templates.