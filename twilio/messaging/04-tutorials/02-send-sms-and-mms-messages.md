# Send SMS and MMS messages

This tutorial shows you how to use Twilio Programmable Messaging to programmatically send SMS and MMS messages from your web application or with cURL. The steps send POST requests to the Message resource and the Media resource in the Twilio REST API.

To send messages with the Twilio command line interface (CLI), see Get a phone number and send your first SMS.

To send messages without writing code, use Twilio Studio, our low-code application builder.

## Complete the prerequisites

Select your programming language and complete the prerequisites:

- Python
- Node.js
- PHP
- C# (.NET Framework)
- C# (.NET Core)
- Java
- Go
- Ruby
- cURL

1. Install Python.
2. Install the Twilio Python SDK. To install using pip, run:

```
pip install twilio
```

3. Sign up for Twilio and get a phone number:
   - Sign up for Twilio.
   - On the Twilio Console landing page:
     - To acquire a phone number, click Get phone number.
     - Copy your Account SID and Auth Token and paste them in a temporary local file for use later in this tutorial.

4. Complete any applicable verification or registration requirements.
   - **Toll-free numbers:** Complete toll-free verification to send SMS messages to recipients in the US and Canada.
   - **US 10DLC numbers:** Register for A2P 10DLC to send SMS messages to recipients in the US. To learn more, see What is A2P 10DLC?.
   - **UK long code numbers:** Submit a Regulatory Compliance (RC) bundle to send SMS messages to recipients in the UK. To learn more, see Know Your Customer (KYC) in the United Kingdom.

## Send an SMS message

Follow these steps to send an SMS message from your Twilio phone number.

1. Create and open a new file called `send_message.py` anywhere on your machine and paste in the following code:

### Send an SMS Using Twilio with Python

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    body="Join Earth's mightiest heroes. Like Kevin Bacon.",
    from_="+15017122661",
    to="+15558675310",
)

print(message.body)
```

To learn all of the API response values that you can return with `print()`, see the response for Send an SMS Message in the API documentation. Precede the response value with `message.` (for example: `print(message.status)` returns the status value).

2. Set the environment variables for your Account SID and Auth Token.

> **Warning**
> **Improve security with API keys**
> To better control access, use API keys instead of the Account SID and Auth Token when you deploy to production. To learn more, see Why you should use API keys.

**On Mac or Linux:**

Run the following commands to add your credentials as environment variables in a twilio.env file and source them. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

```
echo "export TWILIO_ACCOUNT_SID='ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'" > twilio.env
echo "export TWILIO_AUTH_TOKEN='your_auth_token'" >> twilio.env
source ./twilio.env
```

If you're committing code with Git, run the following command to add the twilio.env file to .gitignore to avoid uploading your credentials in plain text:

```
echo "twilio.env" >> .gitignore
```

**On Windows command line (cmd.exe)**, run the following commands. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

```
set TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
set TWILIO_AUTH_TOKEN=your_auth_token
```

To learn more, see Store your Twilio credentials safely.

3. In the `send_message.py` file, replace the value for `to` with the recipient phone number in E.164 format.

4. To send a message to multiple recipients:

   Add a statement below `client` to define the array of phone numbers. Replace the phone numbers with your recipients' phone numbers in E.164 format.

   ```python
   numbers = ["+15558675310", "+12345678901", "+10987654321"]
   ```

   Replace the `message =` and `print()` statements with the following code that iterates through each phone number in the numbers list and returns the message sent to each number. Twilio makes one API call for each number.

   ```python
   for number in numbers:
       message = client.messages.create(
           body="This is the ship that made the Kessel Run in fourteen parsecs?",
           from_="+15017122661",
           to=number,
       )
       print(f"Sent to {number}: {message.body}")
   ```

> **Info**
> **Limits on message cadence**
> Message delivery performance to wireless carrier networks has limits. To learn more, see Understanding Twilio Rate Limits and Message Queues.

5. Replace the value for `from` with your Twilio phone number in E.164 format.

6. Save your changes and run this command from your terminal in the directory that contains `send_message.py`:

```
python send_message.py
```

After a few moments, you should receive an SMS from your Twilio number.

## Send an MMS message

> **Info**
> To learn which countries support MMS messages, see Sending and receiving MMS messages.

To send an MMS message, follow the steps to send an SMS message, adding the media URL to the code as shown in the following example. The media URL tells Twilio where to get the media you want to include.

The media URL must be a publicly accessible URL. Twilio can't reach any hidden URLs or URLs that require authentication.

When the Twilio REST API creates your new Message resource, it saves the image found at the specified in the media URL as a Media resource. Once you create a resource, you can access it at any time by using the API.

Set the `media_url` parameter:

### Send a Message with an Image URL using Twilio with Python

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    body="This is the ship that made the Kessel Run in fourteen parsecs?",
    from_="+15017122661",
    media_url=[
        "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg"
    ],
    to="+15558675310",
)

print(message.body)
```

## Next steps

- View more Messaging tutorials
- Sending high-volume messages? Learn more about Messaging services
- Browse the following developer resources:
  - Messaging API Reference
  - TwiML documentation