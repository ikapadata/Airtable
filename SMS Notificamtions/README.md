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

1. Download the [SMS.csv](https://www.dropbox.com/s/aze301bdfven2zm/SMS.csv?dl=1) from this repo and import it as a new table on your Airtable base. This will provide all of the required fields for requesting SMS notifications.
2. Create a new Automation and select the appropriate trigger.

![Screenshot](https://github.com/ikapadata/Airtable/blob/new-edits/SMS%20Notificamtions/Screenshots/script.gif)

2. Add Runs script as your action. Then copy and paste the code from [sms.js](https://github.com/ikapadata/Airtable/blob/new-edits/SMS%20Notificamtions/sms.js) onto Airtable's script editor.

![Screenshot](https://github.com/ikapadata/Airtable/blob/new-edits/Airtime%20%26%20Data%20Distribution/Screenshots/incentive_code.gif)
### Parameters
#### Bulkgate Integration

| Parameter key | Parameter value |
| --- | --- |
| `phone` | international mobile phone number|
| `text` | Text message|
| `token` | Bulkgate API Token|
| `appId` | Bulkgate application ID|
|`rec_id`|Aitable record ID used to update the status|

![Screenshot](https://github.com/ikapadata/Airtable/blob/new-edits/SMS%20Notificamtions/Screenshots/inputs.gif)


