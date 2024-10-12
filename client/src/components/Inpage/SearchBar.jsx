import React from 'react'
import Form from 'react-bootstrap/Form';


function SearchBar({ searchKey, setSearchKey }) {
    
  return (
    <>
    <div className="  d-flex align-items-center justify-content-center gap-2 mb-3 mb-md-0">
   <i class="fa-solid fa-magnifying-glass fa-xl"></i>
   <Form.Control className='pe-5' style={{width:'250px',height:'40px'}} onChange={e=>setSearchKey(e.target.value)} type="text" placeholder="Search" />
   
   </div>
    </>
  )
}

export default SearchBar