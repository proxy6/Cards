const mongoose = require('mongoose')
const userWalletSchema = new mongoose.Schema({
    walletName:{
        type: String,
        required: true
    },
    walletId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallet",
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount:{
        type: Number,
        default: 0.00
    },
    currency:{
        type: String,
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
userWalletSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

const UserWallet = mongoose.model('UserWallet', userWalletSchema)
exports.UserWallet = UserWallet