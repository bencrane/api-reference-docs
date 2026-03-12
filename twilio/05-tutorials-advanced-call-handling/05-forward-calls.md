# Call Forwarding with Node.js and Express

**Tags:** JavaScript

**Products:** Voice API

**Time to read:** 15 minutes

**January 10, 2017**

**Written by:** Kat King (Twilion)

**Reviewed by:** Paul Kamp (Twilion), Brianna DelValle (Twilion), David Prothero (Twilion), Samuel Mendes (Contributor)

---

This Express application uses Twilio to connect incoming phone calls to other phone numbers based on where the caller lives. When a user dials in, we look up some information based upon their assumed location and trigger actions inside our application.

Your business might use this functionality to automatically route your customers to a regional office or to direct callers to a survey after their interaction with customer service. Our sample application connects callers to the offices of their U.S. senators.

Communication can be a powerful force for change. We've seen civic engagement rise as tools for civic engagement become increasingly available to an internet-connected and mobile society. In November of 2016, Emily Ellsworth shared some tips and tricks for getting your Congressperson's attention with one big takeaway: calling works.

To run this sample app yourself, download the code and follow the README instructions on Github.

Let's get started!

## Configure your Twilio Application

For this application, we'll be using the Twilio Node Helper Library to help us interact with the Twilio API. Our first step is to set up a Twilio account and the Express application itself.

You'll need to get a voice-capable Twilio phone number if you don't already have one.

We've provided a sample set of data that can be loaded into your local database for testing and development. In our dataset, we've mapped states to senators, and we've mapped the senators to a few Twilio phone numbers for testing rather than actual senator phone numbers. Please note: this data set will likely be out of date by the time you use it, so we recommend you roll your own if you want to get the application production-ready.

*This is a migrated tutorial. Clone the original code from https://github.com/TwilioDevEd/call-forwarding-node/*

```javascript
'use strict';
const parsers = require('../utils/parsers');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return parsers.zipsFromCSV().then(
      (zipcodes) => { 
        return queryInterface.bulkInsert('ZipCodes', zipcodes, {});
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ZipCodes', null, {});
  }
};
```

The last piece of the configuration puzzle is to create a webhook endpoint for our application to accept inbound calls. Once your database is configured and your app is up and running, go to the Twilio phone number you wish to use and configure the Voice URL to point to your application. In our sample code, the route is `/callcongress/welcome`.

Twilio webhook configuration

We recommend using ngrok to expose your local development environment to Twilio.

## Handle the Inbound Twilio Request

Our Twilio number is now configured to send HTTP requests to the /welcome endpoint on all incoming voice calls. This Twilio request arrives with some useful parameters. For our use case, we're most concerned with fromState, as it will help us make a best guess at our caller's state of residence.

