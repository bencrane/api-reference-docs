# Tutorials - Advanced Call Handling - Voice Recording Encryption

Voice Recording Encryption





(information)
Twilio Editions feature
Voice Recording Encryption is available to Twilio Enterprise Edition and Twilio Security Edition customers. Learn more about Editions

.
Voice Recording Encryption provides additional security on your Twilio Programmable Voice Recordings. It allows you to encrypt your recordings with a public key.


(warning)
Warning
Once you activate the Voice Recording Encryption feature, only you will be able to decrypt the recordings. There is no one at Twilio, including Twilio support, that will be able to decrypt your recordings. Therefore testing of this feature should only be done on test accounts with non-production recordings.
How Voice Recording Encryption works





Today, by default, all Programmable Voice Recordings are encrypted at rest while stored in Twilio's cloud storage. With Voice Recording Encryption enabled, your recordings are encrypted with your public key as soon as the call ends, while the recording is within the Twilio infrastructure, and before it is in cloud storage. The recording remains in this encrypted state until you retrieve it, ensuring that the recording can only be accessed by you, the holder of the corresponding private key.

The Voice Recording Encryption feature is implemented using hybrid encryption

. The following are the summarized set of steps of encryption/decryption for each recording.

Twilio encryption steps





Twilio generates a random Content Encryption Key (CEK) for each recording.
Twilio encrypts the recording content with the generated CEK using the AES256-GCM

 cipher.
Twilio encrypts the CEK with the customer's public key using the RSAES-OAEP-SHA256-MGF1 cipher.
Customer decryption steps





Customer retrieves the CEK and Initial Vector (IV) encryption values for the recording.
Customer decrypts the CEK using their private key.
Customer decrypts the recording content using the CEK, along with the IV encryption value.
Detailed decryption steps and code samples can be found later in this guide.

Configuring Voice Recording Encryption





Step 1: Generate a RSA key pair





First, generate an RSA public/private key pair. There are many different ways to do this, we recommend using openssl

. Once you have openssl installed, you can generate a 2048 length private key with this command:



Copy code block
openssl genrsa -out private_key.pem 2048
The generated file, private_key.pem, contains your private key, which will look something like this:



Copy code block
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAtePBUk3IM45Jj8eFFrmwzjr/2seEtMknl5OD7VDBipazsq5v
MBnIYcE+EuzDiFC5XXww9rncFRZC0I3hLUejUTkJNZjMDQzVFkGXo9+A4MsXRZqK
OOYhCNAr2C1acpHKK6bEqGhRW2F2R0dSndbEKOCpPKD70ZF2aZyQdb//9104ROdh
bvsycQD7ZGQ8V5SoUo6kPBjQv1sbi99LN6uQm+trUDHkBhbpeKU836YPpIH1ZAqG
h2sSzRHN0eXdOPYNdu649ZuOSz0kIUN22e8R39suRhu6VbrC2kvVz2Su+tSPMWlp
gKjMboVKrsWUH9B1fQM9ajixc8fc892ZoGBqaQIDAQABAoIBAQCd5BlbEr4pUui0
cOQs+ABs5XZYOj4OmVdPEvTAuwtm/K78+sL2JEt34EG8N978o+ZlKntukaRkgbB6
Tc8ceUViKnq+Fed7pJoM+d9il4/Okz2eZCp8ffhLKDoHLEeJkNjIz7mC3xtQkegU
s+sZrOcW/P6r7KrsHrOFti0IqiTOWps1M6gIUKFWcIRIh/6SyN0gmdDxmfGD9o4W
CePswAS0fmwMZPCwQ9GazC8iVL+CvrF92UNfmNQSUiuR0GynOlsMnDu2GvSim3yO
9lqWAo1yyEBVU8x6pS1wFTdsXQ7Ch2Ei9ZU+XE6SL5lq3jSc8WqIGmLvZ+zw5eAR
8J73+fkBAoGBAO12zPHKgvN5nHRTrO3gNVcl92201umLHllf2elOjlE98/qtNsuX
R96LILDv4rgSjwH0+eVQW2g2B5o3D6KPvXdEvUmaRIXDValqr1UzED1DFWLs1MQK
HO30rJSpfWpTD3B56zvMb620avIBv3+Oe6kmjImn7Db/nyuEZrs49sE5AoGBAMQW
bAXgbG5GDUMVvJfrWwiXz3Ip7yv2j6xz5MtU58gytVV2ZnesLSCfpKrUpalPDWsX
04ZBuZ7bqZR4UpGQnGlYePtttKMdI4Vbo+tPK8gNN8ELu+8Fgmr0UNv3BWmcSRzo
AfiWWIHZS6iAkPoaYWQtCtf3WU0wnt/beiP/NWKxAoGAafCUYlLMtT7OE/+4qK9c
XLLtfh4tuyd7tLfUigen6orPLEjWp2GoiJpdTVLYPPLapi7axflhrk5ceeqSqR2j
k3AxWoLeiyaoMtsLueD8H7ir8+Rgz80LNwXvcKtk7mh7/NwHnDgKot5Yz/sDqi6w
8Lfn/wnRkn/cTRfWlTRGsdECgYEAuXjP4lsdlMyT3MFhqnzGlYEqibyaaoYD7cWN
Qrpjplw4YsbkMwvbf4EhOyh6LYQFmCdoPxRJ47W4WCPbTa5wE8DIZmGlO6fjIk/E
41z2d3nxI5rav0IB0vKWzQiAyR03lqzouF5VBzUmuBIrjzWGqz9jg1WF1VpI3Er3
47aQo3ECgYBQ7UZ3IP1+unprNsvVDT4CbjsoAypstmQhfgxYiNPY0wB7rvTOWT3q
3vwOBwVBjfvkG8yYglYgHc0xGOrqL6DxhMUFTxBe0iDvBX0QM1tpp4apsKdHvuuQ
h1icaQZp8WKxBOzVilj3DLoHJEyIrsWWMnDHazV4fxbxijpj4uwJCw==
-----END RSA PRIVATE KEY-----

