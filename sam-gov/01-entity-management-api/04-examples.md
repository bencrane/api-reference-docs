# Examples

# SAM.gov Entity Management API — Examples

---

## Example 1: EVS Monitoring — Address and Name Changes

**Scenario:** Obtain registered entities that have undergone Address change and Name change resulting from EVS Monitoring (post April 3rd, 2022).

### Request URLs

**Production:**

```
https://api.sam.gov/entity-information/v2/entities?api_key=<FOUO API Key>&ueiSAM=[ZQGGHJH74DW7~JH9ZARNKWKC7]&includeSections=entityRegistration,coreData

https://api.sam.gov/entity-information/v3/entities?api_key=<FOUO API Key>&ueiSAM=[ZQGGHJH74DW7~JH9ZARNKWKC7]&includeSections=entityRegistration,coreData
```

**Alpha:**

```
https://api-alpha.sam.gov/entity-information/v2/entities?api_key=<FOUO API Key>&ueiSAM=[ZQGGHJH74DW7~JH9ZARNKWKC7]&includeSections=entityRegistration,coreData

https://api-alpha.sam.gov/entity-information/v3/entities?api_key=<FOUO API Key>&ueiSAM=[ZQGGHJH74DW7~JH9ZARNKWKC7]&includeSections=entityRegistration,coreData
```

### Response — Address Change (v2)

