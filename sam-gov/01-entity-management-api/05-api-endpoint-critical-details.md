# API Description

# SAM.gov Entity Management API

## Query String Parameters

The Entity Management API offers several optional search parameters that can be provided independently or in combination with each other.

---

### Sensitivity Level: Public

Publicly available entities and their unclassified data.

| Parameter | Description | Versions |
|-----------|-------------|----------|
| `samRegistered` | By default returns only registered entities. `samRegistered=Yes` (v2). v3/v4 also supports `samRegistered=No` for not registered/ID Assigned. | v2, v3, v4 |
| `samExtractCode` / `registrationStatus` | 1 character code: `A` (Active) or `E` (Expired). `samExtractCode` in v1, `registrationStatus` starting v2. | v1, v2, v3, v4 |
| `ueiSAM` | Unique Entity Identifier SAM. Single 12-character value or up to 100 values. Example: `ueiSAM=RV56IG5JM6G9` | v1, v2, v3, v4 |
| `entityEFTIndicator` | Entity EFT Indicator. Must be used with `ueiSAM`. Example: `entityEFTIndicator=0000` | v1, v2, v3, v4 |
| `cageCode` | Single 5-character value or up to 100 values. Example: `cageCode=00000` | v1, v2, v3, v4 |
| `dodaac` | 9 character value. Example: `dodaac=DOD123456` | v1, v2, v3, v4 |
| `legalBusinessName` | Partial or complete value. Example: `legalBusinessName=ALLTEL` | v1, v2, v3, v4 |
| `dbaName` | Partial or complete value. Example: `dbaName=ALLTEL` | v1, v2, v3, v4 |
| `debtSubjectToOffset` | Allows `Y`, `N`, `U`, or null. Example: `debtSubjectToOffset=Y` | v1, v2, v3, v4 |
| `exclusionStatusFlag` | v1/v2: `D` or null. v3: `Y` or `N`. | v1, v2, v3, v4 |
| `registrationDate` | Single date or range. Format: `MM/DD/YYYY` or `[MM/DD/YYYY,MM/DD/YYYY]` | v1, v2, v3, v4 |
| `activationDate` | Single date or range. Format: `MM/DD/YYYY` or `[MM/DD/YYYY,MM/DD/YYYY]` | v1, v2, v3, v4 |
| `updateDate` | Single date or range. Format: `MM/DD/YYYY` or `[MM/DD/YYYY,MM/DD/YYYY]` | v1, v2, v3, v4 |
| `expirationDate` / `registrationExpirationDate` | Single date or range. `expirationDate` in v1, `registrationExpirationDate` starting v2. | v1, v2, v3, v4 |
| `ueiCreationDate` | Single date or range. Format: `MM/DD/YYYY` or `[MM/DD/YYYY,MM/DD/YYYY]` | v2, v3, v4 |
| `purposeOfRegistrationCode` | 2 character code. Example: `purposeOfRegistrationCode=Z2` | v1, v2, v3, v4 |
| `purposeOfRegistrationDesc` | Text. Example: `purposeOfRegistrationDesc=All Awards` | v1, v2, v3, v4 |
| `physicalAddressCity` | Text. Example: `physicalAddressCity=Herndon` | v1, v2, v3, v4 |
| `physicalAddressCongressionalDistrict` | 2 digit code. Example: `physicalAddressCongressionalDistrict=08` | v1, v2, v3, v4 |
| `physicalAddressCountryCode` | 3-character code (registered); 2 or 3-character (not registered). Example: `physicalAddressCountryCode=USA` | v1, v2, v3, v4 |
| `physicalAddressProvinceOrStateCode` | 2 character code. Example: `physicalAddressProvinceOrStateCode=AR` | v1, v2, v3, v4 |
| `physicalAddressZipPostalCode` | 5-digit US zip, 9-digit for not registered, or any postal code for non-US. Examples: `02201`, `110054`, `21202-3117` | v1, v2, v3, v4 |
| `entityStructureCode` | 2 character code or null. Example: `entityStructureCode=2L` | v1, v2, v3, v4 |
| `entityStructureDesc` | Description or null. Example: `entityStructureDesc=Partnership or Limited Liability Partnership` | v1, v2, v3, v4 |
| `organizationStructureCode` | 2 character code. Example: `organizationStructureCode=MF` | v1, v2, v3, v4 |
| `organizationStructureDesc` | Text. Example: `organizationStructureDesc=MANUFACTURER OF GOODS` | v1, v2, v3, v4 |
| `businessTypeCode` | 2 character code. Example: `businessTypeCode=OY` | v1, v2, v3, v4 |
| `businessTypeDesc` | Text. Example: `businessTypeDesc=Woman Owned Business` | v1, v2, v3, v4 |
| `sbaBusinessTypeCode` | 2 character code or null. Example: `sbaBusinessTypeCode=12` | v1, v2, v3, v4 |
| `sbaBusinessTypeDesc` | Text. Example: `sbaBusinessTypeDesc=Woman Owned Small Business` | v1, v2, v3, v4 |
| `primaryNaics` | 6 digit NAICS, accepts multiple. Example: `primaryNaics=513310` | v1, v2, v3, v4 |
| `naicsCode` | 6 character code. Example: `naicsCode=513310` | v1, v2, v3, v4 |
| `naicsDesc` | Text. Example: `naicsDesc=Furniture Stores` | v1, v2, v3, v4 |
| `naicsLimitedSB` | 6-digit NAICS, `""`, or `!""`. Example: `naicsLimitedSB=513310` | v1, v2, v3, v4 |
| `pscCode` | 4 character code. Example: `pscCode=X1QA` | v1, v2, v3, v4 |
| `pscDesc` | Text. Example: `pscDesc=Screws` | v1, v2, v3, v4 |
| `stateOfIncorporationCode` | 2 character code. Example: `stateOfIncorporationCode=VA` | v1, v2, v3, v4 |
| `stateOfIncorporationDesc` | Text. Example: `stateOfIncorporationDesc=Virginia` | v1, v2, v3, v4 |
| `countryOfIncorporationCode` | 3 character code. Example: `countryOfIncorporationCode=USA` | v1, v2, v3, v4 |
| `countryOfIncorporationDesc` | Text. Example: `countryOfIncorporationDesc=UNITED STATES` | v1, v2, v3, v4 |
| `servedDisasterStateCode` | 2 character code or `any`. Example: `servedDisasterStateCode=VA` | v1, v2, v3, v4 |
| `servedDisasterStateName` | Name or null. Example: `servedDisasterStateName=Virginia` | v1, v2, v3, v4 |
| `servedDisasterCountyCode` | 3 digit county code. Example: `servedDisasterCountyCode=060` | v1, v2, v3, v4 |
| `servedDisasterCountyName` | Text. Example: `servedDisasterCountyName=FAIRFAX` | v1, v2, v3, v4 |
| `servedDisasterMSA` | 4 digit MSA code. Example: `servedDisasterMSA=1720` | v1, v2, v3, v4 |
| `proceedingsData` | Used with `includeSections=integrityInformation`. Accepts `Yes` (not case sensitive). | v3, v4 |
| `includeSections` | Filter by sections. Registered: `entityRegistration`, `coreData`, `assertions`, `pointsOfContact`, `repsAndCerts`, `All`, `integrityInformation`. `repsAndCerts` must be explicitly requested. `integrityInformation` (v3+) not included in `All`. Not registered: `entityRegistration`, `coreData`, `All`, `integrityInformation`. | v1, v2, v3, v4 |
| `format` | Download format: `JSON` or `CSV` (async). Example: `format=csv` | v1, v2, v3, v4 |
| `emailId` | Used with `format`. Sends download links to email associated with API key. Example: `emailId=Yes&format=JSON` | v1, v2, v3, v4 |

