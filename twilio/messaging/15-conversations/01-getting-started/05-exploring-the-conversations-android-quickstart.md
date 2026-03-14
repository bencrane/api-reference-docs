# Exploring the Conversations Android Quickstart

What does the Conversations Android Quickstart do? How does it work? How would you add something similar to your own project? We'll cover all of these questions and more in this behind the scenes look at the example application code.

If you haven't had a chance to try out the Conversations Android Quickstart app yet, follow the instructions in the README to get it up and running.

You'll also need to supply an access token with a Chat grant for a Conversations Service in the strings.xml resource file before running the application. You can generate an access token with the Twilio Command Line Interface (CLI):

```bash
twilio token:chat --identity <The test username> --chat-service-sid <ISXXX...>
```

## Installing twilio-cli

### macOS

The suggested way to install twilio-cli on macOS is to use Homebrew. If you don't already have it installed, visit the Homebrew site for installation instructions and then return here.

Once you have installed Homebrew, run the following command to install twilio-cli:

```bash
brew tap twilio/brew && brew install twilio
```

> **Info:** For other installation methods, see the Twilio CLI Quickstart.

---

## Quickstart Overview

The example application code uses Java as the programming language. We also only have one activity class, named MainActivity. We chose not to use fragments in this quickstart for simplicity, but you can certainly use them with Conversations.

We built a class named QuickstartConversationsManager to handle the interactions with the Conversations SDK.

Within the quickstart application, you will find examples of the following:

- Using an access token to initialize the Conversations Client
- Joining a conversation
- Sending messages to a conversation
- Receiving and displaying messages from a conversation

When you build an application that uses Conversations, you may be able to use the QuickstartConversationsManager and MainActivity classes as a start for your project. You may also just want to take a look at how the quickstart works, and then build your own solution with the classes in the SDK!

---

## Adding Twilio Conversations to your Application

When you build your solutions with Twilio Conversations, you need a Conversations Android SDK for your mobile app. You can install this library using Gradle.

### Conversations SDK

You would typically start by adding the ConversationsClient from the `com.twilio.conversations` package to your project, and then work with Conversation objects to send and retrieve Message objects for a given conversation. Other important classes are User, Participant, and Media.

While we cover some of the basics of the Conversations SDK in this Quickstart, you can also find reference Javadocs for each class and interface. We also consider some of these topics in more detail in other pages in our docs, which we will link to in each section that has a corresponding guide.

### Twilio server-side SDK

The Conversations SDK for Android is only one half of the solution. You'll also need to build a server to support your mobile application. Twilio supports six different languages and platforms for you to build with. Java might be the best choice if you are an Android developer looking to try out web application development, but you can use any of these to build your server.

For your chosen language and/or platform, pick the appropriate Twilio server-side SDK:

- Java
- C#/.NET
- JavaScript/Node.js
- Ruby
- Python
- PHP

On each of these pages, you will find instructions for setting up the Twilio server-side SDK. We recommend using dependency management for the Twilio libraries, and you'll find directions for the most common build tools for your platform.

> **Info:** If you don't already have a Twilio account, sign up for a Twilio trial account, and then create a new project. You'll also need to create an API Key and API Secret pair to call Twilio's REST API, whether you use one of the Twilio server-side SDKs, or make the API calls yourself.

---

## Understanding Identity, Access Tokens, and Chat Grants

Each chat user in your Conversations project needs an identity - this could be their user id, their username, or some kind of other identifier. You could certainly have anonymous users in your Conversations - for instance, a web chat popup with a customer service agent on an e-commerce website - but in that case, you would still want to issue some kind of identifier from your application.

Once you build Twilio Conversations into your project, you should generate an access token with a ChatGrant for end users, along with the identity value.

With the Conversations Android Quickstart, the easiest way to get started is to create an access token from the Twilio Command Line Interface (CLI).

### Difference between Access Tokens, Auth Tokens and API Keys

As part of this project, you will see that there are three different ways of providing credentials for Twilio - access tokens, auth tokens, and API keys. What is the difference between all of these different styles?

#### Access Tokens

