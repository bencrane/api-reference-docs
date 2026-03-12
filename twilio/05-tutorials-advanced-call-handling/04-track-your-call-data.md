# Call Tracking with Node.js and Express

**Tags:** JavaScript

**Products:** Voice API

**Time to read:** 8 minutes

**January 10, 2017**

**Written by:** Mario Celi (Contributor)

**Reviewed by:** Paul Kamp (Twilion), Brianna DelValle (Twilion), Kat King (Twilion), David Prothero (Twilion), Jose Oliveros (Contributor), Andrew T. Baker (Twilion)

---

This Express.js web application shows how you can use Twilio to track the effectiveness of different marketing channels.

This application has three main features:

- It purchases phone numbers from Twilio to use in different marketing campaigns (like a billboard or a bus advertisement)
- It forwards incoming calls for those phone numbers to a salesperson
- It displays charts showing data about the phone numbers and the calls they receive

In this tutorial, we'll point out the key bits of code that make this application work. Check out the project README on GitHub to see how to run the code yourself.

## Search for available phone numbers

Call tracking requires us to search for and buy phone numbers on demand, associating a specific phone number with a lead source. From the dashboard, the user can search for new numbers, optionally filtering by area code. This code uses the Twilio Node.js helper library.

*Editor: this is a migrated tutorial. Find the original at https://github.com/TwilioDevEd/call-tracking-node/*

```javascript
var twilio = require('twilio');
var config = require('../config');

var client = twilio(config.apiKey, config.apiSecret, { accountSid: config.accountSid });

exports.index = function(request, response) {

  var areaCode = request.query.areaCode;

  client.availablePhoneNumbers('US').local.list({
    areaCode: areaCode
  }).then(function(availableNumbers) {
    response.render('availableNumbers', {
      availableNumbers: availableNumbers
    });
  }).catch(function(failureToFetchNumbers) {
    console.log('Failed to fetch numbers from API');
    console.log('Error was:');
    console.log(failureToFetchNumbers);
    response.status(500).send('Could not contact Twilio API');
  });
};
```

Now let's see how we will display these numbers for the user to purchase them and enable their campaigns.

## Display available phone numbers

After a user searches for phone numbers from the dashboard, we display a list of numbers that are currently available for purchase. Submitting one of the forms generated for a number will buy that phone number.

```text
extends layout

block content
  .row
    .col-lg-4
      table.table
        thead
          tr
            th Phone number
            th State
            th
        tbody
          each number in availableNumbers
            tr
              td= number.friendlyName
              td= number.region
              td
                form(name='purchaseNumber', action='/lead-source', method='POST')
                  input(type='hidden', name='phoneNumber', value="#{number.phoneNumber}")
                  input(type='hidden', name='_csrf', value="#{csrftoken}")
                  input(type='submit', value='Purchase').btn.btn-sm.btn-primary
```

We've seen how we can display available phone numbers for purchase with the help of the Twilio C# helper library. Now let's look at how we can buy an available phone number.

## Buy a phone number

The create function for the LeadSource resource expects a phone number as a parameter, and purchases a number through Twilio's API on behalf of this application's user. It enables the caller ID feature and associates the number with the current TwiML app SID. It immediately redirects the user so she can add a forwarding number and a description for the lead source.

