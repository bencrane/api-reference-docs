# Twilio Voice React Native SDK - API Reference

> **Package:** `@twilio/voice-react-native-sdk`
> **Source:** https://github.com/twilio/twilio-voice-react-native
> **Purpose:** Provides access to Twilio Programmable Voice for React Native applications running on iOS and Android devices.

---

## Quick Navigation for LLM Agents

This folder contains 738 API documentation files. Use this index to find what you need.

### File Naming Convention

All files follow the pattern: `voice-react-native-sdk.<component>_<type>.md`

- `_class.md` - Class documentation
- `_interface.md` - Interface documentation
- `_namespace.md` - Namespace documentation
- `_enum.md` - Enumeration documentation
- `_typealias.md` - Type alias documentation
- `_method.md` - Method documentation
- `_property.md` - Property documentation
- `_propertysignature.md` - Property signature
- `_methodsignature.md` - Method signature

---

## Core Classes

| Class | File | Description |
|-------|------|-------------|
| **Voice** | `voice-react-native-sdk.voice_class.md` | Main entry-point of the Voice SDK. Provides access to the entire feature-set of the library. |
| **Call** | `voice-react-native-sdk.call_class.md` | Provides access to information about a call, including call parameters, and exposes functionality for disconnecting, muting, and holding. |
| **CallInvite** | `voice-react-native-sdk.callinvite_class.md` | Provides access to information about a call invite, including call parameters, and exposes functionality to accept or decline a call. |
| **AudioDevice** | `voice-react-native-sdk.audiodevice_class.md` | Describes audio devices as reported by the native layer and allows selection of audio devices. |
| **PreflightTest** | `voice-react-native-sdk.preflighttest_class.md` | Allows you to anticipate and troubleshoot end users' connectivity and bandwidth issues before or during Twilio Voice calls. |
| **IncomingCallMessage** | `voice-react-native-sdk.incomingcallmessage_class.md` | (Beta) Provides access to information about a CallMessage including content, content type, message type, and voice event SID. |
| **OutgoingCallMessage** | `voice-react-native-sdk.outgoingcallmessage_class.md` | (Beta) Provides access to information about an outgoing CallMessage. |

---

## Class Methods & Properties

### Voice Class
| Method/Property | File |
|-----------------|------|
| connect() | `voice-react-native-sdk.voice_class.connect_method.md` |
| getAudioDevices() | `voice-react-native-sdk.voice_class.getaudiodevices_method.md` |
| getCalls() | `voice-react-native-sdk.voice_class.getcalls_method.md` |
| getCallInvites() | `voice-react-native-sdk.voice_class.getcallinvites_method.md` |
| getDeviceToken() | `voice-react-native-sdk.voice_class.getdevicetoken_method.md` |
| getVersion() | `voice-react-native-sdk.voice_class.getversion_method.md` |
| initializePushRegistry() | `voice-react-native-sdk.voice_class.initializepushregistry_method.md` |
| register() | `voice-react-native-sdk.voice_class.register_method.md` |
| runPreflight() | `voice-react-native-sdk.voice_class.runpreflight_method.md` |
| setCallKitConfiguration() | `voice-react-native-sdk.voice_class.setcallkitconfiguration_method.md` |
| showNotification() | `voice-react-native-sdk.voice_class.shownotification_method.md` |
| unregister() | `voice-react-native-sdk.voice_class.unregister_method.md` |

