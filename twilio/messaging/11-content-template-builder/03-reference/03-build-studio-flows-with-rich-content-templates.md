# Using Content Templates with Studio

Content templates enable customers to send rich messaging content using a determinative content template SID, called "HX Sid". This functionality is available on Studio in the **Send Message**, **Send & Wait for Reply**, and the **Split** widgets. The rich functionality enabled by content templates is also supported.

## Using Content Templates to Send Messages

To use content templates in Studio to send messages with the Send or Send & Wait for Reply Widgets:

1. Select "Content template" in the "Message type" section
2. Input the HX Sid. You can find the HX Sid by going to Messaging > Content Template Builder and locating the HX Sid for the specific content template.
3. Add variables by clicking the "+" button
4. Expand "Advanced Configuration"
5. Enter a phone number or MessagingServiceSID in the "Send message from" section

## Using Rich Inbound Features in Studio Flows

You can design custom interactions that read from rich message metadata when end users send you an inbound message. Rich inbound message metadata is available when users take certain actions, such as tapping a quick reply button or sending a WhatsApp list item.

For example, for quick reply buttons, you can set a custom payload value that is returned in the inbound message when a user taps the quick reply button. This lets you identify which button the user tapped. For quick replies, the payload value is set as the "ID" when you create the template in Content Template Builder, and the same value is returned under the "ButtonPayload" field in your inbound message webhook.

### Using the Split Widget with ButtonPayload

To take an action based on this field, you can use the 'Split' widget to trigger actions based on the ButtonPayload field. Under "Variables to Test", use the format:

```
widgets.widget_name.inbound.ButtonPayload
```

The `widget_name` is the widget used to send the original message. For other template types, there may be other field names that you must change the value to in order to utilize the rich functionality as a trigger.