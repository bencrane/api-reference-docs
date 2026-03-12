# API Reference - Members subresource

Members subresource




Members is a subresource of Queues and represents a single call in a call queue.

All members in a call queue can be identified by their unique CallSid, and the member at the front of the queue can be identified by the Front sid.

Member Properties





Property nameTypeRequiredPIIDescriptionChild properties
callSid
SID<CA>
Optional
Not PII
The SID of the Call the Member resource is associated with.

Pattern:
^CA[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
dateEnqueued
string<date-time-rfc-2822>
Optional
Not PII
The date that the member was enqueued, given in RFC 2822 format.

position
integer
Optional
Not PII
This member's current position in the queue.

Default:
0
uri
string
Optional
Not PII
The URI of the resource, relative to https://api.twilio.com.

waitTime
integer
Optional
Not PII
The number of seconds the member has been in the queue.

Default:
0
queueSid
SID<QU>
Optional
Not PII
The SID of the Queue the member is in.

Pattern:
^QU[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Retrieve a Member





GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members/{CallSid}.json

You can address the member to fetch by its unique CallSid or by the Front sid to fetch the member at the front of the queue.

Path parameters





Property nameTypeRequiredPIIDescription
accountSid
SID<AC>
required
Not PII
The SID of the Account that created the Member resource(s) to fetch.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
queueSid
SID<QU>
required
Not PII
The SID of the Queue in which to find the members to fetch.

Pattern:
^QU[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
callSid
string
required
Not PII
The Call SID of the resource(s) to fetch.

Retrieve a Member





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchMember() {
  const member = await client
    .queues("QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .members("CallSid")
    .fetch();

  console.log(member.callSid);
}

fetchMember();
Response



Copy response
{
  "queue_sid": "QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CallSid",
  "date_enqueued": "Tue, 07 Aug 2012 22:57:41 +0000",
  "position": 1,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Queues/QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Members/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "wait_time": 143
}
Retrieve a Member at the front of the queue





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchMember() {
  const member = await client
    .queues("QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .members("Front")
    .fetch();

  console.log(member.callSid);
}

fetchMember();
Response



Copy response
{
  "queue_sid": "QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "Front",
  "date_enqueued": "Tue, 07 Aug 2012 22:57:41 +0000",
  "position": 1,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Queues/QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Members/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "wait_time": 143
}
Retrieve a list of Members





GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members.json

Path parameters





Property nameTypeRequiredPIIDescription
accountSid
SID<AC>
required
Not PII
The SID of the Account that created the Member resource(s) to read.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
queueSid
SID<QU>
required
Not PII
The SID of the Queue in which to find the members

Pattern:
^QU[0-9a-fA-F]{32}$
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

Retrieve a list of Members





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listMember() {
  const members = await client
    .queues("QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .members.list({ limit: 20 });

  members.forEach((m) => console.log(m.callSid));
}

listMember();
Response



Copy response
{
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Queues/QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Members.json?PageSize=50&Page=0",
  "next_page_uri": null,
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "queue_members": [
    {
      "queue_sid": "QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_enqueued": "Mon, 17 Dec 2018 18:36:39 +0000",
      "position": 1,
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Queues/QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Members/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "wait_time": 124
    }
  ],
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Queues/QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Members.json?PageSize=50&Page=0"
}
Update a Member





POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members/{CallSid}.json

Updating a Member subresource dequeues the member to begin executing the TwiML document at that URL.

You can address the member to dequeue by its unique CallSid or by the Front sid.

If you successfully dequeue a member by its unique CallSid, it will no longer be queued so a second update action on that same member will fail.

When dequeueing a member by using the Front SID, that member will be dequeued and the next member in the queue will take its place.

Path parameters





Property nameTypeRequiredPIIDescription
accountSid
SID<AC>
required
Not PII
The SID of the Account that created the Member resource(s) to update.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
queueSid
SID<QU>
required
Not PII
The SID of the Queue in which to find the members to update.

Pattern:
^QU[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
callSid
string
required
Not PII
The Call SID of the resource(s) to update.

Request body parameters





Encoding type:application/x-www-form-urlencoded
Schema
Example
Property nameTypeRequiredPIIDescriptionChild properties
url
string<uri>
required
Not PII
The absolute URL of the Queue resource.

method
enum<http-method>
Optional
Not PII
How to pass the update request data. Can be GET or POST and the default is POST. POST sends the data as encoded form data and GET sends the data as query parameters.

Possible values:
GET
POST
Update a Member





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateMember() {
  const member = await client
    .queues("QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .members("CallSid")
    .update({ url: "https://www.example.com" });

  console.log(member.callSid);
}

updateMember();
Response



Copy response
{
  "queue_sid": "QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CallSid",
  "date_enqueued": "Thu, 06 Dec 2018 18:42:47 +0000",
  "position": 1,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Queues/QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Members/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "wait_time": 143
}
Update a Member at the front of the queue





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateMember() {
  const member = await client
    .queues("QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .members("Front")
    .update({ url: "https://www.example.com" });

  console.log(member.callSid);
}

updateMember();
Response



Copy response
{
  "queue_sid": "QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "Front",
  "date_enqueued": "Thu, 06 Dec 2018 18:42:47 +0000",
  "position": 1,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Queues/QUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Members/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "wait_time": 143
}