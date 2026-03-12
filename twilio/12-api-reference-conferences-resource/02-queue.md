# API Reference - Queues resource -

Queues resource




A Queue resource describes a call queue that contains individual calls, which are described by the queue's Members subsresource. Your account can have more than one call queue. Each queue can be retrieved by its sid directly using fetch. Alternately, you can read the list of Queues and filter by friendly_name or any other property you prefer.

Call queues are created when you add a call to a queue that doesn't exist and when you create one explicitly.

For information about enqueuing calls, see Queueing Calls.


(warning)
Warning
Queues persist. To optimize fetch operations, inactive Queues should be deleted.
Queues properties





Property nameTypeRequiredPIIDescriptionChild properties
dateUpdated
string<date-time-rfc-2822>
Optional
Not PII
The date and time in GMT that this resource was last updated, specified in RFC 2822

format.

currentSize
integer
Optional
Not PII
The number of calls currently in the queue.

Default:
0
friendlyName
string
Optional
Not PII
A string that you assigned to describe this resource.

uri
string
Optional
Not PII
The URI of this resource, relative to https://api.twilio.com.

accountSid
SID<AC>
Optional
Not PII
The SID of the Account that created this Queue resource.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
averageWaitTime
integer
Optional
Not PII
The average wait time in seconds of the members in this queue. This is calculated at the time of the request.

Default:
0
sid
SID<QU>
Optional
Not PII
The unique string that that we created to identify this Queue resource.

Pattern:
^QU[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
dateCreated
string<date-time-rfc-2822>
Optional
Not PII
The date and time in GMT that this resource was created specified in RFC 2822

 format.

maxSize
integer
Optional
Not PII
The maximum number of calls that can be in the queue. The default is 1000 and the maximum is 5000.

Default:
0
Create a Queue





POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Queues.json

Path parameters





Property nameTypeRequiredPIIDescription
accountSid
SID<AC>
required
Not PII
The SID of the Account that will create the resource.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Request body parameters





Encoding type:application/x-www-form-urlencoded
Schema
Example
Property nameTypeRequiredPIIDescriptionChild properties
friendlyName
string
required
Not PII
A descriptive string that you created to describe this resource. It can be up to 64 characters long.

maxSize
integer
Optional
Not PII
The maximum number of calls allowed to be in the queue. The default is 1000. The maximum is 5000.

Create a Queue





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createQueue() {
  const queue = await client.queues.create({ friendlyName: "FriendlyName" });

  console.log(queue.dateUpdated);
}

createQueue();
Response



Copy response
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "average_wait_time": 0,
  "current_size": 0,
  "date_created": "Tue, 04 Aug 2015 18:39:09 +0000",
  "date_updated": "Tue, 04 Aug 2015 18:39:09 +0000",
  "friendly_name": "FriendlyName",
  "max_size": 100,
  "sid": "QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Queues/QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
Retrieve a Queue





GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json

Path parameters





Property nameTypeRequiredPIIDescription
accountSid
SID<AC>
required
Not PII
The SID of the Account that created the Queue resource to fetch.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
sid
SID<QU>
required
Not PII
The Twilio-provided string that uniquely identifies the Queue resource to fetch

Pattern:
^QU[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Retrieve a Queue





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchQueue() {
  const queue = await client
    .queues("QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(queue.dateUpdated);
}

fetchQueue();
Response



Copy response
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "average_wait_time": 0,
  "current_size": 0,
  "date_created": "Tue, 04 Aug 2015 18:39:09 +0000",
  "date_updated": "Tue, 04 Aug 2015 18:39:09 +0000",
  "friendly_name": "0.361280134646222",
  "max_size": 100,
  "sid": "QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Queues/QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
Retrieve a list of Queues





GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Queues.json

Path parameters





Property nameTypeRequiredPIIDescription
accountSid
SID<AC>
required
Not PII
The SID of the Account that created the Queue resources to read.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Query parameters





Property nameTypeRequiredPIIDescription
pageSize
integer<int64>
Optional
Not PII
How many resources to return in each list page. The default is 50, and the maximum is 1000.

Minimum:
1
Maximum:
1000
page
integer
Optional
Not PII
The page index. This value is simply for client state.

Minimum:
0
pageToken
string
Optional
Not PII
The page token. This is provided by the API.

Retrieve a list of Queues





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listQueue() {
  const queues = await client.queues.list({ limit: 20 });

  queues.forEach((q) => console.log(q.dateUpdated));
}

listQueue();
Response



Copy response
{
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Queues.json?PageSize=1&Page=0",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Queues.json?PageSize=1&Page=1&PageToken=PAQUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "page": 0,
  "page_size": 1,
  "previous_page_uri": null,
  "queues": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "average_wait_time": 0,
      "current_size": 0,
      "date_created": "Tue, 04 Aug 2015 18:39:09 +0000",
      "date_updated": "Tue, 04 Aug 2015 18:39:09 +0000",
      "friendly_name": "0.361280134646222",
      "max_size": 100,
      "sid": "QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Queues/QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
    }
  ],
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Queues.json?PageSize=1&Page=0"
}
Update a Queue





POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json

Path parameters





Property nameTypeRequiredPIIDescription
accountSid
SID<AC>
required
Not PII
The SID of the Account that created the Queue resource to update.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
sid
SID<QU>
required
Not PII
The Twilio-provided string that uniquely identifies the Queue resource to update

Pattern:
^QU[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Request body parameters





Encoding type:application/x-www-form-urlencoded
Schema
Example
Property nameTypeRequiredPIIDescriptionChild properties
friendlyName
string
Optional
Not PII
A descriptive string that you created to describe this resource. It can be up to 64 characters long.

maxSize
integer
Optional
Not PII
The maximum number of calls allowed to be in the queue. The default is 1000. The maximum is 5000.

Update a Queue





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateQueue() {
  const queue = await client
    .queues("QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ friendlyName: "FriendlyName" });

  console.log(queue.dateUpdated);
}

updateQueue();
Response



Copy response
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "average_wait_time": 0,
  "current_size": 0,
  "date_created": "Tue, 04 Aug 2015 18:39:09 +0000",
  "date_updated": "Tue, 04 Aug 2015 18:39:09 +0000",
  "friendly_name": "FriendlyName",
  "max_size": 100,
  "sid": "QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Queues/QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
Delete a Queue





DELETE https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json

Path parameters





Property nameTypeRequiredPIIDescription
accountSid
SID<AC>
required
Not PII
The SID of the Account that created the Queue resource to delete.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
sid
SID<QU>
required
Not PII
The Twilio-provided string that uniquely identifies the Queue resource to delete

Pattern:
^QU[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Delete a Queue





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteQueue() {
  await client.queues("QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").remove();
}

deleteQueue();