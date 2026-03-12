# Tutorials - Advanced Call Handling - Build Warm Transfer with Node.js and Express (Blog Post)

Warm Transfer with Node.js and Express
Blog
/
Warm Transfer with Node.js and Express
Tags
JavaScript
Start for free
Time to read:
8 minutes
January 10, 2017
Written by
Samuel Mendes
Contributor
Reviewed by
Paul Kamp
Twilion
Brianna DelValle
Twilion
David Prothero
Twilion
Kat King
Twilion
warm-transfer-nodejs
Have you ever been disconnected from a support call while being transferred to someone else?
Warm transfer eliminates this problem. Using Twilio powered warm transfers your agents will have the ability to dial in another agent in real-time.
Here is how it works at a high level:
The first agent becomes available when they connect through the web client.
The second agent also becomes available when they connect through the web client.
A client calls our support line.
The client stays on hold while the first agent joins the call.
While the first agent is on the phone with the client, they can dial a second agent into the call.
Once the second agent is on the call, the first one can disconnect from it. This way the client and the second agent stay on the call.
Let's get started! Clone the sample application from Github.
Set Up Voice Webhook
First let's configure the voice webhook for the Twilio number that customers will dial when they want to talk to a support agent. 
Twilio Console for Warm Transfer
This should be the public-facing endpoint of your app in production.
One option to expose a development URL from your local machine is to use ngrok.  Your URL would then be something like:
 https://<your-ngrok-id>.ngrok.io/conference/connect/client
Editor: this is a migrated tutorial. Clone the original code from https://github.com/TwilioDevEd/warm-transfer-node
JavaScript

Copy code
'use strict';

var express = require('express')
  , router = express.Router()
  , twimlGenerator = require('../lib/twiml-generator')
  , Call = require('../models/call')
  , url = require('url')
  , twilioCaller = require('../lib/twilio-caller');

var AGENT_WAIT_URL = 'http://twimlets.com/holdmusic?Bucket=com.twilio.music.classical';

var connectConferenceUrl = function(req, agentId, conferenceId) {
  var pathName = `/conference/${conferenceId}/connect/${agentId}`;
  return url.format({
    protocol: 'https',
    host: req.get('host'),
    pathname: pathName
  });
};

// POST /conference/wait
router.post('/wait/', function (req, res) {
  res.type('text/xml');
  res.send(twimlGenerator.waitResponseTwiml().toString());
});

// POST /conference/:conferenceId/connect/agent1/
router.post('/:conferenceId/connect/agent1/', function (req, res) {
  res.type('text/xml');
  res.send(twimlGenerator.connectConferenceTwiml({
    conferenceId: req.params.conferenceId,
    waitUrl: AGENT_WAIT_URL,
    startConferenceOnEnter: true,
    endConferenceOnExit: false
  })
  .toString());
});

// POST /conference/:conferenceId/connect/agent2/
router.post('/:conferenceId/connect/agent2/', function (req, res) {
  res.type('text/xml');
  res.send(twimlGenerator.connectConferenceTwiml({
    conferenceId: req.params.conferenceId,
    waitUrl: AGENT_WAIT_URL,
    startConferenceOnEnter: true,
    endConferenceOnExit: true
  })
  .toString());
});

// POST /conference/connect/client/
router.post('/connect/client/', function(req, res) {
  var conferenceId = req.body.CallSid
    , agentOne = 'agent1'
    , callbackUrl = connectConferenceUrl(req, agentOne, conferenceId);

  twilioCaller.call(agentOne, callbackUrl)
    .then(function() {
      return Call.findOneAndUpdate(
        {
          agentId: agentOne
        },
        {
          agentId: agentOne,
          conferenceId: conferenceId
        },
        {
          upsert: true
        });
    }).then(function(doc) {
      res.type('text/xml');
      res.send(twimlGenerator.connectConferenceTwiml({
        conferenceId: conferenceId,
        waitUrl: AGENT_WAIT_URL,
        startConferenceOnEnter: false,
        endConferenceOnExit: true
      })
      .toString());
    });
});