Access tokens provide short-lived credentials for a single end user to work with your Twilio service from a JavaScript application running in a web browser, or from a native iOS or Android mobile application. Use the Twilio server-side SDKs in your back end web services to create access tokens for your front end applications to consume. Alternatively, use the Twilio CLI to create access tokens for testing. These access tokens have a built-in expiration, and need to be refreshed from your server if your users have long-running connections. The Conversations client will update your application when access tokens are about to expire, or if they have expired, so that you can refresh the token.

#### Auth Tokens

Although the names are similar, authentication (or auth) tokens are not the same as access tokens, and cannot be used in the same way. The auth token pairs with your Twilio account identifier (also called the account SID) to provide authentication for the Twilio REST API. Your auth token should be treated with the same care that you would use to secure your Twilio password, and should never be included directly in source code, made available to a client application, or checked into a file in source control.

#### API Keys and Secrets

Similar to auth tokens, API key/secret pairs secure access to the Twilio REST API for your account. When you create an API key and secret pair from the Twilio console, the secret will only be shown once, and then it won't be recoverable. In your back end application, you would authenticate to Twilio with a combination of your account identifier (also known as the "Account SID"), an API key, and an API secret.

The advantage of API keys over auth tokens is that you can rotate API keys on your server application, especially if you use one API key and secret pair for each application cluster or instance. This way, you can have multiple credentials under your Twilio account, and if you need to swap out a key pair and then deactivate it, you can do it on an application basis, not on an account basis.

### Storing Credentials Securely

Whether you use auth tokens or API keys, we suggest that you store those credentials securely, and do not check them into source control. There are many different options for managing secure credentials that depend on how and where you run your development, staging, and production environments.

When you develop locally, look into using a .env file with your project, usually in conjunction with a library named dotenv. For .NET Core, read our article on Setting Twilio Environment Variables in Windows 10 with PowerShell and .NET Core 3.0 to learn a lot more about this topic!

---

## Retrieving a Conversations Access Token

For the Conversations Quickstart, you can generate an access token using the Twilio Command Line Interface (CLI), and then paste that into the strings.xml file. While this works for getting the quickstart up and running, you will want to replace this with your own function that retrieves an access token.

You can use OkHttp, Volley or another HTTP library to make an authenticated HTTP request to your server, where the server code would provide an access token with a ChatGrant that sets the identity for the user based on your own authentication mechanism (such as an API key, or your own token).

Ideally, this method would be usable for three different scenarios:

- Initializing the Conversations Client when your application loads
- Refreshing the access token when the Conversations Client notifies your application that the token is about to expire
- Refreshing the access token when the Conversations Client notifies your application that the token did expire

---

## Initializing the Conversations Client

The first step is to get an access token. Once you have an access token (a string value), you can initialize a Twilio Conversations Client. This client is the central class in the Conversations SDK, and you need to keep it around after initialization. The client is designed to be long-lived, and it will fire events off that your project can subscribe to.

You'll need to create your own listener for the Conversations Client that implements the ConversationsClientListener interface. In the quick start, we created a class named QuickstartConversationsManager to encapsulate our usage of the Conversations SDK.

