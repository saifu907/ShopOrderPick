


require('dotenv').config()

const exp=require('express')
const cors=require('cors')
const router=require('./Router/router')
require('./DB/connection')
const io=require('socket.io')(8900,{
    cors:{
        origin: 'http://localhost:5173',
    },
})

const pserver=exp()

pserver.use(cors())

pserver.use(exp.json())
pserver.use(router)
pserver.use('/uploads',exp.static('./uploads'))



const PORT = process.env.PORT || 3000;
pserver.listen(PORT,()=>{
    console.log(`pf:listening. on port:${PORT}`);
})

let users=[]
const addUser = (userId,socketId) => {
    if(userId!=''){
        
        
    !users.some((userId)=>users.userId === userId)&&
    users.push({userId,socketId});
    }

}
const getUser=(userId)=>{ 
    return users.find(user=>user.userId===userId)
}
io.on("connection",(socket)=>{
    socket.on("addUser",(userId)=>{           
        addUser(userId,socket.id);
        console.log(users);
        io.emit("getUsers",users)
    })
    socket.on("disconnect",()=>{
        users= users.filter(user=>user.socketId !==socket.id)
        io.emit("getUsers",users)
    })
    socket.on("sendMessage",({senderId,text,receiverId})=>{
        
        const user= getUser(receiverId)
        
        if(user){
        io.to(user.socketId).emit("getMessage",{
            senderId,
            text
        })
    }
        
    })

    
})






