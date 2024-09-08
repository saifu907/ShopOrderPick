const products =require('../Model/productModel')
const shops = require('../Model/shopModel')

exports.addProducts =async(req,res)=>{
    const {label,caption,price}=req.body
    
    const productimage=req.file.filename
    const shopid=req.payload
    console.log(label,caption,shopid,productimage,price)
    try{
        const existingproduct=await products.findOne({label})
        if(existingproduct){
        console.log('product already exists');

        res.status(401).json('product already exists')
        }else{
        console.log('ok');

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
    console.log(searchKey);
    
    try{
        const allProducts = await products.find(query)
        res.status(200).json(allProducts)
        console.log(allProducts);
        

    }catch(e){
        res.status(401).json(e)
    }
}
exports.getAProducts=async(req,res)=>{
    const productId=req.params.id    
    try{
        const product=await products.findById(productId)
        const shopId=product.shopid
        console.log(shopId);
const shopProducts = await products.find({shopid:shopId})
console.log(shopProducts)

        
        res.status(200).json(shopProducts)

    }catch(e){ 
        res.status(401).json(e)
     }
}


exports.getshopProducts=async(req,res)=>{
    const shopId=req.payload
    console.log(shopId);
    
    
    try{
        const shopProduct = await products.find({ shopid: shopId})
        console.log(shopProduct);
        
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