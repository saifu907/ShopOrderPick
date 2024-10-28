
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple
} from 'mdb-react-ui-kit';
import { removeFromWishlist } from '../features/whishList';
import { addToCart } from '../features/cartSlice';
import { Link } from 'react-router-dom';
import { defaultProductImage } from '../assets/defaultImg';

function WishCart() {
  
  const wishlistArray= useSelector((state)=>state.whishListReducer)
  const cart= useSelector((state)=>state.cartReducer)
  
  const dispatch = useDispatch()
  const handleAddToCart = (product) => {
    
    const isProductCart = cart.some(item => item._id === product._id);
    if (!isProductCart) {
      dispatch(addToCart({...product,quantity:1}));
    } else {
        console.log('Product is already in the cart');
    }
  }
  return (
    <>
   <div className="row ps-3 m-0">
    <h1>WishList{wishlistArray.length>0?`(${wishlistArray.length})`:null}</h1> 
     {
     
       wishlistArray.length>0?wishlistArray.slice().reverse().map((product,index)=>(
         <div key={index} className='col-sm-3 col-12 g-4'>
     <MDBCard style={{height:'400px'}} c>
     <div className='position-absolute fixed-top d-flex  justify-content-end align-items-start'>
                    <MDBBtn onClick={()=>dispatch(removeFromWishlist(product._id))}  className='bg-transparent shadow-none '  color=''>
     <i cl class="fa-solid fa-circle-xmark fa-2xl"></i>

                      </MDBBtn>

                    </div>
       <MDBRipple  rippleColor='light' rippleTag='div' className='bg-image hover-overlay h-100'>
         <MDBCardImage style={{height:'200px',objectFit:'fit'}} src={`${product.productimage}`} onError={(e) => e.target.src = defaultProductImage} alt={product.label} fluid />
         <a>
           <div className='mask' style={{backgroundColor:'rgba(251, 251, 251, 0.15)' }}></div>
         </a>
       </MDBRipple>
       <MDBCardBody className='p-0 mt-2'style={{height:'50%',overflow:'hidden'}}>
         <MDBCardTitle>{product.label}</MDBCardTitle>
         <MDBCardText >
         {product.caption}
         </MDBCardText>
       </MDBCardBody>
         <div className="">
           <MDBBtn  onClick={()=>handleAddToCart(product)}  className={`${cart.some(item => item._id === product._id) ? 'bg-light text-dark' : 'bg-dark text-light'} w-100 m-0  p-3`}>{cart.some(item => item._id === product._id) ?<div><i class="fa-solid fa-check"> Added to Cart </i></div>: <div> <i class="fa-solid fa-cart-shopping"></i> Add to Cart </div>}</MDBBtn>
         </div>
     </MDBCard>   
     </div>
       )) : <div className=" d-flex flex-column justify-content center align-items-center ">
       <img style={{objectFit:'cover',maxHeight:'200px'}}  src="https://i.pinimg.com/564x/f6/e4/64/f6e464230662e7fa4c6a4afb92631aed.jpg" alt="" />
       <Link to={'/'}className='btn btn-warning rounded'>Back to Home</Link>
     </div>
     }
   </div>

    </>
  )
}

export default WishCart