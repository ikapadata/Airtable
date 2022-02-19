
let inputConfig = input.config();
// results table----------------------------------------------
let airtimeTable = inputConfig["ResultsTable"]; // name of table

// simcontrol api----------------------------------------------
let simApiKey = inputConfig["simApiKey"];
let simcontrol_network_id = inputConfig["simcontrol_network_id"];
let bundle_id = inputConfig["bundle_id"];

// reloadly api ----------------------------------------------
let reloadlyId = inputConfig["reloadlyId"]; // reloadly id
let reloadlySecret = inputConfig["reloadlySecret"]; // reloadly secret key
let isoName = inputConfig["isoName"];
//---------------------------------------------------------------
let phone = inputConfig["phone"];
let amount =inputConfig["amount"];
let networkCell = inputConfig["network"];
let category = inputConfig["category"];

let reference = inputConfig["reference"];

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

    let accessToken = jsonToken.access_token
    let tokenType = jsonToken.token_type

    // Get Operator Id
    let reqHeaders = {'Accept': 'application/com.reloadly.topups-v1+json',
                  'Authorization': tokenType+" "+accessToken}
    let mnoIdUrl =  "https://topups.reloadly.com/operators/countries/"+isoName
    let network =  await requests.get(mnoIdUrl, reqHeaders)

    let jsonNetwork = JSON.parse(JSON.stringify(await network.json()))

    let reloadlyNetwork = await reloadlyNetworkInfo(jsonNetwork,networkCell)
    let mnoId = reloadlyNetwork.operatorId // operator Id
    
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

    // Recharge with airtime
    let airtime =  await requests.post(airtimeUrl, sendHeaders,airtimeValues)
    console.log(airtime)
    let jsonAirtime = JSON.parse(JSON.stringify(await airtime.json()))


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

  let headers = {'Content-Type': 'application/json', 'simcontrol-api-key': simApiKey};
  let apiUrl ='https://new.simcontrol.co.za/graphql/';
  let  qryStr = "".concat('mutation { rechargeSim(msisdn: \"+',String(phone),'\", networkId: \"',simcontrol_network_id,'\", productId:\"',bundle_id,'\", reference: \"',reference, '\") { reference  message}}')
  let airtimeQry = {'query':qryStr}
  let requests = new httpRequest()
  let result  =  await requests.post(apiUrl, headers, airtimeQry)
  let jsonData = await result.json()


  let rechargeStr = "".concat('{ adhocRecharges(first: 1, reference: \"',reference,'\") { edges { node {id msisdn network { name } productType product { label } price status succeededAt created failureType reference} } } }')
  let rechargeQry = {'query':rechargeStr};

  let recharge  =  await requests.post(apiUrl, headers, rechargeQry)
  let jsonRecharge = await recharge.json()

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
