/*----------------------------------------------------------------------------------------------------------
Click Edit code and do the following:
1. Click Add input variable 
2. Name = network & value = select the field containing the network
3. Click Add input variable 
4. Name = amount & value = select the field containing the amount
5. Click Add input variable 
6. Name = phone & value = select the field containing the phone
7. Click Add input variable 
8. Name = reference & value = select the field containing the reference
9. Click Add input variable 
10. Name = isoName & value = select the field containing the isoName
----------------------------------------------------------------------------------------------------------*/
let airtimeTable = "Results"; // Enter the table name you want to save incentive records into

/*
      DO NOT CHANGE THE CODE BELOW.
*/
// simcontrol api----------------------------------------------
 let simApiKey = inputConfig["simApiKey"];

// reloadly api keys----------------------------------------------
let reloadlyId = inputConfig["reloadlyId"]; // reloadly id
let reloadlySecret = inputConfig["reloadlySecret"]; // reloadly secret key
//---------------------------------------------------------------

let inputConfig = input.config();
console.log(inputConfig);

let phone = inputConfig["phone"];
let amount =inputConfig["amount"];
let networkCell = inputConfig["network"];
let reference = inputConfig["reference"];
let isoName = 'ZA';//inputConfig["isoName"];
let recId = inputConfig["recId"];
let dataId = inputConfig["dataId"];
let category = inputConfig["category"];
let simcontrol_network_id = inputConfig["simcontrol_network_id"];
let bundle_id = inputConfig["bundle_id"];
let incentive_reference = inputConfig["incentive_reference"];



/*if(incentive_reference != null){
  reference == incentive_reference
}*/

if(reference==null){
  reference = String(Date.now())
}



// httpRequest
class httpRequest{
    constructor(){
      
    }
    post(apiUrl, headers, data){
      let fetchOptions = {
      method: 'POST',
      headers:headers,
      body: JSON.stringify(data)}
      return fetch(apiUrl,fetchOptions)
    }

    get(apiUrl,headers){
      let fetchOptions = {
      method: "GET",
      headers:headers}
      return fetch(apiUrl,fetchOptions)
    }
}

function reloadlyNetworkInfo(jsonNetwork,networkCell){
  console.log(jsonNetwork)
  let i;
  for (i = 0; i < jsonNetwork.length; i++){
    let reloadlyNetwork = jsonNetwork[i];
    if(reloadlyNetwork.name.includes(networkCell)){
      console.log('index: '+ i + ' MNO: ' + reloadlyNetwork.name)
      return reloadlyNetwork
    }
  }
}

let jsonAirtime = {}

if (category=="Airtime"){
    console.log("Phone: " +phone +", Network: "+networkCell+", Amount: R"+amount+ ", Reference: "+reference+', isoName: '+isoName)
    //  authenticate
    let payload = {"client_id": reloadlyId,"client_secret": reloadlySecret,
                  "grant_type": "client_credentials","audience": "https://topups.reloadly.com"}
    let headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }

    let apiUrl =  "https://auth.reloadly.com/oauth/token"
    let requests = new httpRequest()
    let token =  await requests.post(apiUrl, headers, payload)
    let jsonToken = JSON.parse(JSON.stringify(await token.json()))
    console.log('Token')

    let accessToken = jsonToken.access_token
    console.log(accessToken)
    let tokenType = jsonToken.token_type

    // Get Operator Id
    let reqHeaders = {'Accept': 'application/com.reloadly.topups-v1+json',
                  'Authorization': tokenType+" "+accessToken}
    let mnoIdUrl =  "https://topups.reloadly.com/operators/countries/"+isoName
    let network =  await requests.get(mnoIdUrl, reqHeaders)

    let jsonNetwork = JSON.parse(JSON.stringify(await network.json()))

    console.log(jsonNetwork)

    let reloadlyNetwork = await reloadlyNetworkInfo(jsonNetwork,networkCell)
    let mnoId = reloadlyNetwork.operatorId // operator Id

    console.log('Send Airtime')
    // Send Airtime
    let airtimeUrl =  "https://topups.reloadly.com/topups"
    let airtimeValues = {"recipientPhone": {"countryCode": isoName,"number": phone },
                  "senderPhone": {"countryCode": "ZA","number": "+27818288871"},
                  "operatorId": String(mnoId),
                  "amount": String(amount),
                  "customIdentifier": reference
                  }
    let sendHeaders = {'Content-Type': 'application/json',
                      'Accept': 'application/com.reloadly.topups-v1+json',
                      'Authorization': tokenType+" "+accessToken}

    console.log(airtimeValues)

    // Recharge with airtime
    let airtime =  await requests.post(airtimeUrl, sendHeaders,airtimeValues)
    console.log(airtime)
    let jsonAirtime = JSON.parse(JSON.stringify(await airtime.json()))
    console.log(jsonAirtime)

    // export data
  let keys = Object.keys(jsonAirtime)

  if(keys.includes('errorCode')){
    console.log("FAILED RECHARGE")
    jsonAirtime['status'] = 'FAILED'
    jsonAirtime['recipientPhone'] = phone
    jsonAirtime['customIdentifier'] = String(reference)
  }else{
    console.log("SUCCESSFUL RECHARGE")
    jsonAirtime['status'] = 'SUCCESSFUL'
    jsonAirtime['balanceInfo'] = jsonAirtime['balanceInfo']['newBalance']
  }
  //jsonAirtime['Requests'] = recId
  //console.log(jsonAirtime)
  let airtime_table = base.getTable(airtimeTable);
  await airtime_table.createRecordsAsync([{fields: jsonAirtime}])

}
else{

  
  //-
  console.log("Phone: " +phone +", Network: "+networkCell+", Amount: R"+bundle_id+ ", Reference: "+reference+', isoName: '+isoName)

  let headers = {'Content-Type': 'application/json', 'simcontrol-api-key': simApiKey};
  let apiUrl ='https://new.simcontrol.co.za/graphql/';
  let  qryStr = "".concat('mutation { rechargeSim(msisdn: \"+',String(phone),'\", networkId: \"',simcontrol_network_id,'\", productId:\"',bundle_id,'\", reference: \"',reference, '\") { reference  message}}')
  let airtimeQry = {'query':qryStr}
  let requests = new httpRequest()
  let result  =  await requests.post(apiUrl, headers, airtimeQry)
  let jsonData = await result.json()

  console.log(jsonData)


  let rechargeStr = "".concat('{ adhocRecharges(first: 1, reference: \"',reference,'\") { edges { node {id msisdn network { name } productType product { label } price status succeededAt created failureType reference} } } }')
  let rechargeQry = {'query':rechargeStr};

  console.log(rechargeQry)

  let recharge  =  await requests.post(apiUrl, headers, rechargeQry)
  let jsonRecharge = await recharge.json()

  console.log('Status')
  let data = jsonRecharge['data']['adhocRecharges']['edges'][0]['node']

  let jsonExport = {}
  jsonExport['customIdentifier'] = data['reference']
  jsonExport['recipientPhone'] = data['msisdn']
  jsonExport['status'] = data['status']
  jsonExport['deliveredAmount'] = data['price']
  jsonExport['message'] = data['failureType']
  jsonExport['transactionDate'] = data['created']
  jsonExport['operatorName'] = networkCell[0]
  
  console.log(jsonExport)
  let airtime_table = base.getTable(airtimeTable);
  await airtime_table.createRecordsAsync([{fields: jsonExport}])


}






//console.log(jsonAirtime)
