const paystack = (request) => {
  const MySecretKey= process.env.PAYSTACK_KEY
const getBanks = (data, mycallback)=>{
 
    const options = {
        
        url: `https://api.paystack.co/bank?currency=${data.country}`,
        // port: 443,
        // path: '/bank?currency=NGN',
        // method: 'GET',
        headers: {
          Authorization: MySecretKey,
          'content-type': 'application/json',
          'cache-control': 'no-cache' 
        }
      }
      const callback = (error, response, body) => {
        return mycallback(error, body)
    }
    request.get(options, callback)
}
const verifyBanks = (data, mycallback)=>{
    const MySecretKey= process.env.PAYSTACK_KEY
    const options = {
        url: `https://api.paystack.co/bank/resolve?account_number=${data.acct_no}&bank_code=${data.bank_code}`,
        // port: 443,
        // path: '/bank?currency=NGN',
        // method: 'GET',
        headers: {
          Authorization: MySecretKey,
          'content-type': 'application/json',
          'cache-control': 'no-cache' 
        }
      }
      const callback = (error, response, body) => {
        return mycallback(error, body)
    }
    request.get(options, callback)
}
const  createTransferReceipient = (data, mycallback)=>{
  const MySecretKey= process.env.PAYSTACK_KEY
  const options = {
        
    url: `https://api.paystack.co/transferrecipient`,
    headers: {
      Authorization: MySecretKey,
      'content-type': 'application/json',
      'cache-control': 'no-cache' 
    },
    body: data,
  }

    const callback = (error, response, body) => {
    return mycallback(error, body)
}
request.post(options, callback)
}
const initiateTransfer= (data, mycallback)=>{
  const options = {
      url: `https://api.paystack.co/transfer`,
      headers: {
      Authorization: MySecretKey,
      'content-type': 'application/json',
      'cache-control': 'no-cache' 
      },
    body: data,
  }
  const callback = (error, response, body)=>{
    return mycallback(error, body)
  }
  request.post(options, callback)

}
return {getBanks, verifyBanks,  createTransferReceipient, initiateTransfer};
}
module.exports = paystack;