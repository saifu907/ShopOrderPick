const products =require('../Model/productModel')
const shops = require('../Model/shopModel')

exports.addProducts =async(req,res)=>{
    const {label,caption,price}=req.body
    
    const productimage=req.file.filename
    const shopid=req.payload
    try{
        const existingproduct=await products.findOne({label})
        if(existingproduct){

        res.status(401).json('product already exists')
        }else{

            const newproduct=await products({
                label,caption,productimage,price,shopid

            })
            await newproduct.save()
            res.status(200).json(newproduct)
        }

    }catch(e){
    res.status(402).json(e)


    }

}


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