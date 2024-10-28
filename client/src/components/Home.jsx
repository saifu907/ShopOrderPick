import React, { lazy, Suspense } from 'react'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
// import WishCart from './WishCart'
import Sidebar from './Sidebar'
// import UserLanding from './UserLanding'
// import Shopadmin from './Shopadmin'
// import Cart from './Cart'
// import Orders from './Orders'
// import Shoporder from './Shoporder'
// import ProductDetail from './ProductDetail'
// import Profile from './Profile'
// import ShopProducts from './ShopProducts'
// import Chats from './Chats'
  import 'react-toastify/dist/ReactToastify.css';
  import  { useAuth } from '../Auth/AuthContext';



  const WishCart =lazy(() => import('./WishCart'));
const UserLanding = lazy(() => import('./UserLanding'));
const Shopadmin = lazy(() => import('./Shopadmin'));
const Cart = lazy(() => import('./Cart'));
const Orders = lazy(() => import('./Orders'));
const Shoporder = lazy(() => import('./Shoporder'));
const ProductDetail = lazy(() => import('./ProductDetail'));
const Profile = lazy(() => import('./Profile'));
const ShopProducts = lazy(() => import('./ShopProducts'));
const Chats = lazy(() => import('./Chats'));
function Home() {
  const { isLoggedIn,isShopOwner } = useAuth();



   

  const [key, setKey] = useState(0); // Add a key to force re-render

  useEffect(() => {
    const username = sessionStorage.getItem('username');
    const shopname = sessionStorage.getItem('shopname');
  
    console.log('Username:', username);
    console.log('Shopname:', shopname);
  
    // Change key whenever user logs in or logs out
    setKey(prevKey => prevKey + 1); // Increment key to force re-render
  }, [isLoggedIn, isShopOwner]);
  
  return (
    <>
  

      <div className='row m-0'>
    <div className="col-sm-3 col-2  p-0 m-0">
      
      
    <Sidebar  />
    </div>
<div className="col-sm-9 col-10 m-0 p-0">
          
<Suspense fallback={<div>Loading...</div>}>
      <Routes>
                          <Route path="/" element={isShopOwner ? <Shopadmin />:<UserLanding />} />
                          
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
      </Suspense>
  
</div>

    </div>
      
      


    </>
  )
}

export default Home