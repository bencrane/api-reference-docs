# Troubleshoot Call Issues with Voice Mobile SDK PreflightTest

The PreflightTest for Voice Mobile SDKs allows you to anticipate and troubleshoot end users' connectivity and bandwidth issues before or during Twilio Voice calls.

You can run a PreflightTest before a mobile Twilio Voice call. The PreflightTest performs a test call to Twilio and provides a JSON-serialized report at the end. The report includes information about the end user's network connection (including jitter, packet loss, and round trip time) and connection settings.

## Prerequisites

Before running the PreflightTest, complete the following tasks:

- Set up a backend application that can generate TwiML to handle incoming phone calls from the PreflightTest. You can do this using TwiML Bins. The app should be able to record audio from a microphone or an audio file and play it back to the browser.
- Generate a Twilio Access Token.

## Create TwiML Bins to record and playback the PreflightTest call

The PreflightTest API requires a server-side application that can record audio from a microphone or an audio file and play the recorded audio back to the browser. This is how the PreflightTest verifies your connection to Twilio and the end user's network quality.

To accomplish this via a TwiML App, you need two TwiML endpoints: one to capture and record the audio, and another one to play the recorded audio.

This example uses TwiML Bins, which are serverless functions that Twilio hosts where you can provide TwiML instructions for the TwiML app.

### Create a TwiML Bin for playback

1. Go to **TwiML Bins > My TwiML Bins** in the Twilio Console.
2. To create a new TwiML Bin, click **Create new TwiML Bin** or the **+** icon.
3. For **Friendly Name**, enter `Playback`.
4. In the **TwiML** box, paste the following XML:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>You said:</Say>
  <Play loop="1">{{RecordingUrl}}</Play>
  <Say>Now waiting for a few seconds to gather audio performance metrics.</Say>
  <Pause length="3"/>
  <Say>Hanging up now.</Say>
</Response>
```

5. Click **Create**.

This TwiML tells Twilio to do the following when it receives an incoming call:

- Say "You said".
- Play the recording of the call that the PreflightTest makes in the next TwiML Bin.
- Say "Now waiting for a few seconds to gather audio performance metrics."
- Pause for three seconds.
- Say "Hanging up now."

### Create a TwiML Bin for recording

1. Go to **TwiML Bins > My TwiML Bins** in the Twilio Console.
2. Click the **+** icon.
3. For **Friendly Name**, enter `Record`.
4. In the **TwiML** box, paste the following XML. Replace `YOUR_PLAYBACK_BIN_URL` with the URL of the Playback TwiML bin.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Record a message in 3, 2, 1</Say>
  <Record maxLength="5" action="YOUR_PLAYBACK_BIN_URL"></Record>
  <Say>Did not detect a message to record</Say>
</Response>
```

5. Click **Create**.

This TwiML tells Twilio to do the following when it receives an incoming call:

- Say "Record a message in 3, 2, 1."
- Record the call for five seconds and then make an HTTP request to your Playback TwiML Bin's URL, which will run the TwiML you created in the step above.
- Twilio's request to your Playback TwiML Bin includes a `RecordingUrl` parameter, which the Playback TwiML Bin uses to play the recording of this call.
- Say "Did not detect a message to record" if the step above doesn't occur.

## Create a TwiML Application

Now that you have created the two TwiML Bins to record and playback a Voice call, create a TwiML app to connect the TwiML Bin to a Twilio phone number.

1. Go to the **TwiML Apps** page of the Twilio Console.
2. Click **Create new TwiML App**.
3. Enter a friendly name for the application, such as "PreflightTest".
4. For the **Request URL** under **Voice Configuration**, enter the Record TwiML Bin's URL that you created in the previous section.
5. Click **Create**.
6. Click the name of your new TwiML app.
7. Make a note of the value in the **TwiML App SID** box.

## Generate an Access Token for the PreflightTest

To generate an Access Token, follow the instructions on this page for creating a Voice Access Token. Substitute the `outgoingApplicationSid` value with your new TwiML App's SID. Then, you can use the generated Access Token to make PreflightTest calls.