```json
{
  "entityData": [
    {
      "entityRegistration": {
        "samRegistered": "Yes",
        "ueiSAM": "ZQGGHJH74DW7",
        "entityEFTIndicator": null,
        "cageCode": "855J5",
        "dodaac": null,
        "legalBusinessName": "INTERNATIONAL BUSINESS MACHINES CORPORATION",
        "dbaName": null,
        "purposeOfRegistrationCode": "Z2",
        "purposeOfRegistrationDesc": "All Awards",
        "registrationStatus": "Active",
        "registrationDate": "2018-07-24",
        "lastUpdateDate": "2021-06-10",
        "registrationExpirationDate": "2021-08-10",
        "activationDate": "2020-08-13",
        "ueiStatus": "Active",
        "ueiExpirationDate": "2021-08-10",
        "ueiCreationDate": "2021-06-25",
        "noPublicDisplayFlag": "Y",
        "exclusionStatusFlag": null,
        "exclusionURL": null,
        "dnbOpenData": "Y"
      },
      "coreData": {
        "entityHierarchyInformation": {
          "immediateParentEntity": {
            "ueiSAM": null,
            "legalBusinessName": null,
            "physicalAddress": {
              "addressLine1": null,
              "addressLine2": null,
              "city": null,
              "stateOrProvinceCode": null,
              "countryCode": null,
              "zipCode": null,
              "zipCodePlus4": null
            },
            "phoneNumber": null
          },
          "intermediateParentEntities": [
            {
              "domesticParent": {
                "ueiSAM": "J64CSQTQNRC1",
                "legalBusinessName": "International Business Machines Corporation",
                "physicalAddress": {
                  "addressLine1": "Address Line1",
                  "addressLine2": null,
                  "city": "City",
                  "stateOrProvinceCode": "XX",
                  "countryCode": "XXX",
                  "zipCode": "11111",
                  "zipCodePlus4": "1111"
                },
                "phoneNumber": null
              },
              "hqParent": {
                "ueiSAM": "J64CSQTQNRC1",
                "legalBusinessName": "International Business Machines Corporation",
                "physicalAddress": {
                  "addressLine1": "Address Line1",
                  "addressLine2": null,
                  "city": "City",
                  "stateOrProvinceCode": "XX",
                  "countryCode": "XXX",
                  "zipCode": "11111",
                  "zipCodePlus4": "1111"
                },
                "phoneNumber": null
              }
            }
          ],
          "ultimateParentEntity": {
            "ueiSAM": "J64CSQTQNRC1",
            "legalBusinessName": "International Business Machines Corporation",
            "physicalAddress": {
              "addressLine1": "Address Line1",
              "addressLine2": null,
              "city": "City",
              "stateOrProvinceCode": "XX",
              "countryCode": "XXX",
              "zipCode": "11111",
              "zipCodePlus4": "1111"
            },
            "phoneNumber": null
          },
          "evsMonitoring": {
            "legalBusinessName": "International Business Machines Corporation",
            "dbaName": null,
            "outOfBusinessFlag": null,
            "monitoringStatus": "Y",
            "lastUpdated": "Y",
            "addressLine1": "New Address Line 1",
            "addressLine2": "New Address Line 2",
            "city": "New City",
            "postalCode": "New Zip/Postal Code",
            "stateOrProvinceCode": "New State/Province",
            "countryCode": "New Country Code"
          }
        },
        "federalHierarchy": {
          "source": null,
          "hierarchyDepartmentCode": null,
          "hierarchyDepartmentName": null,
          "hierarchyAgencyCode": null,
          "hierarchyAgencyName": null,
          "hierarchyOfficeCode": null
        },
        "entityInformation": {
          "entityURL": "http://www.ibm.com/us/en",
          "entityDivisionName": "IBM Global Business Services",
          "entityDivisionNumber": "16",
          "entityStartDate": "1911-01-01",
          "fiscalYearEndCloseDate": "12/31",
          "submissionDate": "2020-08-10"
        },
        "physicalAddress": {
          "addressLine1": "Address1",
          "addressLine2": "Address2",
          "city": "City",
          "stateOrProvinceCode": "XX",
          "zipCode": "11111",
          "zipCodePlus4": "1111",
          "countryCode": "ABC"
        },
        "mailingAddress": {
          "addressLine1": "Address1",
          "addressLine2": "Address2",
          "city": "City",
          "stateOrProvinceCode": "XX",
          "zipCode": "11111",
          "zipCodePlus4": "1111",
          "countryCode": "ABC"
        },
        "congressionalDistrict": "00",
        "generalInformation": {
          "agencyBusinessPurposeCode": null,
          "agencyBusinessPurposeDesc": null,
          "entityStructureCode": "2L",
          "entityStructureDesc": "Corporate Entity (Not Tax Exempt)",
          "entityTypeCode": "F",
          "entityTypeDesc": "Business or Organization",
          "profitStructureCode": "2X",
          "profitStructureDesc": "For Profit Organization",
          "organizationStructureCode": null,
          "organizationStructureDesc": null,
          "stateOfIncorporationCode": "NY",
          "stateOfIncorporationDesc": "NEW YORK",
          "countryOfIncorporationCode": "USA",
          "countryOfIncorporationDesc": "UNITED STATES",
          "companySecurityLevelCode": "94",
          "companySecurityLevelDesc": "Government Top Secret",
          "highestEmployeeSecurityLevelCode": "94",
          "highestEmployeeSecurityLevelDesc": "Government Top Secret"
        },
        "businessTypes": {
          "businessTypeList": [
            {
              "businessTypeCode": "2X",
              "businessTypeDesc": "For Profit Organization"
            },
            {
              "businessTypeCode": "F",
              "businessTypeDesc": "Business or Organization"
            }
          ],
          "sbaBusinessTypeList": [
            {
              "sbaBusinessTypeCode": null,
              "sbaBusinessTypeDesc": null,
              "certificationEntryDate": null,
              "certificationExitDate": null
            }
          ]
        },
        "financialInformation": {
          "creditCardUsage": "N",
          "debtSubjectToOffset": "N"
        }
      }
    }
  ]
}
```

### Response — Address Change (v3)

> Key differences from v2: adds `evsSource`, replaces `noPublicDisplayFlag` with `publicDisplayFlag`, `exclusionStatusFlag` returns `"N"` instead of `null`, parent entities include `evsSource` field.

