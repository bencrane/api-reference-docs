# Exploring the Conversations JavaScript Quickstart

What does the Conversations JavaScript Quickstart do? How does it work? How would you add something similar to your own project? We'll cover all of these questions and more in this behind-the-scenes look at the example application code.

If you haven't had a chance to try out the Conversations demo application, follow the instructions in the Twilio Conversations Quickstart guide to get it up and running.

## Quickstart Overview

The example application code has two pieces - a large front-end Single Page Application (SPA) written with JavaScript and React, and a small back end written with JavaScript and Node.js. We created the project using the create-react-app command line tool.

Within the quickstart application, you will find examples of the following:

- Using an access token to initialize the front-end SPA
- Joining or leaving a conversation
- Sending messages to a conversation
- Receiving and displaying messages from a conversation

When you build an application that uses Conversations, you may be able to use several of the React components from the quickstart, or you may customize them to fit your use case. You also do not have to use React with Conversations - it works with vanilla JS, Angular, Vue, or any other JavaScript framework for the web browser.

## Adding Twilio Conversations to your Application

When you build your solutions with Twilio Conversations, you need a Conversations Client JavaScript SDK that runs in your end user's web browser. You can install this library using Node Package Manager (NPM), Yarn, or with an HTML Script tag that points to the Twilio CDN.

You also need to integrate a Twilio server-side SDK into your back-end application. These libraries exist for Java, C#, PHP, Node.js/JavaScript, Ruby, and Python. You can use these libraries with almost any server framework that works with these languages.

### Conversations JavaScript Client SDK

To install the JavaScript Conversations Client library in your web application's front end, use npm (or yarn):

```bash
npm install --save @twilio/conversations
```

There is also a CDN installation, if you prefer:

```html
<script src="https://media.twiliocdn.com/sdk/js/conversations/releases/2.1.0/twilio-conversations.min.js"
        integrity="sha256-v2SFLWujVq0wnwHpcxct7bzTP8wII7sumEhAKMEqgHQ="
        crossorigin="anonymous"></script>
```

You would typically start by adding the `Conversations.Client` from this SDK to your project, and then work with `Conversation` objects to send and retrieve `Message` objects for a given Conversation. Other important classes are `User`, `Participant`, and `Media`.

While we cover some of the basics of the Conversations JS SDK in this Quickstart, you can find reference documentation for each class as JSDocs. We also consider some of these topics in more detail on other pages in our docs, which we will link to in each section that has a corresponding guide.

These JavaScript libraries are not the libraries you need for a back-end, Node.js application. If you are building a web application with Node.js, you need the Node.js Twilio server-side SDK.

### Twilio server-side SDK

For your chosen language and/or platform, pick the appropriate Twilio server-side SDK:

- Java
- C#/.NET
- JavaScript/Node.js
- Ruby
- Python
- PHP

On each of these pages, you will find instructions for setting up the Twilio server-side SDK. We recommend using dependency management for the Twilio libraries, and you'll find directions for the most common build tools for your platform.

> **Info**
> If you don't already have a Twilio account, sign up for a Twilio trial account, and then create a new project. You'll also need to create an API Key and API Secret pair to call Twilio's REST API, whether you use one of the Twilio server-side SDKs, or make the API calls yourself.

## Understanding Identity, Access Tokens, and Chat Grants

Each chat user in your Conversations project needs an identity - this could be their user id, their username, or some kind of other identifier. You could certainly have anonymous users in your Conversations - for instance, a web chat popup with a customer service agent on an e-commerce website - but in that case, you would still want to issue some kind of identifier from your application.

Once you build Twilio Conversations into your project, you should generate an access token with a ChatGrant for end users, along with the identity value.

With the Conversations JS Quickstart, the easiest way to get started is to create an access token from the Twilio Command Line Interface (CLI).

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

## Retrieving a Conversations Access Token

In the Conversations JS Quickstart, you can generate an access token using the Twilio Command Line Interface (CLI), and then paste that into the `ConversationsApp.js` file. While this works for getting the quickstart up and running, you will want to replace this with your own function that retrieves an access token.

