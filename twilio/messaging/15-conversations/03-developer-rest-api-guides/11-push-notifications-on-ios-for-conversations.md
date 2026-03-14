# Push Notifications on iOS for Conversations

Your iOS app users can receive push notifications from Twilio Conversations when important events occur, such as a new message in the conversation.

You will need to do some configuration and integration to get push notifications working with your app, and this guide will walk you through the necessary steps:

- Your Twilio Conversations Service
- The Apple Push Notification Service credential
- Your Conversations Access Token server
- Your iOS application

## Enable push notifications for your Service instance

**IMPORTANT:** The default enabled flag for new Service instances for all Push Notifications is false. This means that Push will be disabled until you explicitly enable it. To do so, please follow our Push Notification Configuration Guide.

**Note:** You will need to configure the sound setting value for each push notification type you want the sound payload parameter to present for, with required value. More information can be found in the previously mentioned Push Notification Configuration Guide.

## Managing your push credentials

Managing your push credentials will be necessary, as your device token is required for the Conversations SDK to be able to send any notifications through APNS. Let's go through the process of managing your push credentials.

Your iOS project's AppDelegate class contains a series of application lifecycle methods. These methods include event listeners such as your app moving to the background or foreground.

When working with push notifications in your iOS application, it is quite likely you will find yourself needing to process push registrations or received events prior to the initialization of your Conversations client. For this reason, we recommend you create a spot to store any registrations or push messages your application receives prior to the client being fully initialized.

The best option for this is to store the registrations or push messages in an instance of a helper class. This way, your Conversations client can process these values post-initialization if necessary or real-time otherwise. If you are doing a quick proof of concept, you could even define these on the application delegate itself but we recommend you refrain from doing this as storing state on the application delegate is not considered a best practice on iOS.

We will assume that you have defined the following properties in a way that makes them accessible to your application delegate method and Conversations client initialization:

### Conversations Push State Variables

```objc
@property (nonatomic, strong) NSData *updatedPushToken;
@property (nonatomic, strong) NSDictionary *receivedNotification;
@property (nonatomic, strong) TwilioConversationsClient *conversationsClient;
```

Your users can choose to authorize notifications or not - if they have authorized notifications, you can register the application for remote notifications from Twilio. Typically, you would do this in AppDelegate.swift in the didFinishLaunchingWithOptions function.

### User Notification Settings

```objc
// Add this to the didFinishLaunchingWithOptions function or a similar place
// once you get granted permissions
UNUserNotificationCenter *currentNotificationCenter = [UNUserNotificationCenter currentNotificationCenter];
[currentNotificationCenter getNotificationSettingsWithCompletionHandler:^(UNNotificationSettings *settings) {
    if (settings.authorizationStatus == UNAuthorizationStatusAuthorized) {
        [UIApplication.sharedApplication registerForRemoteNotifications];
    }
}];
```

After successfully registering for remote notifications, the Apple Push Notification Service (APNS) will send back a unique device token that identifies this app installation on this device. The Twilio Conversations Client will take that device token (as a Data object), and pass it to Twilio's servers to use to send push notifications to this device.

### Store Registration

```objc
- (void)application:(UIApplication*)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData*)deviceToken {
    if (self.conversationsClient && self.conversationsClient.user) {
        [self.conversationsClient registerWithNotificationToken:deviceToken
                                            completion:^(TCHResult *result) {
                                                if (![result isSuccessful]) {
                                                    // try registration again or verify token
                                                }
                                            }];
    } else {
        self.updatedPushToken = deviceToken;
    }
}

- (void)application:(UIApplication*)application didFailToRegisterForRemoteNotificationsWithError:(NSError*)error {
    NSLog(@"Failed to get token, error: %@", error);
    self.updatedPushToken = nil;
}
```

We print an error if it fails, but if it succeeds, we either update the Conversations client directly or save the token for later use.

## Provisioning Apple Developer credentials for APN Pushes

Make sure you have created an "Apple Push Notification service SSL (Sandbox & Production)" certificate on the Apple Developer Portal for your application first.

We're going to need to export both a certificate and a private key from Keychain Access:

1. Start the "Keychain Access" application on your Mac
2. Pick the "My Certificates" Category in the left hand sidebar
3. Right-click the "Apple Development iOS Push Services" certificate for your application's bundle identifier
4. In the popup menu choose "Export…"
5. Save it as "cred.p12" without protecting it with password (leave the password blank)
6. Extract the certificate from "cred.p12" into a "cert.pem" file - run the following command in terminal:

```bash
openssl pkcs12 -in cred.p12 -nokeys -out cert.pem -nodes
```

