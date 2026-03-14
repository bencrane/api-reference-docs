# Exploring the Conversations Swift Quickstart (iOS)

What does the Conversations Swift Quickstart do? How does it work? How would you add something similar to your own project? We'll cover all of these questions and more in this behind the scenes look at the example application code.

If you haven't had a chance to try out the Conversations Swift Quickstart app yet, follow the instructions in the README to get it up and running. You'll need to run:

```bash
pod install
```

to install the Conversations SDK, and set up your Xcode Workspace. You'll also need to supply an access token with a Chat grant for a Conversations Service in the ConversationsConstants.swift file before the application will compile. You can generate an access token with the Twilio Command Line Interface (CLI):

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

The example application code uses Storyboard and UIKit as the view layer. We built a class named QuickstartConversationsManager to handle the interactions with the Conversations SDK.

Within the Quickstart application, you will find examples of the following:

- Using an access token to initialize the Conversations Client
- Joining a conversation
- Sending messages to a conversation
- Receiving and displaying messages from a conversation

When you build an application that uses Conversations, you may be able to use the QuickstartConversationsManager and ConversationsViewController classes as a start for your project. You may also just want to take a look at how the quickstart works, and then build your own solution with the classes in the SDK!

---

## Adding Twilio Conversations to your Application

When you build your solutions with Twilio Conversations, you need a Conversations iOS SDK for your mobile app. You can install this library using Swift Package Manager, Cocoapods, Carthage, or as a direct download.

In the Swift Quickstart, we used Cocoapods. You can install your application's dependencies with a Podfile. You can see which library versions are installed and which need to be updated (with the pod outdated command).

### Conversations SDK

You would typically start by adding the TwilioConversationsClient from this SDK to your project, and then work with TCHConversation objects to send and retrieve TCHMessage objects for a given conversation. Other important classes are TCHUser, TCHParticipant, and TCHMedia.

While we cover some of the basics of the Conversations SDK in this Quickstart, you can also find reference documentation for each class and protocol. We also consider some of these topics in more detail on other pages in our docs, which we will link to in each section that has a corresponding guide.

### Twilio server-side SDK

The Conversations SDK for iOS is only one-half of the solution. You'll also need to build a server to support your mobile application. Twilio supports six different languages and platforms for you to build with. If you are more of a mobile application developer, and don't do a lot of web application programming, the Node.js/JavaScript stack is a good option for getting started.

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

Each chat user in your Conversations project needs an identity - this could be their user id, their username, or some kind of another identifier. You could certainly have anonymous users in your Conversations - for instance, a web chat popup with a customer service agent on an e-commerce website - but in that case, you would still want to issue some kind of identifier from your application.

Once you build Twilio Conversations into your project, you should generate an access token with a ChatGrant for end users, along with the identity value.

With the Conversations Swift Quickstart, the easiest way to get started is to create an access token from the Twilio Command Line Interface (CLI).

### Difference between Access Tokens, Auth Tokens and API Keys

As part of this project, you will see that there are three different ways of providing credentials for Twilio - access tokens, auth tokens, and API keys. What is the difference between all of these different styles?

#### Access Tokens

Access tokens provide short-lived credentials for a single end user to work with your Twilio service from a JavaScript application running in a web browser, or from a native iOS or Android mobile application. Use the Twilio server-side SDKs in your back-end web services to create access tokens for your front-end applications to consume. Alternatively, use the Twilio CLI to create access tokens for testing. These access tokens have a built-in expiration, and need to be refreshed from your server if your users have long-running connections. The Conversations client will update your application when access tokens are about to expire, or if they have expired, so that you can refresh the token.

#### Auth Tokens

Although the names are similar, authentication (or auth) tokens are not the same as access tokens, and cannot be used in the same way. The auth token pairs with your Twilio account identifier (also called the account SID) to provide authentication for the Twilio REST API. Your auth token should be treated with the same care that you would use to secure your Twilio password, and should never be included directly in source code, made available to a client application, or checked into a file in source control.

