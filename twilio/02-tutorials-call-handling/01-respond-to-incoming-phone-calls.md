# Respond to Incoming Phone Calls in Python

In this guide, we'll show you how to use **Programmable Voice** to respond to incoming phone calls in your Python web application. Code on your server can decide what a caller hears when they dial the number you've bought or ported to Twilio.

The code snippets in this guide are written using the Flask web framework and the Twilio Python SDK. Let's get started!

## Respond to incoming calls in your web application

Incoming call flow with Twilio, showing HTTP request and response between phone and app.

When a Twilio phone number receives an incoming call, Twilio will send an HTTP request to your web application, asking for instructions on how to handle the call. Your web application will respond with an XML document containing TwiML. That TwiML contains the instruction that Twilio will follow to say some arbitrary text, play an MP3 file, make a recording and much more.

To start answering phone calls, you must:

- Buy and configure a Twilio-powered phone number capable of making and receiving phone calls, and point it at your web application
- Write web application code to tell Twilio how to handle the incoming call using TwiML
- Make your web application accessible on the Internet so Twilio can send you a webhook request when you receive a call

> **Warning**
> If you are sending SMS messages to the U.S. or Canada, before proceeding further, be aware of updated restrictions on the use of Toll-Free numbers for messaging, including TF numbers obtained by purchasing them. These restrictions do not apply to Voice or other uses outside of SMS messaging. See this support article for details.

## Buy and configure a phone number

In the Twilio Console, you can search for and buy phone numbers in countries around the world. Numbers that have the Voice capability can make and receive voice phone calls from just about anywhere on the planet.

Search results for voice-capable local numbers in area code 651 with pricing and buy options.

Once you purchase a number, you'll need to configure that number to send a request to your web application. This callback mechanism is called a webhook. This can be done in the number's configuration page.

Voice settings with webhook URL for incoming calls and call status changes.

## What is a Webhook?

Webhooks are user-defined HTTP callbacks. They are usually triggered by some event, such as receiving an SMS message or an incoming phone call. When that event occurs, Twilio makes an HTTP request (usually a POST or a GET) to the URL configured for the webhook.

To handle a webhook, you only need to build a small web application that can accept the HTTP requests. Almost all server-side programming languages offer some framework for you to do this. Examples across languages include ASP.NET MVC for C#, Servlets and Spark for Java, Express for Node.js, Django and Flask for Python, and Rails and Sinatra for Ruby. PHP has its own web app framework built in, although frameworks like Laravel, Symfony and Yii are also popular.

Whichever framework and language you choose, webhooks function the same for every Twilio application. They will make an HTTP request to a URI that you provide to Twilio. Your application performs whatever logic you feel necessary - read/write from a database, integrate with another API or perform some computation - then replies to Twilio with a TwiML response with the instructions you want Twilio to perform.

## What is TwiML?

TwiML is the Twilio Markup Language, which is just to say that it's an XML document with special tags defined by Twilio to help you build your SMS and voice applications. TwiML is easier shown than explained. Here's some TwiML you might use to respond to an incoming phone call:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>Thanks for calling!</Say>
</Response>
```

And here's some TwiML you might use to respond to an incoming SMS message:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>We got your message, thank you!</Message>
</Response>
```

Every TwiML document will have the root <Response> element and within that can contain one or more verbs. Verbs are actions you'd like Twilio to take, such as <Say> a greeting to a caller, or send an SMS <Message> in reply to an incoming message. For a full reference on everything you can do with TwiML, refer to our TwiML API Reference.

## Write Python to Handle the Incoming Phone Call

Now comes the fun part - writing code that will handle an incoming HTTP request from Twilio! Our code will dictate what happens when our phone number receives a call by responding with TwiML.

### Respond to an incoming call with TwiML

```python
from flask import Flask
from twilio.twiml.voice_response import VoiceResponse

app = Flask(__name__)


@app.route("/voice", methods=['GET', 'POST'])
def voice():
    """Respond to incoming phone calls with a 'Hello world' message"""
    # Start our TwiML response
    resp = VoiceResponse()

    # Read a message aloud to the caller
    resp.say("Hello world!")

    return str(resp)

if __name__ == "__main__":
    app.run(debug=True)
```

### The TwiML generated by our server code

The SDKs help you generate an XML string that looks like this.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Hello world!</Say>
</Response>
```

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

## Create Python responses to incoming calls

In the example above, we returned pre-defined TwiML in response to the incoming call. The real power of using webhooks like this is executing dynamic code (based on the information Twilio sends to your application) to change what you present to the user on the other end of the phone call. You could query your database, reference a customer's phone number in your CRM, or execute any kind of custom logic before determining how to respond to your user.

### Create a dynamic response to an incoming call

```python
from flask import Flask, request
from twilio.twiml.voice_response import VoiceResponse

app = Flask(__name__)


@app.route("/voice", methods=['GET', 'POST'])
def voice():
    """Respond to incoming phone calls and mention the caller's city"""
    # Get the caller's city from Twilio's request to our app
    city = request.values['FromCity']

    # Start our TwiML response
    resp = VoiceResponse()

    # Read a message aloud to the caller
    resp.say('Never gonna give you up, {}!'.format(city))

    # Play an audio file for the caller
    resp.play('https://demo.twilio.com/docs/classic.mp3')

    return str(resp)

if __name__ == "__main__":
    app.run(debug=True)
```

> **Warning: Protect your webhooks**
> Twilio supports HTTP Basic and Digest Authentication. Authentication allows you to password protect your TwiML URLs on your web server so that only you and Twilio can access them.
>
> Learn more here, and check out our guide to securing your Flask application by validating incoming Twilio requests.

## Where to next?

If this guide was helpful, you might also want to check out these guides for Programmable Voice and Node.js.

- Create Conference Calls in Python
- Record Phone Calls in Python
- Gather User Input via Keypad (DTMF Tones) in Python

Happy hacking!

## Need some help?

We all do sometimes; code is hard. Get help now from our support team, or lean on the wisdom of the crowd by browsing the Twilio tag on Stack Overflow.

---

Terms of service
Privacy Policy
Copyright © 2026 Twilio Inc.