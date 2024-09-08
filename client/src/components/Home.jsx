import React from 'react'
import { useEffect, useState } from 'react'


import { useDispatch, useSelector } from 'react-redux'
import { addtowishList } from '../features/whishList'
import { Link, Route, Routes } from 'react-router-dom'
import WishCart from './WishCart'
import Sidebar from './Sidebar'

import UserLanding from './UserLanding'
import Shopadmin from './Shopadmin'
import { registerAPI } from '../Services/allAPI'
import Navbars from './Navbars'
import Cart from './Cart'
import Orders from './Orders'
import Shoporder from './Shoporder'
import ProductDetail from './ProductDetail'
import Profile from './Profile'
import ShopProducts from './ShopProducts'
import Chats from './Chats'
function Home() {

    const [shoplogin, setShoplogin] = useState(false)
   

  const dispatch=useDispatch()
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
  },[shoplogin])

  
  return (
    <>
  

      <div className='row m-0'>
    <div className="col-3 p-0 m-0">
      
    <Sidebar setShoplogin={setShoplogin} shoplogin={shoplogin} />
    </div>
<div className="col-9 m-0 p-0">
          

      <Routes>
                          <Route path="/" element={shoplogin ? <Shopadmin />:<UserLanding />} />
                          
                          <Route path="/Shoporder" element={<Shoporder/>}/>
                      
                          <Route path="/WishCart" element={<WishCart/>} />
                          <Route path="/Cart" element={<Cart/>} />
                          <Route path="/Orders" element={<Orders/>}/>
                          <Route path="/Profile" element={<Profile/>}/>
                          <Route path="/product/:productId/:shopId" element={<ProductDetail/>} />
                          <Route path="/shop/:shopId" element={<ShopProducts/>} />
                          <Route path="/chats" element={<Chats/>} />
                          <Route path="/chats/:shopId" element={<Chats/>} />
                      
      </Routes>
  
</div>

    </div>
      
      


    </>
  )
}

export default Home