```json
{
  "entityData": [
    {
      "entityRegistration": {
        "samRegistered": "Yes",
        "ueiSAM": "ZQGGHJH74DW7",
        "entityEFTIndicator": null,
        "cageCode": "855J5",
        "dodaac": null,
        "legalBusinessName": "INTERNATIONAL BUSINESS MACHINES CORPORATION",
        "dbaName": null,
        "purposeOfRegistrationCode": "Z2",
        "purposeOfRegistrationDesc": "All Awards",
        "registrationStatus": "Active",
        "evsSource": "E&Y",
        "registrationDate": "2018-07-24",
        "lastUpdateDate": "2021-06-10",
        "registrationExpirationDate": "2021-08-10",
        "activationDate": "2020-08-13",
        "ueiStatus": "Active",
        "ueiExpirationDate": "2021-08-10",
        "ueiCreationDate": "2021-06-25",
        "publicDisplayFlag": "Y",
        "exclusionStatusFlag": "N",
        "exclusionURL": null,
        "dnbOpenData": "Y"
      },
      "coreData": {
        "entityHierarchyInformation": {
          "immediateParentEntity": {
            "ueiSAM": null,
            "legalBusinessName": null,
            "evsSource": "E&Y",
            "physicalAddress": { "...": "same structure as v2" },
            "phoneNumber": null
          },
          "intermediateParentEntities": [
            {
              "domesticParent": {
                "ueiSAM": "J64CSQTQNRC1",
                "legalBusinessName": "International Business Machines Corporation",
                "evsSource": "E&Y",
                "physicalAddress": { "...": "same structure as v2" },
                "phoneNumber": null
              },
              "hqParent": {
                "ueiSAM": "J64CSQTQNRC1",
                "legalBusinessName": "International Business Machines Corporation",
                "evsSource": "E&Y",
                "physicalAddress": { "...": "same structure as v2" },
                "phoneNumber": null
              }
            }
          ],
          "ultimateParentEntity": {
            "ueiSAM": "J64CSQTQNRC1",
            "legalBusinessName": "International Business Machines Corporation",
            "evsSource": "E&Y",
            "physicalAddress": { "...": "same structure as v2" },
            "phoneNumber": null
          },
          "evsMonitoring": {
            "legalBusinessName": "International Business Machines Corporation",
            "dbaName": null,
            "outOfBusinessFlag": null,
            "monitoringStatus": "Y",
            "lastUpdated": "Y",
            "addressLine1": "New Address Line 1",
            "addressLine2": "New Address Line 2",
            "city": "New City",
            "postalCode": "New Zip/Postal Code",
            "stateOrProvinceCode": "New State/Province",
            "countryCode": "New Country Code"
          }
        }
      }
    }
  ]
}
```

### Response — Name Change (v2)

