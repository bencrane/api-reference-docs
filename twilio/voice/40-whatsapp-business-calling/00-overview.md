whatsapp overview




WhatsApp Business Calling with Twilio Programmable Voice





WhatsApp Business Calling adds Voice-over-IP (VoIP) calling to communications between customers and businesses using the WhatsApp consumer application. Customers can use the WhatsApp consumer app to communicate with businesses via a single thread for both messaging and voice. Businesses can use the Twilio Programmable Voice and Programmable Messaging APIs to enable data-driven, contextual communication with those customers.


(warning)
Warning
The WhatsApp Business Platform is not supported in the following sanctioned countries: Cuba, Iran, North Korea, Syria, and three regions in Ukraine: Crimea, Donetsk, and Luhansk.
Twilio WhatsApp Business Platform





Registration of your WhatsApp sender for use with Twilio Programmable Voice can be done using the Twilio WhatsApp Business Platform, currently found under our Twilio Programmable Messaging platform and APIs. WhatsApp Messaging is required to use WhatsApp Business Calling.

Onboard your WhatsApp Business Account and senders





To use WhatsApp Business Calling with Twilio Programmable Voice, you will first need a WhatsApp-activated phone number, also referred to as a WhatsApp sender, that can send and receive WhatsApp messages. Learn how to register a WhatsApp sender.


(information)
Info
User-initiated (inbound) calling is available for WhatsApp senders in all Meta Cloud API supported countries

.

Business-initiated (outbound) calling is available for WhatsApp senders in all Meta Cloud API supported countries

 except for the following countries:

USA
Canada
Egypt
Nigeria
Turkiye
Vietnam
Note: The business phone number's country code must be in this supported list. The consumer phone number can be from any country where Cloud API is available

.
Once you have an approved WhatsApp sender, continue below to get started with WhatsApp Business Calling.

Twilio Configuration and enablement





To learn how to your sender can use WhatsApp Business Calling, watch the following video.


Configure your sender for Programmable Voice





You can configure your onboarded WhatsApp sender for Programmable Voice by selecting a TwiML Voice Application SID

. You can configure a TwiML Voice Application via your Twilio Console or API.

Meta prerequisites

To enable WhatsApp Business Calling on your sender, your WhatsApp business account needs to have a messaging limit of at least 2,000 business-initiated conversations

 in a rolling 24-hour period. To achieve this limit, you need to complete Meta's Business Verification. To speed verification

, Meta recommends using a Meta partner like Twilio.


(warning)
Warning
If your account does not meet these prerequisites, you will not be able to save the Voice Endpoint Configuration on your sender.
Create a Programmable Voice application

To handle the inbound call, you will need a Twilio Programmable Voice application. This could be as simple as an application to play an MP3 recording, as complex as a contact center built using Twilio Flex, or anything in between.

Refer to the Twilio Programmable Voice documentation for more information. A good place to start would be the tutorial on handling inbound calls. If you have an existing Programmable Voice solution configured on a Twilio phone number, that may be an option to use here.

Once you have a Voice application to handle your calls, you will need to configure it as a TwiML application that you can use to configure your WhatsApp number to handle inbound voice calls from WhatsApp end users. You can find your TwiML applications in your Twilio Console under Voice > Manage > TwiML Apps.

If you don't have a TwiML Application SID already, you can create one: How do I create a TwiML App

The only configuration you need is the Request URL where you will send the webhooks for your inbound WhatsApp voice calls to your application.
You should only configure the Voice Configuration section; don't configure the Messaging Configuration section, as it's not used here.
Create TwiML App with WhatsApp voice configuration and HTTP POST request method.

Expand image
When created, you can get the Application SID to use for your WhatsApp Business Calling configuration:

WJH WhatsApp Call Demo with TwiML App SID and voice configuration settings.

Expand image
Activate your sender for WhatsApp Business Calling using Twilio Console

Once you have a TwiML application to use, you can set it under the WhatsApp sender, in the Voice Endpoint Configuration section:

WhatsApp sender configuration with messaging and voice endpoint options.

