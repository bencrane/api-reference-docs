# SDK Overview

Twilio provides a client-side SDK for browser-based development, as well as SDKs for native development on iOS and Android.

Our SDKs provide a convenient collection of objects, methods, and events to connect your client-side application to Conversations.

For the most up-to-date installation methods, version history, and documentation, check out:

- The JavaScript, Android, or iOS download page
- The JavaScript, Android, or iOS changelogs
- The JavaScript, Android, or iOS auto-generated documentation

---

## Initialization

Initializing the Conversations SDKs is an important step to ensure your client is ready to use on an end user's mobile or web device.

To get started, you'll need to initialize a new Client object. You'll need to pass a valid Access Token to the client creation method as the first parameter.

After that, you should listen for the client to inform you when it's fully initialized/synchronized.

Once you receive this confirmation, the client is ready to use.

### Client Initialization

```javascript
/* Initialization */
import {Client} from "@twilio/conversations";

const client = new Client("token");
client.on("stateChanged", (state) => {
    if (state === "failed") {
        // The client failed to initialize
        return;
    }

    if (state === "initialized") {
        // Use the client
    }
});
```

---

## Token Events

> ℹ️ **Info**
> If the token expires before you renew it, the client's connection state will change to disconnected, and you'll need to initialize a new client object.

All tokens have a limited lifetime to protect you from abuse. The maximum and default lifetime is 24 hours, but you should make it as short as possible for your application. Therefore, you may need to renew the token during your SDK session. The SDK will notify you when the token is "about to expire" and when it "has expired".

To avoid needing to instantiate a new client, you should get a new token from your server and pass it to the client's `updateToken` method before the old one expires. This method will update the authentication token for your client and re-register with the Conversations services.

### Token Events

```javascript
/* Handling token expiration/expiration warning events */

client.on("tokenAboutToExpire", (time) => {
    // token is about to expire. get a new token
    try {
        const token = (await fetch("https://placekitten.com/getToken?username=username&password=password")).data();
    } catch {
        return Error("Unable to get a token");
    }

    // update the client with new token
    client = await client.updateToken(token);

    // use updated client
});

client.on("tokenExpired", () => {
    // get a new token
    try {
        const token = (await fetch("https://placekitten.com/getToken?username=username&password=password")).data();
    } catch {
        return Error("Unable to get a token");
    }

    // token expired. create a new client
    client = new Client(token);
});

// update the token used by the client and re-register with the Conversations services
await client.updateToken("token");
```

---

## Client Connection State

> ℹ️ **Info**
> There is a reconnection attempt period when the network connectivity is lost before the client switches to the disconnected state.

During use, the connection state of your SDK client may change.

These are the possible client connection states:

| State | Description |
|-------|-------------|
| `connecting` | The client is offline and a connection attempt is in progress |
| `connected` | The client is online and ready |
| `disconnecting` | The client is going offline as disconnection is in progress |
| `disconnected` | The client is offline and no connection attempt is in progress |
| `denied` | The client connection is denied because of an invalid JSON Web Token access token. The user must refresh the token in order to proceed |

The above-mentioned states are also documented in our SDK reference docs.

The client state changes are due to different factors. For instance, let's take the disconnected state as an example. This could happen due to a network disruption, expired token, or other error. You can listen to the client's connection state events to detect this and respond accordingly.

### Handling Client State

```javascript
/* Handle client state change */

client.on("connectionStateChanged", ({state}) => {
    // handle new connection state
});
```

---

## Enable Debugging

As you build out your Conversations application, you might find it helpful to check the Twilio Console debugger. This service aggregates all additional errors or warnings that may be triggered from Twilio's webhooks to your server, as well as token errors.

You can also enable debug logging by passing an option for increased log verbosity to your client when you create it. Check the auto-generated docs or Error Handling and Diagnostics for platform-specific examples.

---

## What's Next?

Congratulations, you have learned how to configure your Conversations SDK client. As a following step, you can:

- Learn how to Handle Events in our next guide, or
- Check out our Working with Conversations guide