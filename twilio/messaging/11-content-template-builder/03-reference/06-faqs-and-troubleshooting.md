# FAQs and Troubleshooting

If you encounter issues with Content Templates, we've provided the following diagnostics tips to help get you back on track.

## FAQs

### Common Terms

- **Content Sid:** The unique sid identifier for a content template. A Content Sid can only be used by one Twilio account sid. It is 34 characters long string and starts with HX.
- **Content Variables:** The variables used to substitute in values at run time. Variable samples are typically required at creation if a template has variables.
- **Content Types:** Twilio's omnichannel representation of rich content. Many content types can be used interchangeably between various channels with no customization. There are a few limited cases where components defined within a content type supported on a channel makes it incompatible with another channel where the type is generally supported.

### My template was submitted to WhatsApp and rejected. What should I do?

Please see this article for a summary of the WhatsApp template approval guidelines and common rejections reasons: WhatsApp Message Template Approvals & Statuses.

### How can I format text?

Please use the following formatting options when inputting a string:

- `~strikethrough~`
- `*bold*`
- `_italics_`

### Are emoji's supported?

Yes, on Mac use `Control+Command+Space` to launch the emoji keyboard. On Windows use `Windows+;` (semicolon) or `Windows+.` (Period).

### How do I use a newline in my templates?

Use enter or return to create a new line just like you would in a text editor.

### Can I include multiple languages in a single template?

Content Templates are limited to one language per template.

### Are there any limitations around URLs?

URLs must be valid and publicly accessible. Ensure that URLs do not contain whitespace characters. For WhatsApp, the URL up to the domain name must be static.

### Do templates created in the "WhatsApp Templates" area of Console appear within the Content Editor and API?

Templates created in the Console under Messaging > WhatsApp Templates are incompatible with templates created using the Content API or Content Editor, which we call "Content Templates". Only Content Templates can be sent using the ContentSid and ContentVariables parameters. You may request to have your existing WhatsApp Templates duplicated and converted to Content Templates by reaching out to Support. This is a manual task and will be serviced on a first come, first served basis.

### Can I still use my previously created twilio/buttons now that they've been deprecated?

Yes, twilio/buttons that were previously created will still continue to work on WhatsApp and FBM. However, we encourage you to create new twilio/call-to-action and twilio/quick-reply templates to take advantage of template delivery on future channels as they become available. twilio/buttons templates will not support future channels.

### How do I see all templates?

Please use GET on the following endpoint: `https://content.twilio.com/v1/Content?PageSize=1000` (adjust page size as needed).

### Can I use the Content Templates without adding senders to a sender pool or specifying a Messaging Service in the From field?

Yes, you can instead specify a MessagingServiceSid field and a WhatsApp sender From field in the Twilio Programmable Messaging send request. With this workaround, the WhatsApp Sender does not need to be in the Messaging Service sender pool and a unique From can be used for each message. However, a Messaging Service must still be created and specified in the Programmable Messaging request. An example send request would be structured as follows:

```bash
curl -X POST https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXX/Messages \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d "To=whatsapp:+15551234567" \
-d "MessagingServiceSid=MGXXXXXXXXXXXXXXXXXXX" \
-d "From=whatsapp:+15559991111" \
-d "ContentSid=HXXXXXXXXXXXXXXXXXXX" \
-d 'ContentVariables={"1":"ABC123"}'
```

## Current Limitations of Content API

- **Personally Identifiable Information:** PII is not currently supported in Content API templates. However, PII can be passed in content variable parameters sent via the Programmable Messaging API.
- **Templates Limits:** The Content API supports an unlimited number of templates, however WhatsApp limits users to 6000 approved templates.
- **List:** The top-most heading in list are not independently configurable.
- **Media:** We do not support media hosted on Google Drive. Google Drive links don't actually resolve an image. It's just a google page that displays the image and enables folks to download it. Our sample submission logic requires that the media url actually resolves to an image for us to download the image.