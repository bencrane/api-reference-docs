TwiML™ Voice: <Application>




The <Dial> verb's <Application> noun allows you to connect a call to another Twilio account without losing the original call leg's context (e.g. the original From number). Rather than dialing a phone number or SIP endpoint, you can <Dial> a TwiML App

directly with <Dial><Application>. <Dial><Application> also supports sending custom parameters using <Parameter>.

TwiML Apps

 can be managed in the Twilio Console or via the REST API using the Application Resource.

You can also direct a call to a TwiML App

 within your TwiML account using <Dial><Application>.

Note: Simultaneous dialing is NOT supported when performing <Dial><Application>.


(information)
Info
This page covers <Application>'s attributes, supported TwiML nouns, and supported <Dial>'s attributes.

To learn more about how use <Dial><Application>, how Twilio handles <Dial><Application> instructions, and an example scenario, see <Dial><Application> usage.
Table of Contents





Basic usage
<Application> attributes
customerId
copyParentTo
Supported TwiML nouns
<ApplicationSid>
<Parameter>
Supported <Dial> attributes
Basic usage





The TwiML example below shows the most basic use of <Dial><Application>.

Basic <Dial><Application>





Report code block


Copy code block
from twilio.twiml.voice_response import Application, ApplicationSid, Dial, VoiceResponse

response = VoiceResponse()
dial = Dial()
application = Application()
application.application_sid('AP1234567890abcdef1234567890abcd')
dial.append(application)
response.append(dial)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Application>
      <ApplicationSid>AP1234567890abcdef1234567890abcd</ApplicationSid>
    </Application>
  </Dial>
</Response>
<Application> attributes





<Application> supports the following attributes:

Attribute	Allowed Values	Default Value
customerId optional	a string up to 256 characters in length	The Twilio Account SID that is providing the <Dial><Application> TwiML instructions
copyParentTo optional	true, false	false
customerId





<Application>'s customerId attribute allows you to set an identifier for the "sender" of the <Dial><Application>. The customerId will be sent as a parameter in Twilio's request to the TwiML App

's Voice Request URL.

The customerId attribute can be any string up to 256 characters.

The default value of the customerId attribute is the Account SID associated with the <Dial><Application> TwiML.

The customerId attribute is optional.

<Dial><Application> with customerId attribute





Report code block


Copy code block
from twilio.twiml.voice_response import Application, ApplicationSid, Dial, VoiceResponse

response = VoiceResponse()
dial = Dial()
application = Application(customer_id='CustomerFriendlyName')
application.application_sid('AP1234567890abcdef1234567890abcd')
dial.append(application)
response.append(dial)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Application customerId="CustomerFriendlyName">
      <ApplicationSid>AP1234567890abcdef1234567890abcd</ApplicationSid>
    </Application>
  </Dial>
</Response>
copyParentTo





<Application>'s copyParentTo attribute, when set to true, uses the parent call's To parameter as the To parameter in the request to the TwiML App

's Voice URL.

When the copyParentTo value is false, the To field is the dialed TwiML App

's SID.

The default value of the copyParentTo attribute is false.

The copyParentTo attribute is optional.

<Dial><Application> with copyParentTo attribute





Report code block


Copy code block
from twilio.twiml.voice_response import Application, ApplicationSid, Dial, VoiceResponse

response = VoiceResponse()
dial = Dial()
application = Application(copy_parent_to=True)
application.application_sid('AP1234567890abcdef1234567890abcd')
dial.append(application)
response.append(dial)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Application copyParentTo="true">
      <ApplicationSid>AP1234567890abcdef1234567890abcd</ApplicationSid>
    </Application>
  </Dial>
</Response>
<Application> Nouns





<Application> accepts nested <ApplicationSid> and <Parameter> nouns.

<Application> is required, while <Parameter> is optional.

<ApplicationSid>





In order to use <Dial><Application>, an <ApplicationSid> noun must be nested within <Application>'s opening and closing tags.

Between <ApplicationSid>'s opening and closing tags, specify the SID of the TwiML App

 that you wish to dial.

Basic <Dial><Application>





Report code block


Copy code block
from twilio.twiml.voice_response import Application, ApplicationSid, Dial, VoiceResponse

response = VoiceResponse()
dial = Dial()
application = Application()
application.application_sid('AP1234567890abcdef1234567890abcd')
dial.append(application)
response.append(dial)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Application>
      <ApplicationSid>AP1234567890abcdef1234567890abcd</ApplicationSid>
    </Application>
  </Dial>
</Response>
<Parameter>





<Dial><Application> supports <Parameter> nouns, which allows you to pass custom parameters in Twilio's request to the receiving TwiML App's Voice URL.

You may nest one or more <Parameter> nouns within <Application>.

Each <Parameter> noun nested inside <Application> represents a key/value pair of information you wish to send in Twilio's request to the TwiML App

's Voice URL.

The <Parameter> noun has two attributes:

name - the name of your custom parameter
value - the value of your custom parameter
Each custom parameter is passed as a request parameter in Twilio's request to the TwiML App

's Voice URL. In the request, each custom parameter's name is prefixed with Param_.

The TwiML example below shows how to use <Dial><Application> with nested <Parameter> nouns.

<Dial> <Application> with <Parameter>





Report code block


Copy code block
from twilio.twiml.voice_response import Application, ApplicationSid, Dial, Parameter, VoiceResponse

response = VoiceResponse()
dial = Dial()
application = Application()
application.application_sid('AP1234567890abcdef1234567890abcd')
application.parameter(name='AccountNumber', value='12345')
application.parameter(name='TicketNumber', value='9876')
dial.append(application)
response.append(dial)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Application>
      <ApplicationSid>AP1234567890abcdef1234567890abcd</ApplicationSid>
      <Parameter name="AccountNumber" value="12345"/>
      <Parameter name="TicketNumber" value="9876"/>
    </Application>
  </Dial>
</Response>
For the example above, the body of Twilio's request to the TwiML App

's Voice URL will contain Param_AccountNumber: "12345" and Param_TicketNumber: "9876".

Supported <Dial> attributes





<Application> supports the following <Dial> attributes:

action
callerId
answerOnBridge
callReason
timeLimit
timeout
method
hangupOnStar
record
recordingStatusCallback
recordingStatusCallbackMethod
recordingStatusCallbackEvent
recordingTrack
ringTone
<Dial><Application> supports sending custom parameters from the dialed party back to the originating <Dial>'s action URL. Learn more on the <Dial><Application> Usage page.

Note: REFER support via referUrl is NOT supported when using <Dial><Application>.