```json
{
  "entityData": [
    {
      "entityRegistration": {
        "samRegistered": "Yes",
        "ueiSAM": "JH9ZARNKWKC7",
        "entityEFTIndicator": null,
        "cageCode": "7X7G0",
        "dodaac": null,
        "legalBusinessName": "IBM Southeast Employees' Credit Union",
        "dbaName": null,
        "purposeOfRegistrationCode": "Z1",
        "purposeOfRegistrationDesc": "Federal Assistance Awards",
        "registrationStatus": "Active",
        "registrationDate": "2017-07-27",
        "lastUpdateDate": "2021-03-11",
        "registrationExpirationDate": "2022-03-03",
        "activationDate": "2021-03-05",
        "ueiStatus": "Active",
        "ueiExpirationDate": "2022-03-03",
        "ueiCreationDate": "2021-06-25",
        "noPublicDisplayFlag": "N",
        "exclusionStatusFlag": null,
        "exclusionURL": null,
        "dnbOpenData": "Y"
      },
      "coreData": {
        "entityHierarchyInformation": {
          "immediateParentEntity": {
            "ueiSAM": null,
            "legalBusinessName": null,
            "physicalAddress": { "...": "all null" },
            "phoneNumber": null
          },
          "intermediateParentEntities": [
            {
              "domesticParent": {
                "ueiSAM": "JH9ZARNKWKC7",
                "legalBusinessName": "IBM Southeast Employees' Credit Union",
                "physicalAddress": { "...": "standard placeholder" },
                "phoneNumber": null
              },
              "hqParent": {
                "ueiSAM": "JH9ZARNKWKC7",
                "legalBusinessName": "IBM Southeast Employees' Credit Union",
                "physicalAddress": { "...": "standard placeholder" },
                "phoneNumber": null
              }
            }
          ],
          "ultimateParentEntity": {
            "ueiSAM": "JH9ZARNKWKC7",
            "legalBusinessName": "IBM Southeast Employees' Credit Union",
            "physicalAddress": { "...": "standard placeholder" },
            "phoneNumber": null
          },
          "evsMonitoring": {
            "legalBusinessName": "International Business Machines CORPORATION",
            "dbaName": null,
            "outOfBusinessFlag": null,
            "monitoringStatus": "Y",
            "lastUpdated": "Y",
            "addressLine1": null,
            "addressLine2": null,
            "city": null,
            "postalCode": null,
            "stateOrProvinceCode": null,
            "countryCode": null
          }
        },
        "federalHierarchy": { "...": "all null" },
        "entityInformation": {
          "entityURL": "www.ithinkfi.org",
          "entityDivisionName": null,
          "entityDivisionNumber": null,
          "entityStartDate": "1969-09-03",
          "fiscalYearEndCloseDate": "12/31",
          "submissionDate": "2021-03-03"
        },
        "physicalAddress": { "...": "standard placeholder" },
        "mailingAddress": { "...": "standard placeholder" },
        "congressionalDistrict": "00",
        "generalInformation": {
          "entityStructureCode": "8H",
          "entityStructureDesc": "Corporate Entity (Tax Exempt)",
          "entityTypeCode": "F",
          "entityTypeDesc": "Business or Organization",
          "profitStructureCode": "A8",
          "profitStructureDesc": "Non-Profit Organization",
          "stateOfIncorporationCode": "FL",
          "stateOfIncorporationDesc": "FLORIDA",
          "countryOfIncorporationCode": "USA",
          "countryOfIncorporationDesc": "UNITED STATES"
        },
        "businessTypes": {
          "businessTypeList": [
            { "businessTypeCode": "A8", "businessTypeDesc": "Non-Profit Organization" },
            { "businessTypeCode": "F", "businessTypeDesc": "Business or Organization" }
          ]
        },
        "financialInformation": {
          "creditCardUsage": "N",
          "debtSubjectToOffset": "N"
        }
      }
    }
  ]
}
```

### Response — Name Change (v3)

> Same v2→v3 differences apply: `evsSource` added, `publicDisplayFlag` replaces `noPublicDisplayFlag`, `exclusionStatusFlag` returns `"N"`.

---

## Example 2: Not Registered / ID Assigned Entities (Public)

**Scenario:** Obtain publicly available not registered/ID Assigned entities (post April 3rd, 2022).

### Request URLs

**Production:**

```
https://api.sam.gov/entity-information/v3/entities?api_key=<API Key>&samRegistered=No&includeSections=entityRegistration
```

**Alpha:**

```
https://api-alpha.sam.gov/entity-information/v3/entities?api_key=<API Key>&samRegistered=No&includeSections=entityRegistration
```

### Response (v3)

```json
{
  "entityData": [
    {
      "entityRegistration": {
        "samRegistered": "No",
        "ueiSAM": "JF19T45AM8F2",
        "cageCode": "null",
        "legalBusinessName": "Anchored Consulting Group LLC",
        "registrationStatus": "Active",
        "evsSource": null,
        "ueiStatus": "Active",
        "ueiExpirationDate": null,
        "ueiCreationDate": "2021-07-20",
        "publicDisplayFlag": "Y",
        "dnbOpenData": "Y"
      }
    }
  ]
}
```

---

## Example 3: Filter by Business Type and Purpose of Registration

**Scenario:** Get `entityRegistration` and `coreData` for all "Joint Venture Women" or "Asian-Pacific" entities registered for "All Awards" or "Federal Assistance Awards".

### Request URL

Uses the `q` parameter with boolean logic and `purposeOfRegistrationCode` with `~` (OR) separator:

```
?purposeOfRegistrationCode=Z1~Z2&q=(businessTypeDesc:'Joint Venture Women' OR businessTypeDesc:'Asian-Pacific')&includeSections=entityRegistration,coreData
```

### Response (v2)

