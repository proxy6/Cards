const { default: mongoose } = require("mongoose");

const chatroomSchema = new mongoose.Schema({
    type:{
        type: String,
        required: true
    },
    chatInitiator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    connectedUsers: {
        type: Array,
        required: true
    },
   
})
const ChatRoom = mongoose.model("ChatRoom", chatroomSchema);
module.exports = ChatRoom