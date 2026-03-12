# API Reference - Conferences resource - Conference

onferences resource




The Conferences resource allows you to query and manage the state of conferences on your Twilio account.


(information)
Info
Conference rooms are not directly created from the Programmable Voice API.

In order to create a new conference, you must use TwiML's <Dial> verb with the <Conference> noun, or by creating a conference participant using the /Participants API. After a Conference instance has been created, you can access it by using the REST API.

For step-by-step instructions on how to write this TwiML and programmatically handle the conference, check out our guides on how to create conference calls using Twilio's supported SDKs.
Conferences properties





Property nameTypeRequiredPIIDescriptionChild properties
accountSid
SID<AC>
Optional
Not PII
The SID of the Account that created this Conference resource.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
dateCreated
string<date-time-rfc-2822>
Optional
Not PII
The date and time in UTC that this resource was created specified in RFC 2822

 format.

dateUpdated
string<date-time-rfc-2822>
Optional
Not PII
The date and time in UTC that this resource was last updated, specified in RFC 2822

format.

apiVersion
string
Optional
Not PII
The API version used to create this conference.

friendlyName
string
Optional
Not PII
A string that you assigned to describe this conference room. Maximum length is 128 characters.

region
string
Optional
Not PII
A string that represents the Twilio Region where the conference audio was mixed. May be us1, us2, ie1, de1, sg1, br1, au1, and jp1. Basic conference audio will always be mixed in us1. Global Conference audio will be mixed nearest to the majority of participants.

sid
SID<CF>
Optional
Not PII
The unique, Twilio-provided string used to identify this Conference resource.