You can use fetch, axios, or another client-side JS library to make an authenticated HTTP request to your server, where you would provide an access token with a ChatGrant that sets the identity for the user based on your own authentication mechanism (such as a session cookie).

Ideally, this method would be usable for three different scenarios:

- Initializing the Conversations JS Client when the React component mounts
- Refreshing the access token when the Conversations JS Client notifies your application that the token is about to expire
- Refreshing the access token when the Conversations JS Client notifies your application that the token did expire

## Initializing the JS Conversations Client

The first step is to get an access token. Once you have an access token (It is a string value.), you can initialize a Twilio Conversations Client. This client is the central class in the Conversations JS SDK, and you need to keep it around after initialization. The client is designed to be long-lived, and it will fire events off that your project can subscribe to.

### Initializing the Conversations Client

```javascript
import React from "react";
import { Badge, Icon, Layout, Spin, Typography } from "antd";
import { Client as ConversationsClient } from "@twilio/conversations";

import "./assets/Conversation.css";
import "./assets/ConversationSection.css";
import { ReactComponent as Logo } from "./assets/twilio-mark-red.svg";

import Conversation from "./Conversation";
import LoginPage from "./LoginPage";
import { ConversationsList } from "./ConversationsList";
import { HeaderItem } from "./HeaderItem";

const { Content, Sider, Header } = Layout;
const { Text } = Typography;

class ConversationsApp extends React.Component {
  constructor(props) {
    super(props);

    const name = localStorage.getItem("name") || "";
    const loggedIn = name !== "";

    this.state = {
      name,
      loggedIn,
      token: null,
      statusString: null,
      conversationsReady: false,
      conversations: [],
      selectedConversationSid: null,
      newMessage: ""
    };
  }

  componentDidMount = () => {
    if (this.state.loggedIn) {
      this.getToken();
      this.setState({ statusString: "Fetching credentials…" });
    }
  };

  logIn = (name) => {
    if (name !== "") {
      localStorage.setItem("name", name);
      this.setState({ name, loggedIn: true }, this.getToken);
    }
  };

  logOut = (event) => {
    if (event) {
      event.preventDefault();
    }

    this.setState({
      name: "",
      loggedIn: false,
      token: "",
      conversationsReady: false,
      messages: [],
      newMessage: "",
      conversations: []
    });

    localStorage.removeItem("name");
    this.conversationsClient.shutdown();
  };

  getToken = () => {
    // Paste your unique Chat token function
    const myToken = "<Your token here>";
    this.setState({ token: myToken }, this.initConversations);
  };

  initConversations = async () => {
    window.conversationsClient = ConversationsClient;
    this.conversationsClient = new ConversationsClient(this.state.token);
    this.setState({ statusString: "Connecting to Twilio…" });

    this.conversationsClient.on("connectionStateChanged", (state) => {
      if (state === "connecting")
        this.setState({
          statusString: "Connecting to Twilio…",
          status: "default"
        });
      if (state === "connected") {
        this.setState({
          statusString: "You are connected.",
          status: "success"
        });
      }
      if (state === "disconnecting")
        this.setState({
          statusString: "Disconnecting from Twilio…",
          conversationsReady: false,
          status: "default"
        });
      if (state === "disconnected")
        this.setState({
          statusString: "Disconnected.",
          conversationsReady: false,
          status: "warning"
        });
      if (state === "denied")
        this.setState({
          statusString: "Failed to connect.",
          conversationsReady: false,
          status: "error"
        });
    });
    this.conversationsClient.on("conversationJoined", (conversation) => {
      this.setState({ conversations: [...this.state.conversations, conversation] });
    });
    this.conversationsClient.on("conversationLeft", (thisConversation) => {
      this.setState({
        conversations: [...this.state.conversations.filter((it) => it !== thisConversation)]
      });
    });
  };

  render() {
    const { conversations, selectedConversationSid, status } = this.state;
    const selectedConversation = conversations.find(
      (it) => it.sid === selectedConversationSid
    );

    let conversationContent;
    if (selectedConversation) {
      conversationContent = (
        <Conversation
          conversationProxy={selectedConversation}
          myIdentity={this.state.name}
        />
      );
    } else if (status !== "success") {
      conversationContent = "Loading your conversation!";
    } else {
      conversationContent = "";
    }

    if (this.state.loggedIn) {
      return (
        <div className="conversations-window-wrapper">
          <Layout className="conversations-window-container">
            <Header style={{ display: "flex", alignItems: "center", padding: 0 }}>
              {/* Header content */}
            </Header>
            <Layout>
              <Sider theme={"light"} width={250}>
                <ConversationsList
                  conversations={conversations}
                  selectedConversationSid={selectedConversationSid}
                  onConversationClick={(item) => {
                    this.setState({ selectedConversationSid: item.sid });
                  }}
                />
              </Sider>
              <Content className="conversation-section">
                <div id="SelectedConversation">{conversationContent}</div>
              </Content>
            </Layout>
          </Layout>
        </div>
      );
    }

    return <LoginPage onSubmit={this.logIn} />;
  }
}

export default ConversationsApp;
```

