# whatsapp/flows

## Overview

Flows allow you to create an in-app, multi-screen experience that a user receives and submits all within WhatsApp.

A business sends a Flow as part of an approved Content Template. The templated message contains a button to open the attached Flow in the WhatsApp UI. Within the Flow, you can include text, images, and several input components. End users respond with single-choice, multi-choice, toggle, short-text, long-text, and date-picker inputs.

## whatsapp/flows versus twilio/flows

If you build your Flows in WhatsApp, use Flows outside of an approved template, or use endpoint functionality, you'll need to use the whatsapp/flows content type. To do this, create your Flows in the Meta UI and send using the Twilio Content API. Compare with twilio/flows that you create with the Twilio Content Template Builder.

> ⚠️ **Warning**
> **Flows limitations**
> Flows aren't designed to transmit HIPAA Eligible Service or PCI data. Don't use them in workflows that require HIPAA or PCI compliance.
>
> If you need to transmit sensitive information, use Message Redaction. Message Redaction isn't yet compatible with Studio, Proxy Service, or Functions. Don't send Flows that contain sensitive information through these products or services.

## Supported options for end users

- Send a multi-screen form that includes several questions.
- Collect text input, selections, and picker answers.
- Include images, links, and clarifying text on each screen.
- Send Flows with any component that WhatsApp supports.
- Send Flows with an endpoint integration to pass data between your back-end services and WhatsApp during the interaction.

## Supported channel

- WhatsApp

## Message preview

Twilio Demo chat showing a response with a helpful link and notification.

*Expand image*

Survey form with questions on finding method and favorite number, includes options and a complete button.

*Expand image*

## Create a Flow with Meta

To create Flows with Meta, you'll need the following:

- A WhatsApp sender through Twilio
- A WhatsApp Business Account (WABA)

You can create a Flow with the WhatsApp Manager UI or programmatically with Meta's Flow API.

**Tip:** Use the Flow playground in the Meta developer docs to preview and configure your Flow. You can copy the JSON for use with either the WhatsApp Manager UI or the the Flows API below.

### WhatsApp Manager

1. Follow the steps to open WhatsApp Manager.
2. In the Account Tools menu, click Flows.
3. Click Create Flow.
4. Follow the steps to create a new Flow. Record the id of the first screen that you want to display.
5. To publish your new Flow, click Publish.
6. In the Account Tools menu, click Flows.
7. Copy the Flow ID of the Flow that you've just created.

## Attach a Flow to a whatsapp/flows Content Template

To send a Flow that you made with Meta, you need to create a whatsapp/flows Content Template with the Flow's ID using the Twilio Content API.

From the creation steps above, ensure you've recorded the following values:

- The unique ID of the Flow
- The ID of the first screen (page) of the Flow

You'll need these for the call to the Content API to create the whatsapp/flow Content Template.

## Data parameters

Your call to the Content API must contain the following parameters to create a whatsapp/flows Content Template.

| Parameter | Type | Required | Variable support | Description |
|---|---|---|---|---|
| body | string | Yes | Yes | Text of the templated message that launches the Flow. Maximum length: 1,024 characters |
| subtitle | string | No | No | Optional subtitle shown in the message footer. Maximum length: 80 characters |
| media_url | string | No | Yes | Media included in the initial Flow message. Supports .png, .jpeg, .mp4, and .pdf. The domain must be static; the path can be a variable. |
| flow_id | string | Yes | No (approved templates) Yes (in-session without approval) | Identifier for the Flow in WhatsApp. |
| flow_token | string | No | Yes (must be a variable) | Unique identifier for the specific Flow interaction. Provide a new value for each send request. |
| flow_first_page_id | string | No | No | Identifier of the first page to display in the Flow interaction. |
| is_flow_first_page_endpoint | Boolean | No | No | Set to true if an endpoint determines the first page. Defaults to false. |

## Create and submit a whatsapp/flows Content Template for approval

### Content Templates API - Create a WhatsApp Flow Template

**curl**

```bash
curl -X POST 'https://content.twilio.com/v1/Content' \
-H 'Content-Type: application/json' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
-d '{
   "friendly_name": "info_flow",
   "language": "en","variables": {
      "1": "abcd1234"
    },
    "types": {
      "whatsapp/flows": {
        "body": "Please take five minutes to answer this survey",
        "button_text": "Begin survey",
        "flow_id": "1232445823264765",
        "flow_token": "{{1}}",
        "flow_first_page_id": "QUESTION_ONE"
      }
    }
}'
```

**Output**

```json
{
    "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "date_created": "2025-09-12T23:49:53Z",
    "date_updated": "2025-09-12T23:49:53Z",
    "friendly_name": "info_flow",
    "language": "en",
    "links": {
        "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp",
        "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests"
    },
    "sid": "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "types": {
        "whatsapp/flows": {
            "body": "Please take five minutes to answer this survey",
            "button_text": "Begin survey",
            "flow_first_page_id": "QUESTION_ONE",
            "flow_id": "1232445823264765",
            "flow_token": "{{1}}",
            "is_flow_first_page_endpoint": false,
            "media_url": null,
            "subtitle": null
        }
    },
    "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "variables": {
        "1": "abcd1234"
    }
}
```

### Create a WhatsApp approval request for a whatsapp/flows Content Template

After creating your whatsapp/flows Content Template, you'll need to send it for WhatsApp approval before sending it to your users outside of a messaging window.

**Python**

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from twilio.rest.content.v1.content import ApprovalCreateList

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

approval_create = client.content.v1.contents(
    "HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).approval_create.create(
    content_approval_request=ApprovalCreateList.ContentApprovalRequest(
        {"name": "my_whatsapp_flow_template", "category": "MARKETING"}
    )
)

print(approval_create.name)
```

**Response**

```json
{
  "name": "my_whatsapp_flow_template",
  "category": "MARKETING",
  "content_type": "twilio/location",
  "status": "unsubmitted",
  "rejection_reason": "",
  "allow_category_change": true
}
```

### Fetch an approval status for a whatsapp/flows Content Template

You can check the status of a Content Template submitted for WhatsApp approval:

**Python**

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

**Response**

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

## Send your whatsapp/flows Content Template

Sending a whatsapp/flows Content Template is the same process as sending other Content Templates using the Programmable Messaging APIs. For detailed steps, see Send templates created with the Content Template Builder.

### Send a WhatsApp Flow Content Template message

**Python**

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    from_="whatsapp:+14155238886",
    to="whatsapp:+15017122661",
    content_sid="HXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
)

print(message.sid)
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
  "from": "whatsapp:+14155238886",
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
  "to": "whatsapp:+15017122661",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Receive a Flow submission

When a user submits a Flow in WhatsApp, Twilio sends a webhook request to the messaging endpoint that you've configured on your WhatsApp sender. The InteractiveData field contains the names and user-submitted values for the Flow's structured data components.

You can also prepare a follow-up experience for the user, such as a message to indicate that you have received the completed flow.

### Flow-specific webhook fields

| Field | Description |
|---|---|
| InteractiveData | User-provided information in JSON format. |