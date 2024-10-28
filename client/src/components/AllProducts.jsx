import React, { useEffect, useState } from 'react'
import { getProductAPI } from '../Services/allAPI';


import SearchBar from './Inpage/SearchBar';
import ProductCard from './Inpage/ProductCard';


function AllProducts() {
    
    const [searchKey, setSearchKey] = useState("")
  
  
    
    const [allProducts,setAllProducts]=useState([])
  
      const getAllProducts =async()=>{
    const result = await getProductAPI(searchKey)
    if(result.status===200){
      setAllProducts(result.data)
      
    }else{
      console.log('error')
    }
  }
    useEffect(()=>{
      getAllProducts()
  
    },[searchKey])

  return (
    <div className=' my-3 '>
    <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
      
      <h1 className="pe-3 mb-3 mb-md-0">Explore Products</h1>
      <SearchBar searchKey={searchKey} setSearchKey={setSearchKey}/>

   
    </div>
    
      <div className='container mt-4 m-0'>
       
        <div className='row p-2  m-0' >
        {allProducts.length>0?allProducts.slice().reverse().map((products,index)=>(
          
          
          
        <ProductCard key={index} products={products}  />
        
        
        
      )):null
      }
        </div>
      </div>
  </div>
  )
}

export default AllProducts