# Tutorials - Advanced Call Handling - Build an IVR: Screening & Recording with Node.js and Express (Blog Post)

IVR: Screening & Recording with Node.js and Express
Blog
/
IVR: Screening & Recording with Node.js...
Tags
IVR and customer care
JavaScript
Products
Voice API
Start for free
Time to read:
8 minutes
January 10, 2017
Written by
Andrew T. Baker
Twilion
Reviewed by
Jose Oliveros
Contributor
Paul Kamp
Twilion
Brianna DelValle
Twilion
Kat King
Twilion
ivr-screening-recording-nodejs-express
 
This Express sample application is modeled after a typical call center experience, but with more Reese's Pieces.
Stranded aliens can call an agent and receive instructions on how to get off of Earth safely. In this tutorial, we'll show you the key bits of code that allow an agent to send a caller to voicemail, and later read transcripts and listen to voicemails.
To run this sample app yourself, download the code and follow the instructions on GitHub.
IVR Screening and Recording in Node & Express
See more IVR application builds on our IVR application page.
Route the Call to an Agent
When our alien caller chooses a planet, we need to figure out where to route the call. Depending on their input, we will route this call to an extension. Extensions are used to look up an agent. Any string can be used to define an extension.
When our alien caller has made their choice we use the key-press to look up the requested Agent.
Once we look up the agent, we can use the <Dial> verb to dial the agent's phone number and try to connect the call.
Editor: this is a migrated tutorial. Find the original code at https://github.com/TwilioDevEd/ivr-recording-node/
JavaScript

Copy code
'use strict';

const express = require('express');
const twilio = require('twilio');
const VoiceResponse = twilio.twiml.VoiceResponse;
const Agent = require('../models/agent');

const router = new express.Router();

// POST: /extension/connect
router.post('/connect', twilio.webhook({validate: false}), function(req, res) {
  const selectedOption = req.body.Digits;
  const extensions = {
        2: 'Brodo',
        3: 'Dagobah',
        4: 'Oober',
      };

  Agent.findOne({extension: extensions[selectedOption]})
  .then(function(agent) {
    if (agent === null) {
      return res.send(redirectToWelcome());
    }

    const twiml = new VoiceResponse();
    twiml.say(
      {voice: 'Polly.Amy', language: 'en-GB'},
      'You\'ll be connected shortly to your planet.'
    );
    const dial = twiml.dial({
      action: `/agents/call?agentId=${agent.id}`,
      callerId: agent.phoneNumber,
    });
    dial.number(
      {url: '/agents/screencall'},
      agent.phoneNumber
    );

    res.send(twiml.toString());
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).send('An error has ocurred');
  });
});

const redirectToWelcome = function() {
  const twiml = new VoiceResponse();
  twiml
    .redirect('/ivr/welcome');

  return twiml.toString();
};

module.exports = router;
Now that our user has chosen their agent, our next step is to connect the call to that agent.
Call the agent
This code begins the process of transferring the call to our agent.
By passing a url to the <Number> noun, we are telling Twilio to make a POST request to the agents/screencall route after the agent has picked up but before connecting the two parties.
Essentially, we are telling Twilio to execute some TwiML that only the agent will hear.
JavaScript

Copy code
'use strict';

const express = require('express');
const twilio = require('twilio');
const VoiceResponse = twilio.twiml.VoiceResponse;
const Agent = require('../models/agent');

const router = new express.Router();

// POST: /extension/connect
router.post('/connect', twilio.webhook({validate: false}), function(req, res) {
  const selectedOption = req.body.Digits;
  const extensions = {
        2: 'Brodo',
        3: 'Dagobah',
        4: 'Oober',
      };

  Agent.findOne({extension: extensions[selectedOption]})
  .then(function(agent) {
    if (agent === null) {
      return res.send(redirectToWelcome());
    }

    const twiml = new VoiceResponse();
    twiml.say(
      {voice: 'Polly.Amy', language: 'en-GB'},
      'You\'ll be connected shortly to your planet.'
    );
    const dial = twiml.dial({
      action: `/agents/call?agentId=${agent.id}`,
      callerId: agent.phoneNumber,
    });
    dial.number(
      {url: '/agents/screencall'},
      agent.phoneNumber
    );

    res.send(twiml.toString());
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).send('An error has ocurred');
  });
});

