# Security

## Encrypted communication

Twilio supports encryption to protect communications between Twilio and your web application. Specify an HTTPS URL. Twilio will not connect to an HTTPS URL with a self-signed certificate, so use a certificate from a provider such as Let's Encrypt.

> **Warning**
> Do not pin Twilio certificates. Twilio rotates certificates without notice.

Twilio can use the HTTP protocol for callbacks—for instance, if you're working on a development environment that doesn't have SSL certificates installed. On your Twilio project's Settings page in the Console, the SSL Certificate Validation setting enforces validation on webhooks.

Here is the list of supported TLS ciphers for callbacks.

## HTTP authentication

Twilio supports HTTP Basic and Digest Authentication. This allows you to password-protect the TwiML URLs on your web server so that only you and Twilio can access them.

Provide a username and password using the following URL format:

```
https://username:password@www.myserver.com/my_secure_document
```

> **Warning**
> Twilio supports the TLS cryptographic protocol. Twilio can't handle self-signed certificates, and support for SSLv3 is officially deprecated.

> **Warning**
> Be careful to not include any special characters, such as &, `:`, etc., in your username or password.

Twilio will authenticate to your web server using the provided username and password and will remain logged in for the duration of the call. We highly recommend that you use HTTP Authentication in conjunction with encryption. To learn more about Basic and Digest Authentication, refer to your web server documentation.

If you specify a password-protected URL, Twilio will first send a request with no Authorization header. After your server responds with a 401 Unauthorized status code, a WWW-Authenticate header and a realm in the response, Twilio will make the same request with an Authorization header.

The following example shows a response from your server:

```
HTTP/1.1 401 UNAUTHORIZED
WWW-Authenticate: Basic realm="My Realm"
Date: Wed, 21 Jun 2017 01:14:36 GMT
Content-Type: application/xml
Content-Length: 327
```

## Protect media access with HTTP basic authentication

Media files, such as call recordings in Programmable Voice or an image associated with any Programmable Messaging channel (for example, MMS, WhatsApp, or Facebook), can be stored in our Services.

Requiring HTTP Basic Authentication for stored media is considered industry best practice. Twilio implements this for all applicable Services. Some of our products such as Programmable Voice and Programmable Messaging support HTTP Basic Authentication. However, they aren't turned on by default. This opt-in setting applies to your Twilio account and any subaccounts.

To protect media access, you can enforce authentication by turning on HTTP Basic Authentication in your Twilio Account. This setting requires your Twilio Account SID and Auth Token or API Key for all requests to access media files.

Twilio highly recommends turning on HTTP Basic Authentication for your media, especially if it contains sensitive data.

Turn on HTTP Basic Authentication for media access in the following Services and functionalities:

- Programmable Messaging (for example, MMS, WhatsApp Facebook Business Messenger)
- Programmable Voice (for example, call recordings)

## HTTPS and TLS

To secure your web application, ensure that you're using HTTPS for your web application's endpoint. Twilio won't connect to an HTTPS URL with a self-signed certificate, so use a certificate from a provider such as Let's Encrypt.

Twilio can use the HTTP protocol for callbacks. For instance, if you're working on a development environment that doesn't have SSL certificates installed. On your Twilio project's Settings page in the Console, the SSL Certificate Validation setting enforces validation on webhooks.

Here is the list of supported TLS ciphers for callbacks.

## Validating requests are coming from Twilio

If your application exposes sensitive data or modifies your data, you may want to verify that HTTP requests to your web application come from Twilio. This ensures they're not from a malicious third party. To provide this level of security, Twilio cryptographically signs its requests.

Here's how it works:

1. Turn on TLS on your server and configure your Twilio account to use HTTPS URLs.
2. Twilio assembles its request to your application, including the final URL and any POST fields.
   - If your request is a POST, Twilio takes all the POST fields, sorts them alphabetically by their name, and concatenates the parameter name and value to the end of the URL (with no delimiter). Only query parameters get parsed to generate a security token, not the POST body.
   - If the request is a GET, the final URL includes all of the Twilio request parameters appended in the query string of your original URL using the standard delimiter & between the name and value pairs.
