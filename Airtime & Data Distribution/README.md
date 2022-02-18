# Description
This script is designed to enable you to recharge mobile devices with airtime and data worldwide. With it's [Relodaly](https://reloadly.com) and [Simcontrol](https://simcontrol.co.za) API integrations you have borderless recharges of 5 billion devices covered by 630 mobile operator networks in over 150 countries. On Airtable, the recharges are automated to be issued to contacts for any of the following triggers:
- When record matches conditions
- When a form is submitted
- When record created
- When record updated
- When record enters view

## How to use

### Getting started

**To use this plug-in as-is**

1. Download the [sample form](https://github.com/surveycto/format-symbol/raw/master/extras/sample-form/Sample%20form%20-%20Format%20symbol%20field%20plug-in.xlsx) from this repo and upload it to your SurveyCTO server.
1. Download the [format-symbol.fieldplugin.zip](https://github.com/surveycto/format-symbol/raw/master/format-symbol.fieldplugin.zip) file from this repo, and attach it to the sample form on your SurveyCTO server.

### Parameters

| Parameter key | Parameter value |
| --- | --- |
| `symbol` | The symbol to be displayed.|
| `placement` | The positioning of they symbol. This can take two values: <br> <ol><li>`left` (default) - the symbol is on the left of the input box. </li><li>`right` - the symbol is on the right of the input box.</li></ol>|
