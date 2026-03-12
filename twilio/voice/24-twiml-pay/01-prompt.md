TwiML™ Voice: <Prompt>




The <Prompt> noun allows you to customize the default prompts used by <Pay>.

By default, when Twilio executes <Pay> TwiML instructions (without <Prompt>), the caller will hear default prompts for each step of the payment process. You can modify what the caller hears for a given payment step by nesting <Prompt> within <Pay>'s opening and closing tags.

You can customize prompts with text-to-speech or a pre-recorded audio file. For text-to-speech, you must nest <Say> TwiML within <Prompt>'s opening and closing tags. In order to play a pre-recorded audio file, you must nest <Play> TwiML within <Prompt>'s opening and closing tags.

There are seven payment steps in the <Pay> process, which are listed below in the for attribute section. You need separate <Prompt>s for each payment step prompt that you wish to customize.

The TwiML example below shows how to use <Pay>, <Prompt>, and <Say> to customize the prompt for the payment-card-number step (i.e. when the caller is prompted to enter their payment card number) with text-to-speech.

Prompt for card number





Report code block


Copy code block
from twilio.twiml.voice_response import Pay, Prompt, VoiceResponse, Say

response = VoiceResponse()
pay = Pay()
prompt = Prompt(for_='payment-card-number')
prompt.say('Please enter your 16 digit Visa or Mastercard number.')
pay.append(prompt)
response.append(pay)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Pay>
   <Prompt for="payment-card-number">
     <Say>Please enter your 16 digit Visa or Mastercard number.</Say>
   </Prompt>
  </Pay>
</Response>
The following TwiML example causes the caller to hear a pre-recorded audio file during the payment-card-number payment step.

Prompt for card number with MP3





Report code block


Copy code block
from twilio.twiml.voice_response import Pay, Play, Prompt, VoiceResponse

response = VoiceResponse()
pay = Pay()
prompt = Prompt(for_='payment-card-number')
prompt.play('https://myurl.com/twilio/twiml/audio/card_number.mp3')
pay.append(prompt)
response.append(pay)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Pay>
   <Prompt for="payment-card-number">
     <Play>https://myurl.com/twilio/twiml/audio/card_number.mp3</Play>
   </Prompt>
  </Pay>
</Response>
Attributes





The table below lists <Prompt>'s attributes. Click on an attribute name to learn more about that attribute.

Attribute Name	Allowed Values	Default Values
for

required	
payment-card-number
expiration-date
security-code
postal-code
bank-routing-number
bank-account-number
payment-processing
none
cardType

optional	
visa
mastercard
amex
maestro
discover
optima
jcb
diners-club
enroute

Multiple values are allowed and must be space delimited.

Example:
visa amex mastercard	none
attempt

optional	An integer from 1-10	none
requireMatchingInputs

optional	
true
false
false
errorType

optional	
timeout
invalid-card-number
invalid-card-type
invalid-date
invalid-security-code
invalid-bank-routing-number
invalid-bank-account-number
input-matching-failed

Multiple values are allowed and must be space delimited.

Example:
timeout invalid-bank-account-number invalid-date	none
for





<Prompt>'s for attribute specifies which payment step's prompt you wish to customize.

The following table lists the possible values of the for attribute, along with a description of each payment step.

Possible Value / Payment Step	Description
payment-card-number	The customer is asked for credit or debit card information
expiration-date	The customer is asked for the expiration date for their payment card
security-code	The customer is asked for the security code (CVV) for their payment card
postal-code	The customer is asked for the postal code associated with the payment card
bank-routing-number	The customer is asked for their bank's routing number
bank-account-number	The customer is asked for their bank account number
payment-processing	The payment is processing
cardType





The cardType attribute allows you to customize a payment step's prompt for specific payment card types.

This is useful to customize the prompt when asking for a security code, as different card types have security codes of different lengths.

The following TwiML example customizes the prompt for the security-code payment step if the credit card number provided by the caller was a Visa card.

Prompt for a Visa security code (3 digits)





Report code block


Copy code block
from twilio.twiml.voice_response import Pay, Prompt, VoiceResponse, Say

