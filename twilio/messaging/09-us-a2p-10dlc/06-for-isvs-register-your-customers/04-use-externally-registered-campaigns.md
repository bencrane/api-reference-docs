# A2P 10DLC - Use Externally Registered Campaigns

> **Info:** Contact your Twilio Account Executive (AE) to request access to this feature.

This guide explains the process of associating an external Campaign that was directly registered with The Campaign Registry (TCR) with a Twilio Messaging Service. Doing this allows you to skip the Customer Profile creation and Brand registration steps of Twilio A2P 10DLC onboarding.

Twilio does not recommend using external Campaigns in most cases, and TCR only allows direct registration from ISVs. See the [Can I go directly to The Campaign Registry for US A2P 10DLC registration?](https://help.twilio.com) Help Center article for more information on external Campaigns and their limitations.

---

## Steps to associate external Campaigns with Messaging Services

This section covers the steps you need to follow to associate an external Campaign with a Messaging Service. Optionally, you can reference the sequence diagram for a more technical look at the required steps.

1. **Create a Twilio Messaging Service** via the Console or via API. Do not specify the Messaging Service's `Usecase` parameter. Twilio will assign the default value `undeclared` for the Messaging Service, which is appropriate for external Campaigns regardless of what Use Case they are registered with in TCR.

2. **Add phone numbers** to the Messaging Service's Sender Pool via API or the Console at any point in the process. For detailed instructions on how to do this, see the [Managing a Messaging Service Sender Pool](https://help.twilio.com) Help Center article. Sole Proprietor Campaigns are limited to one phone number.

3. **Share the Campaign with Twilio** as the Direct Connect Aggregator (DCA) using the TCR web portal or TCR API. A DCA is a company that provides direct connectivity to mobile carrier gateways for the purpose of delivering SMS messages.

4. **Twilio reviews the Campaign.**
   - If the Campaign fails this review: Twilio will reject the Campaign sharing request. You will receive a `CAMPAIGN_SHARE_DELETE` event to the webhook endpoint you provided to TCR containing rejection feedback. You can update the Campaign based on the feedback and repeat step #3 above.
   - When the Campaign passes Twilio's compliance review and is accepted, you will receive a `CAMPAIGN_SHARE_ACCEPT` event to the webhook endpoint you provided to TCR. You cannot continue to the next step until this happens.

5. **Associate the Campaign with a Messaging Service** with the API call documented below.

6. **Twilio performs any carrier-specific Campaign configuration** and elects any required secondary DCAs for the Campaign. Secondary DCAs must conduct reviews before the Campaign can be fully operational.
   - If the secondary DCAs reject the Campaign: You will receive a `CAMPAIGN_SHARE_DELETE` event to the webhook endpoint you provided to TCR containing rejection feedback from the secondary DCA. First, you will need to delete the Campaign association from Twilio. Then, you can update the Campaign based on the feedback and start again at step #3 above. Twilio will bill the $15 vetting fee for each review conducted by the secondary DCA. Note that TCR Nudge (`APPEAL_REJECTION`, `REVIEW`) functionality is unsupported by Twilio at this time. If you wish to appeal a secondary DCA rejection, contact support at 10dlc-onboarding@twilio.com.
   - When all parties approve the Campaign, you will receive a `CAMPAIGN_DCA_COMPLETE` event to the webhook endpoint you provided to TCR. Twilio associates all numbers in the Messaging Service's Sender Pool with the Campaign, including numbers you add later.

7. **Start sending!** Twilio will bill and rate limit messages according to the TCR Campaign Class.

---

## Code samples

### Associate an external Campaign with a Messaging Service

> **Info:** This endpoint is private, contact your Twilio Account Executive (AE) to request access.

> **Warning:** This API call can take some time to complete, use the Get Campaign details endpoint to confirm the Campaign is verified before sending messages.

This call kicks off the process of Twilio associating an external Campaign with a Messaging Service. To check if the association process is complete and your Campaign is ready to send messages, use the Get Campaign Details API call below and verify that the `campaign_status` is `VERIFIED` in the JSON response.

**Rate limit:** One request per five seconds. Failures resulting from exceeding this limit are asynchronous and the Campaign moves to a failed status after all retries are exhausted. To proceed, you must delete the Campaign association from Twilio and reshare the Campaign with Twilio from TCR.

**campaignId parameter:** This is TCR's unique identifier of your Campaign. It is a seven character alphanumeric string that starts with `C`.

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

external_campaign = client.messaging.v1.external_campaign.create(
    campaign_id="CRMTK1Z",
    messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
)

print(external_campaign.sid)
```

**Response:**

```json
{
  "sid": "QE2c6890da8086d771620e9b13fadeba0b",
  "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "campaign_id": "CRMTK1Z",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-03-21T21:31:00Z"
}
```

---

### Get Campaign details

This call returns the details of a specific Campaign. You can use it to check the status of a Campaign that you have associated with a Messaging Service. A `campaign_status` of `VERIFIED` means you are ready to start sending messages. Twilio bills messages and rate limits them according to the TCR Campaign Class.

The `Sid` parameter value should be `QE2c6890da8086d771620e9b13fadeba0b` for all A2P 10DLC Campaigns and Messaging Services. It is the US A2P Compliance resource identifier.

See this endpoint's full API Reference for more information.

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

us_app_to_person = (
    client.messaging.v1.services("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .us_app_to_person("QE2c6890da8086d771620e9b13fadeba0b")
    .fetch()
)

print(us_app_to_person.brand_registration_sid)
```

---

### Delete an external Campaign association

> **Warning:** This request does not delete the Campaign from TCR. That must be done directly via the TCR web portal or TCR API.

This API call deletes an external Campaign association to a Messaging Service. After an association is deleted, you can re-associate a different Campaign with the same Messaging Service or associate the same Campaign with different Messaging Service.

When this call is successfully made, it takes a few seconds to finalize deletion in the Twilio system. To account for this, you can implement a five second delay between removing a Campaign and creating a new association with the same Campaign or the same Messaging Service.

See this endpoint's full API Reference for more information.

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.messaging.v1.services(
    "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).us_app_to_person("QE2c6890da8086d771620e9b13fadeba0b").delete()
```

---

## Migrate external Campaign to Twilio

Twilio now supports the migration of Campaigns approved by all carriers via TCR from other messaging API providers, without requiring re-registration.

When a Campaign is shared with Twilio through Connectivity Partner (CNP) Migration, a secondary CNP chain is created in the background, ensuring minimal service disruptions. Once all necessary approvals are received, this secondary chain transitions to the primary chain. Each migrated Campaign incurs a fee of $8.

### Number Migration

Number migration can occur before or after Campaign migration. For optimal results, complete number porting first and ensure SMS traffic is available on Twilio for the ported number before initiating Campaign migration.

### Associate an external, migrated Campaign with a Messaging Service

Refer to the TCR documentation for details on initiating a CNP migration request to Twilio's DCA. After the Campaign is accepted by Twilio, use the following endpoint to associate it with a Twilio Messaging Service:

**CnpMigration parameter:** This optional parameter, when set to `True`, indicates the Campaign was shared through CNP migration.

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

external_campaign = client.messaging.v1.external_campaign.create(
    campaign_id="CRMTK1Z",
    messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    cnp_migration=False,
)

print(external_campaign.sid)
```

**Response:**

```json
{
  "sid": "QE2c6890da8086d771620e9b13fadeba0b",
  "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "campaign_id": "CRMTK1Z",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-03-21T21:31:00Z"
}
```

---

## Get help with A2P 10DLC

Need help building or registering your A2P 10DLC application? Learn more about Twilio Professional Services for A2P 10DLC.