7. In the cert.pem file, strip anything outside of "-----BEGIN CERTIFICATE-----" and "-----END CERTIFICATE-----" boundaries, such as the "Bag Attributes"

8. Extract your private key from the "cred.p12" (PKCS#12) into the "key.pem" (PKCS#1) file using the following command in terminal:

```bash
openssl pkcs12 -in cred.p12 -nocerts -out key.pem -nodes
```

9. The resulting file should contain "-----BEGIN RSA PRIVATE KEY-----". If the file contains "-----BEGIN PRIVATE KEY-----" run the following command:

```bash
openssl rsa -in key.pem -out key.pem
```

10. Strip anything outside of "-----BEGIN RSA PRIVATE KEY-----" and "-----END RSA PRIVATE KEY-----" boundaries and upload your credentials into the Twilio Platform through the Console.

To store your Credential, visit your Credentials Page and click on the Create New Credential button.

The Credential SID for your new Credential is in the detail page labeled 'Credential SID.'

When you create your access token for the iOS clients, be sure to add your credential SID to the chat grant.

Each of the Twilio server-side SDKs makes provisions to add the push_credential_sid. Please see the relevant documentation for your preferred server-side SDK for details.

```javascript
var chatGrant = new ChatGrant({
    serviceSid: ChatServiceSid,
    pushCredentialSid: APNCredentialSid,
});
```

This is all of the integration you need on the server side to make push notifications work with Twilio Conversations. The next step is to set up your iOS application.

## Integrating Push Notifications

Let's go through the process for integrating push notifications into your iOS app.

The AppDelegate class contains a series of application lifecycle methods. Many important events that occur like your app moving to the background or foreground have event listeners in this class. One of those is the applicationDidFinishLaunchingWithOptions method.

### Did Finish Launching

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
```

In this method, we're going to want to integrate push notifications for our app.

### Notification Types

```objc
UNUserNotificationCenter *currentNotificationCenter = [UNUserNotificationCenter currentNotificationCenter];
[currentCenter requestAuthorizationWithOptions:UNAuthorizationOptionBadge | UNAuthorizationOptionAlert | UNAuthorizationOptionSound
                                completionHandler:^(BOOL granted, NSError *error) {
    // Add here your handling of granted or not granted permissions
}];
currentNotificationCenter.delegate = self;
```

The above code snippet asks the user's permission for notifications, and if granted, registers for remote (push) notifications. That's it! We're now registered for notifications.

## Receiving Notifications

Receiving notifications in our app lets us react to whatever event just occurred. It can trigger our app to update a view, change a status, or even send data to a server. Whenever the app receives a notification, the method didReceiveRemoteNotification is fired.

### Did Receive Notification

```objc
// Do not forget to set up a delegate for UNUserNotificationCenter
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler {
    NSDictionary *userInfo = response.notification.request.content.userInfo;
    // If your application supports multiple types of push notifications, 
    // you may wish to limit which ones you send to the TwilioConversationsClient here
    if (self.conversationsClient) {
        // If your reference to the Conversations client exists and is initialized, 
        // send the notification to it
        [self.conversationsClient handleNotification:userInfo completion:^(TCHResult *result) {
            if (![result isSuccessful]) {
                // Handling of notification was not successful, retry?
            }
        }];
    } else {
         // Store the notification for later handling
         self.receivedNotification = userInfo;
     }
}
```

We will pass the notification directly on to the Conversations client if it is initialized or store the event for later processing if not.

The userInfo parameter contains the data that the notification passes in from APNS. We can update our Conversations client by passing it into the singleton via the receivedNotification method. The manager wraps the Conversations client methods that process the notifications appropriately.

## Integration upon client startup

Once your Conversations client is up and available, you can provide the push token your application received:

### Register Notifications

```objc
if (self.updatedPushToken) {
    [self.conversationsClient registerWithNotificationToken:self.updatedPushToken
                                                 completion:^(TCHResult *result) {
        if (![result isSuccessful]) {
            // try registration again or verify token
        }
    }];
}

if (self.receivedNotification) {
    [self.conversationsClient handleNotification:self.receivedNotification
                                      completion:^(TCHResult *result) {
        if (![result isSuccessful]) {
            // Handling of notification was not successful, retry?
        }
    }];
}
```

## Update badge count

To update badge count on an application icon, you should pass badge count from the Conversations Client delegate to the application:

### Update Badge Count

```objc
- (void)conversationsClient:(TwilioConversationsClient *)client notificationUpdatedBadgeCount:(NSUInteger)badgeCount {
    [UIApplication.currentApplication setApplicationIconBadgeNumber:badgeCount];
}
```