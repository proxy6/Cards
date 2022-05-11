const https = require('https')
const request = require('request');
const MySecretKey= process.env.PAYSTACK_KEY
const { Wallet } = require("../models/wallet/wallets.model")
const {getBanks, verifyBanks,  initiateTransfer, createTransferReceipient} = require('../utils/paystack')(request)
const { UserWallet } = require("../models/wallet/userWallet.model")
const {User} = require('../models/user.model')
const { TrasactionLogs } = require("../models/wallet/transactionLog.model")
const Flutterwave = require('flutterwave-node-v3');
// const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);


module.exports= {
   

    adminCreateWallet: async(req, res, next)=>{
        let id = req.params.id
        const data = req.body
        const {wallet_name, wallet_currency, wallet_rate, text } = data

        if(req.file) data.image = req.file.filename
        try{
            await User.findOne({_id: id})
            .then( async user=>{
                if(user && user.role == 'Admin'){
                    const wallet = await Wallet.create({
                        wallet_currency,
                        wallet_name,
                        text,
                        wallet_rate,
                        wallet_image: data.image
                    })
                    res.status(200).json({success:1, message: "created wallet", data: wallet })
                } else {
                    res.json({success:1, message: 'User Does not exist or Permission not granted'})
                }
            })
           
        } catch(e){
            res.status(500).json({success:0, message: "failed to create wallet", data: e})
        }
        
    },

    getUserWallet: async(req, res, next)=>{
      let id = req.params.id 
      UserWallet.find({userId:id}) 
      .then(data=> res.status(200).json({success: 1, data: data}))
      .catch(e=>res.status(500).json({success:0, data: e}))
    },
    createQtajWallet: async(userId, callBack)=>{
        await Wallet.findOne({wallet_name: "QTAJ"})
        .then(async wallet=>{
            console.log(wallet._id)
        await UserWallet.create({
          walletName: wallet.wallet_name,
          walletId: wallet._id,
          userId: userId,
          currency: wallet.wallet_currency
        }, function(err, res){
            if(err) console.log(err)
            console.log('created wallet successfully')
            return
        })
        })
        .catch(e=>{
          console.log('error creating wallet')
          return})
      },
    createTajiWallet: async(userId, callBack)=>{
        await Wallet.findOne({wallet_name: "TAJIRI"})
        .then(async wallet=>{
            console.log(wallet._id)
        await UserWallet.create({
          walletName: wallet.wallet_name,
          walletId: wallet._id,
          userId: userId,
          currency: wallet.wallet_currency
        }, function(err, res){
            if(err) console.log(err)
            console.log('created wallet successfully')
            return
        })
        })
        .catch(e=>{
          console.log('error creating wallet')
          return})
      },
    createUsdWallet: async(userId, callBack)=>{
        await Wallet.findOne({wallet_name: "USD"})
        .then(async wallet=>{
            console.log(wallet._id)
        await UserWallet.create({
          walletName: wallet.wallet_name,
          walletId: wallet._id,
          userId: userId,
          currency: wallet.wallet_currency
        }, function(err, res){
            if(err) console.log(err)
            console.log('created wallet successfully')
            return
        })
        })
        .catch(e=>{
          console.log('error creating wallet')
          return})
      },
    addWalletTransactionLogs: async(req, res, next)=>{

     },
    getTransactionLogs: async (req, res, next)=>{
        let userId = req.params.id
        TrasactionLogs.find({userId})
        .then(data=> res.status(200).json({success: 0, message: 'Transaction logs retrieved successfully', data: data}))
        .catch(e=> res.status(500).json({success: 0, message: 'Error Retrieving Transaction Logs', data: e}))
      },
    postTransactionsDemo: async(req, res, next)=>{
        let {amount_inflow, currency, userId, description, transaction_type} = req.body
        let tx_ref = 'Ref-' + (Math.random() + 1).toString(36).substring(2);
       try{
        await TrasactionLogs.create({
            amount_inflow,
            tx_ref,
            currency,
            userId,
            description,
            transaction_type,
        })
        .then(data=>{
        res.status(200).json({success:1, data: 'Logs Created'})
        }).catch(e=>{res.status(500).json({success:0, data: 'Error Creating Logs', e: e})})
    }catch(e){
        res.status(500).json({success:0, data: 'Error Creating Logs'})  
    }

    },
    getBankList: async(req, res, next)=>{
        let data = req.body
        getBanks(data, (err, resp)=>{
            if(err) return err
            response = JSON.parse(resp);
            res.json({response: response})
        })
        
    },
    verifyBankAccountPaystack: async(req, res, next)=>{
        let data = req.body
        verifyBanks(data, (err, resp)=>{
            if(err) return err
            response = JSON.parse(resp);
            res.json({response: response})
        })
    },
    verifyBankAccountFlutter: async(req, res, next)=>{

    },
    createTransferReceipientPaystack: async(req, res, next)=>{
        const data = JSON.stringify(req.body)
        createTransferReceipient(data, (err, resp)=>{
            if(err) return err
            response = JSON.parse(resp);
            res.json({response: response})
        })
    },
    withdrawPaystack: async(req, res, next)=>{
        const data = JSON.stringify(req.body)
        initiateTransfer(data, (err, resp)=>{
                if(err) return err
                response = JSON.parse(resp);
                res.json({response: response})
        })
    },
    
    
}