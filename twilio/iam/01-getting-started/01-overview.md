# Our API: the basics

The Twilio REST API allows you to query metadata about your **account**, **phone numbers**, calls, text messages, and recordings. You can also do some fancy things like **make outbound phone calls** and **send text messages**.

## Base URL

All URLs referenced in the documentation have the following base:

```
https://api.twilio.com/2010-04-01
```

The Twilio REST API is served over HTTPS. To ensure data privacy, unencrypted HTTP is not supported.

## Authentication

To authenticate requests to the Twilio APIs, Twilio supports **HTTP Basic authentication**. Use your API key as the username and your API key secret as the password. You can create an API key either **in the Twilio Console** or **using the API**.

> **Note:** Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth Token as the password. You can find your Account SID and Auth Token in the **Twilio Console**.

Learn more about **Twilio API authentication**.

```
curl -G https://api.twilio.com/2010-04-01/Accounts \
-u $TWILIO_API_KEY:$TWILIO_API_KEY_SECRET
```

## Subresources

Twilio Accounts have the following subresources. Click on a link to read the API documentation for accessing or modifying each resource:

### Phone Numbers

- **Search for Phone Numbers**
- **Purchase Phone Numbers**
- **Update Phone Number Properties**
- **Addresses**

### Usage

- **View Usage Data for an Account**
- **Set Triggers for Usage Thresholds**

### Accounts

- **Accounts**
- **Subaccounts**

### Applications

- **Applications**
- **Connect Apps**
- **Authorized Connect Apps**

## Make calls with Twilio

Twilio's **Voice API** enables you to make, retrieve, control and monitor calls. Using this REST API, you can **make outbound phone calls**, **modify calls in progress**, and **query metadata** about calls. See the **Voice API Documentation** for guides, REST resources, and **troubleshooting tips**.

## Connect with SIP

Programmable Voice SIP lets you route your voice calls with global reach to any landline phone, mobile phone, browser, mobile app, or any other SIP endpoint. Check out Twilio's **SIP Resources for Voice** including **SIP Domains**, **IP Access Control Lists**, and **Credential Lists**.

## Send messages with Twilio

With Twilio's Messaging API, you can send and receive **SMS** and **MMS** messages as well as query meta-data about text messages such as **delivery status**, **associated media**, and leverage tools like **Messaging Services** to manage your messages globally at scale. Check out our **Messaging API Documentation** for guides, REST resources, and **debugging tips**.