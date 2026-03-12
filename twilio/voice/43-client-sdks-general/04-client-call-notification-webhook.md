# Client-side SDKs - Client Call Notification Webhook

Client Call Notification Webhook




The Client Call Notification Webhook provides developers control over how incoming call notifications are delivered to mobile clients when using Twilio's Voice SDKs. Instead of relying on Twilio to manage your bindings and send push notifications to APNs or FCM on your behalf, your application can receive notifications as a webhook, giving you end-to-end control with your chosen channels.

How incoming mobile calls work now





The Twilio Programmable Voice Android and iOS SDKs use platform push notifications, Firebase Cloud Messaging (FCM) for Android and Apple VoIP Service for iOS, for delivering incoming call notifications. Application developers need to provide their cloud messaging credentials or certificates to Twilio (stored as Push Credentials) to be used for authentication when Twilio sends the push notification delivery requests to FCM or APN. In order to receive incoming call push notifications, an app user needs to first register a push binding, which indicates the mobile client is active ready for incoming calls. Upon receiving the push notification, the application uses the Android Voice.handleMessage() method or the iOS TwilioVoiceSDK.handleNotification() method and passes the push notification payload. A call invite callback event will be raised to the application so the user can choose to accept or reject the call.

There are a few limitations with the current solution:

Twilio Voice mobile SDK only supports FCM and Apple VoIP Service. Developers have been asking if they can use different types of push services, for example the regular APN notification for iOS, which does not share the PushKit-CallKit requirement as the Apple VoIP Service notification does, or even manage the delivery themselves.
Developers need to provide their cloud messaging service credentials to Twilio, which may raise concerns for the developers.
There is no API for client binding management. The only way to delete a binding created by the Voice mobile SDK is using the SDK Voice.unregister() method.
Developers sometimes receive Twilio notifications about push notification delivery failure because the information inside the bindings are longer valid, but cannot do much.
The application needs to be run on the specific device in order to retrieve the same device token used for creating the binding unless similar binding information (identity, device token, etc) is stored in the application's database.
Without a binding management API it's very difficult to perform batch binding CRUD operations.
Using the client call notification webhook





When placing a call to a client user, set the Client Notification URL parameter to a webhook endpoint of your choice. Twilio will send the call notification to your webhook instead of sending it to FCM or APN. You are responsible for delivering the call notifications directly to your mobile clients via the channels that are best suited for your application, such as a push notification.

Below are the requirements to adopt the feature:

Configure the webhook
Manage client bindings for your users
Set up a webhook endpoint to handle call notifications
Webhook configuration

The webhook can be set dynamically for each call via the Calls API, Conference Participants API, and <Client> TwiML. The webhook can also be statically configured without modifying your code through the Voice Client Configuration Resource API.

Client binding management

In order to deliver call notifications to your users, you must maintain a list of active clients. Each active client entry should contain:

Client identity: if the identity matches the call receiver identity inside the webhook request body, send a notification to this client. Note that Twilio currently allows multiple client instances to have the same identity (under the same Twilio account). When a call is made to this client identity, all instances with the same identity should receive the call notification.
Twilio Account SID: the call notification sent from Twilio will indicate that the call is made for the clients under a specific Twilio account. Only client instances under this account should receive the call notification.
(Optional) Unique device identifier: depending on the delivery mechanism you choose, there should be a unique identifier which can be associated with a specific device. For example, a device token for sending push notifications to an Android or iOS app.
(Optional) Unique binding identifier: makes it easier in case client binding information needs to be updated or deleted.
Webhook handler


(information)
Info
You will receive notifications to your Client Notification URL for both mobile and non-mobile client users.
Set up a webhook handler for your application to receive HTTP POST requests with information about the client call. The webhook endpoint should return a response:

200 OK: client binding with matching identity and Twilio Account SID is found and call notification dispatched to the client.
404 Not Found: no client binding with the same identity and Twilio Account SID can be found.
The body of the POST request consists of several key parameters of the call in JSON format:



Copy code block
{
    "twi_account_sid": ACxxxx,
    "twi_bridge_token": "eyJraxxxx",
    "twi_call_sid": CAxxxx,
    "twi_from": "client:alice",
    "twi_message_id": WBxxxx,
    "twi_message_type": "twilio.voice.call",
    "twi_to": "client:bob"
}
Parameters:

Parameter	Definition
twi_account_sid	The Twilio Account SID used for generating this call.
twi_bridge_token	An encrypted token for the mobile client to connect back to the caller.
twi_call_sid	The Twilio Call SID.
twi_from	The caller ID.
twi_to	The callee ID.
twi_message_id	A unique ID associated with this webhook request.
twi_message_type	A string value "twilio.voice.call" indicating this notification is for an incoming call.
twi_params (optional)	Custom parameters will be listed here as URL-encoded parameters when provided in the <Client> TwiML or REST Call API. Check out here for more information about custom parameters.
If bindings matching both the Account SID and the callee identity are found, deliver the JSON body directly, without modification, to the clients through the most suitable communication channel for the application's use case, such as push notifications or web sockets. The mobile application will then pass the payload to the Android Voice.handleMessage() method or the iOS TwilioVoiceSDK.handleNotification() method upon receiving the notification, just like how it works when Twilio sends the incoming call notifications via push notification, and an incoming call invite will be raised to the application for the user to answer.

Here's an example in Python for handling a webhook request and sending the notification payload to the mobile client via push notification:



Copy code block
from flask import Flask, request, Response
app = Flask(__name__)

@app.route("/calls/notificationWebhook", methods=["POST"])
def call_notification_webhook():
    try:
        notification_payload = request.json
    except:
        notification_payload = None
        logging.error("error in parsing request form data as JSON: \n{}".format(sys.exc_info()[0]))
        return Response(status=400, mimetype="text/plain")

    # Get the callee identity
    twilio_to = notification_payload["twi_to"]
    twilio_to_components = twilio_to.split(':')
    if len(twilio_to_components) == 2:
        callee_client_identity = twilio_to_components[1]
    else:
        logging.error("error parsing the callee identity in twi_to")
        callee_client_identity = None

    # Get the Twilio Account SID
    twilio_account_sid = notification_payload["twi_account_sid"]

    if not callee_client_identity:
        return Response("Invalid callee identity", status=400, mimetype="text/plain")

    global binding_data
    # Use the identity and account SID for binding lookup
    bindings = binding_data.get_bindings_by_identity(callee_client_identity, twilio_account_sid)

    if not len(bindings):
        response = Response('Not found', status=404, mimetype="text/plain")
        return response

    for binding in bindings:
        # Send a push notification to this client
        notification_webhook_processor.notification_dispatch(binding, notification_payload)

    response = Response(status=200, mimetype="text/plain")
    return response