// POST /conference/:agentId/call/
router.post('/:agentId/call/', function (req, res) {
  var agentTwo = 'agent2';
  Call.findOne({agentId: req.params.agentId}, function (err, call) {
    var callbackUrl = connectConferenceUrl(req, agentTwo, call.conferenceId);
    twilioCaller.call(agentTwo, callbackUrl)
      .then(function() {
        res.sendStatus(200);
      });
  });
});

module.exports = router;
Awesome, now you've got a webhook in place.  Next up, we'll look at some of the code.
Connect an Agent
Here you can see all front-end code necessary to connect an agent using Twilio's Voice Web Client.
We essentially need three things to have a live web client:
A capability token (provided by our express app)
A unique identifier (string) for each agent
Event listeners to handle different Twilio-triggered events
JavaScript

Copy code
$(function() {
  var currentAgentId;
  var currentConnection;
  var $callStatus = $('#call-status');
  var $connectAgent1Button = $("#connect-agent1-button");
  var $connectAgent2Button = $("#connect-agent2-button");

  var $answerCallButton = $("#answer-call-button");
  var $hangupCallButton = $("#hangup-call-button");
  var $dialAgent2Button = $("#dial-agent2-button");

  $connectAgent1Button.on('click', { agentId: 'agent1' }, agentClickHandler);
  $connectAgent2Button.on('click', { agentId: 'agent2' }, agentClickHandler);
  $hangupCallButton.on('click', hangUp);
  $dialAgent2Button.on('click', dialAgent2);

  function fetchToken(agentId) {
    $.post('/token/'+ agentId, {}, function(data) {
      currentAgentId = data.agentId;
      connectClient(data.token)
    }, 'json');
  }

  function connectClient(token) {
    Twilio.Device.setup(token);
  }

  Twilio.Device.ready(function (device) {
    updateCallStatus("Ready");
    agentConnectedHandler(device._clientName);
  });

  // Callback for when Twilio Client receives a new incoming call
  Twilio.Device.incoming(function(connection) {
    currentConnection = connection;
    updateCallStatus("Incoming support call");

    // Set a callback to be executed when the connection is accepted
    connection.accept(function() {
      updateCallStatus("In call with customer");
      $answerCallButton.prop('disabled', true);
      $hangupCallButton.prop('disabled', false);
      $dialAgent2Button.prop('disabled', false);
    });

    // Set a callback on the answer button and enable it
    $answerCallButton.click(function() {
      connection.accept();
    });
    $answerCallButton.prop('disabled', false);
  });

  /* Report any errors to the call status display */
  Twilio.Device.error(function (error) {
    updateCallStatus("ERROR: " + error.message);
    disableConnectButtons(false);
  });

  // Callback for when the call finalizes
  Twilio.Device.disconnect(function(connection) {
    callEndedHandler(connection.device._clientName);
  });

  function dialAgent2() {
    $.post('/conference/' + currentAgentId + '/call')
  }

  /* End a call */
  function hangUp() {
    Twilio.Device.disconnectAll();
  }

  function agentClickHandler(e) {
    var agentId = e.data.agentId;
    disableConnectButtons(true);
    fetchToken(agentId);
  }

  function agentConnectedHandler(agentId) {
    $('#connect-agent-row').addClass('hidden');
    $('#connected-agent-row').removeClass('hidden');
    updateCallStatus("Connected as: " + agentId);

    if (agentId === 'agent1') {
      $dialAgent2Button.removeClass('hidden').prop('disabled', true);
    }
    else {
      $dialAgent2Button.addClass('hidden')
    }
  }

  function callEndedHandler(agentId) {
    $dialAgent2Button.prop('disabled', true);
    $hangupCallButton.prop('disabled', true);
    $answerCallButton.prop('disabled', true)
    updateCallStatus("Connected as: " + agentId);
  }

  function disableConnectButtons(disable) {
    $connectAgent1Button.prop('disabled', disable);
    $connectAgent2Button.prop('disabled', disable);
  }

  function updateCallStatus(status) {
    $callStatus.text(status);
  }
});
In the next step we'll take a closer look at capability token generation.
Generate a Capability Token
In order to connect the Twilio Voice Web Client we need a capability token.
To allow incoming connections through the web client an identifier must be provided when generating the token. For this tutorial we used fixed identifier strings like agent1 and agent2 but you can use any generated string for your call center clients. These identifiers will be used to create outbound calls to the specified agent using the Twilio REST API.
JavaScript

