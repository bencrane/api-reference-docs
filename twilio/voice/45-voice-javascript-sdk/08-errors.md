# Error Handling

This document covers the TwilioError namespace and error handling in the Twilio Voice JavaScript SDK.

---

## TwilioError Namespace

All errors in the SDK extend from the base `TwilioError` class and are organized into category namespaces.

---

## Error Categories

### AuthorizationErrors

Errors related to authentication and authorization.

| Code | Name | Description |
|------|------|-------------|
| 20101 | InvalidJWTToken | JWT token is invalid |
| 20102 | JWTTokenExpired | JWT token has expired |
| 20103 | AuthenticationFailed | Authentication failed |
| 20104 | InvalidAccessToken | Access token is invalid |
| 20151 | ExpirationTimeExceedsMaximum | Token expiration time exceeds maximum |
| 20157 | ExpiredJWTToken | JWT token has expired |

### ClientErrors

Errors originating from the client.

| Code | Name | Description |
|------|------|-------------|
| 31001 | BadRequest | Bad request |
| 31002 | NotFound | Resource not found |
| 31003 | Forbidden | Access forbidden |
| 31005 | UnexpectedSignalingError | Unexpected signaling error |
| 31008 | UserDeniedMediaAccess | User denied media access |
| 31009 | RegistrationError | Registration failed |

### GeneralErrors

General errors.

| Code | Name | Description |
|------|------|-------------|
| 31000 | UnknownError | Unknown error occurred |
| 31006 | ConnectionError | Connection error |
| 31007 | CallCancelled | Call was cancelled |

### MalformedRequestErrors

Errors due to malformed requests.

| Code | Name | Description |
|------|------|-------------|
| 31100 | MalformedRequest | Request was malformed |

### MediaErrors

Errors related to media handling.

| Code | Name | Description |
|------|------|-------------|
| 31201 | ConnectionFailed | Media connection failed |
| 31202 | MediaConnectionFailed | Media connection failed |
| 31203 | LowBytesReceived | Low bytes received |
| 31204 | LowBytesSent | Low bytes sent |
| 31205 | IceGatheringFailed | ICE gathering failed |
| 31206 | IceConnectionFailed | ICE connection failed |
| 31207 | NoSupportedCodec | No supported codec found |

### SignalingErrors

Errors in signaling.

| Code | Name | Description |
|------|------|-------------|
| 31301 | SignalingConnectionDisconnected | Signaling connection disconnected |
| 31302 | SignalingConnectionError | Signaling connection error |
| 31303 | SignalingConnectionTimeout | Signaling connection timeout |

### SignatureValidationErrors

Errors in signature validation.

| Code | Name | Description |
|------|------|-------------|
| 31401 | InvalidSignature | Invalid signature |
| 31402 | AccessTokenSignatureInvalid | Access token signature invalid |

### SIPServerErrors

Errors from SIP servers.

| Code | Name | Description |
|------|------|-------------|
| 31501 | SIPServerError | SIP server error |
| 31502 | SIPBadRequest | SIP bad request |
| 31503 | SIPUnavailable | SIP service unavailable |
| 31504 | SIPTimeout | SIP timeout |
| 31505 | SIPBusyEverywhere | SIP busy everywhere |
| 31506 | SIPDecline | SIP decline |
| 31507 | SIPNotAcceptable | SIP not acceptable |

### UserMediaErrors

Errors related to user media (microphone/camera).

| Code | Name | Description |
|------|------|-------------|
| 31401 | PermissionDenied | User denied permission |
| 31402 | DeviceNotFound | Device not found |
| 31403 | ConstraintNotSatisfied | Constraint not satisfied |
| 31404 | OverconstrainedError | Overconstrained error |

---

## Error Classes

### TwilioError (Base Class)

All SDK errors extend this base class.

```typescript
class TwilioError extends Error {
  causes: string[];
  code: number;
  description: string;
  explanation: string;
  message: string;
  name: string;
  originalError?: Error;
  solutions: string[];
}
```