```json
{
  "entityData": [
    {
      "entityRegistration": {
        "samRegistered": "Yes",
        "ueiSAM": "V4EUJ1MPVH45",
        "cageCode": "92G16",
        "legalBusinessName": "HH Real Estate Properties Corporation",
        "purposeOfRegistrationCode": "Z1",
        "purposeOfRegistrationDesc": "Federal Assistance Awards",
        "registrationStatus": "Active",
        "registrationDate": "2021-06-23",
        "lastUpdateDate": "2021-06-24",
        "registrationExpirationDate": "2022-06-23",
        "activationDate": "2021-06-24",
        "ueiStatus": "Active",
        "noPublicDisplayFlag": "Y",
        "exclusionStatusFlag": null,
        "dnbOpenData": "Y"
      },
      "coreData": {
        "generalInformation": {
          "entityStructureCode": "2L",
          "entityStructureDesc": "Corporate Entity (Not Tax Exempt)",
          "stateOfIncorporationCode": "TN",
          "stateOfIncorporationDesc": "TENNESSEE",
          "countryOfIncorporationCode": "USA"
        },
        "businessTypes": {
          "businessTypeList": [
            { "businessTypeCode": "23", "businessTypeDesc": "Minority Owned Business" },
            { "businessTypeCode": "2X", "businessTypeDesc": "For Profit Organization" },
            { "businessTypeCode": "8C", "businessTypeDesc": "Joint Venture Women Owned Small Business" },
            { "businessTypeCode": "8W", "businessTypeDesc": "Woman Owned Small Business" },
            { "businessTypeCode": "A2", "businessTypeDesc": "Woman Owned Business" },
            { "businessTypeCode": "F", "businessTypeDesc": "Business or Organization" },
            { "businessTypeCode": "HK", "businessTypeDesc": "Community Development Corporation Owned Firm" },
            { "businessTypeCode": "OY", "businessTypeDesc": "Black American Owned" }
          ]
        }
      }
    }
  ],
  "links": {
    "selfLink": "https://api.sam.gov/entity-information/v2/entities?purposeOfRegistrationCode=Z1%7EZ2&q=...&page=0&size=10",
    "nextLink": "https://api.sam.gov/entity-information/v2/entities?purposeOfRegistrationCode=Z1%7EZ2&q=...&page=1&size=10"
  }
}
```

### Response (v3)

> Same data with v3 differences: `evsSource`, `publicDisplayFlag`, `exclusionStatusFlag="N"`. Links use `/v3/` path.

---

## Example 4: Entity Hierarchy Variations

**Scenario:** Get entities with no hierarchy, a small hierarchy, and a large hierarchy.

### Request URLs

**Production:**

```
https://api.sam.gov/entity-information/v2/entities?api_key=<FOUO API Key>&includeSections=entityRegistration,coreData
https://api.sam.gov/entity-information/v3/entities?api_key=<FOUO API Key>&includeSections=entityRegistration,coreData
```

### Entity with No Hierarchy

**UEI:** `JK9SLMFNHKP4` — BRADLEY DEFENSE SOLUTIONS INC

All parent entity fields (`immediateParentEntity`, `intermediateParentEntities`, `ultimateParentEntity`) return null values. `evsMonitoring` also all null.

```json
{
  "entityRegistration": {
    "ueiSAM": "JK9SLMFNHKP4",
    "cageCode": "87AW0",
    "legalBusinessName": "BRADLEY DEFENSE SOLUTIONS INC",
    "registrationStatus": "Inactive",
    "stateOfIncorporationCode": "NY"
  },
  "coreData": {
    "entityHierarchyInformation": {
      "immediateParentEntity": { "ueiSAM": null, "legalBusinessName": null },
      "ultimateParentEntity": { "ueiSAM": null, "legalBusinessName": null },
      "evsMonitoring": { "monitoringStatus": null }
    }
  }
}
```

### Entity with Small Hierarchy

**UEI:** `JXCSEVSG7785` — CONSIGLIO NAZIONALE DELLE RICERCHE - CNR

Has `intermediateParentEntities` with `domesticParent` (REPUBBLICA ITALIANA, `NLXHHB71VMK5`) and `hqParent` (CONSIGLIO NAZIONALE DELLE RICERCHE, `CWVEJHEWM684`). Ultimate parent is REPUBBLICA ITALIANA.

