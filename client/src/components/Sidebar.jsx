import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NavSideLink from './Inpage/NavSideLink';
import  { useAuth } from '../Auth/AuthContext';

const Navbars=lazy(()=>import('./Navbars'))


function Sidebar() {
  const { isLoggedIn, isShopOwner } = useAuth();
  const wishlist = useSelector((state) => state.whishListReducer);
  const cart = useSelector((state) => state.cartReducer);

  const [navbarsLoaded, setNavbarsLoaded] = useState(false);



  return (
    <div className='bg-light text-dark p-0 vh-100 sticky-top d-flex flex-column justify-content-between sidebarul border-end shadow'>
      <div className="flex-grow-1 p-2">
        <ul style={{ listStyle: 'none', padding: '0' }} className='d-flex flex-column justify-content-center align-items-center'>
          <NavSideLink to='/' icon="fa-regular fa-circle" label="Home" />
          
          {!isShopOwner ? (
            <>
              <NavSideLink 
                to='/WishCart' 
                icon="fa-solid fa-heart" 
                label="Wishlist" 
                badgeContent={wishlist.length > 0 ? wishlist.length : null} 
              />
              <NavSideLink 
                to='/cart' 
                icon="fa-solid fa-cart-shopping" 
                label="Cart" 
                badgeContent={cart.length > 0 ? cart.length : null} 
              />
              <NavSideLink to='/orders' icon="fa-solid fa-list-check" label="Orders" />
            </>
          ) : (
            <>
              <NavSideLink to='/shoporder' icon="fa-solid fa-list-check" label="Orders" />
              <NavSideLink to='/Profile' icon="fa-solid fa-user" label="Profile" />
            </>
          )}

          <NavSideLink to='/chats' icon="fa-regular fa-comment-dots" label="Chats" />
        </ul>
      </div>
      <div className="mb-5 pb-5">
    
          
          <Suspense fallback={<div>Loading...</div>}>
            <Navbars />
          </Suspense>
      

      </div>
    </div>
  );
}

export default Sidebar;
