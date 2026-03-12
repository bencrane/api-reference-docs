# Debugging Your Twilio Application

Integrating Twilio products into your software is straightforward, but as you build and test your application, you may run into issues that you didn't expect. Here are some tips that we have found useful to assist your debugging work.

## Break the problem down

The first thing to do is break the problem down into smaller parts. For instance, if you are using the REST API to make an outbound phone call, there are various things taking place:

1. Your code uses an SDK to invoke Twilio's REST API.
2. Twilio authenticates your HTTP request and validates the provided parameters.
3. Twilio places an outbound phone call.
4. Twilio makes an HTTP request to the webhook you specified, once the recipient answers the call.
5. Twilio parses and executes the TwiML returned from the webhook.

Any of those steps could experience an issue, whether it's a network outage or an invalid TwiML being executed. If possible, test each of these steps independently to isolate the issue.

## Debugging webhooks

If you're experiencing an issue with a webhook that you've configured, there are several things you can do to track down the source of the problem.

### Check the error logs

First, check out the error logs. When Twilio runs into a problem with your webhook, it will log information about this. The error logs flag these debugging events as either errors or warnings. Warnings mean Twilio encountered an issue but could still process the request. An error is more severe and means that Twilio could not process the request at all. When you review these debugging events, you'll have access to:

- The exact error or warning that occurred.
- Potential causes for this error.
- Suggested solutions.
- The entire HTTP request and response associated with this webhook request.

### Run the webhook in your browser

Remember, you're writing a web application. There's nothing Twilio does that you can't test right there in your browser. Visit the URLs in your web browser, and check that you don't have any errors.

- Firefox treats XML files nicely, highlighting any invalid XML in your document.
- Mimic Twilio's data passing by manually adding data to your URLs. For example, if you ask Twilio to digits and the action is `http://www.myapp.com/handleDigits.php`, you can open your browser to `http://www.myapp.com/handleDigits.php?Digits=1` to verify what happens if the user presses 1.
- Make sure your application isn't sending debug output because that will nearly always cause problems. You can, however, wrap any such output in XML comment blocks. They're the same as HTML comment blocks: `<!-- COMMENTS HERE -->`

### Check for HTTP redirects

Twilio is a well-behaved HTTP client, so when it receives an HTTP 301 or 302 redirect, it will follow it to the specified URL. However, on the subsequent request, it will not include the original parameters. Occasionally you may see parameters such as Digits or RecordingUrl not arriving where you expect them. In this scenario, make sure the URL is not returning a redirect.

As an example, when a `<Gather>` request is made to the action URL, the POST request includes a Digits parameter. If the action URL redirects to another URL, Twilio will follow the redirect and issue a GET request to the specified URL. This GET request will include the standard set of parameters included with every Twilio request, but will not include the additional Digits parameter.

Common situations that may return unexpected redirects are:

- A server that automatically redirects all HTTP requests to HTTPS.
- A URL rewriting rule that rewrites request URLs to include or exclude `www.`.

To see what your server is returning to Twilio, create a test request using curl, Postman or your HTTP client of choice and inspect the response returned from your URL.

## Debugging calls to the REST API

While errors and warnings related to Twilio invoking your webhooks are available in the error logs, the REST API will synchronously return an error object to your application in the event an error takes place. The error object will contain the HTTP response status code, a Twilio-specific error code, an error message, and a link to the Error Code Reference. For example:

```json
{
  "code": 21211,
  "message": "The 'To' number 5551234567 is not a valid phone number.",
  "more_info": "https://www.twilio.com/docs/errors/21211",
  "status": 400
}
```

## Stream error Logs to Amazon Kinesis

Twilio Event Streams is an API that allows you to subscribe to a unified stream of interactions across different Twilio products. You can stream your data to your existing systems by configuring a streaming technology like Amazon Kinesis, or a webhook. Error log events will be generated on Event Streams for all errors and warnings on your Twilio applications. Learn more about the events here.