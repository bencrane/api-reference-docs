# TwiML™ Voice: <Hangup>

TwiML™ Voice: <Hangup>
The `<Hangup>` verb ends a call. If used as the first verb in a TwiML response it does not prevent Twilio from answering the call and billing your account. The only way to not answer a call and prevent billing is to use the`<Reject>`__ verb__.
Verb Attributes
The `<Hangup>` verb has no attributes.
Nesting Rules
You can't nest any verbs within `<Hangup>` and you can't nest `<Hangup>` within any other verbs.
Examples
Example 1
The following code tells Twilio to answer the call and hang up immediately.
Hangup a Call
Node.jsPythonC#JavaGoPHPRuby
Report code block
Copy code block

```
const VoiceResponse = require('twilio').twiml.VoiceResponse;

```

const response = new VoiceResponse(); 
response.hangup(); 
console.log(response.toString());
Output
Copy output

```
<?xml version="1.0" encoding="UTF-8"?>

```

<Response> 
<Hangup/> 
</Response>
Hints and Advanced Uses
* When receiving a Twilio request to an 'action' URL within `<Gather>`, `<Record>`, `<Dial>` or `<Sms>`, you can return a response containing the `<Hangup>` verb to end the current call.