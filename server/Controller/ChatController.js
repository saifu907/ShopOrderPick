const chat = require("../Model/chatModel");
const conversation = require("../Model/messageModel");
const shops = require("../Model/shopModel");
const users = require("../Model/userModel");

exports.createChats=async(req,res)=>{
    
    
    const {senderId,reciverId}=req.body
    const existingChat = await chat.findOne({
        members: { $all: [senderId, reciverId] } 
    });
    if (existingChat) {
        return res.status(200).json(existingChat);
    }
    
    
    const newConversation = new chat({
        members:[senderId,reciverId]
    })
    
    try{
        const newChat = await newConversation.save()
        res.status(200).json(newChat)
    
    }catch(e){res.status(401).json(e)}
    
}

exports.getAllUserChats=async(req,res)=>{
    const userId=req.payload;
    const isShopUser = await shops.findOne({ _id: userId });
    
    
    
        
    try{
        const Chats = await chat.find({
            members: {$in:[req.payload]}
        })
        const friendsId = Chats.map(chat => {
            return chat.members.find(member => member !== userId);
          })
          let friendsProfile = []
        if (isShopUser) {


            friendsProfile = await Promise.all(
                friendsId.map(async (friendId) => {                    
                    const friendProfile = await users.findOne({ _id: friendId })// if user id is in user run this... else in shop
                    return friendProfile;
                })
            );

            
        }else{
             friendsProfile = await Promise.all(
            friendsId.map(async (friendId) => {

                
                const friendProfile = await shops.findOne({ _id: friendId })// if user id is in user run this... else in shop
                return friendProfile;
            })
        );

        }
        
        res.status(200).json({Chats,userId,friendsProfile});
    
    }catch(e){res.status(401).json(e)}
    
}

exports.createMessage=async(req,res)=>{
    
    
    const message = req.body
    
    
    const newMessage = new conversation(message)

    
    try{
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    
    }catch(e){res.status(401).json(e)}
    
}
exports.getMessage=async(req,res)=>{
    
    
    try{
        const message = await conversation.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(message)
    
    }catch(e){res.status(401).json(e)}
    
}