Expand image
Configuring the Voice Configuration of your sender with a TwiML application activates WhatsApp Business Calling on that sender. You can deactivate WhatsApp Business Calling by removing the TwiML application from the configuration.

Activate your sender for WhatsApp Business Calling via Twilio API

You can also set the Voice Configuration of your sender to your TwiML Application SID

 using the Messaging API and the WhatsApp Senders resource.

Set the voice_application_sid parameter on your onboarded sender to the TwiML Application SID of your Voice application.

Setting a sender's Voice Application SID:



Copy code block
curl -X POST https://messaging.twilio.com/v2/Channels/Senders/XExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx \
  -H "Content-Type: application/json; charset=utf-8" \
  -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
  -d '{
    "configuration": {
      "voice_application_sid": "APxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }
  }'
Output:



Copy code block
{
  "configuration": {
    "verification_code": null,
    "verification_method": "sms",
    "voice_application_sid": "APxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "waba_id": null
  },
  "offline_reasons": null,
  "profile": null,
  "properties": null,
  "sender_id": null,
  "sid": "XExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "status": "ONLINE:UPDATING",
  "url": "https://messaging.twilio.com/v2/Channels/Senders/XExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "webhook": null
}
Note: Configuring the Voice Configuration of your sender with a TwiML application activates WhatsApp Business Calling on that sender. You can deactivate WhatsApp Business Calling by setting the voice_application_sid parameter to null.

User-initiated (inbound) calling—WhatsApp to Twilio call flow





WhatsApp consumers can initiate a call to a business using either the business's calling icon (if activated), or using a voice call-to-action button sent by the business via a template, described below. Calls that are sent to your WhatsApp sender will generate a webhook to your Twilio Voice application, which will handle the call in the same manner as inbound calls to a Twilio phone number.

WhatsApp to Twilio call flow with inbound and outbound legs using VoIP, WebRTC, and SIP.

Expand image
Note Calls from WhatsApp endpoints can't be connected to Public Switched Telephone Network (PSTN) endpoints. Such calls will be rejected.
WhatsApp messaging templates





You'll to use WhatsApp message templates to send a new voice call button that customers can use to initiate a call into your Voice application; button type is VOICE_CALL.

Quick overview

What is supported for end users:

Creation of a content template to send a voice call button to initiate a voice call over WhatsApp
Template can be sent in a messaging session
Template can be sent out of session as an approved template
Voice call buttons can be added in the actions object in twilio/card, whatsapp/card, and twilio/call-to-action. To learn more about how to create each type, refer to the following pages:
twilio/card
whatsapp/card
twilio/call-to-action
WhatsApp chat showing voice call attempts and messages with Twilio Test 1 Brazil.

Expand image
Create your voice call content template via API

Note: You can also create this template in your Twilio console's Content Template Builder, using content type Card and button type Voice Call.

VOICE_CALL button object

Parameter	Type	Required	Variable support	Description
title	String	Yes	No	The button text of the voice call button
type	ENUM	Yes	No	Set to VOICE_CALL for a voice call button
Create a voice call template

Creation of the voice call template is done using the Twilio API or Console Template Builder, and generates a Content SID, which is a unique identifier for the template. The Content SID can be found in the output from the request.

Voice call on a twilio/card



Copy code block
curl -X POST https://content.twilio.com/v1/Content \
  -H 'Content-Type: application/json' \
  -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
  -d '{
     "friendly_name": "voice_call_test",
     "language": "en",
     "variables": {"1": "name"},
     "types": {
       "twilio/card": {
         "title": "Hello {{1}} let'\''s continue on a call.",
         "actions": [
           {
             "title": "Call now",
             "type": "VOICE_CALL"
           }
         ]
       }
     }
}'
Output:



