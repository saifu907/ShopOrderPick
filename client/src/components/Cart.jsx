import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'


import { Button} from 'react-bootstrap'
import { emptyCart, removeFromCart,updateCart } from '../features/cartSlice'
import { addOrderAPI } from '../Services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { defaultProductImage } from '../assets/defaultImg'



function Cart() {
  

  
  const cartArray=useSelector((state)=>state.cartReducer)
  
  const dispatch  =useDispatch()
  const navigate= useNavigate()


  const [total,setTotal]=useState(0)
  



  const getCartTotal=()=>{
    if(cartArray.length>0){
      setTotal(cartArray.map(item=>(item.price*(item.quantity))).reduce((p1,p2)=>p1+p2,0))
      console.log(total)
    }else{
      setTotal(0)
    }

  }
  useEffect(() => {
    getCartTotal();
  }, [cartArray])
  console.log(total)
  useEffect(()=>{
    getCartTotal()
  },[cartArray])

  const handleCart=async()=>{
    const orderTime = new Date();
    const formattedTime = orderTime.toLocaleString()

    console.log(orderTime)
    console.log(formattedTime)
    const orderData = {
      cartItems: cartArray.map(item => ({
          productId: item._id,
          label: item.label,
          price: item.price,
          quantity: item.quantity,
          shopid:item.shopid,
          orderTime: formattedTime,
          
      }))
      
    }
    console.log([orderData]+" order");

  try{
    const token= sessionStorage.getItem('token');
    const reqHeader={
      "Content-Type": "application/json",

      
      'Authorization':`Bearer ${token}`
    }
    const result =await addOrderAPI(orderData,reqHeader)
          if(result.status === 200){

            dispatch(emptyCart());
            toast.success('Order Placed')


          }else{
            toast.error('User is not Logged in')
          }


  }catch(e){
    toast.error(`Error ${e.message}`)

  }
    

  }
 
  const increaseQuantity = (_id) => {
    
      const cart=cartArray.find((item) =>item._id === _id)
      if(cart){
        dispatch(updateCart({ _id, quantity: cart.quantity+1}))


      }
  
  
  };
  console.log(cartArray);
  const decreaseQuantity =(_id)=>{
    
    
    const cart=cartArray.find((item) =>item._id === _id)
    if(cart){
      dispatch(updateCart({ _id, quantity: cart.quantity-1||1}))


    }
  

  }
  return (
  <>
  <ToastContainer/>

    {
    cartArray.length>0?
    <div style={{position:'relative',marginBottom:'300px'}} className=''>


    <div className="ps-3 table-responsive">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Cart{cartArray.length>0?`(${cartArray.length})`:null}</h1>
        <button onClick={()=>dispatch(emptyCart())} className='  btn '>Clear all</button>
      </div>

        <table className='table'>
          <thead>
          <tr>
      
          <th>PRODUCT</th>
          <th></th>
          <th>price</th>
          <th width={'150px'}>QUANTITY</th>
          <th>TOTAL</th>
          <th width={'5px'} className='p-0'></th>
          </tr>
          </thead>
          <tbody>
          {
            cartArray.slice().reverse().map((product,index)=>(
              <tr key={index} className=''>
                <td className=''><img height={'120px'} width={'100px'} src={`${product.productimage}`} onError={(e) => e.target.src = defaultProductImage} alt="" /></td>
                <td className='text-center align-middle'>{product.label}</td>
                <td className='text-center align-middle'>Rs {product.price}</td>
                <td className='text-center align-middle'><div className="rounded-pill bg-secondary d-flex align-items-center justify-content-center "><i class="fa-solid fa-minus btn p-2 m-0" onClick={() => decreaseQuantity(product._id)}></i>{product.quantity||1}<i class="fa-solid fa-plus btn p-2 " onClick={() => increaseQuantity(product._id)} ></i></div></td>
                <td className='text-center align-middle px-0'>Rs {product.price*product.quantity||product.price}</td>
                <td width={'5px'}  className='text-center align-middle p-0'><Button onClick={()=>dispatch(removeFromCart(product._id))} style={{width:'10px'}} className='btn btn-light rounded-circle d-flex align-itms-center justify-content-center'><i class="fa-solid fa-xmark"></i></Button></td>
              </tr>
            ))
          }
          </tbody>
      
        </table>
    </div>
         


        <div style={{position:'fixed',bottom:'0px',right:'auto',left:'0px',width:'100%'}}>
            <div className="d-flex align-items-end justify-content-center bg-light flex-column me-5 pe-2  pt-4">
              <table className='me-5 pe-5'>
                <thead>
                  <tr>
                    <th></th>
                    <th>Total Price: </th>
                    <td className='px-3'>{'$'+total}</td>
                    <th></th>
                    <th></th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tr>
                </tbody>
                
              </table>
              <div className="me-5 mb-5">
                <Link to={'/'} className='me-5 line fs-5'>  <i class="fa-solid fa-arrow-left-long"></i> Home</Link>
              <button onClick={handleCart} className='btn btn-primary  mt-5 '>Order</button>
            </div>
            </div>
          
        </div>

</div>:
    
    <div className="w-100 d-flex flex-column justify-content center align-items-center mt-5 pt-5">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYjhcG-tcVCpdyHukFOGZLaInyXFejYzMENQ&s" alt="" />
    <Link to={'/'}className='btn btn-warning rounded'>Back to Home</Link>
  </div>

}
<div></div>
</>

  )
}

export default Cart