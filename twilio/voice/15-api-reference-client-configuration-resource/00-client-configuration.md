API REFERENCE - DIALING PERMISSIONS - Client Configurations resource

Client Configurations resource





(new)
Private Beta
The Client Configurations resource is currently available as a Private Beta product, and Twilio may change the information in this document at any time. This means that some features aren't yet implemented, and others may change before the product becomes Generally Available. Private Beta products aren't covered by a Service Level Agreement.
A Client Configurations resource stores Twilio Voice client configuration data, such as a call notification webhook URL.


(information)
Info
Read more about the Call Notification feature on the Call Notification via Webhook page.
Create a Client Configuration







Copy code block
  curl -X POST https://voice.twilio.com/v2/Configurations/Client \
  -H "Content-Type: application/json" \
  -d '{"unique_name": "my_webhook", "description": "my webhook", "configuration": {"configurationType":"Client", "callnotification": {"url":"https://myurl.com", "method": "POST"}}}' \
  -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN


Copy code block
{
    "account_sid": "ACxxxxxxxxxxxxxxxxxxxxx",
    "configuration": {
        "configurationType": "Client",
        "callnotification": {
            "method": "POST",
            "url": "https://myurl.com"
        }
    },
    "description": "my webhook",
    "unique_name": "my_webhook",
    "id": "voice_clientconfiguration_xxxxxxxxx"
}

(information)
Info
unique_name cannot contain spaces.
Retrieve a Client Configuration







Copy code block
curl -X GET  https://voice.twilio.com/v2/Configurations/Client/voice_clientconfiguration_xxxxxxx \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN


Copy code block
{
    "account_sid": "ACxxxxxxxxxxxxxxxxxxxxx",
    "configuration": {
        "configurationType": "Client",
        "callnotification": {
            "method": "POST",
            "url": "https://myurl.com"
        }
    },
    "description": "my webhook",
    "unique_name": "my_webhook",
    "id": "voice_clientconfiguration_xxxxxxxxx"
}
Retrieve a list of Client Configurations







Copy code block
curl -X GET  "https://voice.twilio.com/v2/Configurations/Client?pageSize=1&pageToken=xxxxxxxxx" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN


Copy code block
{
    "content": [
        {
            "account_sid": "ACxxxxxxxxxx",
            "configuration": {
                "configurationType": "Client",
                "callnotification": {
                    "method": "POST",
                    "url": "https://myurl.com"
                }
            },
            "description": "my webhook",
            "unique_name": "my_webhook",
            "id": "voice_clientconfiguration_xxxxxxxx"
        }
    ],
    "meta": {
        "direct_token": true,
        "list_key": "content",
        "next_token": "xxxxxxx",
        "page_size": 1,
        "previous_token": "xxxxxxxxxxxxxx"
    }
}

(information)
Info
pageSize and pageToken are optional parameters.
Update a Client Configuration







Copy code block
curl -X PUT https://voice.twilio.com/v2/Configurations/Client/voice_clientconfiguration_xxxxx \
-H "Content-Type: application/json" \
-d '{"unique_name": "my_updated_webhook", "configuration": {"configurationType": "Client", "callnotification": {"url":"https://my_updated_url", "method": "POST"}}}' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN


Copy code block
{
    "account_sid": "ACxxxxxxxxxxxxxxxxxxxxx",
    "configuration": {
        "configurationType": "Client",
        "callnotification": {
            "method": "POST",
            "url": "https://my_updated_url.com"
        }
    },
    "description": null,
    "unique_name": "my_updated_webhook",
    "id": "voice_clientconfiguration_xxxxxxxxx"
}

(information)
Info
If we omit or leave a parameter value as null in the update request then the value will be updated to null or the request will result in an error.
Delete a Client Configuration







Copy code block
curl -X DELETE https://voice.twilio.com/v2/Configurations/Client/voice_clientconfiguration_xxxxxx \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN


Copy code block
<No Content>
Set a Client Configuration as the default account configuration







Copy code block
curl -X POST  https://voice.twilio.com/v2/Configurations/Client/Default \
-H "Content-Type: application/json" \
-d '{"configuration_id": "voice_clientconfiguration_xxxxxx"}' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN


Copy code block
<No Content>
Retrieve the default Client Configuration for the account







Copy code block
curl -X GET  https://voice.twilio.com/v2/Configurations/Client/Default \
$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN


Copy code block
{
    "account_sid": "ACxxxxxxxxxxxxxxxxxxxxx",
    "configuration": {
        "configurationType": "Client",
        "callnotification": {
            "method": "POST",
            "url": "https://myurl.com"
        }
    },
    "description": "my webhook",
    "unique_name": "my_webhook",
    "id": "voice_clientconfiguration_xxxxxxxxx"
}
Unset the default Client Configuration







Copy code block
curl -X DELETE  https://voice.twilio.com/v2/Configurations/Client/Default \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN


Copy code block
<No Content>