const redirectToWelcome = function() {
  const twiml = new VoiceResponse();
  twiml
    .redirect('/ivr/welcome');

  return twiml.toString();
};

module.exports = router;
Our agent can now be called, but how does our agent interact with this feature? Let's dig into what is happening in the agent's screening call.
The agent screens the call
When our agent picks up the phone, we use a <Gather> verb to ask them if they want to accept the call.
If the agent responds by entering any digit, the response will be processed by our agents/connectmessage route. This will <Say> a quick message and continue with the original <Dial> command to connect the two parties.
JavaScript

Copy code
'use strict';

const express = require('express');
const twilio = require('twilio');
const VoiceResponse = twilio.twiml.VoiceResponse;
const Agent = require('../models/agent');

const router = new express.Router();

// GET: /agents
router.get('/', function(req, res) {
  Agent.find({})
    .then(function(agents) {
      res.render('agents/index', {agents: agents});
    });
});

// POST: /agents/call
router.post('/call', twilio.webhook({validate: false}), function(req, res) {
  if (req.body.CallStatus === 'completed') {
    return res.send('');
  }

  const twiml = new VoiceResponse();
  twiml.say(
    {voice: 'Polly.Amy', language: 'en-GB'},
    'It appears that no agent is available. ' +
    'Please leave a message after the beep');
  twiml.record({
    maxLength: 20,
    action: '/agents/hangup',
    transcribeCallback: '/recordings?agentId=' + req.query.agentId,
  });
  twiml.say(
    {voice: 'Polly.Amy', language: 'en-GB'},
    'No record received. Goodbye');
  twiml.hangup();

  res.send(twiml.toString());
});

// POST: /agents/hangup
router.post('/hangup', twilio.webhook({validate: false}), function(req, res) {
  const twiml = new VoiceResponse();
  twiml.say(
    {voice: 'Polly.Amy', language: 'en-GB'},
    'Thanks for your message. Goodbye');
  twiml.hangup();

  res.send(twiml.toString());
});

// POST: /agents/screencall
router.post('/screencall', twilio.webhook({validate: false}),
  function(req, res) {
    const twiml = new VoiceResponse();
    const gather = twiml.gather({
      action: '/agents/connectmessage',
      numDigits: '1',
    });
    gather.say(spellPhoneNumber(req.body.From));
    gather.say('Press any key to accept');

    twiml.say('Sorry. Did not get your response');
    twiml.hangup();

    res.send(twiml.toString());
  });

// POST: /agents/connectmessage
router.post('/connectmessage', twilio.webhook({validate: false}),
  function(req, res) {
    const twiml = new VoiceResponse();
    twiml
      .say('Connecting you to the extraterrestrial in distress');

    res.send(twiml.toString());
  });

const spellPhoneNumber = function(phoneNumber) {
  return phoneNumber.split('').join(',');
};

module.exports = router;
Now our agent can interact with the call, but what if our agent is currently out? In these cases it's helpful to have voicemail set up.
Send the caller to voicemail
When Twilio makes a request to our Call action method, it will pass a DialCallStatus argument to tell us the call status. If the status was "completed", we hang up. Otherwise, we need to <Say> a quick prompt and then <Record> a voicemail from the alien caller.
We also specify an action for <Record>. This route will be called after the call and recording have finished. The route will say "Goodbye" and then <Hangup>.
JavaScript

Copy code
'use strict';

const express = require('express');
const twilio = require('twilio');
const VoiceResponse = twilio.twiml.VoiceResponse;
const Agent = require('../models/agent');

const router = new express.Router();

// GET: /agents
router.get('/', function(req, res) {
  Agent.find({})
    .then(function(agents) {
      res.render('agents/index', {agents: agents});
    });
});

