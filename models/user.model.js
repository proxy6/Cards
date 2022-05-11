const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: false
    },
    mname:{
        type: String,
        required: false
    },
    lname:{
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false, 
        index: { unique: true, sparse: true }
    },
    phone:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false,
        default: "User"
    },
    otp:{
        type: String,
        required: false
    },
    phonetoken:{
        type: String,
        required: false
    },
    country:{
        type: String,
        required: false
    },
    state:{
        type: String,
        required: false
    },
    city:{
        type: String,
        required: false
    },
    currency:{
        type: String,
        required: false
    },
    currency_symbol:{
        type: String,
        required: false
    },
    dialcode:{
        type: String,
        required: false
    },
    address:{
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    },
    profilepic:{
        type: String,
        required: false
    },
    bio:{
        type: String,
        required: false
    },
    confirm_email:{
        type: Boolean,
        default: false
    },
    phonetoken:{
        types: String,
        required: false
    },
    saved_cards:[
    { 
        type : mongoose.Schema.Types.ObjectId,
        ref : 'MyCard' 
    }
    ],
    // saved_cards:[
    //     {
    //         type: String,
    //         required: false
    //     }
    // ],
    boards:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Board",
            required: false
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
userSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

const User = mongoose.model('User', userSchema);

function confirmPassword(pass, pass2) {
    if (pass != pass2) {
        return 'Password does not match';
    } else {
        return true;
    }
}

exports.User = User;
exports.confirmPassword = confirmPassword;