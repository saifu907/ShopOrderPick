const mongoose = require('mongoose');
const ordersSchema = new mongoose.Schema({
    customerid:{
        type:String,
        required: true
    },
    shopid:{
        type:String,
        required: true,
    },
    productid:{
        type:String,
        required: true,
    },
    orderTime:{
        type:String,
        required: true,
    },
    label:{
        type:String,
        required: true,
    },
    price:{
        type:Number,
        required: true,
    },
    quantity:{
        type:Number,
        required: true,
    },
    status: {
        type: String,
        default: 'pending', 
      },
    
    
    

            
   
    
}); 







const orders=mongoose.model('orders',ordersSchema)
module.exports = orders