# Credentials AWS Resource

The AWS resource represents Amazon Web Services (AWS) credentials in your Twilio account. Twilio can store video and voice recordings on AWS Simple Storage Service (S3). To access S3, Twilio uses AWS credentials.

## AWS Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID<CR> | Optional | Not PII | The unique string that we created to identify the AWS resource. Pattern: `^CR[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `account_sid` | SID<AC> | Optional | Not PII | The SID of the Account that created the AWS resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `friendly_name` | string | Optional | PII MTL: 0 days | The string that you assigned to describe the resource. |
| `date_created` | string<date-time> | Optional | Not PII | The date and time in GMT when the resource was created specified in RFC 2822 format. |
| `date_updated` | string<date-time> | Optional | Not PII | The date and time in GMT when the resource was last updated specified in RFC 2822 format. |
| `url` | string<uri> | Optional | Not PII | The URI for this resource, relative to `https://accounts.twilio.com` |

---

## Create an AWSCredential resource

```
POST https://accounts.twilio.com/v1/Credentials/AWS
```

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `credentials` | string | required | Not PII | A string that contains the AWS access credentials in the format `<AWS_ACCESS_KEY_ID>:<AWS_SECRET_ACCESS_KEY>`. For example, `AKIAIOSFODNN7EXAMPLE:wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `friendly_name` | string | Optional | PII MTL: 0 days | A descriptive string that you create to describe the resource. It can be up to 64 characters long. |
| `account_sid` | SID<AC> | Optional | Not PII | The SID of the Subaccount that this Credential should be associated with. Must be a valid Subaccount of the account issuing the request. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Add an AWS Credential

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

AW = client.accounts.v1.credentials.aws.create(credentials="Credentials")

print(AW.sid)
```

#### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-31T04:00:00Z",
  "date_updated": "2015-07-31T04:00:00Z",
  "friendly_name": "friendly_name",
  "sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://accounts.twilio.com/v1/Credentials/AWS/CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Fetch a CredentialAWS resource

```
GET https://accounts.twilio.com/v1/Credentials/AWS/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID<CR> | required | Not PII | The Twilio-provided string that uniquely identifies the AWS resource to fetch. Pattern: `^CR[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Fetch an AWS Credential

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

AW = client.accounts.v1.credentials.aws(
    "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(AW.sid)
```

#### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-31T04:00:00Z",
  "date_updated": "2015-07-31T04:00:00Z",
  "friendly_name": "friendly_name",
  "sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://accounts.twilio.com/v1/Credentials/AWS/CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Read multiple CredentialAWS resources

```
GET https://accounts.twilio.com/v1/Credentials/AWS
```

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `page_size` | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

### List AWS Credentials

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

AWs = client.accounts.v1.credentials.aws.list(limit=20)

for record in AWs:
    print(record.sid)
```

#### Response

```json
{
  "credentials": [],
  "meta": {
    "first_page_url": "https://accounts.twilio.com/v1/Credentials/AWS?PageSize=50&Page=0",
    "key": "credentials",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://accounts.twilio.com/v1/Credentials/AWS?PageSize=50&Page=0"
  }
}
```

---

## Update a CredentialAWS resource

```
POST https://accounts.twilio.com/v1/Credentials/AWS/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID<CR> | required | Not PII | The Twilio-provided string that uniquely identifies the AWS resource to update. Pattern: `^CR[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `friendly_name` | string | Optional | PII MTL: 0 days | A descriptive string that you create to describe the resource. It can be up to 64 characters long. |

### Update an AWS Credential

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

credential_aws = client.accounts.v1.credentials.aws(
    "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(friendly_name="FriendlyName")

print(credential_aws.sid)
```

#### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-31T04:00:00Z",
  "date_updated": "2015-07-31T04:00:00Z",
  "friendly_name": "FriendlyName",
  "sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://accounts.twilio.com/v1/Credentials/AWS/CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Delete a CredentialAWS resource

```
DELETE https://accounts.twilio.com/v1/Credentials/AWS/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID<CR> | required | Not PII | The Twilio-provided string that uniquely identifies the AWS resource to delete. Pattern: `^CR[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Delete an AWS Credential

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.accounts.v1.credentials.aws(
    "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).delete()
```