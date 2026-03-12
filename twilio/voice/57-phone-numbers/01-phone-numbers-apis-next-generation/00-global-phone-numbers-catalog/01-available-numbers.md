# Global Phone Numbers - REST API: Available Numbers

> **Warning:** Available Numbers API is currently in closed private Developer Preview. Use the generally available Available Phone Numbers API if you don't have access.

The Available Numbers endpoint provides a rich view into Twilio's inventory of phone numbers available for purchase. As we've worked with operators across the globe to offer numbers that cover over 100 countries, we've learned that not all numbers are created equal. Phone numbers differ broadly in characteristics and regulatory requirements. Through the `/AvailableNumbers` endpoint, every number is described by a set of attributes, grouped in four categories: capabilities (voice, sms, mms), geography, regulatory requirements, and pricing. With granular search filters to select numbers with the right attributes for your application, you can narrow down search results to find the perfect number for your use case.

For number pricing and availability please refer to the Support Number Catalog.

You can also search for numbers based on what you're building. To do this, pass your use case as a search parameter and we'll return numbers that have the right characteristics for your application.

Once you've found an available number you want to purchase, make an HTTP POST request to the `/ActiveNumbers` list resource passing the number as the PhoneNumber parameter.

## AvailableNumbers Instance Resource

### Resource URI

You can make a request directly to AvailableNumbers instance resource and choose from any of the numbers that appear in the search as a result of the filters you've specified.

```
https://preview.twilio.com/AvailableNumbers
```

### Resource Properties

#### Basic Capability Properties

The table below states basic properties of the phone number that associate the number to a unique group within Twilio's inventory system.

| Property | Description |
|----------|-------------|
| PhoneNumber | The phone number, in E.164 (i.e. "+1") format. |
| Type | The type of phone number (i.e., local, mobile, tollfree, shortcode, etc.). |
| Lifecycle | The lifecycle the number is in (i.e., developer-preview, beta, generally-available, exhausted). |
| BaseRecurringPrice | Base recurring price for a number. (i.e., $1.00). This price will be recurring until the number is released. This does not take into account PricingModels. |
| BaseSetupPrice | Base setup price for a number. (i.e., $1.00). This price is charged to your account one time when the number is first purchased. |

#### Voice Capability Properties

Voice calling is provided by utilizing the Public Switch Telephone Network (PSTN), the aggregate of the world's circuit-switched telephone networks that are operated by national, regional, or local telephony operators, providing infrastructure and services for public telecommunication.

| Property | Description |
|----------|-------------|
| Capabilities.Voice.InboundConnectivity | Indicates whether a number has inbound voice connectivity in to Twilio. |
| Capabilities.Voice.OutboundConnectivity | Indicates whether a number has outbound voice connectivity out of Twilio. |
| Capabilities.Voice.E911 | Emergency 911 connectivity capable number. |
| Capabilities.Voice.Fax | Fax capable number. |
| Capabilities.Voice.SipTrunking | Sip Trunking capable number. |
| Capabilities.Voice.CallsPerSecond | Integer stating how many calls can be initiated per second. Please refer to Twilio's CPS Support article for more information. |
| Capabilities.Voice.ConcurrentCallsLimit | Integer stating how many calls can be active at one time. |
| Capabilities.Voice.InboundCalledDtmf | Dual-Tone Multi Frequency with inbound called party. |
| Capabilities.Voice.InboundCallerDtmf | Dual-Tone Multi Frequency with inbound caller party. |
| Capabilities.Voice.InboundCallerIdPreservation | Inbound voice Caller ID (+E.164 format) preservation of a number. Can be - International, Domestic, or None. |
| Capabilities.Voice.InboundReachability | Inbound Voice reachability of a number. Can be - Domestic, Foreign, or Global. |
| Capabilities.Voice.LongRecordLength | The length in seconds that a number can record a voicemail. |

#### Sms Capability Properties

Short Messaging Service (SMS) is a text messaging service component of most telephone, World Wide Web, and mobile telephony systems.

