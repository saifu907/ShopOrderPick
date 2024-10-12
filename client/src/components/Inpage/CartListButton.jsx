import React from 'react'
import { addToCart } from '../../features/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
    MDBBtn
    } from 'mdb-react-ui-kit';

function CartListButton({products}) {
    const cart= useSelector((state)=>state.cartReducer)

    const dispatch=useDispatch()

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
                <MDBBtn onClick={()=>handleAddToCart(products)}  className={` d-flex py-3 justify-content-center ${cart.some(item => item._id === products._id) ? 'text-danger' : 'text-light   '}`} color=''><i class="fa-solid fa-cart-shopping "></i></MDBBtn>

      
    
    </>
  )
}

export default CartListButton