## Client Connection State

After you initialize the Conversations client, the `connectionStateChanged` event will fire any time the user's connection changes. The possible states handled in the Conversations JS Quickstart are:

- connecting
- connected
- disconnecting
- disconnected
- denied

Once the user is connected, they are able to chat with others in conversations.

## Joining and Leaving a Conversation

The `Conversation` class is the building block of your Conversations application. In the JS Quickstart, as the user joins or leaves conversations, `conversationJoined` and `conversationLeft` events from the `ConversationsClient` get fired with the `Conversation` object as an argument. The React application maintains the list of conversations in its state, and then displays those conversations to the user in the `ConversationsList.js` component.

## Sending Messages to a Conversation

To send a message (with text content) to a conversation that a user has joined, you need to call the `sendMessage()` method on the `Conversation` instance. In the quickstart, we update the React component's state for the `newMessage` variable to be empty, leaving the text input field open for another message.

While the Conversations JS Quickstart does not implement them, you can find a list of webhooks that you can enable for your Conversations project. These webhooks include `onMessageAdd`, which is a pre-action webhook that could filter the text in the message, and `onMessageAdded`, which is a post-action webhook that could take action based on the contents of a message (such as updating a CRM).

The Conversations JS Quickstart also demonstrates how to send media, such as images, through the web browser interface using drag and drop. This functionality is in the `Conversation.js` file.

### Sending a Message to a Conversation

