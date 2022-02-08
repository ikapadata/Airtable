/*----------------------------------------------------------------------------------------------------------
Click Edit code and do the following:
1. Click Add input variable 
2. Name = phone & value = select the field containing the phone
3. Click Add input variable 
4. Name = text & value = select the field containing the text
----------------------------------------------------------------------------------------------------------*/
/*
      DO NOT CHANGE THE CODE BELOW.
*/
let inputConfig = input.config();
let phoneNumber = inputConfig["phone"];
let text =inputConfig["text"];




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
let url = "https://portal.bulkgate.com/api/1.0/simple/transactional";
let token = "";
let application_id = "";

let header ={"Host": "portal.bulkgate.com",
"Content-Type": "application/json",
"Cache-Control": "no-cache"}

let data = {
    "application_id": application_id, 
    "application_token": token, 
    "number": phoneNumber, 
    "text": text
}

let requests = new httpRequest();
let r = await requests.post(url,header,data)

let jsonRes = JSON.parse(JSON.stringify(await r.json()))

console.log(jsonRes)





















