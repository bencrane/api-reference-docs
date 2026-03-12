TwiML™ Voice: <Connect>
(information)
Info
`<Connect><Stream>` is now available in the Ireland (IE1) and Australia (AU1) Regions.
* For outbound calls, follow the __guide for outbound calls in non-US Regions__.
* For inbound calls, follow the __guide for inbound call processing in non-US Regions__.
* For more information on Twilio Regions, see the __Global Infrastructure docs__.
Regional support is not available for `<Room>`, or `<VirtualAgent>`.
`<Connect>` is a __TwiML verb__ that works together with nested TwiML nouns to connect Voice calls (over __PSTN__ or __SIP__) to other Twilio services or external services.
`<Connect>` attributes
`<Connect>` supports the following attributes that change its behavior:
AttributeAllowed ValuesDefault Value__action__Relative or absolute URLNone__method__`GET`, `POSTPOST`
action
The `action` attribute accepts an absolute or relative URL as a value. When the `<Connect>` verb ends, Twilio sends an HTTP request to this URL with __Twilio's standard request parameters__ along with some parameters specific to the nested noun.
If you do not provide an `action` URL, `<Connect>` will finish and Twilio will move on to the next TwiML verb in the document. If there is no further verb, Twilio will end the phone call.
method
The `method` attribute specifies how Twilio will request the `action` URL: either using HTTP `GET` or `POST`. By default, Twilio uses `POST`.
Connect Nouns
The nouns that you can nest inside of `<Connect>` are listed in the table below. Click on a TwiML noun to see its docs page and how to use the noun with <Connect>.
NounDescription`<ConversationRelay><Connect><ConversationRelay>` connects a call to a __ConversationRelay service__`<Room><Connect><Room>` connects a call to a __Programmable Video Room__`<Stream><Connect><Stream>` starts a bidirectional __MediaStream__`<VirtualAgent><Connect><VirtualAgent>` connects a call to a __Dialogflow VirtualAgent__