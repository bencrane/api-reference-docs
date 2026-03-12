# TwilioVoiceSDK Class

> The entry point to the Twilio Voice SDK. Enables VoIP push registration, outgoing calls, incoming call handling, and audio device configuration.

---

## Properties

### logLevel
```objc
@property (class, nonatomic, assign) TVOLogLevel logLevel;
```
Sets the SDK logging level. Default: `TVOLogLevelError`. Uses NSLog internally.

### insights
```objc
@property (class, nonatomic, assign, getter=isInsightsEnabled) BOOL insights;
```
Controls whether stats data is sent to Insights. Enabled by default.

### edge
```objc
@property (class, nonatomic, copy, nullable) NSString *edge;
```
Specifies the geographic Twilio infrastructure location. Default: `"roaming"` (auto-select based on latency).

**Valid edges:** `ashburn`, `dublin`, `frankfurt`, `roaming`, `sao-paulo`, `singapore`, `sydney`, `tokyo`, `ashburn-ix`, `dublin-ix`, `frankfurt-ix`, `london-ix`, `san-jose-ix`, `singapore-ix`, `sydney-ix`, `tokyo-ix`

### audioDevice
```objc
@property (class, nonatomic, strong, nullable) id<TVOAudioDevice> audioDevice;
```
Configures the audio device for call audio. **Must be set before initiating any SDK operations.**

### logger
```objc
@property (class, nonatomic, strong, nullable) id<TVOLogger> logger;
```
Allows custom logging implementation.

---

## Registration Methods

### registerWithAccessToken:deviceToken:completion:
```objc
+ (void)registerWithAccessToken:(nonnull NSString *)accessToken
                    deviceToken:(nonnull NSString *)deviceToken
                     completion:(nullable void (^)(NSError * _Nullable error))completion;
```
Registers the device for VoIP push notifications. Registration has a 1-year TTL.

**Parameters:**
- `accessToken`: JWT access token
- `deviceToken`: VoIP push device token (hex-encoded string)
- `completion`: Called on completion with error if failed

### unregisterWithAccessToken:deviceToken:completion:
```objc
+ (void)unregisterWithAccessToken:(nonnull NSString *)accessToken
                      deviceToken:(nonnull NSString *)deviceToken
                       completion:(nullable void (^)(NSError * _Nullable error))completion;
```
Unregisters the device from VoIP push notifications.

---

## Notification Handling

### handleNotification:delegate:delegateQueue:
```objc
+ (BOOL)handleNotification:(nonnull NSDictionary *)payload
                  delegate:(nonnull id<TVONotificationDelegate>)delegate
             delegateQueue:(nullable dispatch_queue_t)delegateQueue;
```
Processes incoming VoIP push notification payloads.

**Parameters:**
- `payload`: Push notification payload dictionary
- `delegate`: Object conforming to TVONotificationDelegate
- `delegateQueue`: Queue for delegate callbacks (nil uses main queue)

**Returns:** `YES` if the payload is valid Twilio notification

### handleNotification:delegate:delegateQueue:callMessageDelegate:
```objc
+ (BOOL)handleNotification:(nonnull NSDictionary *)payload
                  delegate:(nonnull id<TVONotificationDelegate>)delegate
             delegateQueue:(nullable dispatch_queue_t)delegateQueue
       callMessageDelegate:(nullable id<TVOCallMessageDelegate>)callMessageDelegate;
```
Same as above, with additional call message delegate support.

---

## Outgoing Calls

### connectWithAccessToken:delegate:
```objc
+ (nonnull TVOCall *)connectWithAccessToken:(nonnull NSString *)accessToken
                                   delegate:(nonnull id<TVOCallDelegate>)delegate;
```
Initiates an outgoing call with default options.

**Returns:** A `TVOCall` object representing the outgoing call.

### connectWithOptions:delegate:
```objc
+ (nonnull TVOCall *)connectWithOptions:(nonnull TVOConnectOptions *)options
                               delegate:(nonnull id<TVOCallDelegate>)delegate;
```
Initiates an outgoing call with custom options.

**Parameters:**
- `options`: TVOConnectOptions with access token, params, ICE options, etc.
- `delegate`: Object conforming to TVOCallDelegate

---

## Preflight Testing

### runPreflightTestWithAccessToken:delegate:
```objc
+ (nonnull TVOPreflightTest *)runPreflightTestWithAccessToken:(nonnull NSString *)accessToken
                                                     delegate:(nonnull id<TVOPreflightDelegate>)delegate;
```
Runs a preflight connectivity test with default options.

### runPreflightTestWithOptions:delegate:
```objc
+ (nonnull TVOPreflightTest *)runPreflightTestWithOptions:(nonnull TVOPreflightOptions *)options
                                                 delegate:(nonnull id<TVOPreflightDelegate>)delegate;
```
Runs a preflight test with custom options.

---

## Utility Methods

### sdkVersion
```objc
+ (nonnull NSString *)sdkVersion;
```
Returns the SDK version string.

### setLogLevel:module:
```objc
+ (void)setLogLevel:(TVOLogLevel)logLevel module:(TVOLogModule)module;
```
Sets logging level for a specific module.

### logLevelForModule:
```objc
+ (TVOLogLevel)logLevelForModule:(TVOLogModule)module;
```
Returns the current log level for a module.

---

## Usage Example

```objc
// 1. Configure audio device (MUST be first)
TwilioVoiceSDK.audioDevice = [TVODefaultAudioDevice audioDevice];

// 2. Set logging
TwilioVoiceSDK.logLevel = TVOLogLevelDebug;

// 3. Set edge (optional)
TwilioVoiceSDK.edge = @"ashburn";

// 4. Register for incoming calls
[TwilioVoiceSDK registerWithAccessToken:accessToken
                            deviceToken:deviceToken
                             completion:^(NSError *error) {
    if (error) {
        NSLog(@"Registration failed: %@", error);
    }
}];

// 5. Make outgoing call
TVOConnectOptions *options = [TVOConnectOptions optionsWithAccessToken:accessToken
    block:^(TVOConnectOptionsBuilder *builder) {
        builder.params = @{
            @"To": @"+1234567890",
            @"CustomParam": @"value"
        };
    }];

TVOCall *call = [TwilioVoiceSDK connectWithOptions:options delegate:self];
```

---

## Identity Constraints

- Maximum 121 characters
- Alphanumeric and underscores only
- Specified in the access token

---

## Regional Data Storage

For data residency compliance, use `twr` header in access token:

```json
{
  "twr": "au1"
}
```