Copy code block
{
  "account_sid": "ACXXXXXX",
  "date_created": "2024-05-03T17:59:30Z",
  "date_updated": "2024-05-03T17:59:30Z",
  "friendly_name": "voice_call_test",
  "language": "en",
  "links": {
    "approval_create": "https://content.twilio.com/v1/Content/HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/ApprovalRequests/whatsapp",
    "approval_fetch": "https://content.twilio.com/v1/Content/HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/ApprovalRequests"
  },
  "sid": "HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "types": {
    "twilio/card": {
      "actions": [{
        "title": "Call now",
        "type": "VOICE_CALL"}],
        "body": null,
        "media": null,
        "subtitle": null,
        "title": "Hello {{1}} let's continue on a call."
      }
    },
    "url": "https://content.twilio.com/v1/Content/HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "variables": {
      "1": "name"
    }
}
Submit your voice template for WhatsApp approval

If you plan to communicate in a session with a user using a WhatsApp template, you must first submit the template to Meta for approval. Insert the Content SID into the locations highlighted below. Meta also requires you to identify whether this is a marketing or utility template. Misclassification may result in template rejection.

Template approval request



Copy code block
curl -X POST 'https://content.twilio.com/v1/Content/HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/ApprovalRequests/whatsapp' \
  -H 'Content-Type: application/json' \
  -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
  -d '{
     "name": "voice_call_test",
     "category": "UTILITY"
  }'
Send a message using your message template

Once the template is created, the business can send a voice call button as a message using the template.

To learn about how to send a message using a message template, refer to the following:

Send a WhatsApp message using a template
Send Templates Created with the Content Template Builder
Content send request



Copy code block
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
  --data-urlencode "ContentSid=Hxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
  --data-urlencode "From=whatsapp:+558551234567" \
  --data-urlencode "To=whatsapp:+555551234567" \
  -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
Example

WhatsApp chat showing a marketing template with voice call and contact support buttons.

Expand image
Current restrictions to user-initiated calling





From WhatsApp (Meta)

The maximum number of concurrent calls to/from a WhatsApp sender is 1,000.
Calls to WhatsApp destinations cannot be connected to Public Switched Telephone Network (PSTN) endpoints.
From Twilio

The calling icon and business hours for your business's sender can only be activated or deactivated in your WhatsApp Business Account Manager

 on Meta.
The callback permission status for your business's sender can only be activated or deactivated in your WhatsApp Business Account Manager

 on Meta.
WhatsApp Manager interface showing phone number settings with options for voice calls and business hours.

Expand image
Business-initiated (outbound) calling—Twilio to WhatsApp call flow





Your Twilio Voice application can also send calls from your WhatsApp Business Account to WhatsApp users on their WhatsApp messenger application.

WhatsApp outbound call flow with Twilio, showing VoIP and WebRTC connections.

Expand image

(information)
Info
Calls to WhatsApp endpoints can't be connected to Public Switched Telephone Network (PSTN) endpoints. These calls will be rejected.
Business-initiated call permission and consent





To place an outbound call to a WhatsApp user, a business needs to establish call permission approval from the consumer in advance. There are two ways to get the call permission approval:

The business sends a call permission request to the consumer and the consumer approves it:
WhatsApp chat showing a call permission request with options to allow or deny a call from Spruce.

Expand image
The consumer places a call to the business but the business doesn't pick up the call. The business can send a callback permission request:
WhatsApp call flow showing missed call and callback permission request from Spruce.

Expand image
See below how the business, as a Twilio customer, can send the call permission request to the consumer in Twilio.

Create a calling permission request template

You first need to create a twilio/call-to-action template for the calling permission request using the Twilio API. This generates a Content SID, which is a unique identifier for the template. The Content SID can be found in the output from the request:



Copy code block
curl -X POST 'https://content.twilio.com/v1/Content' \
  -H 'Content-Type: application/json' \
  -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
  -d '{
    "friendly_name": "voice_call_request",
    "language": "en",     
    "types": {
      "twilio/call-to-action": {
        "body":"test",         
        "actions": [
          {             
            "type": "VOICE_CALL_REQUEST",
            "title": "Call Request" 
          }         
        ]       
    }     
  } 
}'
Output:



Copy code block
{   
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",   
  "date_created": "2024-11-07T21:28:38Z",   
  "date_updated": "2024-11-07T21:28:38Z",   
  "friendly_name": "voice_call_request",   
  "language": "en",   
  "links": {     
    "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp",     
    "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests"   
  },   
  "sid": "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",   
  "types": {     
    "twilio/call-to-action": {
      "actions": [
        {           
          "title": "Call Request",           
          "type": "VOICE_CALL_REQUEST"         
        }       
      ],       
      "body": "test"     
    }   
  },   
  "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",   
  "variables": {} 
}
Note: The VOICE_CALL_REQUEST action must be the only call-to-action button in the template. It cannot be combined with other action types such as URL, PHONE, or VOICE_CALL.

The body parameter in twilio/call-to-action is a required property, so it must have a value. However, this will be ignored when Twilio sends the actual request to WhatsApp.
The title parameter in VOICE_CALL_REQUEST action type is also a required property, but will be ignored, similar to the body parameter.
Unlike other WhatsApp templates, the VOICE_CALL_REQUEST template does not need to be submitted for WhatsApp approval before using it. This is because the call permission can be sent in active conversations/sessions.

Note: You can also create this template in your console's Content Template Builder, using content type "Call to action" and action type "Voice Call Request".

Sending the call permission request message from the template

Once the template is created, the business can send a voice call request as a message using the template.

To learn about how to send a message using a message template, refer to the following:

Send a WhatsApp message using a template
Send Templates Created with the Content Template Builder


Copy code block
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
  --data-urlencode "ContentSid=HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
  --data-urlencode "From=whatsapp:+558551234567" \
  --data-urlencode "To=whatsapp:+555551234567" \
  -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
ContentSid is the template SID in the output of the create request.
From is a WhatsApp sender of the business. This will be the caller in the outbound call.
To is the WhatsApp consumer number. This will be the callee in the outbound call.
Receive the call permission request result in a webhook

When the user responds to a call permission request, a webhook will be returned to the Messaging Webhook URL configured for the applicable WhatsApp sender number.