| Property | Description |
|----------|-------------|
| Capabilities.Sms.InboundConnectivity | Indicates whether a number has inbound sms connectivity in to Twilio. |
| Capabilities.Sms.OutboundConnectivity | Indicates whether a number has outbound sms connectivity out of Twilio. |
| Capabilities.Sms.Gsm7 | GSM-7 is a character encoding standard which packs the most commonly used letters and symbols in many languages into 7 bits each for usage on GSM networks. See What is GSM-7 Character Encoding. |
| Capabilities.Sms.Ucs2 | UCS-2 is a character encoding standard in which characters are represented by a fixed-length 16 bits (2 bytes). See What is UCS-2 Character Encoding?. |
| Capabilities.Sms.Gsm7Concatenation | Concatenated short message service (or concatenated SMS) is used overcome the limitation on the number of characters that can be sent in a single SMS text message transmission (which is usually 160), and split the sms into smaller messages by the sending device and recombined at the receiving end. |
| Capabilities.Sms.Ucs2Concatenation | Concatenated short message service (or concatenated SMS) is used overcome the limitation on the number of characters that can be sent in a single SMS text message transmission (which is usually 160), and split the sms into smaller messages by the sending device and recombined at the receiving end. |
| Capabilities.Sms.InboundSenderIdPreservation | Inbound voice Sender ID (+E.164 format) preservation of a number. Can be - International, Domestic, or None. |
| Capabilities.Sms.InboundReachability | Inbound SMS reachability of a number. Can be - Domestic, Foreign, or Global. |
| Capabilities.Sms.InboundMps | Integer showing the SMS inbound message per second limit. Please refer to Twilio's MPS Support article for more information. |

#### Mms Capability Properties

Multimedia Messaging Service (MMS) is a standard way to send messages that include multimedia content to and from a mobile phone over a cellular network.

| Property | Description |
|----------|-------------|
| Capabilities.Mms.Inboundconnectivity | Indicates whether a number has inbound MMS connectivity into Twilio. |
| Capabilities.Mms.Outboundconnectivity | Indicates whether a number has outbound MMS connectivity into Twilio. |
| Capabilities.Mms.InboundReachability | Inbound MMS reachability of a number. Can be - Domestic, Foreign, or Global. |
| Capabilities.Mms.InboundMps | Integer showing the MMS inbound message per second limit. Please refer to Twilio's MPS Support article for more information. |

#### Regulatory Properties

Regulations that pertain to this specific number that may deal with Addresses and/or Identities to be required and completed as a pre-request before purchasing.

| Property | Description |
|----------|-------------|
| Regulatory.AddressRequirements | This indicates whether the phone number requires you or your customer to have an Address registered with Twilio. Possible values are listed below. |

**Address Requirement Values**

The following are the possible values for the address_required property.

| Status | Description |
|--------|-------------|
| none | An Address is not required for this phone number. |
| any | Your account must have an Address, but it can be anywhere in the world. |
| local | Your account must have an Address within the phone number's country. |
| foreign | Your account must have an Address outside the phone number's country. |

#### Geography Properties

A phone number's specific geography associated with a number. Some numbers are country level only, and others have specific latitude and longitude associated with them. To understand more, please visit List of Country Codes.

| Property | Description |
|----------|-------------|
| Geography.IsoCountry | The ISO country code of this phone number. |
| Geography.Lata | The LATA of this phone number. Only available for countries in the North American Numbering Plan (NANPA). |
| Geography.RateCenter | The rate center of this phone number. Only available for countries in the North American Numbering Plan (NANPA). |
| Geography.Latitude | The latitude coordinate of this phone number. |
| Geography.Longitude | The longitude coordinate of this phone number. |
| Geography.Region | The two-letter state or province abbreviation of this phone number. |
| Geography.Locality | The locality/city of this phone number. |
| Geography.PostalCode | The postal (zip) code of this phone number. |

## Search for Toll Free US numbers

```bash
curl -G https://preview.twilio.com/Numbers/AvailableNumbers \
-d "Type=tollfree" \
-d "Geography.IsoCountry=US" \
-u '<ACCOUNT_SID:AUTH_TOKEN>'
```

**Output:**

```json
{
    "items": [
        {
            "phone_number": "+18005559306",
            "base_setup_price": "0.0",
            "base_recurring_price": "2.0",
            "capabilities": {
                "voice": {
                    "inbound_connectivity": true,
                    "outbound_connectivity": true,
                    "e911": true,
                    "fax": true,
                    "sip_trunking": true,
                    "calls_per_second": 1,
                    "concurrent_calls_limit": 1,
                    "long_record_length": 30,
                    "inbound_called_dtmf": true,
                    "inbound_caller_dtmf": true,
                    "inbound_caller_id_preservation": "international",
                    "inbound_reachability": "global"
                },
                "sms": {
                    "inbound_connectivity": true,
                    "outbound_connectivity": true,
                    "gsm7": true,
                    "ucs2": true,
                    "gsm7_concatenation": true,
                    "ucs2_concatenation": true,
                    "inbound_sender_id_preservation": "international",
                    "inbound_reachability": "global",
                    "inbound_mps": -1
                },
                "mms": {
                    "inbound_connectivity": true,
                    "outbound_connectivity": true,
                    "inbound_reachability": "global",
                    "inbound_mps": -1
                }
            },
            "regulatory": {
                "address_requirements": "none"
            },
            "type": "tollfree",
            "lifecycle": "generally-available",
            "geography": {
                "iso_country": "US",
                "lata": null,
                "rate_center": null,
                "latitude": null,
                "longitude": null,
                "region": null,
                "locality": null,
                "postal_code": null
            }
        }
    ],
    "meta": {
        "page": 0,
        "page_size": 50,
        "first_page_url": "https://preview.twilio.com/Numbers/AvailableNumbers?Type=tollfree&PageSize=50&Page=0",
        "previous_page_url": null,
        "url": "https://preview.twilio.com/Numbers/AvailableNumbers?Type=tollfree&PageSize=50&Page=0",
        "next_page_url": null,
        "key": "items"
    }
}
```