### Sensitivity Level: FOUO

Both publicly available entities and entities that have opted out of public display with their CUI data.

| Parameter | Description | Versions |
|-----------|-------------|----------|
| `edi` | Text. Example: `edi=YES/NO` | v1, v2, v3, v4 |
| `companySecurityLevelCode` | 2 character code. Example: `companySecurityLevelCode=92` | v1, v2, v3, v4 |
| `companySecurityLevelDesc` | Text. Example: `companySecurityLevelDesc=Government Top Secret` | v1, v2, v3, v4 |
| `highestEmployeeSecurityLevelCode` | 2 character code. Example: `highestEmployeeSecurityLevelCode=90` | v1, v2, v3, v4 |
| `highestEmployeeSecurityLevelDesc` | Text. Example: `highestEmployeeSecurityLevelDesc=Government Top Secret` | v1, v2, v3, v4 |
| `ultimateParentUEISAM` | Text. Example: `ultimateParentUEISAM=RQ56IG5JM6G9` | v1, v2, v3, v4 |
| `agencyBusinessPurposeCode` | Text. Example: `agencyBusinessPurposeCode=1` | v1, v2, v3, v4 |
| `agencyBusinessPurposeDesc` | Text. Example: `agencyBusinessPurposeDesc=Buyer and Seller` | v1, v2, v3, v4 |
| `sensitivity` | Override default sensitivity level. Example: `sensitivity=public` | v1, v2, v3, v4 |