response = VoiceResponse()
pay = Pay()
prompt = Prompt(card_type='visa', for_='security-code')
prompt.say(
    'Please enter security code for your Visa card. It's the 3 digits located on the back of your card'
)
pay.append(prompt)
response.append(pay)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Pay>
   <Prompt for="security-code" cardType="visa">
     <Say>Please enter security code for your Visa card. It's the 3 digits located on the back of your card</Say>
   </Prompt>
  </Pay>
</Response>
The following TwiML example customizes the prompt for the security-code payment step if the credit card number provided by the caller was an American Express card.

Prompt for an American Express security code (4 digits)





Report code block


Copy code block
from twilio.twiml.voice_response import Pay, Prompt, VoiceResponse, Say

response = VoiceResponse()
pay = Pay()
prompt = Prompt(card_type='amex', for_='security-code')
prompt.say(
    'Please enter security code for your American Express card. It's the 4 digits located on the front of your card'
)
pay.append(prompt)
response.append(pay)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Pay>
   <Prompt for="security-code" cardType="amex">
     <Say>
      Please enter security code for your American Express card. It's the 4 digits located on the front of your card
     </Say>
   </Prompt>
  </Pay>
</Response>
attempt





If a customer fails to input a payment step's information, the customer will be prompted again to enter that step's information. You can customize what the customer hears for each attempt to gather a payment step's information using the attempt attribute.

This can be used to provide more helpful prompts if a customer fails to enter their information after an initial prompt for a given payment step.

The TwiML example below would cause the customer to hear, "Please enter your expiration date, two digits for the month and two digits for the year." during the expiration-date step. If the caller fails to enter an expiration date, the next <Prompt> will execute and the caller will hear, "Please enter your expiration date, two digits for the month and two digits for the year. For example, if your expiration date is March 2022, then please enter 0 3 2 2." Since the second <Prompt>'s attempt value is 2 3, the caller would hear this longer prompt during a third attempt if necessary.

Change prompt for subsequent attempts





Report code block


Copy code block
from twilio.twiml.voice_response import Pay, Prompt, VoiceResponse, Say

response = VoiceResponse()
pay = Pay()
prompt = Prompt(attempt='1', for_='expiration-date')
prompt.say(
    'Please enter your expiration date, two digits for the month and two digits for the year.'
)
pay.append(prompt)
prompt2 = Prompt(attempt='2 3', for_='expiration-date')
prompt2.say(
    'Please enter your expiration date, two digits for the month and two digits for the year. For example, if your expiration date is March 2022, then please enter 0 3 2 2'
)
pay.append(prompt2)
response.append(pay)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
 <Pay>
  <Prompt for="expiration-date" attempt="1">
    <Say>Please enter your expiration date, two digits for the month and two digits for the year.</Say>
  </Prompt>
  <Prompt for="expiration-date" attempt="2 3">
    <Say>Please enter your expiration date, two digits for the month and two digits for the year. For example, if your expiration date is March 2022, then please enter 0 3 2 2</Say>
  </Prompt>
 </Pay>
</Response>
requireMatchingInputs





The requireMatchingInputs attribute allows you to prompt a customer to re-input their bank account number or bank routing number and tell Twilio to check whether or not the two inputs match.


(warning)
Warning
The requireMatchingInputs attribute is only available for use for ACH payments/tokenizations at this time.

Therefore, you can only use requireMatchingInputs with for attributes of bank-account-number or bank-routing-number.
If the two inputs do not match, Twilio will restart that payment step's prompts. The customer will once again hear the first prompt to enter their information and the second prompt to re-enter the information.

Require caller to enter bank account information twice





Report code block


Copy code block
from twilio.twiml.voice_response import Pay, Prompt, VoiceResponse, Say

response = VoiceResponse()
pay = Pay(payment_method='ach-debit', charge_amount='13.22')
prompt = Prompt(for_='bank-account-number')
prompt.say(
    'Thanks for using our service. Please enter your bank account number.')
pay.append(prompt)
prompt2 = Prompt(require_matching_inputs=True, for_='bank-account-number')
prompt2.say('Thank you. Please enter your bank account number again.')
pay.append(prompt2)
response.append(pay)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Pay paymentMethod="ach-debit" chargeAmount="13.22">
        <Prompt for="bank-account-number">
            <Say>Thanks for using our service. Please enter your bank account number.</Say>
        </Prompt>
        <Prompt for="bank-account-number" requireMatchingInputs="true">
            <Say>Thank you. Please enter your bank account number again.</Say>
        </Prompt>
    </Pay>
