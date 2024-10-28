const mongoose = require('mongoose');
const conversationSchema = new mongoose.Schema({
    conversationId : {
        type: String,
    },
    senderId : {
        type: String,
    },
    text : {
        type: String,
    }
    

    
   
    
});

const conversation=mongoose.model('conversation',conversationSchema)
module.exports = conversation