### Sensitivity Level: Sensitive

| Parameter | Description | Versions |
|-----------|-------------|----------|
| `routingNumber` | Text. Example: `routingNumber=0123456` | v1, v2, v3, v4 |
| `bankName` | Text. Example: `bankName=TEST` | v1, v2, v3, v4 |
| `accountNumber` | Text. Example: `accountNumber=012323456` | v1, v2, v3, v4 |
| `eftWaiverFlag` | Text. Example: `eftWaiverFlag=Y` | v1, v2, v3, v4 |
| `agencyLocationCode` | Text. Example: `agencyLocationCode=1` | v1, v2, v3, v4 |
| `disbursingOfficeSymbol` | Text. Example: `disbursingOfficeSymbol=1093` | v1, v2, v3, v4 |
| `taxpayerName` | Text. Example: `taxpayerName=test` | v1, v2, v3, v4 |
| `taxpayerIdentificationNumber` | Text. Example: `taxpayerIdentificationNumber=01234` | v1, v2, v3, v4 |

---

## Response Schema

### entityRegistration

#### Public Fields

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `samRegistered` | string | Registered or not registered/ID Assigned entity | v2, v3, v4 |
| `ueiSAM` | string | Unique Entity Identifier SAM | v1, v2, v3, v4 |
| `entityEFTIndicator` | string | Entity EFT Indicator | v1, v2, v3, v4 |
| `cageCode` | string | CAGE Code | v1, v2, v3, v4 |
| `dodaac` | string | DoDAAC | v1, v2, v3, v4 |
| `legalBusinessName` | string | Legal Business Name | v1, v2, v3, v4 |
| `dbaName` | string | Doing Business As Name | v1, v2, v3, v4 |
| `purposeOfRegistrationCode` | string | Purpose of Registration Code | v1, v2, v3, v4 |
| `purposeOfRegistrationDesc` | string | Purpose of Registration Description | v1, v2, v3, v4 |
| `registrationStatus` | string | Registration status (registered or not registered/ID Assigned) | v1, v2, v3, v4 |
| `evsSource` | string | Source of validated entities | v3, v4 |
| `registrationDate` | string | Registration Date | v1, v2, v3, v4 |
| `lastUpdateDate` | string | Last Update Date | v1, v2, v3, v4 |
| `expirationDate` / `registrationExpirationDate` | string | Registration Expiration Date. `expirationDate` in v1, `registrationExpirationDate` starting v2. | v1, v2, v3, v4 |
| `activationDate` | string | Active Date | v1, v2, v3, v4 |
| `ueiStatus` | string | Unique Entity Identifier Status | v2, v3, v4 |
| `ueiExpirationDate` | string | Unique Entity Identifier Expiration Date | v2, v3, v4 |
| `ueiCreationDate` | string | Unique Entity Identifier Creation Date | v2, v3, v4 |
| `noPublicDisplayFlag` / `publicDisplayFlag` | string | Opted for Public Display or opted out. v1/v2: `noPublicDisplayFlag`. v3: `publicDisplayFlag`. | v1, v2, v3, v4 |
| `exclusionStatusFlag` | string | v1/v2: `D` (Debarred) or null. v3: `Y` or `N`. | v1, v2, v3, v4 |
| `exclusionURL` | string | URL to access the Exclusion record with ueiSAM | v1, v2, v3, v4 |
| `dnbOpenData` | string | Dun & Bradstreet Open Data | v2, v3, v4 |