## HTTP GET

Returns a list of AvailableNumbers resource representations that match the specified filters, each representing a phone number that is currently available for provisioning to your account.

### Optional List Filters

The following basic GET query string parameters allow you to filter the list of numbers returned by Twilio. Note, parameters are case-sensitive.

| Parameter | Description |
|-----------|-------------|
| SavedSearch | Find phone numbers that can support a specific Twilio use case, or a custom saved search that you've constructed. See below for a list of pre-defined use case saved searches. Ability to create and save custom searches is forthcoming. |
| MinBaseRecurringPrice | Minimum base recurring price for a number. (i.e., >= $1.00). Combined with Maximum, this filter acts as a BETWEEN filter. |
| MaxBaseRecurringPrice | Maximum base recurring price for a number. (i.e., <= $2.00). Combined with Minimum, this filter acts as a BETWEEN filter. |
| MinBaseSetupPrice | Minimum base setup price for a number. (i.e., >= $1.00). Combined with Maximum, this filter acts as a BETWEEN filter. |
| MaxBaseSetupPrice | Maximum base setup price for a number. (i.e., <= $2.00). Combined with Minimum, this filter acts as a BETWEEN filter. |

## US Saved Search Example

```bash
curl -G https://preview.twilio.com/Numbers/AvailableNumbers \
-d "SavedSearch=twilio.use-case.conversations.voice" \
-d "SavedSearch=twilio.use-case.conversations.sms" \
-d "Geography.IsoCountry=US" \
-u '<ACCOUNT_SID:AUTH_TOKEN>'
```

**Output:**

```json
{
    "items": [
        {
            "phone_number": "+14155558143",
            "base_setup_price": "0.0",
            "base_recurring_price": "2.0",
            "capabilities": {
                "voice": {
                    "inbound_connectivity": true,
                    "outbound_connectivity": true,
                    "e911": true,
                    "fax": true,
                    "sip_trunking": true,
                    "calls_per_second": 1,
                    "concurrent_calls_limit": 1,
                    "long_record_length": 30,
                    "inbound_called_dtmf": true,
                    "inbound_caller_dtmf": true,
                    "inbound_caller_id_preservation": "international",
                    "inbound_reachability": "global"
                },
                "sms": {
                    "inbound_connectivity": true,
                    "outbound_connectivity": true,
                    "gsm7": true,
                    "ucs2": true,
                    "gsm7_concatenation": true,
                    "ucs2_concatenation": true,
                    "inbound_sender_id_preservation": "international",
                    "inbound_reachability": "global",
                    "inbound_mps": -1
                },
                "mms": {
                    "inbound_connectivity": true,
                    "outbound_connectivity": true,
                    "inbound_reachability": "global",
                    "inbound_mps": -1
                }
            },
            "regulatory": {
                "address_requirements": "none"
            },
            "type": "tollfree",
            "lifecycle": "generally-available",
            "geography": {
                "iso_country": "US",
                "lata": null,
                "rate_center": null,
                "latitude": null,
                "longitude": null,
                "region": null,
                "locality": null,
                "postal_code": null
            }
        }
    ],
    "meta": {
        "page": 0,
        "page_size": 50,
        "first_page_url": "https://preview.twilio.com/Numbers/AvailableNumbers?Type=tollfree&PageSize=50&Page=0",
        "previous_page_url": null,
        "url": "https://preview.twilio.com/Numbers/AvailableNumbers?Type=tollfree&PageSize=50&Page=0",
        "next_page_url": null,
        "key": "items"
    }
}
```

### Saved Search

