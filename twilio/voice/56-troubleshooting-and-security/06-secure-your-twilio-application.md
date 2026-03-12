# Secure your Twilio Credentials

To secure your Twilio Account SID and Authentication token, store them in environment variables. These variables remain local to your development machine and your app can access them. Using environment variables keeps credentials separate from your code and other locations that could result in unauthorized access to Twilio.

> **Warning**
> **Treat credentials like passwords**
> Never upload your credentials in plain text to a Git repository. Never write your credentials into your application code.

## macOS and Linux

To store your credentials on UNIX-like operating systems like macOS and Linux, set environment variables.

1. Create one environment variable for your account SID and one for your authentication token. Store both in a file titled `.env`.

```bash
echo "export TWILIO_ACCOUNT_SID='ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'" > .env
echo "export TWILIO_AUTH_TOKEN='your_auth_token'" >> .env
```

2. Execute the `.env` as a command in your existing process.

```bash
source ./.env
```

3. Add the `.env` file to your `.gitignore` file.

```bash
echo ".env" >> .gitignore
```

## Microsoft Windows

To store your credentials in environment variables on Microsoft Windows, you have three options: use the command prompt (`cmd.exe`), PowerShell, or the Windows UI.

### Command prompt

To set these environment variables as permanent settings, use the `setx` command through the Windows command prompt.

```cmd
setx TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
setx TWILIO_AUTH_TOKEN=your_auth_token
```

## Cloud providers

Most cloud providers provide the means for securing environment variables for your application.

- **Heroku**
- **Azure Websites**
- **Azure Functions**
- **AWS**
- **Dockerfile**
- **Docker Run**
- **Google Cloud**

## Load credentials from environment variables

After you store your credentials in environment variables, access from your apps using their variable name. To display the proper code for using environment variables, choose your programming language in the following example:

### Load credentials from environment variables

**Python**

```python
# Download the Python helper library from twilio.com/docs/python/install

import os 
from twilio.rest import Client 

# Your Account Sid and Auth Token from twilio.com/user/account 
# To set up environmental variables, see http://twil.io/secure 
account_sid = os.environ['TWILIO_ACCOUNT_SID'] 
auth_token = os.environ['TWILIO_AUTH_TOKEN'] 
client = Client(account_sid, auth_token) 

# Make API calls here...
```