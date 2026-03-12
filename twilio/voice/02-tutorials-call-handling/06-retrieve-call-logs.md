# Retrieve Call Logs with Python

In this guide we'll cover how to retrieve information about in progress and completed calls from your Twilio account.

We'll use Twilio's Python module in these examples to interact with the Twilio REST APIs Calls endpoint.

First, we'll need to get our Twilio account credentials.

## Retrieve your Twilio account credentials

First, you'll need to get your Twilio account credentials. They consist of your AccountSid and your Auth Token. They can be found on the home page of the console.

Twilio Console Dashboard showing account SID and auth token.

With our account credentials, we can then use the Twilio Python module to retrieve our call logs.

## Retrieving call logs

You can use Twilio's REST API to retrieve logs about the phone calls to and from your Twilio account. If you just want to check a couple logs, however, you should try looking at the voice logs in your Twilio console first.

To list all phone calls for your Twilio account, just call client.calls.list().

> **Info**
> The list method automatically handles paging for you, eagerly fetching all records and paging under the hood. For more information, visit the Python SDK page.

### List All Calls Example

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

calls = client.calls.list(limit=20)

for record in calls:
    print(record.sid)
```

**Response**

```json
{
  "calls": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "answered_by": "machine_start",
      "api_version": "2010-04-01",
      "caller_name": "callerid1",
      "date_created": "Fri, 18 Oct 2019 17:00:00 +0000",
      "date_updated": "Fri, 18 Oct 2019 17:01:00 +0000",
      "direction": "outbound-api",
      "duration": "4",
      "end_time": "Fri, 18 Oct 2019 17:03:00 +0000",
      "forwarded_from": "calledvia1",
      "from": "+13051416799",
      "from_formatted": "(305) 141-6799",
      "group_sid": "GPdeadbeefdeadbeefdeadbeefdeadbeef",
      "parent_call_sid": "CAdeadbeefdeadbeefdeadbeefdeadbeef",
      "phone_number_sid": "PNdeadbeefdeadbeefdeadbeefdeadbeef",
      "price": "-0.200",
      "price_unit": "USD",
      "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "start_time": "Fri, 18 Oct 2019 17:02:00 +0000",
      "status": "completed",
      "subresource_uris": {
        "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
        "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Payments.json",
        "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json",
        "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Siprec.json",
        "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams.json",
        "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
        "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions.json",
        "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessages.json"
      },
      "to": "+13051913581",
      "to_formatted": "(305) 191-3581",
      "trunk_sid": "TKdeadbeefdeadbeefdeadbeefdeadbeef",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "queue_time": "1000"
    },
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "answered_by": "human",
      "api_version": "2010-04-01",
      "caller_name": "callerid2",
      "date_created": "Fri, 18 Oct 2019 16:00:00 +0000",
      "date_updated": "Fri, 18 Oct 2019 16:01:00 +0000",
      "direction": "inbound",
      "duration": "3",
      "end_time": "Fri, 18 Oct 2019 16:03:00 +0000",
      "forwarded_from": "calledvia2",
      "from": "+13051416798",
      "from_formatted": "(305) 141-6798",
      "group_sid": "GPdeadbeefdeadbeefdeadbeefdeadbeee",
      "parent_call_sid": "CAdeadbeefdeadbeefdeadbeefdeadbeee",
      "phone_number_sid": "PNdeadbeefdeadbeefdeadbeefdeadbeee",
      "price": "-0.100",
      "price_unit": "JPY",
      "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0",
      "start_time": "Fri, 18 Oct 2019 16:02:00 +0000",
      "status": "completed",
      "subresource_uris": {
        "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Notifications.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Recordings.json",
        "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Payments.json",
        "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Events.json",
        "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Siprec.json",
        "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Streams.json",
        "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Transcriptions.json",
        "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/UserDefinedMessageSubscriptions.json",
        "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/UserDefinedMessages.json"
      },
      "to": "+13051913580",
      "to_formatted": "(305) 191-3580",
      "trunk_sid": "TKdeadbeefdeadbeefdeadbeefdeadbeef",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0.json",
      "queue_time": "1000"
    }
  ],
  "end": 1,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?Status=completed&To=%2B123456789&From=%2B987654321&StartTime=2008-01-02&ParentCallSid=CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EndTime=2009-01-02&PageSize=2&Page=0",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?Status=completed&To=%2B123456789&From=%2B987654321&StartTime=2008-01-02&ParentCallSid=CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EndTime=2009-01-02&PageSize=2&Page=1&PageToken=PACAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0",
  "page": 0,
  "page_size": 2,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?Status=completed&To=%2B123456789&From=%2B987654321&StartTime=2008-01-02&ParentCallSid=CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EndTime=2009-01-02&PageSize=2&Page=0"
}
```

You can also filter the results. This example only returns phone calls to the phone number "+15558675309" which had a call status of "busy" but you can filter on other call properties as well.

### Retrieve Busy Calls To Specific Number Example

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

calls = client.calls.list(to="+15558675310", status="busy", limit=20)

for record in calls:
    print(record.sid)
```

**Response**