Pattern:
^CF[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
status
enum<string>
Optional
Not PII
The status of this conference. Can be: init, in-progress, or completed.

Possible values:
init
in-progress
completed
uri
string
Optional
Not PII
The URI of this resource, relative to https://api.twilio.com.

subresourceUris
object<uri-map>
Optional
Not PII
A list of related resources identified by their URIs relative to https://api.twilio.com.

reasonConferenceEnded
enum<string>
Optional
Not PII
The reason why a conference ended. When a conference is in progress, will be null. When conference is completed, can be: conference-ended-via-api, participant-with-end-conference-on-exit-left, participant-with-end-conference-on-exit-kicked, last-participant-kicked, or last-participant-left.

Possible values:
conference-ended-via-api
participant-with-end-conference-on-exit-left
participant-with-end-conference-on-exit-kicked
last-participant-kicked
last-participant-left
callSidEndingConference
SID<CA>
Optional
Not PII
The call SID that caused the conference to end.

Pattern:
^CA[0-9a-fA-F]{32}$
Min length:
34
Max length:
34

(warning)
Warning
You may have many conference instances that share the same friendly_name. Only one of these distinct conferences may be in-progress at any given time. For instance, if you have two separate conferences with the friendly_name of "my-conference" you cannot add participants to one instance while the other is in progress.
Retrieve a Conference





GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Conferences/{Sid}.json


(information)
Info
The recommended way to monitor the state of a Conference and its participants is to use the Conference statusCallback. This webhook callback will be fired when the state of the Conference or a participant changes.

At any time you can use the REST API to query the Conferences resource and Participants subresource, however continuously polling these resources is not recommended.

When fetching conferences after the conference has ended, associated Participants will not be returned. For retrieving conference participants after a conference has ended, see the Conferences resource of the Voice Insights API.
Path parameters





Property nameTypeRequiredPIIDescription
accountSid
SID<AC>
required
Not PII
The SID of the Account that created the Conference resource(s) to fetch.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
sid
SID<CF>
required
Not PII
The Twilio-provided string that uniquely identifies the Conference resource to fetch

Pattern:
^CF[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Retrieve a Conference





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchConference() {
  const conference = await client
    .conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(conference.accountSid);
}

fetchConference();
Response



Copy response
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "date_created": "Fri, 18 Feb 2011 19:26:50 +0000",
  "date_updated": "Fri, 18 Feb 2011 19:27:33 +0000",
  "friendly_name": "AHH YEAH",
  "sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "region": "us1",
  "status": "completed",
  "subresource_uris": {
    "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json"
  },
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "reason_conference_ended": "last-participant-left",
  "call_sid_ending_conference": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
Retrieve a list of Conferences





GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Conferences.json

Read all the conferences within your account.

The list of conferences that we return includes paging information.

Path parameters





Property nameTypeRequiredPIIDescription
accountSid
SID<AC>
required
Not PII
The SID of the Account that created the Conference resource(s) to read.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Query parameters





Property nameTypeRequiredPIIDescription
dateCreated
string<date>
Optional
Not PII
Only include conferences that were created on this date. Specify a date as YYYY-MM-DD in UTC, for example: 2009-07-06, to read only conferences that were created on this date. You can also specify an inequality, such as DateCreated<=YYYY-MM-DD, to read conferences that were created on or before midnight of this date, and DateCreated>=YYYY-MM-DD to read conferences that were created on or after midnight of this date.

dateCreatedBefore
string<date>
Optional
Not PII
Only include conferences that were created on this date. Specify a date as YYYY-MM-DD in UTC, for example: 2009-07-06, to read only conferences that were created on this date. You can also specify an inequality, such as DateCreated<=YYYY-MM-DD, to read conferences that were created on or before midnight of this date, and DateCreated>=YYYY-MM-DD to read conferences that were created on or after midnight of this date.

dateCreatedAfter
string<date>
Optional
Not PII
Only include conferences that were created on this date. Specify a date as YYYY-MM-DD in UTC, for example: 2009-07-06, to read only conferences that were created on this date. You can also specify an inequality, such as DateCreated<=YYYY-MM-DD, to read conferences that were created on or before midnight of this date, and DateCreated>=YYYY-MM-DD to read conferences that were created on or after midnight of this date.

dateUpdated
string<date>
Optional
Not PII
Only include conferences that were last updated on this date. Specify a date as YYYY-MM-DD in UTC, for example: 2009-07-06, to read only conferences that were last updated on this date. You can also specify an inequality, such as DateUpdated<=YYYY-MM-DD, to read conferences that were last updated on or before midnight of this date, and DateUpdated>=YYYY-MM-DD to read conferences that were last updated on or after midnight of this date.

dateUpdatedBefore
string<date>
Optional
Not PII
Only include conferences that were last updated on this date. Specify a date as YYYY-MM-DD in UTC, for example: 2009-07-06, to read only conferences that were last updated on this date. You can also specify an inequality, such as DateUpdated<=YYYY-MM-DD, to read conferences that were last updated on or before midnight of this date, and DateUpdated>=YYYY-MM-DD to read conferences that were last updated on or after midnight of this date.

dateUpdatedAfter
string<date>
Optional
Not PII
Only include conferences that were last updated on this date. Specify a date as YYYY-MM-DD in UTC, for example: 2009-07-06, to read only conferences that were last updated on this date. You can also specify an inequality, such as DateUpdated<=YYYY-MM-DD, to read conferences that were last updated on or before midnight of this date, and DateUpdated>=YYYY-MM-DD to read conferences that were last updated on or after midnight of this date.

friendlyName
string
Optional
Not PII
The string that identifies the Conference resources to read.

status
enum<string>
Optional
Not PII
The status of the resources to read. Can be: init, in-progress, or completed.

Possible values:
init
in-progress
completed
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

Retrieve a list of Conferences





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listConference() {
  const conferences = await client.conferences.list({ limit: 20 });

  conferences.forEach((c) => console.log(c.accountSid));
}

listConference();
Response



Copy response
{
  "conferences": [
    {
      "status": "in-progress",
      "region": "jp1",
      "sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_updated": "Fri, 03 Jul 2020 11:23:45 +0000",
      "date_created": "Fri, 03 Jul 2020 11:23:45 +0000",
      "subresource_uris": {
        "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json"
      },
      "friendly_name": "friendly_name",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "api_version": "2010-04-01",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason_conference_ended": null,
      "call_sid_ending_conference": null
    },
    {
      "status": "in-progress",
      "region": "de1",
      "sid": "CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      "date_updated": "Thu, 02 Jul 2020 11:23:45 +0000",
      "date_created": "Thu, 02 Jul 2020 11:23:45 +0000",
      "subresource_uris": {
        "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb/Participants.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb/Recordings.json"
      },
      "friendly_name": "MyRoom",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.json",
      "api_version": "2010-04-01",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason_conference_ended": null,
      "call_sid_ending_conference": null
    },
    {
      "status": "completed",
      "region": "br1",
      "sid": "CFcccccccccccccccccccccccccccccccc",
      "date_updated": "Wed, 01 Jul 2020 11:23:45 +0000",
      "date_created": "Wed, 01 Jul 2020 11:23:45 +0000",
      "subresource_uris": {
        "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFcccccccccccccccccccccccccccccccc/Participants.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFcccccccccccccccccccccccccccccccc/Recordings.json"
      },
      "friendly_name": "FRIEND",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFcccccccccccccccccccccccccccccccc.json",
      "api_version": "2010-04-01",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason_conference_ended": "participant-with-end-conference-on-exit-left",
      "call_sid_ending_conference": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json?PageSize=3&Page=0",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json?PageSize=3&Page=1&PageToken=PACFcccccccccccccccccccccccccccccccc",
  "previous_page_uri": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json?PageSize=3&Page=0",
  "page": 0,
  "page_size": 3,
  "start": 0,
  "end": 2
}
Retrieve a list of Conferences that started on a specific date





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listConference() {
  const conferences = await client.conferences.list({
    dateCreated: "2020-07-07",
    limit: 20,
  });

  conferences.forEach((c) => console.log(c.accountSid));
}

listConference();
Response



Copy response
{
  "conferences": [
    {
      "status": "in-progress",
      "region": "jp1",
      "sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_updated": "Tue, 07 Jul 2020 11:23:45 +0000",
      "date_created": "Tue, 07 Jul 2020 11:23:45 +0000",
      "subresource_uris": {
        "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json"
      },
      "friendly_name": "friendly_name",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "api_version": "2010-04-01",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason_conference_ended": null,
      "call_sid_ending_conference": null
    },
    {
      "status": "in-progress",
      "region": "de1",
      "sid": "CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      "date_updated": "Tue, 07 Jul 2020 11:23:45 +0000",
      "date_created": "Tue, 07 Jul 2020 11:23:45 +0000",
      "subresource_uris": {
        "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb/Participants.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb/Recordings.json"
      },
      "friendly_name": "MyRoom",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.json",
      "api_version": "2010-04-01",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason_conference_ended": null,
      "call_sid_ending_conference": null
    },
    {
      "status": "completed",
      "region": "br1",
      "sid": "CFcccccccccccccccccccccccccccccccc",
      "date_updated": "Tue, 07 Jul 2020 11:23:45 +0000",
      "date_created": "Tue, 07 Jul 2020 11:23:45 +0000",
      "subresource_uris": {
        "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFcccccccccccccccccccccccccccccccc/Participants.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFcccccccccccccccccccccccccccccccc/Recordings.json"
      },
      "friendly_name": "FRIEND",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFcccccccccccccccccccccccccccccccc.json",
      "api_version": "2010-04-01",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason_conference_ended": "participant-with-end-conference-on-exit-left",
      "call_sid_ending_conference": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json?DateCreated=2020-07-07&PageSize=3&Page=0",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json?DateCreated=2020-07-07&PageSize=3&Page=1&PageToken=PACFcccccccccccccccccccccccccccccccc",
  "previous_page_uri": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json?DateCreated=2020-07-07&PageSize=3&Page=0",
  "page": 0,
  "page_size": 3,
  "start": 0,
  "end": 2
}
Retrieve a list of in-progress Conferences that were created on or after a specific date





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listConference() {
  const conferences = await client.conferences.list({
    dateCreated: "2021-01-01",
    status: "in-progress",
    limit: 20,
  });

  conferences.forEach((c) => console.log(c.accountSid));
}

listConference();
Response



Copy response
{
  "conferences": [
    {
      "status": "in-progress",
      "region": "jp1",
      "sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_updated": "Fri, 01 Jan 2021 11:23:45 +0000",
      "date_created": "Fri, 01 Jan 2021 11:23:45 +0000",
      "subresource_uris": {
        "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json"
      },
      "friendly_name": "friendly_name",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "api_version": "2010-04-01",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason_conference_ended": null,
      "call_sid_ending_conference": null
    },
    {
      "status": "in-progress",
      "region": "de1",
      "sid": "CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      "date_updated": "Fri, 01 Jan 2021 11:23:45 +0000",
      "date_created": "Fri, 01 Jan 2021 11:23:45 +0000",
      "subresource_uris": {
        "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb/Participants.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb/Recordings.json"
      },
      "friendly_name": "MyRoom",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.json",
      "api_version": "2010-04-01",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason_conference_ended": null,
      "call_sid_ending_conference": null
    },
    {
      "status": "in-progress",
      "region": "br1",
      "sid": "CFcccccccccccccccccccccccccccccccc",
      "date_updated": "Fri, 01 Jan 2021 11:23:45 +0000",
      "date_created": "Fri, 01 Jan 2021 11:23:45 +0000",
      "subresource_uris": {
        "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFcccccccccccccccccccccccccccccccc/Participants.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFcccccccccccccccccccccccccccccccc/Recordings.json"
      },
      "friendly_name": "FRIEND",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFcccccccccccccccccccccccccccccccc.json",
      "api_version": "2010-04-01",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason_conference_ended": null,
      "call_sid_ending_conference": null
    }
  ],
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json?Status=in-progress&DateCreated%3E=2021-01-01&PageSize=20&Page=0",
  "next_page_uri": null,
  "previous_page_uri": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json?Status=in-progress&DateCreated%3E=2021-01-01&PageSize=20&Page=0",
  "page": 0,
  "page_size": 20,
  "start": 0,
  "end": 2
}
Retrieve a list of Conferences named 'MyRoom'





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listConference() {
  const conferences = await client.conferences.list({
    friendlyName: "MyRoom",
    limit: 20,
  });

  conferences.forEach((c) => console.log(c.accountSid));
}

listConference();
Response



Copy response
{
  "conferences": [
    {
      "status": "in-progress",
      "region": "jp1",
      "sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_updated": "Sun, 03 Jan 2021 11:23:45 +0000",
      "date_created": "Sun, 03 Jan 2021 11:23:45 +0000",
      "subresource_uris": {
        "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json"
      },
      "friendly_name": "MyRoom",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "api_version": "2010-04-01",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason_conference_ended": null,
      "call_sid_ending_conference": null
    },
    {
      "status": "completed",
      "region": "us1",
      "sid": "CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      "date_updated": "Sat, 02 Jan 2021 11:23:45 +0000",
      "date_created": "Sat, 02 Jan 2021 11:23:45 +0000",
      "subresource_uris": {
        "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb/Participants.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb/Recordings.json"
      },
      "friendly_name": "MyRoom",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.json",
      "api_version": "2010-04-01",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason_conference_ended": "last-participant-left",
      "call_sid_ending_conference": "CAbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
    },
    {
      "status": "completed",
      "region": "ie1",
      "sid": "CFcccccccccccccccccccccccccccccccc",
      "date_updated": "Fri, 01 Jan 2021 11:23:45 +0000",
      "date_created": "Fri, 01 Jan 2021 11:23:45 +0000",
      "subresource_uris": {
        "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFcccccccccccccccccccccccccccccccc/Participants.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFcccccccccccccccccccccccccccccccc/Recordings.json"
      },
      "friendly_name": "MyRoom",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFcccccccccccccccccccccccccccccccc.json",
      "api_version": "2010-04-01",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason_conference_ended": "last-participant-left",
      "call_sid_ending_conference": "CAcccccccccccccccccccccccccccccccc"
    }
  ],
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json?FriendlyName=MyRoom&PageSize=20&Page=0",
  "next_page_uri": null,
  "previous_page_uri": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json?FriendlyName=MyRoom&PageSize=20&Page=0",
  "page": 0,
  "page_size": 20,
  "start": 0,
  "end": 2
}
Update a Conference





POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Conferences/{Sid}.json

You can use the update action to change the conference's properties as well as to end the conference.

Path parameters





Property nameTypeRequiredPIIDescription
accountSid
SID<AC>
required
Not PII
The SID of the Account that created the Conference resource(s) to update.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
sid
string
required
Not PII
The Twilio-provided string that uniquely identifies the Conference resource to update

Request body parameters





Encoding type:application/x-www-form-urlencoded
Schema
Example
Property nameTypeRequiredPIIDescriptionChild properties
status
enum<string>
Optional
Not PII
Possible values:
completed
announceUrl
string<uri>
Optional
Not PII
The URL we should call to announce something into the conference. The URL may return an MP3 file, a WAV file, or a TwiML document that contains <Play>, <Say>, <Pause>, or <Redirect> verbs.

announceMethod
enum<http-method>
Optional
Not PII
The HTTP method used to call announce_url. Can be: GET or POST and the default is POST

Possible values:
GET
POST
Update a Conference: End the conference





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateConference() {
  const conference = await client
    .conferences("Sid")
    .update({ status: "completed" });

  console.log(conference.accountSid);
}

updateConference();
Response



Copy response
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "date_created": "Mon, 22 Aug 2011 20:58:45 +0000",
  "date_updated": "Mon, 22 Aug 2011 20:58:46 +0000",
  "friendly_name": null,
  "region": "us1",
  "sid": "Sid",
  "status": "completed",
  "subresource_uris": {
    "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json"
  },
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "reason_conference_ended": "conference-ended-via-api",
  "call_sid_ending_conference": null
}
Update a Conference: Announce to the Conference





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateConference() {
  const conference = await client
    .conferences("Sid")
    .update({ announceUrl: "http://www.myapp.com/announce" });

  console.log(conference.accountSid);
}

updateConference();
Response



Copy response
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "date_created": "Mon, 08 Feb 2021 20:58:45 +0000",
  "date_updated": "Mon, 08 Feb 2021 20:58:46 +0000",
  "friendly_name": "MyRoom",
  "region": "us1",
  "sid": "Sid",
  "status": "in-progress",
  "subresource_uris": {
    "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json"
  },
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "reason_conference_ended": null,
  "call_sid_ending_conference": null
}
Manage conference participants





Each Conference resource has a Participant subresource. Participants represent the set of people currently connected to a running conference.

You can retrieve a list of Participants from a given Conference by requesting the following:



Copy code block
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json
Learn more about Participants subresource and how to manage them.

Conference recordings





You can access the Recordings subresource on any given Conference resource.

The following will return a list of all of the recordings generated for a given conference, identified by its ConferenceSid. (Note that recordings associated with an individual call leg of the conference will not be returned.)



Copy code block
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings.json
Learn more about Recordings.

Conference Log Retention





Starting on February 5, 2021 you will be able to retrieve resources via GET to the /Conferences and /Participants endpoints for thirteen months after the resource is created. This represents a significant change as these logs are currently stored indefinitely by Twilio and retrievable via Console and API.

It's important to note that we are not deleting your logs, just changing where they will be available to you. We provide a Bulk Export utility in Console for Conferences

 and Participant

 resources, as well as an API. Bulk Export will generate S3 files containing one day of data per file and deliver the download link via webhook, email, or Console. Records older than thirteen months will only be able to be retrieved via Bulk Export.

If you perform log extraction via API on a rolling basis, it is important to verify that you are pulling the logs at a frequency that will remain unaffected by this change.

Tips and best practices





Long audio files for conference announcements delay playback. For example, a 25-minute file can take about 13–15 seconds to begin after you send the API request.
Conference announcements that are 30 minutes or longer can trigger a request timeout and cause the announcement to fail. When this happens, the conference and all calls stay connected, but participants hear "An application error has occurred." The 30-minute limit is approximate. Factors such as file size, HTTP method, and your server's processing or response time can also cause timeouts.
For announcements longer than 30 minutes, divide the audio into shorter segments and play them sequentially.