```json
{
  "entityRegistration": {
    "ueiSAM": "JXCSEVSG7785",
    "cageCode": "AQ773",
    "legalBusinessName": "CONSIGLIO NAZIONALE DELLE RICERCHE - CNR",
    "dbaName": "ICB ISTITUTO DI CHIMICA BIOMOLECOLARE",
    "countryOfIncorporationCode": "ITA"
  },
  "coreData": {
    "entityHierarchyInformation": {
      "intermediateParentEntities": [
        {
          "domesticParent": {
            "ueiSAM": "NLXHHB71VMK5",
            "legalBusinessName": "REPUBBLICA ITALIANA"
          },
          "hqParent": {
            "ueiSAM": "CWVEJHEWM684",
            "legalBusinessName": "CONSIGLIO NAZIONALE DELLE RICERCHE"
          }
        }
      ],
      "ultimateParentEntity": {
        "ueiSAM": "NLXHHB71VMK5",
        "legalBusinessName": "REPUBBLICA ITALIANA"
      }
    }
  }
}
```

### Entity with Large Hierarchy

**UEI:** `MJ5MN6SGYKF6` — AIRBUS DEFENCE AND SPACE SAS

Has `intermediateParentEntities` with `domesticParent` (AIRBUS SAS, `NPMCJNWE75K6`) and `hqParent` (ASTRIUM SAS, `CK6JEE77RH16`). Ultimate parent is Airbus SE (`QM7GAR7U8NK3`).

```json
{
  "entityRegistration": {
    "ueiSAM": "MJ5MN6SGYKF6",
    "cageCode": "F9073",
    "legalBusinessName": "AIRBUS DEFENCE AND SPACE SAS",
    "countryOfIncorporationCode": "FRA"
  },
  "coreData": {
    "entityHierarchyInformation": {
      "intermediateParentEntities": [
        {
          "domesticParent": {
            "ueiSAM": "NPMCJNWE75K6",
            "legalBusinessName": "AIRBUS SAS"
          },
          "hqParent": {
            "ueiSAM": "CK6JEE77RH16",
            "legalBusinessName": "ASTRIUM SAS"
          }
        }
      ],
      "ultimateParentEntity": {
        "ueiSAM": "QM7GAR7U8NK3",
        "legalBusinessName": "Airbus SE"
      }
    }
  }
}
```

---

## Example 5: Entity with No EVS Monitoring

**Scenario:** Get an entity where EVS Monitoring has no changes.

### Request URLs

```
https://api.sam.gov/entity-information/v2/entities?api_key=<FOUO API Key>&includeSections=entityRegistration,coreData
https://api.sam.gov/entity-information/v3/entities?api_key=<FOUO API Key>&includeSections=entityRegistration,coreData
```

### Response

**UEI:** `XY1XDER4WPJ6` — Enterprise Assurance Management

The `evsMonitoring` section contains the `legalBusinessName` but all monitoring fields are null (no address/name changes detected).

```json
{
  "evsMonitoring": {
    "legalBusinessName": "Enterprise Assurance Management",
    "dbaName": null,
    "outOfBusinessFlag": null,
    "monitoringStatus": null,
    "lastUpdated": null,
    "addressLine1": null,
    "addressLine2": null,
    "city": null,
    "postalCode": null,
    "stateOrProvinceCode": null,
    "countryCode": null
  }
}
```

Key entity details: incorporated in Maryland, Government Secret company security level, Government Top Secret highest employee security level, Subchapter S Corporation, Woman Owned Business, Black American Owned.

---

## Example 6: Integrity Information (Public + NPDY, Registered)

**Scenario:** Obtain both Public and NPDY registered "Responsibility & Integrity Record" data with a Public API Key.

### Request URLs

```
https://api.sam.gov/entity-information/v3/entities?api_key=<PUBLIC API Key>&includeSections=integrityInformation
https://api-alpha.sam.gov/entity-information/v3/entities?api_key=<PUBLIC API Key>&includeSections=entityRegistration,integrityInformation
```

### Response — Public Entity

**UEI:** `DE95TS6Y5XR6` — ng4T GmbH

