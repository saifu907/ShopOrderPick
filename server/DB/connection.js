const mongoose = require('mongoose')
const connectionstring=process.env.DATABASE

mongoose.connect(connectionstring).then(()=>{
    console.log("Connected to database pfserver");
}).catch((err)=>{
    console.log(`Error connecting to database pserver: ${err}`);
})