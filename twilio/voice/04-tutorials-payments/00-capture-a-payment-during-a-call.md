# How to capture your first payment using <Pay>

In this tutorial, you'll create an interactive voice response (IVR) that collects payment details from a customer and passes the information in a PCI-compliant manner to your payment processor of choice. You'll use a TwiML Bin with the <Pay> verb and the Stripe Pay Connector to charge a credit card.

Flowchart showing Twilio Pay process with TwiML and Stripe integration.

In this tutorial you will learn how to:

- Enable PCI Mode on your account
- Create a Stripe account
- Configure a Stripe Pay Connector
- Create a TwiML Bin with <Pay>
- Create a Twilio Function that handles the payment result and provides new TwiML instructions
- Buy a Twilio phone number
- Configure the Twilio phone number to use the TwiML Bin for incoming calls
- Test capturing credit card details and see the resulting charge on your Stripe account

## 1. Enable PCI Mode

To use Twilio's Pay Connectors, you must enable PCI mode in the Twilio Console. This ensures Twilio captures payment details in a PCI-compliant manner and redacts sensitive PCI information from all call logs. Learn more about PCI workflows.

> **Danger**
> PCI Mode will redact sensitive information from ALL of your account's logs. Turning on PCI Mode cannot be undone.
>
> If you want to avoid redacting information from all logs on an account, consider creating another Twilio account, enable PCI Mode on that account, and use that account when collecting payments with <Pay> or Agent Assist/Payment API.

To enable PCI Mode, complete the following steps:

1. Navigate to the Twilio Voice Settings in the Twilio Console. (In the left navigation pane, click on Voice > Settings > General.)
2. Click on the Enable PCI Mode button.
3. Click on I Agree on the pop up to accept Twilio's Terms of Service.
4. Click on the Save button.

## 2. Create a Stripe Account

<Pay> allows you to use a variety of payment providers; we will use Stripe for this tutorial.

To get started, head over to Stripe to create your account.

## 3. Configure Stripe Pay Connector

In order to authorize Twilio to create charges and create tokens on your behalf, you must connect your Stripe account to Twilio's Stripe Connect platform. Complete the following steps:

1. In your Twilio Console, navigate to Pay Connectors under Voice > Manage > Pay Connectors in the left navigation pane and click on the Stripe Connector tile.
2. Click on Install.
3. On the pop-up, read the Terms of Service. Click the checkbox next to I agree to Twilio Inc's Terms of Service and click Agree & Install.
4. Enter Default for the UNIQUE NAME.

Stripe Connector configuration with 'Default' as the unique name.

You can create one Pay Connector per Twilio account with the name Default. When <Pay> is invoked, if the paymentConnector attribute is not specified then the Default Pay Connector is used.

5. Click on Connect with Stripe, which redirects you to Stripe. Enter your Stripe credentials and answer the prompts with your business details. If your Stripe account has not been activated to allow you to accept payments in live mode, then you can bypass entering your business details at this point and click the link at the top Skip this account form. You are then redirected back to Twilio.

Configure tab with Connect with Stripe button highlighted.

You are directed back to the Stripe Connector page in the Twilio Console. Notice that the STRIPE ACCOUNT ID (acct_XXXXXXXXXXXXXXX) is now shown on the page. If you have multiple Stripe accounts for Dev/Stage/Prod, the Account ID helps you differentiate these accounts for each Stripe Connector Instance

## 4. Create a TwiML Bin with <Pay>

Next, we'll use a TwiML Bin to provide Twilio with the <Pay> TwiML instruction. When Twilio executes the <Pay> verb, a customer will hear prompts to enter their payment information.

1. Open a new browser tab and navigate to the TwiML Bins page in your Twilio Console.
2. Click on the blue + button to create a new TwiML Bin
3. Give the TwiML Bin a FRIENDLY NAME of "<Pay> with Stripe"
4. Copy and paste the following TwiML into the TWIML input box:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Calling Twilio Pay</Say>
  <Pay paymentConnector="Default" action="" chargeAmount="20.45"/>
