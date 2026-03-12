# Twilio Voice iOS SDK - API Reference

> **Package:** TwilioVoice (CocoaPods/SPM)
> **Source:** https://github.com/twilio/twilio-voice-ios
> **Docs:** https://twilio.github.io/twilio-voice-ios/docs/latest/
> **Purpose:** Enables VoIP calling capabilities in iOS applications.

---

## Installation

### Swift Package Manager (Recommended)
Add `https://github.com/twilio/twilio-voice-ios` as a Swift Package.
- Choose `TwilioVoice` for dynamic framework
- Choose `TwilioVoice-static` for static framework

### CocoaPods
```ruby
pod 'TwilioVoice', '~> 6.13'
# or for static:
pod 'TwilioVoice-static', '~> 6.13'
```

---

## Quick Navigation for LLM Agents

### File Structure

| File | Description |
|------|-------------|
| `00-index.md` | This overview file |
| `01-twiliovoicesdk-class.md` | TwilioVoiceSDK - main entry point class reference |
| `02-readme.md` | Main README from GitHub quickstart repo |
| `03-access-tokens.md` | Access token generation and usage |
| `04-call-from-history.md` | Making calls from call history |
| `05-managing-audio-interruptions.md` | Handling audio interruptions on iOS |
| `06-managing-push-credentials.md` | Push notification credential management |
| `07-migration-guide-2.x-3.x.md` | Migration guide from v2.x to v3.x |
| `08-migration-guide-3.x-4.x.md` | Migration guide from v3.x to v4.x |
| `09-migration-guide-5.x-6.x.md` | Migration guide from v5.x to v6.x |
| `10-new-features-3.0.md` | New features in SDK v3.0 |
| `11-new-features-4.0.md` | New features in SDK v4.0 |
| `12-push-credentials-via-notify-api.md` | Push credentials via Twilio Notify API |
| `13-verified-caller-number.md` | SHAKEN/STIR verified caller number |

---

## Core Classes (53 total)

### Primary Classes
| Class | Description |
|-------|-------------|
| **TwilioVoiceSDK** | Entry point for VoIP registration, calls, and audio configuration |
| **TVOCall** | Represents a signaling and media session |
| **TVOCallInvite** | Represents an incoming call invitation |
| **TVOCancelledCallInvite** | Represents a cancelled call invitation |

### Options & Configuration
| Class | Description |
|-------|-------------|
| **TVOConnectOptions** | Configuration for outgoing calls |
| **TVOAcceptOptions** | Configuration for accepting incoming calls |
| **TVOCallOptions** | Base class for call options |
| **TVOIceOptions** | ICE connectivity configurations |
| **TVOAudioOptions** | Audio configuration options |
| **TVOPreflightOptions** | Preflight test configuration |

### Audio Classes
| Class | Description |
|-------|-------------|
| **TVODefaultAudioDevice** | Default audio device implementation |
| **TVOAudioFormat** | Audio format specification |
| **TVOOpusCodec** | Opus codec configuration |
| **TVOPcmuCodec** | PCMU codec configuration |

### Statistics & Monitoring
| Class | Description |
|-------|-------------|
| **TVOStatsReport** | Aggregated statistics for peer connection |
| **TVOLocalAudioTrackStats** | Local audio track statistics |
| **TVORemoteAudioTrackStats** | Remote audio track statistics |
| **TVOIceCandidateStats** | ICE candidate statistics |
| **TVOIceCandidatePairStats** | ICE candidate pair statistics |
| **TVOPreflightTest** | Connection diagnostics test |
| **TVOPreflightReport** | Preflight test results |

### Utility Classes
| Class | Description |
|-------|-------------|
| **TVOCallerInfo** | SHAKEN/STIR caller verification info |
| **TVOCallMessage** | User-defined message content |
| **TVOLogParameters** | Logging configuration |

---

## Protocols (9 total)

| Protocol | Description |
|----------|-------------|
| **TVOCallDelegate** | Callbacks for call state changes |
| **TVONotificationDelegate** | Callbacks for incoming call invites |
| **TVOCallMessageDelegate** | Callbacks for call messages |
| **TVOPreflightDelegate** | Callbacks for preflight test events |
| **TVOAudioDevice** | Custom audio device interface |
| **TVOAudioDeviceCapturer** | Audio capture interface |
| **TVOAudioDeviceRenderer** | Audio rendering interface |
| **TVOLogger** | Custom logging interface |

---

## Enumerations

