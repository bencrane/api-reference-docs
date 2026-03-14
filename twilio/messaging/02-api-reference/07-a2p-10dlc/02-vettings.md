# A2P 10DLC - Vettings subresource

> **Warning:** This API reference page supplements the A2P 10DLC government and nonprofit onboarding guide. Don't use this API resource without following the appropriate guide, or you might experience delays in registration and unintended fees.

Vettings is a subresource of BrandRegistrations and represents the association between a Campaign Verify token and a BrandRegistration resource.

## Vetting Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID\<AC\> | Optional | Not PII | The SID of the Account that created the vetting record. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| brand_sid | SID\<BN\> | Optional | Not PII | The unique string to identify Brand Registration. Pattern: `^BN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| brand_vetting_sid | SID\<VT\> | Optional | Not PII | The Twilio SID of the third-party vetting record. Pattern: `^VT[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| date_updated | string\<date-time\> | Optional | Not PII | The date and time in GMT when the resource was last updated specified in ISO 8601 format. |
| date_created | string\<date-time\> | Optional | Not PII | The date and time in GMT when the resource was created specified in ISO 8601 format. |
| vetting_id | string | Optional | Not PII | The unique identifier of the vetting from the third-party provider. |
| vetting_class | string | Optional | Not PII | The type of vetting that has been conducted. One of "STANDARD" (Aegis) or "POLITICAL" (Campaign Verify). |
| vetting_status | string | Optional | Not PII | The status of the import vetting attempt. One of "PENDING," "SUCCESS," or "FAILED". |
| vetting_provider | enum\<string\> | Optional | Not PII | The third-party provider that has conducted the vetting. One of "CampaignVerify" (Campaign Verify tokens) or "AEGIS" (Secondary Vetting). Possible values: `campaign-verify`, `aegis` |
| url | string\<uri\> | Optional | Not PII | The absolute URL of the Brand Vetting resource. |

## Create a Vetting

```
POST https://messaging.twilio.com/v1/a2p/BrandRegistrations/{BrandSid}/Vettings
```

Create a Vetting subresource. This associates a BrandRegistration resource and a Campaign Verify token.

The VettingProvider is campaign-verify, and the Campaign Verify token is provided in the VettingId parameter.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| brand_sid | SID\<BN\> | required | Not PII | The SID of the Brand Registration resource of the vettings to create. Pattern: `^BN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| vetting_provider | enum\<string\> | required | Not PII | The third-party provider that has conducted the vetting. One of "CampaignVerify" (Campaign Verify tokens) or "AEGIS" (Secondary Vetting). Possible values: `campaign-verify`, `aegis` |
| vetting_id | string | Optional | Not PII | The unique ID of the vetting |

### Create a Vettings for a 527 political organization

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

brand_vetting = client.messaging.v1.brand_registrations(
    "BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).brand_vettings.create(
    vetting_id="cv|1.0|tcr|10dlc|9975c339-d46f-49b7-a399-2e6d5ebac66d|EXAMPLEjEd8xSlaAgRXAXXBUNBT2AgL-LdQuPveFhEyY",
    vetting_provider="campaign-verify",
)

print(brand_vetting.account_sid)
```

### Response

```json
{
  "account_sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "brand_sid": "BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "brand_vetting_sid": "VT12445353",
  "vetting_provider": "campaign-verify",
  "vetting_id": "cv|1.0|tcr|10dlc|9975c339-d46f-49b7-a399-2e6d5ebac66d|EXAMPLEjEd8xSlaAgRXAXXBUNBT2AgL-LdQuPveFhEyY",
  "vetting_class": "POLITICAL",
  "vetting_status": "IN_PROGRESS",
  "date_created": "2021-01-27T14:18:35Z",
  "date_updated": "2021-01-27T14:18:35Z",
  "url": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85/Vettings/VT12445353"
}
```

> **Warning:** Don't create a UsAppToPerson resource until the vetting_status is SUCCESS.
>
> You can check the vetting_status with a GET request.
>
> If the vetting_status is SUCCESS, the Campaign Verify token is successfully associated with your Brand. This allows you to use the POLITICAL special use case.

## Retrieve a Vetting

```
GET https://messaging.twilio.com/v1/a2p/BrandRegistrations/{BrandSid}/Vettings/{BrandVettingSid}
```

Retrieve a Vetting using a BrandVettingSid.

You can use this request to check the vetting_status.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| brand_sid | SID\<BN\> | required | Not PII | The SID of the Brand Registration resource of the vettings to read. Pattern: `^BN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| brand_vetting_sid | SID\<VT\> | required | Not PII | The Twilio SID of the third-party vetting record. Pattern: `^VT[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Retrieve a Vetting

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

brand_vetting = (
    client.messaging.v1.brand_registrations(
        "BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    )
    .brand_vettings("VTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch()
)

print(brand_vetting.account_sid)
```

### Response

```json
{
  "account_sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "brand_sid": "BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "brand_vetting_sid": "VTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "vetting_provider": "campaign-verify",
  "vetting_id": "cv|1.0|tcr|10dlc|9975c339-d46f-49b7-a399-EXAMPLETOKEN|GQ3EXAMPLETOKENAXXBUNBT2AgL-LdQuPveFhEyY",
  "vetting_class": "POLITICAL",
  "vetting_status": "IN_PROGRESS",
  "date_created": "2021-01-27T14:18:35Z",
  "date_updated": "2021-01-27T14:18:35Z",
  "url": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85/Vettings/VT12445353"
}
```

## Retrieve a list of Vettings

```
GET https://messaging.twilio.com/v1/a2p/BrandRegistrations/{BrandSid}/Vettings
```

This request returns all Vettings associated with a BrandRegistrations resource.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| brand_sid | SID\<BN\> | required | Not PII | The SID of the Brand Registration resource of the vettings to read. Pattern: `^BN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| vetting_provider | enum\<string\> | Optional | Not PII | The third-party provider of the vettings to read. Possible values: `campaign-verify`, `aegis` |

### Retrieve a list of Vettings for a BrandRegistration

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

brand_vettings = client.messaging.v1.brand_registrations(
    "BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).brand_vettings.list(limit=20)

for record in brand_vettings:
    print(record.account_sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85/Vettings",
    "previous_page_url": null,
    "next_page_url": null,
    "key": "data",
    "url": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85/Vettings"
  },
  "data": [
    {
      "account_sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "brand_sid": "BN0044409f7e067e279523808d267e2d85",
      "brand_vetting_sid": "VT12445353",
      "vetting_provider": "campaign-verify",
      "vetting_id": "cv|1.0|tcr|10dlc|9975c339-d46f-49b7-a399-EXAMPLETOKEN|GQ3EXAMPLETOKENAXXBUNBT2AgL-LdQuPveFhEyY",
      "vetting_class": "POLITICAL",
      "vetting_status": "IN_PROGRESS",
      "date_created": "2021-01-27T14:18:35Z",
      "date_updated": "2021-01-27T14:18:35Z",
      "url": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85/Vettings/VT12445353"
    }
  ]
}
```