Saved Search allows you to search for numbers that meet your application's or project's specific criteria. Twilio has pre-defined 7 distinct use case saved search macros for you. The capability (Voice or Sms) must be included, and to have both voice and sms, you can specify multiple Saved Search filters. To see the exact filters being used for the 7 default use case saved search macros, please refer to the Global Phone Numbers Catalog FAQ.

| SavedSearch | Description |
|-------------|-------------|
| twilio.use-case.conversations.(capability) | The Conversations use case allows numbers to setup multi-tenant conversations, and is available for both Voice and Sms. Please refer to Proxy for more information. |
| twilio.use-case.marketing.(capability) | The marketing use case ensures you purchase numbers that are designated for marketing traffic by local telecom regulators. The marketing saved search is available for both Voice and Sms. Please refer to Twilio's Marketing site for more information. |
| twilio.use-case.notifications.(capability) | The Notifications use case allows numbers to be used to notification purposes, and is available for both Voice and Sms. Please refer to Twilio's Account Notifications site for more information. |
| twilio.use-case.verifications.(capability) | The Verifications use case allows numbers to be used for security verification purposes, and is available for both Voice and Sms. Please refer to Twilio's Verification site for more information. |
| twilio.use-case.pbx-collaborations.Voice | The PBX Collaborations use case allows numbers to be used for your private branch exchange network, and is available for Voice only. Please refer to Twilio's Elastic SIP Trunking site for more information. |
| twilio.use-case.contact-centers.(capability) | The Contact Centers use case allows numbers to be used for information and communication exchange between the contact center and end users. The Contact Centers is available for both Voice and Sms. Please refer to Twilio's Contact Center site for more information. |
| twilio.use-case.call-tracking.(capability) | The Call Tracking use case allows you to take control over how you track and route calls and texts from any traffic source. The Call Tracking use case is available for Voice only. Please refer to Twilio's Call Tracking site for more information. |

## Search for US 2-way Voice numbers

```bash
curl -G https://preview.twilio.com/Numbers/AvailableNumbers \
-d "Geography.IsoCountry=US" \
-d "Capabilities.Voice.InboundConnectivity=true" \
-d "Capabilities.Voice.OutboundConnectivity=true" \
-d "Capabilities.Voice.InboundCallerIdPreservation=international" \
-u '<ACCOUNT_SID:AUTH_TOKEN>'
```

**Output:**

```json
{
    "items": [
        {
            "phone_number": "+18005559306",
            "base_setup_price": "0.0",
            "base_recurring_price": "2.0",
            "capabilities": {
                "voice": {
                    "inbound_connectivity": true,
                    "outbound_connectivity": true,
                    "e911": true,
                    "fax": true,
                    "sip_trunking": true,
                    "calls_per_second": 1,
                    "concurrent_calls_limit": 1,
                    "long_record_length": 30,
                    "inbound_called_dtmf": true,
                    "inbound_caller_dtmf": true,
                    "inbound_caller_id_preservation": "international",
                    "inbound_reachability": "global"
                },
                "sms": {
                    "inbound_connectivity": true,
                    "outbound_connectivity": true,
                    "gsm7": true,
                    "ucs2": true,
                    "gsm7_concatenation": true,
                    "ucs2_concatenation": true,
                    "inbound_sender_id_preservation": "international",
                    "inbound_reachability": "global",
                    "inbound_mps": -1
                },
                "mms": {
                    "inbound_connectivity": true,
                    "outbound_connectivity": true,
                    "inbound_reachability": "global",
                    "inbound_mps": -1
                }
            },
            "regulatory": {
                "address_requirements": "none"
            },
            "type": "tollfree",
            "lifecycle": "generally-available",
            "geography": {
                "iso_country": "US",
                "lata": null,
                "rate_center": null,
                "latitude": null,
                "longitude": null,
                "region": null,
                "locality": null,
                "postal_code": null
            }
        }
    ],
    "meta": {
        "page": 0,
        "page_size": 50,
        "first_page_url": "https://preview.twilio.com/Numbers/AvailableNumbers?PageSize=50&Page=0",
        "previous_page_url": null,
        "url": "https://preview.twilio.com/Numbers/AvailableNumbers?PageSize=50&Page=0",
        "next_page_url": null,
        "key": "items"
    }
}
```

## Search for US 2-way SMS numbers

```bash
curl -G https://preview.twilio.com/Numbers/AvailableNumbers \
-d "Geography.IsoCountry=US" \
-d "Capabilities.Sms.InboundConnectivity=true" \
-d "Capabilities.Sms.OutboundConnectivity=true" \
-d "Capabilities.Sms.InboundSenderIdPreservation=international" \
-u '<ACCOUNT_SID:AUTH_TOKEN>'
```