// POST: /agents/call
router.post('/call', twilio.webhook({validate: false}), function(req, res) {
  if (req.body.CallStatus === 'completed') {
    return res.send('');
  }

  const twiml = new VoiceResponse();
  twiml.say(
    {voice: 'Polly.Amy', language: 'en-GB'},
    'It appears that no agent is available. ' +
    'Please leave a message after the beep');
  twiml.record({
    maxLength: 20,
    action: '/agents/hangup',
    transcribeCallback: '/recordings?agentId=' + req.query.agentId,
  });
  twiml.say(
    {voice: 'Polly.Amy', language: 'en-GB'},
    'No record received. Goodbye');
  twiml.hangup();

  res.send(twiml.toString());
});

// POST: /agents/hangup
router.post('/hangup', twilio.webhook({validate: false}), function(req, res) {
  const twiml = new VoiceResponse();
  twiml.say(
    {voice: 'Polly.Amy', language: 'en-GB'},
    'Thanks for your message. Goodbye');
  twiml.hangup();

  res.send(twiml.toString());
});

// POST: /agents/screencall
router.post('/screencall', twilio.webhook({validate: false}),
  function(req, res) {
    const twiml = new VoiceResponse();
    const gather = twiml.gather({
      action: '/agents/connectmessage',
      numDigits: '1',
    });
    gather.say(spellPhoneNumber(req.body.From));
    gather.say('Press any key to accept');

    twiml.say('Sorry. Did not get your response');
    twiml.hangup();

    res.send(twiml.toString());
  });

// POST: /agents/connectmessage
router.post('/connectmessage', twilio.webhook({validate: false}),
  function(req, res) {
    const twiml = new VoiceResponse();
    twiml
      .say('Connecting you to the extraterrestrial in distress');

    res.send(twiml.toString());
  });

const spellPhoneNumber = function(phoneNumber) {
  return phoneNumber.split('').join(',');
};

module.exports = router;
Now let's take a step back to see how to actually record the call.
Record the caller
When we tell Twilio to record, we have a few options we can pass to the <Record> verb.
Here we instruct <Record> to stop the recording at 20 seconds, to transcribe the call, and to send the transcription to the agent when it's complete.
Notice that we redirect to a URL that is specific to this agent. This is a convenient way to specify which agent was called to produce the voice message. This way we can also save the associated agent together with the voicemail.
JavaScript

Copy code
'use strict';

const express = require('express');
const twilio = require('twilio');
const VoiceResponse = twilio.twiml.VoiceResponse;
const Agent = require('../models/agent');

const router = new express.Router();

// GET: /agents
router.get('/', function(req, res) {
  Agent.find({})
    .then(function(agents) {
      res.render('agents/index', {agents: agents});
    });
});

// POST: /agents/call
router.post('/call', twilio.webhook({validate: false}), function(req, res) {
  if (req.body.CallStatus === 'completed') {
    return res.send('');
  }

  const twiml = new VoiceResponse();
  twiml.say(
    {voice: 'Polly.Amy', language: 'en-GB'},
    'It appears that no agent is available. ' +
    'Please leave a message after the beep');
  twiml.record({
    maxLength: 20,
    action: '/agents/hangup',
    transcribeCallback: '/recordings?agentId=' + req.query.agentId,
  });
  twiml.say(
    {voice: 'Polly.Amy', language: 'en-GB'},
    'No record received. Goodbye');
  twiml.hangup();

  res.send(twiml.toString());
});

// POST: /agents/hangup
router.post('/hangup', twilio.webhook({validate: false}), function(req, res) {
  const twiml = new VoiceResponse();
  twiml.say(
    {voice: 'Polly.Amy', language: 'en-GB'},
    'Thanks for your message. Goodbye');
  twiml.hangup();

  res.send(twiml.toString());
});

// POST: /agents/screencall
router.post('/screencall', twilio.webhook({validate: false}),
  function(req, res) {
    const twiml = new VoiceResponse();
    const gather = twiml.gather({
      action: '/agents/connectmessage',
      numDigits: '1',
    });
    gather.say(spellPhoneNumber(req.body.From));
    gather.say('Press any key to accept');

    twiml.say('Sorry. Did not get your response');
    twiml.hangup();

    res.send(twiml.toString());
  });

