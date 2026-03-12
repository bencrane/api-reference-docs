API REFERENCE - DIALING PERMISSIONS - Dialing Permissions - BulkCountryUpdates resource

Dialing Permissions - BulkCountryUpdates resource




Updates country dialing permissions in bulk.

BulkCountryUpdates properties





Property nameTypeRequiredPIIDescriptionChild properties
updateCount
integer
Optional
Not PII
The number of countries updated

Default:
0
updateRequest
string
Optional
Not PII
A bulk update request to change voice dialing country permissions stored as a URL-encoded, JSON array of update objects. For example : [ { "iso_code": "GB", "low_risk_numbers_enabled": "true", "high_risk_special_numbers_enabled":"true", "high_risk_tollfraud_numbers_enabled": "false" } ]

The UpdateRequest parameter is a URL-encoded JSON string that describes an array of objects, each object containing these properties.

high_risk_special_numbers_enabled ‐ (Boolean) Whether high-risk special numbers are enabled
high_risk_tollfraud_numbers_enabled ‐ (Boolean) Whether high-risk toll fraud numbers are enabled
iso_code ‐ (string) The ISO country code

low_risk_numbers_enabled ‐ (Boolean) Whether low risk numbers are enabled
Create a BulkCountryUpdate





POST https://voice.twilio.com/v1/DialingPermissions/BulkCountryUpdates

Request body parameters





Encoding type:application/x-www-form-urlencoded
Schema
Example
Property nameTypeRequiredPIIDescriptionChild properties
updateRequest
string
required
Not PII
URL encoded JSON array of update objects. example : [ { "iso_code": "GB", "low_risk_numbers_enabled": "true", "high_risk_special_numbers_enabled":"true", "high_risk_tollfraud_numbers_enabled": "false" } ]

Create a BulkCountryUpdate to update a single country





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createDialingPermissionsCountryBulkUpdate() {
  const bulkCountryUpdate =
    await client.voice.v1.dialingPermissions.bulkCountryUpdates.create({
      updateRequest: JSON.stringify([
        {
          iso_code: "GB",
          low_risk_numbers_enabled: true,
          high_risk_special_numbers_enabled: true,
          high_risk_tollfraud_numbers_enabled: false,
        },
      ]),
    });

  console.log(bulkCountryUpdate.updateCount);
}

createDialingPermissionsCountryBulkUpdate();
Response



Copy response
{
  "update_count": 1,
  "update_request": "[{\"iso_code\":\"GB\",\"low_risk_numbers_enabled\":true,\"high_risk_special_numbers_enabled\":true,\"high_risk_tollfraud_numbers_enabled\":false}]"
}
Create a BulkCountryUpdate to enable low-risk numbers in several countries





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createDialingPermissionsCountryBulkUpdate() {
  const bulkCountryUpdate =
    await client.voice.v1.dialingPermissions.bulkCountryUpdates.create({
      updateRequest: JSON.stringify([
        {
          high_risk_special_numbers_enabled: false,
          high_risk_tollfraud_numbers_enabled: false,
          iso_code: "US",
          low_risk_numbers_enabled: true,
        },
        {
          high_risk_special_numbers_enabled: false,
          high_risk_tollfraud_numbers_enabled: false,
          iso_code: "DE",
          low_risk_numbers_enabled: true,
        },
        {
          high_risk_special_numbers_enabled: false,
          high_risk_tollfraud_numbers_enabled: false,
          iso_code: "FR",
          low_risk_numbers_enabled: true,
        },
        {
          high_risk_special_numbers_enabled: false,
          high_risk_tollfraud_numbers_enabled: false,
          iso_code: "GB",
          low_risk_numbers_enabled: true,
        },
        {
          high_risk_special_numbers_enabled: false,
          high_risk_tollfraud_numbers_enabled: false,
          iso_code: "IN",
          low_risk_numbers_enabled: true,
        },
        {
          high_risk_special_numbers_enabled: false,
          high_risk_tollfraud_numbers_enabled: false,
          iso_code: "IL",
          low_risk_numbers_enabled: true,
        },
        {
          high_risk_special_numbers_enabled: false,
          high_risk_tollfraud_numbers_enabled: false,
          iso_code: "JP",
          low_risk_numbers_enabled: true,
        },
        {
          high_risk_special_numbers_enabled: false,
          high_risk_tollfraud_numbers_enabled: false,
          iso_code: "BR",
          low_risk_numbers_enabled: true,
        },
      ]),
    });

  console.log(bulkCountryUpdate.updateCount);
}

createDialingPermissionsCountryBulkUpdate();
Response



