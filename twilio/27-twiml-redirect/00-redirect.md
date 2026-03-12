# TwiML™ Voice: <Redirect>

TwiML™ Voice: <Redirect>
The `<Redirect>` verb transfers control of a call to the TwiML at a different URL. All verbs after `<Redirect>`are unreachable and ignored.
Verb Attributes
The `<Redirect>` verb supports the following attributes that modify its behavior:
Attribute NameAllowed ValuesDefault Value__method__`GET`, `POSTPOST`
method
The 'method' attribute takes the value `GET` or `POST`. This tells Twilio whether to request the `<Redirect>` URL via `HTTP GET` or `POST`. `POST` is the default.
Use it in a `<Redirect>` verb like so:
Using method attribute in a Redirect verb
Node.jsPythonC#JavaGoPHPRuby
Report code block
Copy code block

```
from twilio.twiml.voice_response import Redirect, VoiceResponse

```

response = VoiceResponse() 
response.redirect('http://pigeons.com/twiml.xml', method='POST') 
print(response)
Output
Copy output

```
<?xml version="1.0" encoding="UTF-8"?>

```

<Response> 
<Redirect method="POST">http://pigeons.com/twiml.xml</Redirect> 
</Response>
Nouns
The "noun" of a TwiML verb is the stuff nested within the verb that's not a verb itself; it's the stuff the verb acts upon. These are the __nouns__ for `<Redirect>`:
NounTwiML Interpretationplain textAn absolute or relative URL for a different TwiML document.
Nesting Rules
No verbs can be nested within `<Redirect>` and `<Redirect>` can't be nested in any other verbs.
Examples
Example 1: Absolute URL Redirect
In this example, we have a `<Redirect>` verb after a `<Dial>` verb with no URL. When the `<Dial>` verb finishes, the `<Redirect>` executes. `<Redirect>` makes a request to `http://www.foo.com/nextInstructions` and transfers the call flow to the TwiML received in response to that request.
Absolute URL Redirect
Node.jsPythonC#JavaGoPHPRuby
Report code block
Copy code block

```
from twilio.twiml.voice_response import Dial, Redirect, VoiceResponse

```

response = VoiceResponse() 
response.dial('415-123-4567') 
response.redirect('http://www.foo.com/nextInstructions') 
print(response)
Output
Copy output

```
<?xml version="1.0" encoding="UTF-8"?>

```

<Response> 
<Dial>415-123-4567</Dial> 
<Redirect>http://www.foo.com/nextInstructions</Redirect> 
</Response>
Example 2: Relative URL Redirect
Redirects call flow control to the TwiML at a URL relative to the current URL.
Relative URL Redirect
Node.jsPythonC#JavaGoPHPRuby
Report code block
Copy code block

```
from twilio.twiml.voice_response import Redirect, VoiceResponse

```

response = VoiceResponse() 
response.redirect('../nextInstructions') 
print(response)
Output
Copy output

```
<?xml version="1.0" encoding="UTF-8"?>

```

<Response> 
<Redirect>../nextInstructions</Redirect> 
</Response>