```json
{
  "calls": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "answered_by": "machine_start",
      "api_version": "2010-04-01",
      "caller_name": "callerid1",
      "date_created": "Fri, 18 Oct 2019 17:00:00 +0000",
      "date_updated": "Fri, 18 Oct 2019 17:01:00 +0000",
      "direction": "outbound-api",
      "duration": "4",
      "end_time": "Fri, 18 Oct 2019 17:03:00 +0000",
      "forwarded_from": "calledvia1",
      "from": "+13051416799",
      "from_formatted": "(305) 141-6799",
      "group_sid": "GPdeadbeefdeadbeefdeadbeefdeadbeef",
      "parent_call_sid": "CAdeadbeefdeadbeefdeadbeefdeadbeef",
      "phone_number_sid": "PNdeadbeefdeadbeefdeadbeefdeadbeef",
      "price": "-0.200",
      "price_unit": "USD",
      "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "start_time": "Fri, 18 Oct 2019 17:02:00 +0000",
      "status": "completed",
      "subresource_uris": {
        "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
        "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Payments.json",
        "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json",
        "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Siprec.json",
        "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams.json",
        "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
        "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions.json",
        "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessages.json"
      },
      "to": "+13051913581",
      "to_formatted": "(305) 191-3581",
      "trunk_sid": "TKdeadbeefdeadbeefdeadbeefdeadbeef",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "queue_time": "1000"
    },
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "answered_by": "human",
      "api_version": "2010-04-01",
      "caller_name": "callerid2",
      "date_created": "Fri, 18 Oct 2019 16:00:00 +0000",
      "date_updated": "Fri, 18 Oct 2019 16:01:00 +0000",
      "direction": "inbound",
      "duration": "3",
      "end_time": "Fri, 18 Oct 2019 16:03:00 +0000",
      "forwarded_from": "calledvia2",
      "from": "+13051416798",
      "from_formatted": "(305) 141-6798",
      "group_sid": "GPdeadbeefdeadbeefdeadbeefdeadbeee",
      "parent_call_sid": "CAdeadbeefdeadbeefdeadbeefdeadbeee",
      "phone_number_sid": "PNdeadbeefdeadbeefdeadbeefdeadbeee",
      "price": "-0.100",
      "price_unit": "JPY",
      "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0",
      "start_time": "Fri, 18 Oct 2019 16:02:00 +0000",
      "status": "completed",
      "subresource_uris": {
        "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Notifications.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Recordings.json",
        "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Payments.json",
        "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Events.json",
        "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Siprec.json",
        "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Streams.json",
        "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Transcriptions.json",
        "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/UserDefinedMessageSubscriptions.json",
        "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/UserDefinedMessages.json"
      },
      "to": "+13051913580",
      "to_formatted": "(305) 191-3580",
      "trunk_sid": "TKdeadbeefdeadbeefdeadbeefdeadbeef",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0.json",
      "queue_time": "1000"
    }
  ],
  "end": 1,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?Status=completed&To=%2B123456789&From=%2B987654321&StartTime=2008-01-02&ParentCallSid=CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EndTime=2009-01-02&PageSize=2&Page=0",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?Status=completed&To=%2B123456789&From=%2B987654321&StartTime=2008-01-02&ParentCallSid=CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EndTime=2009-01-02&PageSize=2&Page=1&PageToken=PACAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0",
  "page": 0,
  "page_size": 2,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?Status=completed&To=%2B123456789&From=%2B987654321&StartTime=2008-01-02&ParentCallSid=CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EndTime=2009-01-02&PageSize=2&Page=0"
}
```

Finally, if you just want to retrieve information about a specific call you can get that CallSid directly.

### Retrieve Call By Id Example

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call = client.calls("CA42ed11f93dc08b952027ffbc406d0868").fetch()

print(call.to)
```

**Response**

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "answered_by": "machine_start",
  "api_version": "2010-04-01",
  "caller_name": "callerid",
  "date_created": "Fri, 18 Oct 2019 17:00:00 +0000",
  "date_updated": "Fri, 18 Oct 2019 17:01:00 +0000",
  "direction": "outbound-api",
  "duration": "4",
  "end_time": "Fri, 18 Oct 2019 17:03:00 +0000",
  "forwarded_from": "calledvia",
  "from": "+13051416799",
  "from_formatted": "(305) 141-6799",
  "group_sid": "GPdeadbeefdeadbeefdeadbeefdeadbeef",
  "parent_call_sid": "CAdeadbeefdeadbeefdeadbeefdeadbeef",
  "phone_number_sid": "PNdeadbeefdeadbeefdeadbeefdeadbeef",
  "price": "-0.200",
  "price_unit": "USD",
  "sid": "CA42ed11f93dc08b952027ffbc406d0868",
  "start_time": "Fri, 18 Oct 2019 17:02:00 +0000",
  "status": "completed",
  "subresource_uris": {
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Payments.json",
    "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json",
    "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Siprec.json",
    "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions.json",
    "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessages.json"
  },
  "to": "+13051913581",
  "to_formatted": "(305) 191-3581",
  "trunk_sid": "TKdeadbeefdeadbeefdeadbeefdeadbeef",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

## Where to next?

We learned how to retrieve Twilio call logs using Python. Check out our tutorials to see full implementations of Twilio Voice in Python with Flask and Django.

## Need some help?

We all do sometimes; code is hard. Get help now from our support team, or lean on the wisdom of the crowd by browsing the Twilio tag on Stack Overflow.

---

Terms of service
Privacy Policy
Copyright © 2026 Twilio Inc.