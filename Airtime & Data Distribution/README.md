# Description


This script is designed to enable you to recharge mobile devices with airtime and data worldwide. With it's [Relodaly](https://reloadly.com) and [Simcontrol](https://simcontrol.co.za) API integrations you have borderless recharges of 5 billion devices covered by 630 mobile operator networks in over 150 countries. On Airtable, the recharges are automated to be issued to contacts for any of the following triggers:
- When record matches conditions
- When a form is submitted
- When record created
- When record updated
- When record enters view

## How to use

### Getting started

**To use this script as-is**

1. Download the [sample csv](https://github.com/ikapadata/Airtable/blob/new-edits/Airtime%20%26%20Data%20Distribution/Airtime%20Results%20Fields.csv) from this repo and import it as a new table on your Airtable base. This will provide all of the required fields for capturing results
2. Rename the new table to **Results**.
3. Create a new Automation and select the appropriate trigger.
4. Add Runs script as your action.
5. Copy and paste the code from [incentive.js](https://github.com/ikapadata/Airtable/blob/new-edits/Airtime%20%26%20Data%20Distribution/incentives.js) onto Airtable's script editor.

### Parameters

| Parameter key | Parameter value |
| --- | --- |
| `phone` | international mobile phone number|
| `network` | moblie network operator name|
| `amount` | value of recharge|
| `category` | specify Airtime or Data recharge|
| `reloadlyId` | reloadly API ID|
| `reloadlySecret` | Reloadly Secret API Key|

| Parameter key | Parameter value |
| --- | --- |
| `simcontrolKey` | simcontrol API key|
| `simcontrolBudnleId` | simcontrol data bundle Id|
| `simcontrolNetworkId` | mobile network ID|