```javascript
const models  = require('../models');
const express = require('express');
const router  = express.Router();
const twilio = require('twilio');

// Very basic route to landing page.
router.get('/', function (req, res) {
  res.render('index');
});


// Verify or collect State information.
router.post('/callcongress/welcome', (req, res) => {
  const response = new twilio.twiml.VoiceResponse();
  const fromState = req.body.FromState;

  if (fromState) {
    const gather = response.gather({
      numDigits: 1,
      action: '/callcongress/set-state',
      method: 'POST'
    });
    gather.say("Thank you for calling congress! It looks like " +
               "you're calling from " + fromState + "." +
               "If this is correct, please press 1. Press 2 if " +
               "this is not your current state of residence.");
  } else {
    const gather = response.gather({
      numDigits: 5,
      action: '/callcongress/state-lookup',
      method: 'POST'
    });
    gather.say('Thank you for calling Call Congress! If you wish to' +
               'call your senators, please enter your 5-digit zip code.');
  }
  res.set('Content-Type', 'text/xml');
  res.send(response.toString());
});


// Look up state from given zipcode.
//
// Once state is found, redirect to call_senators for forwarding.
router.post('/callcongress/state-lookup', (req, res) => {
  zipDigits = req.body.Digits;
  // NB: We don't do any error handling for a missing/erroneous zip code
  // in this sample application. You, gentle reader, should to handle that
  // edge case before deploying this code.
  models.ZipCode.findOne({where: { zipcode: zipDigits}}).get('state').then(
    (state) => {
      return models.State.findOne({where: {name: state}}).get('id').then(
        (stateId) => {
          return res.redirect('/callcongress/call-senators/' + stateId);
        }
      );
    }
  );
});


// If our state guess is wrong, prompt user for zip code.
router.get('/callcongress/collect-zip', (req, res) => {
  const response = new twilio.twiml.VoiceResponse();
  const gather = response.gather({
      numDigits: 5,
      action: '/callcongress/state-lookup',
      method: 'POST'
    });
  gather.say('If you wish to call your senators, please ' +
              'enter your 5-digit zip code.');
  res.set('Content-Type', 'text/xml');
  res.send(response.toString());
});


// Set state for senator call list.
//
// Set user's state from confirmation or user-provided Zip.
// Redirect to call_senators route.
router.post('/callcongress/set-state', (req, res) => {
  // Get the digit pressed by the user
  const digitsProvided = req.body.Digits;

  if (digitsProvided === '1') {
    const state = req.body.CallerState;
    models.State.findOne({where: {name: state}}).get('id').then(
      (stateId) => {
        return res.redirect('/callcongress/call-senators/' + stateId);
      }
    );
  } else {
    res.redirect('/callcongress/collect-zip')
  }
});


function callSenator(req, res) {
  models.State.findOne({
    where: {
      id: req.params.state_id
    }
  }).then(
    (state) => {
      return state.getSenators().then(
        (senators) => {
          const response = new twilio.twiml.VoiceResponse();
          response.say("Connecting you to " + senators[0].name + ". " +
           "After the senator's office ends the call, you will " +
           "be re-directed to " + senators[1].name + ".");
          response.dial(senators[0].phone, {
            action: '/callcongress/call-second-senator/' + senators[1].id
          });
          res.set('Content-Type', 'text/xml');
          return res.send(response.toString());
        }
      );
    }
  );
}

// Route for connecting caller to both of their senators.
router.get('/callcongress/call-senators/:state_id', callSenator);
router.post('/callcongress/call-senators/:state_id', callSenator);


function callSecondSenator(req, res) {
  models.Senator.findOne({
    where: {
      id: req.params.senator_id
    }
  }).then(
    (senator) => {
      const response = new twilio.twiml.VoiceResponse();
      response.say("Connecting you to " + senator.name + ". ");
      response.dial(senator.phone, {
        action: '/callcongress/goodbye/'
      });
      res.set('Content-Type', 'text/xml');
      return res.send(response.toString());
    }
  );
}

// Forward the caller to their second senator.
router.get('/callcongress/call-second-senator/:senator_id',  callSecondSenator);
router.post('/callcongress/call-second-senator/:senator_id',  callSecondSenator);


// Thank user & hang up.
router.post('/callcongress/goodbye', (req, res) => {
  const response = new twilio.twiml.VoiceResponse();
  response.say("Thank you for using Call Congress! " +
               "Your voice makes a difference. Goodbye.");
  response.hangup();
  res.set('Content-Type', 'text/xml');
  res.send(response.toString());
});

module.exports = router;
```

In order to welcome our caller and properly direct them to their senators' offices, we need to build out a response with TwiML.

## Build the TwiML Response

Since the fromState parameter comes from the user's phone rather than their actual geolocation, we want to make sure that we direct the caller to their state of residence. Let's break down how we build out a response that both welcomes the caller and asks for confirmation of their state of residence.

