# User Identity & Access Tokens for Conversations

> ℹ️ **Info**
> The operations described in the Active Users in Conversations section yield charges because they register Users as "active."

In Twilio Conversations, an identity is unique to a User and may be signed in on multiple devices simultaneously.

For example, the identity "alice@example.com" for a given User will stay synchronized on a number of endpoints, including their iPhone, Android tablet and in-browser application. All destinations for the same User will receive identical Conversation and Message notifications, as well as display the same message history.

> ⚠️ **Note**
> We recommend following the standard URI specification and avoid the following reserved characters `! * ' ( ) ; : @ & = + $ , / ? % # [ ]` for values such as identity and friendly name.

---

## Determining User Identity

On the server, you must decide two things based on the token request that you received:

- who the User is
- what they should be allowed to do

To figure out who the user is (their identity), you might use your existing login system or identity provider. You can use session cookies, an API token, or whatever mechanism you use to secure API requests or pages today.

You might not care who a User is at all, and assign them a temporary identity. Who the User is, what their role is, and how you determine that will vary from application to application.

If you determine that the User should indeed be allowed to access your Conversations application, you must grant your User access to a Conversation and supply an identity. Here are the guidelines on how to generate JWT access tokens: Creating Access Tokens.

---

## How many identities to use in Twilio Conversations

Twilio Conversations also uses identity to track monthly usage and generate accounting reports. Therefore, you should be mindful about provisioning a reasonable amount of unique identities. Reusing identities too frequently and keeping uniqueness low may cause conflicts in the User and application logic. On the other hand, using only random identities will result in a large number of redundant unique Users, which also impacts monthly billing.

---

## Active Users in Conversations

Twilio Conversations tracks unique User identities each month, and each unique identity connecting to a Conversation Service will create a User record. During a calendar month, if a User registers activity, they are considered "active." The following activities register Users as "active Users":

### SDK Operations (i.e. from Browser, Mobile)

These apply specifically to the user identity described in the Conversations Token. A user is considered "active" and billed when:

- Authenticating & connecting to Twilio infrastructure
- Sending a Message
- Joining or leaving a Conversation

### REST API Operations

These apply equally to our backend SDKs (Java, C#, Ruby, etc.). A User is considered "active" and billed when:

- The User record is created or updated.
- A Message is created, specifying this User as the "Author"
- The User is added or removed as a Conversation Participant.

### Channel Operations

We consider any native messaging address — e.g., phone numbers, WhatsApp numbers — an Active User when:

- a message from that phone number (or other address) arrives in a Twilio Conversation.
- a number or address is added to a Conversation

---

## Minimizing Your Costs

The Twilio Conversations API is the infrastructure for your application. Your application's messaging experience uses this infrastructure to allow Users to exchange messages, to read old messages, or to check whether they have any new messages today. When optimizing your application for cost, your primary consideration should be whether the User gets value from participating in your messaging experience.

To that end:

- **Avoid creating the Conversations Client object (in the SDK) unless the user is getting value.** Creating the Client object establishes a connection for the user and authenticates the User, making them "active" per the above.
- **Avoid unnecessary REST API updates to Users**, such as changing User attributes that aren't actually visible to your users.