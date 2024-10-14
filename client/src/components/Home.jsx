import React, { Suspense } from 'react'
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


  const WishCart = React.lazy(() => import('./WishCart'));
const UserLanding = React.lazy(() => import('./UserLanding'));
const Shopadmin = React.lazy(() => import('./Shopadmin'));
const Cart = React.lazy(() => import('./Cart'));
const Orders = React.lazy(() => import('./Orders'));
const Shoporder = React.lazy(() => import('./Shoporder'));
const ProductDetail = React.lazy(() => import('./ProductDetail'));
const Profile = React.lazy(() => import('./Profile'));
const ShopProducts = React.lazy(() => import('./ShopProducts'));
const Chats = React.lazy(() => import('./Chats'));
function Home() {

    const [shoplogin, setShoplogin] = useState(false)
   

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
    <div className="col-sm-3 col-2  p-0 m-0">
      
    <Sidebar setShoplogin={setShoplogin} shoplogin={shoplogin} />
    </div>
<div className="col-sm-9 col-10 m-0 p-0">
          
<Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
  
</div>

    </div>
      
      


    </>
  )
}

export default Home