TwiML™ Voice: <Reject>

TwiML™ Voice: <Reject>
The `<Reject>` verb rejects an incoming call to your Twilio number without billing you. This is very useful for blocking unwanted calls.
If the first verb in a TwiML document is `<Reject>`, Twilio will not pick up the call. The call ends with a status of `busy` or `no-answer`, depending on the verb's `reason` attribute. Any verbs after `<Reject>` are unreachable and ignored.
Using `<Reject>` as the first verb in your response is the only way to prevent Twilio from answering a call. Any other response will result in an answered call and your account will be billed.
Verb Attributes
The `<Reject>` verb supports the following attributes that modify its behavior:
Attribute NameAllowed ValuesDefault Value__reason__`rejected`, `busyrejected`
reason
The `reason` attribute takes the values `rejected` and `busy`. This tells Twilio what message to play when rejecting a call. Selecting `busy` will play a busy signal to the caller, while selecting `rejected` will play a standard not-in-service response. The default is `rejected`.
(information)
Info
This is a preference and what is actually played back is determined by the caller's service provider as they dictate what they want to playback to the caller.
Nesting Rules
You can't nest any verbs within `<Reject>` and you can't nest `<Reject>` in any other verbs.
Examples
Example 1: Reject a call playing a standard not-in-service message
Reject a call playing a standard not-in-service message
Node.jsPythonC#JavaGoPHPRuby
Report code block
Copy code block

```
from twilio.twiml.voice_response import Reject, VoiceResponse

```

response = VoiceResponse() 
response.reject() 
print(response)
Output
Copy output

```
<?xml version="1.0" encoding="UTF-8"?>

```

<Response> 
<Reject /> 
</Response>
Example 2: Reject a call playing a busy signal
Reject a call playing a busy signal
Node.jsPythonC#JavaGoPHPRuby
Report code block
Copy code block

```
from twilio.twiml.voice_response import Reject, VoiceResponse

```

response = VoiceResponse() 
response.reject(reason='busy') 
print(response)
Output
Copy output

```
<?xml version="1.0" encoding="UTF-8"?>

```

<Response> 
<Reject reason="busy" /> 
</Response>