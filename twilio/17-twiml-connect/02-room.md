TwiML™ Voice: <Room>

(warning)
Warning
This TwiML Verb is not currently available when using __Twilio Regions__ Ireland (IE1) or Australia (AU1). This is currently only supported with the default US1 region. A full list of unsupported products and features with Twilio Regions is documented __here__.
Programmable Video Rooms are represented in __TwiML__ through the `<Room>` noun, which you can specify while using __the <Connect> verb__.
The `<Room>` noun allows you to connect to a named __Programmable Video Room__ and talk with other participants who are connected to that Room.
Note that only __Group Rooms__ support PSTN Participants.
To connect a Programmable Voice call to a Room, use the `<Room>` noun and provide the `UniqueName` for the Room you would like to connect to. If an in-progress Video Room with that unique name does not exist for your account, Twilio will move to the next set of TwiML instructions you have provided, or disconnect the call if the `<Room>` is the final TwiML instruction.
<Room> and <Connect> usage examples
Copy code block

```
<?xml version="1.0" encoding="UTF-8"?>

```

<Response> 
<Connect> 
<Room>DailyStandup</Room> 
</Connect> 
</Response>
(warning)
Warning
Ensure, your room type is `group`. Connecting voice calls to a Peer-to-Peer Room is not possible.
Connect a Programmable Voice call to a Room
Node.jsPythonC#JavaPHPRuby
Report code block
Copy code block

```
from twilio.twiml.voice_response import Connect, VoiceResponse, Room

```

response = VoiceResponse() 
connect = Connect() 
connect.room('DailyStandup') 
response.append(connect) 
print(response)
Output
Copy output

```
<?xml version="1.0" encoding="UTF-8"?>

```

<Response> 
<Connect> 
<Room>DailyStandup</Room> 
</Connect> 
</Response>
Set the Participant's identity
You can set a unique identity on the incoming caller using an optional property called `participantIdentity`.
If you don't set the `participantIdentity`, then Twilio will assign a unique string value to the Participant's identity.
Copy code block

```
<?xml version="1.0" encoding="UTF-8"?>

```

<Response> 
<Connect> 
<Room participantIdentity='alice'>DailyStandup</Room> 
</Connect> 
</Response>
Connect a Programmable Voice call to a Room with a unique participant identity
Node.jsPythonC#JavaPHPRuby
Report code block
Copy code block

```
from twilio.twiml.voice_response import Connect, VoiceResponse, Room

```

response = VoiceResponse() 
connect = Connect() 
connect.room('DailyStandup', participant_identity='alice') 
response.append(connect) 
print(response)
Output
Copy output

```
<?xml version="1.0" encoding="UTF-8"?>

```

<Response> 
<Connect> 
<Room participantIdentity="alice">DailyStandup</Room> 
</Connect> 
</Response>
Visit the __Programmable Video documentation__ for more information about adding PSTN participants to Video Rooms.