When the PreflightTest initiates a call using the Access Token, Twilio makes an HTTP request to the TwiML App that you associated with the token. That TwiML App then runs the TwiML Bins you created to record and playback the call.

## Run a PreflightTest

Below is an example of creating a PreflightTest in the iOS, Android, and React Native SDKs and listening for the events that the test emits.

> **Info**
> Don't instantiate a `TVOPreflightTest` (iOS), `PreflightTest` (Android), or `PreflightTest` (React Native) instance directly. Instead, the SDK returns a PreflightTest object when you call `runPreflightTestWithAccessToken` (iOS), `runPreflight` (Android), or `Voice.runPreflight` (React Native).

### iOS SDK

```swift
class ViewController: UIViewController {
    var preflightTest: PreflightTest? = nil

    func performPreflight() {
        let preflightOptions = PreflightOptions(accessToken: accessToken, block: { builder in
            builder.preferredAudioCodecs = [OpusCodec()]
        })

        preflightTest = TwilioVoiceSDK.runPreflightTest(options: preflightOptions, delegate: self)
    }
}

extension ViewController: PreflightDelegate {
    func preflightDidComplete(preflightTest: PreflightTest, report: PreflightReport) {
        // Check the result in the report
    }

    func preflightDidFail(preflightTest: PreflightTest, error: any Error) {
        // Check the failure reason in the error
    }

    func preflightDidConnect(preflightTest: PreflightTest) {
        // preflight test has connected
    }
}
```

You need an Access Token and a Voice application (either a TwiML app or your own backend server that generates TwiML) to initiate the test call. The endpoint you've configured in your Voice application for the test call should be able to record audio from a microphone and play it back to the browser.

See Create a TwiML App and Access Token for the PreflightTest for an example application that can handle the PreflightTest test call and more information.

## Test events

The PreflightTest emits the following events that your frontend application can listen for:

- completedEvent
- connectedEvent
- failedEvent
- sampleEvent
- warningEvent

### completedEvent

Raised when the PreflightTest has successfully completed and the TestFlight object's status has transitioned to completed. It provides a JSON-serialized report object. This event does not occur if the test encountered a fatal error.

The following code shows how to listen for this event.

**iOS SDK:**

```swift
preflightDidComplete(preflightTest:report:)
```

The event passes the completed JSON-serialized report to the event listener.

See the Report section below to view an example of this completed report.

### connectedEvent

Raised when the PreflightTest has transitioned to the connected state. This indicates that the connection to Twilio has been established.

The following code shows how to listen for this event.

**iOS SDK:**

```swift
preflightDidConnect(preflightTest:)
```

### failedEvent

Raised when the Preflight test has failed. This happens the test cannot establish a connection to Twilio, a test call encounters a fatal error, or `stop()` is called while the test is in progress. It passes an error object to the event handler.

The following code shows how to listen for this event. The event passes the error to the event listener.

**iOS SDK:**

```swift
preflightDidFail(preflightTest:error:)
```

### sampleEvent

Raised when the test call gets a WebRTC sample object. The test publishes this event every second.

The following code shows how to listen for this event. The event passes the test stats to the event listener.

**iOS SDK:**

```swift
preflightDidReceiveStatsSample(preflightTest:statsSample:)
```

### warningEvent

Raised whenever the test call encounters a warning, or when a previously raised warning clear. The warnings relate to call or network quality issues.

The following code shows how to listen for this event. The event passes the current set of quality warnings to the event listener, along with a set of previously raised warnings. You can use these two sets to see if there is a new warning or previous warnings have cleared.

**iOS SDK:**

```swift
preflightDidReceiveQualityWarnings(preflightTest:currentWarnings:previousWarnings:)
```

## Method and property reference

### (void) stop

Calling this will result in preflight test to be in `TVOPreflightTestStatusFailed` state and will raise a failed event with an error code 31008 indicating that the call has been cancelled.

