import React from 'react'
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardOverlay,
    MDBCardImage
  } from 'mdb-react-ui-kit';
import { defaultProductImage } from '../../assets/defaultImg';
import { useNavigate } from 'react-router-dom';
import WishListButton from './WishListButton';
import CartListButton from './CartListButton';


function ProductCard({index, products}) {
    const navigate = useNavigate();
    console.log(products);
    

    const handleImage=(id,shopId)=>{
        navigate(`/product/${id}/${shopId}`)
      }
  return (
    <>
    
    <div className="col-sm-4  p-2 " key={index}>
        <MDBCard background='dark' className='text-dark overflow-hidden cards' style={{height:'250px'}} >


            <MDBCardImage className='cardimg' onClick={()=>handleImage(products._id,products.shopid)}

                src={`${products.productimage}`}
                
                alt='...'  onError={(e) => e.target.src = defaultProductImage} loading="lazy"/>
                





            <MDBCardOverlay className=' d-flex flex-column justify-content-end p-0 m-0  overlay' >
                <div className='position-absolute fixed-top d-flex  justify-content-end align-items-start'>
                    

                    <WishListButton   products={products}/>
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
                    
                    <CartListButton products={products}/>
                    </div>
                </div>
            </MDBCardOverlay>
        </MDBCard>
    </div>




    </>
  )
}

export default ProductCard