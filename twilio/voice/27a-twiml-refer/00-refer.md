# TwiMLTM Voice: <Refer>

During a programmable SIP call, the TwiML <Refer> verb instructs Twilio to initiate a SIP Refer (i.e transfers) towards a SIP infrastructure and handles any NOTIFY messages. You can invoke the verb using REST API as well.

The <Refer> verb can be invoked on both inbound and outbound SIP calls. For example, on an inbound SIP call to a Twilio SIP Domain, you may want to transfer the caller back to your in-house or legacy SIP infrastructure. By initiating the <Refer> verb, Twilio instructs your SIP device to initiate a new call to the external system and replace the Twilio leg with that new call.

You can initiate a <Refer> at any point in the duration of a call. For example, with an outbound SIP call created by the <Sip> noun or the Twilio REST API to a SIP Domain, can be used at any point to transfer the caller back to your in-house or legacy SIP infrastructure. By initiating the <Refer> verb, Twilio instructs your SIP device to initiate a new call to the external system and replace the Twilio leg with that new call.


(warning)
Warning
<Refer> is only supported on SIP call legs because the REFER method is a SIP-specific feature. Non-SIP leg types, such as PSTN and Twilio Voice SDK calls are not supported and will result in an error. For more information on what constitutes a SIP call leg, see Understanding Call Legs below.
The example below shows <Refer> established in an inbound call leg:

SIP call transfer using SIP REFER with PBX and IVR components.

Expand image
Once initiated, the <Refer> verb will generate a SIP REFER message with the target SIP URI specified using the <Sip> noun. If the SIP endpoint accepts the REFER request, Twilio will listen for SIP NOTIFY messages from the endpoint to monitor the state of the new call initiated in response to the REFER. Twilio will report these back to your application as parameters to the action URL, if specified.

The following example shows the most basic use of <Refer>.

Basic Refer example





Report code block


Copy code block
from twilio.twiml.voice_response import Refer, VoiceResponse

response = VoiceResponse()
refer = Refer()
refer.sip('sip:alice@example.com')
response.append(refer)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Refer>
        <Sip>sip:alice@example.com</Sip>
    </Refer>
</Response>
<Refer> Attributes





Attribute Name	Allowed Values	Default Value
action	Relative or absolute URL	None
method	GET, POST	POST
action





The action attribute accepts a URL as its argument. This URL tells Twilio where to make a POST or GET request after the <Refer> verb finishes executing.

Refer with action URL





Report code block


Copy code block
from twilio.twiml.voice_response import Refer, VoiceResponse

response = VoiceResponse()
refer = Refer(action='/handleRefer', method='POST')
refer.sip('sip:alice@example.com')
response.append(refer)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Refer action="/handleRefer" method="POST">
        <Sip>sip:alice@example.com</Sip>
    </Refer>
</Response>
Twilio's request to this URL may include the following additional parameters:

Parameter	Description
ReferCallStatus	Similar to the CallStatus parameter, this provides the application with our understanding (based on SIP NOTIFY messages) of the status of the new call created in response to the REFER. If the REFER fails or the endpoint does not send any NOTIFY requests, this parameter will be omitted.
ReferSipResponseCode	The SIP response code received in response to the REFER request Twilio sends to the SIP endpoint.
NotifySipResponseCode	This is the last SIP response code received on the referred leg, as determined by examining the SIP NOTIFY messages. E.g. If the SIP endpoint initiated a new call but received a SIP 404 response due to the target not being found, this parameter would be set to "404". If the REFER fails or the endpoint does not send any NOTIFY requests, this parameter will be omitted.
Note that only <Refer>-specific parameters are listed here. Twilio will also send the standard TwiML Voice parameters in the request.

To further illustrate how the <Refer> parameters work, we have provided a few example scenarios:

Twilio issues a REFER, and the SIP endpoint successfully initiates a new call to the transfer target:
ReferCallStatus: "in-progress"
ReferSipResponseCode: "202"
NotifySipResponseCode: "200"
Twilio issues a REFER, and the SIP endpoint initiates a new call to the transfer target. However, the new call fails with an error:
ReferCallStatus: "busy" (or "failed" depending on the value of NotifySipResponseCode)
ReferSipResponseCode: "202"
NotifySipResponseCode: "486"
Twilio issue a REFER, but the SIP endpoint responds to the REFER with an error:
ReferCallStatus: "failed"
ReferSipResponseCode: "405"
The caller hangs up before the <Refer> transaction has completed:
ReferCallStatus: "canceled"
ReferSipResponseCode: "202"
NotifySipResponseCode: "180"
method