Copy code block
POST /www/twiml/whatsapp-text.xml HTTP/1.1.
Host: xxxx.ngrok.io.
User-Agent: TwilioProxy/1.1.
Content-Length: 468.
Accept: */*.
Content-Type: application/x-www-form-urlencoded.
I-Twilio-Idempotency-Token: b00cd941-9b6e-49c3-84fb-e2af2cf92cc7.
X-Forwarded-For: xxx.xxx.xxx.xxx.
X-Forwarded-Host: xxxx.ngrok.io.
X-Forwarded-Proto: https.
X-Home-Region: stage-us1.
X-Twilio-Signature: IJE/ao63CwJRr07hdmuL/F/jIgw=.
.
SmsMessageSid=SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&NumMedia=0&ProfileName=XXXX+Caller+BR-2&MessageType=interactive&SmsSid=SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&WaId=5524987654321&SmsStatus=received&Body=VOICE_CALL_REQUEST&ButtonText=VOICE_CALL_REQUEST&To=whatsapp%3A%2B554123456789&ButtonPayload=REJECTED&ReferralNumMedia=0&MessageSid=SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&AccountSid=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&From=whatsapp%3A%2B5524987654321&ApiVersion=2010-04-01
The webhook Body parameter will be set to VOICE_CALL_REQUEST.
The request response value will be in the ButtonPayload parameter; possible values are ACCEPTED or REJECTED.
Place a call to a WhatsApp consumer





Once you have established permission to place a business-initiated call to a WhatsApp consumer, you can place the call using Twilio Programmable Voice, via API or TwiML.

Place a call using Twilio Programmable Voice API

You can initiate a call to WhatsApp destinations using a Call resource, similar to any other channel; the syntax to use for WhatsApp caller ID and destinations is whatsapp:{number}.

Note: All API-generated calls to WhatsApp destinations must use a From value that is set to a WhatsApp sender that is registered and activated for Voice calling on the Twilio account the call is being placed from. The format must be whatsapp:{sender}, as shown in the example below.



Copy code block
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls.json" \
  --data-urlencode "From=whatsapp:+558551234567" \
  --data-urlencode "To=whatsapp:+555551234567" \
  --data-urlencode "Url=http://demo.twilio.com/docs/voice.xml" \
  -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
Place a call using Twilio Programmable Voice TwiML

You can initiate a call to WhatsApp numbers using the TwiML Voice <Dial> verb, similar to any other channel; there is a new <WhatsApp> noun to use, and the syntax to use for WhatsApp caller ID and destinations is whatsapp:{number}.

Note: All TwiML-generated calls to WhatsApp destinations must use a callerId attribute that is set to a WhatsApp sender that is registered and enabled for Voice calling on the Twilio account the call is being placed from. The format must be whatsapp:{sender}, as shown in the example below.



Copy code block
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial callerId="whatsapp:+558551234567">
    <WhatsApp>+555551234567</WhatsApp>
  </Dial>
</Response>
Current restrictions to business-initiated calling





From WhatsApp

The call permission request can be sent at most once in 24 hours, and no more than two requests in seven days.
Users may approve, decline, not respond, or change their response before the request expires.
Once permission is granted, the business can place five calls per 24 hours, for a maximum of seven days before having to request permission again.
The call permission expires in these cases:
Seven days after it is approved, rejected, or not responded to.
A new call permission is requested and approved.
After two consecutive missed calls, the user will be prompted again to possibly change permission.
After four consecutive missed calls, permission will be automatically revoked.
The maximum number of concurrent calls to/from a WhatsApp sender is 1,000.
Calls to WhatsApp destinations cannot be connected to Public Switched Telephone Network (PSTN) endpoints.
From Twilio

The VOICE_CALL_REQUEST template does not require submission for WhatsApp approval.
In cases where you want to use text as part of the template, you must submit it for WhatsApp approval.
If you do not submit for approval, you cannot add any additional message text, and the template can be used only to send call permissions in existing sessions.
Connect WhatsApp Business Calling to Twilio Flex





To integrate WhatsApp Business Voice Calls with Twilio Flex, you'll need a TwiML application (as described above).

This will determine whether incoming calls are routed directly to Flex or through a Studio Flow (IVR) for additional processing.

Send calls straight to Flex





Navigate to TwiML Bins

.
Click on the + sign to create a new TwiML Bin. Use the following TwiML Bin:


Copy code block
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Enqueue action="" method="POST" workflowSid="[TASKROUTER_WORKFLOW_SID]">call</Enqueue>
</Response>
Replace [TASKROUTER_WORKFLOW_SID] with the expected Workflow SID.

Save and copy the TwiML Bin URL.
Now that you have a TwiML Bin, you can create a TwiML application, as described above:

Navigate to TwiML Apps

.
Create a new TwiML application by clicking on Create a New TwiML App.
Give it a friendly name such as "WhatsApp Calling App".
In the Voice Configuration section, enter the URL of your TwiML Bin.
Click Create and then click again on the recently created TwiML application.
This TwiML application will be used to configure the Voice Configuration on your WhatsApp sender. If you are using the API to configure the sender, you'll want to copy the Application SID (APxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx). If you configure using the Console, you will want to remember the friendly name you gave the application.
Send calls to Flex using Studio





Navigate to TwiML Apps

.
Create a new TwiML application by clicking on Create a New TwiML App.
Give it a friendly name such as "WhatsApp Calling App".
In the Voice Configuration section, enter the URL of your Studio Flow:


Copy code block
https://webhooks.twilio.com/v1/Accounts/ACCOUNT_SID/Flows/STUDIO_FLOW_SID
Replace ACCOUNT_SID and STUDIO_FLOW_SID with your Account SID and the Studio Flow SID.

Click Create and then click again on the recently created TwiML application.
This TwiML application will be used to configure the Voice Configuration on your WhatsApp sender. If you are using the API to configure the sender, you'll want to copy the Application SID (APxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx). If you configure using the Console, you will want to remember the friendly name you gave the application.