// POST: /agents/connectmessage
router.post('/connectmessage', twilio.webhook({validate: false}),
  function(req, res) {
    const twiml = new VoiceResponse();
    twiml
      .say('Connecting you to the extraterrestrial in distress');

    res.send(twiml.toString());
  });

const spellPhoneNumber = function(phoneNumber) {
  return phoneNumber.split('').join(',');
};

module.exports = router;
Legal implications of call recording

If you choose to record voice or video calls, you need to comply with certain laws and regulations, including those regarding obtaining consent to record (such as California's Invasion of Privacy Act and similar laws in other jurisdictions). Additional information on the legal implications of call recording can be found in the "Legal Considerations with Recording Voice and Video Communications" Help Center article.
Notice: Twilio recommends that you consult with your legal counsel to make sure that you are complying with all applicable laws in connection with communications you record or store using Twilio.
Finally, we will see how to view an agent's voicemail.
View an agent's voicemail
Once we look up the agent, all we need to do is display their recordings. We bind the agent, along with their recordings, to a View.
It is possible to look up recordings via the Twilio REST API, but since we have all of the data we need in the transcribeCallback request, we can easily store it ourselves and save a roundtrip.
JavaScript

Copy code
'use strict';

const express = require('express');
const twilio = require('twilio');
const VoiceResponse = twilio.twiml.VoiceResponse;
const Agent = require('../models/agent');

const router = new express.Router();

// GET: /agents
router.get('/', function(req, res) {
  Agent.find({})
    .then(function(agents) {
      res.render('agents/index', {agents: agents});
    });
});

// POST: /agents/call
router.post('/call', twilio.webhook({validate: false}), function(req, res) {
  if (req.body.CallStatus === 'completed') {
    return res.send('');
  }

  const twiml = new VoiceResponse();
  twiml.say(
    {voice: 'Polly.Amy', language: 'en-GB'},
    'It appears that no agent is available. ' +
    'Please leave a message after the beep');
  twiml.record({
    maxLength: 20,
    action: '/agents/hangup',
    transcribeCallback: '/recordings?agentId=' + req.query.agentId,
  });
  twiml.say(
    {voice: 'Polly.Amy', language: 'en-GB'},
    'No record received. Goodbye');
  twiml.hangup();

  res.send(twiml.toString());
});

// POST: /agents/hangup
router.post('/hangup', twilio.webhook({validate: false}), function(req, res) {
  const twiml = new VoiceResponse();
  twiml.say(
    {voice: 'Polly.Amy', language: 'en-GB'},
    'Thanks for your message. Goodbye');
  twiml.hangup();

  res.send(twiml.toString());
});

// POST: /agents/screencall
router.post('/screencall', twilio.webhook({validate: false}),
  function(req, res) {
    const twiml = new VoiceResponse();
    const gather = twiml.gather({
      action: '/agents/connectmessage',
      numDigits: '1',
    });
    gather.say(spellPhoneNumber(req.body.From));
    gather.say('Press any key to accept');

    twiml.say('Sorry. Did not get your response');
    twiml.hangup();

    res.send(twiml.toString());
  });

// POST: /agents/connectmessage
router.post('/connectmessage', twilio.webhook({validate: false}),
  function(req, res) {
    const twiml = new VoiceResponse();
    twiml
      .say('Connecting you to the extraterrestrial in distress');

    res.send(twiml.toString());
  });

const spellPhoneNumber = function(phoneNumber) {
  return phoneNumber.split('').join(',');
};

module.exports = router;
That's it! We've just implemented an IVR with real Agents, call screening and voicemail.
Where to next?
If you're a Node.js developer working with Twilio, you might want to check out these other tutorials.
Part 1 of this Tutorial: ET Phone Home Service - IVR Phone Trees
Increase your rate of response by automating the workflows that are key to your business.
Automated Survey
Instantly collect structured data from your users with a survey conducted over a voice call or SMS text messages.
Did this help?

Thanks for checking out this tutorial! If you have any feedback to share with us, we'd love to hear it. Connect with us on Twitter and let us know what you build!