</Response>
You should use two <Prompt>s with the same for attribute. The second <Prompt> should have requireMatchingInputs set to true. This will give the caller two different prompts: one to enter a piece of information once, and one that tells the caller to re-enter the information for verification purposes.

Optionally, you can use a third <Prompt> (with the same for attribute) with the errorType attribute set to input-matching-failed to customize the prompt the caller hears if their inputs did not match. The TwiML example below illustrates this behavior.

Use with requireMatchingInputs and errorType





Report code block


Copy code block
from twilio.twiml.voice_response import Pay, Prompt, VoiceResponse, Say

response = VoiceResponse()
pay = Pay(payment_method='ach-debit', charge_amount='13.22')
prompt = Prompt(for_='bank-account-number')
prompt.say(
    'Thanks for using our service. Please enter your bank account number.')
pay.append(prompt)
prompt2 = Prompt(require_matching_inputs=True, for_='bank-account-number')
prompt2.say('Thank you. Please enter your bank account number again.')
pay.append(prompt2)
prompt3 = Prompt(
    error_type='input-matching-failed', for_='bank-account-number')
prompt3.say(
    'Sorry, your two bank account number inputs did not match. Please enter your bank account number again. We will then ask a second time again.'
)
pay.append(prompt3)
response.append(pay)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Pay paymentMethod="ach-debit" chargeAmount="13.22">
        <Prompt for="bank-account-number">
            <Say>Thanks for using our service. Please enter your bank account number.</Say>
        </Prompt>
        <Prompt for="bank-account-number" requireMatchingInputs="true">
            <Say>Thank you. Please enter your bank account number again.</Say>
        </Prompt>
        <Prompt for="bank-account-number" errorType="input-matching-failed">
            <Say>Sorry, your two bank account number inputs did not match. Please enter your bank account number again. We will then ask a second time again.</Say>
        </Prompt>
    </Pay>
</Response>
errorType





The errorType attribute allows you to customize the prompt that the caller hears if their input for a given payment step was invalid.

The following are possible values of errorType and descriptions of the cause of the error.

errorType	Description
timeout	<Pay> received a timeout when executing a payment step
invalid-card-number	<Pay> didn't receive the appropriate number of digits for either credit card number, expiration date, security code or zip code. Or card number entered didn't pass the validation. This reason can be used to apply further customization on the message to play such as informing payee/caller that the incorrect number of digits were entered.
invalid-card-type	The card number entered didn't match the accepted card types. For example, if only visa or mastercard are accepted and payee enters amex, InvalidReason parameter will contain this value.
invalid-date	<Pay> didn't receive the correct number of digits for the date.
invalid-security-code	This reason is generated when the payee entered an invalid security code. For example, if credit card number is amex and user entered 3 digits for the security code.
invalid-postal-code	<Pay> didn't receive the correct number of digits for the postal/zip code.
invalid-bank-routing-number	<Pay> either didn't receive the appropriate number of digits for the routing number or the routing number provided failed the validation performed by <Pay>.
invalid-bank-account-number	<Pay> didn't receive the minimum number of digits required for the bank account number.
input-matching-failed	The first and second inputs by the customer did not match. Only will be returned when requireMatchingInputs is set to true. Only available for ACH payments/tokenizations at this time.
Example usage





Customize prompts for credit card payments





The following examples show the TwiML you can use to customize all prompts for <Pay> when accepting a credit card payment:

A full example for a credit card transaction





Report code block


Copy code block
from twilio.twiml.voice_response import Pay, Prompt, VoiceResponse, Say

response = VoiceResponse()
pay = Pay(
    payment_method='credit-card', valid_card_types='visa mastercard amex')