(information)
Info
If your particular project/cryptography library requires PKCS8 syntax,

 you can convert your private key to PKCS #8 format by executing the following:



Copy code block
openssl pkcs8 -in private_key.pem -topk8 -nocrypt -out private_key_pkcs8.pem
You will need to do this for our Java Decryption Tool

 and our JavaScript Decryption

 Tool.

(warning)
Warning
It is your responsibility to keep your private key safe. Losing your private key means that you will not be able to decrypt any of the files that were encrypted with the corresponding public key.
You can obtain the public key by executing the following command:



Copy code block
openssl rsa -in private_key.pem -pubout -out public_key.pem
The file public_key.pem contains the public key. It should look something like this:



Copy code block
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtePBUk3IM45Jj8eFFrmw
zjr/2seEtMknl5OD7VDBipazsq5vMBnIYcE+EuzDiFC5XXww9rncFRZC0I3hLUej
UTkJNZjMDQzVFkGXo9+A4MsXRZqKOOYhCNAr2C1acpHKK6bEqGhRW2F2R0dSndbE
KOCpPKD70ZF2aZyQdb//9104ROdhbvsycQD7ZGQ8V5SoUo6kPBjQv1sbi99LN6uQ
m+trUDHkBhbpeKU836YPpIH1ZAqGh2sSzRHN0eXdOPYNdu649ZuOSz0kIUN22e8R
39suRhu6VbrC2kvVz2Su+tSPMWlpgKjMboVKrsWUH9B1fQM9ajixc8fc892ZoGBq
aQIDAQAB
-----END PUBLIC KEY-----
In the next step, you will configure Twilio with this public key.

Step 2: Create a Twilio Public Key resource






(warning)
Warning
Twilio is launching a new Console. Some screenshots on this page may show the Legacy Console and therefore may no longer be accurate. We are working to update all screenshots to reflect the new Console experience. Learn more about the new Console

.
Once you have the RSA public key, you should create a Twilio Public Key resource that contains your public key. You can do this with the Public Key Resource REST API or, in the Console

.

To configure the public key in the Console, navigate to Runtime > Credentials

 in the Console and click the Create new Credential button:

Twilio Credentials page showing no Push Credentials with a 'Create new Credential' button.

Expand image
Provide a friendly name for your public key. Then, copy the full contents of the public_key.pem file generated in step 1 — including the BEGIN PUBLIC KEY and END PUBLIC KEY lines — and paste it into the PUBLIC KEY field. Click Create to create the Twilio Public Key:

New credential creation form showing fields for friendly name, type, and a public key, with options to cancel or create.

Expand image

(warning)
Warning
Once you submit the Twilio Public Key resource, the public key itself will no longer be retrievable from Twilio. All future references to this particular public key will be the via an associated unique SID identifier, with the form CRxx.
Twilio's Credentials page showing a public key named 'my-own-public-key' with SID and creation date details.

Expand image
Step 3: Enable Voice Recording Encryption in the Console





You can enable Voice Recording Encryption at a project or subaccount level via the Console:

