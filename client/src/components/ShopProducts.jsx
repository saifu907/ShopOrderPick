import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import {  getAllShopProductsAPI, getAproductAPI } from '../Services/allAPI';
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

function ShopProducts() {
  const navigate = useNavigate();

    const cart= useSelector((state)=>state.cartReducer)
    const wishlist= useSelector((state)=>state.whishListReducer)
    const { shopId } = useParams();
    console.log(shopId);
    

    const [allProduct, setAllProduct] = useState([]);
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
    }
        
        
        const fetchProductDetails = async () => {
            console.log(shopId);
            
            const result = await getAllShopProductsAPI(shopId);  
            if (result.status === 200) {
                const products = result.data
                setAllProduct(products);
                
            } else {
                console.log('Error fetching product details');
            }
        };
        
        useEffect(() => {
            fetchProductDetails();
            
        }, [shopId]);
        
  const handleImage=(id,shopId)=>{
    navigate(`/product/${id}/${shopId}`)

  }
  const handleChat = () => {
    navigate(`/chats/${shopId}`);
  }

  return (
<>
<div className=" ps-3 mt-2 mx-0">


    <div className='row m-0'>
      <div className='d-flex align-items-center justify-content-space-between'>

        <h3 className='p-3'>Explore Shop</h3>
        <button onClick={handleChat} className='nav-link'><i class="fa-regular fa-comment-dots"></i></button>
      </div>
    {allProduct.length>0?allProduct.slice().reverse().map((products,index)=>(
    
                  <div className="col-sm-4  p-2 " key={index}>
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

export default ShopProducts