```json
{
  "entityRegistration": {
    "samRegistered": "Yes",
    "ueiSAM": "DE95TS6Y5XR6",
    "cageCode": "CJ542",
    "legalBusinessName": "ng4T GmbH",
    "registrationStatus": "Active",
    "evsSource": "D&B",
    "publicDisplayFlag": "Y",
    "exclusionStatusFlag": "N"
  },
  "integrityInformation": {
    "entitySummary": {
      "ueiSAM": "DE95TS6Y5XR6",
      "cageCode": "CJ542",
      "legalBusinessName": "ng4T GmbH",
      "physicalAddress": { "...": "standard fields" }
    },
    "proceedingsData": {
      "proceedingsQuestion1": "YES",
      "proceedingsQuestion2": "YES",
      "proceedingsQuestion3": "YES",
      "proceedingsRecordCount": 1,
      "listOfProceedings": [
        {
          "proceedingDate": "1000-01-01",
          "instrumentNumber": "XXXXX",
          "instrument": "U.S.Federal issued contract",
          "proceedingStateCode": "XX",
          "proceedingType": "Criminal",
          "disposition": "Other acknowledgment of fault",
          "proceedingDescription": "Proceeding Description"
        }
      ],
      "proceedingsPointsOfContact": {
        "proceedingsPOC": {
          "firstName": "First Name",
          "middleInitial": "Z",
          "lastName": "Last Name",
          "title": "Title",
          "addressLine1": "Address1",
          "...": "standard address fields"
        },
        "proceedingsAlternatePOC": { "...": "same structure" }
      }
    },
    "responsibilityInformationCount": 2,
    "responsibilityInformationList": [
      {
        "recordType": "C",
        "recordTypeDesc": "Termination for Cause",
        "recordDate": "2018-04-10",
        "procurementIdOrFederalAssistanceId": "W9127S18F0005P00002",
        "referenceIdvPiid": "W9127S15D0018",
        "attachment": "<Pre-signed URL>"
      },
      {
        "recordType": "C",
        "recordTypeDesc": "Termination for Cause",
        "recordDate": "2018-04-10",
        "procurementIdOrFederalAssistanceId": "W9127S16P0075P00003",
        "referenceIdvPiid": null,
        "attachment": "<Pre-signed URL>"
      }
    ],
    "corporateRelationships": {
      "highestOwner": {
        "legalBusinessName": "WSP GLOBAL INC",
        "cageCode": "7NDG5",
        "integrityRecords": "Yes"
      },
      "immediateOwner": {
        "legalBusinessName": "LOUIS BERGER U.S., INC.",
        "cageCode": "7NDG5",
        "integrityRecords": "No"
      },
      "predecessorsList": [
        {
          "legalBusinessName": null,
          "cageCode": null,
          "integrityRecords": "N/A"
        }
      ]
    }
  }
}
```

### Response — NPDY Entity (Opted Out)

**UEI:** `VNP5VWMPAEF3` — Harrisonburg Rescue Squad Inc

The `entityRegistration` returns the opt-out message. `integrityInformation` still provides `entitySummary`, empty proceedings, and responsibility information.

```json
{
  "entityRegistration": "This entity has opted out of public search. Only federal government users and users associated with this entity can view this record on SAM.gov.",
  "integrityInformation": {
    "entitySummary": {
      "ueiSAM": "VNP5VWMPAEF3",
      "legalBusinessName": "Harrisonburg Rescue Squad Inc"
    },
    "proceedingsData": {
      "proceedingsQuestion1": null,
      "proceedingsRecordCount": 0,
      "listOfProceedings": []
    },
    "responsibilityInformationCount": 1,
    "responsibilityInformationList": [
      {
        "recordType": "C",
        "recordTypeDesc": "Termination for Cause",
        "recordDate": "2019-02-15",
        "procurementIdOrFederalAssistanceId": "W912DQ18C1026",
        "attachment": "<Pre-signed URL>"
      }
    ],
    "corporateRelationships": {
      "highestOwner": { "integrityRecords": "N/A" },
      "immediateOwner": { "integrityRecords": "N/A" },
      "predecessorsList": [{ "integrityRecords": "N/A" }]
    }
  }
}
```

---

## Example 7: Integrity Information (Not Registered / ID Assigned)

