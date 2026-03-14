# Recordings Resource

> ⚠️ **Warning**: For customers building HIPAA-compliant workflows with Recordings, we require customers to enforce at least HTTP Authentication. To learn more about building for HIPAA compliance, please visit the [latest requirements](https://www.twilio.com/docs/voice/tutorials/hipaa-compliant-voice-recordings).

> ℹ️ **PCI Compliance**: Call recordings aren't Payment Card Industry (PCI) compliant by default. To use Voice Recordings in a PCI workflow, enable PCI Mode in the Twilio Console. To transcribe voice recordings, use the `<Transcription>` TwiML noun. Native and Marketplace transcriptions aren't available when PCI Mode is enabled.

A Recording resource represents the recording associated with a voice call, conference, or SIP Trunk. Using the Recordings resource, you can fetch, start, stop, pause, resume, and delete voice recordings.

## Starting a Recording

You can start a recording for a call, conference, or trunk in any of the following ways:

- `<Record>` in TwiML
- `<Dial record>` in TwiML
- `<Conference record>` in TwiML
- `Record=true` in an outbound call via the REST API
- Enable recording on an elastic SIP Trunk in the Twilio Console
- POST to Recording resource of an in-progress Call SID
- `<Start><Recording>` in TwiML

After you start a recording, you can pause, resume, or stop it.

---

## Recordings Properties

| Property | Type | Description |
|----------|------|-------------|
| `account_sid` | `SID<AC>` | The SID of the Account that created the Recording resource. Pattern: `^AC[0-9a-fA-F]{32}$` |
| `api_version` | `string` | The API version used during the recording. |
| `call_sid` | `SID<CA>` | The SID of the Call the Recording resource is associated with. This will always refer to the parent leg of a two-leg call. Pattern: `^CA[0-9a-fA-F]{32}$` |
| `conference_sid` | `SID<CF>` | The Conference SID that identifies the conference associated with the recording, if a conference recording. Pattern: `^CF[0-9a-fA-F]{32}$` |
| `date_created` | `string<date-time-rfc-2822>` | The date and time in GMT that the resource was created specified in RFC 2822 format. |
| `date_updated` | `string<date-time-rfc-2822>` | The date and time in GMT that the resource was last updated specified in RFC 2822 format. |
| `start_time` | `string<date-time-rfc-2822>` | The start time of the recording in GMT and in RFC 2822 format. |
| `duration` | `string` | The length of the recording in seconds. |
| `sid` | `SID<RE>` | The unique string that we created to identify the Recording resource. Pattern: `^RE[0-9a-fA-F]{32}$` |
| `price` | `string` | The one-time cost of creating the recording in the `price_unit` currency. |
| `price_unit` | `string` | The currency used in the price property. Example: `USD`. |
| `status` | `enum<string>` | The status of the recording. Possible values: `in-progress`, `paused`, `stopped`, `processing`, `completed`, `absent`, `deleted` |
| `channels` | `integer` | The number of channels in the recording resource. |
| `source` | `enum<string>` | How the recording was created. Possible values: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, `StartConferenceRecordingAPI` |
| `error_code` | `integer` | The error code that describes why the recording is absent. This value is null if the recording status is not absent. |
| `uri` | `string` | The URI of the resource, relative to `https://api.twilio.com`. |
| `encryption_details` | `object` | How to decrypt the recording if it was encrypted using Call Recording Encryption feature. |
| `subresource_uris` | `object<uri-map>` | A list of related resources identified by their relative URIs. |
| `media_url` | `string<uri>` | The URL of the media file associated with this recording resource. |

---

## Create a Recording

```
POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Calls/{CallsSid}/Recordings.json
```

To start a recording on a live call, make a POST request to the Recordings subresource of an in-progress Call. A recording can be as long as the call.

> ⚠️ **Legal Implications of Call Recording**: If you choose to record voice or video calls, you need to comply with certain laws and regulations, including those regarding obtaining consent to record (such as California's Invasion of Privacy Act and similar laws in other jurisdictions). Twilio recommends that you consult with your legal counsel to make sure that you are complying with all applicable laws.

### Path Parameters

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `account_sid` | `SID<AC>` | Required | The SID of the Account that will create the resource. |
| `call_sid` | `SID<CA>` | Required | The SID of the Call to associate the resource with. |

### Request Body Parameters

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `recording_status_callback_event` | `array[string]` | Optional | The recording status events on which we should call the `recording_status_callback` URL. Can be: `in-progress`, `completed`, and `absent`. Default is `completed`. Separate multiple event values with a space. |
| `recording_status_callback` | `string<uri>` | Optional | The URL we should call using the `recording_status_callback_method` on each recording event. |
| `recording_status_callback_method` | `enum<http-method>` | Optional | The HTTP method we should use to call `recording_status_callback`. Can be: `GET` or `POST`. Default is `POST`. |
| `trim` | `string` | Optional | Whether to trim any leading and trailing silence in the recording. Can be: `trim-silence` or `do-not-trim`. Default is `do-not-trim`. |
| `recording_channels` | `string` | Optional | The number of channels used in the recording. Can be: `mono` or `dual`. Default is `mono`. |
| `recording_track` | `string` | Optional | The audio track to record for the call. Can be: `inbound`, `outbound`, or `both`. Default is `both`. |

### RecordingStatusCallback Parameters

Twilio will pass the following parameters with its request to your RecordingStatusCallback URL:

| Parameter | Description |
|-----------|-------------|
| `AccountSid` | The unique identifier of the Account responsible for this recording. |
| `CallSid` | A unique identifier for the call associated with the recording. |
| `RecordingSid` | The unique identifier for the recording. |
| `RecordingUrl` | The URL of the recorded audio. |
| `RecordingStatus` | The status of the recording. Possible values: `in-progress`, `completed`, `absent`. |
| `RecordingDuration` | The length of the recording, in seconds (only provided when RecordingStatus is `completed`). |
| `RecordingChannels` | The number of channels in the final recording file as an integer. Possible values: `1`, `2`. |
| `RecordingStartTime` | The timestamp of when the recording started. |
| `RecordingSource` | The initiation method used to create this recording. For recordings initiated with this API, the value will be `StartCallRecordingAPI`. |
| `RecordingTrack` | The audio track recorded. Possible values: `inbound`, `outbound`, or `both`. |

### Example: Create a Recording on a Live Call

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

recording = client.calls(
    "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).recordings.create()

print(recording.account_sid)
```

**Response:**

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "call_sid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "conference_sid": null,
  "channels": 2,
  "date_created": "Fri, 14 Oct 2016 21:56:34 +0000",
  "date_updated": "Fri, 14 Oct 2016 21:56:34 +0000",
  "start_time": "Fri, 14 Oct 2016 21:56:34 +0000",
  "price": null,
  "price_unit": null,
  "duration": null,
  "sid": "REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "source": "StartCallRecordingAPI",
  "status": "in-progress",
  "error_code": null,
  "encryption_details": null,
  "track": "both",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

### Example: Create a Dual-Channel Recording with RecordingStatusCallback

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

recording = client.calls(
    "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).recordings.create(
    recording_status_callback="https://myapp.com/recording-events",
    recording_status_callback_event=["in-progress completed"],
    recording_channels="dual",
)

print(recording.account_sid)
```

---

## Retrieve a Recording

### Retrieve Recording Metadata

```
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Recordings/{Sid}.json
```

A Recording's metadata can be returned in JSON or XML format:
- For JSON format, append `.json` to the Recording's URI
- For XML format, append `.xml` to the Recording's URI

#### Path Parameters

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `account_sid` | `SID<AC>` | Required | The SID of the Account that created the Recording resource to fetch. |
| `sid` | `SID<RE>` | Required | The Twilio-provided string that uniquely identifies the Recording resource to fetch. |

#### Query Parameters

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `include_soft_deleted` | `boolean` | Optional | A boolean parameter indicating whether to retrieve soft deleted recordings or not. Recordings metadata are kept after deletion for a retention period of 40 days. |

#### Example: Retrieve Recording Metadata in JSON Format

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

recording = client.recordings("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch()

print(recording.account_sid)
```

### Retrieve a Recording's Media File

```
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Recordings/{Sid}.mp3
```

You can fetch a Recording's media file by appending `.wav` or `.mp3` to the Recording's URI.

> ℹ️ It's only possible to fetch a Recording's media file when the Recording's status is `completed` and the media is stored at Twilio.

#### WAV Format

If you omit the extension or use `.wav`, Twilio returns a binary WAV file with MIME type `audio/x-wav`. WAV files have a bitrate of 128kbps.

```
GET https://api.twilio.com/2010-04-01/Accounts/ACXXXXX.../Recordings/RE557ce644e5ab84fa21cc21112e22c485
```

#### MP3 Format

Appending `.mp3` returns a binary MP3 file with MIME type `audio/mpeg`. MP3 files have a bitrate of 32kbps.

```
GET https://api.twilio.com/2010-04-01/Accounts/ACXXXXX.../Recordings/RE557ce644e5ab84fa21cc21112e22c485.mp3
```

### Download Dual-Channel Media File

Call and Conference Recordings are stored at Twilio in dual-channel format by default.

- **For a two-party Call**: The Recording's dual-channel media file contains the audio from each call leg in separate channels.
- **For a Conference**: The Recording's dual-channel media file contains the audio of the first participant that joined the Conference in the first channel and all other audio from the Call mixed in the second channel.

Use the `RequestedChannels` query parameter to specify whether the media file should be downmixed to a single channel or downloaded in its original, dual-channel format.

#### Example: Download MP3 in Dual-Channel Format

```
GET https://api.twilio.com/2010-04-01/Accounts/ACXXXXX.../Recordings/RE557ce644e5ab84fa21cc21112e22c485.mp3?RequestedChannels=2
```

#### Example: Download WAV in Dual-Channel Format

```
GET https://api.twilio.com/2010-04-01/Accounts/ACXXXXX.../Recordings/RE557ce644e5ab84fa21cc21112e22c485.wav?RequestedChannels=2
```

> ⚠️ **Warning**: Attempting to download a dual-channel media file when the dual-channel format is not available results in a 400 Bad Request error. Implement retry logic to handle this—if a request for a dual-channel media file fails, retry with `RequestedChannels=1`.

### Retrieve a Transcription for a Recording

```
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions
```

This returns the set of transcriptions available for the recording identified by `{RecordingSid}`.

---

## Retrieve a List of Recordings

```
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Recordings.json
```

This API call returns a list of Recordings, each representing a recording generated during a call or conference for the given account. The list returned includes paging information.

> ⚠️ **Warning**: The list of Recordings is protected by your account credentials. You must use HTTP basic auth to access the Recordings resource.

You can also get a list of Recordings from a specific call or conference:

```
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings.json
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings.json
```

### Query Parameters

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `date_created` | `string<date-time>` | Optional | Only include recordings that were created on this date. Specify as `YYYY-MM-DD` in GMT. Supports inequalities: `DateCreated<=YYYY-MM-DD` or `DateCreated>=YYYY-MM-DD`. |
| `date_created_before` | `string<date-time>` | Optional | Only include recordings created before this date. |
| `date_created_after` | `string<date-time>` | Optional | Only include recordings created after this date. |
| `call_sid` | `SID<CA>` | Optional | The Call SID of the resources to read. |
| `conference_sid` | `SID<CF>` | Optional | The Conference SID that identifies the conference associated with the recording to read. |
| `include_soft_deleted` | `boolean` | Optional | Whether to retrieve soft deleted recordings. Metadata is kept for 40 days after deletion. |
| `page_size` | `integer<int64>` | Optional | How many resources to return in each list page. Default is 50, maximum is 1000. |
| `page` | `integer` | Optional | The page index. |
| `page_token` | `string` | Optional | The page token provided by the API. |

### Example: Retrieve Recordings for a Call

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

recordings = client.recordings.list(
    call_sid="CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", limit=20
)

for record in recordings:
    print(record.account_sid)
```

### Example: Retrieve Recordings for an Account

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

recordings = client.recordings.list(limit=20)

for record in recordings:
    print(record.account_sid)
```

### Example: Filter Recordings with Exact Date Match

```python
import os
from twilio.rest import Client
from datetime import datetime

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

recordings = client.recordings.list(
    date_created=datetime(2016, 10, 18, 0, 0, 0), limit=20
)

for record in recordings:
    print(record.account_sid)
```

### Example: Filter Recordings with Date Range

```python
import os
from twilio.rest import Client
from datetime import datetime

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

recordings = client.recordings.list(
    date_created_before=datetime(2016, 10, 15, 0, 0, 0),
    date_created_after=datetime(2016, 10, 12, 0, 0, 0),
    limit=20,
)

for record in recordings:
    print(record.account_sid)
```

---

## Update a Recording

```
POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json
POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json
```

An active Call or Conference Recording can be paused and resumed. Additionally, an active call recording can be stopped which will end the recording immediately.

> ℹ️ The `stopped` status isn't supported for conference recordings.

### Path Parameters

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `account_sid` | `SID<AC>` | Required | The SID of the Account that created the Recording resource to update. |
| `call_sid` | `SID<CA>` | Required | The Call SID of the resource to update. |
| `sid` | `string` | Required | The Twilio-provided string that uniquely identifies the Recording resource to update. |

### Request Body Parameters

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `status` | `enum<string>` | Required | The status of the recording. Can be: `in-progress`, `paused`, `stopped`, `processing`, `completed`, `absent`. |
| `pause_behavior` | `string` | Optional | Whether to record during a pause. Can be: `skip` or `silence`. Default is `silence`. `skip` does not record during the pause period, while `silence` replaces the actual audio with silence during the pause. |

> ⚠️ **Note**: API responses for updates will provide more detailed inflight status including `paused`, `in-progress`, or `stopped`, but a fetch on the Recording resource will only show `processing` or `completed`.

### Example: Pause a Call Recording with Skip Option

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call_recording = (
    client.calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .recordings("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update(pause_behavior="skip", status="paused")
)

print(call_recording.account_sid)
```

### Example: Pause a Conference Recording with Skip Option

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

conference_recording = (
    client.conferences("CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .recordings("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update(pause_behavior="skip", status="paused")
)

print(conference_recording.account_sid)
```

### Using Twilio.CURRENT

You can use `Twilio.CURRENT` to reference the currently active recording without requiring an explicit Recording SID. This can be used for pause, resume, or stop actions on calls with only one active recording.

> ⚠️ **Warning**: If your use case has multiple or concurrent recordings for a call or conference, you will need to use the Recording SID. Using `Twilio.CURRENT` on a resource with multiple recordings will result in an error.

### Example: Pause a Call Recording with Twilio.CURRENT

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call_recording = (
    client.calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .recordings("Twilio.CURRENT")
    .update(status="paused")
)

print(call_recording.account_sid)
```

### Example: Resume a Call Recording

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call_recording = (
    client.calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .recordings("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update(status="in-progress")
)

print(call_recording.account_sid)
```

### Example: Stop a Call Recording

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call_recording = (
    client.calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .recordings("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update(status="stopped")
)

print(call_recording.account_sid)
```

---

## Delete a Recording

```
DELETE https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Recordings/{Sid}.json
```

Deletes a recording from your account. Once the recording is deleted:

- You will no longer be billed for storage of those minutes
- The recording is set to a status of `deleted`
- The metadata is preserved for a period of 40 days, during which time the metadata is still visible in the Console and API
- The recording media cannot be recovered

If successful, DELETE returns HTTP 204 (No Content) with no body.

> ℹ️ Only completed recordings can be deleted. Recordings with any other status are not available for deletion.

### Path Parameters

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `account_sid` | `SID<AC>` | Required | The SID of the Account that created the Recording resources to delete. |
| `sid` | `SID<RE>` | Required | The Twilio-provided string that uniquely identifies the Recording resource to delete. |

> ℹ️ To delete a large set of Voice Recordings, you can use the bulk deletion capabilities available in the Twilio Console.

### Example: Delete a Recording

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.recordings("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete()
```