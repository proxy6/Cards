const {BusinessList} = require('../models/busList.model')
const makeValidation = require('@withvoid/make-validation')
const { User } = require('../models/user.model')
const { emailNotification, phoneAndPushNotification } = require('../utils/notifications')
module.exports = {
    createBusList: async(req, res, next)=>{
        const posterId = req.params.posterId
        const {busName, email, services, address, phone} = req.body
        const result = makeValidation(types => {
            return {
              payload: req.body,
              checks: {
                busName: { type: types.string, options: { empty: false } },
                address: { type: types.string, options: { empty: false } },
                email: { type: types.string, options: { empty: false } },
                services: { type: types.string, options: { empty: false } },
                phone: { type: types.string, options: { empty: false } }
              }
            }
        });

        if (!result.success) {
            return res.status(400).json({ ...result })
        }

        try {
            const business = await BusinessList.create({
                busName, 
                address, 
                services, 
                phone, 
                email, 
                posterId
            });
            
            const user = await User.findOne({ email });
            
            const data = {
                email,
                title: 'Your Business Was Listed on BossKard',
                message: `Your Business ${busName} was Listed on BossKad. Click on this link to approve this business`,
                ...(user && {
                    user_id: user._id,
                    ptoken: user.phonetoken
                })
            };

            if(user) {
                await phoneAndPushNotification(data);
            } else {
                await emailNotification(data);
            }

            return res.status(200).json({success: 1, message: "Business created successfully", data: business})
        } catch(e) {
            return res.status(500).json({
                success: 0, 
                message: "Error creating Business", 
                data: e
            });
        }
      
    },
    myBusList: async (req, res, next)=>{
        const id = req.params.id
        BusinessList.find({posterId: id})
        .then(business=>{
            res.status(200).json({success: 1, message: "Business retrieved successfully", data: business})
        })
        .catch(e=>{res.status(500).json({success: 1, message: "Error retrieving Business", data: e})})   
    },  
    resendApprovalLink: async(req, res, next)=>{

    },
    getAllBusiness: async(req, res, next)=>{
       BusinessList.find({approved: 0}) 
       .then(business=>{
        res.status(200).json({success: 1, message: "Business retrieved successfully", data: business})
    })
    .catch(e=>{res.status(500).json({success: 1, message: "Error retrieving Business", data: e})})   
     },  
}