```javascript
const models  = require('../models');
const express = require('express');
const router  = express.Router();
const twilio = require('twilio');

// Very basic route to landing page.
router.get('/', function (req, res) {
  res.render('index');
});


// Verify or collect State information.
router.post('/callcongress/welcome', (req, res) => {
  const response = new twilio.twiml.VoiceResponse();
  const fromState = req.body.FromState;

  if (fromState) {
    const gather = response.gather({
      numDigits: 1,
      action: '/callcongress/set-state',
      method: 'POST'
    });
    gather.say("Thank you for calling congress! It looks like " +
               "you're calling from " + fromState + "." +
               "If this is correct, please press 1. Press 2 if " +
               "this is not your current state of residence.");
  } else {
    const gather = response.gather({
      numDigits: 5,
      action: '/callcongress/state-lookup',
      method: 'POST'
    });
    gather.say('Thank you for calling Call Congress! If you wish to' +
               'call your senators, please enter your 5-digit zip code.');
  }
  res.set('Content-Type', 'text/xml');
  res.send(response.toString());
});


// Look up state from given zipcode.
//
// Once state is found, redirect to call_senators for forwarding.
router.post('/callcongress/state-lookup', (req, res) => {
  zipDigits = req.body.Digits;
  // NB: We don't do any error handling for a missing/erroneous zip code
  // in this sample application. You, gentle reader, should to handle that
  // edge case before deploying this code.
  models.ZipCode.findOne({where: { zipcode: zipDigits}}).get('state').then(
    (state) => {
      return models.State.findOne({where: {name: state}}).get('id').then(
        (stateId) => {
          return res.redirect('/callcongress/call-senators/' + stateId);
        }
      );
    }
  );
});


// If our state guess is wrong, prompt user for zip code.
router.get('/callcongress/collect-zip', (req, res) => {
  const response = new twilio.twiml.VoiceResponse();
  const gather = response.gather({
      numDigits: 5,
      action: '/callcongress/state-lookup',
      method: 'POST'
    });
  gather.say('If you wish to call your senators, please ' +
              'enter your 5-digit zip code.');
  res.set('Content-Type', 'text/xml');
  res.send(response.toString());
});


// Set state for senator call list.
//
// Set user's state from confirmation or user-provided Zip.
// Redirect to call_senators route.
router.post('/callcongress/set-state', (req, res) => {
  // Get the digit pressed by the user
  const digitsProvided = req.body.Digits;

  if (digitsProvided === '1') {
    const state = req.body.CallerState;
    models.State.findOne({where: {name: state}}).get('id').then(
      (stateId) => {
        return res.redirect('/callcongress/call-senators/' + stateId);
      }
    );
  } else {
    res.redirect('/callcongress/collect-zip')
  }
});


function callSenator(req, res) {
  models.State.findOne({
    where: {
      id: req.params.state_id
    }
  }).then(
    (state) => {
      return state.getSenators().then(
        (senators) => {
          const response = new twilio.twiml.VoiceResponse();
          response.say("Connecting you to " + senators[0].name + ". " +
           "After the senator's office ends the call, you will " +
           "be re-directed to " + senators[1].name + ".");
          response.dial(senators[0].phone, {
            action: '/callcongress/call-second-senator/' + senators[1].id
          });
          res.set('Content-Type', 'text/xml');
          return res.send(response.toString());
        }
      );
    }
  );
}

// Route for connecting caller to both of their senators.
router.get('/callcongress/call-senators/:state_id', callSenator);
router.post('/callcongress/call-senators/:state_id', callSenator);


function callSecondSenator(req, res) {
  models.Senator.findOne({
    where: {
      id: req.params.senator_id
    }
  }).then(
    (senator) => {
      const response = new twilio.twiml.VoiceResponse();
      response.say("Connecting you to " + senator.name + ". ");
      response.dial(senator.phone, {
        action: '/callcongress/goodbye/'
      });
      res.set('Content-Type', 'text/xml');
      return res.send(response.toString());
    }
  );
}

// Forward the caller to their second senator.
router.get('/callcongress/call-second-senator/:senator_id',  callSecondSenator);
router.post('/callcongress/call-second-senator/:senator_id',  callSecondSenator);


// Thank user & hang up.
router.post('/callcongress/goodbye', (req, res) => {
  const response = new twilio.twiml.VoiceResponse();
  response.say("Thank you for using Call Congress! " +
               "Your voice makes a difference. Goodbye.");
  response.hangup();
  res.set('Content-Type', 'text/xml');
  res.send(response.toString());
});

module.exports = router;
```

