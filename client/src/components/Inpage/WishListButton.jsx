import React from 'react'
import {
  MDBBtn
  } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { addtowishList } from '../../features/whishList';

function WishListButton({products}) {
    const dispatch=useDispatch()

    const wishlist= useSelector((state)=>state.whishListReducer)

    const handleAddToWishlist = (product) => {
      
        const isProductInWishlist = wishlist.some(item => item._id === product._id);
        if (!isProductInWishlist) {
            dispatch(addtowishList(product));
            
        } else {
            console.log('Product is already in the wishlist');
        }
    };
  return (
    <>
    
            <MDBBtn onClick={()=>handleAddToWishlist(products)} className={`bg-transparent hovers wishlist ${wishlist.some(item => item._id === products._id) ? 'text-danger' : 'text-light'}`}  color=''>
              <i className={`bg-transparent hovers `} class="fa-solid fa-heart fa-2xl"></i>
              </MDBBtn>

        
    
    </>
  )
}

export default WishListButton