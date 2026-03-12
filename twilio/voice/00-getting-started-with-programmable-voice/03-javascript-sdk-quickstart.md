# Voice JavaScript SDK quickstart

Voice JavaScript SDK quickstart
This quickstart shows you how to create a web application that makes a phone call from a web browser. It uses the Voice JavaScript SDK and __Twilio Functions__; our serverless hosting platform.
Install the Twilio CLI
The Twilio CLI tool lets you manage your Twilio resources from your command line utility.
macOSWindowsLinux
1. __Install Homebrew__.
2. Install the Twilio CLI by running this command:
Copy code block

```
brew tap twilio/brew && brew install twilio
```

Install the Twilio CLI serverless plugin
To create and deploy Twilio Functions from the command line, install the Twilio CLI serverless plugin.
Copy code block

```
twilio plugins:install @twilio-labs/plugin-serverless
```

Create and deploy your app
1. To create your app, run the following Twilio CLI command.
Copy code block

```
twilio serverless:init quickstart-voice-javascript-sdk --template="voice-javascript-sdk"
```

2. Change directories with the following command:
Copy code block

```
cd quickstart-voice-javascript-sdk
```

3. Open the `.env` file in a code editor. The file includes this line: `ADMIN_PASSWORD=default`.
4. Replace `default` with a unique password that's hard to guess.
5. Save the `.env` file.
6. Deploy your application with the following Twilio CLI command.
Copy code block

```
twilio serverless:deploy
```

This command creates a __Service__. Services contain your __Functions__, __Assets__, and Environments within __Twilio Serverless__.
7. When the deployment completes, the terminal displays a response with the following.
Copy code block

```
Deployment Details

```

Domain: quickstart-voice-javascript-sdk-6210-dev.twil.io
Make a note of your deployment domain (for example, `quickstart-voice-javascript-sdk-6210-dev.twil.io`).
Initialize your application
1. Open a web browser to `https://{DEPLOYMENT_DOMAIN}/admin/index.html`. Replace `{DEPLOYMENT_DOMAIN}` with your deployment domain.
2. Enter the password that you added to the `.env` file in the Password box.
3. Click Let me in.
4. Click Initialize your application for your environment.
Make a call
1. Under Environmental Checks, click the running application link.
2. Click Start up the Device and wait for the Call button to appear.
3. Under Make a Call, enter your mobile phone number in the box.
4. Click Call.
5. If your web browser prompts you, allow the website to use your microphone.
6. Your phone will ring with a call from your Twilio number.
Next steps
Get a deeper understanding of the Voice JavaScript SDK by taking the following steps:
* Learn about how your app implements the Voice JavaScript SDK by reading the code in the `assets/quickstart.js` file.
* See our __Reference Components__ for the Voice JavaScript SDK.
* Learn about __best practices__ to follow while building with the Voice JavaScript SDK.