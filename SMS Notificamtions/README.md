# Description


This script intergates to the [Bulkgate](https://www.bulkgate.com/en/) API to enable you to send SMS notifications to contacts worldwide. On Airtable, the sms notifications are automated to be issued to contacts for any of the following triggers:
- When record matches conditions
- When a form is submitted
- When record created
- When record updated
- When record enters view

## How to use

### Getting started
_It is assumed that you're familiar with creating Airtable automations. You can refresh your knowledge by reading [How to create an Airtable Automation](https://support.airtable.com/hc/en-us/articles/360052619093-Creating-an-automation)_

**To use this script as-is**

1. Download the [sample csv](https://github.com/ikapadata/Airtable/blob/new-edits/Airtime%20%26%20Data%20Distribution/Airtime%20Results%20Fields.csv) from this repo and import it as a new table on your Airtable base. This will provide all of the required fields for capturing results
2. Rename the new table to **Results**.
3. Create a new Automation and select the appropriate trigger.
4. Add Runs script as your action.
5. Copy and paste the code from [sms.js](https://github.com/ikapadata/Airtable/blob/new-edits/SMS%20Notificamtions/sms.js) onto Airtable's script editor.

### Parameters
#### Bulkgate Integration

| Parameter key | Parameter value |
| --- | --- |
| `phone` | international mobile phone number|
| `text` | Text message|
| `token` | Bulkgate API Token|
| `appId` | Bulkgate application ID|


## Demonstration
![Screenshot](http://sco-assets.support.airtable.com/automations/change_trigger_type.gif)
