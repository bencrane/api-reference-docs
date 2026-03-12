# TwiML™ Voice: <Pause>

TwiML™ Voice: <Pause>
The `<Pause>` verb waits silently for a specific number of seconds. If `<Pause>` is the first verb in a TwiML document, Twilio will wait the specified number of seconds before picking up the call.
Verb Attributes
The `<Pause>` verb supports the following attributes that modify its behavior:
Attribute NameAllowed ValuesDefault Value__length__integer > 01 second
length
The 'length' attribute specifies how many seconds Twilio will wait silently before continuing on.
Nesting Rules
* You can't nest any verbs within `<Pause>`.
* You can nest the `<Pause>` verb within `<Gather>`.
Examples
Example 1: Pause
This example demonstrates how to use `<Pause>` to wait between two `<Say>` verbs.
Pause example
Node.jsPythonC#JavaGoPHPRuby
Report code block
Copy code block

```
const VoiceResponse = require('twilio').twiml.VoiceResponse;

```

const response = new VoiceResponse(); 
response.say('I will pause 10 seconds starting now!'); 
response.pause({ 
length: 10 
}); 
response.say('I just paused 10 seconds'); 
console.log(response.toString());
Output
Copy output

```
<?xml version="1.0" encoding="UTF-8"?>

```

<Response> 
<Say>I will pause 10 seconds starting now!</Say> 
<Pause length="10"/> 
<Say>I just paused 10 seconds</Say> 
</Response>
Example 2: Delayed pickup
This example demonstrates using `<Pause>` to delay Twilio for five seconds before accepting a call.
Delayed pickup
Node.jsPythonC#JavaGoPHPRuby
Report code block
Copy code block

```
const VoiceResponse = require('twilio').twiml.VoiceResponse;

```

const response = new VoiceResponse(); 
response.pause({ 
length: 5 
}); 
response.say('Hi there.'); 
console.log(response.toString());
Output
Copy output

```
<?xml version="1.0" encoding="UTF-8"?>

```

<Response> 
<Pause length="5"/> 
<Say>Hi there.</Say> 
</Response>