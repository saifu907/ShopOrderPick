import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbars from './Navbars';
import NavSideLink from './Inpage/NavSideLink';


function Sidebar({ setShoplogin, shoplogin }) {
  const wishlist = useSelector((state) => state.whishListReducer);
  const cart = useSelector((state) => state.cartReducer);
  useEffect(()=>{
    const username = sessionStorage.getItem('username');
    const shopname = sessionStorage.getItem('shopname');
  
    console.log('Username:', username);
    console.log('Shopname:', shopname);
  
    if (username) {
      setShoplogin(false);  
    } else if (shopname) {
      setShoplogin(true);
    }
  },[])


  return (
    <div className='bg-light text-dark p-0 vh-100 sticky-top d-flex flex-column justify-content-between sidebarul border-end shadow'>
      <div className="flex-grow-1 p-2">
        <ul style={{ listStyle: 'none', padding: '0' }} className='d-flex flex-column justify-content-center align-items-center'>
          <NavSideLink to='/' icon="fa-regular fa-circle" label="Home" />
          
          {!shoplogin ? (
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
        <Navbars setShoplogin={setShoplogin} />
      </div>
    </div>
  );
}

export default Sidebar;
