# Description


This script is designed to enable you to recharge mobile devices with airtime and data worldwide. With it's [Relodaly](https://reloadly.com) and [Simcontrol](https://simcontrol.co.za) API integrations you have borderless recharges of 5 billion devices covered by 630 mobile operator networks in over 150 countries. On Airtable, the recharges are automated to be issued to contacts for any of the following triggers:
- When record matches conditions
- When a form is submitted
- When record created
- When record updated
- When record enters view

### Features

1. Perform airtime reacharges to approximately 5 billion devices worldwide.
1. Perform data bundle recharges to approximately 5 billion devices worldwide.

_At ikapadata, this script is used to recharge survey respondents at the end of surveys. It is a low code alternative to the [surveyCTO Airtime & Data Plug-in](https://github.com/ikapadata/surveyCTO-Plugins/tree/new-edits/Airtime%20distribution) recharge solution. It is suitable for researchers with Pro Airtable account and knowledge of setting up backends._


## How to use

### Getting started
_It is assumed that you're familiar with creating Airtable automations. You can refresh your knowledge by reading [How to create an Airtable Automation](https://support.airtable.com/hc/en-us/articles/360052619093-Creating-an-automation)_

**To use this script as-is**

1. Create the **Requests** table by downloading [Requests.csv](https://www.dropbox.com/s/vmvnzkenhz1uu8t/Requests.csv?dl=1) from this repo and importing it as a new table on your Airtable base. This will provide all of the required fields for recharge requests.

![Screenshot](https://github.com/ikapadata/Airtable/blob/new-edits/Airtime%20%26%20Data%20Distribution/Screenshots/requests_table.gif)

3. Create the **Results** table by downloading this [Results.csv](https://www.dropbox.com/s/e2qp8w8j00ejlvh/Results.csv?dl=1) from this repo and importing it as a new table on your Airtable base. This will provide all of the required fields for recharge results.

![Screenshot](https://github.com/ikapadata/Airtable/blob/new-edits/Airtime%20%26%20Data%20Distribution/Screenshots/results_table.gif)

4. Create a new Automation and select the appropriate trigger.
![Screenshot](https://github.com/ikapadata/Airtable/blob/new-edits/Airtime%20%26%20Data%20Distribution/Screenshots/triggers.gif)

4. Add *Runs script* as your action. Then copy and paste the code from [incentive.js](https://github.com/ikapadata/Airtable/blob/new-edits/Airtime%20%26%20Data%20Distribution/incentives.js) onto Airtable's script editor.

![Screenshot](https://github.com/ikapadata/Airtable/blob/new-edits/Airtime%20%26%20Data%20Distribution/Screenshots/incentive_code.gif)


### Add Input Variables
#### Reloadly Recharges
[Create a Reloadly account](https://www.reloadly.com/registration) and find your `reloadlyId` and `reloadlySecret` at [API settings.](https://www.reloadly.com/developers/api-settings)
| Parameter key | Parameter value |
| --- | --- |
| `phone` | international mobile phone number|
| `network` | moblie network operator name|
| `amount` | value of recharge|
| `isoName` | Country ISO name of the receipient|
| `category` | specify Airtime or Data recharge|
| `reloadlyId` | reloadly API ID|
| `reloadlySecret` | Reloadly Secret API Key|

![Screenshot](https://www.dropbox.com/s/erers9copbwen6a/reloadly_parameters.gif?dl=1)

#### Simcontrol Recharges
Simcontrol API recharges are only used for data bundle recharges in South Africa because they are currently unavailable through the Reloadly API. Once they are available on Reloadly then this will be deprecated.

| Parameter key | Parameter value |
| --- | --- |
| `simcontrolKey` | simcontrol API key|
| `bundleId` | simcontrol data bundle Id|
| `networkId` | mobile network ID|

![Screenshot](https://github.com/ikapadata/Airtable/blob/new-edits/Airtime%20%26%20Data%20Distribution/Screenshots/simcontrol_parameters.gif)

