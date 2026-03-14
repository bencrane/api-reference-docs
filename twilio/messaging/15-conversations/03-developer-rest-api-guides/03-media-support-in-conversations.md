# Media Support in Conversations

Twilio Conversations supports media messages, allowing your users to add photos, videos, and other file types to their conversations. The media display seamlessly between channels.

Remember that Chat-based participants are different from SMS- or WhatsApp-based participants in a Conversation.

This guide will cover sending and displaying media in the Chat-based portion of a Conversation using the client-side SDKs as well as using the REST Media Content Service (MCS) API.

## Using Media Messaging with the client-side SDKs (iOS, Android and JavaScript)

Creation of a media message for a Chat-based Conversations participant includes the following general steps, with details dependent upon the client platform:

1. Create a new message, passing in the media source and its mime content-type.
2. Optionally specify a default download filename to help your application display the media to other Conversation participants.
3. Programmable Chat provides feedback on the media upload progress, as well as an indication your media file has been successfully saved. (iOS and Android only)
4. The message is created in a specific Conversation and the Conversation Participants receive a notification.

When receiving a media message from a Conversation, your application will:

1. Receive a Conversation message that includes a media SID
2. Ask for a temporary, time-limited download media content URL from the message object
3. Display or otherwise make available the message's media content to the user

Media on Conversation messages are attachments and live separately from your Conversation message. A media SID associates the media file with its corresponding Conversation message.

Media files cannot exist without an owning message, and deletion of a message results in the cleanup of its associated media. Once created, media files are immutable; you can modify other supported attributes of a message that has media content, but the media itself is not changeable.

## Media Content Security

Media content is encrypted and can not be downloaded directly. When required only authenticated users can generate temporary/expiring URLs to download the media content.

## Platform Differences for Media Messaging

The media creation and download methods within the client-side SDKs take a stream or file as their parameter. How the media is expressed in the client-side SDK will depend on your platform:

### JavaScript

For JavaScript, you can provide the following as the source for the new media message sent by a Chat-based Conversation Participant:

- A new FormData object containing file information: filename, content-type, size, and all FormData-required information
- A String or Node.js Buffer containing a media byte stream

### iOS

Media files are uploaded by providing an InputStream or NSInputStream-compliant stream or NSData to TCHMessageBuilder for the new message.

### Android

For Android, you can provide any java.io.InputStream-compliant stream as the source for a new media message.

For all platforms, when receiving a Conversation message, the media is accessible through a temporary URL. This URL is invalidated after 300 seconds. You can request a new temporary URL at any time.

## Creating a Media Message

Adding a media-enriched message to a Conversation is very similar to creating a new text-only message. You start by creating a message and adding a media file to a message builder.

```javascript
// example for sending media message as FormData
// ---------------------------------------------
const formData = new FormData();
formData.append('file', $('#formInputFile')[0].files[0]);
// get desired channel (for example, with getChannelBySid promise)
chatClient.getChannelBySid(channelSid).then(function(channel) {
  // send media with all FormData parsed atrtibutes
  channel.sendMessage(formData);
});

// example for sending media message as String
// -------------------------------------------
// get desired channel (for example, with getChannelBySid promise)
chatClient.getChannelBySid(channelSid).then(function(channel) {
  // send SVG image as string with content type image/svg+xml; charset=utf-8
  channel.sendMessage({
    contentType: 'image/svg+xml; charset=utf-8',
    media:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
      '<path d="M50,3l12,36h38l-30,22l11,36l-31-21l-31,21l11-36l-30-22h38z"' +
      ' fill="#FF0" stroke="#FC0" stroke-width="2"/></svg>',
  });
});

// example for sending media message as Buffer
// -------------------------------------------
// get desired channel (for example, with getChannelBySid promise)
chatClient.getChannelBySid(channelSid).then(function(channel) {
  // send PNG image as Buffer with content type image/png
  channel.sendMessage({
    contentType: 'image/png',
    media: fs.readFileSync(pngFile),
  });
});
```

## Checking for Media Content

The message will have non-empty attachedMedia array.

```javascript
// get desired channel (for example, with getChannelBySid promise)
chatClient.getChannelBySid(channelSid).then(function(channel) {
  // get channel's messages paginator
  channel.getMessages().then(function(messagesPaginator) {
    // check the first message type
    const message = messagesPaginator.items[0];
    if (message.type === 'media') {
      console.log('Message is media message');
      // log media properties
      console.log('Media properties', message.media);
    }
  });
});
```

## Retrieving Media Message Content

If a Conversation message has media content, you can ask for a short-lived, temporary URL to download that content.

The function that returns the temporary URL is asynchronous, so you will need to get the URL as an argument in a closure, completion block, or listener, depending on the client-side platform. An example of what that would look like is in the code sample.

On iOS or Android, you do need to write your own code (or use an existing library) to download the binary contents of the media and then display or play the media.

```javascript
// get desired channel (for example, with getChannelBySid promise)
chatClient.getChannelBySid(channelSid).then(function(channel) {
  // get channel's messages paginator
  channel.getMessages().then(function(messagesPaginator) {
    // check the first message type
    const message = messagesPaginator.items[0];
    if (message.type === 'media') {
      console.log('Message is media message');
      // log media properties
      console.log('Media attributes', message.media);
      // get media temporary URL for displaying/fetching
      message.media.getContentTemporaryUrl().then(function(url) {
        // log media temporary URL
        console.log('Media temporary URL is ' + url);
      });
    }
  });
});
```

## Using Media Messaging via the Conversations REST API

Your backend services can also add media to Conversations by uploading and attaching files to Conversations Messages. This section provides a brief overview of the typical Media flow using the REST API. For a more detailed API description, please refer to Conversations Media REST API documentation.

> **Note:** Currently, Media Content Service (MCS) provides the underlying Media REST endpoint used to create (upload) the media (files). It is a separate endpoint and not supported in the Twilio server-side SDKs or the Twilio CLI.

### Sending a Media Message

Sending a Media Message via the REST API is a two-step process:

1. First, upload the media file to Twilio's Media Content Service (MCS) via the REST API
2. Send a media message to the Conversation by attaching the media instance that you created in Step 1 to a new Conversation Message

Uploading media should be done directly from the source machine, using native HTTP facilities. Using cURL, the equivalent request looks like this:

```bash
curl -u "<account_sid>:<account_secret>" --data-binary "@<filename>" https://mcs.us1.twilio.com/v1/Services/<chat_service_sid>/Media
```

The response to your POST request to create a Media instance via MCS contains a Media SID. You can attach the newly uploaded Media file to a Conversation message using that returned Media SID. You can consult the Conversation Message Resource documentation for more information about creating a new Conversation Message with the REST API that includes the media parameter.

```bash
curl -u "<account_sid>:<account_secret>" -X POST https://conversations.twilio.com/v1/Conversations/<conversation_sid>/Messages -d MediaSid=<media_sid>
```

Uploaded media will be automatically garbage-collected by Twilio unless it is attached to a Conversations message within five minutes. If you attempt to send a media message after it is garbage collected, the operation will fail (no media with the given SID exists anymore).

## Limitations

Conversations is a cross-channel messaging product, so each channel has a different set of limitations about incoming media files. Please refer to the Media Limits documentation for channel-specific information and supported file types.