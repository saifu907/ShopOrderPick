import React  from 'react'
import {  useNavigate, useParams } from 'react-router-dom';
import ProductCard from './Inpage/ProductCard';
import { useFetchShopProducts } from './customHooks/Hooks';
function ShopProducts() {
  const navigate = useNavigate();
    const { shopId } = useParams();
    console.log(shopId); 
    const allProduct = useFetchShopProducts(shopId);
  const handleChat = () => {
    navigate(`/chats/${shopId}`);
  }
  return (
<>
<div className=" ps-3 mt-2 mx-0">


    <div className='row m-0'>
      <div className='d-flex align-items-center justify-content-space-between'>
        <h3 className='p-3'>Explore Shop</h3>
        <button onClick={handleChat} className='nav-link'><i class="fa-regular fa-comment-dots"></i></button>
      </div>
    {allProduct.length>0?allProduct.slice().reverse().map((products,index)=>(
          <ProductCard key={index} products={products}  />
                )):null
                }
    </div>
</div>
</>
  )
}

export default ShopProducts