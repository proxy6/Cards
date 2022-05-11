const mongoose = require('mongoose')

const busList = new mongoose.Schema({
    busName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    services :{
        type: String,
        required: false
    },
    address :{
        type: String,
        required: false
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    posterId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    approved:{
        type: Boolean,
        default:0
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
busList.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

const BusinessList = mongoose.model('BusinessList', busList)
exports.BusinessList = BusinessList