```java
package com.twilio.conversationsquickstart;

import android.content.Context;
import android.util.Log;

import com.google.gson.Gson;
import com.twilio.conversations.CallbackListener;
import com.twilio.conversations.Conversation;
import com.twilio.conversations.ConversationListener;
import com.twilio.conversations.ConversationsClient;
import com.twilio.conversations.ConversationsClientListener;
import com.twilio.conversations.ErrorInfo;
import com.twilio.conversations.Participant;
import com.twilio.conversations.Message;
import com.twilio.conversations.StatusListener;
import com.twilio.conversations.User;

import org.jetbrains.annotations.Nullable;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

interface QuickstartConversationsManagerListener {
    void receivedNewMessage();
    void messageSentCallback();
    void reloadMessages();
}

interface TokenResponseListener {
    void receivedTokenResponse(boolean success, @Nullable Exception exception);
}

interface AccessTokenListener {
    void receivedAccessToken(@Nullable String token, @Nullable Exception exception);
}


class QuickstartConversationsManager {

    // This is the unique name of the conversation we are using
    private final static String DEFAULT_CONVERSATION_NAME = "general";

    final private ArrayList<Message> messages = new ArrayList<>();

    private ConversationsClient conversationsClient;

    private Conversation conversation;

    private QuickstartConversationsManagerListener conversationsManagerListener;

    private String tokenURL = "";

    private class TokenResponse {
        String token;
    }

    void retrieveAccessTokenFromServer(final Context context, String identity,
                                       final TokenResponseListener listener) {

        // Set the chat token URL in your strings.xml file
        String chatTokenURL = context.getString(R.string.chat_token_url);

        if ("https://YOUR_DOMAIN_HERE.twil.io/chat-token".equals(chatTokenURL)) {
            listener.receivedTokenResponse(false, new Exception("You need to replace the chat token URL in strings.xml"));
            return;
        }

        tokenURL = chatTokenURL + "?identity=" + identity;

        new Thread(new Runnable() {
            @Override
            public void run() {
                retrieveToken(new AccessTokenListener() {
                    @Override
                    public void receivedAccessToken(@Nullable String token,
                                                    @Nullable Exception exception) {
                        if (token != null) {
                            ConversationsClient.Properties props = ConversationsClient.Properties.newBuilder().createProperties();
                            ConversationsClient.create(context, token, props, mConversationsClientCallback);
                            listener.receivedTokenResponse(true,null);
                        } else {
                            listener.receivedTokenResponse(false, exception);
                        }
                    }
                });
            }
        }).start();
    }

    void initializeWithAccessToken(final Context context, final String token) {
        ConversationsClient.Properties props = ConversationsClient.Properties.newBuilder().createProperties();
        ConversationsClient.create(context, token, props, mConversationsClientCallback);
    }

    private void retrieveToken(AccessTokenListener listener) {
        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url(tokenURL)
                .build();
        try (Response response = client.newCall(request).execute()) {
            String responseBody = "";
            if (response != null && response.body() != null) {
                responseBody = response.body().string();
            }
            Log.d(MainActivity.TAG, "Response from server: " + responseBody);
            Gson gson = new Gson();
            TokenResponse tokenResponse = gson.fromJson(responseBody,TokenResponse.class);
            String accessToken = tokenResponse.token;
            Log.d(MainActivity.TAG, "Retrieved access token from server: " + accessToken);
            listener.receivedAccessToken(accessToken, null);

        }
        catch (IOException ex) {
            Log.e(MainActivity.TAG, ex.getLocalizedMessage(),ex);
            listener.receivedAccessToken(null, ex);
        }
    }

    // ... additional methods
}
```

---

## Client Synchronization State

After you initialize the Conversations client, the client needs to synchronize with the server. The `onConversationSynchronizationChange` method on each listener gets called when the synchronization status changes - the completed status is `COMPLETED`, which means that the Conversations, Participants and Messages collections are ready to use.

```java
@Override
public void onClientSynchronization(ConversationsClient.SynchronizationStatus synchronizationStatus) {
    if (synchronizationStatus == ConversationsClient.SynchronizationStatus.COMPLETED) {
        loadChannels();
    }
}
```

---

## Joining a Conversation

The Conversation class is the building block of your Conversations application. In the Quickstart, we've set things up so that the user automatically joins one conversation. For instance, this conversation's unique id could be supplied by a back end service to represent a three way conversation between a restaurant, a customer, and a delivery driver.

Your user may have already joined the conversation, so you should check to see if they have before calling the `join()` method on the Conversation object.

```java
private void joinConversation(final Conversation conversation) {
    Log.d(MainActivity.TAG, "Joining Conversation: " + conversation.getUniqueName());
    if (conversation.getStatus() == Conversation.ConversationStatus.JOINED) {
        QuickstartConversationsManager.this.conversation = conversation;
        Log.d(MainActivity.TAG, "Already joined default conversation");
        QuickstartConversationsManager.this.conversation.addListener(mDefaultConversationListener);
        return;
    }

    conversation.join(new StatusListener() {
        @Override
        public void onSuccess() {
            QuickstartConversationsManager.this.conversation = conversation;
            Log.d(MainActivity.TAG, "Joined default conversation");
            QuickstartConversationsManager.this.conversation.addListener(mDefaultConversationListener);
            QuickstartConversationsManager.this.loadPreviousMessages(conversation);
        }

        @Override
        public void onError(ErrorInfo errorInfo) {
            Log.e(MainActivity.TAG, "Error joining conversation: " + errorInfo.getMessage());
        }
    });
}
```

---

## Sending Messages to a Conversation

