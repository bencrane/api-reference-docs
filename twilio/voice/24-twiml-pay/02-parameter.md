TwiML™ Voice: Pay - <Parameter>
The __TwiML__ <Pay> verb's <Parameter> noun allows you to:
* send custom parameters to your payment processor when using a Generic Pay Connector
* send ACH information not included as part of the <Pay> verb
<Parameter> attributes
The <Parameter> noun takes two attributes, `name` (for the name of the parameter) and `value`(for the value of the parameter). Both attribute values must be strings.
Send custom parameters using a Generic Pay Connector
If you are using a Generic Pay Connector, you can send custom parameters to your payment processor using the <Parameter> noun. This functionality could be used to send additional contextual information about the transaction. For example, you could inform the payment processor to waive fees, charge fees, process a refund, etc. The <Parameter> noun is nested within the <Pay> verb's open and closing tags, and takes name and value attributes for the name and value of your custom parameter. The example below shows a charge transaction using the <Parameter> noun to pass custom parameters to the payment processor. You can also pass custom parameters for tokenize transactions in the same manner. There is no limit to the number of custom parameters you can nest within a <Pay> verb.
Send custom parameters with <Parameter>
Node.jsPythonC#JavaGoPHPRuby
Report code block
Copy code block

```
from twilio.twiml.voice_response import Parameter, Pay, VoiceResponse

```

response = VoiceResponse() 
pay = Pay( 
charge_amount='10.00', 
payment_connector='My_Generic_Pay_Connector', 
action='https://your-callback-function-url.com/pay' 
) 
pay.parameter(name='custom_parameter_1', value='custom_value_1') 
response.append(pay) 
print(response)
Output
Copy output

```
<?xml version="1.0" encoding="UTF-8"?>

```

<Response> 
<Pay chargeAmount="10.00" paymentConnector="My_Generic_Pay_Connector" action="https://your-callback-function-url.com/pay"> 
<Parameter name="custom_parameter_1" value="custom_value_1" /> 
</Pay> 
</Response>
Send ACH information when accepting ACH payments
The <Parameter> __noun__ is a subelement within the <Pay> verb. This noun, <Parameter>, is required when accepting ACH payments in order to capture certain ACH information not included as part of the <Pay> verb to send to the payment provider. The value(s) that have to be captured by <Parameter> depend on the payment provider.
Copy code block

```
<Pay chargeAmount="10.0" description="pizza" paymentMethod="ach-debit" paymentConnector="myConnector" action="myactionurl">

```

<Parameter name="AVSName" value="CallerABC"/> 
</Pay>