---

### coreData

#### entityHierarchyInformation (Registered entities, FOUO)

| Field | Type | Description |
|-------|------|-------------|
| `immediateParentEntity` | object | Immediate parent entity details |
| `intermediateParentEntities` | list | Intermediate parent entities |
| `ultimateParentEntity` | object | Ultimate parent entity details |
| `evsMonitoring` | object | EVS monitoring details |

#### federalHierarchy (Registered entities, FOUO)

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `source` | string | Source | v1, v2, v3, v4 |
| `hierarchyDepartmentCode` | string | Hierarchy Department Code | v1, v2, v3, v4 |
| `hierarchyDepartmentName` | string | Hierarchy Department Name | v1, v2, v3, v4 |
| `hierarchyAgencyCode` | string | Hierarchy Agency Code | v1, v2, v3, v4 |
| `hierarchyAgencyName` | string | Hierarchy Agency Name | v1, v2, v3, v4 |
| `hierarchyOfficeCode` | string | Hierarchy Office Code | v1, v2, v3, v4 |

#### tinInformation (Registered entities, Sensitive)

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `taxpayerName` | string | Taxpayer Name | v1, v2, v3, v4 |
| `taxpayerIdentificationType` | string | Taxpayer Identification Type | v1, v2, v3, v4 |
| `taxpayerIdentificationNumber` | string | Taxpayer Identification Number | v1, v2, v3, v4 |

#### entityInformation (Registered entities)

**Public Fields:**

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `entityURL` | string | Entity URL | v1, v2, v3, v4 |
| `entityDivisionName` | string | Entity Division Name | v1, v2, v3, v4 |
| `entityDivisionNumber` | string | Entity Division Number | v1, v2, v3, v4 |
| `entityStartDate` | string | Entity Start Date | v1, v2, v3, v4 |
| `fiscalYearEndCloseDate` | string | Fiscal Year End Close Date | v1, v2, v3, v4 |
| `submissionDate` | string | Submission Date | v1, v2, v3, v4 |

**Sensitive Fields:**

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `mpin` | string | Deprecated | v1, v2, v3, v4 |

#### physicalAddress (Registered or not registered/ID Assigned, Public)

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `addressLine1` | string | Address Line 1 | v1, v2, v3, v4 |
| `addressLine2` | string | Address Line 2 | v1, v2, v3, v4 |
| `city` | string | City | v1, v2, v3, v4 |
| `stateOrProvinceCode` | string | State or Province Code | v1, v2, v3, v4 |
| `zipCode` | string | Zip Code | v1, v2, v3, v4 |
| `zipCodePlus4` | string | Zip Plus4 | v1, v2, v3, v4 |
| `countryCode` | string | Country Code | v1, v2, v3, v4 |

#### mailingAddress (Registered entities, Public)

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `addressLine1` | string | Mailing Address Line 1 | v1, v2, v3, v4 |
| `addressLine2` | string | Mailing Address Line 2 | v1, v2, v3, v4 |
| `city` | string | Mailing Address City | v1, v2, v3, v4 |
| `stateOrProvinceCode` | string | Mailing Address State or Province Code | v1, v2, v3, v4 |
| `zipCode` | string | Mailing Address Zip | v1, v2, v3, v4 |
| `zipCodePlus4` | string | Mailing Address Zip Plus4 | v1, v2, v3, v4 |
| `countryCode` | string | Mailing Address Country Code | v1, v2, v3, v4 |