Copy response
{
  "update_count": 1,
  "update_request": "[{\"high_risk_special_numbers_enabled\":false,\"high_risk_tollfraud_numbers_enabled\":false,\"iso_code\":\"US\",\"low_risk_numbers_enabled\":true},{\"high_risk_special_numbers_enabled\":false,\"high_risk_tollfraud_numbers_enabled\":false,\"iso_code\":\"DE\",\"low_risk_numbers_enabled\":true},{\"high_risk_special_numbers_enabled\":false,\"high_risk_tollfraud_numbers_enabled\":false,\"iso_code\":\"FR\",\"low_risk_numbers_enabled\":true},{\"high_risk_special_numbers_enabled\":false,\"high_risk_tollfraud_numbers_enabled\":false,\"iso_code\":\"GB\",\"low_risk_numbers_enabled\":true},{\"high_risk_special_numbers_enabled\":false,\"high_risk_tollfraud_numbers_enabled\":false,\"iso_code\":\"IN\",\"low_risk_numbers_enabled\":true},{\"high_risk_special_numbers_enabled\":false,\"high_risk_tollfraud_numbers_enabled\":false,\"iso_code\":\"IL\",\"low_risk_numbers_enabled\":true},{\"high_risk_special_numbers_enabled\":false,\"high_risk_tollfraud_numbers_enabled\":false,\"iso_code\":\"JP\",\"low_risk_numbers_enabled\":true},{\"high_risk_special_numbers_enabled\":false,\"high_risk_tollfraud_numbers_enabled\":false,\"iso_code\":\"BR\",\"low_risk_numbers_enabled\":true}]"
}
Create a BulkCountryUpdate to disable high-risk numbers in several countries





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createDialingPermissionsCountryBulkUpdate() {
  const bulkCountryUpdate =
    await client.voice.v1.dialingPermissions.bulkCountryUpdates.create({
      updateRequest: JSON.stringify([
        {
          high_risk_special_numbers_enabled: false,
          high_risk_tollfraud_numbers_enabled: false,
          iso_code: "CU",
          low_risk_numbers_enabled: true,
        },
        {
          high_risk_special_numbers_enabled: false,
          high_risk_tollfraud_numbers_enabled: false,
          iso_code: "LV",
          low_risk_numbers_enabled: true,
        },
        {
          high_risk_special_numbers_enabled: false,
          high_risk_tollfraud_numbers_enabled: false,
          iso_code: "SO",
          low_risk_numbers_enabled: true,
        },
        {
          high_risk_special_numbers_enabled: false,
          high_risk_tollfraud_numbers_enabled: false,
          iso_code: "LT",
          low_risk_numbers_enabled: true,
        },
        {
          high_risk_special_numbers_enabled: false,
          high_risk_tollfraud_numbers_enabled: false,
          iso_code: "GN",
          low_risk_numbers_enabled: true,
        },
        {
          high_risk_special_numbers_enabled: false,
          high_risk_tollfraud_numbers_enabled: false,
          iso_code: "GM",
          low_risk_numbers_enabled: true,
        },
        {
          high_risk_special_numbers_enabled: false,
          high_risk_tollfraud_numbers_enabled: false,
          iso_code: "MV",
          low_risk_numbers_enabled: true,
        },
        {
          high_risk_special_numbers_enabled: false,
          high_risk_tollfraud_numbers_enabled: false,
          iso_code: "EE",
          low_risk_numbers_enabled: true,
        },
        {
          high_risk_special_numbers_enabled: false,
          high_risk_tollfraud_numbers_enabled: false,
          iso_code: "ZW",
          low_risk_numbers_enabled: true,
        },
        {
          high_risk_special_numbers_enabled: false,
          high_risk_tollfraud_numbers_enabled: false,
          iso_code: "TN",
          low_risk_numbers_enabled: true,
        },
      ]),
    });

  console.log(bulkCountryUpdate.updateCount);
}

createDialingPermissionsCountryBulkUpdate();
Response



Copy response
{
  "update_count": 1,
  "update_request": "[{\"high_risk_special_numbers_enabled\":false,\"high_risk_tollfraud_numbers_enabled\":false,\"iso_code\":\"CU\",\"low_risk_numbers_enabled\":true},{\"high_risk_special_numbers_enabled\":false,\"high_risk_tollfraud_numbers_enabled\":false,\"iso_code\":\"LV\",\"low_risk_numbers_enabled\":true},{\"high_risk_special_numbers_enabled\":false,\"high_risk_tollfraud_numbers_enabled\":false,\"iso_code\":\"SO\",\"low_risk_numbers_enabled\":true},{\"high_risk_special_numbers_enabled\":false,\"high_risk_tollfraud_numbers_enabled\":false,\"iso_code\":\"LT\",\"low_risk_numbers_enabled\":true},{\"high_risk_special_numbers_enabled\":false,\"high_risk_tollfraud_numbers_enabled\":false,\"iso_code\":\"GN\",\"low_risk_numbers_enabled\":true},{\"high_risk_special_numbers_enabled\":false,\"high_risk_tollfraud_numbers_enabled\":false,\"iso_code\":\"GM\",\"low_risk_numbers_enabled\":true},{\"high_risk_special_numbers_enabled\":false,\"high_risk_tollfraud_numbers_enabled\":false,\"iso_code\":\"MV\",\"low_risk_numbers_enabled\":true},{\"high_risk_special_numbers_enabled\":false,\"high_risk_tollfraud_numbers_enabled\":false,\"iso_code\":\"EE\",\"low_risk_numbers_enabled\":true},{\"high_risk_special_numbers_enabled\":false,\"high_risk_tollfraud_numbers_enabled\":false,\"iso_code\":\"ZW\",\"low_risk_numbers_enabled\":true},{\"high_risk_special_numbers_enabled\":false,\"high_risk_tollfraud_numbers_enabled\":false,\"iso_code\":\"TN\",\"low_risk_numbers_enabled\":true}]"
}