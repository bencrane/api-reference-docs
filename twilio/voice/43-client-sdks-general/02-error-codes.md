# Client-side SDKs. - Voice SDK Error Codes

Voice SDK Error Codes
The majority of Programmable Voice error codes are five-digit integers that start in the 31000 range.
For details about an error code, its possible causes, and recommended solutions, see the full __Error and Warning Dictionary__.
(information)
Info
The JavaScript SDK emits errors that include a `twilioError` field.
This field contains a `TwilioError` object, which is the default error format in version 2.0 of the SDK. For migration information, see the __JavaScript SDK 2.0 migration guide__.
Common errors
310xx series: general errors
CodeDescription__31000__General Twilio Voice SDK error. Additional information might be available in the debugger. The `twilioError` field (JavaScript SDK only) can also provide more context.__31001__TwiML application not found.__31002__Connection declined. Check the debugger for details about the underlying cause.__31003__Connection timed out.__31005__The WebSocket connection to Twilio signaling servers was unexpectedly closed. If this issue occurs consistently, verify that the provided hostname resolves correctly. If you specify a region during `Device` setup, make sure the region value is valid.__31009__No transport is available to send or receive messages.
311xx series: malformed requests
CodeDescription__31100__Generic malformed request.__31101__The request is missing the parameter array.__31102__Authorization token is missing from the request.__31103__The total length of parameters exceeds MAX_PARAM_LENGTH.__31104__Invalid bridge token.__31105__Invalid client name (identity). The value provided in the AccessToken can include only alphanumeric and underscore characters. Using any other character, including spaces, results in unexpected behavior. The maximum identity length is 256 characters.
312xx series: authorization errors
CodeDescription__31201__Unknown authorization error.__31202__JWT signature validation failed.__31203__Invalid or inactive account.__31204__Invalid JWT token.__31205__JWT token has expired.__31206__Request rate exceeds the authorized limit.__31207__JWT token expiration interval is too long.__31208__User denied microphone access.
53xxx series: signaling errors
CodeDescription__53000__Signaling connection error: the WebSocket timed out during pre-flight.__53405__Media connection failed or media activity ceased: the ICE connection failed.