const mongoose = require('mongoose')

const boardSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: false
    },
    media: {
        type: String,
        required: false
    },
    views :{
        type: Number,
        default: 0
    },
    commentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
});
// Sets the created_at parameter equal to the current time
boardSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

const commentSchema = new mongoose.Schema({
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board"
    },
    comment:[
        {
            userId:String,
            message:String
    
        }
    ], 
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
});
// Sets the created_at parameter equal to the current time
commentSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

const Comment = mongoose.model("Comment", commentSchema)
const Board = mongoose.model("Board", boardSchema)
exports.Board = Board
exports.Comment = Comment