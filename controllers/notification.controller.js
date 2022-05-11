const {Notification} = require("../models/notification.model")

module.exports = {
    getAllNotification: async(req, res, next)=>{
        const user_id = req.params.id
        console.log(user_id)
        try{
            let notification = await Notification.find({user_id})
            res.status(200).json({sucees: 1, message: "Notification retrieved successfully", data: notification})
        }catch(e){
            res.status(500).json({sucees: 0, message: "Error retrieving Notification", data: e})
        }
    },
    getSingleNotification: async (req, res, next)=>{
        let {id} = req.body
        try{
            let notification = await Notification.findOne({_id: id})
           if(notification){
               await Notification.updateOne({_id: id}, {status: 1})
                res.status(200).json({success: 1, message: "Notification retrieved", data: notification})   
                } else{
                    res.status(200).json({success: 1, message: "Notification Not Found",})   
                }
            } catch(e){
            res.status(500).json({success: 0, message: "Error retrieving Notification", data: e}) 
            } 
    },
    deleteNotification: async (req, res, next)=>{
        let {id} = req.body
        try{
            await Notification.findByIdAndDelete({_id: id})
            res.status(200).json({success: 1, message: "Notification Deleted Successfully"})
        } catch(e){
            res.status(500).json({success: 0, message: "Error deleting Nofication"})
        }
    },
    toggleReadStatus: async(req, res, next)=>{
        let {id} =  req.body
        try{
            await Notification.findOne({_id: id})
            .then(async notif=>{
                if(notif.status == 1){
                    await Notification.updateOne({_id: id}, {status: 0})
                     return res.status(200).json({success: 1, message: "Notification Marked as Unread"})
                } else if(notif.status == 0)
                    await Notification.updateOne({_id: id}, {status: 1})
                    res.status(200).json({success: 1, message: "Notification Marked as Read"})
            })   
        }catch(e){
            res.status(500).json({success: 0, message: "Error Toggling Read Status Notification"})
        }
    },

}