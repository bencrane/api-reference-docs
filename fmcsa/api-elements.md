# API Elements Description

## Carrier Information Elements

| Element Name | Description | Possible Values |
|--------------|-------------|-----------------|
| allowToOperate | Indicates is a carrier is allowed to operate by law. | Y or N |
| outOfService | Carrier received out of service order and is not allowed to operate | Y or N |
| outOfServiceDate | The date the carrier recieved out of service order | MM/DD/YYYY |
| complaintCount | Number of customer complaints about the carrier received by FMCSA | Number |
| dotNumber | U.S. DOT registered number for the carrier | Number |
| mcNumber | U.S. DOT registered motor carrier number for the carrier | Number |
| legalName | Legal registered name of the carrier | String |
| dbaName | Alternative operating name of the carrier | String |
| busVehicle | Number of school buses a carrier operates | Number |
| limoVehicle | Number of limousines a carrier operates | Number |
| miniBusVehicle | Number of mini-buses a carrier operates | Number |
| motorCoachVehicle | Number of motorcoaches a carrier operates | Number |
| vanVehicle | Total number of van vehicles a carrier operates | Number |
| passengerVehicle | Total number of vehicles a carrier operates | Number |
| phyStreet | Carrier listed Street Address | String |
| phyCity | Carrier listed City | String |
| phyState | Carrier listed State | String |
| phyZip | Carrier listed Zip-Code | String |
| phyCountry | Carrier listed Country | String |
| telephone | Carrier listed Telephone | String |

## Carrier BASIC Measure JSON Elements

These elements are returned in response to a BASICs query. See the QCMobile API page for info on BASIC query endpoints.

| Element Name | Description | Possible Values |
|--------------|-------------|-----------------|
| basicShortDesc | Short Description of a BASIC | String |
| basicId | Numerical code of a BASIC | Number |
| basicDesc | Long Description of a BASIC | String |
| percentile | On-Road performance BASIC percentile | percentage(%) value, inconclusive, no violations, insufficient data |
| rdDeficient | On-Road performance threshold violation indicator | Y or N |
| rdsvDeficient | Indicates a carrier exceeded FMCSA intervention threshold value | Y or N |
| svDeficient | Indicates serious violation cited within the last 12 months from an investigation | Y or N |
| snapShotDate | Indicates last update of BASIC data | MM/DD/YYYY |
| totalInspectionWithViolation | Number of relevant inspections with BASIC violation in the past 24 months | Number |
| totalViolation | Total number of BASIC violation past 24 months | Number |

## Notes

- Elements only appear if they have value. Therefore only elements applicable to the carrier are generated
- Some elements are mutually exclusive and may not appear together. For example if allowToOperate = Y, outOfServiceDate does not have value
- Unsafe Driving, Driver Fitness, Fatigued Driving, Controlled Substance/Alcohol and Vehicle Maintenance are the only reported BASIC
- For information regarding BASIC elements please, visit [FMCSA CSA (Compliance, Safety, Accountability)](https://csa.fmcsa.dot.gov/)
