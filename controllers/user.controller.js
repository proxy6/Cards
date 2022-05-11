const makeValidation = require('@withvoid/make-validation')
const { User } = require('../models/user.model')
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const config = require('../utils/config')
const jwt = require('jsonwebtoken');
const {Country} = require('country-state-city-js')
const { State } = require('country-state-city-js')
const { City } = require('country-state-city-js')
const { emailNotification } = require('../utils/notifications');

const userController = {
  getAll: (req, res, next) => {
    console.log(req.information)
    return res.status(200).json({ success: true, message: 'Job well done' })
  },
  getById: (req, res, next) => {
    const { id } = req.params
    return res
      .status(200)
      .json({ success: true, message: `Job very well done ${id}` })
  },
  checkPhone: async (req, res, next)=>{
      const {phone} = req.body
      
      let findUser = await User.findOne({phone:phone})
      if(!findUser){
        const user = new User({
          phone,
      })
        const newUser = await user.save()
        .then(data=>res.status(200).json({success: 1, data: data}))
        .catch(err=>{ res.status(500).json({success: 0, data: err})})
      }
     else{
      res.status(200).json({success: 1, data: findUser})
    }
    },
  getCountryList: (req, res, next)=>{
    const countries = Country({states: true})
    let country = []
    country.states = []
   countries.forEach(count=>{
      country.push({
        name:count.name,
        code: count.code,
        dialcode: count.dialcode,
        currency: count.currency
      })
    })
    res.status(200).json({success: 1, countries: country})
  },
  getStatesList: async (req, res, next)=>{
    let {country} = req.body
    const states = State(country)
    res.status(200).json({success: 1, states: states})
  },
  getCitiesList: (req, res, next)=>{
    const {country, state} = req.body
    const cities = City(country, state)
    res.status(200).json({success: 1, states: cities})
  },
  createUser: async (req, res, next) => {
    const { fname, mname, lname, email, phone, pass, id, verify_id, country, state, city } = req.body
    // confirmPassword(pass, pass2) 
    const result = makeValidation(types => {
    
      return {
        payload: req.body,
        checks: {
          fname: { type: types.string, options: { empty: false } },
          lname: { type: types.string, options: { empty: false } },
          email: { type: types.string, options: { empty: false } },
          pass: { type: types.string, options: { empty: false } },
          // country: { type: types.string, options: { empty: false } },
          // state: { type: types.string, options: { empty: false } },
          // city: { type: types.string, options: { empty: false } },
          verify_id: { type: types.string, options: { empty: false } },

          
        }
      }
    })
    if (!result.success) {
      return res.status(400).json({ ...result })
    }
  
    const salt = genSaltSync(10);
    var password = hashSync(pass, salt);
    
    // Loop through countries API to get currency, and dialcode 
    const countries = Country({states: true})
    const data = {}
    await countries.forEach(count=>{
      if(count.name == country){
        data.currency = count.currency.code
        data.currency_symbol = count.currency.symbol
        data.dialcode = count.dialcode
      }  
     })
    try{
    await User.findById(id)
    .then(async user=>{
      if(user.email != email){
        await User.updateOne({_id: id},{
          fname: fname,
          lname: lname,
          email: email,
          password: password,
          country: country,
          state:state, 
          city: city,
          otp: verify_id,
          currency:  data.currency,
          currency_symbol: data.currency_symbol,
          dialcode: data.dialcode
        })
         let userId = user._id
          await createQtajWallet(userId, function(err, res){
            if(err) console.log(err)
            console.log('Success')
            return
          })
          await createUsdWallet(userId, function(err, res){
            if(err) console.log(err)
            console.log('Success')
            return
          })
          await createTajiWallet(userId, function(err, res){
            if(err) console.log(err)
            console.log('Success')
            return
          })
          res.status(200).json({success: 1, message: 'User Created Successfully', data: user })
      }else{
        res.status(200).json({success: 0, message: 'Email Exist' })
      }
    })
    .catch(e=> res.status(200).json({success: 0, message: "Email Exist"}))
   
}catch(e){
  res.status(500).json({success: 0, data:e})
}

  },
  login: async (req, res, next)=>{
      const{email, pass} = req.body
      await User.findOne({email: email})
      .then(user=> {
        if (!user) return res.status(404).send('User Does Not Exist');

        var passwordIsValid = compareSync(pass, user.password);
        if (!passwordIsValid) return res.status(401).json({success: 0, message: "Email or Password Incorrect"});
        if(user.confirm_email == false){ //send email confirmation otp
          //generate otp
          let data = {}
          let otp = Math.floor(100013 + Math.random() * 29000);
          data.new_otp = otp;
          //store otp in database
          User.findById(user._id)
          .then(async user=>{
            user.otp = data.new_otp
            console.log(user)
            await user.save()
            //send and save and send email details
          data.email = email
          data.title = `Confirm your Email`
          data.message = `Please confirm your email address. Use the otp ${data.new_otp} to verify the request `
          
          emailNotification(data, (err, resp)=>{
            if(err) res.status(500).json({ success: 0, message:err})
        })
        res.status(200).json({success: 1,  message: "Email Not confirmed, Otp has been sent to email"})
        })
        .catch(e=>{return res.status(500).send("Genereting Otp failed")})
        }
        else{
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 432000 // expires in 24 hours
        });
        res.status(200).json({
            success: 1,  message: "login successfully", auth:true, token: token,  data: user})
        }
        
    })
        
      .catch(err=>res.status(500).json({success: 0, data: err}))

      
  },
  verifyLogin: async (req, res, next)=>{
    const {otp, email} = req.body
    await User.findOne({email: email})
    .then(async user=>{
      if(user.otp == otp){
        user.confirm_email = true
        await user.save()
         res.status(200).json({ success: 1, data: user, message: 'Login successful'})
        }
      else{res.status(500).json({ success: 0, message:'Otp Incorrect'})}
    })
    .catch(e=>{res.status(500).json({ success: 0, message:e})})
  },
  forgetPass: async(req, res, next)=>{
      const {email} = req.body
      await User.findOne({email: email})
      .then(user=>{
        if(!user)res.status(200).json({success: 1,  message: "User does not exist"})
         else{
           //generate otp
         let data = {}
         let otp = Math.floor(100013 + Math.random() * 29000);
         data.new_otp = otp;
         //store otp in database
         User.findById(user._id)
         .then(async user=>{
           user.otp = data.new_otp
           await user.save();
           //send and save and send email details
         data.email = email
         data.title = `Reset your Password`
         data.message = `Use the otp ${data.new_otp} to verify the request `
         
         emailNotification(data, (err, resp)=>{
           if(err) res.status(500).json({ success: 0, message:err})
       })
       res.status(200).json({success: 1,  message: "Otp has been sent to email"})
       })
       .catch(e=>{return res.status(500).send("Genereting Otp failed")})
      }
      })
      .catch(e=>res.status(200).json({ success: true, message:e }))
  },
  forgetPassVerify: async(req, res, next)=>{
    const {otp, email} = req.body
    await User.findOne({email: email})
    .then(async user=>{
      if(user.otp == otp){
         res.status(200).json({ success: 1, id: user._id, message: 'Otp Confirmed, Set New Passwords'})
        }
      else{res.status(500).json({ success: 0, message:'Otp Incorrect'})}
    })
    .catch(e=>{res.status(500).json({ success: 0, message:e})})
  },
  updatePassword:async (req, res, next)=>{
    const {pass, id} = req.body
    await User.findById(id)
    .then(async user=>{
      if(!user) res.status(200).json({success:1, message:"User does not exist"})
     else{
      let salt = genSaltSync(10)
      let password = hashSync(pass, salt)
      user.password = password
      await user.save()
      res.status(200).json({success:1, message:"Password Changed Successfully"})
     }
    })
    .catch(e=>{res.status(500).json({success:0, message:e})})
  },
  updateUser: (req, res, next) => {
    const { id } = req.params
    return res
      .status(200)
      .json({ success: true, message: `Updated user id: ${id}` })
  },
  deleteUser: (req, res, next) => {
    const { id } = req.params
    return res
      .status(200)
      .json({ success: true, message: `Delete user id: ${id}` })
  },

}


module.exports = userController
