# SMS and MMS Notifications with Python and Django

**Tags:** Python
**Products:** Messaging
**Time to read:** 7 minutes
**Published:** January 10, 2017

**Written by:** Kevin Whinnery (Twilion)
**Reviewed by:** Paul Kamp (Twilion), Stephanie Marchante (Twilion), Samuel Mendes (Contributor), Kat King (Twilion), David Prothero (Twilion), Andrew T. Baker (Twilion)

---

Wish your server would alert you automatically if something goes wrong? Well, this application has got your number - we're going to look at how to use Twilio to send server pages from Python and Django.

Get started by cloning our sample application from here. Next, head to the application's README.md to see how to run the application locally.

Let's get started! Click the button below to move to the next step of the tutorial.

## Listing Our Server Administrators

Surely you've got a list of people who should be alerted if something goes wrong. Create that list, as shown in the example JSON in this code snippet.

The only essential piece of data you'll need is a phone_number for each administrator.

```json
{
    "phone_number": "+15556667777"
}
```

Excellent work. List in hand, let's configure a Twilio REST Client to send notifications if (well, when...) something goes wrong.

## Configuring the Twilio Client

To send a message we'll need to create a Twilio REST client. It will require reading a TWILIO_NUMBER plus our TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN from environment variables.

The values for your Account SID and Auth Token will come from the Twilio console.

Click the eyeball icon to expose your Auth Token in an easy copy/pastable form.

Phone numbers will be in the hash ('#') phone number pane. You will have to use a purchased number for the TWILIO_NUMBER variable.

Setting the environment variables is platform dependent. The link above will explain how to set variables in Windows, Mac OSX, and *NIX (but may vary depending on your choice of shell). If you are using a Platform as a Service (PaaS) solution such as Heroku, you may set them from the console. Check your platform's documentation if you need help.

```python
import json
import logging
import os

from django.conf import settings
from django.core.exceptions import ImproperlyConfigured
from dotenv import load_dotenv
from twilio.rest import Client

logger = logging.getLogger(__name__)

dotenv_path = settings.PROJECT_PATH / '.env'
logger.debug(f'Reading .env file at: {dotenv_path}')
load_dotenv(dotenv_path=dotenv_path)


MESSAGE = """[This is a test] ALERT! It appears the server is having issues.
Exception: {0}"""

NOT_CONFIGURED_MESSAGE = (
    "Required enviroment variables "
    "TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN or TWILIO_NUMBER missing."
)


def load_admins_file():
    admins_json_path = settings.PROJECT_PATH / 'config' / 'administrators.json'
    logger.debug(f'Loading administrators info from: {admins_json_path}')
    return json.loads(admins_json_path.read_text())


def load_twilio_config():
    logger.debug('Loading Twilio configuration')

    twilio_account_sid = os.getenv('TWILIO_ACCOUNT_SID')
    twilio_auth_token = os.getenv('TWILIO_AUTH_TOKEN')
    twilio_number = os.getenv('TWILIO_NUMBER')

    if not all([twilio_account_sid, twilio_auth_token, twilio_number]):
        raise ImproperlyConfigured(NOT_CONFIGURED_MESSAGE)

    return (twilio_number, twilio_account_sid, twilio_auth_token)


class MessageClient:
    def __init__(self):
        logger.debug('Initializing messaging client')

        (
            twilio_number,
            twilio_account_sid,
            twilio_auth_token,
        ) = load_twilio_config()

        self.twilio_number = twilio_number
        self.twilio_client = Client(twilio_account_sid, twilio_auth_token)

        logger.debug('Twilio client initialized')

    def send_message(self, body, to):
        self.twilio_client.messages.create(
            body=body,
            to=to,
            from_=self.twilio_number,
            # media_url=['https://demo.twilio.com/owl.png']
        )


class TwilioNotificationsMiddleware:
    def __init__(self, get_response):
        logger.debug('Initializing Twilio notifications middleware')

        self.administrators = load_admins_file()
        self.client = MessageClient()
        self.get_response = get_response

        logger.debug('Twilio notifications middleware initialized')

    def __call__(self, request):
        return self.get_response(request)

    def process_exception(self, request, exception):
        message_to_send = MESSAGE.format(exception)

        for admin in self.administrators:
            self.client.send_message(message_to_send, admin['phone_number'])

        logger.info('Administrators notified!')
        return None
```

Now that we have what we need for our Twilio REST Client, let's look at how to handle exceptions.

## Notifying Based on Exceptions in the Application

We will implement error handling and message delivery as a piece of Django middleware, and make all the Twilio API calls from there.

Note that it's important to return None so default Django exception handling can run.

With exceptions now wired to notify the folks who can help, let's zoom in on each step of sending these alert messages.

## Creating a Custom SMS or MMS Alert Message

Here we demonstrate crafting the perfect alert message for an exception. (You know, either that or a terse message with some boilerplate exception text.)

You might also decide to include a picture with your alert message... maybe a screenshot of the crashing application or some variation of an 'Everything is Fine!' meme?

Your alert message is going to go over well, we can already tell. Next, let's look at the steps to follow to send it out to the whole list of administrators.

## Triggering Notifications for Administrators

Next, we send alert messages to each administrator with the send_message method that was defined in the MessageClient class.

Now, let's see how we send the messages themselves.

## Sending a Text Message

There are three parameters needed to send an SMS using the Twilio REST API: `from_`, `to`, and `body`.

US and Canadian phone numbers can also send an image with the message as an MMS (uncomment media_url). The rest of the world will have image links with automatically shortened links.

## That's a wrap!

We've just implemented an automated server notification system that automatically alerts the server administrators when something goes awry.

## Where to Next?

Like Python? Twilio does too! Here are some other tutorials that might pique your interest:

### Call Tracking

Call Tracking helps you easily measure the effectiveness of different marketing campaigns. By assigning a unique phone number to different advertisements you're got running, you can track which ones have the best call rates (and get some data about the callers, to boot).

### Appointment Reminders

Want to decrease the number of missed appointments at your business? Appointment reminders allow you to automate the process of reaching out to your customers in advance.

---

Thanks for checking out this tutorial! Tweet us @twilio to let us know how you did... and let us know what you're building next!