Navigate to Programmable Voice > Settings

.
Enable the feature and specify the public key you uploaded in step 2.
Save your settings.
All recordings created thereafter on this account will be encrypted with the configured public key.
Voice Recording Encryption - Console Enablement.

Expand image
Decrypting Your Recordings





Step 4: Retrieve recording specific encryption details





Obtain the public_key_sid, encrypted_cek, and iv parameters within EncryptionDetails JSON object, which you can retrieved by making an HTTP GET request to the Recordings resource. The EncryptionDetails data will also be posted to your RecordingStatusCallback.

EncryptionDetails includes relevant encryption details if the recording was encrypted with the Voice Recording Encryption feature. It will be null if the recording was not encrypted. The parameters within EncryptionDetails include :

Parameters	Description
type	The type of encryption. Currently, the only value supported is rsa-aes.
public_key_sid	A 34-character string that uniquely identifies the public key resource used as by the recording encryption.
encrypted_cek	Base64-encoded Content Encryption Key (CEK) used as part of recording encryption.
iv	Base64-encoded randomly generated Initial Vector (IV) used as part of recording encryption.
Make a GET request





Any recording encrypted with Voice Recording Encryption will contain additional encryption properties on the recording resource. See the request/response example below to query the recording resource metadata.

The request:



Copy code block
curl -X GET 'https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Recordings/REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json'
The response:



Copy code block
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "call_sid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "conference_sid": "CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "channels": 1,
  "date_created": "Fri, 14 Oct 2016 21:56:34 +0000",
  "date_updated": "Fri, 14 Oct 2016 21:56:38 +0000",
  "start_time": "Fri, 14 Oct 2016 21:56:34 +0000",
  "price": "-0.0025",
  "price_unit": "USD",
  "duration": "4",
  "sid": "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "source": "StartConferenceRecordingAPI",
  "status": "completed",
  "error_code": null,
  "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Recordings/REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json",
  "subresource_uris": {
    "add_on_results": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Recordings/REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/AddOnResults.json",
    "transcriptions": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Recordings/REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Transcriptions.json"
  },
  "encryption_details": {
    "type": "rsa-aes",
    "encryption_public_key_sid": "CRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "encryption_cek": "OV4h6zrsxMIW7h0Zfqwfn6TI2GCNl54KALlg8wn8YB8KYZhXt6HlgvBWAmQTlfYVeLWydMiCewY0YkDDT1xmNe5huEo9vjuKBS5OmYK4CZkSx1NVv3XOGrZHpd2Pl/5WJHVhUK//AUO87uh5qnUP2E0KoLh1nyCLeGcEkXU0RfpPn/6nxjof/n6m6OzZOyeIRK4Oed5+rEtjqFDfqT0EVKjs6JAxv+f0DCc1xYRHl2yV8bahUPVKs+bHYdy4PVszFKa76M/Uae4jFA9Lv233JqWcxj+K2UoghuGhAFbV/JQIIswY2CBYI8JlVSifSqNEl9vvsTJ8bkVMm3MKbG2P7Q==",
    "iv": "8I2hhNIYNTrwxfHk"
  }
}
RecordingStatusCallback





RecordingStatusCallback is the reliable way to receive webhooks for completed or failed recordings. See this RecordingStatusCallback support article

 for more details.

Subscribe to 'failed' RecordingStatusCallbackEvent to receive callbacks in recording encryption failure scenarios; these are described later in this article.

Here is an example of a RecordingStatusCallback webhook with encryption parameters:



Copy code block
"RecordingSource": "OutboundAPI"
"EncryptionDetails": "{"type":"rsa-aes","public_key_sid":"CR201607f4ca45a533cdca8d9a828c2a87","encrypted_cek":"ZriXxBEXSywEohXQZV53KGvyzAO1HpKRxCuMo/pcKiT7C+bWKfelZuX0eW1jb7iGcESrOqwvLo4v4GVRPDdJKsaO6R/AVTDcA+he5syPDBgg20ECilAhC/9/CNxfbIuQD+rRKmx0O7SOJJyazbc4zlv+4ClWwDm6g/8z0ekpYs/tNrlQenbxU/Un9uLeeBaJtFKeK5YSUea5n3Kce22iaPZMy3WUGBg+JfOHrccvCjDjX5QQ21I3rcdpgb5nwpzf3MQwmExhW8SJtmQ1cL4jDeKojM255HhhcgOYDwcyrTfY7svUkqNrEKei1q5ZFdBl+SjjKfSdE0BgEvTceZZYrQ==","iv":"7MiadYE7QDgVSRm9"}"
"RecordingSid": "REb719a56ceca43b2d06967983570e658a"
"RecordingUrl": "https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Recordings/REb719a56ceca43b2d06967983570e658a"
"RecordingStatus": "completed"
"RecordingChannels": "1"
"ErrorCode": "0"
"CallSid": "CA5987df4d600665d67f53e1bd4cec76d6"
"RecordingStartTime": "Tue, 28 May 2019 02:18:02 +0000"
"AccountSid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
"RecordingDuration": "5"
Step 5: Decrypt using private key and encryption parameters





