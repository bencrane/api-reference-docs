# Hosted Numbers API - Authorization Document Resource

> **Danger:** The Hosted Phone Numbers API is currently under development, and this documentation is for existing users. A new version will soon be released as a generally available (GA) product. Please be aware that the API path `https://preview.twilio.com/HostedNumbers/AuthorizationDocuments` will change with the GA release. You will be informed about the timeline and given time to update accordingly.

An Authorization Document is a resource representing a legally binding document between Twilio and a customer to Authorize Twilio to run messaging traffic on a given set of Phone Numbers.

Hosted Number Orders can be assigned to an Authorization Document detailing which Address a Hosted Number Order is activated with. Once the Authorization Document has been signed, the Hosted Number Orders will then be registered to Twilio for routing capability.

## AuthorizationDocument Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<PX> | Optional | Not PII | A 34 character string that uniquely identifies this AuthorizationDocument. Pattern: `^PX[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| address_sid | SID<AD> | Optional | Not PII | A 34 character string that uniquely identifies the Address resource that is associated with this AuthorizationDocument. Pattern: `^AD[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| status | enum<string> | Optional | Not PII | Status of an instance resource. It can hold one of the values: 1. opened 2. signing, 3. signed LOA, 4. canceled, 5. failed. See the section entitled Status Values for more information on each of these statuses. Possible values: `opened`, `signing`, `signed`, `canceled`, `failed` |
| email | string | Optional | PII MTL: 30 days | Email that this AuthorizationDocument will be sent to for signing. |
| cc_emails | array[string] | Optional | PII MTL: 30 days | Email recipients who will be informed when an Authorization Document has been sent and signed. |
| date_created | string<date-time> | Optional | Not PII | The date this resource was created, given as GMT RFC 2822 format. |
| date_updated | string<date-time> | Optional | Not PII | The date that this resource was updated, given as GMT RFC 2822 format. |
| url | string<uri> | Optional | Not PII | |
| links | object<uri-map> | Optional | Not PII | |

## Status Values

| Status | Description |
|--------|-------------|
| opened | Document is open and mutable. |
| signing | Document has been sent out to the Email for signature and is immutable. |
| signed | Document has been signed by the Email recipient and is immutable. |
| canceled | Document has been canceled by the Email recipient and is immutable. |
| failed | Document has failed with an error and is immutable. |

---

## Create an AuthorizationDocument resource

```
POST https://preview.twilio.com/HostedNumbers/AuthorizationDocuments
```

Create an Authorization Document for authorizing the hosting of phone numbers' capability on Twilio's platform.

The resource is explicit and all Hosted Number Orders added upon creation are the entire list of numbers that are assigned to the Authorization Document. Once the POST to create a new Authorization Document has been created, the LOA will immediately be sent out for signature.

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| hosted_number_order_sids | array[string] | required | Not PII | A list of HostedNumberOrder sids that this AuthorizationDocument will authorize for hosting phone number capabilities on Twilio's platform. |
| address_sid | SID<AD> | required | Not PII | A 34 character string that uniquely identifies the Address resource that is associated with this AuthorizationDocument. Pattern: `^AD[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| email | string | required | PII MTL: 30 days | Email that this AuthorizationDocument will be sent to for signing. |
| contact_title | string | required | Not PII | The title of the person authorized to sign the Authorization Document for this phone number. |
| contact_phone_number | string | required | Not PII | The contact phone number of the person authorized to sign the Authorization Document. |
| cc_emails | array[string] | Optional | PII MTL: 30 days | Email recipients who will be informed when an Authorization Document has been sent and signed. |

### Create an AuthorizationDocument

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

authorization_document = (
    client.preview.hosted_numbers.authorization_documents.create(
        hosted_number_order_sids=["HostedNumberOrderSids"],
        address_sid="ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        email="Email",
        contact_title="ContactTitle",
        contact_phone_number="ContactPhoneNumber",
    )
)

print(authorization_document.sid)
```

**Response:**

```json
{
  "address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "cc_emails": [
    "test1@twilio.com",
    "test2@twilio.com"
  ],
  "date_created": "2017-03-28T20:06:39Z",
  "date_updated": "2017-03-28T20:06:39Z",
  "email": "Email",
  "links": {
    "dependent_hosted_number_orders": "https://preview.twilio.com/HostedNumbers/AuthorizationDocuments/PXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/DependentHostedNumberOrders"
  },
  "sid": "PXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "signing",
  "url": "https://preview.twilio.com/HostedNumbers/AuthorizationDocuments/PXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Fetch an AuthorizationDocument resource

```
GET https://preview.twilio.com/HostedNumbers/AuthorizationDocuments/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<PX> | required | Not PII | A 34 character string that uniquely identifies this AuthorizationDocument. Pattern: `^PX[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Fetch an AuthorizationDocument

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