```javascript
var twilio = require('twilio');
var config = require('../config');
var LeadSource = require('../models/LeadSource');

var client = twilio(config.apiKey, config.apiSecret, { accountSid: config.accountSid });

exports.create = function(request, response) {
  var phoneNumberToPurchase = request.body.phoneNumber;

  client.incomingPhoneNumbers.create({
    phoneNumber: phoneNumberToPurchase,
    voiceCallerIdLookup: 'true',
    voiceApplicationSid: config.appSid
  }).then(function(purchasedNumber) {
    var leadSource = new LeadSource({number: purchasedNumber.phoneNumber});
    return leadSource.save();
  }).then(function(savedLeadSource) {
    console.log('Saving lead source');
    response.redirect(303, '/lead-source/' + savedLeadSource._id + '/edit');
  }).catch(function(numberPurchaseFailure) {
    console.log('Could not purchase a number for lead source:');
    console.log(numberPurchaseFailure);
    response.status(500).send('Could not contact Twilio API');
  });
};

exports.edit = function(request, response) {
  var leadSourceId = request.params.id;
  LeadSource.findOne({_id: leadSourceId}).then(function(foundLeadSource) {
    return response.render('editLeadSource', {
      leadSourceId: foundLeadSource._id,
      leadSourcePhoneNumber: foundLeadSource.number,
      leadSourceForwardingNumber: foundLeadSource.forwardingNumber,
      leadSourceDescription: foundLeadSource.description,
      messages: request.flash('error')
    });
  }).catch(function() {
    return response.status(404).send('No such lead source');
  });
};

exports.update = function(request, response) {
  var leadSourceId = request.params.id;

  request.checkBody('description', 'Description cannot be empty').notEmpty();
  request.checkBody('forwardingNumber', 'Forwarding number cannot be empty')
    .notEmpty();

  if (request.validationErrors()) {
    request.flash('error', request.validationErrors());
    return response.redirect(303, '/lead-source/' + leadSourceId + '/edit');
  }

  LeadSource.findOne({_id: leadSourceId}).then(function(foundLeadSource) {
    foundLeadSource.description = request.body.description;
    foundLeadSource.forwardingNumber = request.body.forwardingNumber;

    return foundLeadSource.save();
  }).then(function(savedLeadSource) {
    return response.redirect(303, '/dashboard');
  }).catch(function(error) {
    return response.status(500).send('Could not save the lead source');
  });
};
```

If you don't know where you can get this application SID, don't panic, the next step will show you how.

## Set webhook URLs in a TwiML Application

When we purchase a phone number, we specify a voice application SID. This is an identifier for a TwiML application, which you can create through the REST API or your Twilio Console.

Create TwiML App

## Associate a phone number with a lead source

Once we have bought a number we display a form so the user can add a forwarding number and a description for this number. From now on, any call to this number will be attributed to this source. All phone numbers should be in E.164 format.

```javascript
var twilio = require('twilio');
var config = require('../config');
var LeadSource = require('../models/LeadSource');

var client = twilio(config.apiKey, config.apiSecret, { accountSid: config.accountSid });

exports.create = function(request, response) {
  var phoneNumberToPurchase = request.body.phoneNumber;

  client.incomingPhoneNumbers.create({
    phoneNumber: phoneNumberToPurchase,
    voiceCallerIdLookup: 'true',
    voiceApplicationSid: config.appSid
  }).then(function(purchasedNumber) {
    var leadSource = new LeadSource({number: purchasedNumber.phoneNumber});
    return leadSource.save();
  }).then(function(savedLeadSource) {
    console.log('Saving lead source');
    response.redirect(303, '/lead-source/' + savedLeadSource._id + '/edit');
  }).catch(function(numberPurchaseFailure) {
    console.log('Could not purchase a number for lead source:');
    console.log(numberPurchaseFailure);
    response.status(500).send('Could not contact Twilio API');
  });
};

exports.edit = function(request, response) {
  var leadSourceId = request.params.id;
  LeadSource.findOne({_id: leadSourceId}).then(function(foundLeadSource) {
    return response.render('editLeadSource', {
      leadSourceId: foundLeadSource._id,
      leadSourcePhoneNumber: foundLeadSource.number,
      leadSourceForwardingNumber: foundLeadSource.forwardingNumber,
      leadSourceDescription: foundLeadSource.description,
      messages: request.flash('error')
    });
  }).catch(function() {
    return response.status(404).send('No such lead source');
  });
};

exports.update = function(request, response) {
  var leadSourceId = request.params.id;

  request.checkBody('description', 'Description cannot be empty').notEmpty();
  request.checkBody('forwardingNumber', 'Forwarding number cannot be empty')
    .notEmpty();

  if (request.validationErrors()) {
    request.flash('error', request.validationErrors());
    return response.redirect(303, '/lead-source/' + leadSourceId + '/edit');
  }

  LeadSource.findOne({_id: leadSourceId}).then(function(foundLeadSource) {
    foundLeadSource.description = request.body.description;
    foundLeadSource.forwardingNumber = request.body.forwardingNumber;

    return foundLeadSource.save();
  }).then(function(savedLeadSource) {
    return response.redirect(303, '/dashboard');
  }).catch(function(error) {
    return response.status(500).send('Could not save the lead source');
  });
};
```

