import React from 'react'
import Form from 'react-bootstrap/Form';


function SearchBar({ setSearchKey }) {
    
  return (
    <>
    <div className="d-flex align-items-center justify-content-center gap-2 me-0 me-md-5">
   <i className="fa-solid fa-magnifying-glass fa-xl"></i>
   <Form.Control className='pe-5' style={{width:'250px',height:'40px'}} onChange={e=>setSearchKey(e.target.value)} type="text" placeholder="Search" />
   </div>
    </>
  )
}

export default SearchBar