### Call Class
| Method/Property | File |
|-----------------|------|
| disconnect() | `voice-react-native-sdk.call_class.disconnect_method.md` |
| getCustomParameters() | `voice-react-native-sdk.call_class.getcustomparameters_method.md` |
| getFrom() | `voice-react-native-sdk.call_class.getfrom_method.md` |
| getInitialConnectedTimestamp() | `voice-react-native-sdk.call_class.getinitialconnectedtimestamp_method.md` |
| getSid() | `voice-react-native-sdk.call_class.getsid_method.md` |
| getState() | `voice-react-native-sdk.call_class.getstate_method.md` |
| getStats() | `voice-react-native-sdk.call_class.getstats_method.md` |
| getTo() | `voice-react-native-sdk.call_class.getto_method.md` |
| hold() | `voice-react-native-sdk.call_class.hold_method.md` |
| isMuted() | `voice-react-native-sdk.call_class.ismuted_method.md` |
| isOnHold() | `voice-react-native-sdk.call_class.isonhold_method.md` |
| mute() | `voice-react-native-sdk.call_class.mute_method.md` |
| postFeedback() | `voice-react-native-sdk.call_class.postfeedback_method.md` |
| sendDigits() | `voice-react-native-sdk.call_class.senddigits_method.md` |
| sendMessage() | `voice-react-native-sdk.call_class.sendmessage_method.md` |

### CallInvite Class
| Method/Property | File |
|-----------------|------|
| accept() | `voice-react-native-sdk.callinvite_class.accept_method.md` |
| getCallSid() | `voice-react-native-sdk.callinvite_class.getcallsid_method.md` |
| getCustomParameters() | `voice-react-native-sdk.callinvite_class.getcustomparameters_method.md` |
| getFrom() | `voice-react-native-sdk.callinvite_class.getfrom_method.md` |
| getState() | `voice-react-native-sdk.callinvite_class.getstate_method.md` |
| getTo() | `voice-react-native-sdk.callinvite_class.getto_method.md` |
| reject() | `voice-react-native-sdk.callinvite_class.reject_method.md` |
| sendMessage() | `voice-react-native-sdk.callinvite_class.sendmessage_method.md` |
| updateCallerHandle() | `voice-react-native-sdk.callinvite_class.updatecallerhandle_method.md` |

### AudioDevice Class
| Method/Property | File |
|-----------------|------|
| name | `voice-react-native-sdk.audiodevice_class.name_property.md` |
| select() | `voice-react-native-sdk.audiodevice_class.select_method.md` |
| type | `voice-react-native-sdk.audiodevice_class.type_property.md` |

---

## Interfaces

| Interface | File | Description |
|-----------|------|-------------|
| Call | `voice-react-native-sdk.call_interface.md` | Defines strict typings for all events emitted by Call objects. |
| CallInvite | `voice-react-native-sdk.callinvite_interface.md` | Defines strict typings for all events emitted by CallInvite objects. |
| CallMessage | `voice-react-native-sdk.callmessage_interface.md` | The constituent values of a Call Message. |
| OutgoingCallMessage | `voice-react-native-sdk.outgoingcallmessage_interface.md` | Defines strict typings for all events emitted by OutgoingCallMessage objects. |
| PreflightTest | `voice-react-native-sdk.preflighttest_interface.md` | Events for PreflightTest. |
| Voice | `voice-react-native-sdk.voice_interface.md` | Defines strict typings for all events emitted by Voice objects. |

---

## Namespaces

| Namespace | File | Description |
|-----------|------|-------------|
| AudioDevice | `voice-react-native-sdk.audiodevice_namespace.md` | Contains interfaces and enumerations associated with audio devices. |
| Call | `voice-react-native-sdk.call_namespace.md` | Namespace for enumerations and types used by Call objects. |
| CallInvite | `voice-react-native-sdk.callinvite_namespace.md` | Provides enumerations and types used by CallInvite objects. |
| CallKit | `voice-react-native-sdk.callkit_namespace.md` | CallKit related types (iOS). |
| OutgoingCallMessage | `voice-react-native-sdk.outgoingcallmessage_namespace.md` | Namespace for enumerations and types used by OutgoingCallMessage objects. |
| PreflightTest | `voice-react-native-sdk.preflighttest_namespace.md` | Helper types for the PreflightTest class. |
| RTCStats | `voice-react-native-sdk.rtcstats_namespace.md` | Types related to WebRTC stats. |
| TwilioErrors | `voice-react-native-sdk.twilioerrors_namespace.md` | Error types and codes. |
| Voice | `voice-react-native-sdk.voice_namespace.md` | Provides enumerations and types used by Voice objects. |

