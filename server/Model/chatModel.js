const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
    members: {
        type: Array,
        required: true
    },

    

    
   
    
});

const chat=mongoose.model('chat',chatSchema)
module.exports = chat