3. Twilio takes the resulting string (the full URL with the scheme, port, query string and any POST parameters) and signs it using HMAC-SHA1 and your AuthToken as the key.
4. Twilio sends this signature in an HTTP header called X-Twilio-Signature

To verify the authenticity of the request, you can leverage the built-in request validation method provided by all of our SDKs:

### Validate Signature of Request (x-www-form-urlencoded body)

```python
import os
# Download the twilio-python library from twilio.com/docs/python/install
from twilio.request_validator import RequestValidator

# Your Auth Token from twilio.com/user/account
auth_token = os.environ['TWILIO_AUTH_TOKEN']

# Initialize the request validator
validator = RequestValidator(auth_token)

# Store Twilio's request URL (the url of your webhook) as a variable
url = 'https://example.com/myapp'

# Store the application/x-www-form-urlencoded parameters from Twilio's request as a variable
# In practice, this MUST include all received parameters, not a
# hardcoded list of parameters that you receive today. New parameters
# may be added without notice.
params = {
  'CallSid': 'CA1234567890ABCDE',
  'Caller': '+12349013030',
  'Digits': '1234',
  'From': '+12349013030',
  'To': '+18005551212'
}

# Store the X-Twilio-Signature header attached to the request as a variable
twilio_signature = 'Np1nax6uFoY6qpfT5l9jWwJeit0='

# Check if the incoming signature is valid for your application URL and the incoming parameters
print(validator.validate(url, params, twilio_signature))
```

### Validate Signature of Request (application/json body)

```python
import os
# Download the twilio-python library from twilio.com/docs/python/install
from twilio.request_validator import RequestValidator

# Your Auth Token from twilio.com/user/account
auth_token = os.environ['TWILIO_AUTH_TOKEN']

# Initialize the request validator
validator = RequestValidator(auth_token)

# Store Twilio's request URL (the url of your webhook) as a variable
# including all query parameters
url = 'https://example.com/myapp?bodySHA256=5ccde7145dfb8f56479710896586cb9d5911809d83afbe34627818790db0aec9'

# Store the application/json body from Twilio's request as a variable
# In practice, this MUST include all received parameters, not a
# hardcoded list of parameters that you receive today. New parameters
# may be added without notice.
body = """{"CallSid":"CA1234567890ABCDE","Caller":"+12349013030"}"""

# Store the X-Twilio-Signature header attached to the request as a variable
twilio_signature = 'hqeF3G9Hrnv6/R0jOhoYDD2PPUs='

# Check if the incoming signature is valid for your application URL and the incoming body
print(validator.validate(url, body, twilio_signature))
```

If the method call returns true, then the request can be considered valid and it is safe to proceed with your application logic.

> **Info**
> We highly recommend you use the SDKs to do signature validation.

## Explore the algorithm yourself

Follow these steps to perform the validation on your end:

1. Take the full URL of the request URL you specify for your phone number or app, from the protocol (https...) through the end of the query string (everything after the ?).
2. If the request is a POST, sort all the POST parameters alphabetically (using Unix-style case-sensitive sorting order).
3. Iterate through the sorted list of POST parameters, and append the variable name and value (with no delimiters) to the end of the URL string.
4. Sign the resulting string with HMAC-SHA1 using your AuthToken as the key (remember, your AuthToken's case matters!).
5. Base64-encode the resulting hash value.
6. Compare your hash to ours, submitted in the X-Twilio-Signature header. If they match, then you're good to go.

The following example shows a POST request from Twilio to your application as part of an incoming call webhook:

```
https://example.com/myapp.php?foo=1&bar=2
```

In this example, Twilio posted some digits from a Gather to that URL, in addition to all the usual POST fields:

- Digits: 1234
- To: +18005551212
- From: +14158675310
- Caller: +14158675310
- CallSid: CA1234567890ABCDE

Create a string that is your URL with the full query string:

```
https://example.com/myapp.php?foo=1&bar=2
```

Then, sort the list of POST variables by the parameter name (using Unix-style case-sensitive sorting order):

- CallSid: CA1234567890ABCDE
- Caller: +14158675310
- Digits: 1234
- From: +14158675310
- To: +18005551212

Next, append each POST variable, name, and value to the string with no delimiters:

```
https://example.com/myapp.php?foo=1&bar=2CallSidCA1234567890ABCDECaller+14158675310Digits1234From+14158675310To+18005551212
```

Hash the resulting string using HMAC-SHA1, using your AuthToken Primary as the key.

Suppose your AuthToken is 12345. Take the hash value returned from the following function call (or its equivalent in your language of choice):

```
hmac_sha1(https://example.com/myapp.php?foo=1&bar=2CallSidCA1234567890ABCDECaller+14158675310Digits1234From+14158675310To+18005551212, 12345)
```

Take the Base64 encoding of the hash value (so it's only ASCII characters):

```
L/OH5YylLD5NRKLltdqwSvS0BnU=
```

Finally, compare that to the hash Twilio sent in the X-Twilio-Signature HTTP header. If they match, the request is valid.

> **Warning**
> This example is for illustrative purposes only. When validating requests in your application, only use the provided helper methods.

## A few notes

- If the Content-Type is application-json, don't use the JSON body to fill in the validator's parameter for POST parameters.
- The query parameter bodySHA256 will be included in the request.
- Its value is calculated as the hexadecimal representation of the SHA-256 hash of the request body.
- Some frameworks may trim whitespace from POST body fields. A notable example is Laravel, which has the TrimStrings middleware turned on by default. You must turn off these behaviors to successfully match signatures generated from fields that have leading or trailing whitespace. Certain Node.js middleware may also trim whitespace from requests.
- When constructing the request body to be sent (as can be done in the Studio HTTP Request widget) ensure that no hidden whitespaces are in the body.
- When creating the hash make sure you are using your Primary AuthToken as the key. If you have recently created a secondary AuthToken, this means you still need to use your old AuthToken until the secondary one has been promoted to your primary AuthToken.
- The HMAC-SHA1 secure hashing algorithm should be available in all major languages, either in the core or via an extension or package.
- If your URL uses an "index" page, such as index.php or index.html to handle the request, such as: `https://example.com/twilio` where the real page is served from `https://example.com/twilio/index.php`, then Apache or PHP may rewrite that URL so it has a trailing slash, e.g., `https://example.com/twilio/`. Using the code above, or similar code in another language, you could end up with an incorrect hash, because Twilio built the hash using `https://example.com/twilio` and you may have built the hash using `https://example.com/twilio/`.
- For SMS and voice callbacks over HTTP:
  - Twilio will drop the username and password (if any) from the URL before computing the signature.
  - Twilio will keep the port (if any) in the URL when computing the signature.
- For SMS callbacks over HTTPS:
  - Twilio will drop the username and password (if any) from the URL before computing the signature.
  - Twilio will keep the port (if any) in the URL when computing the signature.
- For voice callbacks over HTTPS:
  - Twilio will drop the username and password (if any) from the URL before computing the signature.
  - Twilio will also drop the port (if any) from the URL before computing the signature.
- For voice WSS handshake requests:
  - If you are having trouble verifying a WebSocket handshake request (e.g., for Programmable Voice Media Streams), try appending a trailing / character to the URL that you pass to the signature validation method.

> **Info**
> **A note on HMAC-SHA1**
> Concerned about SHA1 security issues? Twilio does not use SHA-1 alone.
>
> The critical component of HMAC-SHA1 that distinguishes it from SHA-1 alone is the use of your Twilio AuthToken as a complex secret key. While there are possible collision-based attacks on SHA-1, HMACs aren't affected by those same attacks. The combination of the underlying hashing algorithm (SHA-1) and the strength of the secret key (AuthToken) protects you in this case.

## Test the validity of your webhook signature

> **Info**
> It's a great idea to test your webhooks and ensure that their signatures are secure. The following sample code can test your unique endpoint against both valid and invalid signatures.

Complete the following steps to make this test work for you:

1. Set your Auth Token as an environment variable
2. Set the URL to the endpoint you want to test
3. If testing BasicAuth, change HTTPDigestAuth to HTTPBasicAuth

### Test the validity of your webhook signature (x-www-form-urlencoded body)

```python
# Download the twilio-python library from twilio.com/docs/python/install
from twilio.request_validator import RequestValidator
from requests.auth import HTTPDigestAuth
from requests.auth import HTTPBasicAuth
import requests
import urllib
import os

# Your Auth Token from twilio.com/user/account saved as an environment variable
# Remember never to hard code your auth token in code, browser Javascript, or distribute it in mobile apps
# To set up environmental variables, see http://twil.io/secure
auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
validator = RequestValidator(auth_token)

# Replace this URL with your unique URL
url = 'https://mycompany.com/myapp'
# User credentials if required by your web server. Change to 'HTTPBasicAuth' if needed
auth = HTTPDigestAuth('username', 'password')

params = {
    'CallSid': 'CA1234567890ABCDE',
    'Caller': '+12349013030',
    'Digits': '1234',
    'From': '+12349013030',
    'To': '+18005551212'
}

def test_url(method, url, params, valid):
    if method == "GET":
        url = url + '?' + urllib.parse.urlencode(params)
        params = {}

    if valid:
        signature = validator.compute_signature(url, params)
    else:
        signature = validator.compute_signature("http://invalid.com", params)

    headers = {'X-Twilio-Signature': signature}
    response = requests.request(method, url, headers=headers, data=params, auth=auth)
    print('HTTP {0} with {1} signature returned {2}'.format(method, 'valid' if valid else 'invalid', response.status_code))


test_url('GET', url, params, True)
test_url('GET', url, params, False)
test_url('POST', url, params, True)
test_url('POST', url, params, False)
```

### Test the validity of your webhook signature (application/json body)

```python
# Download the twilio-python library from twilio.com/docs/python/install
from twilio.request_validator import RequestValidator
from requests.auth import HTTPDigestAuth
from requests.auth import HTTPBasicAuth
import requests
import urllib
import os

# Your Auth Token from twilio.com/user/account saved as an environment variable
# Remember never to hard code your auth token in code, browser Javascript, or distribute it in mobile apps
# To set up environmental variables, see http://twil.io/secure
auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
validator = RequestValidator(auth_token)

# Replace this URL with your unique URL
url = "https://example.com/myapp?bodySHA256=5ccde7145dfb8f56479710896586cb9d5911809d83afbe34627818790db0aec9"
# User credentials if required by your web server. Change to 'HTTPBasicAuth' if needed
auth = HTTPDigestAuth('username', 'password')

params = {}
body = """{"CallSid":"CA1234567890ABCDE","Caller":"+12349013030"}"""

def test_url(method, url, params, valid):
    if valid:
        signature = validator.compute_signature(url, params)
    else:
        signature = validator.compute_signature("http://invalid.com", params)

    headers = {'X-Twilio-Signature': signature,'Content-Type: application/json'}
    response = requests.request(method, url, headers=headers, data=body, auth=auth)
    print('HTTP {0} with {1} signature returned {2}'.format(method, 'valid' if valid else 'invalid', response.status_code))

test_url('GET', url, params, True)
test_url('GET', url, params, False)
test_url('POST', url, params, True)
test_url('POST', url, params, False)
```

## Validation using the Twilio SDKs

All the official Twilio SDKs ship with a Utilities class which facilitates request validation. Head over to the libraries page to download the library for your language of choice.

## Your Auth Token

Keep your AuthToken secure. It provides access to the REST API and to request signatures. Learn how to secure this token using environment variables.

## What's next?

- See Secure your credentials to learn best practices for storing and managing your Twilio credentials.
- See Twilio Helper Libraries to download SDKs with built-in security features for your programming language.
- See API security best practices to learn how to interact securely with the Twilio API.