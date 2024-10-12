import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {  getAproductAPI } from '../Services/allAPI';
import { SERVER_URL } from '../Services/server_url';
import {
    MDBBtn
  } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { addtowishList } from '../features/whishList';
import { defaultProductImage } from '../assets/defaultImg';
import ProductCard from './Inpage/ProductCard';
import CartListButton from './Inpage/CartListButton';
import WishListButton from './Inpage/WishListButton';
function ProductDetail() {
  const navigate = useNavigate();
    
    const { productId } = useParams();
    const [allProduct, setAllProduct] = useState([]);
    const [product, setProduct] = useState(null);
    console.log(product);
    
    

    const cart= useSelector((state)=>state.cartReducer)
    const wishlist= useSelector((state)=>state.whishListReducer)

  
  const dispatch = useDispatch()
  const handleAddToCart = (product) => {
    
    const isProductCart = cart.some(item => item._id === product._id);
    if (!isProductCart) {
      dispatch(addToCart({...product,quantity:1}));
    } else {
        console.log('Product is already in the cart');
    }
  }

  const handleAddToWishlist = (product) => {
    
    const isProductInWishlist = wishlist.some(item => item._id === product._id);
    if (!isProductInWishlist) {
        dispatch(addtowishList(product));
        
    } else {
        console.log('Product is already in the wishlist');
    }
};
const fetchProductDetails = async () => {
    const result = await getAproductAPI(productId);  
    if (result.status === 200) {
        const products = result.data
      setAllProduct(products);
      const oneProduct = products.find(product => product._id === productId);
            setProduct(oneProduct);
      console.log(product);
      
    } else {
      console.log('Error fetching product details');
    }
  };
 
  useEffect(() => {



        
        fetchProductDetails();

      }, [productId]);

  

      
      
      
      
    


  return (
    <>
<div className=" ps-3 mt-2 mx-0">

{product && (
    
    <div className='row m-0'>
        <div className='col-sm-6 col-12 '>
            <img src={`${SERVER_URL}/uploads/${product?.productimage}`} style={{objectFit:'contain',width:'100%'}}  alt=""   onError={(e) => e.target.src = defaultProductImage}/>
    
        </div>
        <div className='col-sm-6 mt-5 d-flex flex-column gap-3'>
            <h3>{product?.label}</h3>
            <h3>Rs. {product?.price}</h3>
            <CartListButton products={product}/>
            <WishListButton products={product}/>
    
    <div className="d-flex gap-2">
  
      
    
                <MDBBtn  onClick={()=>handleAddToCart(product)}  className={`${cart.some(item => item._id === product._id) ? 'bg-light text-dark' : 'bg-dark text-light'} w-100 m-0  p-3`}>{cart.some(item => item._id === product._id) ?<div><i class="fa-solid fa-check"> Added to Cart </i></div>: <div> <i class="fa-solid fa-cart-shopping"></i> Add to Cart </div>}</MDBBtn>
    
                <MDBBtn style={{ width: '50px', height: '50px' }}  onClick={()=>handleAddToWishlist(product)} className={` bg-transparent shadow-none border rounded-circle d-flex align-items-center justify-content-center wishlist ${wishlist.some(item => item._id === product._id) ? ' text-danger' : ' text-info border-2 '}`}  color=''><i className={ ` text-info `} class="fa-solid fa-heart fa-2xl" ></i></MDBBtn>
    
    
    </div>
    
    
    
    
            <h5>Overview:</h5>
            <p>{product?.caption}</p>
        </div>
    
    </div>

)}










    <div className='row m-0'>
        <h3 className='p-3'>Explore Shop</h3>
    {allProduct.length>0?allProduct.slice().reverse().map((products,index)=>(
    
    <ProductCard key={index} products={products}  />

    
    
    
                )):null
                }
    </div>
</div>
</>

  )
}

export default ProductDetail