Retrieve customer private key corresponding to public_key_sid and use it to decrypt the base64-encoded encrypted_cek from your retrieved EncryptionDetails object.
Use the decrypted CEK and the base 64-encoded iv from your retrieved EncryptionDetails object to initialize an AES256-GCM SecretKey object.
Decrypt the encrypted recording using the SecretKey.

(information)
Info
If you are using a decryption tool that requires the authentication tag, this tag is returned in the last 16 bytes of the ciphertext.
To help you with your own code, here are some decryption code samples in key languages:

Java

Note: Your private key must be in PKCS8 format for this tool.
JavaScript

Note: Your private key must be in PKCS8 format for this tool.
Python

C#

Python Example

```python
import base64
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
def decrypt_recording():
    print("Twilio Sample Code to Decrypt Twilio encrypted recordings")
    # This code sample assumes you have added cryptography.hazmat library to your project
    # Follow "Per Recording Decryption Steps"
    # https://www.twilio.com/docs/voice/tutorials/call-recording-encryption#per-recording-decryption-steps-customer
    # 1) Obtain encrypted_cek, iv parameters within EncryptionDetails via recordingStatusCallback or
    # by performing a GET on the recording resource
    encrypted_cek = "dYiRmp39kCJt3HOT2VmBGp7SHVEzcuku4o5eRftvNvdes1aPKvrHJbvzqN8Bhr3tmVtSQnmP0oannvo098oCTRJY" \
                    "sWIe0sWmnOpwWWC09YAOwowgRtYgY/gr+IR357exAJ/1L0cWVz5MuSHFBN2Vbd673WhK51QzOXi9H+wuXEhGJmiV" \
                    "KK38BmMVYg2EopFXKVlwA/kOQHVvRlyQ6RlNB1pvLFY/isnJ3FCldyyayf/LqvFXU2ZAVl446Z0ZLpQCJBR3wIIZ" \
                    "cABaEGYtzAjBLWEHkc9FICfM5xMWGfHzgYzmgTfIn8ldMUXPYbU0kh67ErbEa6v0w5zDifOQxsX5Cg=="
    iv = "uFM4mEKKptceQs/L"
    # 2) Retrieve customer private key corresponding to public_key_sid and use it to decrypt base 64 decoded
    # encrypted_cek via RSAES-OAEP-SHA256-MGF1
    private_key = open("/Users/bkumar/Desktop/private_key.pem", mode="rb")
    key = serialization.load_pem_private_key(private_key.read(), password=None, backend=default_backend())
    private_key.close()
    encrypted_recording_file_path = "/Users/bkumar/Desktop/RE41523cf58cc74597e38b957be84d6d13.wav"
    decrypted_recording_file_path = "/Users/bkumar/Desktop/RE41523cf58cc74597e38b957be84d6d13-decrypted.wav"
    decrypted_cek = key.decrypt(
        base64.b64decode(encrypted_cek),
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    # 3) Initialize a AES256-GCM SecretKey object with decrypted CEK and base 64 decoded iv
    decryptor = Cipher(
        algorithms.AES(decrypted_cek),
        modes.GCM(base64.b64decode(iv)),
        backend=default_backend()
    ).decryptor()
    # 4) Decrypt encrypted recording using the SecretKey
    decrypted_recording_file = open(decrypted_recording_file_path, "wb")
    encrypted_recording_file = open(encrypted_recording_file_path, "rb")
    for chunk in iter(lambda: encrypted_recording_file.read(4 * 1024), b''):
        decrypted_chunk = decryptor.update(chunk)
        decrypted_recording_file.write(decrypted_chunk)
    decrypted_recording_file.close()
    encrypted_recording_file.close()
    print("Recordong decrypted Successfully. You can play the recording from " + decrypted_recording_file_path);
if __name__ == "__main__":
    decrypt_recording()
```

https://github.com/TwilioDevEd/encrypted-media-recordings/blob/master/voice-recordings-decryptor/python/RecordingsDecryptor.py