We'll start our TwiML response by reading a welcome message to the caller with <Say>. Then we use <Gather> to ask the user to confirm their state of residence by pressing 1 or 2.

Once Twilio gathers this information, it will POST the caller's input to our route specified on the action parameter so that we can better route the user through our application.

## Handle a Missing State

If for some reason the inbound request to Twilio doesn't contain a fromState value, we need to get a little more information from the caller before we proceed.

```javascript
const models  = require('../models');
const express = require('express');
const router  = express.Router();
const twilio = require('twilio');

// Very basic route to landing page.
router.get('/', function (req, res) {
  res.render('index');
});


// Verify or collect State information.
router.post('/callcongress/welcome', (req, res) => {
  const response = new twilio.twiml.VoiceResponse();
  const fromState = req.body.FromState;

  if (fromState) {
    const gather = response.gather({
      numDigits: 1,
      action: '/callcongress/set-state',
      method: 'POST'
    });
    gather.say("Thank you for calling congress! It looks like " +
               "you're calling from " + fromState + "." +
               "If this is correct, please press 1. Press 2 if " +
               "this is not your current state of residence.");
  } else {
    const gather = response.gather({
      numDigits: 5,
      action: '/callcongress/state-lookup',
      method: 'POST'
    });
    gather.say('Thank you for calling Call Congress! If you wish to' +
               'call your senators, please enter your 5-digit zip code.');
  }
  res.set('Content-Type', 'text/xml');
  res.send(response.toString());
});


// Look up state from given zipcode.
//
// Once state is found, redirect to call_senators for forwarding.
router.post('/callcongress/state-lookup', (req, res) => {
  zipDigits = req.body.Digits;
  // NB: We don't do any error handling for a missing/erroneous zip code
  // in this sample application. You, gentle reader, should to handle that
  // edge case before deploying this code.
  models.ZipCode.findOne({where: { zipcode: zipDigits}}).get('state').then(
    (state) => {
      return models.State.findOne({where: {name: state}}).get('id').then(
        (stateId) => {
          return res.redirect('/callcongress/call-senators/' + stateId);
        }
      );
    }
  );
});


// If our state guess is wrong, prompt user for zip code.
router.get('/callcongress/collect-zip', (req, res) => {
  const response = new twilio.twiml.VoiceResponse();
  const gather = response.gather({
      numDigits: 5,
      action: '/callcongress/state-lookup',
      method: 'POST'
    });
  gather.say('If you wish to call your senators, please ' +
              'enter your 5-digit zip code.');
  res.set('Content-Type', 'text/xml');
  res.send(response.toString());
});


// Set state for senator call list.
//
// Set user's state from confirmation or user-provided Zip.
// Redirect to call_senators route.
router.post('/callcongress/set-state', (req, res) => {
  // Get the digit pressed by the user
  const digitsProvided = req.body.Digits;

  if (digitsProvided === '1') {
    const state = req.body.CallerState;
    models.State.findOne({where: {name: state}}).get('id').then(
      (stateId) => {
        return res.redirect('/callcongress/call-senators/' + stateId);
      }
    );
  } else {
    res.redirect('/callcongress/collect-zip')
  }
});


function callSenator(req, res) {
  models.State.findOne({
    where: {
      id: req.params.state_id
    }
  }).then(
    (state) => {
      return state.getSenators().then(
        (senators) => {
          const response = new twilio.twiml.VoiceResponse();
          response.say("Connecting you to " + senators[0].name + ". " +
           "After the senator's office ends the call, you will " +
           "be re-directed to " + senators[1].name + ".");
          response.dial(senators[0].phone, {
            action: '/callcongress/call-second-senator/' + senators[1].id
          });
          res.set('Content-Type', 'text/xml');
          return res.send(response.toString());
        }
      );
    }
  );
}

// Route for connecting caller to both of their senators.
router.get('/callcongress/call-senators/:state_id', callSenator);
router.post('/callcongress/call-senators/:state_id', callSenator);


function callSecondSenator(req, res) {
  models.Senator.findOne({
    where: {
      id: req.params.senator_id
    }
  }).then(
    (senator) => {
      const response = new twilio.twiml.VoiceResponse();
      response.say("Connecting you to " + senator.name + ". ");
      response.dial(senator.phone, {
        action: '/callcongress/goodbye/'
      });
      res.set('Content-Type', 'text/xml');
      return res.send(response.toString());
    }
  );
}

// Forward the caller to their second senator.
router.get('/callcongress/call-second-senator/:senator_id',  callSecondSenator);
router.post('/callcongress/call-second-senator/:senator_id',  callSecondSenator);


// Thank user & hang up.
router.post('/callcongress/goodbye', (req, res) => {
  const response = new twilio.twiml.VoiceResponse();
  response.say("Thank you for using Call Congress! " +
               "Your voice makes a difference. Goodbye.");
  response.hangup();
  res.set('Content-Type', 'text/xml');
  res.send(response.toString());
});

module.exports = router;
```