prompt = Prompt(for_='payment-card-number')
prompt.say('Please enter your credit card number.')
pay.append(prompt)
prompt2 = Prompt(error_type='timeout', for_='payment-card-number')
prompt2.say(
    'You didn\'t enter your credit card number. Please enter your credit card number.'
)
pay.append(prompt2)
prompt3 = Prompt(error_type='invalid-card-number', for_='payment-card-number')
prompt3.say('You entered an invalid credit card number. Please try again.')
pay.append(prompt3)
prompt4 = Prompt(error_type='invalid-card-type', for_='payment-card-number')
prompt4.say(
    'The card number you entered isn\'t from one of our accepted credit card issuers. Please enter a Visa, MasterCard, or American Express credit card number.'
)
pay.append(prompt4)
prompt5 = Prompt(for_='expiration-date')
prompt5.say(
    'Please enter your credit card\'s expiration date. Two digits for the month and two digits for the year.'
)
pay.append(prompt5)
prompt6 = Prompt(error_type='timeout', for_='expiration-date')
prompt6.say(
    'Sorry. You didn\'t enter an expiration date. Please enter your card\'s expiration date. Two digits for the month and two digits for the year.'
)
pay.append(prompt6)
prompt7 = Prompt(error_type='invalid-date', for_='expiration-date')
prompt7.say(
    'The date you entered was incorrect or is in the past. Please enter the expiration date. Two digits for the month and two digits for the year. For example, to enter July twenty twenty two, enter 0 7 2 2.'
)
pay.append(prompt7)
prompt8 = Prompt(card_type='visa mastercard', for_='security-code')
prompt8.say(
    'Please enter your security code. It\'s the 3 digits located on the back of your card.'
)
pay.append(prompt8)
prompt9 = Prompt(
    error_type='timeout', card_type='visa mastercard', for_='security-code')
prompt9.say(
    'You didn\'t enter your credit card security code. Please enter your security code. It\'s the 3 digits located on the back of your card.'
)
pay.append(prompt9)
prompt10 = Prompt(
    error_type='invalid-security-code',
    card_type='visa mastercard',
    for_='security-code')
prompt10.say(
    'That was an invalid security code. The security code must be 3 digits. Please try again.'
)
pay.append(prompt10)
prompt11 = Prompt(card_type='amex', for_='security-code')
prompt11.say(
    'Please enter your security code. It\'s the 4 digits located on the front of your card.'
)
pay.append(prompt11)
prompt12 = Prompt(error_type='timeout', card_type='amex', for_='security-code')
prompt12.say(
    'You didn\'t enter your credit card security code.  Please enter your security code. It\'s the 4 digits located on the front of your card.'
)
pay.append(prompt12)
prompt13 = Prompt(
    error_type='invalid-security-code', card_type='amex', for_='security-code')
prompt13.say(
    'That was an invalid security code. The security code must be 4 digits. Please try again.'
)
pay.append(prompt13)
prompt14 = Prompt(for_='postal-code')
prompt14.say('Please enter your 5 digit billing zip code.')
pay.append(prompt14)
prompt15 = Prompt(error_type='timeout', for_='postal-code')
prompt15.say(
    'You didn\'t enter your billing zip code. Please enter your 5 digit billing zip code.'
)
pay.append(prompt15)
prompt16 = Prompt(for_='payment-processing')
prompt16.say('Thank you. Please wait while we process your payment.')
pay.append(prompt16)
response.append(pay)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Pay paymentMethod="credit-card" validCardTypes="visa mastercard amex">
    <!-- Prompts for credit card number -->
    <Prompt for="payment-card-number">
      <Say>Please enter your credit card number.</Say>
    </Prompt>
    <Prompt for="payment-card-number" errorType="timeout">
      <Say>You didn't enter your credit card number. Please enter your credit card number.</Say>
    </Prompt>
    <Prompt for="payment-card-number" errorType="invalid-card-number">
      <Say>You entered an invalid credit card number. Please try again.</Say>
    </Prompt>
    <Prompt for="payment-card-number" errorType="invalid-card-type">
      <Say>The card number you entered isn't from one of our accepted credit card issuers. Please enter a Visa, MasterCard, or American Express credit card number.</Say>
    </Prompt>
    <!-- Prompts for expiration date -->
    <Prompt for="expiration-date">
      <Say>Please enter your credit card's expiration date. Two digits for the month and two digits for the year.</Say>
    </Prompt>
    <Prompt for="expiration-date" errorType="timeout">
      <Say>Sorry. You didn't enter an expiration date. Please enter your card's expiration date. Two digits for the month and two digits for the year.</Say>
    </Prompt>
    <Prompt for="expiration-date" errorType="invalid-date">
      <Say>The date you entered was incorrect or is in the past. Please enter the expiration date. Two digits for the month and two digits for the year. For example, to enter July twenty twenty two, enter 0 7 2 2.</Say>
    </Prompt>
    <!-- Prompts for three-digit security code -->
    <Prompt for="security-code" cardType="visa mastercard">
      <Say>Please enter your security code. It's the 3 digits located on the back of your card.</Say>
    </Prompt>
    <Prompt for="security-code" errorType="timeout" cardType="visa mastercard">
      <Say>You didn't enter your credit card security code. Please enter your security code. It's the 3 digits located on the back of your card.</Say>
    </Prompt>
    <Prompt for="security-code" errorType="invalid-security-code" cardType="visa mastercard">
      <Say>That was an invalid security code. The security code must be 3 digits. Please try again.</Say>
    </Prompt>
    <!-- Prompts for four-digit security code (American Express) -->
    <Prompt for="security-code" cardType="amex">
      <Say>Please enter your security code. It's the 4 digits located on the front of your card.</Say>
    </Prompt>
    <Prompt for="security-code" errorType="timeout" cardType="amex">
      <Say>You didn't enter your credit card security code.  Please enter your security code. It's the 4 digits located on the front of your card.</Say>
    </Prompt>
    <Prompt for="security-code" errorType="invalid-security-code" cardType="amex">
      <Say>That was an invalid security code. The security code must be 4 digits. Please try again.</Say>
    </Prompt>
    <!-- Prompts for postal/zip code -->
    <Prompt for="postal-code">
      <Say>Please enter your 5 digit billing zip code.</Say>
    </Prompt>
    <Prompt for="postal-code" errorType="timeout">
      <Say>You didn't enter your billing zip code. Please enter your 5 digit billing zip code.</Say>
    </Prompt>
    <!-- Prompt after customer has entered all payment information -->
    <Prompt for="payment-processing">
      <Say>Thank you. Please wait while we process your payment.</Say>
    </Prompt>
  </Pay>