#### congressionalDistrict (Registered entities, Public)

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `congressionalDistrict` | string | Physical Address Congressional District | v1, v2, v3, v4 |

#### generalInformation (Registered entities)

**Public Fields:**

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `entityStructureCode` | string | Entity Structure Code | v1, v2, v3, v4 |
| `entityStructureDescription` | string | Entity Structure Description | v1, v2, v3, v4 |
| `entityTypeCode` | string | Entity Type Code | v1, v2, v3, v4 |
| `entityTypeDesc` | string | Entity Type Description | v1, v2, v3, v4 |
| `profitStructureCode` | string | Profit Structure Code | v1, v2, v3, v4 |
| `profitStructureDesc` | string | Profit Structure Description | v1, v2, v3, v4 |
| `organizationStructureCode` | string | Organization Structure Code | v1, v2, v3, v4 |
| `organizationStructureDesc` | string | Organization Structure Description | v1, v2, v3, v4 |
| `stateOfIncorporationCode` | string | State Of Incorporation Code | v1, v2, v3, v4 |
| `stateOfIncorporationDesc` | string | State Of Incorporation Description | v1, v2, v3, v4 |
| `countryOfIncorporationCode` | string | Country Of Incorporation Code | v1, v2, v3, v4 |
| `countryOfIncorporationDesc` | string | Country Of Incorporation Description | v1, v2, v3, v4 |

**FOUO Fields:**

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `agencyBusinessPurposeCode` | string | Agency Business Purpose Code | v1, v2, v3, v4 |
| `agencyBusinessPurposeDesc` | string | Agency Business Purpose Description | v1, v2, v3, v4 |
| `companySecurityLevelCode` | string | Company Security Level Code | v1, v2, v3, v4 |
| `companySecurityLevelDesc` | string | Company Security Level Description | v1, v2, v3, v4 |
| `highestEmployeeSecurityLevelCode` | string | Highest Employee Security Level Code | v1, v2, v3, v4 |
| `highestEmployeeSecurityLevelDesc` | string | Highest Employee Security Level Description | v1, v2, v3, v4 |

#### businessTypes (Registered entities, Public)

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `businessTypeList` | list | Business type entries | v1, v2, v3, v4 |
| `sbaBusinessTypeList` | list | SBA business type entries | v1, v2, v3, v4 |

#### financialInformation (Registered entities)

**Public Fields:**

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `creditCardUsage` | string | Credit Card Usage | v1, v2, v3, v4 |
| `debtSubjectToOffset` | string | Debt Subject to Offset Flag | v1, v2, v3, v4 |

**Sensitive Fields:**

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `financialAccount` | object | Financial account details | v1, v2, v3, v4 |
| `achInformation` | object | ACH information | v1, v2, v3, v4 |
| `remittanceInformation` | object | Remittance information | v1, v2, v3, v4 |

---

### integrityInformation

#### entitySummary (Registered entities, Public)

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `ueiSAM` | string | Unique Entity Identifier SAM | v3, v4 |
| `cageCode` | string | CAGE Code | v3, v4 |
| `legalBusinessName` | string | Legal Business Name | v3, v4 |
| `physicalAddress.addressLine1` | string | Address Line 1 | v3, v4 |
| `physicalAddress.addressLine2` | string | Address Line 2 | v3, v4 |
| `physicalAddress.city` | string | City | v3, v4 |
| `physicalAddress.stateOrProvinceCode` | string | State or Province Code | v3, v4 |
| `physicalAddress.zipCode` | string | Zip Code | v3, v4 |
| `physicalAddress.zipCodePlus4` | string | Zip Plus4 | v3, v4 |
| `physicalAddress.countryCode` | string | Country Code | v3, v4 |

#### proceedingsData (Registered entities, Public)

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `proceedingsQuestion1` | string | Proceedings Question 1 (Yes/No) | v3, v4 |
| `proceedingsQuestion2` | string | Proceedings Question 2 (Yes/No) | v3, v4 |
| `proceedingsQuestion3` | string | Proceedings Question 3 (Yes/No) | v3, v4 |
| `proceedingsRecordCount` | string | Proceedings Records Counter | v3, v4 |