---

## Enumerations

### Top-Level Enums
| Enum | File | Description |
|------|------|-------------|
| AudioCodecType | `voice-react-native-sdk.audiocodectype_enum.md` | Available audio codecs (PCMU, Opus). |
| IceTransportPolicy | `voice-react-native-sdk.icetransportpolicy_enum.md` | ICE transport policy options. |

### Call Namespace Enums
| Enum | File | Description |
|------|------|-------------|
| Call.Event | `voice-react-native-sdk.call_namespace.event_enum.md` | Call events (Connected, ConnectFailure, Disconnected, etc.). |
| Call.State | `voice-react-native-sdk.call_namespace.state_enum.md` | Call states (Connecting, Ringing, Connected, Reconnecting, Disconnected). |
| Call.QualityWarning | `voice-react-native-sdk.call_namespace.qualitywarning_enum.md` | Quality warning types. |
| Call.Score | `voice-react-native-sdk.call_namespace.score_enum.md` | Call quality scores (1-5). |
| Call.Issue | `voice-react-native-sdk.call_namespace.issue_enum.md` | Call issue types for feedback. |

### CallInvite Namespace Enums
| Enum | File | Description |
|------|------|-------------|
| CallInvite.Event | `voice-react-native-sdk.callinvite_namespace.event_enum.md` | CallInvite events. |
| CallInvite.State | `voice-react-native-sdk.callinvite_namespace.state_enum.md` | CallInvite states. |

### Voice Namespace Enums
| Enum | File | Description |
|------|------|-------------|
| Voice.Event | `voice-react-native-sdk.voice_namespace.event_enum.md` | Voice events (CallInvite, AudioDevicesUpdated, etc.). |

### AudioDevice Namespace Enums
| Enum | File | Description |
|------|------|-------------|
| AudioDevice.Type | `voice-react-native-sdk.audiodevice_namespace.type_enum.md` | Audio device types (Earpiece, Speaker, Bluetooth). |

### PreflightTest Namespace Enums
| Enum | File | Description |
|------|------|-------------|
| PreflightTest.Event | `voice-react-native-sdk.preflighttest_namespace.event_enum.md` | PreflightTest events. |
| PreflightTest.State | `voice-react-native-sdk.preflighttest_namespace.state_enum.md` | PreflightTest states. |
| PreflightTest.CallQuality | `voice-react-native-sdk.preflighttest_namespace.callquality_enum.md` | Call quality levels. |

### CallKit Namespace Enums
| Enum | File | Description |
|------|------|-------------|
| CallKit.HandleType | `voice-react-native-sdk.callkit_namespace.handletype_enum.md` | CallKit handle types. |

---

## Type Aliases

| Type | File | Description |
|------|------|-------------|
| AudioCodec | `voice-react-native-sdk.audiocodec_typealias.md` | The type of an audio codec. |
| CustomParameters | `voice-react-native-sdk.customparameters_typealias.md` | Call custom parameters. |
| IceServer | `voice-react-native-sdk.iceserver_typealias.md` | ICE server configuration. |
| OpusAudioCodec | `voice-react-native-sdk.opusaudiocodec_typealias.md` | Configuration for Opus audio codec. |
| PCMUAudioCodec | `voice-react-native-sdk.pcmuaudiocodec_typealias.md` | Configuration for PCMU audio codec. |
| Voice.ConnectOptions | `voice-react-native-sdk.voice_namespace.connectoptions_typealias.md` | Options for Voice.connect(). |
| CallKit.ConfigurationOptions | `voice-react-native-sdk.callkit_namespace.configurationoptions_typealias.md` | CallKit configuration options. |

---

## Event Listeners

