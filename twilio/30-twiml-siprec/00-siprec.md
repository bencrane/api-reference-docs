TwiML™️ Voice: <Siprec>




The <Siprec> TwiML instruction allows you to start a stream on a phone call and send that stream to one of the available partners via a configured SIPREC Connector

.

Twilio operates as a Session Recording Client (SRC) for SIPREC, while Twilio's partners, such as Gridspace, operate as Session Recording Servers (SRS). Alternatively, you can provision your own SRS using the Twilio SIPREC Connector

.

The SRC sends the SIPREC media to be recorded to the SRS. The SRS is responsible for storing/processing the media.

The most basic use of <Siprec> is:



Copy code block
<?xml version="1.0" encoding="UTF-8"?>
<Response>
   <Start>
       <Siprec connectorName="my_addon_connector" />
   </Start>
</Response>
This TwiML instructs Twilio to fork the audio stream of the current call and send it in real-time to the configured connector.

There are a maximum of four forked streams allowed per call. By default, <Siprec> uses two forked streams: one for the inbound track and one for the outbound track.

Dual-Tone Multi-Frequency (DTMF) tones aren't sent to the connector.

<Siprec> starts the audio stream asynchronously and immediately continues with the next TwiML instruction. If there is no instruction, the call will be disconnected. In order to avoid this, provide a TwiML instruction to continue the call.

Any communication issues encountered while streaming media to the partner will be reported in the Twilio Debugger with additional information about the failure.

Configuring a SIPREC Connector





Connectors are configured in Marketplace to ensure that the credentials needed to send the stream to a partner are stored securely. You can install and manage connectors in the Stream Connectors Console page in Marketplace

 or via the Marketplace API using the InstalledAddOns Resource.


(information)
Info
If you'd like to use a specific partner and don't find them in the available Stream Connectors

 list, contact Twilio Support directly with details about your desired partner through the Console

 or Help Center

 to submit a ticket.
Twilio's SIPREC Connector





Configure your SIPREC Connector using the parameters below.

Parameter Name	Description
Installed Add-On SID	The unique identifier for your connector. It's automatically configured when you install a connector.
Unique Name	The unique name to use for your SIPREC Connector. This is the name you will use when initiating the <Siprec> TwiML instruction or using the API.
Use In	Specifies that the connector is available to your Voice Applications.
Session Recording Server	The SIP URI of the server you want to stream the media to. This should be a standard SIP URI. For example, sip:name@example.com:5060.
Credentials Header Name	The SIP header name that your recording service uses to pass the Authorization credentials. For example, X-Auth-Token.
Credentials	The credential token or value for Authorization to be sent to your recording service. This value will be hidden when entered in the text box.
If you use Twilio's SIPREC Connector, the SIP URI within the Session Recording Server parameter supports the following optional parameters:

secure: Enables Secure Real-time Transport Protocol (SRTP).
edge: Specifies which Twilio edge your SIPREC connections will egress from.
For example, to enable SRTP and set the edge location to the ashburn edge, you can set Session Recording Server to sip:example.com;secure=true&edge=ashburn.

Attributes





<Siprec> supports the following attributes:

Attribute Name	Description	Default Value
name	Optional. Unique name for the Stream.	none
connectorName	Unique name used when configuring the connector via Marketplace Add-on.	none
track	Optional. inbound_track, outbound_track, both_tracks	inbound_track
statusCallback	Optional. Absolute URL of the status callback.	none
statusCallbackMethod	Optional. The http method for the statusCallback (one of GET, POST).	none
name





Providing a name will allow you to reference the SIPREC stream directly. This name must be unique per Call SID.

For instance by naming the Stream my_first_siprec_stream:



Copy code block
<Start>
    <Siprec name="my_first_siprec_stream" connectorName="my_addon_connector" />
</Start>
You can later use the unique name of my_first_siprec_stream to stop the stream.



Copy code block
<Stop>
   <Siprec name="my_first_siprec_stream" />
</Stop>
connectorName





The connectorName attribute must contain a unique name corresponding to the SIPREC Stream Connector installed in your Twilio Marketplace Account in the Twilio Console. Learn more in the Configuring a SIPREC Connector section.

For example, to use Gridspace Connector, use connectorName="Gridspace_1", where Gridspace_1 is the unique name specified when configuring Gridspace Connector in the Stream Connectors page. In order to start a SIPREC session, you must first configure a SIPREC Connector.

track





The track attribute allows you to optionally request to receive a specific track of a call. On any given active call within Twilio there are inbound and outbound tracks, the former represents the audio Twilio receives from the call, and the latter represents the audio generated by Twilio to the call. By default Twilio always streams the inbound track of a call. To request Twilio to stream audio it generates use outbound_track, or to receive both tracks of a call use both_tracks. If both_tracks is used, you will receive both the inbound and outbound media event.

statusCallback





SIPREC is a protocol that enables recording and sending streams to one of the available partners via the SIPREC connector configuration. With a status callback, you can monitor SIPREC session statuses to quickly detect and troubleshoot issues like failures or interruptions. You can subscribe to status callbacks by adding the statusCallback and statusCallbackMethod as attributes.