**listOfProceedings:**

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `proceedingDate` | string | Proceeding Date | v3, v4 |
| `instrumentNumber` | string | Instrument Number | v3, v4 |
| `instrument` | string | Instrument Type | v3, v4 |
| `proceedingStateCode` | string | Proceeding State Code | v3, v4 |
| `proceedingType` | string | Proceeding Type | v3, v4 |
| `disposition` | string | Disposition | v3, v4 |
| `proceedingDescription` | string | Proceeding Description | v3, v4 |

#### proceedingsPointsOfContact

**proceedingsPOC (Public fields):**

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `firstName` | string | First Name | v3, v4 |
| `middleInitial` | string | Middle Initial | v3, v4 |
| `lastName` | string | Last Name | v3, v4 |
| `title` | string | Title | v3, v4 |
| `addressLine1` | string | Address Line 1 | v3, v4 |
| `addressLine2` | string | Address Line 2 | v3, v4 |
| `city` | string | City | v3, v4 |
| `stateOrProvinceCode` | string | State or Province Code | v3, v4 |
| `zipCode` | string | Zip Code | v3, v4 |
| `zipCodePlus4` | string | Zip Code Plus 4 | v3, v4 |
| `countryCode` | string | Country Code | v3, v4 |

**proceedingsPOC (FOUO fields):**

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `usPhone` | string | US Phone | v3, v4 |
| `usPhoneExtension` | string | US Phone Extension | v3, v4 |
| `nonUSPhone` | string | Non-US Phone | v3, v4 |
| `fax` | string | Fax | v3, v4 |
| `email` | string | Email | v3, v4 |

**proceedingsAlternatePOC** — Same field structure as proceedingsPOC (both Public and FOUO fields).

#### responsibilityInformationCount (Registered or not registered, Public)

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `responsibilityInformationCount` | string | Responsibility Information Counter | v3, v4 |

#### responsibilityInformationList (Registered or not registered, Public)

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `recordType` | string | Record Type | v3, v4 |
| `recordTypeDesc` | string | Record Type Description | v3, v4 |
| `recordDate` | string | Record Date | v3, v4 |
| `procurementIdOrFederalAssistanceId` | string | Contract Data ID or Grant ID | v3, v4 |
| `referenceIdvPiid` | string | Referenced IDV PIID | v3, v4 |
| `attachment` | string | Pre-signed URL to access the attachment | v3, v4 |

#### corporateRelationships (Registered entities, Public)

**highestOwner:**

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `legalBusinessName` | string | Legal Business Name | v3, v4 |
| `cageCode` | string | CAGE Code | v3, v4 |
| `integrityRecords` | string | `Yes` / `No` / `N/A` based on CAGE Code match | v3, v4 |

**immediateOwner** — Same structure as highestOwner.

**predecessorsList** — Same structure as highestOwner.

---

### assertions

#### goodsAndServices (Registered entities, Public)

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `primaryNaics` | string | Primary NAICS | v1, v2, v3, v4 |
| `naicsList` | list | NAICS list entries | v1, v2, v3, v4 |
| `pscList` | list | PSC list entries | v1, v2, v3, v4 |

#### disasterReliefData (Registered entities)

**Public Fields:**

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `disasterRegistryFlag` | string | Disaster Registry Flag | v1, v2, v3, v4 |
| `bondingFlag` | string | Bonding Flag | v1, v2, v3, v4 |
| `geographicalAreaServed` | list | Geographical area served entries | v1, v2, v3, v4 |

**FOUO Fields:**

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `bondingLevels` | string | Bonding Levels | v1, v2, v3, v4 |

#### sizeMetrics (Registered entities, FOUO)

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `averageAnnualRevenue` | string | Average Annual Revenue | v1, v2, v3, v4 |
| `averageNumberOfEmployees` | string | Average Number Of Employees | v1, v2, v3, v4 |

#### sizeMetricDetails (Registered entities, FOUO)

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `employeesLocation` | string | Employees Location | v1, v2, v3, v4 |
| `receiptsLocation` | string | Receipts Location | v1, v2, v3, v4 |