### Voice Events
| Listener | File |
|----------|------|
| AudioDevicesUpdated | `voice-react-native-sdk.voice_namespace.listener_namespace.audiodevicesupdated_typealias.md` |
| CallInvite | `voice-react-native-sdk.voice_namespace.listener_namespace.callinvite_typealias.md` |
| Error | `voice-react-native-sdk.voice_namespace.listener_namespace.error_typealias.md` |
| Registered | `voice-react-native-sdk.voice_namespace.listener_namespace.registered_typealias.md` |
| Unregistered | `voice-react-native-sdk.voice_namespace.listener_namespace.unregistered_typealias.md` |

### Call Events
| Listener | File |
|----------|------|
| Connected | `voice-react-native-sdk.call_namespace.listener_namespace.connected_typealias.md` |
| ConnectFailure | `voice-react-native-sdk.call_namespace.listener_namespace.connectfailure_typealias.md` |
| Disconnected | `voice-react-native-sdk.call_namespace.listener_namespace.disconnected_typealias.md` |
| Reconnecting | `voice-react-native-sdk.call_namespace.listener_namespace.reconnecting_typealias.md` |
| Reconnected | `voice-react-native-sdk.call_namespace.listener_namespace.reconnected_typealias.md` |
| Ringing | `voice-react-native-sdk.call_namespace.listener_namespace.ringing_typealias.md` |
| QualityWarningsChanged | `voice-react-native-sdk.call_namespace.listener_namespace.qualitywarningschanged_typealias.md` |
| MessageReceived | `voice-react-native-sdk.call_namespace.listener_namespace.messagereceived_typealias.md` |

### CallInvite Events
| Listener | File |
|----------|------|
| Accepted | `voice-react-native-sdk.callinvite_namespace.listener_namespace.accepted_typealias.md` |
| Rejected | `voice-react-native-sdk.callinvite_namespace.listener_namespace.rejected_typealias.md` |
| Cancelled | `voice-react-native-sdk.callinvite_namespace.listener_namespace.cancelled_typealias.md` |
| NotificationTapped | `voice-react-native-sdk.callinvite_namespace.listener_namespace.notificationtapped_typealias.md` |
| MessageReceived | `voice-react-native-sdk.callinvite_namespace.listener_namespace.messagereceived_typealias.md` |

---

## Error Handling

See namespace: `voice-react-native-sdk.twilioerrors_namespace.md`

Key error files:
- `voice-react-native-sdk.twilioerrors_namespace.twilioerror_class.md` - Base error class
- `voice-react-native-sdk.twilioerrors_namespace.errorcode_enum.md` - Error codes

---

## WebRTC Stats

See namespace: `voice-react-native-sdk.rtcstats_namespace.md`

Key types:
- `voice-react-native-sdk.rtcstats_namespace.statsreport_interface.md` - Stats report structure
- `voice-react-native-sdk.rtcstats_namespace.icecandidatepairstate_enum.md` - ICE candidate pair states

---

## Common Usage Patterns

### Making an Outbound Call
1. Initialize Voice SDK
2. Register for push notifications: `voice.register(accessToken)`
3. Connect: `voice.connect(accessToken, options)`
4. Handle Call events (Connected, Disconnected, etc.)

### Receiving Inbound Calls
1. Initialize Voice SDK with CallKit configuration (iOS)
2. Listen for `Voice.Event.CallInvite`
3. Accept or reject the CallInvite
4. Handle Call events

### Audio Device Management
1. Get available devices: `voice.getAudioDevices()`
2. Select device: `audioDevice.select()`
3. Listen for `Voice.Event.AudioDevicesUpdated`

---

## File Listing by Category

To find all files for a specific component, use glob patterns:

```
# All Call-related files
voice-react-native-sdk.call_*

# All Voice class methods
voice-react-native-sdk.voice_class.*_method.md

# All enums
voice-react-native-sdk.*_enum.md

# All interfaces
voice-react-native-sdk.*_interface.md
```

---

## Total Files: 738

This documentation was fetched from the official Twilio GitHub repository:
https://github.com/twilio/twilio-voice-react-native/tree/latest/docs/api
