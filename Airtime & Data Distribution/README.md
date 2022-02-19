# Description


This script is designed to enable you to recharge mobile devices with airtime and data worldwide. With it's [Relodaly](https://reloadly.com) and [Simcontrol](https://simcontrol.co.za) API integrations you have borderless recharges of 5 billion devices covered by 630 mobile operator networks in over 150 countries. On Airtable, the recharges are automated to be issued to contacts for any of the following triggers:
- When record matches conditions
- When a form is submitted
- When record created
- When record updated
- When record enters view

## How to use

### Getting started
_It assumed that you're familiar with creating Airtable automations. You can refresh your knowledge by reading [How to create an Airtable Automation](https://support.airtable.com/hc/en-us/articles/360052619093-Creating-an-automation)
**To use this script as-is**

1. Download the [sample csv](https://github.com/ikapadata/Airtable/blob/new-edits/Airtime%20%26%20Data%20Distribution/Airtime%20Results%20Fields.csv) from this repo and import it as a new table on your Airtable base. This will provide all of the required fields for capturing results
2. Rename the new table to **Results**.
3. Create a new Automation and select the appropriate trigger.
4. Add Runs script as your action.
5. Copy and paste the code from [incentive.js](https://github.com/ikapadata/Airtable/blob/new-edits/Airtime%20%26%20Data%20Distribution/incentives.js) onto Airtable's script editor.

### Parameters
#### Reloadly Recharges

| Parameter key | Parameter value |
| --- | --- |
| `phone` | international mobile phone number|
| `network` | moblie network operator name|
| `amount` | value of recharge|
| `category` | specify Airtime or Data recharge|
| `reloadlyId` | reloadly API ID|
| `reloadlySecret` | Reloadly Secret API Key|

#### Simcontrol Recharges
| Parameter key | Parameter value |
| --- | --- |
| `simcontrolKey` | simcontrol API key|
| `bundleId` | simcontrol data bundle Id|
| `networkId` | mobile network ID|

## Demonstration
Follow this Video.
![Screenshot](https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4)