The method attribute accepts either GET or POST. This tells Twilio whether to request the action URL via HTTP GET or POST, with POST as its default value.

Understanding Call Legs





Because <Refer> is a SIP-specific feature, it can only be used on SIP call legs. In the typical IVR scenario, there will be only a single call leg to/from Twilio—such as an inbound call to a Twilio phone number or SIP domain, or an outbound call initiated by the Twilio REST API. In these cases, as long as the call is between Twilio and a SIP device, <Refer> can be used. Therefore, calls with Sids CAaaaa and CAbbbb are SIP call legs where the <Refer> verb is allowed.

Diagram showing SIP device communication with Twilio using SIP leg and Refer allowed.

Expand image
In a bridged call scenario, such as when using the <Dial> verb, there may be two legs with Twilio as demonstrated in the scenario below:

Diagram showing PSTN to SIP call flow through Twilio with refer allowed on SIP leg.

Expand image
In the above call flow, the call with Sid CAdddd is SIP call leg where the <Refer> verb is allowed. Invoking <Refer> on CAcccc would result in an error.

Passing context via SIP Headers





When using <Refer> to transfer a caller between independent internal systems, there may be a desire to pass contextual information about the call. For example, if you are building an IVR on Twilio that collects a customer's account number and reason for calling before transferring the call to a call center, you likely want to pass the account information captured by the IVR to the call center system. This contextual information is often passed in SIP Headers.

Twilio allows you to specify any valid SIP URI within the <Sip> noun to be used as the REFER target. The standard SIP mechanism for specifying headers in a SIP URI can be used, assuming your endpoint or device respects the headers in the target URI when following the REFER.

Refer with SIP Headers





Report code block


Copy code block
from twilio.twiml.voice_response import Refer, VoiceResponse

response = VoiceResponse()
refer = Refer()
refer.sip(
    'sip:alice@example.com?X-AcctNumber=123456&X-ReasonForCalling=billing-question'
)
response.append(refer)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Refer>
        <Sip>sip:alice@example.com?X-AcctNumber=123456&amp;X-ReasonForCalling=billing-question</Sip>
    </Refer>
</Response>
Any allowable SIP header can be passed in the URI, so long as your endpoint or device supports stamping the header.

Refer with SIP User-to-User Header





Report code block


Copy code block
from twilio.twiml.voice_response import Refer, VoiceResponse

response = VoiceResponse()
refer = Refer()
refer.sip('sip:alice@example.com?User-to-User=123456789%3Bencoding%3Dhex')
response.append(refer)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Refer>
        <Sip>sip:alice@example.com?User-to-User=123456789%3Bencoding%3Dhex</Sip>
    </Refer>
</Response>
Monitoring the status of referred calls using the action URL





When SIP endpoints receive a REFER request, they initiate a new call to the target SIP URI specified in the request. The transfer is typically not complete until the new call is fully established. Most SIP endpoints provide feedback on the progress of the new call to the transferor through the SIP NOTIFY mechanism. If the transfer fails, the SIP endpoint will typically resume the original call with your Twilio app.

The <Refer> verb will automatically subscribe to and listen for SIP NOTIFY messages from your endpoint. The verb will wait for a final NOTIFY message indicating either call success or failure, and then continue the call by invoking the specified action URL. If the action parameter is omitted, Twilio will invoke the next verb in your TwiML document. If there are no further verbs to process, the Twilio call will be ended.

Based on the parameters passed to the action URL, you can resume handling the call accordingly if the transfer fails (e.g. ReferCallStatus is not "in-progress").

The <Refer> verb will return once one of the following circumstances occurs:

Twilio receives a SIP NOTIFY message indicating that the new call has received a 200 OK or error response
The SIP endpoint terminates or times out the NOTIFY subscription
The call to Twilio is hung up