#### API Keys and Secrets

Similar to auth tokens, API key/secret pairs secure access to the Twilio REST API for your account. When you create an API key and secret pair from the Twilio console, the secret will only be shown once, and then it won't be recoverable. In your back-end application, you would authenticate to Twilio with a combination of your account identifier (also known as the "Account SID"), an API key, and an API secret.

The advantage of API keys over auth tokens is that you can rotate API keys on your server application, especially if you use one API key and secret pair for each application cluster or instance. This way, you can have multiple credentials under your Twilio account, and if you need to swap out a key pair and then deactivate it, you can do it on an application basis, not on an account basis.

### Storing Credentials Securely

Whether you use auth tokens or API keys, we suggest that you store those credentials securely, and do not check them into source control. There are many different options for managing secure credentials that depend on how and where you run your development, staging, and production environments.

When you develop locally, look into using a .env file with your project, usually in conjunction with a library named dotenv. For .NET Core, read our article on Setting Twilio Environment Variables in Windows 10 with PowerShell and .NET Core 3.0 to learn a lot more about this topic!

---

## Retrieving a Conversations Access Token

In the Conversations Swift Quickstart, you can generate an access token using the Twilio Command Line Interface (CLI), and then paste that into the ConversationsConstants.swift file. While this works for getting the quickstart up and running, you will want to replace this with your own function that retrieves an access token.

You can use URLSession to make an authenticated HTTP request to your server, where the server code would provide an access token with a ChatGrant that sets the identity for the user based on your own authentication mechanism (such as an API key, or your own token).

Ideally, this method would be usable for three different scenarios:

- Initializing the Conversations Client when your application loads
- Refreshing the access token when the Conversations Client notifies your application that the token is about to expire
- Refreshing the access token when the Conversations Client notifies your application that the token did expire

---

## Initializing the Conversations Client

The first step is to get an access token. Once you have an access token (a string value), you can initialize a Twilio Conversations Client. This client is the central class in the Conversations SDK, and you need to keep it around after initialization. The client is designed to be long-lived, and it will fire events off that your project can subscribe to.

You'll need to create your own delegate for the Conversations Client that implements the TwilioConversationsClientDelegate protocol. In the quick start, we created a class named QuickstartConversationsManager to encapsulate our usage of the Conversations SDK.

### Initializing the Conversations Client

