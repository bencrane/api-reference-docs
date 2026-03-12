TwiML™ Voice: <Queue>

The `<Dial>` verb's `<Queue>` noun specifies a queue to dial. When dialing a queue, the caller will be connected with the first enqueued call in the specified queue. If the queue is empty, Dial will wait until the next person joins the queue or until the __<Dial> timeout__ duration is reached. If the queue does not exist, Dial will post an error status to its action URL.
Noun Attributes
The `<Queue>` noun supports the following attributes that modify its behavior:
Attribute NameAllowed ValuesDefault Value__url__relative or absolute URLnone__method__`GET`, `POSTPOST`__reservationSid__Reservation Sidnone__postWorkActivitySid__Activity Sidnone
url
The `url` attribute takes an absolute or relative URL as a value. The URL points to a TwiML document that will be executed on the queued caller's end before the two parties are connected. This is typically used to be able to notify the queued caller that they are about to be connected to an agent or that the call may be recorded. The allowed verbs in this TwiML document are Play, Say, Pause, and Redirect.
Request Parameters
Twilio will pass the following parameters in addition to the __standard TwiML Voice request parameters__ with its request to the value of the `url` attribute:
ParameterDescriptionQueueSidThe SID of the queue.CallSidThe CallSid of the dequeued call.QueueTimeThe time the call spent in the queue in seconds.DequeingCallSidThe CallSid of the call dequeuing the caller.
method
The `method` attribute takes the value `GET` or `POST`. This tells Twilio whether to request the `url` above via `HTTP GET` or `POST`. This attribute is modeled after the HTML form `method`attribute. `POST` is the default value.
reservationSid
If a call was enqueued with a TaskRouter Workflow Sid, you may specify a Reservation Sid in order to bridge this call to the enqueued caller. Once the call has been successfully bridged the pending Reservation will be marked as 'accepted'.
postWorkActivitySid
If a call is bridged using the 'reservationSid' attribute, you may specify an optional `postWorkActivitySid` value to indicate the activity state that the Worker should be moved to after the call completes.
Examples
Example 1: Dialing a queue
In this example, the caller wants to dequeue a call from the 'support' queue. Before connecting, the following TwiML might be executed:
Dialing a queue
Node.jsPythonC#JavaGoPHPRuby
Report code block
Copy code block

```
from twilio.twiml.voice_response import Dial, Queue, VoiceResponse

```

response = VoiceResponse() 
dial = Dial() 
dial.queue('support', url='about_to_connect.xml') 
response.append(dial) 
print(response)
Output
Copy output

```
<?xml version="1.0" encoding="UTF-8"?>

```

<Response> 
<Dial> 
<Queue url="about_to_connect.xml">support</Queue> 
</Dial> 
</Response>
And the 'about_to_connect.xml" TwiML document which will be played to the caller waiting in the queue before connecting might look something like this:
About to connect
Node.jsPythonC#JavaGoPHPRuby
Report code block
Copy code block

```
from twilio.twiml.voice_response import VoiceResponse, Say

```

response = VoiceResponse() 
response.say('You will now be connected to an agent.') 
print(response)
Output
Copy output

```
<?xml version="1.0" encoding="UTF-8"?>

```

<Response> 
<Say>You will now be connected to an agent.</Say> 
</Response>