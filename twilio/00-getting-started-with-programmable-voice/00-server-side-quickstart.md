# Getting Started with Programmable Voice - Server-side quickstart for Programmable Voice

Server-side quickstart for Programmable Voice




This quickstart shows you how to build a server-side application that makes and receives phone calls. The code in this quickstart makes an outbound call with the Twilio Voice API and it handles an inbound call with text-to-speech.

Complete the prerequisites





Select your programming language and complete the prerequisites:

Python
Node.js
PHP
C#/.NET
Java
Go
Ruby
Install Python 3.3 or later

.
Install and set up ngrok

.
Install Flask

 and Twilio's Python SDK

. To install using pip

, run:


Copy code block
pip install flask twilio
Create a Twilio account

.
Buy a voice-enabled phone number

.
Set environment variables





Follow these steps to get your Twilio account credentials and set them as environment variables.

macOS Terminal
Windows command line
PowerShell
Go to the Twilio Console

.
Copy your Account SID and set it as an environment variable using the following command. Replace YOUR_ACCOUNT_SID with your actual Account SID.


Copy code block
export TWILIO_ACCOUNT_SID=YOUR_ACCOUNT_SID
Copy your Auth Token and set it as an environment variable using the following command. Replace YOUR_AUTH_TOKEN with your actual Auth Token.


Copy code block
export TWILIO_AUTH_TOKEN=YOUR_AUTH_TOKEN
Make an outgoing phone call





Follow these steps to make a phone call from your Twilio number.

Python
Node.js
PHP
C#/.NET
Java
Go
Ruby
Create a file named make_call.py and add the following code:
Make a phone call using Twilio





Report code block


Copy code block
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call = client.calls.create(
    url="http://demo.twilio.com/docs/voice.xml",
    to="+18005550100",
    from_="+18005550199",
)

print(call.sid)
Replace the from_ phone number with your Twilio number.
Replace the to phone number with your own phone number.
Save your changes.
Run the script:


Copy code block
python make_call.py
Your phone rings and you hear the short message in the TwiML document that your script links to.
Receive a phone call with your Twilio number





Follow these steps to receive a phone call with your Twilio number and respond using text-to-speech.

Python
Node.js
PHP
C#/.NET
Java
Go
Ruby
Create a file named answer_phone.py and add the following code:
Generate TwiML to Say a message





Report code block


Copy code block
from flask import Flask
from twilio.twiml.voice_response import VoiceResponse

app = Flask(__name__)


@app.route("/", methods=['GET', 'POST'])
def hello_monkey():
    """Respond to incoming calls with a simple text message."""

    resp = VoiceResponse()
    resp.say("Hello from your pals at Twilio! Have fun.")
    return str(resp)


if __name__ == "__main__":
    app.run(debug=True)
Save the file.
In a new terminal window, run the following command to start the Python development server:


Copy code block
python answer_phone.py 
In a new terminal window, run the following command to start ngrok

 and create a tunnel to your localhost:


Copy code block
ngrok http 5000
Set up a webhook that triggers when your Twilio phone number receives a phone call:
Go to the Active Numbers

 page in the Twilio Console.
Click your Twilio phone number.
Go to the Configure tab and find the Voice Configuration section.
In the A call comes in row, select the Webhook option.
Paste your ngrok public URL in the URL field. For example, if your ngrok console shows Forwarding https://1aaa-123-45-678-910.ngrok-free.app, enter https://1aaa-123-45-678-910.ngrok-free.app.
Click Save configuration.
With the Python development server and ngrok running, call your Twilio phone number. You hear the text-to-speech message defined in answer_phone.py.
Next steps





Browse reference documentation for the Programmable Voice API
Learn about TwiML markup language for responding to voice calls
Browse all voice tutorials by topic