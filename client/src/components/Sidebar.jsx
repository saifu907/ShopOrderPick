import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  MDBBadge,
  
} from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import Navbars from './Navbars';

function Sidebar({setShoplogin,shoplogin}) {
  const wishlist= useSelector((state)=>state.whishListReducer)
  const cart= useSelector((state)=>state.cartReducer)
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
    


      <div className='bg-light text-white p-3 vh-100 sticky-top d-flex flex-column  justify-content- sidebarul over  border-end  shadow ' >
        <div className="flex-grow-1">
          <ul style={{listStyle:'none'}} className='d-flex flex-column  '>
          
              <li >
              <NavLink  className='rounded-pill 'activeClassName="active"  to={'/'}><i class="fa-regular fa-circle"></i> home</NavLink>
            </li>
            {!shoplogin?( <>
            <li >
              <NavLink   className='rounded-pill' to={'/WishCart'}>{
                <div>
                    <i class="fa-solid fa-heart" ></i>
                      <MDBBadge className='px-1' style={{marginLeft:'-15px'}} color='danger' notification pill>
                   {wishlist.length>0?wishlist.length:null}
          
                      </MDBBadge>
                      </div>
                 } Wishlist</NavLink>
            </li>
            <li >
              <NavLink to={'/cart'}  className='rounded-pill'>{
                   <div>
                    <i class="fa-solid fa-cart-shopping"></i>
                      <MDBBadge className='px-1' style={{marginLeft:'-15px'}} color='danger' notification pill>
                   {cart.length>0?cart.length:null}
          
                      </MDBBadge>
                      </div>
                 }
              Cart</NavLink>
            </li>
            <li>
              <NavLink to={'/orders'} className='rounded-pill'><i class="fa-solid fa-list-check"></i> Orders</NavLink>
            </li>
          
            </>): <>
            <li>
              <NavLink to={'/shoporder'} className='rounded-pill'><i class="fa-solid fa-list-check"></i>Orders</NavLink>
            </li>
            <li>
              <NavLink to={'/Profile'} className='rounded-pill'><i class="fa-solid fa-list-check"></i>Profile</NavLink>
            </li>
            


            </>
            }
            <li>
              <NavLink to={'/chats'} className='rounded-pill'><i class="fa-solid fa-list-check"></i>Chats</NavLink>
            </li>
          </ul>
        </div>
        <div className=""><Navbars setShoplogin={setShoplogin} /></div>

      </div>
  )
}

export default Sidebar