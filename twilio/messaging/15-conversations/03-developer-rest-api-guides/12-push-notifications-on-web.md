# Push Notifications on the Web for Conversations

Push notifications are an important part of the web experience. Users have grown accustomed to push notifications being part of virtually every app that they use. The Twilio Conversations JavaScript SDK can integrate Firebase Cloud Messaging (FCM) for push notifications.

Managing your push credentials is necessary, as your registration token is required for the Conversations SDK to be able to send any notifications through FCM. Let's go through the process of managing your push credentials.

## Step 1 - Enable push notifications for your Service instance

The default enabled flag for new Service instances for all Push Notifications is false. This means that Push will be disabled until you explicitly enable it. You can follow this guide to do so.

## Step 2 - Configure Firebase

The developer must configure Firebase Cloud Messaging (FCM) before configuring notifications. Google provides a Firebase Console to manage Firebase services and configurations.

### Create a project on Firebase

To use push notifications for your JavaScript app, you will need to create a project on the Firebase Console.

### Get the project's configuration

The Firebase Cloud Messaging (FCM) requires configuration to initialize. The Firebase console has a way to create this configuration.

After you create a Firebase project, you can select the option to add Firebase to your web app. From the project overview page, under the text "Get started by adding Firebase to your app", select the Web icon.

As a next step, register your app. Give the app a nickname and click the Register app button.

Once the app is registered, a customized code snippet will be displayed. This dialog contains sample JavaScript code with filled-in parameters that you can use in your newly created project.

Save this sample code with configuration - we will use it later in this guide.

## Step 3 - Upload your API Key to Twilio

Now that we have our app configured to receive push notifications, let's upload our API Key by creating a Credential resource. Check out the Credentials page in the Twilio console to generate a credential SID using your API key. Click the Create button.

## Step 4 - Pass the API Credential Sid in your Access Token

This step is to ensure that your Conversations JS SDK client Access Token includes the correct credential_sid - the one you created in Step 3 above. Each of the Twilio server-side SDKs enables you to add the push_credential_sid. You can see the relevant documentation for your preferred server-side SDK for the details. Here is an example using the Node.js Twilio SDK:

```javascript
const chatGrant = new ChatGrant({ 
  serviceSid: ConversationServiceSid, 
  pushCredentialSid: FCM_Credential_Sid 
});
```

## Step 5 - Initialize Firebase in your web app

Now it's time to initialize the Firebase with the sample code from Step 2 above.

In your web app's early initialization sequence, use the sample code (and do not forget to include/import the Firebase library provided by Google). We recommend including an additional check for the correct import of the Firebase libraries.

```javascript
// Initialize Firebase
var config = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
if (firebase) {
  firebase.initializeApp(config);
}
```

## Step 6 - Request push permissions from the user and get your FCM token

In this step, we are requesting permission from the user to subscribe to and to display notifications. We recommend adding checks for the correct initialization of Firebase.

```javascript
if (firebase && firebase.messaging()) {
  // requesting permission to use push notifications
  firebase.messaging().requestPermission().then(() => {
    // getting FCM token
    firebase.messaging().getToken().then((fcmToken) => {
      // continue with Step 7 here 
      // ... 
      // ... 
    }).catch((err) => {
      // can't get token
    });
  }).catch((err) => {
    // can't request permission or permission hasn't been granted to the web app by the user
  });
} else {
  // no Firebase library imported or Firebase library wasn't correctly initialized
}
```

## Step 7 - Pass the FCM token to the Conversations JS SDK and register an event listener for new push arrival

If you got to this step, then you have Firebase correctly configured and an FCM token ready to be registered with Conversations SDK.

This step assumes that you have Conversation's Client created with the correct Access Token from Step 4.

```javascript
// passing FCM token to the `conversationClientInstance` to register for push notifications
conversationClientInstance.setPushRegistrationId('fcm', fcmToken);

// registering event listener on new message from Firebase to pass it to the Conversations SDK for parsing
firebase.messaging().onMessage(payload => {
  conversationClientInstance.handlePushNotification(payload);
});
```