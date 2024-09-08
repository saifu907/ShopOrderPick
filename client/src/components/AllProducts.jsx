import React, { useEffect, useState } from 'react'
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardOverlay,
    MDBCardImage,MDBBtn
  } from 'mdb-react-ui-kit';
import {  getAproductAPI, getProductAPI } from '../Services/allAPI';
import { SERVER_URL } from '../Services/server_url';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import whishList, { addtowishList } from '../features/whishList';
import { addToCart } from '../features/cartSlice';
import Form from 'react-bootstrap/Form';


function AllProducts() {
    const navigate = useNavigate();
    const [searchKey, setSearchKey] = useState("")
  
    const [addedProducts, setAddedProducts] = useState([]);
    const [checkproduct,setcheckproduct]=useState(false)
    const dispatch=useDispatch()
    const wishlist= useSelector((state)=>state.whishListReducer)
    const cart= useSelector((state)=>state.cartReducer)
    console.log(cart)
    
    const [allProducts,setAllProducts]=useState([])
  
      const getAllProducts =async()=>{
    const result = await getProductAPI(searchKey)
    if(result.status===200){
      setAllProducts(result.data)
      console.log(result.data);
      
      
    }else{
      console.log('error')
    }
  }
    useEffect(()=>{
      getAllProducts()
  
    },[searchKey])
    const handleImage=(id,shopId)=>{
      navigate(`/product/${id}/${shopId}`)
  
    }
    
    const handleAddToWishlist = (product) => {
      
      const isProductInWishlist = wishlist.some(item => item._id === product._id);
      if (!isProductInWishlist) {
          dispatch(addtowishList(product));
          
      } else {
          console.log('Product is already in the wishlist');
      }
  };
  const handleAddToCart = (product) => {
      
    const isProductCart = cart.some(item => item._id === product._id);
    if (!isProductCart) {
      dispatch(addToCart({...product,quantity:1}));
      
    } else {
        console.log('Product is already in the cart');
    }
  }
  
  
  
  
  
  return (
    <div className=' my-3 ms-3'>
    <div className="d-flex align-items-center justify-content-between">
      <h1>Explore</h1>
      <div className="pe-5 me-5 d-flex align-items-center justify-content-center gap-2">
         <i class="fa-solid fa-magnifying-glass fa-xl"></i><Form.Control className='pe-5' style={{width:'300px',height:'40px'}} onChange={e=>setSearchKey(e.target.value)} type="text" placeholder="Search" />
         
         </div>
    </div>
      <div className='container mt-4 m-0'>
       
        {/* <div className="row my-3  ">
          <div className='col-6 '>

              <div className="row my-3 ">
                <div className="col-12 longcard card ">
                    <img src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="" />
                </div>
              </div>
              <div className="row my-3">
                <div className="col-12 longcard card">
                  <img src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="" />
                </div>
              </div>
              <div className="row my-3">
                <div className="col-6 card">
                    <img src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="" />
                </div>
                <div className="col-6 card">
                    <img src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="" />
                </div>
              </div>
          </div>
          <div className='col-6 d-flex flex-column align-items-stretch'>
              <div className="row flex-grow-1 my-3 ">
                <div className="col-6  card">
                    <img className='h-100' src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="" />
                </div>
                <div className="col-6  card">
                    <img className='h-100' src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="" />
                </div>
              </div>
              <div className="row  mb-3">
                <div className="col-12  longcard card">
                  <img src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="" />
                </div>
              </div>
          </div>
          
        </div>
        
        <div className="container-fluid bg-info roundeddiv d-flex align-items-center justify-content-evenly">
          <div className='circle rounded-circle bg-danger'>
            <img className='hello' src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="" />

          </div><div className='circle rounded-circle bg-danger'>
            <img className='hello' src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="" />

          </div><div className='circle rounded-circle bg-danger'>
            <img className='hello' src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="" />

          </div><div className='circle rounded-circle bg-danger'>
            <img className='hello' src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="" />

          </div>
          <div className='circle rounded-circle bg-danger'>
            <img className='hello' src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="" />

          </div>
          <div className='circle rounded-circle bg-danger'>
            <img className='hello' src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="" />

          </div>

        </div> */}
        <div className='row p-2 m-0' >
        {allProducts.length>0?allProducts.slice().reverse().map((products,index)=>(
          
        <div className="col-4 p-2 m-0" key={index}>
          <MDBCard background='dark' className='text-dark overflow-hidden cards' style={{height:'250px'}} >
          
                
                  <MDBCardImage className='cardimg' onClick={()=>handleImage(products._id,products.shopid)}
                  
                  src={`${SERVER_URL}/uploads/${products.productimage}`} alt='...' />
                  
                  
                
      
                <MDBCardOverlay className=' d-flex flex-column justify-content-end p-0 m-0  overlay' >
                <div className='position-absolute fixed-top d-flex  justify-content-end align-items-start'>
                <MDBBtn onClick={()=>handleAddToWishlist(products)} className={`bg-transparent hovers ${wishlist.some(item => item._id === products._id) ? 'text-danger' : 'text-light'}`}  color=''>
                  <i className={`bg-transparent hovers `} class="fa-solid fa-heart fa-2xl"></i>
                  </MDBBtn>

                </div>
                  <div className="row cardallcontent px-2">
                    <div className=" col-8">
                      <MDBCardTitle className=''>{products.label}</MDBCardTitle>
                      <MDBCardText className='text-truncate col-5'>
                      {products.caption}
                      </MDBCardText>
                      <MDBCardText></MDBCardText>
                    
                    </div>
                    <div className='col-4 d-flex align-items-center justify-content-center hovers'>
                    <MDBBtn onClick={()=>handleAddToCart(products)}  className={`${cart.some(item => item._id === products._id) ? 'text-danger' : 'text-light'}`} color=''><i class="fa-solid fa-cart-shopping "></i></MDBBtn>

                    </div>
                  </div>
                </MDBCardOverlay>
              </MDBCard>
        </div>
        
        
        
      )):null
      }
        </div>
      </div>
  </div>
  )
}

export default AllProducts