```swift
//
//  QuickstartConversationsManager.swift
//  ConversationsQuickstart
//
//  Created by Jeffrey Linwood on 9/12/20.
//  Copyright © 2020 Twilio, Inc. All rights reserved.
//

import UIKit

import TwilioConversationsClient

/*
 * Delegate - usually implemented on the parent view controller. Send updates
 * that would require a user interface refresh
 */
protocol QuickstartConversationsManagerDelegate: AnyObject {
    func reloadMessages()
    func receivedNewMessage()
    func displayStatusMessage(_ statusMessage:String)
    func displayErrorMessage(_ errorMessage:String)
}

class QuickstartConversationsManager: NSObject, TwilioConversationsClientDelegate {

    // the unique name of the conversation you create
    private let uniqueConversationName = "general"

    // For the quickstart, this will be the view controller
    weak var delegate: QuickstartConversationsManagerDelegate?

    // MARK: Conversations variables
    private var client: TwilioConversationsClient?
    private var conversation: TCHConversation?
    private(set) var messages: [TCHMessage] = []
    private var identity: String?

    func conversationsClient(_ client: TwilioConversationsClient, synchronizationStatusUpdated status: TCHClientSynchronizationStatus) {
        guard status == .completed else {
            return
        }

        checkConversationCreation { (_, conversation) in
           if let conversation = conversation {
               self.joinConversation(conversation)
           } else {
               self.createConversation { (success, conversation) in
                   if success, let conversation = conversation {
                       self.joinConversation(conversation)
                   }
               }
           }
        }
    }


    // Called whenever a conversation we've joined receives a new message
    func conversationsClient(_ client: TwilioConversationsClient, conversation: TCHConversation,
                    messageAdded message: TCHMessage) {
        messages.append(message)

        // Changes to the delegate should occur on the UI thread
        DispatchQueue.main.async {
            if let delegate = self.delegate {
                delegate.reloadMessages()
                delegate.receivedNewMessage()
            }
        }
    }

    func conversationsClientTokenWillExpire(_ client: TwilioConversationsClient) {
        print("Access token will expire.")
        refreshAccessToken()
    }

    func conversationsClientTokenExpired(_ client: TwilioConversationsClient) {
        print("Access token expired.")
        refreshAccessToken()
    }

    private func refreshAccessToken() {
        guard let identity = identity else {
            return
        }
        let urlString = "\(TOKEN_URL)?identity=\(identity)"

        TokenUtils.retrieveToken(url: urlString) { (token, _, error) in
            guard let token = token else {
               print("Error retrieving token: \(error.debugDescription)")
               return
           }
            self.client?.updateToken(token, completion: { (result) in
                if (result.isSuccessful) {
                    print("Access token refreshed")
                } else {
                    print("Unable to refresh access token")
                }
            })
        }
    }

    func sendMessage(_ messageText: String,
                     completion: @escaping (TCHResult, TCHMessage?) -> Void) {

        let messageOptions = TCHMessageOptions().withBody(messageText)
        conversation?.sendMessage(with: messageOptions, completion: { (result, message) in
            completion(result, message)
        })

    }

    func loginFromServer(_ identity: String, completion: @escaping (Bool) -> Void) {
        // Fetch Access Token from the server and initialize the Conversations Client
        let urlString = "\(TOKEN_URL)?identity=\(identity)"
        self.identity = identity

        TokenUtils.retrieveToken(url: urlString) { (token, _, error) in
            guard let token = token else {
                print("Error retrieving token: \(error.debugDescription)")
                completion(false)
                return
            }
            // Set up Twilio Conversations client
            TwilioConversationsClient.conversationsClient(withToken: token,
                                                          properties: nil,
                                                          delegate: self) { (result, client) in
                                                            self.client = client
                                                            completion(result.isSuccessful)
            }
        }
    }

    func loginWithAccessToken(_ token: String) {
        // Set up Twilio Conversations client
        TwilioConversationsClient.conversationsClient(withToken: token,
         properties: nil,
         delegate: self) { (result, client) in
           self.client = client
        }
    }

    func shutdown() {
        if let client = client {
            client.delegate = nil
            client.shutdown()
            self.client = nil
        }
    }

    private func createConversation(_ completion: @escaping (Bool, TCHConversation?) -> Void) {
        guard let client = client else {
            return
        }
        // Create the conversation if it hasn't been created yet
        let options: [String: Any] = [
            TCHConversationOptionUniqueName: uniqueConversationName
            ]
        client.createConversation(options: options) { (result, conversation) in
            if result.isSuccessful {
                print("Conversation created.")
            } else {
                print(result.error?.localizedDescription ?? "")
                print("Conversation NOT created.")
            }
            completion(result.isSuccessful, conversation)
        }
    }

    private func checkConversationCreation(_ completion: @escaping(TCHResult?, TCHConversation?) -> Void) {
        guard let client = client else {
            return
        }
        client.conversation(withSidOrUniqueName: uniqueConversationName) { (result, conversation) in
            completion(result, conversation)
        }
    }

    private func joinConversation(_ conversation: TCHConversation) {
        self.conversation = conversation
        if conversation.status == .joined {
            print("Current user already exists in conversation")
            self.loadPreviousMessages(conversation)
        } else {
            conversation.join(completion: { result in
                print("Result of conversation join: \(result.resultText ?? "No Result")")
                if result.isSuccessful {
                    self.loadPreviousMessages(conversation)
                }
            })
        }
    }

    private func loadPreviousMessages(_ conversation: TCHConversation) {
        conversation.getLastMessages(withCount: 100) { (result, messages) in
            if let messages = messages {
                self.messages = messages
                DispatchQueue.main.async {
                    self.delegate?.reloadMessages()
                }
            }
        }
    }
}
```