| Enum | Description |
|------|-------------|
| **TVOCallState** | Call states (Connecting, Ringing, Connected, Reconnecting, Disconnected) |
| **TVOCallFeedbackScore** | Quality feedback scores (1-5) |
| **TVOCallFeedbackIssue** | Issue types for feedback |
| **TVOCallQualityWarning** | Quality warning types |
| **TVOLogLevel** | Logging levels (Off, Fatal, Error, Warning, Info, Debug, Trace) |
| **TVOLogModule** | Logging modules |
| **TVOIceTransportPolicy** | ICE transport policies |
| **TVOPreflightTestStatus** | Preflight test states |
| **TVOPreflightCallQuality** | Preflight quality assessment |

---

## Common Usage Patterns

### Initialize SDK and Make Outbound Call

```objc
// Set audio device before any SDK operations
TwilioVoiceSDK.audioDevice = [TVODefaultAudioDevice audioDevice];

// Configure logging
TwilioVoiceSDK.logLevel = TVOLogLevelDebug;

// Connect call
TVOConnectOptions *options = [TVOConnectOptions optionsWithAccessToken:token
    block:^(TVOConnectOptionsBuilder *builder) {
        builder.params = @{@"To": @"+1234567890"};
    }];

TVOCall *call = [TwilioVoiceSDK connectWithOptions:options delegate:self];
```

### Register for Incoming Calls

```objc
// Register device token for VoIP push notifications
[TwilioVoiceSDK registerWithAccessToken:token
                            deviceToken:deviceToken
                             completion:^(NSError *error) {
    if (error) {
        NSLog(@"Registration failed: %@", error);
    } else {
        NSLog(@"Registration successful");
    }
}];
```

### Handle Incoming Call (TVONotificationDelegate)

```objc
- (void)callInviteReceived:(TVOCallInvite *)callInvite {
    NSLog(@"Incoming call from: %@", callInvite.from);

    // Accept with default options
    TVOCall *call = [callInvite acceptWithDelegate:self];

    // Or accept with custom options
    TVOAcceptOptions *options = [TVOAcceptOptions optionsWithCallInvite:callInvite
        block:^(TVOAcceptOptionsBuilder *builder) {
            builder.uuid = callInvite.uuid;
        }];
    TVOCall *call = [callInvite acceptWithOptions:options delegate:self];
}

- (void)cancelledCallInviteReceived:(TVOCancelledCallInvite *)cancelledCallInvite
                              error:(NSError *)error {
    NSLog(@"Call cancelled: %@", error);
}
```

### Handle Call Events (TVOCallDelegate)

```objc
- (void)callDidConnect:(TVOCall *)call {
    NSLog(@"Call connected, SID: %@", call.sid);
}

- (void)call:(TVOCall *)call didFailToConnectWithError:(NSError *)error {
    NSLog(@"Call failed: %@", error);
}

- (void)call:(TVOCall *)call didDisconnectWithError:(NSError *)error {
    if (error) {
        NSLog(@"Call disconnected with error: %@", error);
    } else {
        NSLog(@"Call disconnected normally");
    }
}

- (void)callDidStartRinging:(TVOCall *)call {
    NSLog(@"Call is ringing");
}

- (void)call:(TVOCall *)call isReconnectingWithError:(NSError *)error {
    NSLog(@"Call reconnecting: %@", error);
}

- (void)callDidReconnect:(TVOCall *)call {
    NSLog(@"Call reconnected");
}
```

### Run Preflight Test

```objc
TVOPreflightOptions *options = [TVOPreflightOptions optionsWithAccessToken:token
    block:^(TVOPreflightOptionsBuilder *builder) {
        // Configure options
    }];

TVOPreflightTest *test = [TwilioVoiceSDK runPreflightTestWithOptions:options
                                                            delegate:self];
```

---

## Important Constraints

### Identity
- Maximum 121 characters
- Alphanumeric and underscores only

### Call Messages
- Maximum 10 KB per message
- Rate limit: 10 messages per minute

### Regional Data Storage
Use `twr` in access token headers:
```json
{"twr": "au1"}
```

---

## CallKit Integration

The SDK provides CallKit extensions for seamless iOS integration:

- `TVOCall+CallKit` - Call UUID management
- `TVOCallInvite+CallKit` - Invite UUID handling
- `TVOCallOptions+CallKit` - UUID configuration
- `TwilioVoiceSDK+CallKit` - CallKit audio session management

---

## Network Handling

The SDK automatically handles network transitions with priority:
1. Ethernet
2. Loopback
3. WiFi
4. VPN
5. Cellular

---

## Thread Safety

All TVOCall instances must be created and accessed from a single dispatch queue. Use `delegateQueue` parameters to specify callback queues.
