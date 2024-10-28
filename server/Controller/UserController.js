const orders = require('../Model/orderModel')
const shops = require('../Model/shopModel')
const users =require('../Model/userModel')
const jwt=require('jsonwebtoken')
const cloudinary = require('cloudinary').v2;

exports.register =async (req,res)=>{
    const {username,email,password} = req.body
    try{
        const existingUser =await users.findOne({
            $or: [{ email }, { username }],
          })
          const existingShop =await shops.findOne({
            $or: [{ email }, { username }],
          })
        if (existingUser){
            res.status(406).json('user already exists')
        }else{
            const newUser = new users({username, email, password})
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(e){
        res.status(401).json()
    }

    
}
exports.shopRegister =async (req,res)=>{
    const {username,email,password,shopname,shopaddress} = req.body
    try{
        const existingUser =await users.findOne({
            $or: [{ email }, { username }],
          })
          const existingShop =await shops.findOne({
            $or: [{ email }, { username }],
          })
        if (existingUser||existingShop){
            res.status(406).json('user already exists')
        }else{
            const newUser = new shops({username, email, password,shopname,shopaddress})
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(e){
        res.status(401).json()
    }

    
}




exports.login =async (req,res)=>{
    const {emailuser,password} = req.body
    try{
        const existingUser = await users.findOne({
            $or: [
              { email: emailuser,password },
              { username: emailuser,password }
            ]
          })
          const existingShop = await shops.findOne({
            $or: [
              { email: emailuser,password },
              { username: emailuser,password }
            ]
          })

        if (existingUser){
            
            const token=jwt.sign({userId:existingUser._id},process.env.JWT_SECRET)
            res.status(200).json({existingUser,token});

        }else if(existingShop){
            
            const token=jwt.sign({userId:existingShop._id},process.env.JWT_SECRET)
            res.status(200).json({existingShop,token});

        }
        else{
            
            res.status(406).json('invalid user/email/password')
        }
    }catch(e){
        res.status(401).json(e)
    }

    
}

exports.addOrderHistory = async (req, res) => {
    
    const {cartItems}=req.body
    const userId=req.payload
     
    

    try {
        const order=
        cartItems.map(item => ({
            customerid: userId,
            orderTime: item.orderTime,
            shopid: item.shopid,
            
                productid: item.productId,
                label: item.label,
                price: item.price,
                quantity: item.quantity
            
        }));

        const neworders = await orders.insertMany(order);
        
       
     
        res.status(200).json(neworders)

      
    } catch (e) {
        res.status(500).json(e);
    }
}


exports.orders=async(req,res)=>{
    userId=req.payload
    try{
        const userData = await orders.find({customerid:userId})
        res.status(200).json(userData)


    }catch(e){
        res.status(401).json(e)
    }

}
exports.shopOrders=async(req,res)=>{
    shopId=req.payload
    try{
        const shopData = await orders.find({shopid:shopId})
        res.status(200).json(shopData)


    }catch(e){
        res.status(401).json(e)
    }

}


exports.customerdata=async(req,res)=>{
    const {id}=req.body
    try{
        const customerDatas = await users.find({id:id})
        res.status(200).json(customerDatas)
        

    }catch(e){
        res.status(401).json(e)
    }
}

exports.updateStatus=async(req,res)=>{
    const {id,updateStatus}=req.body
    try{
        const updateOrder=await orders.findByIdAndUpdate(
            id,{status:updateStatus},
            {new:true}
        )
        if (!updateOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(updateOrder)
    
        

    }catch(e){res.status(401).json(e)}

    
    
}



exports.getshops=async(req,res)=>{
    const searchKey=req.query.search    
    query={
        shopname:{$regex:searchKey,$options:'i'}

    }
    
    try{
    const shopsdata = await shops.find(query);
    
    res.status(200).json(shopsdata)
    }catch(e){res.status(401).json(e)}
    
}

exports.getshopprofile=async(req,res)=>{
    const shopId=req.payload
    
    try{
    const shopsdata = await shops.findById(shopId);
    console.log(shopsdata);
    
    res.status(200).json(shopsdata)
    

    }catch(e){res.status(401).json(e)}


}


exports.editshopprofile = async (req, res) => {
    const { username, shopname, shopaddress } = req.body;
    const shopId = req.payload; // Assuming payload is correctly set with shop ID
    let updateData = { username, shopname, shopaddress };
    
    try {
        const existingUser = await users.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
       
        if (req.file) {
            const result = cloudinary.uploader.upload_stream(
                
                {  
                    folder: 'shop_profiles' },
                async (error, result) => {
                    if (error) {
                        return res.status(400).json({ message: 'Image upload failed' });
                    }
                    // Use the secure URL of the uploaded image
                    updateData.profileimage = result.secure_url;
                    console.log(updateData);
                    
                    const shopsdata = await shops.findByIdAndUpdate(
                        shopId,
                        updateData,
                        { new: true }
                      )
                      if (!shopsdata) {
                        return res.status(404).json('Shop not found');
                      }
                      res.status(200).json('Shop profile updated');

                }
            );
            result.end(req.file.buffer); // Send the buffer to Cloudinary
        }else {
            // If no file uploaded, proceed to update the shop without the image
            
            // Update the shop data in the database
            const shopsdata = await shops.findByIdAndUpdate(
                shopId,
                updateData,
                { new: true }
            );
            
            
            if (!shopsdata) {
                return res.status(404).json('Shop not found');
            }
            
            res.status(200).json('Shop profile updated successfully');
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: error.message || 'Error updating shop profile' });
    }
};
exports.getshopsdata=async(req,res) => {
    
}