### TVOPreflightTest.callSid

The call SID for the preflight test call.

### TVOPreflightTest.startTime

Preflight test start time. Unix timestamp in milliseconds.

### TVOPreflightTest.endTime

Preflight test end time. Unix timestamp in milliseconds.

### TVOPreflightTest.preflightReport

The preflight test report. If accessed when the preflight status is anything other than `TVOPreflightTestStatusCompleted` or `COMPLETED`, an empty report object will be returned.

### TVOPreflightTest.latestSample

Returns the latest stats sample for the preflight test.

### TVOPreflightTest.status

The current state of the preflight test. Below are the possible values for this property.

| Value | Description |
|-------|-------------|
| TVOPreflightTestStatusCompleted | The connection to Twilio has been disconnected and the test call has completed. |
| TVOPreflightTestStatusConnected | The connection to Twilio has been established. |
| TVOPreflightTestStatusConnecting | Connecting to Twilio has started. |
| TVOPreflightTestStatusFailed | The test has stopped and failed. |

## Report

Below is an example report returned to the completed event handler or accessed via `TVOPreflightTest.preflightReport` (iOS), `PreflightTest.getReport()` (Android), or `PreflightTest.getReport()` (React Native). See below for an explanation of the report's fields.

### Android and iOS

```json
{
  "edge":"US_WEST_OREGON",
  "callSid":"CAxxxxx....xxxxxx",
  "selectedIceCandidatePair":{
      "remoteCandidate":{
        "candidateType":"local",
        "transportId":"0",
        "protocol":"udp",
        "networkCost":0,
        "networkId":0,
        "url":"",
        "priority":2130706431,
        "networkType":"Unknown",
        "relatedAddress":"",
        "deleted":false,
        "ip":"168.86.145.92",
        "tcpType":"",
        "isRemote":true,
        "relatedPort":0,
        "port":12074
      },
      "localCandidate":{
        "candidateType":"relay",
        "transportId":"0",
        "protocol":"udp",
        "networkCost":10,
        "networkId":1,
        "url":"turn:global.turn.twilio.com:3478?transport=udp",
        "priority":41820671,
        "networkType":"Wifi",
        "relatedAddress":"0.0.0.0",
        "deleted":false,
        "ip":"54.244.51.46",
        "tcpType":"",
        "isRemote":false,
        "relatedPort":0,
        "port":54397
      }
  },
  "networkStats":{
      "jitter":{
        "average":1.4090909090909092,
        "min":0,
        "max":5
      },
      "mos":{
        "average":4.4161981818181824,
        "min":4.4081799999999998,
        "max":4.4195489999999999
      },
      "rtt":{
        "average":27.454545454545453,
        "min":0,
        "max":40
      }
  },
  "iceCandidates":[
      {
        "candidateType":"relay",
        "transportId":"0",
        "protocol":"udp",
        "networkCost":10,
        "networkId":1,
        "url":"turn:global.turn.twilio.com:3478?transport=udp",
        "priority":41820671,
        "networkType":"Wifi",
        "relatedAddress":"0.0.0.0",
        "deleted":false,
        "ip":"54.244.51.46",
        "tcpType":"",
        "isRemote":false,
        "relatedPort":0,
        "port":54397
      },
      {
        "candidateType":"relay",
        "transportId":"0",
        "protocol":"udp",
        "networkCost":10,
        "networkId":1,
        "url":"turn:global.turn.twilio.com:443?transport=tcp",
        "priority":25042943,
        "networkType":"Wifi",
        "relatedAddress":"0.0.0.0",
        "deleted":false,
        "ip":"54.244.51.46",
        "tcpType":"",
        "isRemote":false,
        "relatedPort":0,
        "port":39989
      }
  ],
  "selectedEdge":"roaming",
  "statsSamples":[
      {
        "packetsReceived":0,
        "rtt":0,
        "audioInputLevel":0,
        "packetsSent":0,
        "timestamp":"1731699119243.266113",
        "jitter":0,
        "mos":4.4081799999999998,
        "audioOutputLevel":0,
        "bytesReceived":0,
        "packetsLost":0,
        "packetsLostFraction":0,
        "codec":"",
        "bytesSent":0
      },
      {
        "packetsReceived":1048,
        "rtt":34,
        "audioInputLevel":36,
        "packetsSent":1026,
        "timestamp":"1731699140337.642090",
        "jitter":1,
        "mos":4.4139400000000002,
        "audioOutputLevel":924,
        "bytesReceived":166942,
        "packetsLost":0,
        "packetsLostFraction":0,
        "codec":"PCMU",
        "bytesSent":164160
      }
  ],
  "callQuality":0,
  "warnings":[
      {
        "values":"0.305590",
        "timestamp":1731699128298,
        "name":"constant-audio-input-level",
        "threshold":"1.000000"
      }
  ],
  "networkTiming":{
      "iceConnection":{
        "endTime":1731699119809,
        "startTime":1731699119090,
        "duration":719
      },
      "preflightTest":{
        "endTime":1731699141306,
        "startTime":1731699117268,
        "duration":24038
      },
      "signaling":{
        "endTime":1731699117884,
        "startTime":1731699117268,
        "duration":616
      },
      "peerConnection":{
        "endTime":1731699119243,
        "startTime":1731699119135,
        "duration":108
      }
  },
  "isTurnRequired":"true",
  "warningsCleared":[
      {
        "name":"constant-audio-output-level",
        "timestamp":1731699132313
      }
  ]
}
```

