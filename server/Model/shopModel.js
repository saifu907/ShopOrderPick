const mongoose = require('mongoose');       
const shopSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    shopname:{
        type:String,
        required: true
    },
    shopaddress:{
        type:String,
        required: true
    },
    profileimage:{
        type:String,
        default:''
    },
    

    orders: [{
        customerId:mongoose.Schema.Types.ObjectId,
        orderTime: String,
        cartItems: [{
            productId: mongoose.Schema.Types.ObjectId,
            label: String,
            price: Number,
            quantity: Number
        }]
    }]
   
    
});

const shops=mongoose.model('shops',shopSchema)
module.exports = shops