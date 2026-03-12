# TwiML™ Voice: <Leave>

TwiML™ Voice: <Leave>
The `<Leave>` verb is used in conjunction with __<Enqueue>__ to manage control of a call that is in a queue.
When Twilio executes the `<Leave>` verb on a call, the call is removed from the queue and Twilio executes the next TwiML verb after the original __<Enqueue>__.
Verb Attributes
The `<Leave>` verb doesn't support any attributes.
Example: Leaving a Queue
Consider the following scenario: There are several calls waiting in a call queue for a customer support agent. The customer support line closes at 9PM and the callers must be notified that they have been removed from the queue and will have to try again tomorrow.
The original call TwiML might look like this:
Enqueue call in a closed line
Node.jsPythonC#JavaGoPHPRuby
Report code block
Copy code block

```
const VoiceResponse = require('twilio').twiml.VoiceResponse;

```

const response = new VoiceResponse(); 
response.enqueue({ 
waitUrl: 'wait.xml' 
}, 'support'); 
response.say('Unfortunately, the support line has closed. Please call again tomorrow.'); 
console.log(response.toString());
Output
Copy output

```
<?xml version="1.0" encoding="UTF-8"?>

```

<Response> 
<Enqueue waitUrl="wait.xml">support</Enqueue> 
<Say>Unfortunately, the support line has closed. Please call again tomorrow.</Say> 
</Response>
Configure wait.xml to play hold music before 9pm:
Play audio
Node.jsPythonC#JavaGoPHPRuby
Report code block
Copy code block

```
const VoiceResponse = require('twilio').twiml.VoiceResponse;

```

const response = new VoiceResponse(); 
response.play('http://com.twilio.sounds.music.s3.amazonaws.com/MARKOVICHAMP-Borghestral.mp3'); 
console.log(response.toString());
Output
Copy output

```
<?xml version="1.0" encoding="UTF-8"?>

```

<Response> 
<Play>http://com.twilio.sounds.music.s3.amazonaws.com/MARKOVICHAMP-Borghestral.mp3</Play> 
</Response>
After 9PM, wait.xml dequeues the call and returns call control to the `<Say>` block in the original call TwiML:
Leave a call
Node.jsPythonC#JavaGoPHPRuby
Report code block
Copy code block

```
const VoiceResponse = require('twilio').twiml.VoiceResponse;

```

const response = new VoiceResponse(); 
response.leave(); 
console.log(response.toString());
Output
Copy output

```
<?xml version="1.0" encoding="UTF-8"?>

```

<Response> 
<Leave /> 
</Response>