Copy code block
<Start>
<Siprec name="my-first-siprec" connectorName="Gridspace_1" statusCallback="https://87b252436d40.ngrok.app" statusCallbackMethod="GET"/>
</Start>
The request to the status callback contains the standard TwiML request parameters and the following parameters:

Parameter	Description
AccountSid	The SID of the Account that created this Siprec resource. Not PII
CallSid	The SID of the Call the Siprec resource is associated with. Not PII
SiprecSid	The SID of the Siprec resource is associated with. Not PII
SiprecName	The Name of the Siprec resource is associated with. Not PII
SiprecEvent	The Event of the Siprec callback. Values can be: siprec-started, siprec-stopped, siprec-error Not PII
Timestamp	The timestamp of when the Siprec callback was made. Not PII
If an error occurs, additional parameters SiprecError and SiprecErrorCode will provide details about the issue with the SIPREC resource.

Passing Custom Parameters





SIPREC partners often require additional metadata along with the audio stream. You can provide custom data by using <Parameter>



Copy code block
<Start>
    <Siprec name="my_stream_1" connectorName="Gridspace_1" track="outbound_track">
        <Parameter name="Custom1" value ="Bob" />
        <Parameter name="Custom2" value ="Blah" />
        <Parameter name="Custom3" value ="Alice" /> 
     </Siprec>
</Start>
The exact names of parameters vary from partner to partner. Refer to the appropriate partner tile in the Stream Connectors page

 to identify the custom parameters that need to be passed.

Examples





Start a new SIPREC stream with the name of My SIPREC Stream and a connector of Gridspace_1.

Start a new SIPREC Stream





Report code block


Copy code block
from twilio.twiml.voice_response import VoiceResponse, Siprec, Start

response = VoiceResponse()
start = Start()
start.siprec(name='My SIPREC Stream', connector_name='Gridspace_1')
response.append(start)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Start>
        <Siprec name="My SIPREC Stream" connectorName="Gridspace_1" />
    </Start>
</Response>
IP Ranges to Allow





Global Media IP Gateways





Public Connections - Global Media IP Range

The Public Connections Destination IP Ranges and Port Ranges are now identical across all locations:

Secure Media (ICE/STUN/SRTP) Edge Locations	Protocol	Source IP	Source Port †	Destination IP Ranges	Destination Port Range
sydney (au1 )
sao-paulo (br1 )
dublin (ie1 )
frankfurt (de1 )
tokyo (jp1 )
singapore (sg1 )
ashburn (us1 )
umatilla (us2 )
roaming (gll )	UDP	ANY	ANY	168.86.128.0/18	10,000 - 60,000
† The SDK will select any available port from the ephemeral range. On most machines, this means the port range 1,024 to 65,535.

Regional Signaling IP Gateways





To receive SIPREC streams from Twilio, you must allow ALL of Twilio's following IP address ranges and ports on your firewall for signaling traffic. Twilio doesn't guarantee which edge location the media will egress from, without using the edge parameter since it can depend on which PSTN-SIP Gateway delivers the call to which Twilio edge location.


(information)
Info
These IP addresses are provided only for firewall configuration purposes. Not all of these IP addresses will host active gateways at a given time. However, your infrastructure must always be prepared to accept signaling traffic from any of these IP addresses.
North America Virginia Gateways



Copy code block
    54.172.60.0/30 which translates to:
    54.172.60.0
    54.172.60.1
    54.172.60.2
    54.172.60.3
    Ports: 5060 (UDP/TCP), 5061 (TLS)
North America Oregon Gateways



Copy code block
    54.244.51.0/30 which translates to:
    54.244.51.0
    54.244.51.1
    54.244.51.2
    54.244.51.3
    Ports: 5060 (UDP/TCP), 5061 (TLS)
Europe Ireland Gateways



Copy code block
    54.171.127.192/30 which translates to:
    54.171.127.192
    54.171.127.193
    54.171.127.194
    54.171.127.195
    Ports: 5060 (UDP/TCP), 5061 (TLS)
Europe Frankfurt Gateways



Copy code block
    35.156.191.128/30 which translates to:
    35.156.191.128
    35.156.191.129
    35.156.191.130
    35.156.191.131
    Ports: 5060 (UDP/TCP), 5061 (TLS)
Asia-Pacific Tokyo Gateways



Copy code block
    54.65.63.192/30 which translates to:
    54.65.63.192
    54.65.63.193
    54.65.63.194
    54.65.63.195
    Ports: 5060 (UDP/TCP), 5061 (TLS)
Asia-Pacific Singapore Gateways



Copy code block
    54.169.127.128/30 which translates to:
    54.169.127.128
    54.169.127.129
    54.169.127.130
    54.169.127.131
    Ports: 5060 (UDP/TCP), 5061 (TLS)
Asia-Pacific Sydney Gateways



Copy code block
    54.252.254.64/30 which translates to:
    54.252.254.64
    54.252.254.65
    54.252.254.66
    54.252.254.67
    Ports: 5060 (UDP/TCP), 5061 (TLS)
South America São Paulo Gateways



Copy code block
    177.71.206.192/30 which translates to:
    177.71.206.192
    177.71.206.193
    177.71.206.194
    177.71.206.195
    Ports: 5060 (UDP/TCP), 5061 (TLS)