Copy code
'use strict';

var ClientCapability = require('twilio').jwt.ClientCapability;

module.exports = function(agentId){
  var capability = new ClientCapability({
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN});

  capability.addScope(new ClientCapability.IncomingClientScope(agentId));
  return capability.toJwt();
};
Next up let's see how to handle incoming calls.
Handle Incoming Calls
When a client makes a call to our Twilio number the application receives a POST request asking for instructions. We'll use TwiML to instruct the client to join a conference room and the Twilio REST API client to start a call with the first agent, so they can join the same conference.
When providing instructions to the client, we also provide a waitUrl. This URL is another endpoint of our application. This returns more TwiML to say welcome to the user, and also play some music while on hold. Take a look at the code here
We use the client's CallSid as the conference identifier. Since all participants need this identifier to join the conference we'll need to store it in a database so that we can grab it when we dial the second agent in later.
JavaScript

Copy code
'use strict';

var express = require('express')
  , router = express.Router()
  , twimlGenerator = require('../lib/twiml-generator')
  , Call = require('../models/call')
  , url = require('url')
  , twilioCaller = require('../lib/twilio-caller');

var AGENT_WAIT_URL = 'http://twimlets.com/holdmusic?Bucket=com.twilio.music.classical';

var connectConferenceUrl = function(req, agentId, conferenceId) {
  var pathName = `/conference/${conferenceId}/connect/${agentId}`;
  return url.format({
    protocol: 'https',
    host: req.get('host'),
    pathname: pathName
  });
};

// POST /conference/wait
router.post('/wait/', function (req, res) {
  res.type('text/xml');
  res.send(twimlGenerator.waitResponseTwiml().toString());
});

// POST /conference/:conferenceId/connect/agent1/
router.post('/:conferenceId/connect/agent1/', function (req, res) {
  res.type('text/xml');
  res.send(twimlGenerator.connectConferenceTwiml({
    conferenceId: req.params.conferenceId,
    waitUrl: AGENT_WAIT_URL,
    startConferenceOnEnter: true,
    endConferenceOnExit: false
  })
  .toString());
});

// POST /conference/:conferenceId/connect/agent2/
router.post('/:conferenceId/connect/agent2/', function (req, res) {
  res.type('text/xml');
  res.send(twimlGenerator.connectConferenceTwiml({
    conferenceId: req.params.conferenceId,
    waitUrl: AGENT_WAIT_URL,
    startConferenceOnEnter: true,
    endConferenceOnExit: true
  })
  .toString());
});

// POST /conference/connect/client/
router.post('/connect/client/', function(req, res) {
  var conferenceId = req.body.CallSid
    , agentOne = 'agent1'
    , callbackUrl = connectConferenceUrl(req, agentOne, conferenceId);

  twilioCaller.call(agentOne, callbackUrl)
    .then(function() {
      return Call.findOneAndUpdate(
        {
          agentId: agentOne
        },
        {
          agentId: agentOne,
          conferenceId: conferenceId
        },
        {
          upsert: true
        });
    }).then(function(doc) {
      res.type('text/xml');
      res.send(twimlGenerator.connectConferenceTwiml({
        conferenceId: conferenceId,
        waitUrl: AGENT_WAIT_URL,
        startConferenceOnEnter: false,
        endConferenceOnExit: true
      })
      .toString());
    });
});

