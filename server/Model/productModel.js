const mongoose= require('mongoose');

const productSchema = new mongoose.Schema({
    label:{
        type:String,
        required: true
    },
    caption:{
        type:String,
        required: true
    },
    productimage:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    shopid:{
        type:String,
        required: true
    }

    
})

const products= mongoose.model('products',productSchema);
module.exports = products