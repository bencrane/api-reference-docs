# Gather User Input via Keypad (DTMF Tones) in Python

In this guide, we'll show you how to gather user input during a phone call through the phone's keypad (using DTMF tones) in your Python application. By applying this technique, you can create interactive voice response (IVR) systems and other phone based interfaces for your users.

The code snippets in this guide are written using the Flask web framework and the Twilio Python SDK. Let's get started!

## Set up your Flask application to receive incoming phone calls

This guide assumes you have already set up your web application to receive incoming phone calls. If you still need to complete this step, check out this guide. It should walk you through the process of buying a Twilio number and configuring your app to receive incoming calls.

## Collect user input with the <Gather> TwiML verb

The <Gather> TwiML verb allows us to collect input from the user during a phone call. Gathering user input through the keypad is a core mechanism of Interactive Voice Response (IVR) systems where users can press "1" to connect to one menu of options and press "2" to reach another. These prompts can be accompanied by voice prompts to the caller, using the TwiML <Say> and <Play> verbs. In this example, we will prompt the user to enter a number to connect to a certain department within our little IVR system.

### Use <Gather> to collect user input via the keypad (DTMF tones)

```python
from flask import Flask
from twilio.twiml.voice_response import VoiceResponse, Gather

app = Flask(__name__)


@app.route("/voice", methods=['GET', 'POST'])
def voice():
    """Respond to incoming phone calls with a menu of options"""
    # Start our TwiML response
    resp = VoiceResponse()

    # Start our <Gather> verb
    gather = Gather(num_digits=1)
    gather.say('For sales, press 1. For support, press 2.')
    resp.append(gather)

    # If the user doesn't select an option, redirect them into a loop
    resp.redirect('/voice')

    return str(resp)

if __name__ == "__main__":
    app.run(debug=True)
```

If the user doesn't enter any input after a configurable timeout, Twilio will continue processing the TwiML in the document to determine what should happen next in the call. When the end of the document is reached, Twilio will hang up the call. In the above example, we use the <Redirect> verb to have Twilio request the same URL again, repeating the prompt for the user

If a user were to enter input with the example above, the user would hear the same prompt over and over again regardless of what button you pressed. By default, if the user does enter input in the <Gather>, Twilio will send another HTTP request to the current webhook URL with a POST parameter containing the Digits entered by the user. In the sample above, we weren't handling this input at all. Let's update that logic to also process user input if it is present.

### Branch your call logic based on the digits sent by the user

```python
from flask import Flask, request
from twilio.twiml.voice_response import VoiceResponse, Gather

app = Flask(__name__)


@app.route("/voice", methods=['GET', 'POST'])
def voice():
    """Respond to incoming phone calls with a menu of options"""
    # Start our TwiML response
    resp = VoiceResponse()

    # If Twilio's request to our app included already gathered digits,
    # process them
    if 'Digits' in request.values:
        # Get which digit the caller chose
        choice = request.values['Digits']

        # <Say> a different message depending on the caller's choice
        if choice == '1':
            resp.say('You selected sales. Good for you!')
            return str(resp)
        elif choice == '2':
            resp.say('You need support. We will help!')
            return str(resp)
        else:
            # If the caller didn't choose 1 or 2, apologize and ask them again
            resp.say("Sorry, I don't understand that choice.")

    # Start our <Gather> verb
    gather = Gather(num_digits=1)
    gather.say('For sales, press 1. For support, press 2.')
    resp.append(gather)

    # If the user doesn't select an option, redirect them into a loop
    resp.redirect('/voice')

    return str(resp)

if __name__ == "__main__":
    app.run(debug=True)
```

## Specify an action to take after user input is collected

You may want to have an entirely different endpoint in your application handle the processing of user input. This is possible using the "action" attribute of the <Gather> verb. Let's update our example to add a second endpoint that will be responsible for handling user input.

### Add another route to handle the input from the user

```python
from flask import Flask, request
from twilio.twiml.voice_response import VoiceResponse, Gather

app = Flask(__name__)


@app.route("/voice", methods=['GET', 'POST'])
def voice():
    """Respond to incoming phone calls with a menu of options"""
    # Start our TwiML response
    resp = VoiceResponse()

    # Start our <Gather> verb
    gather = Gather(num_digits=1, action='/gather')
    gather.say('For sales, press 1. For support, press 2.')
    resp.append(gather)

    # If the user doesn't select an option, redirect them into a loop
    resp.redirect('/voice')

    return str(resp)


@app.route('/gather', methods=['GET', 'POST'])
def gather():
    """Processes results from the <Gather> prompt in /voice"""
    # Start our TwiML response
    resp = VoiceResponse()

    # If Twilio's request to our app included already gathered digits,
    # process them
    if 'Digits' in request.values:
        # Get which digit the caller chose
        choice = request.values['Digits']

        # <Say> a different message depending on the caller's choice
        if choice == '1':
            resp.say('You selected sales. Good for you!')
            return str(resp)
        elif choice == '2':
            resp.say('You need support. We will help!')
            return str(resp)
        else:
            # If the caller didn't choose 1 or 2, apologize and ask them again
            resp.say("Sorry, I don't understand that choice.")

    # If the user didn't choose 1 or 2 (or anything), send them back to /voice
    resp.redirect('/voice')

    return str(resp)

if __name__ == "__main__":
    app.run(debug=True)
```

The action attribute takes a relative URL which would point to another route your server is capable of handling. Now, instead of conditional logic in a single route, we use actions and redirects to handle our call logic with separate code paths.

## Where to next?

If you're building call center type applications in Python, you might enjoy our IVR Phone Tree (Flask) tutorial, which implements a full sample application using these techniques.

## Need some help?

We all do sometimes; code is hard. Get help now from our support team, or lean on the wisdom of the crowd by browsing the Twilio tag on Stack Overflow.

---

Terms of service
Privacy Policy
Copyright © 2026 Twilio Inc.