</Response>
Customize prompts for ACH payments





The following examples show the TwiML you can use to customize all prompts for <Pay> when accepting an ACH payment:

A full example for an ACH/debit transaction





Report code block


Copy code block
from twilio.twiml.voice_response import Pay, Prompt, VoiceResponse, Say

response = VoiceResponse()
pay = Pay(
    timeout='5',
    max_attempts='3',
    payment_method='ach-debit',
    language='en-US')
prompt = Prompt(for_='bank-routing-number')
prompt.say('Please enter your bank routing number.')
pay.append(prompt)
prompt2 = Prompt(error_type='timeout', for_='bank-routing-number')
prompt2.say('You didn\'t enter your routing number. Please enter your bank routing number.')
pay.append(prompt2)
prompt3 = Prompt(error_type='invalid-bank-routing-number', for_='bank-routing-number')
prompt3.say('That was an invalid bank routing number. Please try again.')
pay.append(prompt3)
prompt4 = Prompt(for_='bank-account-number')
prompt4.say('Please enter your bank account number.')
pay.append(prompt4)
prompt5 = Prompt(error_type='timeout', for_='bank-account-number')
prompt5.say('You didn\'t enter your bank account number. Please enter your bank account number.')
pay.append(prompt5)
prompt6 = Prompt(for_='payment-processing')
prompt6.say('Thank you. Please wait while we process your payment.')
pay.append(prompt6)
response.append(pay)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Pay timeout="5" maxAttempts="3" paymentMethod="ach-debit" language="en-US">
    <Prompt for="bank-routing-number">
      <Say>Please enter your bank routing number.</Say>
    </Prompt>
    <Prompt for="bank-routing-number" errorType="timeout">
      <Say>You didn't enter your routing number. Please enter your bank routing number.</Say>
    </Prompt>
    <Prompt for="bank-routing-number" errorType="invalid-bank-routing-number">
      <Say>That was an invalid bank routing number. Please try again.</Say>
    </Prompt>
    <Prompt for="bank-account-number">
      <Say>Please enter your bank account number.</Say>
    </Prompt>
    <Prompt for="bank-account-number" errorType="timeout">
      <Say>You didn't enter your bank account number. Please enter your bank account number.</Say>
    </Prompt>
    <Prompt for="payment-processing">
      <Say>Thank you. Please wait while we process your payment.</Say>
    </Prompt>
  </Pay>
</Response>