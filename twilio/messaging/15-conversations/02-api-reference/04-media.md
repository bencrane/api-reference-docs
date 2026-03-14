# Conversations Media Resource

The Media resource in Twilio's Media Content Service allows you to upload/download files for use in other Twilio products. You can attach these media files to Conversation Messages as part of the Media Messaging feature.

**Note:** The Media REST resource is accessed via a separate sub-domain from Chat and other Twilio products. The base URL for Media via the Media Content Service (MCS) is:

```
https://mcs.us1.twilio.com/v1
```

## Authentication

To authenticate requests to the Twilio APIs, Twilio supports **HTTP Basic authentication**. Use your API key as the username and your API key secret as the password. You can create an API key either in the Twilio Console or using the API.

**Note:** Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth token as the password. You can find your Account SID and Auth Token in the Twilio Console.

Learn more about **Twilio API authentication**.

```bash
curl -G https://mcs.us1.twilio.com/v1/Services \
    -u $TWILIO_API_KEY:$TWILIO_API_KEY_SECRET
```

> **Info**
> You can't use the Twilio server-side SDKs or the Twilio CLI to make requests to the Media resource.

## Properties

Each Media resource instance has these properties:

| Name | Description |
|------|-------------|
| `sid` | A 34-character string that uniquely identifies this resource. |
| `account_sid` | The unique id of the Account responsible for this message. |
| `service_sid` | The unique id of the Chat Service this message belongs to. |
| `date_created` | The date that this resource was created. |
| `date_updated` | The date that this resource was last updated, null if the message has not been edited. |
| `channel_sid` | The unique id of the Conversation (same as the underlying Chat Channel) containing the Message that this media instance was added to. |
| `message_sid` | The unique id of the Conversation Message this media instance was added to. |
| `size` | The size of the file this Media instance represents in BYTES. |
| `content_type` | The MIME type of the file this Media instance represents. Please refer to the MIME Types for a list of valid MIME types. |
| `file_name` | The filename of the underlying media file as specified when uploaded. |
| `author` | The identity of the User that uploaded the Media instance. This is automatically set to sender when using the REST API. |
| `url` | An absolute URL for this media instance. |
| `links` | Links to access the underlying media file (content) and a temporary URL to use to access this (content_direct_temporary). |

---

## Create/Upload a new Media resource

```
POST /Services/{Chat Service SID}/Media
```

**Note:** The Chat Service SID must be the Chat Service Instance that this Media instance will be used for. You can find the Chat Service SID as a property of the Conversation to which you want to add a new media message.

To create a new media instance, you should upload the media file itself as content on the POST request. (See Curl Example below.)

Ultimately, this will be converted into a POST request, containing the following headers and the file itself as the request body.

### Headers

| Name | Description |
|------|-------------|
| `Content-Type` | The MIME type of the file this Media instance represents. Please refer to the MIME Types for a list of valid MIME types. This should be set explicitly by the API caller or automatically detected by the client. |
| `Content-Size` | The size of the media (the file) being uploaded in bytes. |

### Body

The body or content of the POST must be the file itself in binary format.

### Curl Example

```bash
curl -u "<account_sid>:<account_secret>" --data-binary @<filename.png> -H "Content-Type: <content-type of upload>" https://mcs.us1.twilio.com/v1/Services/<chat_service_sid>/Media
```

---

## Retrieve a Media resource

You can retrieve an uploaded Media resource by issuing a GET request with the SID of the media instance:

```
GET /Services/{Chat Service SID}/Media/{Media SID}
```

### Curl Example for retrieving a media resource

```bash
curl -u "<account_sid>:<account_secret>" -G https://mcs.us1.twilio.com/v1/Services/<chat_service_sid>/Media/<Media SID>
```