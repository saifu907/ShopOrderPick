import React, { useEffect, useState } from 'react'
import { getAllShopAPI } from '../Services/allAPI';
import { SERVER_URL } from '../Services/server_url';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
function Shops() {
    const [shops, setShops] = useState([])
    const [searchKey, setSearchKey] = useState("")
    
    
    
    const navigate = useNavigate();

    const getShopsData = async () => {
        
         
    
          const result = await getAllShopAPI(searchKey);
          if (result.status === 200) {
            setShops(result.data); 
          } else {
            console.error('Error fetching shops data:', result);
          }
        
      };
      useEffect(() => {
        getShopsData();
      }, [searchKey]);
      const handleImg=(id) => {
      navigate(`/shop/${id}`)
        

        
      }
  return (
    <div className="container ">
    <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
      
    <h1 className="pe-3 mb-3 mb-md-0">All Shops</h1>
     
   <div className="  d-flex align-items-center justify-content-center gap-2 mb-3 mb-md-0">
   <i class="fa-solid fa-magnifying-glass fa-xl"></i>
   <Form.Control className='pe-5' style={{width:'250px',height:'40px'}} onChange={e=>setSearchKey(e.target.value)} type="text" placeholder="Search" />
   
   </div>
    </div>
    <div className="row">
    {shops.map((shop, index) => (
        <div className="col-md-3 mb-4" key={index}>
        <div className="card shadow-none h-100 ">
          <div className="card-body text-center">
            
            {/*  */}
            <img onClick={()=>handleImg(shop._id)}
              src={ shop.profileimage?`${SERVER_URL}/uploads/${shop.profileimage}`:"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt=''
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