This code should look familiar to you. If we don't detect a fromState we utilize <Gather> as we <Say> a message that asks for the caller's zip code. This time we accept 5 digits (the length of a zip code) and trigger a state lookup by zip code.

## Connect the Caller to their First Senator

Now that we know our caller's state of residence, we can look up their senators and forward the call to the appropriate phone number.

Similar to the previous route, we <Say> a brief message to tell the caller that they're being connected to a senator. Then, we <Dial> the first senator, making sure to add an action that will route the caller back to our application when the first call ends.

```javascript
const models  = require('../models');
const express = require('express');
const router  = express.Router();
const twilio = require('twilio');

// Very basic route to landing page.
router.get('/', function (req, res) {
  res.render('index');
});


// Verify or collect State information.
router.post('/callcongress/welcome', (req, res) => {
  const response = new twilio.twiml.VoiceResponse();
  const fromState = req.body.FromState;

  if (fromState) {
    const gather = response.gather({
      numDigits: 1,
      action: '/callcongress/set-state',
      method: 'POST'
    });
    gather.say("Thank you for calling congress! It looks like " +
               "you're calling from " + fromState + "." +
               "If this is correct, please press 1. Press 2 if " +
               "this is not your current state of residence.");
  } else {
    const gather = response.gather({
      numDigits: 5,
      action: '/callcongress/state-lookup',
      method: 'POST'
    });
    gather.say('Thank you for calling Call Congress! If you wish to' +
               'call your senators, please enter your 5-digit zip code.');
  }
  res.set('Content-Type', 'text/xml');
  res.send(response.toString());
});


// Look up state from given zipcode.
//
// Once state is found, redirect to call_senators for forwarding.
router.post('/callcongress/state-lookup', (req, res) => {
  zipDigits = req.body.Digits;
  // NB: We don't do any error handling for a missing/erroneous zip code
  // in this sample application. You, gentle reader, should to handle that
  // edge case before deploying this code.
  models.ZipCode.findOne({where: { zipcode: zipDigits}}).get('state').then(
    (state) => {
      return models.State.findOne({where: {name: state}}).get('id').then(
        (stateId) => {
          return res.redirect('/callcongress/call-senators/' + stateId);
        }
      );
    }
  );
});


// If our state guess is wrong, prompt user for zip code.
router.get('/callcongress/collect-zip', (req, res) => {
  const response = new twilio.twiml.VoiceResponse();
  const gather = response.gather({
      numDigits: 5,
      action: '/callcongress/state-lookup',
      method: 'POST'
    });
  gather.say('If you wish to call your senators, please ' +
              'enter your 5-digit zip code.');
  res.set('Content-Type', 'text/xml');
  res.send(response.toString());
});


// Set state for senator call list.
//
// Set user's state from confirmation or user-provided Zip.
// Redirect to call_senators route.
router.post('/callcongress/set-state', (req, res) => {
  // Get the digit pressed by the user
  const digitsProvided = req.body.Digits;

  if (digitsProvided === '1') {
    const state = req.body.CallerState;
    models.State.findOne({where: {name: state}}).get('id').then(
      (stateId) => {
        return res.redirect('/callcongress/call-senators/' + stateId);
      }
    );
  } else {
    res.redirect('/callcongress/collect-zip')
  }
});


function callSenator(req, res) {
  models.State.findOne({
    where: {
      id: req.params.state_id
    }
  }).then(
    (state) => {
      return state.getSenators().then(
        (senators) => {
          const response = new twilio.twiml.VoiceResponse();
          response.say("Connecting you to " + senators[0].name + ". " +
           "After the senator's office ends the call, you will " +
           "be re-directed to " + senators[1].name + ".");
          response.dial(senators[0].phone, {
            action: '/callcongress/call-second-senator/' + senators[1].id
          });
          res.set('Content-Type', 'text/xml');
          return res.send(response.toString());
        }
      );
    }
  );
}

// Route for connecting caller to both of their senators.
router.get('/callcongress/call-senators/:state_id', callSenator);
router.post('/callcongress/call-senators/:state_id', callSenator);


function callSecondSenator(req, res) {
  models.Senator.findOne({
    where: {
      id: req.params.senator_id
    }
  }).then(
    (senator) => {
      const response = new twilio.twiml.VoiceResponse();
      response.say("Connecting you to " + senator.name + ". ");
      response.dial(senator.phone, {
        action: '/callcongress/goodbye/'
      });
      res.set('Content-Type', 'text/xml');
      return res.send(response.toString());
    }
  );
}

// Forward the caller to their second senator.
router.get('/callcongress/call-second-senator/:senator_id',  callSecondSenator);
router.post('/callcongress/call-second-senator/:senator_id',  callSecondSenator);


// Thank user & hang up.
router.post('/callcongress/goodbye', (req, res) => {
  const response = new twilio.twiml.VoiceResponse();
  response.say("Thank you for using Call Congress! " +
               "Your voice makes a difference. Goodbye.");
  response.hangup();
  res.set('Content-Type', 'text/xml');
  res.send(response.toString());
});

module.exports = router;
```