```javascript
import React, { Component } from 'react';
import './assets/Conversation.css';
import Dropzone from 'react-dropzone';
import styles from './assets/Conversation.module.css'
import {Button, Form, Icon, Input} from "antd";
import ConversationsMessages from "./ConversationsMessages";
import PropTypes from "prop-types";

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
        newMessage: '',
        conversationProxy: props.conversationProxy,
        messages: [],
        loadingState: 'initializing',
        boundConversations: new Set()
    };
  }

  loadMessagesFor = (thisConversation) => {
    if (this.state.conversationProxy === thisConversation) {
        thisConversation.getMessages()
            .then(messagePaginator => {
                if (this.state.conversationProxy === thisConversation) {
                    this.setState({ messages: messagePaginator.items, loadingState: 'ready' });
                }
            })
            .catch(err => {
                console.error("Couldn't fetch messages IMPLEMENT RETRY", err);
                this.setState({ loadingState: "failed" });
            });
    }
  };

  componentDidMount = () => {
      if (this.state.conversationProxy) {
        this.loadMessagesFor(this.state.conversationProxy);

        if (!this.state.boundConversations.has(this.state.conversationProxy)) {
            let newConversation = this.state.conversationProxy;
            newConversation.on('messageAdded', m => this.messageAdded(m, newConversation));
            this.setState({boundConversations: new Set([...this.state.boundConversations, newConversation])});
        }
      }
  }

  messageAdded = (message, targetConversation) => {
    if (targetConversation === this.state.conversationProxy)
        this.setState((prevState, props) => ({
            messages: [...prevState.messages, message]
        }));
  };

  onMessageChanged = event => {
    this.setState({ newMessage: event.target.value });
  };

  sendMessage = event => {
    event.preventDefault();
    const message = this.state.newMessage;
    this.setState({ newMessage: '' });
    this.state.conversationProxy.sendMessage(message);
  };

  onDrop = acceptedFiles => {
    this.state.conversationProxy.sendMessage({contentType: acceptedFiles[0].type, media: acceptedFiles[0]});
  };

  render = () => {
    return (
        <Dropzone onDrop={this.onDrop} accept="image/*">
          {({getRootProps, getInputProps, isDragActive}) => (
              <div {...getRootProps()} onClick={() => {}} id="OpenChannel" style={{position: "relative", top: 0}}>
                {isDragActive &&
                <div className={styles.drop}>
                  <Icon type={"cloud-upload"} style={{fontSize: "5em", color: "#fefefe"}}/>
                  <h3 style={{color: "#fefefe"}}>Release to Upload</h3>
                </div>
                }
                <div className={styles.messages} style={{ filter: `blur(${isDragActive ? 4 : 0}px)` }}>
                  <input id="files" {...getInputProps()} />
                  <div style={{flexBasis: "100%", flexGrow: 2, flexShrink: 1, overflowY: "scroll"}}>
                    <ConversationsMessages
                        identity={this.props.myIdentity}
                        messages={this.state.messages}/>
                  </div>
                  <div>
                    <Form onSubmit={this.sendMessage}>
                      <Input.Group compact={true} style={{ width: "100%", display: "flex", flexDirection: "row" }}>
                        <Input
                            style={{flexBasis: "100%"}}
                            placeholder={"Type your message here..."}
                            type={"text"}
                            name={"message"}
                            id={styles['type-a-message']}
                            autoComplete={"off"}
                            disabled={this.state.loadingState !== 'ready'}
                            onChange={this.onMessageChanged}
                            value={this.state.newMessage}
                        />
                        <Button icon="enter" htmlType="submit" type={"submit"}/>
                      </Input.Group>
                    </Form>
                  </div>
                </div>
              </div>
          )}
        </Dropzone>
    );
  }
}

Conversation.propTypes = {
  myIdentity: PropTypes.string.isRequired
};

export default Conversation;
```

## Receiving and Displaying Messages

In the React Conversations demo, we created a Conversation React component, which you can find in the `src/Conversation.js` file in the GitHub repo. As part of that component, we listen to the `messageAdded` event on the SDK's Conversation object. To distinguish between the React component and the representation of a conversation in the Twilio server-side SDK, we will call the SDK version a conversation proxy here. This conversation proxy gets passed into the React component as a property, and then the React component interacts with the SDK by calling methods on it, or adding listeners.

### Displaying Existing Messages

The React Conversation component loads the existing messages from the conversation proxy, using the `getMessages()` method on the Twilio server-side SDK Conversation class. This returns a paginator, and we load the messages from the first page of results up to display to the user when they join a conversation.

### Displaying New Messages Added to the Conversation

Using React also lets us handle the case where a new message gets added to the conversation. We listen to the `messageAdded` event from the Twilio Conversations SDK Conversation object, and then append that message to the messages we already have, and then set the state for the React component.

React handles the rendering for us as the messages list changes, which is much easier than trying to keep the DOM in sync with the message list manually.

## Conclusion/Next Steps

Now that you've seen how the Conversations JavaScript Quickstart implements several key pieces of functionality, you can see how to add the Conversations SDK to your React or JavaScript project. You can re-use these React components within your own web application's front end. If you're using Angular or Vue, some of the patterns in this React project should be applicable to your solution.

For more information, check out these helpful links:

- Twilio Conversations Quickstart
- Initializing Conversations SDK Clients
- Creating Access Tokens
- Best Practices Using the Conversations SDK