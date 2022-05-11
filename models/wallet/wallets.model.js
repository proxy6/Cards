const mongoose = require('mongoose')
const walletSchema = new mongoose.Schema({
    wallet_name:{
        type: String,
        required: true
    },
    wallet_currency:{
        type: String,
        required: true,
    },
    wallet_image:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    wallet_rate:{
        type: Number,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now
    }
})

// Sets the created_at parameter equal to the current time
walletSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

const Wallet = mongoose.model('Wallet', walletSchema)
exports.Wallet = Wallet