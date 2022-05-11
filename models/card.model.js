const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true, 
    },
    busName:{
        type: String,
        required: true,
    },
    industry:{
        type: String,
        required: true,
    },
    specialty:{
        type: String,
        required: false,
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
    dialcode:{
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: false
    },
    logo:{
        type: String,
        required: true
    },
    coverPic:{
        type: String,
        required: false
    },
    status:{
        type: String,
        required: true,
        default: "Public"
    },
    designType:{
        type: String,
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
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
cardSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

const industrySchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    iso: {
        type: String,
        required: true, 
    },
})
const storedCardSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true, 
    },
    busName:{
        type: String,
        required: true,
    },
    industry:{
        type: String,
        required: false,
    },
    specialty:{
        type: String,
        required: false,
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
    address: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false,
    },
    website: {
        type: String,
        required: false
    },
    logo:{
        type: String,
        required: false
    },
    coverPic:{
        type: String,
        required: false
    },
    status:{
        type: String,
        default: "Private"
    },
    designType:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: false
    },
    hint:{
        type: String,
        required: false
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
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
storedCardSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

const StoredCard = mongoose.model('StoredCard', storedCardSchema)
const Industry = mongoose.model('Industry', industrySchema)
const MyCard = mongoose.model('MyCard', cardSchema);

exports.StoredCard = StoredCard
exports.MyCard = MyCard;
exports.Industry = Industry