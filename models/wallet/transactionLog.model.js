const mongoose = require('mongoose')
const transactionLogSchema = new mongoose.Schema({
    amount_inflow:{
        type: Number,
        required: false
    },
    amount_outflow:{
        type: Number,
        required: false
    },
    tx_ref:{
        type: String,
        required: true,
    },
    currency:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: {
        type: String,
        required: false
    },
    transaction_type: {
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    },
})
    transactionLogSchema.pre('save', function(next){
        now = new Date()
        if(!this.created_at){
            this.created_at = now
        }
        next();
    })

    const TrasactionLogs = mongoose.model('TransactionLogs', transactionLogSchema)
    exports.TrasactionLogs = TrasactionLogs