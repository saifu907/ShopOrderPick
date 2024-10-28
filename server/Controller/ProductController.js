const { eventNames } = require('../Model/orderModel');
const products =require('../Model/productModel')
const shops = require('../Model/shopModel')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SEARCHKEY,
});

exports.addProducts = async (req, res) => {
    const { label, caption, price } = req.body;
    const shopid = req.payload; // Assuming req.payload contains shopid
  
    try {
      // Upload image to Cloudinary using buffer from Multer's memory storage
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'products' }, // Upload to 'products' folder in Cloudinary
          (error, result) => {
            if (error) reject(error);
            resolve(result); // Resolve with the Cloudinary upload result
          }
        );
        // Pipe the image buffer from Multer's memory storage to Cloudinary
        uploadStream.end(req.file.buffer);
      });
  
      const productImageURL = result.secure_url; // Cloudinary image URL
  
      // Check if the product already exists
      const existingProduct = await products.findOne({ label });
      if (existingProduct) {
        return res.status(401).json('Product already exists');
      }
  
      // Create new product and save it to the database
      const newProduct = new products({
        label,
        caption,
        productimage: productImageURL,  // Store the Cloudinary image URL
        price,
        shopid,
      });
  
      await newProduct.save();
      res.status(200).json(newProduct);
  
    } catch (error) {
      res.status(500).json({ message: 'Error adding product', error });
    }
  };

exports.getAllProducts=async(req,res)=>{
    const searchKey=req.query.search

    query={
        label:{$regex:searchKey,$options:'i'}

    }
    
    try{
        const allProducts = await products.find(query)
        res.status(200).json(allProducts)
        

    }catch(e){
        res.status(401).json(e)
    }
}
exports.getAProducts=async(req,res)=>{
    const productId=req.params.id    
    try{
      
        const product=await products.findById(productId)
        
        const shopId=product.shopid
const shopProducts = await products.find({shopid:shopId})

        
        res.status(200).json(shopProducts)

    }catch(e){ 
        res.status(401).json(e)
     }
}


exports.getshopProducts=async(req,res)=>{
    const shopId=req.payload
    
    
    try{
        const shopProduct = await products.find({ shopid: shopId})
        
        res.status(200).json(shopProduct)

    }catch(e){
        res.status(401).json(e)
    }
}




exports.deleteAProduct=async(req,res)=>{
    const {productId}=req.body
    
    try{
        const deleteProduct = await products.findByIdAndDelete(productId)
        if (deleteProduct) {
            res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }

    }catch(e){
        res.status(401).json(e)
    }

}
exports.getAllShopProducts=async(req,res)=>{
    const shopId=req.params.id    
    try{
        
    
const shopProducts = await products.find({shopid:shopId})

        
        res.status(200).json(shopProducts)

    }catch(e){ 
        res.status(401).json(e)
     }
}