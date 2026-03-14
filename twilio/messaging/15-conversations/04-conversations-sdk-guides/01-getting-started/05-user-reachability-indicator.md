# User Reachability Indicator

The Conversations SDKs include optional built-in presence functionality. You can use the Reachability Indicator feature to:

- Check a Chat (SDK) User's status (i.e. online or offline)
- Check if a User is notifiable via Push Notification
- Receive SDK events when these statuses change

These properties will be available when you enable the Reachability Indicator feature.

---

## Enable the Reachability Indicator

> ℹ️ **Info**
> By default, the Reachability Indicator state is `disabled`.

To turn on the Reachability Indicator, you'll need to use the **REST API**.

Once you enable the feature, Twilio will automatically update and synchronize the state. The Reachability Indicator properties are exposed on the **User** resource in the REST API and on User objects in the SDKs. They are "read-only", which means you can't modify these properties.

---

## Check the state of the Reachability Indicator

You can check User objects to determine their current reachability status and push notification availability.

Updates to other User's Reachability Indicator states are also communicated via the update event on User objects and the userUpdated event on the Client object.

Any of the following events can change the Reachability Indicator state:

- When a User goes online
- When a User goes offline
- When a User registers for push notifications
- When a User unregisters from push notifications

> ℹ️ **Info**
> Online/Offline status may take up to a couple of minutes to become consistent with a user's actual state.

---

## Listening for Reachability status

**Node.js / TypeScript**

```javascript
/* Checking/listening to reachability */

// check if reachability function is enabled 
if (!client.reachabilityEnabled) { 
    // reachability function is disabled for the client 
    return; 
} 

// listen to user reachability status updates 
client.on("userUpdated", ({ user, updateReasons}) => { 
    if (updateReasons.includes("reachabilityOnline")) { 
        // user reachability status was updated 
    } 
    if (updateReasons.includes("reachabilityNotifiable")) { 
        // user notifications status was updated 
    } 
});

const participants = await conversation.getParticipants(); 
participants.forEach(async (participant) => { 
    const user = await participant.getUser(); 
    if (user.isOnline) { 
        // conversation participant is online 
    } 
    if (user.isNotifiable) { 
        // user has push notifications active 
    } 
});
```

---

## What's Next?

Well done! You have learned about the User Reachability Indicator feature. As a following step, you can:

- Explore the **Read Horizon and Read Status Overview**, or
- Check the **Delivery Receipts Overview** guide.