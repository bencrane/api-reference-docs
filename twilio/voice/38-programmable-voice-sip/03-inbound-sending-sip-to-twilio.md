Inbound - Sending SIP to Twilio




Overview





Twilio's Programmable Voice SIP product enables you to use your existing SIP communications infrastructure (e.g. IP-PBX, SBC, etc) to initiate SIP sessions with Twilio and use TwiML and/or the REST APIs to create advanced voice applications. Twilio sits in the middle, enabling calls to be routed to your SIP communications infrastructure, PSTN, or to browsers and mobile apps. There are a few short steps to configure Twilio to interoperate with your infrastructure so you can start building and testing your voice app.

Diagram showing SIP flow from corporate network to Twilio via public internet, with HTTP webhook and TwiML.

Expand image
How it works





To send SIP to Twilio's cloud you need to create a Twilio SIP Domain. A SIP domain is a custom DNS hostname associated with your Twilio account that can accept SIP traffic. If anyone makes a SIP request using that domain, (e.g. sip:alice@example.sip.us1.twilio.com), it will be routed over the internet to Twilio. When a SIP request is received by Twilio, the SIP domain is used to determine the authentication criteria and subsequently used to look up the configured URL to webhook to your application that will provide instructions on how to handle the incoming SIP call. See how Twilio passes data to your application.

Getting Started





Log in to the Console and select Programmable Voice from the vertical menu on the left side of the view which will bring you to the Dashboard. Now navigate to SIP Domains/Endpoints

.

Step 1: Create a Twilio Voice SIP Domain/Endpoint





Click on the blue plus symbol on the Voice SIP Endpoints view

Friendly Name

Provide a friendly name for your SIP Domain such as MyCompanySF.

SIP URI / Domain name

This property allows you to specify a global unique SIP Domain that is used to route the SIP traffic from your infrastructure over the public internet to the correct server hosted by Twilio in the cloud.

A SIP request uses a SIP URI such as the following: sip:alice@example.sip.twilio.com)

Twilio processes the incoming request and authenticates it using your chosen authentication method. If the request is authenticated, it webhooks to your requested URL discussed next. All users in the same SIP domain webhook to the same application URL.

Domain names can contain letters, numbers, and "-". By default, every account has its own Twilio Account SID reserved as a domain.

If you try to create a domain that already exists, you will receive an error. Creating subdomains of existing domains is permitted as long as you have already created the original domain. For example: foo.example.sip.twilio.com can only be created if you have already reserved example.sip.twilio.com.

Sub-accounts can create subdomains of any SIP domain in the master account. There exists a REST API for creating Domains.

Localized SIP URIs

If you wish to manually connect to a specific geographic Edge Location that is closest to the location of your communications infrastructure, you may do so by pointing your communications infrastructure to any of the following localized SIP URIs:

{example}.sip.ashburn.twilio.com (North America Virginia)
{example}.sip.umatilla.twilio.com (North America Oregon)
{example}.sip.dublin.twilio.com (Europe Ireland)
{example}.sip.frankfurt.twilio.com (Europe Frankfurt)
{example}.sip.singapore.twilio.com (Asia Pacific Singapore)
{example}.sip.tokyo.twilio.com (Asia Pacific Tokyo)
{example}.sip.sao-paulo.twilio.com (South America São Paulo)
{example}.sip.sydney.twilio.com (Asia Pacific Sydney)

(information)
Info
If you are looking for a list of legacy SIP localized URIs, visit here.
Request URL (webhook)

Specify a URL that points to your web application that Twilio will invoke upon receipt of a SIP INVITE. The URL must respond with TwiML that specifies how to handle the incoming call. Alternatively, you can specify a URL that points to a static TwiML bin

.

Below is a URL you can use as an example of a static TwiML. When Twilio receives the SIP INVITE, after authentication, it will accept the INVITE, establish the call and say a brief message to the caller.



Copy code block
https://twimlets.com/message?Message%5B0%5D=Congratulations!%20You%20just%20made%20your%20first%20call%20with%20Twilio%20SIP.
Fallback URL

If the Request URL fails (for instance, due to an invalid TwiML), then optionally you can specify that this URL be invoked.

Status Callback URL

Optionally, you can specify a URL for Twilio to send webhook requests to as a call progresses. With inbound calls, you receive only completed status.

Authentication

Authentication limits access to your SIP Domain from only approved devices and users. You must configure a minimum of either an Access Control List or a credential list. If you configure both, then both ACLs and credential lists are enforced.

IP Access Control Lists (ACL)

If configured, then Twilio will only accept SIP traffic originating from the IPs in this list - all other packets will be dropped. You must specify a full IP address; no IP wildcarding is supported. IP Access Control Lists can be applied to one or more SIP Domains. There exists a REST API for creating IP ACLs.

Credential Lists

Credential Lists are sets of usernames and passwords that will be accepted by your SIP Domain.

If a Credential List is configured, your SIP INVITE will be challenged with a 407 Proxy Authentication Required requesting the appropriate user name and password.

For each username, you must set a password that meets the following minimum requirements:

Minimum of 12 characters
At least one mixed case
At least one digit
Twilio does not store the passwords you provide for usernames in cleartext; instead, the passwords are MD5 hashed in accordance with the digest authentication specification. Once a password is set, Twilio does not provide a way to retrieve the stored password. Credential Lists can be applied to one or more SIP Domains.

A REST API exists for creating Credential Lists.

Step 2: Allow Twilio's IP addresses and ports





To ensure that your communications infrastructure doesn't block communication, you must update your allow list. See the SIP documentation for details.

Step 3: Start sending SIP to your Twilio SIP Domain





Now that Twilio's IPs and ports are allowed in your system and your SIP Domain is created, you can send SIP requests to Twilio. If you used the example URL from Step 1, you will hear:

"Congratulations! You just made your first call with Twilio SIP."

Advanced Features






(information)
Info
SIP custom headers and UUI headers described in this section only apply to Programmable Voice SIP calls. If you include custom headers in SIP INVITEs that originate from Bring Your Own Carrier (BYOC) trunks, Twilio doesn't pass those headers to your webhook; they're discarded.
SIP Custom Headers





In order to better integrate with remote SIP applications, Twilio reads the headers that are sent in the SIP request and response messages. Twilio will read any headers beginning with the X- and prepended with SipHeader_ prefix in request parameters.

You can send multiple param & value pairs as part of the same header. For example, X-TestHeader: param1=value1;param2=value2;param3=value3

If you send headers without X- prefix, Twilio will not read the header. As a result, the header will not be passed in the output.

UUI (User-to-User Information) Header





In order to pass the contextual information of the caller, customers use UUI (User-to-User Information) header in SIP request messages. You can pass a UUI (User-to-User) header through a webhook as a parameter for incoming calls to Twilio.

Simply add UUI SIP header as part of the SIP message before sending it to Twilio. The headers will be sent as request parameters in the webhook requested from your server. For example, if you send the following SIP headers in your SIP message:

User-to-User: 123456789;encoding=hex

Twilio will prepend the UUI header with SipHeader_ prefix in webhook request to your server. For example,

SipHeader_User-to-User "123456789;encoding=hex".