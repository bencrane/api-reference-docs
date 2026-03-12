# Secure your Django project by validating incoming Twilio requests

In this guide we'll cover how to secure your Django application by validating incoming requests to your Twilio webhooks are, in fact, from Twilio.

With a few lines of code, we'll write a custom decorator for our Django project that uses the Twilio Python SDK's validator utility. We can then use that decorator on our Django views which accept Twilio webhooks to confirm that incoming requests genuinely originated from Twilio.

Let's get started!

## Create a custom decorator

The Twilio Python SDK includes a RequestValidator class we can use to validate incoming requests.

We could include our request validation code as part of our Django views, but this is a perfect opportunity to write a Python decorator. This way we can reuse our validation logic across all our views which accept incoming requests from Twilio.

### Custom decorator for Django projects to validate Twilio requests

Confirm incoming requests to your Django views are genuine with this custom decorator.

```python
from django.http import HttpResponse, HttpResponseForbidden
from functools import wraps
from twilio import twiml
from twilio.request_validator import RequestValidator

import os


def validate_twilio_request(f):
    """Validates that incoming requests genuinely originated from Twilio"""
    @wraps(f)
    def decorated_function(request, *args, **kwargs):
        # Create an instance of the RequestValidator class
        validator = RequestValidator(os.environ.get('TWILIO_AUTH_TOKEN'))

        # Validate the request using its URL, POST data,
        # and X-TWILIO-SIGNATURE header
        request_valid = validator.validate(
            request.build_absolute_uri(),
            request.POST,
            request.META.get('HTTP_X_TWILIO_SIGNATURE', ''))

        # Continue processing the request if it's valid, return a 403 error if
        # it's not
        if request_valid:
            return f(request, *args, **kwargs)
        else:
            return HttpResponseForbidden()
    return decorated_function
```

To validate an incoming request genuinely originated from Twilio, we first need to create an instance of the RequestValidator class using our Twilio auth token. After that we call its validate method, passing in the request's URL, payload, and the value of the request's X-TWILIO-SIGNATURE header.

That method will return True if the request is valid or False if it isn't. Our decorator then either continues processing the view or returns a 403 HTTP response for inauthentic requests.

## Use the decorator with our Twilio webhooks

Now we're ready to apply our decorator to any view in our Django project that handles incoming requests from Twilio.

### Apply the request validation decorator to a Django view

Apply a custom Twilio request validation decorator to a Django view used for Twilio webhooks.

```python
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from twilio.twiml.voice_response import VoiceResponse, MessagingResponse


@require_POST
@csrf_exempt
@validate_twilio_request
def incoming_call(request):
    """Twilio Voice URL - receives incoming calls from Twilio"""
    # Create a new TwiML response
    resp = VoiceResponse()

    # <Say> a message to the caller
    from_number = request.POST['From']
    body = """
    Thanks for calling!

    Your phone number is {0}. I got your call because of Twilio's webhook.

    Goodbye!""".format(' '.join(from_number))
    resp.say(body)

    # Return the TwiML
    return HttpResponse(resp)


@require_POST
@csrf_exempt
@validate_twilio_request
def incoming_message(request):
    """Twilio Messaging URL - receives incoming messages from Twilio"""
    # Create a new TwiML response
    resp = MessagingResponse()

    # <Message> a text back to the person who texted us
    body = "Your text to me was {0} characters long. Webhooks are neat :)" \
        .format(len(request.POST['Body']))
    resp.message(body)

    # Return the TwiML
    return HttpResponse(resp)
```

To use the decorator with an existing view, just put `@validate_twilio_request` above the view's definition. In this sample application, we use our decorator with two views: one that handles incoming phone calls and another that handles incoming text messages.

**Note:** If your Twilio webhook URLs start with `https://` instead of `http://`, your request validator may fail locally when you use Ngrok or in production if your stack terminates SSL connections upstream from your app. This is because the request URL that your Django application sees does not match the URL Twilio used to reach your application.

To fix this for local development with Ngrok, use `http://` for your webhook instead of `https://`. To fix this in your production app, your decorator will need to reconstruct the request's original URL using request headers like `X-Original-Host` and `X-Forwarded-Proto`, if available.

## Disable request validation during testing

If you write tests for your Django views those tests may fail for views where you use your Twilio request validation decorator. Any requests your test suite sends to those views will fail the decorator's validation check.

To fix this problem we recommend adding an extra check in your decorator, like so, telling it to only reject incoming requests if your app is running in production.

### An improved Django request validation decorator, useful for testing

Use this version of the custom Django decorator if you test your Django views.

```python
from django.conf import settings
from django.http import HttpResponseForbidden
from functools import wraps
from twilio.request_validator import RequestValidator

import os


def validate_twilio_request(f):
    """Validates that incoming requests genuinely originated from Twilio"""
    @wraps(f)
    def decorated_function(request, *args, **kwargs):
        # Create an instance of the RequestValidator class
        validator = RequestValidator(os.environ.get('TWILIO_AUTH_TOKEN'))

        # Validate the request using its URL, POST data,
        # and X-TWILIO-SIGNATURE header
        request_valid = validator.validate(
            request.build_absolute_uri(),
            request.POST,
            request.META.get('HTTP_X_TWILIO_SIGNATURE', ''))

        # Continue processing the request if it's valid (or if DEBUG is True)
        # and return a 403 error if it's not
        if request_valid or settings.DEBUG:
            return f(request, *args, **kwargs)
        else:
            return HttpResponseForbidden()
    return decorated_function
```

## What's next?

Validating requests to your Twilio webhooks is a great first step for securing your Twilio application. We recommend reading over our full security documentation for more advice on protecting your app, and the Anti-Fraud Developer's Guide in particular.

To learn more about securing your Django application in general, check out the official Django security docs.