// POST /conference/:agentId/call/
router.post('/:agentId/call/', function (req, res) {
  var agentTwo = 'agent2';
  Call.findOne({agentId: req.params.agentId}, function (err, call) {
    var callbackUrl = connectConferenceUrl(req, agentTwo, call.conferenceId);
    twilioCaller.call(agentTwo, callbackUrl)
      .then(function() {
        res.sendStatus(200);
      });
  });
});

module.exports = router;
Now let's see how to provide TwiML instructions to the client.
Provide TwiML Instruction For The Client
Here we create a TwiMLResponse that will contain a Dial verb with a Conference noun that will instruct the client to join a specific conference room.
JavaScript

Copy code
'use strict';

var VoiceResponse = require('twilio').twiml.VoiceResponse;

var connectConferenceTwiml = function(options){
  var voiceResponse = new VoiceResponse();
  voiceResponse.dial().conference({
      'startConferenceOnEnter': options.startConferenceOnEnter,
      'endConferenceOnExit': options.endConferenceOnExit,
      'waitUrl': options.waitUrl
    }, options.conferenceId);

  return voiceResponse;
};

var waitResponseTwiml = function(){
  var voiceResponse = new VoiceResponse()
  voiceResponse.say({}, 'Thank you for calling. Please wait in line for a few seconds. An agent will be with you shortly.')
  voiceResponse.play({}, 'http://com.twilio.music.classical.s3.amazonaws.com/BusyStrings.mp3');

  return voiceResponse;
};

module.exports.waitResponseTwiml = waitResponseTwiml;
module.exports.connectConferenceTwiml = connectConferenceTwiml;
Next up, we will look at how to dial our first agent into the call.
Dial First Agent Into the Call
For our app we created a twilio-caller module to handle dialing our agents. This module uses Twilio's REST API to create a new call. The call function receives a hash with the following keys:
from: Your Twilio number
to : The agent web client's identifier (agent1 or agent2)
url : A URL to ask for TwiML instructions when the call connects
Once the agent answers the call in the web client, a request is made to the callback URL instructing the agent's call to join the conference room where the client is already waiting.
JavaScript

Copy code
'use strict';

var call = function(agentId, callbackUrl) {
  var twilioPhoneNumber = process.env.TWILIO_NUMBER;
  var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  return client.calls
    .create({
      from: twilioPhoneNumber,
      to: `client:${agentId}`,
      url: callbackUrl
    });
};

module.exports.call = call;
With that in mind, let's see how to add the second agent to the call.
Dial Second Agent Into the Call
When the client and the first agent are both in the call we are ready to perform a warm transfer to a second agent. The first agent makes a request passing its identifier to allow us to look for the conferenceId needed to dial the second agent in. Since we already have a twilio-caller module we can simply use the call function to connect the second agent.
JavaScript

Copy code
'use strict';

var express = require('express')
  , router = express.Router()
  , twimlGenerator = require('../lib/twiml-generator')
  , Call = require('../models/call')
  , url = require('url')
  , twilioCaller = require('../lib/twilio-caller');

var AGENT_WAIT_URL = 'http://twimlets.com/holdmusic?Bucket=com.twilio.music.classical';

var connectConferenceUrl = function(req, agentId, conferenceId) {
  var pathName = `/conference/${conferenceId}/connect/${agentId}`;
  return url.format({
    protocol: 'https',
    host: req.get('host'),
    pathname: pathName
  });
};

// POST /conference/wait
router.post('/wait/', function (req, res) {
  res.type('text/xml');
  res.send(twimlGenerator.waitResponseTwiml().toString());
});

// POST /conference/:conferenceId/connect/agent1/
router.post('/:conferenceId/connect/agent1/', function (req, res) {
  res.type('text/xml');
  res.send(twimlGenerator.connectConferenceTwiml({
    conferenceId: req.params.conferenceId,
    waitUrl: AGENT_WAIT_URL,
    startConferenceOnEnter: true,
    endConferenceOnExit: false
  })
  .toString());
});

