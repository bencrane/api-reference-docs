# Push Notifications on Android for Conversations

Your end users can get push notifications when another participant in a conversation sends a message, joins the conversation, or leaves the conversation. You can configure which of these events send push notifications, as well as the message template used and any sound that plays.

Twilio uses the Firebase Cloud Messaging (FCM) service to send push notifications. You need to set up your Android app to use push notifications if you have not done so already. You also need to share an FCM API key with Twilio so that push notifications can be sent to your application.

## Step 1: Enable push notifications for your Service instance

**IMPORTANT:** The default enabled flag for new Service instances for all Push Notifications is false. This means that push notifications will be disabled until you explicitly enable them. Follow this guide to do so.

## Step 2: Create a configuration file

The Firebase Cloud Messaging (FCM) library looks for a file named google-services.json in your Android app to identify push configuration details. Google provides a web interface for generating this file that you can find in the Firebase Console.

Copy the google-services.json file you download in the step below into the app/ directory of your Android Studio project.

Once you've entered your app credentials, you can download the generated file to your desktop. Save the API Key that is displayed on the last page, as you will need it in a later step.

## Step 3: Set up your Android app with Firebase

As the version numbers for the Firebase libraries are always changing, please refer to the Add Firebase to your Android project documentation guide for setup instructions. You can add Firebase manually to Gradle, or use the Firebase Assistant in the Android Studio IDE.

## Step 4: Add Firebase Cloud Messaging to your Android application

Adding Firebase Cloud Messaging is described in the Set up a Firebase Cloud Messaging client app on Android guide on the Firebase site. Be sure to add the com.google.firebase:firebase-messaging library to your dependencies.

Be sure to follow the steps to modify the app's AndroidManifest.xml file, and add the Java or Kotlin code to Access the device token. You will need to send that device token to Twilio, which we describe in a later step of this guide.

As a quick check at this point, you can send a push notification through Firebase Cloud Messaging to your app using the Firebase Web Console. Verify that you have Firebase Cloud Messaging working correctly with your server and that you can retrieve a device token before proceeding with the Twilio integration steps in this guide.

## Step 5: Upload your API Key to Twilio

Now that you have your app configured to receive push notifications, upload your API Key by creating a Credential resource. Visit the Push Credentials Creation page to generate a FCM credential SID using the API key. You can also get to the Credentials page by clicking on the Account dropdown in the top left corner of the Twilio Console and then clicking on Credentials from the dropdown Account menu. Once on the Credentials page, click the Push Credentials tab.

On the Push Credentials Page, create a new Push Credential. Give the credential a name and make sure the credential's type is "FCM Push Credentials". Under "FCM Secret", paste your API Key from the end of Step 2. Then, click Create.

The next screen you see after creating the credential includes the new push credential's SID. Keep that credential SID handy for the next step.

## Step 6: Pass the Push Credential Sid in your Access Token

For this step, you will modify your server application to add the push credential SID from the previous step into your server's Access Token generation.

Your Access Token needs to include the Push Credential SID that you got in Step 5. See below for examples in each Twilio server-side SDK of how to generate an Access Token with a ChatGrant that contains a Push Credential SID.

### Creating an Access Token (Chat) with Push Credentials

```python
import os
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import ChatGrant

# required for all twilio access tokens
# To set up environmental variables, see http://twil.io/secure
account_sid = os.environ['TWILIO_ACCOUNT_SID']
api_key = os.environ['TWILIO_API_KEY']
api_secret = os.environ['TWILIO_API_KEY_SECRET']

# required for Chat grants
service_sid = 'ISxxxxxxxxxxxx'
push_credential_sid = 'CRxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
identity = 'user@example.com'

# Create access token with credentials
token = AccessToken(account_sid, api_key, api_secret, identity=identity)

# Create an Chat grant and add to token
chat_grant = ChatGrant(service_sid=service_sid, push_credential_sid=push_credential_sid)
token.add_grant(chat_grant)

# Return token info as JSON
print(token.to_jwt())
```

## Step 7: Use the Registration API in the Twilio ConversationsClient

You will need to call the ConversationsClient API methods, registerFCMToken and unregisterFCMToken, to send the individual Android device's FCM token to Twilio, so that Twilio can send push notifications to the right device. See the Twilio Conversations Android SDK documentation for details.

Nice! That's all you need to do to make sure the Conversations Client can use Firebase Cloud Messaging to send push notifications.