To send a message (with text content) to a conversation that a user has joined, you need to call the `sendMessage()` method on a Conversation object. To create a message, you can build one up with the Message.Options class.

```java
void sendMessage(String messageBody) {
    if (conversation != null) {
        Message.Options options = Message.options().withBody(messageBody);
        Log.d(MainActivity.TAG,"Message created");
        conversation.sendMessage(options, new CallbackListener<Message>() {
            @Override
            public void onSuccess(Message message) {
                if (conversationsManagerListener != null) {
                    conversationsManagerListener.messageSentCallback();
                }
            }
        });
    }
}
```

---

## Receiving and Displaying Messages

Each Conversation object from the Conversations SDK represents an individual conversation between one or more users. Inside the Conversations Quickstart, we interact with the Conversation in the QuickstartConversationManager class. We use this approach to avoid having an activity or fragment class that does too much. After initializing the Conversations SDK with an access token, waiting for the client to synchronize, and then either creating or joining a conversation, we can start to engage with that conversation by sending or receiving messages. These messages are Message objects from the Conversations SDK.

### Displaying Existing Messages

We retrieve the last messages using the `getLastMessages()` method on the Conversation class. This returns all of the previous messages (up to a limit, which you can set in code), and you can use that to initialize the display for your class. After loading in any existing messages, the QuickstartConversationsManager notifies its listener (the MainActivity) that there is a new batch of messages to display.

```java
private void loadPreviousMessages(final Conversation conversation) {
    conversation.getLastMessages(100,
            new CallbackListener<List<Message>>() {
                @Override
                public void onSuccess(List<Message> result) {
                    messages.addAll(result);
                    if (conversationsManagerListener != null) {
                        conversationsManagerListener.reloadMessages();
                    }
                }
            });
}
```

### Receiving New Messages

The QuickstartConversationsManager class implements the ConversationListener interface. As events occur with our conversation, our manager object will get notified. One of these events is `onMessageAdded`. This event gets fired from the Twilio Conversations SDK when any user sends a message to the conversation.

Our manager appends that message to the messages we already have, and then notifies its delegate that a new message has arrived, and that the view controller should refresh its view of the messages.

In the main activity, we tell the recycler view that contains the messages to reload its data.

```java
private final ConversationListener mDefaultConversationListener = new ConversationListener() {

    @Override
    public void onMessageAdded(final Message message) {
        Log.d(MainActivity.TAG, "Message added");
        messages.add(message);
        if (conversationsManagerListener != null) {
            conversationsManagerListener.receivedNewMessage();
        }
    }

    @Override
    public void onMessageUpdated(Message message, Message.UpdateReason updateReason) {
        Log.d(MainActivity.TAG, "Message updated: " + message.getMessageBody());
    }

    @Override
    public void onMessageDeleted(Message message) {
        Log.d(MainActivity.TAG, "Message deleted");
    }

    @Override
    public void onParticipantAdded(Participant participant) {
        Log.d(MainActivity.TAG, "Participant added: " + participant.getIdentity());
    }

    @Override
    public void onParticipantUpdated(Participant participant, Participant.UpdateReason updateReason) {
        Log.d(MainActivity.TAG, "Participant updated: " + participant.getIdentity() + " " + updateReason.toString());
    }

    @Override
    public void onParticipantDeleted(Participant participant) {
        Log.d(MainActivity.TAG, "Participant deleted: " + participant.getIdentity());
    }

    @Override
    public void onTypingStarted(Conversation conversation, Participant participant) {
        Log.d(MainActivity.TAG, "Started Typing: " + participant.getIdentity());
    }

    @Override
    public void onTypingEnded(Conversation conversation, Participant participant) {
        Log.d(MainActivity.TAG, "Ended Typing: " + participant.getIdentity());
    }

    @Override
    public void onSynchronizationChanged(Conversation conversation) {

    }
};
```

---

## Conclusion/Next Steps

Now that you've seen how the Conversations Android Quickstart implements several key pieces of functionality, you can see how to add the Conversations SDK to your Java or Kotlin Android project. You can re-use the Quickstart Conversations Manager class within your own project, or extend it to fit your needs.

For more information, check out these helpful links:

- Twilio Conversations Quickstart
- Initializing Conversations SDK Clients
- Creating Access Tokens
- Best Practices Using the Conversations SDK