So far our method for creating a Lead Source and associating a Twilio phone number with it is pretty straightforward. Now let's have a closer look at our Lead Source model which will store this information.

## The LeadSource model

This is the model that contains the information provided in the form from the previous step. The LeadSource model associates a Twilio number to a named lead source (like "Wall Street Journal Ad" or "Dancing guy with sign"). It also tracks a phone number to which we'd like all the calls redirected, like your sales or support help line.

```javascript
var mongoose = require('mongoose');

var LeadSourceSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  forwardingNumber: {
    type: String,
    required: false
  }
});

delete mongoose.models.LeadSource

// Create a Mongoose model from our schema
var LeadSource = mongoose.model('LeadSource', LeadSourceSchema);

// export model as our module interface
module.exports = LeadSource;
```

As the application will be collecting leads and associating them to each LeadSource or campaign, it is necessary to have a Lead model as well to keep track of each Lead as it comes in and associate it to the LeadSource.

## The Lead model

A Lead represents a phone call generated by a LeadSource. Each time somebody calls a phone number associated with a LeadSource, we'll use the Lead model to record some of the data Twilio gives us about their call.

```javascript
var mongoose = require('mongoose');

var LeadSchema = new mongoose.Schema({
  callerNumber: {
    type: String,
    required: true
  },
  callSid: {
    type: String,
    required: true
  },
  leadSource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LeadSource'
  },
  city: {
    type: String,
    required: false
  },
  state: {
    type: String,
    required: false
  },
  callerName: {
    type: String,
    required: false
  }
});

delete mongoose.models.Lead

// Create a Mongoose model from our schema
var Lead = mongoose.model('Lead', LeadSchema);

// export model as our module interface
module.exports = Lead;
```

The backend part of the code which creates a LeadSource as well as a Twilio Number is complete. The next part of the application will be the webhooks that will handle incoming calls and forward them to the appropriate sales team member. Let's us see the way these webhooks are built.

## Forward calls and create leads

Whenever a customer calls one of our Twilio numbers, Twilio will send a POST request to the URL associated with this view function (should be /lead).

We use the incoming call data to create a new Lead for a LeadSource, then return TwiML that connects our caller with the forwarding_number of our LeadSource.

```javascript
var VoiceResponse = require('twilio').twiml.VoiceResponse;
var _ = require('underscore');

var LeadSource = require('../models/LeadSource');
var Lead = require('../models/Lead');
var config = require('../config');

exports.create = function(request, response) {
  var leadSourceNumber = request.body.To;

  LeadSource.findOne({
    number: leadSourceNumber
  }).then(function(foundLeadSource) {
    var twiml = new VoiceResponse();
    twiml.dial(foundLeadSource.forwardingNumber);

    var newLead = new Lead({
      callerNumber: request.body.From,
      callSid: request.body.CallSid,
      leadSource: foundLeadSource._id,
      city: request.body.FromCity,
      state: request.body.FromState,
      callerName: request.body.CallerName
    });
    return newLead.save()
    .then(function() {
      response.send(twiml.toString());
    });
  }).catch(function(err) {
    console.log('Failed to forward call:');
    console.log(err);
  });
};

exports.leadsByLeadSource = function(request, response) {
  Lead.find()
    .populate('leadSource')
    .then(function(existingLeads) {
      var statsByLeadSource = _.countBy(existingLeads, function(lead) {
          return lead.leadSource.description;
      });

      response.send(statsByLeadSource);
    });
};

exports.leadsByCity = function(request, response) {
  Lead.find().then(function(existingLeads) {
    var statsByCity = _.countBy(existingLeads, 'city');
    response.send(statsByCity);
  });
};
```

Once we have forwarded calls and created leads, we will have a lot of incoming calls that will create leads, and that will be data for us but we need to transform that data into information in order to get benefits from it. So, let's see how we get statistics from these sources on the next step.

## Get statistics about our lead sources

