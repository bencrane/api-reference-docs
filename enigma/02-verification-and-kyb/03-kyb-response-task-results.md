# Verification & KYB - KYB Tasks & Matched Data - KYB Response Task Results

> Source: https://documentation.enigma.com/kyb/response/tasks

The risk summary section includes all the information you need to automate the decisioning logic of a business onboarding or review workflow. It is composed of tasks, which are discrete verification steps that are typically conducted in a business onboarding or verification process. Tasks help you understand whether the submitted business is valid and meets your KYB requirements, or if additional investigation is needed. Task results are the output of these steps. You can incorporate task results into the decisioning logic implemented in your workflows.

Each task compares a value that you provided in your [request](/kyb/verify-identity) to the corresponding value in either the business record in [Enigma's data set](/getting_started/data_model), or the records of the relevant, authoritative Secretary of State (SoS) itself.

| Task | Description |
|---|---|
| Address Verification | Compares input address(es) to the addresses of matching records of any kind |
| SoS Address Verification | Compares input address(es) specifically to the addresses on SoS registrations of the matching registered (legal) entity |
| Name Verification | Compares input business name(s) to the names of any matching records of any kind |
| SoS Name Verification | Compares input business name(s) specifically to the names on SoS registrations of the matching registered (legal) entity |
| Person Verification | Compares input person name to the officer names listed on SoS registrations of the matching registered (legal) entity |
| Domestic Registration | Indicates whether the matching registered (legal) entity has a domestic SoS registration and if it is active |
| SSN Verification | Compares input SSN and person last name combination to IRS records |
| TIN Verification | Compares input TIN and business name combinations to current IRS records |
| Watchlist | Indicates whether the business appears on any U.S. government sanctions lists |

All task results, except the `watchlist` task result, include a `sources` object in the response that specifies the value in Enigma's records that matched the input value.

> **Tasks operate on one match:** Task logic can only operate on one matching legal entity and brand at a time, so if you [specify a `top_n` greater than 1](/kyb/verify-identity#advanced-query-parameters), task results will not be returned.

---

## Standard Tasks

### Name Verification

The `name_verification` task compares the business name(s) in the `names` field of the request to the names in both the [registered entity](/kyb/response/data#registered_entities-attributes) and [brand](/kyb/response/data#brands-attributes) objects returned in the response. The `name_verification` task will return one of the following results:

| Status | Result | Reason |
|---|---|---|
| Success | `name_exact_match` | An input business name exactly matches a business name in any of Enigma's records |
| Success | `name_match` | An input business name matches a business name in any of Enigma's records |
| Failure | `name_not_verified` | No input business name matches a business name in any of Enigma's records |

An input name is an exact match only if it is nearly identical to the matching name. Only minor differences, such as capitalization, can exist between the input name and the name that matched. For example, "Enigma Technologies" would be considered an exact match to "Enigma technologies".

A name is a match, but not an exact match, if it is substantially similar to the name that matched, but not identical. The most common reason for a non-exact name match is a difference in the legal suffix between the submitted name and the name that matched. For example, "Enigma Technologies" would be considered a match, but not an exact match, to "Enigma Technologies Inc.".

Typically, customers consider any name match to the submitted business name to be verified for compliance programs, even if it isn't exact, so they base their decisioning logic on the `status` field. If your use case calls for more granular decision making, use the `result` field to distinguish between exact and non-exact matches.

The `name_verification` task is included in both the identify and verify [packages](/kyb/kyb-packages).

### SoS Name Verification

The matching logic for the `sos_name_verification` task is the same as the matching logic for the [`name_verification` task](/kyb/response/tasks#name-verification). The difference is that the `sos_name_verification` task only compares the business name(s) in the `names` field of the request to the names in the [registered entity](/kyb/response/data#registered_entities-attributes) returned in the response. No other records are eligible to match the submitted name(s).

The `sos_name_verification` task will return one of the following results:

| Status | Result | Reason |
|---|---|---|
| Success | `name_exact_match` | An input business name exactly matches a business name on a matching SoS registration |
| Success | `name_match` | An input business name matches a business name on a matching SoS registration |
| Failure | `name_not_verified` | No input business name matches any business names on a matching SoS registration |

The `sos_name_verification` task is included in both the identify and verify [packages](/kyb/kyb-packages).

### Address Verification

The `address_verification` task compares the address(es) in the `addresses` field of the request to the addresses in both the [registered entities](/kyb/response/data#registered_entities-attributes) and [brands](/kyb/response/data#brands-attributes) objects returned in the response. The `address_verification` task will return one of the following results:

| Status | Result | Reason |
|---|---|---|
| Success | `address_exact_match` | An input address exactly matches an address in any of Enigma's records |
| Success | `address_match` | An input address matches an address in any of Enigma's records |
| Failure | `address_not_verified` | No input address matches any address in any of Enigma's records |

An input address is an exact match if all of its components are substantially the same as the matching address. Only minor differences, such as a difference in the number of digits specified in the postal code, will still result in an exact match. Note that if any input value for `street_address2` is provided, then the matching address must include the same value for `street_address2` in order to be considered an exact match, but if no input value for `street_address2` is provided, then the matching address can have a `street_address2` value and still be considered an exact match.

An input address is a match, but not an exact match, even if certain components of the input address are different from the matching address, as long as the address as a whole is substantially similar. For instance, the `city` value may be matched either on the basis of string similarity or on the basis of alternative "vanity" names for the same city, as long as the postal code also matches. For example, "Hollywood" will match to "Los Angeles" as long as a postal code associated with Los Angeles, such as 90027, is also provided in the request.

Typically, customers consider any address match to the submitted address to be verified for compliance programs, even if it isn't exact. The most common reason that an address does not match exactly is when the submitted address and the address that matched are the same, except one is simply missing a suite number. If your use case calls for more granular decision making, you can use the `result` field to distinguish between exact and non-exact matches.

The `address_verification` task is included in both the identify and verify [packages](/kyb/kyb-packages).

### SoS Address Verification

The matching logic for the `sos_address_verification` task is the same as the matching logic for the [`address_verification` task](/kyb/response/tasks#address-verification). The difference is that the `sos_address_verification` task only compares the address(es) in the `addresses` field of the request to the addresses in the [registered entity](/kyb/response/data#registered_entities-attributes) returned in the response. No other records are eligible to match the submitted address(es).

The `sos_address_verification` task will return one of the following results:

| Status | Result | Reason |
|---|---|---|
| Success | `address_exact_match` | An input address exactly matches an address on a matching SoS registration |
| Success | `address_match` | An input address matches an address on a matching SoS registration |
| Failure | `address_not_verified` | No input address matches any address on a matching SoS registration |

The `sos_address_verification` task is included in both the identify and verify [packages](/kyb/kyb-packages).

### Person Verification

The `person_verification` task compares the names in the `persons` field of the request to the names of each [person](/kyb/response/data#persons-attributes) included in the [registered entity](/kyb/response/data#registered_entities-attributes) returned in the response. A person name is a match if two conditions are met:

- The full string of the `last_name` exactly matches the last name of a person on a matching SoS registration
- The first character of the `first_name` matches the first initial of a person on a matching SoS registration

Capitalization and punctuation do not affect the match result.

> **Note:** Do not include any suffixes, initials, honorifics, or other name variations in the `first_name` or `last_name` fields of the request. If included, they will be used in the match comparison and may cause the match to fail.

The `person_verification` task will return one of the following results:

| Status | Result | Reason |
|---|---|---|
| Success | `person_match` | The person name matches a person name on a matching SoS registration |
| Failure | `person_not_verified` | The person name does not match any person names on a matching SoS registration |

The `person_verification` task is only included in the [verify package](/kyb/kyb-packages).

### Domestic Registration

Legal entities must register with the SoS in every state that they operate in. A "domestic" registration is one that is filed in the state where the legal entity was originally registered. A "foreign" registration is one that is filed in a state other than the state where the legal entity was originally registered. For example, a corporation may be registered in Delaware and operate in New York and California, filing registrations in each state. This legal entity's registration in Delaware would be considered "domestic", while its registrations in NY and CA would be considered "foreign".

The `domestic_registration` task response indicates whether the matching [registered entity](/kyb/response/data#registered_entities-attributes) included in the response has a `home_jurisdiction_state` value that matches the `state` value in the request. The `domestic_registration` task will return one of the following results:

| Status | Result | Reason |
|---|---|---|
| Success | `domestic_active` | An active domestic registration was found |
| Success | `domestic_unknown` | A domestic registration was found but no status was provided by the SoS |
| Failure | `domestic_inactive` | An inactive domestic registration was found |
| Failure | `domestic_not_found` | No domestic registration was found |

The `domestic_registration` task is only included in the [verify package](/kyb/kyb-packages).

---

## Add-On Tasks

Add-on tasks are not included in either [package](/kyb/kyb-packages), but can be added to either package. [Contact us](https://www.enigma.com/contact-us) to discuss including an add-on task in your plan.

Once an add-on task has been added to your plan, you can request it by passing the name of the task in the `attrs` parameter. For example, to request SSN verification, you can pass `ssn_verification` in the `attrs` parameter, like so:

```text
--request POST 'https://api.enigma.com/v2/kyb/?package=verify&attrs=ssn_verification'
```

### SSN Verification

Verifying that a Social Security Number (SSN) and name combination matches Internal Revenue Service (IRS) records is a common step in many Know Your Business (KYB) workflows. For example, you may want to verify that the SSN that an Ultimate Beneficial Owner (UBO) has supplied is in fact their own.

When you request SSN verification, Enigma will verify that a person's SSN is valid and that it matches their last name. Specifically, Enigma will verify that the `ssn` and the `last_name` fields of the `person` object in the request match the information the IRS has on file via the [IRS TIN Matching system](https://www.irs.gov/tax-professionals/taxpayer-identification-number-tin-matching). When requesting SSN verification, ensure that:

- There is only one `person` provided, and
- The SSN is valid and correctly formatted by confirming that:
  - It is a 9-digit string
  - It has not been stripped of leading zeros
  - It does not include any dashes

The `ssn_verification` task will return one of the following results:

| Status | Result | Reason |
|---|---|---|
| Success | `ssn_verified` | The SSN and last name combination matches IRS records |
| Failure | `ssn_invalid` | The SSN is invalid |
| Failure | `not_completed` | The IRS is unavailable |
| Failure | `ssn_not_verified` | The SSN and last name combination does not match IRS records |
| Failure | `ssn_not_verified` | The SSN is not currently issued |

If you unexpectedly receive a `ssn_invalid` result, confirm that the submitted SSN is formatted correctly.

In the event of a `not_completed` result indicating an IRS availability error, check the KYB Tasks section on [Enigma status page](https://status.enigma.com/) for the latest status of this task. Note that the IRS can be down for a few minutes to several hours at a time. If retrying is not ideal or continues to be unsuccessful, the client can request documents, like their SSN card or a tax document, from the person to verify the SSN.

**What is an SSN?**

A SSN is a type of tax identification number (TIN) for a person that is used by the Social Security Administration and the IRS. A SSN is assigned at birth, or during the immigration process. While SSNs were designed to be unique, there have been rare instances of duplicate assignments. Enigma also verifies Individual Taxpayer Identification Numbers (ITIN) against submitted persons.

For information on how to verify an Employer Identification Number (EIN) or TIN against a submitted business name, see the [TIN Verification task](/kyb/response/tasks#tin-ein-verification).

### TIN (EIN) Verification

A Tax Identification Number (TIN) is used by the Internal Revenue Service (IRS) to uniquely identify a tax paying entity. It can be an Employer Identification Number (EIN), a Social Security Number (SSN), an Individual Taxpayer Identification Number (ITIN), as well as other less common TIN types.

The `tin_verification` task verifies that the submitted EIN is valid and that it matches any name(s) submitted in the `names` object of the request. Optionally, if you specify a `primary_name`, the `tin_verification` task will only verify that the primary name matches the submitted EIN.

When submitting a TIN, ensure that it is valid and correctly formatted by confirming that:

- It is a 9-digit string
- It has not been stripped of any leading zeros
- It does not include any dashes

The `tin_verification` task will return one of the following results:

| Status | Result | Reason |
|---|---|---|
| Success | `tin_verified` | The TIN and Name combination matches IRS records |
| Failure | `tin_invalid` | The TIN is invalid |
| Failure | `not_completed` | The IRS is unavailable |
| Failure | `not_completed` | Duplicate TIN matching request |
| Failure | `tin_not_verified` | The TIN and Name combination does not match IRS records |
| Failure | `tin_not_verified` | The TIN is not currently issued |

If you unexpectedly receive a `tin_invalid` result, first confirm that the submitted TIN is formatted correctly.

In the event of a `not_completed` result indicating an IRS availability error, check the KYB Tasks section on [Enigma status page](https://status.enigma.com/) for the latest status of this task. Note that the IRS can be down for a few minutes to several hours at a time. If retrying is not ideal or continues to be unsuccessful, the client can request documents to verify the TIN.

### Watchlist (OFAC Sanctions) Screening

The `watchlist` task checks whether the submitted business name(s) appear on any U.S. government sanctions lists, including the Office of Foreign Assets Control (OFAC) list. The `watchlist` task will return one of the following results:

| Status | Result | Reason |
|---|---|---|
| Success | `watchlist_no_hits` | No hits were identified on the consolidated sanctions list (including OFAC) |
| Failure | `watchlist_hits` | `X` hit(s) were identified on the consolidated sanctions list (including OFAC) |

Where `X` is the number of hits identified on the consolidated sanctions list (including OFAC).