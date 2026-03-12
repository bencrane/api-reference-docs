How to Share Information Between Your Applications




Custom Parameters & Contextual Calling





Many telephony use-cases require the ability to associate metadata or other application specific information with a call that is being created. For example, when connecting a customer to an agent, you might want to send the customer's ID or their display name to the agent's application so that they can have more information about the customer that is calling. These use cases are often referred to as contextual calling, as you are providing additional context about the call.

Twilio enables these use cases through the use of custom parameters. Custom parameters can be exchanged between your backend and frontend applications (through Twilio) at call connection time.

This guide will show you how to exchange custom parameters between your backend and frontend applications. The diagram below illustrates where custom parameters can be exchanged.

Contextual calling process with backend app, Twilio cloud, and client interfaces.

Expand image

(warning)
Warning
This document outlines how to exchange custom parameters between your backend and frontend applications. It assumes that you have basic knowledge in Programmable Voice concepts including, TwiML, REST APIs and Voice SDKs.

In some examples it also assumes you have experience with setting up TwiML Apps, making API requests to initiate a call, and using one of the Twilio Voice SDKs to make/receive calls.
Sending Custom Parameters to Clients





This section shows how you can setup a call using the REST API and pass parameters to your Client applications. The diagram below illustrates the custom parameter flow:

contextual_calling.

Expand image
Initiating the Call with the REST API





A call may be initiated using the Call or Conference Participant Resource. Both of these resources support passing custom parameters.

Using the Call Resource

When the callee is a SIP endpoint, you can pass custom parameters by appending them to the To parameter:



Copy code block
curl -X POST https://api.twilio.com/2010-04-01/Accounts/ACxxxxxxxxxx/Calls.json
--data-urlencode "Url=https://example.com/instructions"
--data-urlencode "To=sip:bob@example.com?displayName=Alice&customerID=375d1d60-083b-404d&selectedProductID=87144192-73e2-45a6"
--data-urlencode "From=+15017122661"
-u ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_auth_token
When the callee is a Client endpoint, you can pass custom parameters by appending them to the To parameter:



Copy code block
curl -X POST https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Calls.json
--data-urlencode "From=+15017122661"
--data-urlencode "To=client:agentBob?displayName=Alice&customerID=375d1d60-083b-404d&selectedProductID=87144192-73e2-45a6"
-u ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_auth_token
To pass parameters to your application, you specify the custom parameters in the Url parameter. For example, to pass the caller display name, customerID and selectedProductID:



Copy code block
curl -X POST https://api.twilio.com/2010-04-01/Accounts/ACxxxxxxxxxx/Calls.json
--data-urlencode "Url=https://example.com/instructions?displayName=Alice&customerID=375d1d60-083b-404d&selectedProductID=87144192-73e2-45a6"
--data-urlencode "To=+1415555555"
--data-urlencode "From=+15017122661"
See Retrieving Custom Parameters for how you can read these parameters in your endpoint applications.

Using the Conference Participant Resource

With the Conference Participant Resource, you connect an end point to a conference. You can pass Custom Parameters during call setup. For example, if a customer called in regarding a product, you can pass the customerID and selectedProductID to the agent with the following request:



Copy code block
curl -X POST https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Conferences/CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Participants.json
--data-urlencode "From=+15017122661"
--data-urlencode "To=client:agentBob?displayName=Alice&customerID=375d1d60-083b-404d&selectedProductID=87144192-73e2-45a6"
-u ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_auth_token
See Retrieving Custom Parameters for how you can read these parameters in your endpoint applications.

TwiML Webhook Request





Twilio retrieves the instructions to connect a call by sending a request to the address you configured. Twilio will populate the request with all the custom parameters that was received from the REST API (or from the end points).

For example, if you configured your TwiML app with the request URL https://webstite.com/instructions, Twilio will append all Custom Parameters https://webstite.com/instructions?displayName=Alice&customerID=12345678&selectedProductId=77788 before sending the request to your server at that URL.

Dial Action URL

If you need to pass custom information to a <Dial> action URL, include it:



Copy code block
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial action="https://example.com/twiml.php?customParameter1=xxxxxx&amp;customParameter2=yyyyy&amp;customValue=true">
        415-123-4567
    </Dial>
</Response>
TwiML Webhook Response





The TwiML instructions you respond with can also include custom parameters that Twilio will forward to the end points. You can send custom parameters to Voice JavaScript SK, Voice Mobile SDKs, SIP user agents, and to MediaStreams.

<Dial><Client>

The following TwiML illustrates how you could send a customerID custom parameter to Voice SDKs:



Copy code block
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Client>
      <Identity>alice</Identity>
      <Parameter name="displayName" value="Alice"/>
      <Parameter name="customerID" value="375d1d60-083b-404d"/>
      <Parameter name="selectedProductID" value="87144192-73e2-45a6"/>
    </Client>
  </Dial>
</Response>
Generate Client Parameter TwiML using SDKs





Report code block


Copy code block
from twilio.twiml.voice_response import Client, Dial, Identity, Parameter, VoiceResponse

response = VoiceResponse()
dial = Dial()
client = Client()
client.identity('user_jane')
client.parameter(name='FirstName', value='Jane')
client.parameter(name='LastName', value='Doe')
dial.append(client)
response.append(dial)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
   <Dial>
     <Client>
        <Identity>user_jane</Identity>
        <Parameter name="FirstName" value ="Jane"/>
        <Parameter name="LastName" value ="Doe" />
      </Client>
    </Dial>
</Response>
<Dial><Sip>

The following TwiML example illustrates how you can send the same parameter to a SIP user agent:



Copy code block
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Sip>sip:+15105555555@example.com?X-displayName=Alice&X-customerID=375d1d60-083b-404d&X-selectedProductID=87144192-73e2-45a6</Sip>
  </Dial>
</Response>
For more information about using custom parameters with SIP user agents, refer to Sending SIP X-Headers, Receiving SIP X-Headers and Custom Headers.

<Start><Stream>

You can also pass custom parameters when starting a Media Stream:



Copy code block
<?xml version="1.0" encoding="UTF-8"?>
<Response>
   <Start>
     <Stream url="wss://mystream.ngrok.io/example" >
        <Parameter name="customerID" value="375d1d60-083b-404d"/>
        <Parameter name="selectedProductID" value="87144192-73e2-45a6"/>
      </Stream>
    </Start>
</Response>
Generate MediaStream Parameter TwiML using SDKs





Report code block


Copy code block
from twilio.twiml.voice_response import Parameter, VoiceResponse, Start, Stream

response = VoiceResponse()
start = Start()
stream = Stream(url='wss://mystream.ngrok.io/example')
stream.parameter(name='FirstName', value='Jane')
stream.parameter(name='LastName', value='Doe')
start.append(stream)
response.append(start)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8" ?>
<Response>
    <Start>
        <Stream url="wss://mystream.ngrok.io/example">
            <Parameter name="FirstName" value="Jane" />
            <Parameter name="LastName" value="Doe" />
        </Stream>
    </Start>
</Response>
Retrieving Custom Parameters





Once Twilio receives the TwiML instructions to connect a call, it will initiate the call to the end point and pass along the associated custom parameters. The end points can now read these parameters. The following sections show how to read custom parameters in the supporting end points.

Voice JavaScript SDK

Continuing from the previous example, you can use call.customParameters to read the custom parameters you sent to your front-end application.



Copy code block
if (call.customParameters.hasOwnProperty("displayName")) {
    let displayName = call.customParameters.get("displayName");
    // Do something with displayName
}

if (call.customParameters.hasOwnProperty("customerID")) {
    let customerID = call.customParameters.get("customerID");
    // Do something with customerID
}

if (call.customParameters.hasOwnProperty("selectedProductID")) {
   let selectedProductID = call.customParameters.get("selectedProductID");
   // Do something with selectedProductID
}
Mobile SDK

To read the custom parameters sent to your mobile app, use TVOCallInvite.customParameters

 (iOS), CallInvite.getCustomParameters()

 (Android).

Media Streams

The parameters can then be retrieved from the Start Message start.customParameters attribute.