One useful statistic we can get from our data is how many calls each LeadSource has received. We might also want to know the cities the leads are coming from. For this we define two functions which will be mapped to routes the front-end can call.

```javascript
var VoiceResponse = require('twilio').twiml.VoiceResponse;
var _ = require('underscore');

var LeadSource = require('../models/LeadSource');
var Lead = require('../models/Lead');
var config = require('../config');

exports.create = function(request, response) {
  var leadSourceNumber = request.body.To;

  LeadSource.findOne({
    number: leadSourceNumber
  }).then(function(foundLeadSource) {
    var twiml = new VoiceResponse();
    twiml.dial(foundLeadSource.forwardingNumber);

    var newLead = new Lead({
      callerNumber: request.body.From,
      callSid: request.body.CallSid,
      leadSource: foundLeadSource._id,
      city: request.body.FromCity,
      state: request.body.FromState,
      callerName: request.body.CallerName
    });
    return newLead.save()
    .then(function() {
      response.send(twiml.toString());
    });
  }).catch(function(err) {
    console.log('Failed to forward call:');
    console.log(err);
  });
};

exports.leadsByLeadSource = function(request, response) {
  Lead.find()
    .populate('leadSource')
    .then(function(existingLeads) {
      var statsByLeadSource = _.countBy(existingLeads, function(lead) {
          return lead.leadSource.description;
      });

      response.send(statsByLeadSource);
    });
};

exports.leadsByCity = function(request, response) {
  Lead.find().then(function(existingLeads) {
    var statsByCity = _.countBy(existingLeads, 'city');
    response.send(statsByCity);
  });
};
```

Up until this point, we have been focusing on the backend code to our application. Which is ready to start handling incoming calls or leads. Next, let's turn our attention to the client side. Which, in this case, is a simple Javascript application, along with Chart.js which will render these stats in an appropriate way.

## Visualize our statistics with Chart.js

Back on the home page, we fetch call tracking statistics in JSON from the server using jQuery. We display the stats in colorful pie charts we create with Chart.js. We also use some utility functions from Underscore.js to munge the data from our back-end.

```javascript
$.getJSON('/lead/summary-by-lead-source', function(results) {
  results = _.map(_.zip(_.keys(results), _.values(results)), function(value) {
    return {
      description: value[0], 
      lead_count: value[1]
    };
  });

  summaryByLeadSourceData = _.map(results, function(leadSourceDataPoint) {
    return {
      value: leadSourceDataPoint.lead_count,
      color: 'hsl(' + (180 * leadSourceDataPoint.lead_count/ results.length) 
        + ', 100%, 50%)',
      label: leadSourceDataPoint.description
    };
  });

  var byLeadSourceContext = $("#pie-by-lead-source").get(0).getContext("2d");
  var byLeadSourceChart = 
    new Chart(byLeadSourceContext).Pie(summaryByLeadSourceData);
});

$.getJSON('/lead/summary-by-city', function(results) {
  results = _.map(_.zip(_.keys(results), _.values(results)), function(value) {
    return {
      city: value[0], 
      lead_count: value[1]
    };
  });

  summaryByCityData = _.map(results, function(cityDataPoint) {
    return {
      value: cityDataPoint.lead_count,
      color: 'hsl(' + (180 * cityDataPoint.lead_count/ results.length) 
        + ', 100%, 50%)',
      label: cityDataPoint.city
    };
  });

  var byCityContext = $("#pie-by-city").get(0).getContext("2d");
  var byCityChart = new Chart(byCityContext).Pie(summaryByCityData);
});
```

That's it! Our Node.js application is now ready to purchase new phone numbers, forward incoming calls, and record some statistics for our business.

## Where to next?

That's it! Our Express.js application is now ready to purchase new phone numbers, forward incoming calls, and record some statistics for our business.

If you're a Node.js developer working with Twilio, you might also enjoy these tutorials:

**Click-To-Call (Node.js)**
Put a button on your web page that connects visitors to live support or sales people via telephone.

**Two Factor Authentication with Authy (Node.js)**
Learn to implement account verification in your web app with Twilio-powered Authy.

---

Did this help?

Thanks for checking this tutorial out! If you have any feedback to share with us please contact us on Twitter, we'd love to hear it.