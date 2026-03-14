# Preventing Fraud in Programmable Messaging

One of the challenges of operating globally is the increased exposure to fraud.

A common type of attack we see is SMS pumping, where fraudsters take advantage of a phone number input field to receive a one-time passcode, an app download link, or anything else via SMS. The messages are sent to a range of numbers controlled by a specific mobile network operator (MNO) and the fraudsters get a share of the generated revenue. Phone number verification and two-factor authentication (2FA) flows are often exploited for this purpose.

The attack causes inflated traffic to your app with the intent to make money and not to steal information. While the specific ways attackers monetize fraud is different, the strategies you can implement to reduce fraud are similar.

> **Danger**
> Customer participation is essential to successfully defend against fraud. No provider-side solution can guarantee 100% effectiveness against sophisticated attackers.

## Recommended actions to prevent fraud

### Use Verify to send verifications and enable Verify Fraud Guard

Verify is the market leading dedicated authentication and identity solution perfect for preventing SMS pumping in phone number verification flows.

Twilio recommends enabling Verify Fraud Guard on your account. When enabled, this feature will block the transmission of suspicious and likely fraudulent SMS messages preventing unnecessary charges to your account.

### Activate the SMS Pumping Protection feature for Programmable Messaging

If migration to Verify isn't possible due to your use case or configuration, be sure the SMS Pumping Protection feature for Programmable Messaging is enabled. When enabled, this feature will block the transmission of suspicious and likely fraudulent SMS messages preventing unnecessary charges to your account.

### Implement geographic permissions to restrict destination countries

Review our SMS Geo Permissions Guide and check the appropriateness of your Geographic Permissions in Console. Disable all countries that you do not plan to send messages to.

You can also build a programmatic allow list or block list based on the country codes of the phone number with our free Lookup formatting API.

If you have an estimate on the number of SMS messages you'd expect per day in a given country, you can set rate limits on groups of countries, allowing relaxed rate limits in countries where you expect legitimate users, and more restricted rate limits in all other countries.

### Detect bots and refresh your user experience to prevent them

Libraries like botd or CAPTCHAs can help detect and deter bot traffic. Small changes to your user experience like ensuring that your users confirm their email address introduce a small amount of friction for legitimate users but can deter automated scripts and bots.

### Set rate limits

Make sure your app will not send more than 1 message per X seconds to the same mobile number range or prefix. Implement rate limits by user, IP, or device identifier. You can use a CDN like Cloudflare or implement modules in your web server like Nginx and Apache for basic rate limiting.

Rate limits may not prevent fraud but can slow the attackers down enough that they decide it's not worth it to go after your app.

### Implement exponential delays between retry requests

Similar to rate limits, implementing exponential delays between requests to the same phone number is one way to prevent rapid sending. Learn more about our recommendations for retry logic for SMS two-factor authentication in this blog post.

**Good Example** - "Call me instead" option is not visible until 3 time-delayed SMS attempts.

**Bad Example** - "Call me instead" option is visible at any time and can be repeatedly submitted.

### Look up the phone number before sending

Use Carrier Lookup to get the line type of a number then only send SMS to mobile numbers. You can also use this API request to determine the carrier and block carriers that may be (knowingly or not) causing inflated traffic. Learn more about how to build a carrier block list with Lookup in this blog post.

### Analyze IP and detect VPNs

Analyze IP location, IP owner (ISP/proxy/TOR/cloud provider, etc), and IP against the bad reputation list. Block TOR/Cloud Providers/proxies/bad IPs.

While there are legitimate use cases for VPNs, attackers will likely use one to bypass I.P. address blocking and this is a signal that something might be awry. There are a lot of solutions for VPN detection out there to choose from.

## What to do if you suspect fraud on your Twilio account

If you face messaging abuse, email fraud@twilio.com. Include the following details in your message:

```
Account SID: 
Product Type: 
Date/time Range: 
To/Recipient Country: 
Workspace SID: 
Description of Activity:
```

## What's next?

Here are some more resources that you might enjoy:

- What Is SMS Pumping Fraud?
- Anti-Fraud Developer Guide
- SMS Pumping Protection for Programmable Messaging
- Best practices for phone number validation during new user enrollment