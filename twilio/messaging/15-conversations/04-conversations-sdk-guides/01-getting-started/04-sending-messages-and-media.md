# Sending Messages and Media

Using the SDK, you can craft messages with text and/or media attachments and send them to other participants in your Conversation.

---

## Send a text Message

If you'd like to send your Message as a one-shot method call, you can use this basic method.

### Send a text Message

```javascript
//send a basic message into the Conversation
await conversation.sendMessage('hello world');
```

We also provide a more flexible method that allows you to programmatically build your message. This method is more robust and is typically ideal for most use cases.

---

## Message Builder

The Message Builder class allows you to build a new text and/or media Message and makes the Message ready to be sent to the Conversation.

When creating the MessageBuilder object, you'll set each property of the message individually. For example, you'll set the body and the message attributes separately.

### Using Message Builder

```javascript
/* Using MessageBuilder */
// Message builder. Allows the message to be built and sent via method chaining.

await testConversation.prepareMessage()
    .setBody('Hello!')
    .setAttributes({foo: 'bar'})
    .addMedia(media1)
    .addMedia(media2)
    .build()
    .send();
```

---

## Media Message

You can add photos, videos, and other types of media files to your Conversation. Media is displayed seamlessly between all participating channels.

### Send a Media Message

To add a media Message (i.e. photos, videos) to your Conversation, you'll need to create a Message and add a media file, filename and content type to the Message Builder.

### Send Media Message

```javascript
const file = await fetch("https://v.fastcdn.co/u/ed1a9b17/52533501-0-logo.svg");
const fileBlob = await file.blob();

// Send a media message
const sendMediaOptions = {
    contentType: file.headers.get("Content-Type"),
    filename: "twilio-logo.svg",
    media: fileBlob
};

await conversation.prepareMessage().addMedia(sendMediaOptions);
```

Each SDK accepts media input differently:

**For JS, use:**
- A String or Node.js Buffer containing a media byte stream
- A new FormData object containing file information: filename, content-type, size, and all required FormData information

**For iOS, use:**
- an InputStream
- an NSInputStream-compliant stream
- an NSData buffer

**For Android, use:**
- any java.io.InputStream-compliant stream

---

## Send Multiple Media Messages

> ℹ️ **Info**
> The maximum combined size of attachments is 150 MB.

You can also attach multiple media items to a single message by using the Message Builder.

### Send multiple Media Messages

```javascript
/* Send multiple media */

const file = await fetch("https://v.fastcdn.co/u/ed1a9b17/52533501-0-logo.svg");
const fileBlob = await file.blob();

const mediaFormData = new FormData();
mediaFormData.set("twilio-logo", fileBlob, "twilio-logo.svg");

const sendMediaOptions = {
    contentType: file.headers.get("Content-Type"),
    filename: "twilio-logo.svg",
    media: fileBlob
};

await testConversation.prepareMessage()
    .setBody("Hello!")
    // add multiple media
    .addMedia(mediaFormData)
    .addMedia(sendMediaOptions)
    // ...
    .addMedia(mediaN)
    .build()
    .send();
```

---

## Retrieve Media Message Content

You can get a short-lived, temporary URL to download the media content in a Conversation.

If a message has more than one attachment, an array of media Messages can be retrieved, but it has to match the specific category of media.

> ℹ️ **Info**
> `media` is currently the only category available

You can use your preferred method to retrieve the content from the temporary URL and render it in your UI.

### Retrieve Media Message

```javascript
/* Check and update Media samples */

// Return all media attachments, without temporary urls
const media = message.attachedMedia;

// Return a (possibly empty) array of media matching a specific set of categories. Allowed category is so far only 'media'
const categorizedMedia = await message.getMediaByCategory(["media"]);

//Get a temporary URL for the first media returned by the previous method
const mediaUrl = await categorizedMedia[0].getContentTemporaryUrl();
```

---

## Media Limits

Conversations is a cross-channel messaging product, so each channel has a different set of limitations about incoming media files. Please refer to the Media Limits documentation for channel-specific information and supported file types.

---

## Security

Media content is encrypted and can not be downloaded directly. When required, only authenticated users can generate temporary/expiring URLs to download the media content. The temporary URLs are valid for 300 seconds, after which a new temporary URL must be requested.

---

## What's Next?

Let's learn other features in Twilio Conversations:

- Explore the **User Reachability Indicator** guide
- Learn **How to Receive and Send Typing Indicators**