</Response>
```

Notice how the <Pay> verb has three attributes: paymentConnector, action, and chargeAmount.

- The paymentConnector attribute's value is the Pay Connector you want to use with this <Pay> verb. In this case, it's the Generic Pay Connector you just created called "Default".
- The action attribute is left blank for now. This attribute will be a URL. Upon the completion of a <Pay> transaction, Twilio will send a webhook to your action URL to get a new set of TwiML instructions. We'll create an endpoint in the next step that handles the request to this action attribute.
- The chargeAmount attribute is set to 20.45, representing a charge of $20.45. (If you wanted to create a tokenize transaction, you would set this attribute value to 0 or omit the attribute altogether.)

5. Click the Save button at the bottom of the page.

## 5. Create a Twilio Function to handle the payment result

When <Pay> completes capturing the consumers' credit card, the Pay Connector initiates a transaction with the Payment Provider. Next, the Twilio sends an HTTP request to <Pay>'s action URL with a status returned.

You will use Twilio's Serverless Functions to write and host the endpoint for our action URL. Twilio Functions allow you deploy Node.js-based applications without needing to install anything locally on your own machine.

1. Navigate to the Functions > Services page in your Twilio Console.
2. Click on the Create Service button to create a new Functions service.
3. In the Name your Service pop up, give your service the name pay-with-stripe-action-url
4. Click Next on the Name your Service pop up.
5. In the Functions pane on the top left, rename the /path_1 Function to /pay and hit Enter.

Function name input field with '/pay' entered.

6. Next to the /pay path name, you should see a lock icon (When you hover over it, a "Protected" tooltip shows.). Click on the lock icon and click on Public.

Visibility options for Functions: Private, Protected, and Public.

7. Select all of the provided sample code in the code editor pane and delete it.
8. Copy and paste the following code into the code editor of your /pay function:

```javascript
exports.handler = function(context, event, callback) {
    console.log("in Pay");
    console.log(event);
    console.log(event.Result);

    let twiml = new Twilio.twiml.VoiceResponse();

    switch (event.Result) {
    case "success":
        text = "Thank you for your payment";
        break;
    case "payment-connector-error":
        text = "The Payment Gateway is reporting an error";
        console.log(decodeURIComponent(event.PaymentError));
        break;

    default: 
        text = "The payment was not completed successfully";
}
    twiml.say(text);
    callback(null, twiml);
};
```

Your Functions editor should now look like this:

Code editor showing a function handling payment success and error cases.

This Function checks the Result property in the request from Twilio. If the Result is "success", the Function returns the following TwiML:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Thank you for your payment</Say>
</Response>
```

If the Result is "payment-connector-error", the function returns the following TwiML:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>The payment was not completed successfully</Say>
</Response>
```

9. Click on the blue Save button at the bottom of the code editor pane.
10. Click the Deploy All button at the bottom of the page. This deploys your Twilio Function to the internet.

Blue button labeled 'Deploy All'.

11. Click on the Enable live logs switch so that you'll see live logs when your /pay endpoint receives a request from Twilio.

Toggle switch indicating live logs are enabled.

12. Now, copy the URL for your new endpoint by clicking on Copy URL (above the Live logs on toggle).
13. In a new browser tab, navigate to the <Pay> with Stripe TwiML Bin you created earlier.
14. Paste the Function URL from step 12 between the double quotation marks after action= (i.e. in the place of https://example.com/pay below).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Calling Twilio Pay</Say>
  <Pay paymentConnector="Default" chargeAmount="20.45" 
    action="https://example.com/pay"/>
</Response>
```

15. Click Save on the TwiML Bin page.

Now it's time to purchase Twilio phone number and configure it to use the <Pay> instructions in the TwiML Bin.

## 6. Purchase a Twilio phone number

If you don't already own a Twilio Voice-enabled phone number, complete the following steps:

1. In the Twilio Console, navigate to the Buy a Number page.
2. Make sure the "Voice" checkbox is checked and click the Search button.

