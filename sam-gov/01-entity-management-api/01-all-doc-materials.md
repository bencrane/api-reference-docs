# All Doc Materials

# SAM.gov Entity Management API

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [API Endpoints](#api-endpoints)
  - [User Requirements](#user-requirements)
  - [Individual (Personal) Accounts](#individual-personal-accounts)
  - [System Accounts](#system-accounts)
  - [API Key Rate Limits](#api-key-rate-limits)
  - [Utilizing the API Extract](#utilizing-the-api-extract)
- [API Description](#api-description)
- [OpenAPI Specification File](#openapi-specification-file)
- [Additional Help References](#additional-help-references)
- [HTTP Response Codes](#http-response-codes)
- [Examples](#examples)
- [Additional Information](#additional-information)
- [Contact Us](#contact-us)
- [Change Log](#change-log)

---

## Overview

The Entity Management API allows users to request Unclassified ("Public"), Controlled Unclassified Information (CUI) "For Official Use Only" (FOUO) or CUI "Sensitive" entity data, based on the sensitivity level of the user account and through several optional request parameters.

### Public Data

This constitutes publicly available entities and their unclassified data such as name, UEI, registration details, physical and mailing addresses, business types, PSC, NAICS and points of contact name and address.

### FOUO (CUI) Data

This constitutes both the publicly available entities and the entities that have opted out of public display with their CUI data such as hierarchy, company and employee security levels and points of contact email address, phone, and fax numbers.

### Sensitive (CUI) Data

This constitutes both the publicly available entities and the entities that have opted out of public display with their CUI data such as banking information and SSN/TIN/EIN.

### Key Features of the Entity Management API

- It offers several optional search parameters, filtering by sections, AND (`&`), OR (`~`), NOT (`!`) conditions and a free text search `q` to obtain the desired data.
- It returns synchronous responses.
- It returns ten records per page in the JSON format.
- It can return only the first 10,000 records.
- The following characters are not allowed to be sent in the parameter values with the API request: `& | { } ^ \`

### Additional Features: Entity Management Extract API

The Entity Management API can serve as an Extract API with the addition of the `format` parameter in the request. Key features:

- It offers several optional search parameters, filtering by sections, AND, OR, NOT conditions and a free text search `q` to obtain the desired data.
- It returns asynchronous responses by sending a file downloadable link.
- It returns data in the JSON or CSV format as selected by the user.
- It can return only the first 1,000,000 records.

---

## Getting Started

### API Endpoints

#### Production

```
https://api.sam.gov/entity-information/v1/entities?api_key=
https://api.sam.gov/entity-information/v1/entities?
https://api.sam.gov/entity-information/v2/entities?api_key=
https://api.sam.gov/entity-information/v2/entities?
https://api.sam.gov/entity-information/v3/entities?api_key=
https://api.sam.gov/entity-information/v3/entities?
https://api.sam.gov/entity-information/v4/entities?api_key=
https://api.sam.gov/entity-information/v4/entities?
```

#### Alpha

```
https://api-alpha.sam.gov/entity-information/v1/entities?api_key=
https://api-alpha.sam.gov/entity-information/v1/entities?
https://api-alpha.sam.gov/entity-information/v2/entities?api_key=
https://api-alpha.sam.gov/entity-information/v2/entities?
https://api-alpha.sam.gov/entity-information/v3/entities?api_key=
https://api-alpha.sam.gov/entity-information/v3/entities?
https://api-alpha.sam.gov/entity-information/v4/entities?api_key=
https://api-alpha.sam.gov/entity-information/v4/entities?
```

### User Requirements

#### To Access Public Data

- Users must have a non-Federal/Federal Individual (Personal) account and the respective API Key, a non-Federal/Federal System Account with the "Read Public" permission and the respective API Key in SAM.gov.
- Users can make GET calls using any Browser or a Restful API client such as Postman.

#### To Access FOUO (CUI) Data

- Users must have a Federal System Account with the "Read FOUO" permission and the respective API Key in SAM.gov.
- Users can make GET calls using any Browser or a Restful API client such as Postman.

#### To Access Sensitive (CUI) Data

- Users must have a Federal System Account with the "Read Sensitive" permission and the respective API Key in SAM.gov.
- Users must make POST calls using a Restful API client such as Postman.

### Individual (Personal) Accounts

The SAM.gov Federal or non-Federal registered users must obtain the API Key from the [https://sam.gov/profile/details](https://sam.gov/profile/details) page using the field, "Public API Key".

Click on the "Eye" icon, enter the "Enter One-time Password" (this value will be sent to your email address that is associated with your registered account), hit "Submit", for the API Key value to appear in the box.

### System Accounts

1. The SAM.gov non-Federal registered users must request for a System Account. If their registration and request criteria are satisfied, then they will be provided with the "System Accounts" widget on their SAM.gov "Workspace" page.
2. The SAM.gov Federal registered users must contact their CCB representatives for obtaining the "System Accounts" widget on their SAM.gov "Workspace" page.
3. Users must create their System Account using the "System Accounts" widget and get it approved.
4. Users must then set the password for the System Account.
5. After the above step is successfully completed, users will see a new section for retrieving the API Key. Users must enter the password to retrieve this value.

#### System Account Criteria

System Accounts must satisfy the following criteria to successfully utilize the Entity Management API:

- **System Information**
  - Unique System ID: The System Account ID
- **Permissions**
  - `Entity Information: read public` → Gives access to the Public data.
  - `Entity Information: read public, read fouo` → Gives access to the Public and FOUO (CUI) data.
  - `Entity Information: read public, read fouo, read sensitive` → Gives access to the Public, FOUO (CUI) and Sensitive (CUI) data.
- **Security Information**
  - IP Address: List all the IP Addresses that the System invokes the API from.
  - Type of Connection: REST APIs
- **Credentials**
  - System Account Password
  - System Account API Key

### API Key Rate Limits

| Type of User Account | Type of API Key | Default API Daily Rate Limit |
|---|---|---|
| Non-federal user with no Role in SAM.gov | Personal API key | 10 requests/day |
| Non-federal user with a Role in SAM.gov | Personal API key | 1,000 requests/day |
| Federal User | Personal API key | 1,000 requests/day |
| Non-federal System user | System account API key | 1,000 requests/day |
| Federal System user | System account API key | 10,000 requests/day |

### Sensitive API Process

- The System Account User ID and Password must be sent as "Basic Auth" under the "Authorization" Header. The combination needs to be base 64 encoded as `base64(username:password)`.
- The API Key value must be sent as `x-api-key` under "Headers" and not directly in the request URL.
- The `Accept` parameter must be sent as `application/json` under "Headers".
- The `Content-Type` parameter must be sent as `application/json` under "Headers".
- All the optional search filters can be sent in the request URL or in the "Body".

#### Example Sensitive POST Calls Using curl

**With basic auth token:**

```bash
curl -X POST "https://api.sam.gov/entity-information/v2/entities?ueiSAM=< UEI >" \
  --header "X-Api-Key: < a valid API Key >" \
  --header "Content-Type: application/json" \
  --header "Accept: application/json" \
  --header "Authorization: Basic < auth token >"
```

**With username and password:**

```bash
curl -X POST "https://api.sam.gov/entity-information/v2/entities?ueiSAM=< UEI >" \
  --header "X-Api-Key: < a valid API Key >" \
  --header "Content-Type: application/json" \
  --header "Accept: application/json" \
  --user "< username >:< password >"
```

### Utilizing the API Extract

- To retrieve Entity data in the CSV format, `format=csv` must be provided in the request.
- To retrieve Entity data in the JSON format, `format=json` must be provided in the request.
- If the request is executed successfully, then a file downloadable URL with Token will be returned. This URL can also be obtained in emails by providing `emailId=Yes` in the request.
- In the file downloadable URL, the phrase `REPLACE_WITH_API_KEY` must be replaced with a valid API Key and sent as another request.
- If the file is ready for download, then the users can retrieve it. If the file is not ready for download, then the users will need to try again in some time.

---

## API Description

### Query String Parameters

The Entity Management API offers several optional search parameters that can be provided independently or in combination with each other.

### Response Schema

The Entity Management API offers several response elements that are described in the following sections.

---

## OpenAPI Specification File

You can view the full details of this API in the OpenAPI Specification file available here: [Open API specification file for the Entity Management API](https://open.gsa.gov/api/entity-api/)

---

## Additional Help References

Go to [SAM.gov Data Services](https://sam.gov) for Reps and Certs Mapping and Data Dictionary documents.

---

## HTTP Response Codes

The API will return one of the following responses:

### 200 — Success

The API call is successful.

### 400 — Bad Request (Application Level Error Messages)

#### Invalid "Date" format

- **v1 or v2:** Date should be specified in the format: `MM/dd/YYYY`.
- **v3:** `"message":"Dates must be specified in the MM/DD/YYYY format.", "detail":"Any Date parameter must be provided in the MM/DD/YYYY format."`

#### Invalid Search Parameter

- **v1 or v2:** `"Invalid Input Parameters","detail":"< user-provided invalid parameter >"`
- **v3:** `"message":"The search parameter, < user-provided invalid parameter > does not exist.", "detail":"Please refer to https://open.gsa.gov/api/entity-api/ for a list of allowable search parameters."`

#### `includeSections`, `emailId` or `format` sent in the `q` parameter

- **v1 or v2:** `The parameters: 'includeSections', 'emailId' or 'format' are not permitted inside Query Param(q).`
- **v3:** `"message":"The search parameters 'includeSections','emailId','format' and 'proceedingsData' are not permitted inside Query Param(q)", "detail":"Please provide these parameters separately".`

#### More than 100 `ueiSAM` values sent

- **v1 or v2:** `A maximum of 100 ueiSAM is allowed.`
- **v3:** `"message": "More than 100 UEI SAM are not allowed.", "detail": "Please limit the number of UEI SAM to 100."`

#### More than 100 CAGE values sent

- **v1 or v2:** `A maximum of 100 CAGE Codes is allowed.`
- **v3:** `"message":"More than 100 CAGE Codes are not allowed.", "detail":"Please limit the number of CAGE Codes to 100."`

#### `emailId` sent on its own

- **v1 or v2:** `The parameter emailId must be provided in conjunction with the parameter format.`
- **v3:** `"message":"The search parameter 'emailId' must be provided in conjunction with the search parameter 'format.", "detail":"Users can opt for receiving the requested JSON/CSV files in their emails."`

#### `entityEFTIndicator` sent on its own

- **v1 or v2:** `entityEFTIndicator filter must be provided in conjunction with ueiSAM filter.`
- **v3:** `"message":"The search parameter 'entityEFTIndicator' must be provided in conjunction with the search parameter 'ueiSAM'.", "detail":"The entityEFTIndicator parameter cannot be provided on its own."`

#### File size exceeded for JSON or CSV exports

- **v1 or v2:** `"Total Number of Records: < the total number > exceeded the maximum allowable limit: 1000000. Please provide a suitable search parameter to refine your search."`
- **v3:** `"message":"Total Number of Records: < the total number > exceeded the maximum allowable limit: 1000000. Please provide a suitable search parameter to refine your search.", "detail":"Count Exceeded Error"`

#### JSON or CSV file generation is in-progress

- **v1 or v2:** `File Processing in Progress. Please check again later.`
- **v3:** `"message": "The requested JSON or CSV file is not generated yet. Please try again later.", "details": "Larger files will take some time to process."`

#### Expired Token for downloading JSON or CSV files

- **v1 or v2:** `"title":"Requested File is Expired and cannot be downloaded","detail":"We are not able to process your request"`
- **v3:** `"message":"The requested JSON or CSV file token is expired.","detail":"Please verify the token number."`

#### More than 10,000 records requested via `page` and `size` parameters

- **v1 or v2:** `"title":"Results Too Large","detail":"The Page and Size search has exceeded 10,000 records (Page multiplied by Size). Please change the Page and Size accordingly."`
- **v3:** `"message":"Results Too Large","detail":"The Page and Size search has exceeded 10,000 records (Page multiplied by Size). Please change the Page and Size accordingly."`

#### More than 10 for `size` requested

- **v1 or v2:** `"title":"size is < user requested size >","detail":"Size Cannot Exceed 10 Records"`
- **v3:** `"message":"size is < user requested size >","detail":"Size Cannot Exceed 10 Records"`

#### Missing "Basic Auth" under "Authorization" and missing System Account credentials

- **v1 or v2:** `No system account credentials are provided. Please provide credentials via basic authentication.`

#### Different IP Address than that mentioned in the System Account

- **v1 or v2:** `IP Addresses associated with this System Account are different from that sending the request. Please submit your requests from a valid system.`

#### API Key does not belong to the System Account

- **v1 or v2:** `System Account and API Key you have provided do not match. Please visit your System Account and obtain the API Key from there.`

#### System Account has a different value for "Type of Connection"

- **v1 or v2:** `"title": "Connection type failure", "detail": "Insufficient privileges to perform the operation - System account must have Type of Connection as Restful"`
- **v3:** `"message": "Connection type failure", "detail": "Insufficient privileges to perform the operation - System account must have Type of Connection as Restful"`

#### GET used with System Accounts for Sensitive data

- **v1 or v2:** `GET requests for Sensitive data are no longer supported. Please use POST requests to access the Sensitive Entity data.`
- **v3:** `"message": "Permission denied", "detail": "GET requests for Sensitive data are no longer supported. Please use POST requests to access the Sensitive Entity data."`

#### Insufficient API Key privileges to download a JSON or CSV File

- **v1 or v2:** `The API Key is not authorized to access this < file type > Extract`
- **v3:** `The API Key is not authorized to access this < file type > Extract`

#### Non-existing Reps and Certs PDF file requested

- **v1, v2, v3:** `The requested PDF File does not exist; the entity did not answer this type of Representations and Certifications data.`

#### `proceedingsData=Yes` sent on its own or with wrong `includeSections`

- **v3:** `"message": "The search parameter 'proceedingsData' must be provided in conjunction with includeSections=integrityInformation."`

#### `proceedingsData` contains an invalid value

- **v3:** `"message": "The search parameter 'proceedingsData' contains an invalid value - < user provided invalid value >."`

#### `proceedingsData` sent with `samRegistered=No`

- **v3:** `"message": "The search parameter 'proceedingsData' does not apply to unregistered (samRegistered=No) entities."`

### 401 — Unauthorized

1. **Missing "Basic Auth" under "Authorization" and missing System Account credentials:**
   - **v3:** `"message": "The System Account Credentials are missing", "detail": "Please provide valid System Account User Name and Password."`

2. **Providing "Basic Auth" under "Authorization", but missing or invalid System Account credentials:**
   - **v1 or v2:** `Unauthorized`
   - **v3:** `Unauthorized`

3. **Different IP Address than that mentioned in the System Account:**
   - **v3:** `"message": "Invalid IP Address", "detail": "The IP Addresses sending the API requests and the ones associated with the System Account must be the same."`

4. **API Key does not belong to the System Account:**
   - **v3:** `"message": "System Account-API Key Mismatch", "detail": "The System Account and API Key you have provided do not match. Please refer to your System Account and obtain the API Key from there."`

### 403 — Forbidden

1. **Missing API Key:**
   - **v1 or v2:** `No api_key was supplied in request body. Please submit with a valid API key.`
   - **v3:** `No api_key was supplied in request body. Please submit with a valid API key.`

2. **Invalid API Key:**
   - **v1 or v2:** `An invalid API key was supplied. Please submit with a valid API key.`
   - **v3:** `An invalid API key was supplied. Please submit with a valid API key.`

### 406 — Not Acceptable

1. **Missing Accept Header:**
   - **v1 or v2:** `"title": "Invalid Accept Header", "detail": "Request Header parameter needs to pass valid Accept value"`
   - **v3:** `"message": "Missing or Invalid Request Header, Accept", "detail": "The allowable values are application/json, application/zip."`

2. **Invalid Accept Header:**
   - **v1 or v2:** `"title": "Invalid Accept Header", "detail": "Could not find acceptable representation"`
   - **v3:** `"title": "Invalid Accept Header","detail": "Could not find acceptable representation"`

### 415 — Unsupported Media Type

**Missing or Invalid Content-Type Header:**
- **v1 or v2:** `"title": "Invalid Content-Type Header", "detail": "Request Header parameter needs to pass valid Content-Type value"`
- **v3:** `"message": "Missing or Invalid Request Header, Content_Type", "detail": "The allowable value is application/json."`

> **NOTE:**
> - Error messages in v1 and v2 are returned in this format: `httpStatus, title, detail, errorCode, source`
> - Error messages in v3 are returned in this format: `Status, timestamp, message, detail, errorCode, transaction_id`

---

## Examples

### Example 1

**Post April 3rd, 2022, I would like to obtain the registered entities that have undergone Address change and Name change resulting from EVS Monitoring.**

- Request URL
- Response (JSON Output)

### Example 2

**Post April 3rd, 2022, I would like to obtain the publicly available not registered/ID Assigned entities.**

- Request URL
- Response (JSON Output)

### Example 3

**Get the "entityRegistration" and "coreData" sections for all the "Joint Venture Women" or "Asian-Pacific" Entities that are registered for "All Awards" or "Federal Assistance Awards".**

- Request URL
- Response (JSON Output)

### Example 4

**Get Entities with no Hierarchy, a small hierarchy, and a large Hierarchy.**

- Request URL
- Response (JSON Output)

### Example 5

**Get an Entity with no EVS Monitoring.**

- Request URL
- Response (JSON Output)

### Example 6

**How do I obtain both the Public and NPDY registered "Responsibility & Integrity Record" data with my Public API Key?**

- Request URL
- Response (JSON Output)

### Example 7

**How do I obtain both the Public and NPDY not registered/ID Assigned "Responsibility & Integrity Record" data with my Public API Key?**

- Request URL
- Response (JSON Output)

### Example 8

**I have a Fed System Account and the Role required to access the not registered/ID Assigned entities. How can I obtain them?**

- Request URL
- Response

### Example 9

**I would like to obtain an asynchronous CSV file of the Active registered entities.**

- Request URL
- Response

### Example 10

**Get a JSON file of all the Entities using the POST request.**

- Request URL
- Response

---

## Additional Information

You can view the full details of the differences between the SAM legacy API and SAM.gov API available here: [Variance Document](https://open.gsa.gov/api/entity-api/)

### Disclaimer: Limitation on Permissible Use of Dun & Bradstreet, Inc. (D&B) Data

This website contains data supplied by third party information suppliers, including Dun & Bradstreet (D&B). For the purposes of the following limitation on permissible use of D&B data, which includes each entity's DUNS Number and its associated business information, "D&B Open Data" is defined as the following data elements: Legal Business Name, Street Address, City Name, State/Province Name, Country Name, County Code, State/Province Code, State/Province Abbreviation, ZIP/Postal Code, Country Name and Country Code.

Entity registration, exclusion, or contract award records in SAM may contain D&B-supplied data. Applicable records containing D&B data include all entity registration records with a last updated date earlier than 4/4/2022, all exclusions records with a created date earlier than 4/4/2022, and all base award notices with an award date earlier than 4/4/2022. These records show the Entity Validation Service (EVS) Source as D&B in outbound data streams.

D&B hereby grants you, the user, a license for a limited, non-exclusive right to use D&B Open Data within the limitations set forth herein. By using this website you agree that you shall not use D&B Open Data without giving written attribution to the source of such data (i.e., D&B) and shall not access, use or disseminate D&B Open Data in bulk, (i.e., in amounts sufficient for use as an original source or as a substitute for the product and/or service being licensed hereunder).

Except for data elements identified above as D&B Open Data, under no circumstances are you authorized to use any other D&B data for commercial, resale or marketing purposes (e.g., identifying, quantifying, segmenting and/or analyzing customers and prospective customers). Systematic access (electronic harvesting) or extraction of content from the website, including the use of "bots" or "spiders", is prohibited. Federal government entities are authorized to use the D&B data for purposes of acquisition as defined in FAR 2.101 and for the purpose of managing Federal awards, including sub-awards, or reporting Federal award information.

GSA assumes no liability for the use of the D&B data once it is downloaded or accessed. The D&B data is provided "as is" without warranty of any kind. The D&B data is the intellectual property of D&B. In no event will D&B or any third party information supplier be liable in any way with regard to the use of the D&B data. For more information about the scope of permissible use of D&B data licensed hereunder, please contact D&B at `datause_govt@dnb.com`.

---

## Contact Us

Reach out to the SAM.gov team at [www.fsd.gov](https://www.fsd.gov) for inquiries and help desk support.

### Before Contacting the Help Desk

Conduct your own initial troubleshooting:

- Conduct a recent review of the open.gsa.gov/api specifications
- Confirm you are using an API tool, not a browser to send the request (FOUO & Sensitive Calls)
- Confirm you are using the username/password for the system account that created the API key in the authentication header (Sensitive Calls)
- Confirm you used POST and not GET for this request (Sensitive Calls)
- Confirm that the API key is from a system account (FOUO & Sensitive Calls)
- Confirm that the API key being used is still active
- Confirm that the system account you are using has "read fouo" or "read sensitive" permissions as applicable (FOUO & Sensitive Calls)
- Confirm that the IP addresses registered with your system account are current

### When Submitting Help Desk Tickets

Provide the following:

- The exact API requests that you were trying to send
- The exact error messages that you were receiving
- The exact dates and times when you received the errors
- Screenshots (with the actual API request and the error) [Attach to the ticket]
- The System Account ID/Name that was trying to make API calls
- Screenshots of the parameters used for API call [Attach to the ticket]
- Screenshots of the Headers used for the API call [Attach to the ticket]

### Requesting Access to the Test Site (alpha.sam.gov)

These steps ONLY apply to alpha.sam.gov access requests:

1. Navigate to [www.fsd.gov](https://www.fsd.gov)
2. Sign into the FSD platform using your FSD credentials
3. Select "Create an Incident"
4. Create an Incident with the following details:
   - **System Name:** System for Award Management (SAM)
   - **Is this related to the American Rescue Plan Act?:** No
   - **Issue Type:** Other
   - **Business Type:** Other
   - **Subject (select 1):**
     - **Option A:** I need a role to test in alpha.sam.gov.
     - **Option B:** System account approval in alpha.sam.gov
   - **Please describe the issue:**
     - **Option A:** I have already navigated to alpha.sam.gov and created a user account, following the same steps for creating an account in sam.gov. I would like to conduct testing but do not have the necessary role(s) in alpha.sam.gov. The account that needs role assignment is associated with [EMAIL ADDRESS]. I request a [ROLE] role for the [DOMAIN] domain in alpha.sam.gov.
     - **Option B:** I am creating/editing a system account and have submitted my account in alpha.sam.gov for approval. I would like to request alpha.sam.gov system account review and approval for [Name of the alpha.sam.gov system account].

---

## Change Log

| Date | Version | Description |
|---|---|---|
| 06/03/2019 | v0.9 | Base Version |
| 07/03/2019 | v1.0 | Alpha endpoint for the Sensitive version of the API has been added. Added `agencyBusinessPurposeCode`, `agencyBusinessPurposeDesc`, `bondingLevels`, `companySecurityLevelCode`, `companySecurityLevelDesc`, `highestEmployeeSecurityLevelCode`, `highestEmployeeSecurityLevelDesc` to FOUO and Sensitive API schema. New filters added. Updated `country` and `stateOrProvince` to `countryCode` and `stateOrProvinceCode`. Added `ediInformationFlag`. Updated geographical area served fields. Added `certificationEntryDate`, `certificationExitDate` to SBA Business Types. Added `updateDate` as a filter. |
| 08/15/2019 | v1.1 | Alpha endpoints updated from v0.9 to v1.0. Warning message added under Getting Started. Added Beta.SAM.Gov to page title. |
| 09/25/2019 | v1.2 | Beta endpoints updated from v0.9 to v1.0. |
| 11/25/2019 | v1.3 | Added D&B Disclaimer in Additional Information. Updated specifications for v2 parameters and fields. |
| 12/20/2019 | v1.4 | Removed Email, Fax, US phone number and non-US phone number from public POC sections for v2. Added "COMING SOON" section. |
| 02/25/2020 | v1.5 | Added Examples for v2 requests and responses. Updated Alpha endpoint to meet new API standards. |
| 02/28/2020 | v1.6 | Updated Beta endpoint to meet new API standards. Removed "COMING SOON" information. |
| 05/04/2020 | v1.7 | Added V2 endpoint information. |
| 06/10/2020 | v1.8 | Added the endpoint, new process and an example for the Sensitive API. |
| 08/17/2020 | v1.9 | Updated Sensitive API Process with additional steps (Accept and Content-Type parameters). Updated Example 13 screenshots. Added HTTP codes 406, 415. |
| 10/15/2020 | v2.0 | Updated `correspondenceFlag` description. Added HTTP response for `entityEFTIndicator` without `ueiDUNS`/`ueiSAM`. Updated `entityEFTIndicator` parameter description. |
| 12/07/2020 | v2.1 | Added `mpin` to Sensitive response. Added `sbaBusinessTypeCode`, `sbaBusinessTypeDesc`, `companySecurityLevelDesc`, `highestEmployeeSecurityLevelDesc`, `agencyBusinessPurposeDesc` to Query String Parameters. Updated definitions and examples. Updated `emailId` and `sensitivity` parameter descriptions. Corrected zip code fields in V1 monitoring sections. |
| 01/22/2021 | v2.2 | Added highlighted changes message. Updated repsAndCerts schema for Public, FOUO, and Sensitive. Added note to `noPublicDisplayFlag`. Added Beta V2 endpoints. |
| 02/05/2021 | v2.3 | Added message to `includeSections` that user can provide "All". Added message about special characters. Updated `exclusionStatusFlag` definition. |
| 03/12/2021 | v2.4 | Added HTTP Response for invalid IP address. Added note to `sensitivity` parameter. Added note under repsAndCerts about format parameter. Added notes about system account keys. Removed FireFox non-compliance message. |
| 04/08/2021 | v2.5 | Updated Contact Us information. Updated `pointsOfContact` fields for public API. Updated Application Level Error Messages. |
| 05/12/2021 | v2.6 | Updated instances of beta.sam.gov to SAM.gov. Removed non-relevant Beta API information. |
| 07/16/2021 | v2.7 | Updated Basic Auth instructions. Added Type of Connections and Rate Limits table. Updated Contact Us. Added example curl requests. Updated examples. |
| 07/20/2021 | v2.8 | Added v3 documentation. Updated OpenAPI specification file. Updated HTTP Response Codes. Added v3 Examples. |
| 09/21/2021 | v2.9 | Added "Additional Help References" section. |
| 10/06/2021 | v3.0 | Updated "Contact Us" section. |
| 10/21/2021 | v3.1 | Updated Examples with post April 3rd, 2022 behavior. Added error messages #23 and #24. Added Version 3 endpoint. Added notes for until/after April 3rd, 2022 behavior. |
| 02/01/2022 | v3.2 | Updated OpenAPI Specification File for V3 endpoints and `exclusionsStatusFlag` parameter. |
| 04/04/2022 | v3.3 | Removed DUNS information from documentation. |
| 08/08/2022 | v3.4 | Updated to clarify use of Controlled Unclassified Information (CUI) data. |
| 08/10/2022 | v3.5 | Introduced headers for registered vs unregistered/ID Assigned entities. Included Responsibility & Integrity Record API changes. |
| 09/19/2022 | v3.6 | Updated `includeSections` description. Updated `entitySummary` sub section. Added `responsibilityInformationCount` sub section. Modified Example 6, added Example 7, revised numbering. |
| 10/19/2022 | v3.7 | Added `proceedingsData` search parameter. Added validation rules for `proceedingsData`. Updated yaml file. |
| 10/25/2022 | v3.8 | Added `proceedingsRecordCount` field to `proceedingsData` response schema. Updated Example 6 response. Updated Reps and Certs help documentation. |
| 11/25/2022 | v3.9 | Updated SAM Functional Data Dictionary — removed DUNS/D&B references. |
| 01/17/2023 | v4.0 | Revised Data Dictionary with alphabetical ordering. |
| 01/30/2023 | v4.1 | Revised Data Dictionary with Proceedings and Responsibility/Qualification fields. |
| 02/28/2023 | v4.2 | Removed MPIN from Data Dictionary and Overview. Deprecated MPIN in `entityInformation` sub section. |
| 06/27/2023 | v4.3 | Revised Data Dictionary with updated Socio Economic Self Selections. |
| 08/22/2023 | v4.4 | Revised Data Dictionary with updated Business Types. |
| 09/29/2023 | v4.5 | Updated "Additional Help References" to link to SAM.gov Data Services page. |
| 12/06/2024 | v4.6 | Created new V4 Entity Management API with Exceeds Domestic Threshold field in Reps and Certs. Added V4 endpoint information. Updated Query String Parameters and Response Schema for V4. Updated OpenAPI Specification File for V4 endpoints. |