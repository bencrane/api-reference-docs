# Create Access Tokens for Conversations

This guide covers creating Access Tokens for use with the mobile and web Conversations SDK clients. An Access Token is the credential that your SDK client endpoints must use to identify and authenticate themselves with the default Chat Service instance underneath any Conversation.

If you haven't already, please read our **guide on Conversations SDK client initialization mechanics**, which introduces the need for a generated Access Token.

Your server or backend generates this Access Token when you authenticate a chat Participant in a Conversation. The Conversations SDK client then uses the token to authorize with the underlying Chat Service.

---

## Create an Access Token

On your server, you must decide the two following things based on the token request that was sent from the SDK:

- who the Participant is
- what they should be allowed to do.

To figure out who the chat Participant is (their **identity**), you can use your existing login system, session cookies, an API token, or whatever mechanism you use to secure API requests or pages today. Who the chat Participant is and how you authorize their use will vary, depending on your specific application.

Once you determine that the chat Participant should indeed be allowed to access your Conversations application, you can grant that Participant access to Conversations by generating an Access Token as part of your authentication flow. You will then return the token to the user client for use in the Conversations SDK.

When creating an Access Token for Conversation, you will need the following information:

### Twilio Account SID

This is the Account SID of your Twilio account and must be the account in which you have created your Conversations Chat Service. (You can **manage your Chat Services in the Twilio Console**.)

### Chat Service SID

This SID is the unique identifier for a Chat Service instance, where your Participants, Conversations, Messages and other Conversations-related data reside. This is the Chat Service you grant the SDK client access to.

### Twilio API Key SID

This is the SID of an API Key created for your Twilio Account, which is used to sign the Access Token cryptographically. You can **create these API keys in the console**.

### Twilio API Secret

This is the secret part of the API Key above, also managed in **the Twilio console**.

### Identity

The `identity` of your chat Participant. For example, `user@some-domain.com`. For more details around Conversations' use of identity for Chat Participant, please refer to **User Identity & Access Tokens**.

> ⚠️ **Note**
> We recommend following the standard URI specification and avoid the following reserved characters `! * ' ( ) ; : @ & = + $ , / ? % # [ ]` for values such as identity and friendly name.

---

## Creating an Access Token (Chat)

**Python**

```python
import os

from twilio.jwt.access_token import AccessToken 
from twilio.jwt.access_token.grants import ChatGrant 

# required for all twilio access tokens 
# To set up environmental variables, see http://twil.io/secure 
account_sid = os.environ['TWILIO_ACCOUNT_SID'] 
api_key = os.environ['TWILIO_API_KEY'] 
api_secret = os.environ['TWILIO_API_KEY_SECRET'] 

# required for Chat grants 
service_sid = 'ISxxxxxxxxxxxx' 
identity = 'user@example.com' 

# Create access token with credentials 
token = AccessToken(account_sid, api_key, api_secret, identity=identity) 

# Create an Chat grant and add to token 
chat_grant = ChatGrant(service_sid=service_sid) 
token.add_grant(chat_grant) 

# Return token info as JSON 
print(token.to_jwt())
```

---

## Optional: TTL (Time To Live)

Access Tokens are only valid for a period of time, given in seconds. The default is `3600` seconds (1 hour), but we recommend adjusting it to several hours. The maximum TTL for a token is 24 hours.

Once your client receives an Access Token from your server, you can initialize the Twilio Conversations SDK and start sending and receiving messages, as covered in our guide to **Initializing SDK Clients**.