Sending Custom Parameters to your Backend Application





Just like you can pass custom parameters from your infrastructure to your frontend applications, the Twilio Voice SDKs allow you to pass Customer Parameters when connecting to Twilio.

Diagram showing call flow from SIP UA, Voice Mobile SDKs, and Client JS to backend app via Twilio cloud.

Expand image
Voice JavaScript SDK





When placing an outbound call, the Voice SDK allows you to pass Custom Parameters and when receiving a call, Voice SDK allows you to retrieve the Custom Parameters send via your TwiML instructions.

Let's say your user is navigating your site and needs help with a specific product. By enabling calling from the browser, you could use Custom Parameters to send the user's ID and the product they need help when setting up the call to your contact center.



Copy code block
let connection = Twilio.Device.connect({
  "customerID": "375d1d60-083b-404d",
  "selectedProductID": "87144192-73e2-45a6"
});
More information can be found in the Device documentation.

Mobile SDKs





Just like the Voice JavaScript SDKs, the Voice Mobile SDKs (iOS, Android, and React Native) support sending Custom Parameters when placing outbound calls and receiving custom parameters when receiving a call.


(information)
Info
Note, this feature is available from version 3.0 onwards.


Copy code block
let connectOptions: TVOConnectOptions = TVOConnectOptions(accessToken: accessToken) { (builder) in
            builder.params = [
                "customerId" : "375d1d60-083b-404d",
                "productID" : "87144192-73e2-45a6"
            ]
        }
        self.call = TwilioVoice.connect(with: connectOptions, delegate: self)
To send Custom Parameters from your mobile app, use TVOConnectOption.params

 (iOS) and ConnectOptions.Builder params(Map<String,String> params)

 (Android)

SIP User Agent





Twilio makes it possible to send custom parameters when calling using a SIP UA (User Agent). Simply prepend X- to your SIP header name and add it to the SIP message before sending it to Twilio. Here's an example header:



Copy code block
X-CustomerID: 375d1d60-083b-404d
The headers you prepend with X-, will be sent as request parameters in the webhook requested from your server.

For example, if you send the following SIP headers in your SIP message:



Copy code block
X-CustomerID: 375d1d60-083b-404d
X-SelectedProductID: 87144192-73e2-45a6
Twilio will send the following webhook request to your server in the following format:



Copy code block
SipHeader_X-CustomerID: 375d1d60-083b-404d
SipHeader_X-SelectedProductID: 87144192-73e2-45a6
If you configured your server URL to https://example.com/instructions, the request sent to your server will include the custom parameters:

https://example.com/instructions?SipHeader_X-CustomerID=375d1d60-083b-404d&SipHeader_X-SelectedProductID=87144192-73e2-45a6

For more information about SIP custom parameters, see sending SIP custom headers and receiving SIP custom headers. Note, SIP also supports the user to user information header for exchanging custom data.

Using TwiML Bin Template Parameters





With TwiML Bin templates, you can read the Custom Parameters from the request using the Mustache template syntax

 to dynamically insert content into your returned TwiML.

With a request https://twilio.com/twimlbin-1?customerID=375d1d60-083b-404d&selectedProductID=87144192-73e2-45a6 you can retrieve the values for customerID and selectedProductID as follows:



Copy code block
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Client>
      <Identity>alice</Identity>
      <Parameter name="customerID" value="{{ customerID }}"/>
      <Parameter name="selectedProductID" value="{{ selectedProductID }}"/>
    </Client>
  </Dial>
</Response>
Learn more about template parameters and TwiML Bin dynamic content.

An Example Twilio Function using the SDKs





The following example shows how you can create a Twilio Function that returns TwiML with custom parameters:



Copy code block
exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse();

  const dial = twiml.dial({
    callerId: context.CALLER_ID
  });

  const client = dial.client({}, "alice");
  const parameter = client.parameter({
    name: "customerID",
    value: event.customerID
   }); // Read the value from the request parameter list


  callback(null, twiml);
};
Parameter Length Guidelines





Parameters may be sent over certain channels that restrict the length. We don't recommend sending more than a combined total of 800 bytes for the custom parameters.