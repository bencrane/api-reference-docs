# Delivery Receipt

Service-Scoped Delivery Receipts in Conversations provide visibility into the status of Service-Scoped Conversation Messages sent across different Conversations within a non-default Conversation Service.

Using Service-Scoped Delivery Receipts, you can verify that Messages have been sent, delivered, or even read (for OTT) by Conversations Participants within a non-default, service-scoped Conversation Service.

## API Base URL

All URLs in the reference documentation use the following base URL:

```
https://conversations.twilio.com/v1
```

For Conversations applications that build on more than one Conversation Service instance, you will need to specify the Conversation Service SID in the REST API call:

```
GET /v1/Services/ISxx/Conversations/CHxx/Messages
```

## Receipt Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | Optional | Not PII | The unique ID of the Account responsible for this participant. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| chat_service_sid | SID<IS> | Optional | Not PII | The SID of the Conversation Service the Message resource is associated with. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| conversation_sid | SID<CH> | Optional | Not PII | The unique ID of the Conversation for this message. Pattern: `^CH[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| message_sid | SID<IM> | Optional | Not PII | The SID of the message within a Conversation the delivery receipt belongs to. Pattern: `^IM[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sid | SID<DY> | Optional | Not PII | A 34 character string that uniquely identifies this resource. Pattern: `^DY[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| channel_message_sid | SID | Optional | Not PII | A messaging channel-specific identifier for the message delivered to participant e.g. `SMxx` for SMS, `WAxx` for Whatsapp etc. Pattern: `^[a-zA-Z]{2}[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| participant_sid | SID<MB> | Optional | Not PII | The unique ID of the participant the delivery receipt belongs to. Pattern: `^MB[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| status | enum<string> | Optional | Not PII | The message delivery status, can be `read`, `failed`, `delivered`, `undelivered`, `sent` or null. |
| error_code | integer | Optional | Not PII | The message delivery error code for a `failed` status. Default: 0 |
| date_created | string<date-time> | Optional | Not PII | The date that this resource was created. |
| date_updated | string<date-time> | Optional | Not PII | The date that this resource was last updated. `null` if the delivery receipt has not been updated. |
| url | string<uri> | Optional | Not PII | An absolute API resource URL for this delivery receipt. |