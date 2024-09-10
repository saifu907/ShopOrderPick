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
    


      <div className='bg-light text-white p-0 vh-100 sticky-top d-flex flex-column  justify-content-center  sidebarul over  border-end  shadow ' >
        <div className="flex-grow-1 p-2">
          <ul style={{listStyle:'none',padding:'0'}} className='d-flex flex-column  justify-content-center align-items-center align-items-sm-stretch'>
          
              <li >
              <NavLink  className='rounded-5 justify-content-sm-start justify-content-sm-start'activeClassName="active"  to={'/'}><i class="fa-regular fa-circle"></i> <span className="d-none d-sm-inline">home</span></NavLink>
            </li>
            {!shoplogin?( <>
            <li >
              <NavLink   className='rounded-5 justify-content-sm-start ' to={'/WishCart'}>{
                <div>
                    <i class="fa-solid fa-heart" ></i>
                      <MDBBadge className='px-1' style={{marginLeft:'-15px'}} color='danger' notification pill>
                   {wishlist.length>0?wishlist.length:null}
          
                      </MDBBadge>
                      </div>
                 } <span className="d-none d-sm-inline">Wishlist</span></NavLink>
            </li>
            <li >
              <NavLink to={'/cart'}  className='rounded-5 justify-content-sm-start'>{
                   <div>
                    <i class="fa-solid fa-cart-shopping"></i>
                      <MDBBadge className='px-1' style={{marginLeft:'-15px'}} color='danger' notification pill>
                   {cart.length>0?cart.length:null}
          
                      </MDBBadge>
                      </div>
                 }
              <sapn className="d-none d-sm-inline">Cart</sapn></NavLink>
            </li>
            <li>
              <NavLink to={'/orders'} className='rounded-5 justify-content-sm-start'><i class="fa-solid fa-list-check"></i> <span className="d-none d-sm-inline">Orders</span></NavLink>
            </li>
          
            </>): <>
            <li>
              <NavLink to={'/shoporder'} className='rounded-5 justify-content-sm-start'><i class="fa-solid fa-list-check"></i><span className="d-none d-sm-inline">Orders</span></NavLink>
            </li>
            <li>
              <NavLink to={'/Profile'} className='rounded-5 justify-content-sm-start'><i class="fa-solid fa-user"></i><span className="d-none d-sm-inline">Profile</span></NavLink>
            </li>
            


            </>
            }
            <li>
              <NavLink to={'/chats'} className='rounded-5 justify-content-sm-start'><i class="fa-regular fa-comment-dots"></i><span className="d-none d-sm-inline">Chats</span></NavLink>
            </li>
          </ul>
        </div>
        <div className="mb-5"><Navbars setShoplogin={setShoplogin} /></div>

      </div>
  )
}

export default Sidebar