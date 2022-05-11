const mongoose = require('mongoose')
const { MyCard, Industry, StoredCard } = require("../models/card.model")
const {User} = require('../models/user.model')
const qr = require('qrcode')
const makeValidation = require('@withvoid/make-validation')
let ITEMS_PER_PAGE = 10;
module.exports = {
    getCreateCardPage: async(req, res, next)=>{
      Industry.find({})
      .then(industry=>res.status(200).json({success: 1, message: industry}))
      .catch(e=>res.status(500).json({success: 0, message: e}))
    },
    createCard: async(req, res, next)=>{
        const data = req.body
        const userId = req.params.id
        if (req.files["logo"]){
        data["logo"] = req.files["logo"][0].filename;
        if (req.files["coverPic"])
        data["coverPic"] = req.files["coverPic"][0].filename;
        const {fullname, title, busName, address, bio, designType, website, status, logo, coverPic, country, state, city, industry, specialty} = data
    
       const result = makeValidation(types => {
            return {
              payload: req.body,
              checks: {
                fullname: { type: types.string, options: { empty: false } },
                title: { type: types.string, options: { empty: false } },
                busName: { type: types.string, options: { empty: false } },
                address: { type: types.string, options: { empty: false } },
                bio: { type: types.string, options: { empty: false } },
                designType: { type: types.string, options: { empty: false } },
                status: { type: types.string, options: { empty: false } },
                country: { type: types.string, options: { empty: false } },
                state: { type: types.string, options: { empty: false } },
                city: { type: types.string, options: { empty: false } },
                industry: { type: types.string, options: { empty: false } }
                // logo: { type: types.string, options: { empty: false } },
              }
            }
          })
          if (!result.success) {
            return res.status(400).json({ ...result })
          }
    try{
    const card = await MyCard.create({
      fullname, title, busName, 
      address, bio, website, designType, 
      status, userId, logo, coverPic, country, 
      state, city, industry, specialty
  })
  console.log(card)
  res.status(200).json({success: 1, message: "card created successfully", data: card})
  } catch(e){
    return res.status(500).json({
      success: 0, 
      message: "Error creating Cards", 
      data: e
  });
  }
}     
else {
    res.status(500).json({success: 1, message: "Error creating card", data: "You must upload a logo"})    
    }    
    },
    getUserCards: async(req, res, next)=>{
    const id = req.params.id
    await MyCard.find({
        userId: id
    })
    .then(card=> res.status(200).json({success: 1, message: "User Cards retrieval successful", data: card}))
    .catch(e=>res.status(500).json({success: 0, message: "Error retrieving card", data: e}))
    }, 
    getSingleCard: async(req, res, next)=>{
        const {id} = req.body
        await MyCard.findById(id)
        .then(card=>{
            res.status(200).json({success: 1, message: "Card retrieval successful", data: card})
        })
        .catch(e=> res.status(500).json({success: 0, message: "Error retrieving card", data: e}))
    },
    updateSingleCard: async(req, res, next)=>{
        const data = req.body
        const userId = req.params.id
        if (req.files["logo"])
        data["logo"] = req.files["logo"][0].filename;
        if (req.files["coverPic"])
        data["coverPic"] = req.files["coverPic"][0].filename;
        const {id, fullname, title, busName, address, bio, designType, website, status, logo, coverPic} = data
        let card = await MyCard.findById(id)
        card.fullname = fullname,
        card.title = title,
        card.busName = busName,  
        card.address = address, 
        card.bio = bio,  
        card.website = website, 
        card.designType = designType, 
        card.status = status, 
        card.userId = userId, 
        card.logo = logo, 
        card.coverPic = coverPic

       await card.save()
       .then(card=> res.status(200).json({success: 1, message: "User Card update successful", data: card}))
       .catch(e=>res.status(500).json({success: 0, message: "Error updating card", data: e}))

    },
    deleteSingleCard: async(req, res, next)=>{
        let {id} = req.body
        await MyCard.findByIdAndDelete(id)
        .then(card=>{res.status(200).json({success: 1, message: "Deleted Card", data: card })})
        .catch(e=>{res.status(500).json({success: 0, message: "Error deleting card"})})
    },
    getShareQRCode: (req, res, next)=>{
        let cardId = req.body
        let link = `http://bixxcard.herokuapp.com/card/${cardId}`
        qr.toDataURL(link, (err, url)=>{
            if(err) res.status(500).json({success: 0, data: "Error Generating QRcode"})
            res.status(500).json({success: 1, message: "Card URL Generated", data: url})
        })


    },
    getCards: async (req, res, next)=>{
        const page = +req.query.page
        const offset_eqn = ((page - 1) * ITEMS_PER_PAGE )
        // const sermons = await Sermon.findAll({
        //     offset: offset_eqn,
        //     limit: ITEMS_PER_PAGE,
        // })
        await MyCard.find({status: "Public"}).skip(offset_eqn).limit(ITEMS_PER_PAGE).exec()
        .then(card=> {
           res.status(200).json({success: 1, message: "Cards retrieval successful", data: card})
        })
        
    .catch(e=> res.json(500).json({success: 0, message: "Error retrieving cards", data: e}))

    },
    searchCards: async(req, res, next)=>{
      let {data} = req.body
      MyCard.find({
        
        industry:{ $regex: data, $options: "i"}
        
      })
      .then(industry=>res.status(200).json({success: 1, message: industry}))
      .catch(e=>res.status(500).json({success: 0, message: e}))
      // MyCard.aggregate([{
      //   $match:{
      //     $or:[
      //       {
      //         industry:{ $regex: data, $options: "i"}
      //       },
      //       // {
      //       //   busName: {$regex: q, $options: 'i'}
      //       // }, 
      //       // {
      //       //   title: {$regex: q, $options: 'i'}
      //       // },
      //       // {
      //       //   specialty: {$regex: q, $options: 'i'}
      //       // }
      //     ]
      //   }
        
      // }])
      // .then(industry=>res.status(200).json({success: 1, message: industry}))
      // .catch(e=>res.status(500).json({success: 0, message: e}))
    },
    saveCard: async(req, res, next)=>{
      let {cardId} = req.body
      let card = mongoose.Types.ObjectId(cardId)
      let userId = req.params.userId
      User.find({_id: userId, 'saved_cards': {$in: [card]}})
      .then(async data=>{
        console.log(data)
        if(data.length>0){
          //remove card
          await User.updateOne({
            _id: userId},
            {
              $pull: {saved_cards: {$in:[cardId]}}
            }
            )
          res.status(200).json({success: 1, message: "Card Removed",})
        }
        else{
        await User.updateOne({
            _id: userId},
            {
              $push: {saved_cards:[cardId]}
            }
            )
            res.status(200).json({success: 1, message: "Card Added to Saved Cards"})
          }
       
      })
      // await User.updateOne({
      //   _id: userId},
      //   {
      //     $push: {saved_cards:[cardId]}
      //   }
      //   )
        // .then(data=>res.status(200).json({success: 1, message: "Card Added to Saved Cards", data: data}))
        .catch(e=>res.status(500).json({success: 0, message: e}))

    },
    getUserSavedCards: async(req, res, next)=>{
      let userId= req.params.userId
      // var saved_cards = []
     await User.findById(userId).populate('saved_cards')
     .then( data=>{
      console.log(data)
      // data.saved_cards.forEach(async data=>{
      //   console.log(data)
      // await MyCard.findById(data)
      // .then(card => {
      //   saved_cards.push(card)
      // }) 
      
      // })
      // setTimeout(() => {res.status(200).json({success: 1, message: saved_cards }); }, 10000);
     
      // for (let i = 0; i = data.saved_cards.length; i++){
      //   saved_cards.push(data.saved_cards[i]) 
      // }
      res.status(200).json({success: 1, message: data })
     
     })
    //  if(user){
      
    //  }
    .catch(e=>res.status(500).json({success: 0, message: e}))

    },
    createStoredCard: async (req, res, next)=>{
      const data = req.body
      const userId = req.params.userId
      if (req.files["logo"])
      data["logo"] = req.files["logo"][0].filename;
      if (req.files["coverPic"])
      data["coverPic"] = req.files["coverPic"][0].filename;
      const {fullname, title, busName, address, bio, designType, website, logo, coverPic, country, state, city, industry, specialty, phone, hint} = data
  
     const result = makeValidation(types => {
          return {
            payload: req.body,
            checks: {
              fullname: { type: types.string, options: { empty: false } },
              title: { type: types.string, options: { empty: false } },
              busName: { type: types.string, options: { empty: false } },
              // address: { type: types.string, options: { empty: false } },
              // bio: { type: types.string, options: { empty: false } },
              designType: { type: types.string, options: { empty: false } },
              // status: { type: types.string, options: { empty: false } },
              // country: { type: types.string, options: { empty: false } },
              // state: { type: types.string, options: { empty: false } },
              // city: { type: types.string, options: { empty: false } },
              // industry: { type: types.string, options: { empty: false } }
              // logo: { type: types.string, options: { empty: false } },
            }
          }
        })
        if (!result.success) {
          return res.status(400).json({ ...result })
        }

      //   if (req.file){
      //   newLogo["image"] = req.file.filename;
      //   if (req.files["logo"])
      //   newLogo["logo"] = req.files["logo"][0].filename;
      //   if (req.files["coverPic"])
      //   newLogo["coverPic"] = req.files["coverPic"][0].filename;
 const card = new StoredCard({
      fullname, title, busName, address, bio, website, designType, userId, logo, coverPic, country, state, city, industry, specialty, phone, hint
  })
 await card.save()
 .then(card=>{
     res.status(200).json({success: 1, message: "card created successfully", data: card})
 })
 .catch(e=>{res.status(500).json({success: 1, message: "Error creating card", data: e})}) 
    },
    getAllStoredCards: async(req, res, next)=>{
      const page = +req.query.page
      const offset_eqn = ((page - 1) * ITEMS_PER_PAGE )
      let userId = req.params.userId
      await StoredCard.find({userId: userId}).skip(offset_eqn).limit(ITEMS_PER_PAGE).exec()
      .then(card=>res.status(200).json({success: 1, message: "Stored Cards Retrieved", data: card}))
      .catch(e=> res.status(500).json({success: 0, message: "Error Retirving Cards", data: e}))
    },
    getStoredCardDetails: async (req, res, next)=>{
      let {cardId} = req.body
      await StoredCard.findById(cardId)
      .then(card=>res.status(200).json({success: 1, message: "Stored Card Retrieved", data: card}))
      .catch(e=> res.status(500).json({success: 0, message: "Error Retirving Card", data: e}))
    },
    UpdateStoredCard: async (req, res, next)=>{
      let data = req.body
      let userId = req.params.userId
      if (req.files["logo"])
      data["logo"] = req.files["logo"][0].filename;
      if (req.files["coverPic"])
      data["coverPic"] = req.files["coverPic"][0].filename;
      const {fullname, title, busName, address, bio, designType, website, logo, coverPic, country, state, city, industry, specialty, phone, hint, cardId} = data
      StoredCard.updateOne({_id: cardId},
        {
          fullname, title, busName, address, bio, website, designType, userId, logo, coverPic, country, state, city, industry, specialty, phone, hint
        })
        .then(card=>{
          if(card.matchedCount == 0)res.status(200).json({success: 1, message: "cardId not found"})
          res.status(200).json({success: 1, message: "card updated successfully", data: card})
      })
      .catch(e=>{res.status(500).json({success: 1, message: "Error updating card", data: e})})
    },
    deleteStoredCard: async(req, res, next)=>{
      let {cardId} = req.body
      await StoredCard.findByIdAndDelete(cardId)
      .then(card=>{res.status(200).json({success: 1, Message: "Deleted Stored Card", data: card})})
      .catch(e=>{res.status(500).json({success: 0, message: "Error deleting card"})})
    },
  addIndustry: async(req, res, next)=>{
        let industryType = [
              {
                  type: "Advertising Services",
                  iso: "Advert",
              },
              {
                  type: "Accounting",
                  iso: "Accounting",
              },
              {
                  type: "Appliances, Electrical, and Electronics Manufacturing",
                  iso: "Appliances Electrical",
              },
              {
                 
                  type: "Architecture and Planning",
                  iso: "Architecture",
              },
              {
                  type: "Armed Forces",
                  iso: "Armed Forces",
              },
              {
                  type: "Airlines and Aviation",
                  iso: "Airlines & Aviation",
              },
              {
                  type: "Banking",
                  iso: "Banking",
              },
              {
                  type: "Business Consulting and Services",
                  iso: "Business Consulting and Services",
              },
              {
                 
                  type: "Broadcast Media Production and Distribution",
                  iso: "Broadcast Media",
              },
              {
                  type: "Business Skills Training",
                  iso: "Business Skills Training",
              },
              {
                  type: "Book and Periodical Publishing",
                  iso: "Book and Periodical Publishing",
              },
              {
                  type: "Book and Periodical Publishing",
                  iso: "Book and Periodical Publishing",
              },
              {
                type: "Book and Periodical Publishing",
                iso: "Book and Periodical Publishing",
            }
          ]

    Industry.collection.insertMany(industryType, function(err, industry){
      if(err){
        res.status(500).json({success: 0, message: e})
      }
      res.status(200).json({success: 1, message: industry})
    })
 
    
  },
  getIndustry: async(req, res, next)=>{
    await Industry.find()
    .then(industry=>res.status(200).json({success: 1, message: industry}))
    .catch(e=>res.status(500).json({success: 0, message: e}))

    
  },
  searchIndustry: async(req, res, next)=>{
    let {data} = req.body
    Industry.find({
      type:{ $regex: data, $options: "i"}
    })
    .then(industry=>res.status(200).json({success: 1, message: industry}))
    .catch(e=>res.status(500).json({success: 0, message: e}))
  },
   

}