**Scenario:** Obtain both Public and NPDY not registered/ID Assigned "Responsibility & Integrity Record" data.

### Request URLs

```
https://api.sam.gov/entity-information/v3/entities?api_key=<PUBLIC API Key>&samRegistered=No&includeSections=integrityInformation,All
```

### Response — Public Unregistered Entity

**UEI:** `WB23FJYKNLM1` — 9TH CIRCUIT COURT OF APPEALS

```json
{
  "entityRegistration": {
    "samRegistered": "No",
    "ueiSAM": "WB23FJYKNLM1",
    "legalBusinessName": "9TH CIRCUIT COURT OF APPEALS",
    "registrationStatus": "ID Assigned",
    "publicDisplayFlag": "Y"
  },
  "coreData": {
    "physicalAddress": { "...": "standard fields" }
  },
  "integrityInformation": {
    "responsibilityInformationCount": 1,
    "responsibilityInformationList": [
      {
        "recordType": "C",
        "recordTypeDesc": "Termination for Cause",
        "recordDate": "2022-05-09",
        "procurementIdOrFederalAssistanceId": "BG567815C0001",
        "attachment": "<Pre-signed URL>"
      }
    ]
  }
}
```

### Response — NPDY Unregistered Entity (Opted Out)

**UEI:** `TST987654321` — HAYES, INC.

All `entityRegistration` fields return the opt-out message. `integrityInformation` returns 3 responsibility records including both "Termination for Cause" and "Material Failure to Comply with Closeout Requirements" types.

---

## Example 8: Not Registered / ID Assigned Entities (Fed System Account)

**Scenario:** Using a Fed System Account with the required Role to access not registered/ID Assigned entities.

### Request URLs

```
https://api.sam.gov/entity-information/v3/entities?api_key=<API Key>&samRegistered=No
```

### Response — Public Unregistered Entity

```json
{
  "entityRegistration": {
    "samRegistered": "No",
    "ueiSAM": "JF19T45AM8F2",
    "cageCode": "null",
    "legalBusinessName": "Anchored Consulting Group LLC",
    "registrationStatus": "Active",
    "publicDisplayFlag": "Y",
    "dnbOpenData": "Y"
  },
  "coreData": {
    "physicalAddress": {
      "addressLine1": "Address 1",
      "city": "City",
      "stateOrProvinceCode": "XX",
      "zipCode": "11111",
      "countryCode": "XXX"
    }
  }
}
```

### Response — NPDY Unregistered Entity

```json
{
  "entityRegistration": {
    "samRegistered": "No",
    "ueiSAM": "MC4NTRBK7AX5",
    "cageCode": "null",
    "legalBusinessName": "FPDS",
    "registrationStatus": "Active",
    "publicDisplayFlag": "N",
    "dnbOpenData": "Y"
  },
  "coreData": {
    "physicalAddress": { "...": "standard fields" }
  }
}
```

---

## Example 9: Asynchronous CSV Export

**Scenario:** Obtain an asynchronous CSV file of Active registered entities.

### Request URLs

```
https://api.sam.gov/entity-information/v2/entities?api_key=<FOUO API Key>&registrationStatus=A
https://api.sam.gov/entity-information/v3/entities?api_key=<FOUO API Key>&registrationStatus=A
```

### Response

The API returns CSV files. See SAM.gov documentation for sample CSV response formats for v2 and v3.

---

## Example 10: Full JSON Export via POST

**Scenario:** Get a JSON file of all entities using a POST request.

### Request URLs

```
https://api.sam.gov/entity-information/v2/entities?format=JSON
https://api.sam.gov/entity-information/v3/entities?format=JSON
```

### Response

The API returns a download token:

```
Extract File will be available for download with POST url:
https://api.sam.gov/entity-information/v3/download-entities?token=<value>
```

### Download Steps

1. Submit the POST request with proper authorization headers
2. Receive the download token in the response
3. Download the file using: `https://api.sam.gov/entity-information/v3/download-entities?token=<value>`
4. Save the downloaded file as `<filename>.json.gz` (or `<filename>.csv.gz` for CSV)
5. If `emailId` was provided, a notification email is sent when the file is ready

> **Note:** Requests for larger datasets may take longer to process.