#### industrySpecificSizeMetrics (Registered entities, FOUO)

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `barrelsCapacity` | string | Barrels Capacity | v1, v2, v3, v4 |
| `totalAssets` | string | Total Assets | v1, v2, v3, v4 |
| `megawattHours` | string | Mega Watt Hours | v1, v2, v3, v4 |

#### ediInformation (Registered entities)

**Public Fields:**

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `ediInformationFlag` | string | EDI Information Flag | v1, v2, v3, v4 |

**FOUO Fields:**

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `vanProvider` | string | Van Provider | v1, v2, v3, v4 |
| `isaQualifier` | string | ISA Qualifier | v1, v2, v3, v4 |
| `isaIdentifier` | string | ISA Identifier | v1, v2, v3, v4 |
| `functionalGroupIdentifier` | string | Functional Group Identifier | v1, v2, v3, v4 |
| `requestFlag820s` | string | Request Flag 820s | v1, v2, v3, v4 |

---

### repsAndCerts

#### certifications (Registered entities, Public)

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `fARResponses` | list | FAR responses | v1, v2, v3, v4 |
| `dFARResponses` | list | DFAR responses | v1, v2, v3, v4 |

#### qualifications (Registered entities, Public)

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `architectEngineerResponses` | object | Architect/Engineer responses | v1, v2, v3, v4 |

#### financialAssistanceCertifications (Registered entities, Public)

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `grantsCertificationStatus` | string | Grants Certification Status | v1, v2, v3, v4 |
| `grantsCertifyingResponse` | string | Grants Certifying Response | v1, v2, v3, v4 |
| `certifierFirstName` | string | Certifier First Name | v1, v2, v3, v4 |
| `certifierLastName` | string | Certifier Last Name | v1, v2, v3, v4 |
| `certifierMiddleInitial` | string | Certifier Middle Initial | v1, v2, v3, v4 |

#### pdfLinks (Registered entities, Public)

| Field | Type | Description | Versions |
|-------|------|-------------|----------|
| `farPDF` | string | FAR PDF | v1, v2, v3, v4 |
| `farAndDfarsPDF` | string | FAR and DFARS PDF | v1, v2, v3, v4 |
| `architectEngineeringPDF` | string | Architect Engineering PDF | v1, v2, v3, v4 |
| `financialAssistanceCertificationsPDF` | string | Financial Assistance Certifications PDF | v1, v2, v3, v4 |

---

### pointsOfContact

All POC sub-sections share a common field structure. Registered entities only.

#### Common POC Fields

**Public Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `firstName` | string | First Name |
| `middleInitial` | string | Middle Initial |
| `lastName` | string | Last Name |
| `title` | string | Title |
| `addressLine1` | string | Address Line 1 |
| `addressLine2` | string | Address Line 2 |
| `city` | string | City |
| `stateOrProvinceCode` | string | State or Province Code |
| `zipCode` | string | Zip Code |
| `zipCodePlus4` | string | Zip Code Plus 4 |
| `countryCode` | string | Country Code |

**FOUO Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `usPhone` | string | US Phone |
| `usPhoneExtension` | string | US Phone Extension |
| `nonUSPhone` | string | Non-US Phone |
| `fax` | string | Fax |
| `email` | string | Email |

#### POC Sub-Sections

The following POC types use the common fields above. All available in v1–v4.

**Public + FOUO POCs (name/title/address are Public; phone/fax/email are FOUO):**

- `governmentBusinessPOC`
- `electronicBusinessPOC`
- `governmentBusinessAlternatePOC`
- `electronicBusinessAlternatePOC`
- `pastPerformancePOC`
- `pastPerformanceAlternatePOC`

**Fully FOUO POCs (all fields are FOUO):**

- `partyPerformingCertificationPOC`
- `soleProprietorshipPOC` (no address fields)
- `accountsReceivablePOC` (no address fields)
- `accountsPayablePOC`
- `ediPOC` (no address fields)
- `eliminationsPOC`
- `salesPOC`