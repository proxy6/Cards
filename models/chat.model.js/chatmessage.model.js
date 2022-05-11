const { default: mongoose } = require("mongoose");

const chatmessageSchema = new mongoose.Schema({
    room:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatRoom",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
})
const ChatMessage = mongoose.model("ChatMessage", chatmessageSchema  );
module.exports = ChatMessage