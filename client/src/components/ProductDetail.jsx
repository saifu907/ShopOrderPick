import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {  getAproductAPI } from '../Services/allAPI';
import { SERVER_URL } from '../Services/server_url';
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardOverlay,
    MDBCardImage,MDBBtn
  } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { addtowishList } from '../features/whishList';
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

      const handleImage=(id,shopId)=>{
        navigate(`/product/${id}/${shopId}`)
    
      }

      
      
      
      
    


  return (
    <>
<div className=" ps-3 mt-2 mx-0">

{product && (
    
    <div className='row m-0'>
        <div className='col-6  '>
            <img src={`${SERVER_URL}/uploads/${product?.productimage}`} style={{objectFit:'contain',width:'100%'}}  alt="" />
    
        </div>
        <div className='col-6 mt-5 d-flex flex-column gap-3'>
            <h3>{product?.label}</h3>
            <h3>Rs. {product?.price}</h3>
    
    <div className="d-flex gap-2">
    
                <MDBBtn  onClick={()=>handleAddToCart(product)}  className={`${cart.some(item => item._id === product._id) ? 'bg-light text-dark' : 'bg-dark text-light'} w-100 m-0  p-3`}>{cart.some(item => item._id === product._id) ?<div><i class="fa-solid fa-check"> Added to Cart </i></div>: <div> <i class="fa-solid fa-cart-shopping"></i> Add to Cart </div>}</MDBBtn>
    
                <MDBBtn style={{ width: '50px', height: '50px' }}  onClick={()=>handleAddToWishlist(product)} className={` bg-transparent shadow-none border rounded-circle d-flex align-items-center justify-content-center ${wishlist.some(item => item._id === product._id) ? ' text-danger' : ' text-info border-2 '}`}  color=''><i className={ ` text-info `} class="fa-solid fa-heart fa-2xl" ></i></MDBBtn>
    
    
    </div>
    
    
    
    
            <h5>Overview:</h5>
            <p>{product?.caption}</p>
        </div>
    
    </div>

)}










    <div className='row m-0'>
        <h3 className='p-3'>Explore Shop</h3>
    {allProduct.length>0?allProduct.slice().reverse().map((products,index)=>(
    
                  <div className="col-4  p-2 " key={index}>
                    <MDBCard background='dark' className='text-dark overflow-hidden cards' style={{height:'250px'}} >
    
    
                            <MDBCardImage className='cardimg' onClick={()=>handleImage(products._id,products.shopid)}
    
                            src={`${SERVER_URL}/uploads/${products.productimage}`} alt='...' />
    
    
    
    
                          <MDBCardOverlay className=' d-flex flex-column justify-content-end p-0 m-0  overlay' >
                          <div className='position-absolute fixed-top d-flex  justify-content-end align-items-start'>
                          <MDBBtn onClick={()=>handleAddToWishlist(products)} className={`bg-transparent hovers ${wishlist.some(item => item._id === products._id) ? 'text-danger' : 'text-light'}`}  color=''>
                            <i className={`bg-transparent hovers `} class="fa-solid fa-heart fa-2xl"></i>
                            </MDBBtn>
    
                          </div>
                            <div className="row cardallcontent px-2">
                              <div className=" col-8">
                                <MDBCardTitle className=''>{products.label}</MDBCardTitle>
                                <MDBCardText className='text-truncate col-5'>
                                {products.caption}
                                </MDBCardText>
                                <MDBCardText></MDBCardText>
    
                              </div>
                              <div className='col-4 d-flex align-items-center justify-content-center hovers'>
                              <MDBBtn onClick={()=>handleAddToCart(products)}  className={`${cart.some(item => item._id === products._id) ? 'text-danger' : 'text-light'}`} color=''><i class="fa-solid fa-cart-shopping "></i></MDBBtn>
    
                              </div>
                            </div>
                          </MDBCardOverlay>
                        </MDBCard>
                  </div>
    
    
    
                )):null
                }
    </div>
</div>
</>

  )
}

export default ProductDetail