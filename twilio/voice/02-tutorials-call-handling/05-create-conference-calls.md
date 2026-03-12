# Create Conference Calls in Python

In this guide we'll show you how to use Programmable Voice to create and manage conference calls with your Python web application. We'll also cover how to monitor your conference and its participants during the call.

Ready? Let's get started.

## A conference call

An XML response for a conference call with TwiML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Conference>My conference</Conference>
  </Dial>
</Response>
```

## Using TwiML Bin

A handy tool we provide to host static TwiML from the Twilio Console is called TwiML Bin.

Just go to the TwiML Bin page in the Developer Center and click the plus button to create a new TwiML Bin. You can then add any static TwiML you want to host. Here's an example:

Twilio TwiML Bin showing XML for a simple conference call setup.

Click "Save" and your TwiML Bin is ready to use with any of your Twilio phone numbers.

With our TwiML created and placed in a TwiMLBin, let's configure a phone number with it.

> **Warning**
> If you are sending SMS messages to the U.S. or Canada, before proceeding further, be aware of updated restrictions on the use of Toll-Free numbers for messaging, including TF numbers obtained by purchasing them. These restrictions do not apply to Voice or other uses outside of SMS messaging. See this support article for details.

## Buy and configure a phone number

In the Twilio Console, you can search for and buy phone numbers in countries around the world. Numbers that have the Voice capability can make and receive voice phone calls from just about anywhere on the planet.

Search results for voice-capable local numbers in area code 651 with pricing and buy options.

Once you purchase a number, you'll need to configure that number to send a request to your web application. This callback mechanism is called a webhook. This can be done in the number's configuration page.

Voice settings with webhook URL for incoming calls and call status changes.

Now give your number a call. You'll hear hold music when you first join — call in from another phone number and the conference call will begin.

TwiML Bins are great for setting up conference call lines, but with the power of Python we can do so much more. Let's see how.

## Set up your web application

Incoming call flow with Twilio, showing HTTP request and response between phone and app.

When a phone number you have bought through Twilio receives an incoming call, Twilio will send an HTTP request to your web application asking for instructions on how to handle the call. Your server will respond with an XML document containing TwiML that instructs Twilio on what to do with the call. Those instructions can direct Twilio to read out a message, play an MP3 file, make a recording and much more.

To start answering phone calls, you must:

- Buy and configure a Twilio-powered phone number capable of making and receiving phone calls, and point it at your web application
- Write a web application to tell Twilio how to handle the incoming call using TwiML
- Make your web application accessible on the Internet so Twilio can make an HTTP request when you receive a call

## Dynamic conference calls with moderators

Now comes the fun part - writing code that will handle an incoming HTTP request from Twilio!

In this example we'll use the Flask web framework to respond to Twilio's request and we'll use the Twilio Python SDK to generate our TwiML.

### Create a moderated conference call

```python
"""Demonstration of setting up a conference call in Flask with Twilio."""
from flask import Flask, request
from twilio.twiml.voice_response import VoiceResponse, Dial

app = Flask(__name__)

# Update with your own phone number in E.164 format
MODERATOR = '+18005551212'


@app.route("/voice", methods=['GET', 'POST'])
def call():
    """Return TwiML for a moderated conference call."""
    # Start our TwiML response
    response = VoiceResponse()

    # Start with a <Dial> verb
    with Dial() as dial:
        # If the caller is our MODERATOR, then start the conference when they
        # join and end the conference when they leave
        if request.values.get('From') == MODERATOR:
            dial.conference(
                'My conference',
                start_conference_on_enter=True,
                end_conference_on_exit=True)
        else:
            # Otherwise have the caller join as a regular participant
            dial.conference('My conference', start_conference_on_enter=False)

    response.append(dial)
    return str(response)

if __name__ == "__main__":
    app.run(debug=True)
```

In this example we use a couple advanced <Conference> features to allow one participant, our "moderator," to better control the call:

- startConferenceOnEnter will keep all other callers on hold until the moderator joins
- endConferenceOnExit will cause Twilio to end the call for everyone as soon as the moderator leaves

We use the "From" argument on Twilio's webhook request to identify whether the current caller should be the moderator or just a regular participant.

In order for the webhooks in this code sample to work, Twilio must be able to send your web application an HTTP request over the Internet. Of course, that means your application needs to have a URL or IP address that Twilio can reach.

In production you probably have a public URL, but you probably don't during development. That's where ngrok comes in. ngrok gives you a public URL for a local port on your development machine, which you can use to configure your Twilio webhooks as described above.

Once ngrok is installed, you can use it at the command line to create a tunnel to whatever port your web application is running on. For example, this will create a public URL for a web application listening on port 3000.

```
ngrok http 3000
```

After executing that command, you will see that ngrok has given your application a public URL that you can use in your webhook configuration in the Twilio console.

Ngrok session status online with forwarding URLs to localhost:5000.

Grab your ngrok public URL and head back to the phone number you configured earlier. Now let's switch it from using a TwiML Bin to use your new ngrok URL. Don't forget to append the URL path to your actual TwiML logic! ("http://<your ngrok subdomain>.ngrok.io/voice" for example)

Voice settings with webhook URL for incoming calls and call status changes.

You're now ready to host dynamic conference calls with your Flask app. Grab some friends and give it a try!

## Where to next?

We just scratched the surface of what you can do with conference calls and your Python application. Check out the full <Conference> reference documentation to learn about things like:

- Muting participants
- Recording conferences
- Using status callbacks to get notified when callers enter and leave the conference