The action attribute is great for redirecting a call in progress and is the backbone of our call forwarding use case.

However, it's important to note that the action will only execute after the dialed party (in our case, the caller's senator) ends the call. Twilio will continue to forward the original caller but they must stay on the line throughout the entire process.

## Forward to the Next Senator and End the Call

Once the first senator ends the call with our user, the caller is forwarded to their second state senator. Just as we did in the previous route, we'll include an action attribute that redirects the caller to a final bit of TwiML.

```javascript
const models  = require('../models');
const express = require('express');
const router  = express.Router();
const twilio = require('twilio');

// Very basic route to landing page.
router.get('/', function (req, res) {
  res.render('index');
});


// Verify or collect State information.
router.post('/callcongress/welcome', (req, res) => {
  const response = new twilio.twiml.VoiceResponse();
  const fromState = req.body.FromState;

  if (fromState) {
    const gather = response.gather({
      numDigits: 1,
      action: '/callcongress/set-state',
      method: 'POST'
    });
    gather.say("Thank you for calling congress! It looks like " +
               "you're calling from " + fromState + "." +
               "If this is correct, please press 1. Press 2 if " +
               "this is not your current state of residence.");
  } else {
    const gather = response.gather({
      numDigits: 5,
      action: '/callcongress/state-lookup',
      method: 'POST'
    });
    gather.say('Thank you for calling Call Congress! If you wish to' +
               'call your senators, please enter your 5-digit zip code.');
  }
  res.set('Content-Type', 'text/xml');
  res.send(response.toString());
});


// Look up state from given zipcode.
//
// Once state is found, redirect to call_senators for forwarding.
router.post('/callcongress/state-lookup', (req, res) => {
  zipDigits = req.body.Digits;
  // NB: We don't do any error handling for a missing/erroneous zip code
  // in this sample application. You, gentle reader, should to handle that
  // edge case before deploying this code.
  models.ZipCode.findOne({where: { zipcode: zipDigits}}).get('state').then(
    (state) => {
      return models.State.findOne({where: {name: state}}).get('id').then(
        (stateId) => {
          return res.redirect('/callcongress/call-senators/' + stateId);
        }
      );
    }
  );
});


// If our state guess is wrong, prompt user for zip code.
router.get('/callcongress/collect-zip', (req, res) => {
  const response = new twilio.twiml.VoiceResponse();
  const gather = response.gather({
      numDigits: 5,
      action: '/callcongress/state-lookup',
      method: 'POST'
    });
  gather.say('If you wish to call your senators, please ' +
              'enter your 5-digit zip code.');
  res.set('Content-Type', 'text/xml');
  res.send(response.toString());
});


// Set state for senator call list.
//
// Set user's state from confirmation or user-provided Zip.
// Redirect to call_senators route.
router.post('/callcongress/set-state', (req, res) => {
  // Get the digit pressed by the user
  const digitsProvided = req.body.Digits;

  if (digitsProvided === '1') {
    const state = req.body.CallerState;
    models.State.findOne({where: {name: state}}).get('id').then(
      (stateId) => {
        return res.redirect('/callcongress/call-senators/' + stateId);
      }
    );
  } else {
    res.redirect('/callcongress/collect-zip')
  }
});


function callSenator(req, res) {
  models.State.findOne({
    where: {
      id: req.params.state_id
    }
  }).then(
    (state) => {
      return state.getSenators().then(
        (senators) => {
          const response = new twilio.twiml.VoiceResponse();
          response.say("Connecting you to " + senators[0].name + ". " +
           "After the senator's office ends the call, you will " +
           "be re-directed to " + senators[1].name + ".");
          response.dial(senators[0].phone, {
            action: '/callcongress/call-second-senator/' + senators[1].id
          });
          res.set('Content-Type', 'text/xml');
          return res.send(response.toString());
        }
      );
    }
  );
}

// Route for connecting caller to both of their senators.
router.get('/callcongress/call-senators/:state_id', callSenator);
router.post('/callcongress/call-senators/:state_id', callSenator);


function callSecondSenator(req, res) {
  models.Senator.findOne({
    where: {
      id: req.params.senator_id
    }
  }).then(
    (senator) => {
      const response = new twilio.twiml.VoiceResponse();
      response.say("Connecting you to " + senator.name + ". ");
      response.dial(senator.phone, {
        action: '/callcongress/goodbye/'
      });
      res.set('Content-Type', 'text/xml');
      return res.send(response.toString());
    }
  );
}

// Forward the caller to their second senator.
router.get('/callcongress/call-second-senator/:senator_id',  callSecondSenator);
router.post('/callcongress/call-second-senator/:senator_id',  callSecondSenator);


// Thank user & hang up.
router.post('/callcongress/goodbye', (req, res) => {
  const response = new twilio.twiml.VoiceResponse();
  response.say("Thank you for using Call Congress! " +
               "Your voice makes a difference. Goodbye.");
  response.hangup();
  res.set('Content-Type', 'text/xml');
  res.send(response.toString());
});

module.exports = router;
```

Once the call with the second senator ends our user will hear a short message thanking them for their call. We then end the call with <Hangup>.

## Where to Next?

That's it! You should be able to start your development server with ngrok, dial your Twilio number, and be routed to your senators!

But wait… this isn't actually your senator's phone number, remember? We seeded our sample application's database with some placeholder phone numbers with lightweight TwiML endpoints, so there's still some work to be done to flesh out this application before it's production-ready.

If your production case matches our demo's, ProPublica's API grants access to a wealth of government data, including senators' states and phone numbers. You may find yourself inspired to build out even more functionality for your civically engaged users.

Interested in building something even bigger? See how twilio.org is helping people use messaging, voice, and video to advance their causes by connecting people and resources around the world.

Whatever your use case, we hope you feel empowered to use what you've learned here to seamlessly forward your users' calls.

You might also enjoy these other tutorials:

**Click to Call with Node.js and Express**
Convert web traffic into phone calls with the click of a button.

**Warm Transfers with Node.js and Express**
Use Twilio powered warm transfers to help your agents dial in others in real time.

---

Did this help?

Thanks for checking out this tutorial. If you have any feedback to share with us, please reach out to us on Twitter and let us know what you're building!