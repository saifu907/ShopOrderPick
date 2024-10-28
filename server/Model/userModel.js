const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
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
    

    orderHistory: [{
        orderTime: String,
        cartItems: [{
            _id: mongoose.Schema.Types.ObjectId,
            label: String,
            price: Number,
            quantity: Number
        }]
    }]
   
    
});

const users=mongoose.model('users',userSchema)
module.exports = users