| Property | Type | Description |
|----------|------|-------------|
| `code` | number | Numeric error code |
| `name` | string | Error name |
| `message` | string | Human-readable message |
| `description` | string | Detailed description |
| `explanation` | string | Explanation of the error |
| `causes` | string[] | Possible causes |
| `solutions` | string[] | Suggested solutions |
| `originalError` | Error | Original underlying error |

### InvalidArgumentError

Thrown when an invalid argument is provided.

```typescript
class InvalidArgumentError extends TwilioError {
  // code: 31000
}
```

### InvalidStateError

Thrown when an operation is attempted in an invalid state.

```typescript
class InvalidStateError extends TwilioError {
  // code: 31000
}
```

### NotSupportedError

Thrown when a feature is not supported.

```typescript
class NotSupportedError extends TwilioError {
  // code: 31000
}
```

---

## Error Handling Examples

### Basic Error Handling

```javascript
device.on('error', (twilioError) => {
  console.error('Error code:', twilioError.code);
  console.error('Error name:', twilioError.name);
  console.error('Error message:', twilioError.message);

  if (twilioError.causes) {
    console.error('Possible causes:', twilioError.causes);
  }
  if (twilioError.solutions) {
    console.error('Solutions:', twilioError.solutions);
  }
});
```

### Handling Specific Errors

```javascript
import { TwilioError } from '@twilio/voice-sdk';

device.on('error', (error) => {
  switch (error.code) {
    case 20101:
    case 20104:
      // Invalid token - refresh it
      refreshToken();
      break;

    case 20102:
    case 20157:
      // Token expired - get new one
      fetchNewToken();
      break;

    case 31008:
      // User denied microphone access
      showMicrophonePermissionDialog();
      break;

    case 31201:
    case 31202:
      // Media connection failed
      showNetworkErrorMessage();
      break;

    default:
      console.error('Unhandled error:', error);
  }
});
```

### Call-Specific Errors

```javascript
call.on('error', (error) => {
  console.error('Call error:', error.code, error.message);

  // Handle reconnection failures
  if (error.code === 31301) {
    // Signaling disconnected
    showReconnectingUI();
  }
});

call.on('disconnect', (call) => {
  // Check if disconnect was due to error
  if (call.status() === 'closed') {
    // Normal disconnect
  }
});
```

### Preflight Test Errors

```javascript
preflightTest.on('failed', (error) => {
  if (error instanceof DOMException) {
    // Browser/media error
    console.error('Browser error:', error.name, error.message);
  } else {
    // TwilioError
    console.error('Twilio error:', error.code, error.message);
  }
});
```

---

## Improved Error Precision

Enable more precise error codes (instead of generic 53000, 31005):

```javascript
const device = new Device(token, {
  enableImprovedSignalingErrorPrecision: true
});
```

This provides more specific error codes for debugging signaling issues.

---

## Common Error Scenarios

### Token Errors

| Scenario | Code | Solution |
|----------|------|----------|
| Token expired | 20102, 20157 | Fetch new token, call `device.updateToken()` |
| Invalid token | 20101, 20104 | Check token generation |
| Token about to expire | - | Listen for `tokenWillExpire` event |

### Media Errors

| Scenario | Code | Solution |
|----------|------|----------|
| Microphone denied | 31008 | Prompt user to grant permission |
| No microphone | 31402 | Check device availability |
| Media connection failed | 31201, 31202 | Check network, try different edge |

### Network Errors

| Scenario | Code | Solution |
|----------|------|----------|
| Connection failed | 31006 | Check internet connection |
| Signaling timeout | 31303 | Check firewall, try different edge |
| ICE failed | 31205, 31206 | Check TURN/STUN configuration |

---

## Best Practices

1. **Always handle errors** - Listen for `error` events on Device and Call
2. **Implement token refresh** - Handle `tokenWillExpire` proactively
3. **Provide user feedback** - Show appropriate UI for different error types
4. **Log errors for debugging** - Include error codes and messages
5. **Graceful degradation** - Have fallback behaviors for critical errors