authorization_document = client.preview.hosted_numbers.authorization_documents(
    "PXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(authorization_document.sid)
```

**Response:**

```json
{
  "address_sid": "AD11111111111111111111111111111111",
  "cc_emails": [
    "aaa@twilio.com",
    "bbb@twilio.com"
  ],
  "date_created": "2017-03-28T20:06:39Z",
  "date_updated": "2017-03-28T20:06:39Z",
  "email": "test@twilio.com",
  "links": {
    "dependent_hosted_number_orders": "https://preview.twilio.com/HostedNumbers/AuthorizationDocuments/PXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/DependentHostedNumberOrders"
  },
  "sid": "PXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "signing",
  "url": "https://preview.twilio.com/HostedNumbers/AuthorizationDocuments/PXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Read multiple AuthorizationDocument resources

```
GET https://preview.twilio.com/HostedNumbers/AuthorizationDocuments
```

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| email | string | Optional | PII MTL: 30 days | Email that this AuthorizationDocument will be sent to for signing. |
| status | enum<string> | Optional | Not PII | Status of an instance resource. It can hold one of the values: 1. opened 2. signing, 3. signed LOA, 4. canceled, 5. failed. See the section entitled Status Values for more information on each of these statuses. Possible values: `opened`, `signing`, `signed`, `canceled`, `failed` |
| page_size | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

### List multiple AuthorizationDocuments

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

authorization_documents = (
    client.preview.hosted_numbers.authorization_documents.list(limit=20)
)

for record in authorization_documents:
    print(record.sid)
```

**Response:**

```json
{
  "meta": {
    "first_page_url": "https://preview.twilio.com/HostedNumbers/AuthorizationDocuments?Status=signed&Email=test%2Bhosted%40twilio.com&PageSize=50&Page=0",
    "key": "items",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://preview.twilio.com/HostedNumbers/AuthorizationDocuments?Status=signed&Email=test%2Bhosted%40twilio.com&PageSize=50&Page=0"
  },
  "items": []
}
```

---

## Update an AuthorizationDocument resource

```
POST https://preview.twilio.com/HostedNumbers/AuthorizationDocuments/{Sid}
```

Requests to update a single, existing Authorization Documents instance resource's properties and returns the updated resource representation if successful.

> **Warning:** The ability to update an Authorization Document will be removed once the API is released as a generally available (GA) product. You will be informed about the timeline and given time to update accordingly.
>
> Authorization Documents can only be updated when in opened status. To update the Authorization Document, update the Status to opened.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<PX> | required | Not PII | A 34 character string that uniquely identifies this AuthorizationDocument. Pattern: `^PX[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| hosted_number_order_sids | array[string] | Optional | Not PII | A list of HostedNumberOrder sids that this AuthorizationDocument will authorize for hosting phone number capabilities on Twilio's platform. |
| address_sid | SID<AD> | Optional | Not PII | A 34 character string that uniquely identifies the Address resource that is associated with this AuthorizationDocument. Pattern: `^AD[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| email | string | Optional | PII MTL: 30 days | Email that this AuthorizationDocument will be sent to for signing. |
| cc_emails | array[string] | Optional | PII MTL: 30 days | Email recipients who will be informed when an Authorization Document has been sent and signed |
| status | enum<string> | Optional | Not PII | Status of an instance resource. It can hold one of the values: 1. opened 2. signing, 3. signed LOA, 4. canceled, 5. failed. See the section entitled Status Values for more information on each of these statuses. Possible values: `opened`, `signing`, `signed`, `canceled`, `failed` |
| contact_title | string | Optional | Not PII | The title of the person authorized to sign the Authorization Document for this phone number. |
| contact_phone_number | string | Optional | Not PII | The contact phone number of the person authorized to sign the Authorization Document. |

### Update an AuthorizationDocument

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

hosted_numbers_authorization_document = (
    client.preview.hosted_numbers.authorization_documents(
        "PXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    ).update(hosted_number_order_sids=["HostedNumberOrderSids"])
)

print(hosted_numbers_authorization_document.sid)
```

**Response:**

```json
{
  "address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "cc_emails": [
    "test1@twilio.com",
    "test2@twilio.com"
  ],
  "date_created": "2017-03-28T20:06:39Z",
  "date_updated": "2017-03-28T20:06:39Z",
  "email": "test+hosted@twilio.com",
  "links": {
    "dependent_hosted_number_orders": "https://preview.twilio.com/HostedNumbers/AuthorizationDocuments/PXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/DependentHostedNumberOrders"
  },
  "sid": "PXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "signing",
  "url": "https://preview.twilio.com/HostedNumbers/AuthorizationDocuments/PXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```