**Output:**

```json
{
    "items": [
        {
            "phone_number": "+18005559306",
            "base_setup_price": "0.0",
            "base_recurring_price": "2.0",
            "capabilities": {
                "voice": {
                    "inbound_connectivity": true,
                    "outbound_connectivity": true,
                    "e911": true,
                    "fax": true,
                    "sip_trunking": true,
                    "calls_per_second": 1,
                    "concurrent_calls_limit": 1,
                    "long_record_length": 30,
                    "inbound_called_dtmf": true,
                    "inbound_caller_dtmf": true,
                    "inbound_caller_id_preservation": "international",
                    "inbound_reachability": "global"
                },
                "sms": {
                    "inbound_connectivity": true,
                    "outbound_connectivity": true,
                    "gsm7": true,
                    "ucs2": true,
                    "gsm7_concatenation": true,
                    "ucs2_concatenation": true,
                    "inbound_sender_id_preservation": "international",
                    "inbound_reachability": "global",
                    "inbound_mps": -1
                },
                "mms": {
                    "inbound_connectivity": true,
                    "outbound_connectivity": true,
                    "inbound_reachability": "global",
                    "inbound_mps": -1
                }
            },
            "regulatory": {
                "address_requirements": "none"
            },
            "type": "tollfree",
            "lifecycle": "generally-available",
            "geography": {
                "iso_country": "US",
                "lata": null,
                "rate_center": null,
                "latitude": null,
                "longitude": null,
                "region": null,
                "locality": null,
                "postal_code": null
            }
        }
    ],
    "meta": {
        "page": 0,
        "page_size": 50,
        "first_page_url": "https://preview.twilio.com/Numbers/AvailableNumbers?PageSize=50&Page=0",
        "previous_page_url": null,
        "url": "https://preview.twilio.com/Numbers/AvailableNumbers?PageSize=50&Page=0",
        "next_page_url": null,
        "key": "items"
    }
}
```

## Local Mms Example

```bash
curl -G https://preview.twilio.com/Numbers/AvailableNumbers \
-d "Type=local" \
-d "Capabilities.Mms.OutboundConnectivity=true" \
-d "Capabilities.Mms.InboundReachability=global" \
-u '<ACCOUNT_SID:AUTH_TOKEN>'
```

**Output:**

```json
{
  "items": [
    {
      "phone_number": "+16315550000",
      "capabilities": {
        "voice": {
          "inbound_connectivity": true,
          "outbound_connectivity": true,
          "e911": true,
          "fax": true,
          "sip_trunking": true,
          "calls_per_second": 30,
          "concurrent_calls_limit": 30,
          "long_record_length": 30,
          "inbound_called_dtmf": true,
          "inbound_caller_dtmf": true,
          "inbound_caller_id_preservation": "international",
          "inbound_reachability": "global",
          "codecs": [
            "g711u"
          ]
        },
        "sms": {
          "inbound_connectivity": true,
          "outbound_connectivity": true,
          "gsm7": true,
          "ucs2": true,
          "gsm7_concatenation": true,
          "ucs2_concatenation": true,
          "inbound_sender_id_preservation": "international",
          "inbound_reachability": "global",
          "inbound_mps": -1
        },
        "mms": {
          "inbound_connectivity": true,
          "outbound_connectivity": true,
          "inbound_reachability": "global",
          "inbound_mps": -1
        }
      },
      "regulatory": {
        "address_requirements": "none"
      },
      "type": "local",
      "lifecycle": "generally-available",
      "geography": {
        "iso_country": "US",
        "lata": 132,
        "rate_center": "HUNTINGTON",
        "latitude": 40.8719,
        "longitude": -73.4347,
        "region": "NY",
        "locality": "HUNTINGTON",
        "postal_code": "11743"
      }
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://preview.twilio.com/Numbers/AvailableNumbers/US?Type=local&Capabilities.Mms.OutboundConnectivity=true&Capabilities.Mms.InboundReachability=global&PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://preview.twilio.com/Numbers/AvailableNumbers/US?Type=local&Capabilities.Mms.OutboundConnectivity=true&Capabilities.Mms.InboundReachability=global&PageSize=50&Page=0",
    "next_page_url": null,
    "key": "items"
  }
}
```

## Troubleshooting

> **Info:** Getting 404 Errors?
>
> If you receive a 404 error when making requests to this endpoint, ensure you're using the exact URL: `https://preview.twilio.com/AvailableNumbers`
>
> If the URL is correct and you're still getting a 404, contact Twilio support to request access to this preview API as you have not yet been granted access.