Buy a number interface with country selection and capabilities filters, highlighting the Search button.

3. You'll see a list of available phone numbers and their capabilities. Find a number that you like and click the Buy button.

List of phone numbers with buy buttons and monthly fees.

4. In the"Review Phone Number" pop-up, review the information and click on Buy (xxx) xxx-xxxx to confirm your purchase.

## 7. Configure a Twilio number to use your <Pay> TwiML Bin for incoming calls

Now you'll navigate to the configuration page for the phone number and configure it to use your <Pay> with Stripe TwiML Bin when someone calls the number.

1. If you see the Number Purchased modal from the last step, click on Configure (xxx) xxx-xxxx. (If you navigated away from the previous step, navigate to Phone Numbers > Active numbers in the left navigation pane and select the phone number you just bought.)
2. Give the phone number a FRIENDLY NAME of "<Pay> Tutorial".
3. Scroll down to the Voice & Fax section.
4. Find the A CALL COMES IN label.
5. Click on the dropdown (it currently says "Webhook") and select TwiML Bin.
6. In the dropdown that says Select a TwiML Bin (directly under the dropdown from the previous step), select <Pay> with Stripe.
7. Click the blue Save button at the bottom of the page.

## 8. Test your application

Before you call your Twilio phone number, review what should happen:

1. You dial your Twilio phone number
2. The phone number's configuration points to the <Pay> with Stripe TwiML Bin.
3. Twilio executes the <Pay> verb, so you hear prompts to enter your payment details.
4. You enter your payment details.
5. Twilio sends a request to Stripe via your Default Stripe Pay Connector.
6. Stripe returns a response to Twilio.
7. Twilio sends a request with the result of the payment to your Twilio Function (the URL of <Pay>'s action attribute).
8. The payment is successful, so your Twilio Function sends <Say>Thank you for your payment.</Say> TwiML back to Twilio.
9. You hear "Thank you for your payment" and the call ends.

### Test it out

1. Call your Twilio number.
2. Enter your test payment information:
   - Credit card number: 4242 4242 4242 4242
   - Expiry date (MM/YY): 12 25 (pick a date in the future)
   - Zip code: 94105
   - CVC security code: 333
3. To verify that your application correctly captured this data, navigate to your Call Logs and click on your most recent call.
4. Scroll down to see the Request Inspector. Expand the parameters on the second POST for your call.

Call log showing payment confirmation with result success and caller from US.

5. You can navigate over to your Stripe Dashboard, copy the "PaymentConfirmationCode" "ch_xxxxx," and paste into the Stripe search. You should see the following:

Stripe payment of $20.45 succeeded with normal risk evaluation on Sep 13, 8:53 PM.

## Troubleshooting

You can add the line console.log(event); in your Twilio Function's code. (Don't forget to save and deploy the changes.) This prints out the request parameters in the Log to let you inspect the contents.

You can also navigate to your Call Logs in the Console and view the call in more detail.

You will notice a POST request to <Pay>'s action URL for each stage of the call, first ringing state, and then in-progress.

If you expand the second POST request parameters you will see the call status in-progress. The Result field shows information on error causes. Read the <Pay> documentation for more information.

When Stripe rejects a transaction the result is payment-connector-error and you can get further insight by inspecting the PaymentError field.

For instance, if instead of entering 4242 4242 4242 4242 you enter another card then you will see the following:

Payment error message: Only test cards allowed, with states FL and CA.

Stripe offers a list of test card numbers to help with error handling:

- 4100 0000 0000 0019 - Card declined
- 4000 0000 0000 9995 - Card has insufficient funds
- 4000 0000 0000 0069 - Card expired

See Stripe's full list of test cards.

If you want a POST request after each payment detail is collected, you can use <Pay>'s statusCallback attribute.

## What's next?

Great work! In a few lines of code, you've captured payment details and charged your customer in test mode.

For more information on <Pay>, including unique attributes you can use to modify your payments, check out the <Pay> docs.