---

## Client Synchronization State

After you initialize the Conversations client, the client needs to synchronize with the server. The `conversationsClient:synchronizationStatusUpdated:` method on the delegate gets called when the synchronization status changes - the completed status is `.completed`, which means that the Conversations, Participants and Messages collections are ready to use.

---

## Joining a Conversation

The TCHConversation class is the building block of your Conversations application. In the Quickstart, we've set things up so that the user automatically joins one conversation. For instance, this conversation's unique ID could be supplied by a back-end service to represent a three-way conversation between a restaurant, a customer, and a delivery driver.

Your user may have already joined the conversation, so you should check to see if they have before calling the `join()` method on the TCHConversation object.

---

## Sending Messages to a Conversation

To send a message (with text content) to a conversation that a user has joined, you need to call the `sendMessage()` method on a TCHConversation object. To create a message, you can build one up with the TCHMessageOptions class.

```swift
func sendMessage(_ messageText: String,
                 completion: @escaping (TCHResult, TCHMessage?) -> Void) {

    let messageOptions = TCHMessageOptions().withBody(messageText)
    conversation?.sendMessage(with: messageOptions, completion: { (result, message) in
        completion(result, message)
    })
}
```

---

## Receiving and Displaying Messages

Each TCHConversation object from the Conversations SDK represents an individual conversation between one or more users. Inside the Conversations Quickstart, we interact with the Conversation in the QuickstartConversationManager class. We use this approach to avoid having a view controller class that does too much. After initializing the Conversations SDK with an access token, waiting for the client to synchronize, and then either creating or joining a conversation, we can start to engage with that conversation by sending or receiving messages. These messages are TCHMessage objects from the Conversations SDK.

### Displaying Existing Messages

We retrieve the last messages using the `getLastMessages()` method on the TCHConversation class. This returns all of the previous messages (up to a limit, which you can set in code), and you can use that to initialize the display for your class. After loading in any existing messages, the QuickstartConversationsManager notifies its delegate (the ConversationsViewController) that there is a new batch of messages to display.

```swift
private func loadPreviousMessages(_ conversation: TCHConversation) {
    conversation.getLastMessages(withCount: 100) { (result, messages) in
        if let messages = messages {
            self.messages = messages
            DispatchQueue.main.async {
                self.delegate?.reloadMessages()
            }
        }
    }
}
```

### Receiving New Messages

The QuickstartConversationsManager class implements the TwilioConversationsClientDelegate protocol, and then becomes the delegate for the client. As events occur with our conversation, our manager object will get notified. One of these events is `messageAdded`. This event gets fired from the Twilio Conversations SDK when any user sends a message to the conversation.

Our manager appends that message to the messages we already have, and then notifies its delegate that a new message has arrived, and that the view controller should refresh its view of the messages.

In the view controller, we tell the table view that contains the messages to reload its data.

```swift
// Called whenever a conversation we've joined receives a new message
func conversationsClient(_ client: TwilioConversationsClient, conversation: TCHConversation,
                messageAdded message: TCHMessage) {
    messages.append(message)

    // Changes to the delegate should occur on the UI thread
    DispatchQueue.main.async {
        if let delegate = self.delegate {
            delegate.reloadMessages()
            delegate.receivedNewMessage()
        }
    }
}
```

---

## Conclusion/Next Steps

Now that you've seen how the Conversations Swift Quickstart implements several key pieces of functionality, you can see how to add the Conversations SDK to your Swift or Objective-C project. You can re-use the Quickstart Conversations Manager class within your own project, or extend it to fit your needs.

For more information, check out these helpful links:

- Twilio Conversations Quickstart
- Initializing Conversations SDK Clients
- Creating Access Tokens
- Best Practices Using the Conversations SDK