## Report fields

| Name | Description |
|------|-------------|
| callSid | The Call SID for the test call. |
| edge | The Twilio Edge location that the test call connected to. |
| iceCandidates | An array of WebRTC stats for the ICE candidates gathered when connecting to media. Each item is an RTCIceCandidateStats object which provides information related to an ICE candidate. |
| networkTiming | - **ice**: Measurements for establishing ICE connection. This is measured from ICE connection checking to connected state. See the documentation for RTCPeerConnection.iceConnectionState for more information.<br>- **peerConnection**: Measurements for establishing a Peer Connection. This is measured from PeerConnection connecting to connected state. See the documentation for RTCPeerConnection.connectionState for more information.<br>- **signaling**: Measurements for establishing Signaling connection. This is measured from initiating a connection using device.connect() up to when RTCPeerConnection.signalingState transitions to stable state. See the documentation for RTCPeerConnection.signalingState for more information. |
| statsSamples | WebRTC samples collected during the test. See the object format on the RTCSample Interface reference page. |
| selectedEdge | The edge you set via the TwilioVoiceSDK before placing the call. If you did not explicitly set the edge, it defaults to gll. |
| networkTiming | Timing measurements from the test. Includes millisecond timestamps and duration.<br>- **iceConnection**: How long the ICE connection took to establish.<br>- **preflightTest**: The total duration of the PreflightTest.<br>- **signaling**: How long it took to establish the signaling connection.<br>- **peerConnection**: How long it took to establish the peer connection. |
| warnings | All warnings detected during the test, including warnings that cleared. |
| warningsCleared | Warnings cleared during the test. |
| selectedIceCandidatePair | A WebRTC stats object for the ICE candidate pair used to connect to media, if candidates were selected. Each item is an RTCIceCandidatePairStats object which provides information related to an ICE candidate. |
| isTurnRequired | Whether a TURN server is required to connect to media. This is dependent on the selected ICE candidates, and will be true if either is of type "relay", false if both are of another type, or undefined if there are no selected ICE candidates. |
| callQuality | The quality of the call, determined by the MOS (Mean Opinion Score) of the audio stream. Possible values include:<br>- **0**: If the average mos is over 4.2.<br>- **1**: If the average mos is between 4.1 and 4.2 both inclusive.<br>- **2**: If the average mos is between 3.7 and 4.0 both inclusive.<br>- **3**: If the average mos is between 3.1 and 3.6 both inclusive.<br>- **4**: If the average mos is 3.0 or below. |