// POST /conference/:conferenceId/connect/agent2/
router.post('/:conferenceId/connect/agent2/', function (req, res) {
  res.type('text/xml');
  res.send(twimlGenerator.connectConferenceTwiml({
    conferenceId: req.params.conferenceId,
    waitUrl: AGENT_WAIT_URL,
    startConferenceOnEnter: true,
    endConferenceOnExit: true
  })
  .toString());
});

// POST /conference/connect/client/
router.post('/connect/client/', function(req, res) {
  var conferenceId = req.body.CallSid
    , agentOne = 'agent1'
    , callbackUrl = connectConferenceUrl(req, agentOne, conferenceId);

  twilioCaller.call(agentOne, callbackUrl)
    .then(function() {
      return Call.findOneAndUpdate(
        {
          agentId: agentOne
        },
        {
          agentId: agentOne,
          conferenceId: conferenceId
        },
        {
          upsert: true
        });
    }).then(function(doc) {
      res.type('text/xml');
      res.send(twimlGenerator.connectConferenceTwiml({
        conferenceId: conferenceId,
        waitUrl: AGENT_WAIT_URL,
        startConferenceOnEnter: false,
        endConferenceOnExit: true
      })
      .toString());
    });
});

// POST /conference/:agentId/call/
router.post('/:agentId/call/', function (req, res) {
  var agentTwo = 'agent2';
  Call.findOne({agentId: req.params.agentId}, function (err, call) {
    var callbackUrl = connectConferenceUrl(req, agentTwo, call.conferenceId);
    twilioCaller.call(agentTwo, callbackUrl)
      .then(function() {
        res.sendStatus(200);
      });
  });
});

module.exports = router;
Next up, we'll look at how to handle the first agent leaving the call.
The First Agent Leaves the Call
When the three participants have joined the same call, the first agent has served his purpose. Now they can drop the call, leaving agent two and the client having a pleasant conversation.
It is important to notice the differences between the TwiML each one of the participants received when joining the call. Both, agent one and two, have startConferenceOnEnter set to true. This means the conference will start when any of them joins the call. For the client calling and for agent two, endConferenceOnExit is set to true. This causes the call to end when either of these two participants drop the call.
JavaScript

Copy code
'use strict';

var VoiceResponse = require('twilio').twiml.VoiceResponse;

var connectConferenceTwiml = function(options){
  var voiceResponse = new VoiceResponse();
  voiceResponse.dial().conference({
      'startConferenceOnEnter': options.startConferenceOnEnter,
      'endConferenceOnExit': options.endConferenceOnExit,
      'waitUrl': options.waitUrl
    }, options.conferenceId);

  return voiceResponse;
};

var waitResponseTwiml = function(){
  var voiceResponse = new VoiceResponse()
  voiceResponse.say({}, 'Thank you for calling. Please wait in line for a few seconds. An agent will be with you shortly.')
  voiceResponse.play({}, 'http://com.twilio.music.classical.s3.amazonaws.com/BusyStrings.mp3');

  return voiceResponse;
};

module.exports.waitResponseTwiml = waitResponseTwiml;
module.exports.connectConferenceTwiml = connectConferenceTwiml;
And that's it! We have just implemented warm transfers using Node and Express. Now your clients won't get disconnected from support calls while they are being transferred.
Where to next?
That's it! We have just implemented warm transfers using Node.js/Express. Now your clients won't get disconnect from support calls while they are been transferred to some else.
If you're a Node.js developer working with Twilio, you might also enjoy these tutorials:
Browser-Calls
Learn how to use Twilio Client to make browser-to-phone and browser-to-browser calls with ease.
ETA-Notifications
Learn how to implement ETA Notifications using Node.js/Express and Twilio.
Did this help?

Thanks for checking this tutorial out! Let us know on Twitter what you've built... or what you're building.