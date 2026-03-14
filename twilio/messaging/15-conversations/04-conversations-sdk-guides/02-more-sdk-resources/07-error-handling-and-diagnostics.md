# Error Handling and Diagnostics

If you encounter issues with Twilio Conversations, we've provided the following diagnostics tips to help get you back on track. These tips are also valuable in providing logs and details to Twilio Support.

---

## Token and Connection Errors

Two of the most common problems that we encounter with Conversations are bad credentials and webhook errors. Your best resource to debug these issues is to use the Twilio Error Logs in your Twilio console. The Error Logs contain detailed information about your activity within your application. This log can help you understand which Twilio resources were impacted.

To get the Error Logs, open the Twilio console, click on Monitor, then on Logs and finally Error logs.

In the Error logs screen, you can see the detailed logs filtered by dates. You can click on an event in the Error Logs and see the properties of the message that encountered an error, such as your resource SID, timestamp and any warnings or errors thrown by Twilio. This page also includes possible causes and resolutions, a detailed error description and a request inspector.

The errors listed here will often be more helpful and specific than the errors returned by the SDK, so it may help debug situations happening at a distance.

---

## Error Handling in the SDK

It's always challenging and frustrating to confront an unclear or ambiguous error. To avoid this, make sure that your SDK is handling errors properly: make the error visible either by printing to the console or by rendering a message in the UI. Error handling varies by SDK platform, but each platform gives feedback about the success of operations and the client's state in one or more of the following ways:

- Callback blocks or listeners provided when you call methods on the SDK
- Exceptions raised or thrown by SDK methods
- Delegates or listeners associated with either your SDK client or individual SDK-provided objects

You should ensure you are verifying the success of any result objects returned through completion blocks or handlers. It is also important to implement error handling for unexpected errors in addition to errors that are not the direct result of a call to the SDK.

We recommend that you implement the client's connection state update method to detect when the client loses network connectivity. Today, operations performed while the client is not connected will fail unless connectivity returns it quickly. Preventing your application from operating on the client while it is offline is a best practice for ensuring your operations succeed as expected.

As Twilio Conversations and Programmable Chat SDKs share the same infrastructure, you may see some errors described in a "chatty" way. If you see the error message containing Channel or Member-related information, it means you are dealing with Conversation or Participant, respectively.

---

## iOS Error Handling - Objective-C, Swift

Objective-C and Swift both use the same approach to error reporting and handling, though the syntax differs by language.

The Conversations client's `errorReceived` method is the first diagnostic method you should implement. This method will be called during client creation if any error occurs. If client initialization fails and a nil client is returned, this method will be called with an explanation of why the creation failed.

You must pass in a delegate on client creation in iOS even if your application changes this delegate later. This ensures that you receive this callback, since it may be called before the initial client creation method completes.

Most operations that can be performed on objects in Conversations for iOS return a `TCHResult` object to their completion block. This includes operations against Conversations, Messages, and Participants. This object contains an `isSuccessful` method as well as an `error` property which will be populated with an error should the operation fail. Your application should check for this error and never disregard it. Provide a completion block to methods, even if you do not need a reference to the resulting object, to verify that your request was successful.

On iOS, connection state changes are sent to the client's delegate with the `connectionStateChanged` method.

---

## Android Error Handling - Java

On Android, all asynchronous functions receive a `StatusListener` whose `onError(ErrorInfo)` method must be implemented in order to receive error information. Check for these errors during your application's runtime. You should always provide a `StatusListener` to methods, even if you do not intend to use the resulting object, to verify that your request was successful.

The Client creation method does not return a new Client instance right away - instead, the instance gets returned in the `CallbackListener`'s `onSuccess()` callback to prevent misuse.

Connection state changes are sent to the client's `ConversationClientListener` (which you can set with `client.setListener()`) with the `onConnectionStateChange` method.

---

## JavaScript Error Handling

General error handling uses standard JavaScript mechanisms. Most of these library methods are asynchronous and return promises.

In the case of an error, the promise will pass an instance of the JS Error class (or its ancestor) to the catch handler if specified. Additionally, Twilio error classes provide a numeric error code property to make it easier to identify specific problems.

The standard way to handle errors in promise-based syntax looks like this:

```javascript
client.getMessages()
  .then(messagesPage => { do something here })
  .catch(e => { console.error('Got an error:', e.code, e.message); });
```

Connection state changes are surfaced via the `client#connectionStateChanged` event. `Denied` is the most important state to pay attention to, since it indicates a problem with the Access Token. The Denied state necessitates a new token.

---

## Logging

Conversations default log level is `SILENT`, which is often appropriate for production. However, when evaluating errors during development or building a log for Twilio support, we'll need more information. The Conversations Team at Twilio suggests changing this level to `DEBUG` in such situations (`VERBOSE` is often too distracting.).

How you set the Conversations log level depends on your platform.

> ℹ️ **Info**
> When reporting logs to Twilio Support, it is essential that logs not be truncated or filtered. Information before or after the lines displaying a particular fault is often critical for reproducing the issue. If you have sensitive application information in the log unrelated to Twilio, you may remove or obfuscate it, but otherwise, we recommend unmodified logs.
>
> Given full logs may contain still-valid access tokens, we do *not* recommend posting logs in public forums and instead suggest either 1:1 messages to Twilio support or opening a ticket.

### iOS Logging (Objective C or Swift)

Since logging starts as soon as the client is created, we expose the log level as a static value on the client. We recommend calling this before accessing `TwilioConversationsClient` the first time.

```objective-c
// Objective C
[TwilioConversationsClient setLogLevel:TCHLogLevelDebug];
```

```swift
// Swift
TwilioConversationsClient.setLogLevel(.debug)
```

### Android Logging - Java

```java
// Before creating a new ConversationsClient with ConversationsClient.create() add this line:
ConversationsClient.setLogLevel(ConversationsClient.LogLevel.VERBOSE);
```

If you wish to send log information to Twilio, see our Android guidelines for collecting logs.

### JavaScript Logging

JavaScript passes a `clientOptions` variable object to the Conversations client at the time of creation specifying the log level:

```javascript
let clientOptions = { logLevel: 'debug' };
Twilio.Conversations.Client.create(token, clientOptions).then(conversationsClient => {
    // Use Conversations client
});
```

---

## Evaluating Logs

Often you can track down issues by evaluating your logs.

In particular, searching your log for 4xx and 5xx errors such as 401 can be helpful in troubleshooting issues. Generally speaking, a 401 error will indicate a permissions issue - either for the particular object you are interacting with or your entire session if the 401 is related to your access token.