# TwiML™ Voice: <Enqueue>

The <Enqueue> verb enqueues the current call in a call queue. Enqueued calls wait in hold music until the call is dequeued by another caller via the <Dial> verb or transferred out of the queue via the REST API or the <Leave> verb.

The <Enqueue> verb will create a queue on demand, if the queue does not already exist. The default maximum length of the queue is 1000. This can be modified using the REST API.

<Enqueue> allows you to specify a named queue that already exists by placing the queue name between <Enqueue>'s opening and closing tags. The queue name must be 64 characters or less in length. If the named queue hasn't yet been created, Twilio will create one with the queue name included within <Enqueue>'s opening and closing tags.

Verb Attributes





The <Enqueue> verb supports the following attributes that modify its behavior:

Attribute Name	Allowed Values	Default Value
action	relative or absolute URL	None
method	GET, POST	POST
waitUrl	relative or absolute URL	default classical playlist

waitUrlMethod	GET, POST	POST if waitUrl is specified, otherwise GET to Twilio's default classical playlist

workflowSid	TaskRouter Workflow Sid	None
action





The action attribute takes an absolute or relative URL as a value. A request is made to this URL when the call leaves the queue, describing the dequeue reason and details about the time spent in the queue, which are described below. In the case where a call is dequeued due to a REST API request or the <Leave> verb, the action URL is requested right away. In the case where a call is dequeued via the <Dial> verb, the action URL is hit once when the bridged parties disconnect. If no action is provided, Twilio will fall through to the next verb in the document, if any.

Request Parameters

Twilio passes the following parameters in addition to the standard TwiML Voice request parameters with its request to the action URL:

Parameter	Description
QueueResult	The final result of the enqueued call. See queue result values below for details.
QueueSid	The SID of the queue. This is only available if the call was actually enqueued.
QueueTime	The time the call spent in the queue. This is only available if the call was actually enqueued.
QueueResult values

The following values represent the result of an attempt to enqueue a caller.

Value	Description
bridged	The call was dequeued and bridged to the dequeuer.
bridging-in-process	Twilio has been instructed to bridge the enqueued party.
error	The TwiML contained an error, either in the <Enqueue> verb itself or in the TwiML retrieved from a waitUrl. Check the App Monitor.
hangup	The enqueued caller hung up before connecting to a dequeued call.
leave	The enqueued caller exited the queue via the <Leave> verb.
redirected	While in the queue, the call was redirected out of the queue, typically by a REST API request.
redirected-from-bridged	The queued and then successfully bridged session was transferred out.
queue-full	The targeted queue was full, thus the enqueue attempt was rejected.
system-error	The Twilio system malfunctioned during the enqueue process. This can happen if a caller hangs up before being fully enqueued.
method





The method attribute specifies the HTTP method Twilio uses when sending a request to the action URL. takes the value GET or POST. POST is the default value.

waitUrl





The waitUrl attribute specifies the URL to play for callers waiting in the queue. The URL may return an MP3 file, a WAV file, or a TwiML document.

Once the TwiML document located at the waitUrl runs out of verbs to execute, Twilio re-requests the waitUrl. This loops the hold music indefinitely. The <Redirect> verb can be used for multiple TwiML document call flows, but a call will always return to the waitUrl once there is no TwiML left to execute.

The following verbs are supported in the TwiML document located at the waitUrl:

Verb	Description
<Play>	Plays a file to the caller.
<Say>	Say something to the caller using Twilio text-to-speech.
<Pause>	Pauses for a specified duration.
<Hangup>	Hangs up the call and thereby leaving the queue and ending the call.
<Redirect>	Redirect to another TwiML document.
<Leave>	Makes the current call leave the queue, but doesn't hang up the call. Execution proceeds with the next verb after the '<Enqueue>' verb.
<Gather>	Collects digits that a caller enters into the telephone keypad. Note: When used within an <Enqueue> waitUrl, the valid values for the <Gather> input attribute are dtmf and speech.
Request Parameters

Twilio will pass the following parameters in addition to the standard TwiML Voice request parameters with its request to the 'waitUrl' URL:

Parameter	Description
QueuePosition	The current queue position for the enqueued call.
QueueSid	The SID of the Queue that the caller is in.
QueueTime	The time in seconds that the caller has been in the queue.
AvgQueueTime	An average of how long the current enqueued callers have been in the queue in seconds.
CurrentQueueSize	The current number of enqueued calls in this queue.
MaxQueueSize	The maximum number of enqueued calls for this queue.
If no waitUrl is specified, Twilio will use its own default classical playlist

 which contains a selection of nice Creative Commons classical music.

Here's a list of S3 buckets we've assembled with other genres of music for you to choose from:

Bucket	Twimlet URL
com.twilio.music.classical

http://twimlets.com/holdmusic?Bucket=com.twilio.music.classical

com.twilio.music.ambient

http://twimlets.com/holdmusic?Bucket=com.twilio.music.ambient

com.twilio.music.electronica

http://twimlets.com/holdmusic?Bucket=com.twilio.music.electronica

com.twilio.music.guitars

http://twimlets.com/holdmusic?Bucket=com.twilio.music.guitars

com.twilio.music.rock

http://twimlets.com/holdmusic?Bucket=com.twilio.music.rock

com.twilio.music.soft-rock

http://twimlets.com/holdmusic?Bucket=com.twilio.music.soft-rock

If you don't wish anything to be played while the caller is waiting in the queue, set waitUrl to an empty string ('').

waitUrlMethod





This attribute indicates which HTTP method to use when requesting waitUrl. It defaults to POST if you specify a waitUrl. If you have not specified a waitUrl, Twilio will make a GET request to the default classical playlist

. Be sure to use GET if you are directly requesting static audio files such as WAV or MP3 files so that Twilio properly caches the files.

workflowSid





The workflowSid attribute tells Twilio to create a new TaskRouter Task to represent this call and specifies the ID of the desired Workflow to handle it.

If workflowSid is specified, it is not necessary to specify a name for the Queue to place the call in. When a Worker is identified to handle the call it can be dequeued and connected using the dequeue assignment instruction.

Nouns





The "noun" of a TwiML verb is the nested content of the verb that's not a verb itself; it's the information the verb acts upon. These are the nouns for <Enqueue>:

Noun	Description
<Task>	The attributes to be set for the newly created task, formatted as JSON
You can find more information and examples on how to use <Task> on the TaskRouter TwiML Integration page.

Examples





Example 1: Enqueue





This TwiML document tells Twilio to fetch the wait-music.xml TwiML document and execute it while the caller is in the queue:

Enqueue example





Report code block


Copy code block
const VoiceResponse = require('twilio').twiml.VoiceResponse;


const response = new VoiceResponse();
response.enqueue({
    waitUrl: 'wait-music.xml'
}, 'support');

console.log(response.toString());
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Enqueue waitUrl="wait-music.xml">support</Enqueue>
</Response>
The wait-music.xml TwiML document plays some nice hold music:

Wait Music





Report code block


Copy code block
const VoiceResponse = require('twilio').twiml.VoiceResponse;


const response = new VoiceResponse();
response.play('http://com.twilio.sounds.music.s3.amazonaws.com/MARKOVICHAMP-Borghestral.mp3');

console.log(response.toString());
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Play>http://com.twilio.sounds.music.s3.amazonaws.com/MARKOVICHAMP-Borghestral.mp3</Play>
</Response>
Hints and Advanced Uses





You can use the parameters on the waitUrl request to <Say> back to the caller what their queue position is and how long they can expect to wait.