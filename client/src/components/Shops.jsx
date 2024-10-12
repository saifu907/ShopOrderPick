import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../Services/server_url';
import { useNavigate } from 'react-router-dom';
import { defaultShopErrorImage, defaultshopImage } from '../assets/defaultImg';
import SearchBar from './Inpage/SearchBar';
import { useFetchShops } from './customHooks/Hooks';
function Shops() {
    const [searchKey, setSearchKey] = useState("")
    const navigate = useNavigate();
    const shops = useFetchShops(searchKey);
      const handleImg=(id) => {
      navigate(`/shop/${id}`) 
      }
  return (
    <div className=" my-3  ">
    <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
      
      <h1 className="pe-3 mb-3 mb-md-0">All Shops</h1>
      <SearchBar searchKey={searchKey} setSearchKey={setSearchKey}/>

    </div>
    <div className="row">
    {shops.map((shop, index) => (
        <div className="col-md-3 mb-4" key={index}>
        <div className="card shadow-none h-100 ">
          <div className="card-body text-center">
            
            <img onClick={()=>handleImg(shop._id)}
              src={ shop.profileimage?`${SERVER_URL}/uploads/${shop.profileimage}`:defaultshopImage}
              alt=''
              onError={(e) => e.target.src = defaultShopErrorImage}
              className="rounded-circle mb-3 shadow border border-1" style={{width: '200px', height:'200px'}}
            />
            
            <h5 className="card-title">{shop.shopname}</h5>
          </div>
        </div>
      </div>

    ))}
      
        
        
        

    </div>
  </div>
  )
}

export default Shops