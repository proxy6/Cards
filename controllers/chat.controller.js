// const { default: chatmessageModel } = require("../models/chat/chatmessage.model")
// const { default: chatroomModel } = require("../models/chat/chatroom.model")

const chatController = {
    initiateChat: async(req, res, next)=>{
        //find if chatroom exist
        let {roomId, type} = req.body
        let userId = req.params.id
        let connectedUsers = [roomId, userId]
       let room = await chatroomModel.find({
            id: roomId,
            type: "single"
        })
        if(room){
            //find chat messages
        let messages = await chatmessageModel.find({
                room: room._id
            })
        
            console.log(room.connectedUsers)
            res.status(200).json({success: 1, message: "Retrieving existing room data", data: message})
        }
        //start a new chatroom and  
        let chatroom = chatroomModel.create({
            type,
            chatInitiator: userId,
            connectedUsers,
        })
        await chatroom.save()
        .then(room=>{res.status(200).json({success: 1, message: "Created New chatroom", data: room})})
        .catch(e=>{res.status(500).json({success: 0, message: "Error Cretaing Room", data: e})})
    }
}
module.exports = chatController