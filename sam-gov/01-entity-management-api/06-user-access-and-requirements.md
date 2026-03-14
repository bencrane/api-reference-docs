# User Access and Requirements

User Requirements

To access Public data:

Users must have a non-Federal/Federal Individual (Personal) account and the respective API Key, a non-Federal/Federal System Account with the “Read Public” permission and the respective API Key in SAM.gov.
Users can make GET calls using any Browser or a Restful API client such as Postman.
To access FOUO (CUI) data:

Users must have a Federal System Account with the “Read FOUO” permission and the respective API Key in SAM.gov.
Users can make GET calls using any Browser or a Restful API client such as Postman.
To access Sensitive (CUI) data:

Users must have a Federal System Account with the “Read Sensitive” permission and the respective API Key in SAM.gov.
Users must make POST calls using a Restful API client such as Postman.
Individual (Personal) Accounts

The SAM.gov Federal or non-Federal registered users must obtain the API Key from the https://sam.gov/profile/details page using the field, “Public API Key”.
image info
Click on the “Eye” icon, enter the “Enter One-time Password” (this value will be sent to your email address that is associated with your registered account), hit “Submit”, for the API Key value to appear in the box.
System Accounts

The SAM.gov non-Federal registered users must request for a System Account. If their registration and request criteria are satisfied, then they will be provided with the System Accounts” widget on their SAM.gov “Workspace” page.
The SAM.gov Federal registered users must contact their CCB representatives for obtaining the “System Accounts” widget on their SAM.gov “Workspace” page.
Users must create their System Account using the “System Accounts” widget and get it approved.
Users must then set the password for the System Account.
After the above step is successfully completed, users will see a new section for retrieving the API Key. Users must enter the password to retrieve this value.
System Accounts must satisfy the following criteria to successfully utilize the Entity Management API:

System Information
Unique System ID: The System Account ID
Permissions
Entity Information: read public –> Gives access to the Public data.
Entity Information: read public, read fouo –> Gives access to the Public and FOUO (CUI) data.
Entity Information: read public, read fouo, read sensitive –> Gives access to the Public, FOUO (CUI) and Sensitive (CUI) data.
Security Information
IP Address: List all the IP Addresses that the System invokes the API from.
Type of Connection: REST APIs
System Account Password
System Account API Key
API Key Rate Limits

Type of User Account	Type of API Key	Default API Daily Rate Limit
Non-federal user with no Role in SAM.gov	Personal API key	10 requests/day
Non-federal user with a Role in SAM.gov	Personal API key	1,000 requests/day
Federal User	Personal API key	1,000 requests/day
Non-federal System user	System account API key	1,000 requests/day
Federal System user	System account API key	10,000 requests/day
Sensitive API Process:
The System Account User ID and Password must be sent as "Basic Auth" under the "Authorization" Header. The combination needs to be base 64 encoded as base64(username:password).
The API Key value must be sent as "x-api-key" under "Headers" and not directly in the request URL.
The "Accept" parameter must be sent as "application/json" under "Headers".
The "Content-Type" parameter must be sent as "application/json" under "Headers".
All the optional search filters can be sent in the request URL or in the "Body".
An example of the Sensitive entity management POST call using curl

Curl request with basic auth token:
curl -X POST "https://api.sam.gov/entity-information/v2/entities?ueiSAM=< UEI >" --header "X-Api-Key: < a valid API Key >" --header "Content-Type: application/json" --header "Accept: application/json" --header "Authorization: Basic < auth token >"

Curl request with username and password:
curl -X POST "https://api.sam.gov/entity-information/v2/entities?ueiSAM=< UEI >" --header "X-Api-Key: < a valid API Key >" --header "Content-Type: application/json" --header "Accept: application/json" --user "< username >:< password >"



Utilizing the API Extract

To retrieve Entity data in the CSV format, “format=csv” must be provided in the request.
To retrieve Entity data in the JSON format, “format=json” must be provided in the request.
If the request is executed successfully, then a file downloadable URL with Token will be returned. This URL can also be obtained in emails by providing “emailId=Yes” in the request.
In the file downloadable URL, the phrase REPLACE_WITH_API_KEY must be replaced with a valid API Key and sent as another request.
If the file is ready for download, then the users can retrieve it. If the file is not ready for download, then the users will need to try again in some time.
Back to top

