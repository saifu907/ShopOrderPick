import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../Services/server_url'
import { getOrderDataAPI } from '../Services/allAPI'

function Orders() {
  const [orderHistory, setOrderHistory] = useState([]);

  const getUserData =async()=>{
    const token=sessionStorage.getItem('token')
    if(token){
      const reqHeader={
        "Content-Type": "application/json",
  
        
        'Authorization':`Bearer ${token}`
      }
    
    const result = await getOrderDataAPI(reqHeader)
    if(result.status===200){
    
    const cartArray = result.data;
    setOrderHistory(cartArray);
    console.log(cartArray);
    
      
  
    }else{
      console.log(reqHeader)
    }
  }
  }
  useEffect(()=>{
    getUserData()

  },[])
  
  return (
    <>
     <div className="table-responsive">
       <table className='table'>
            <thead>
            <tr>
       
            <th>ORDERS</th>
            <th>TIME</th>
            <th>ITEM</th>
            <th>PRICE</th>
            <th>TOTAL</th>
            <th>PICKUP</th>
       
            </tr>
            </thead>
            <tbody>
           { orderHistory.slice().reverse().map((order,index) => (
        <tr key={index}>
          <td className=''>{index+1}</td>
          <td>{order.orderTime}</td>
       
          <td>{order.label}</td>
          <td className=''> ({order.price})x({order.quantity})</td>
          <td className=''>{order.price*order.quantity}</td>
          <td className=''>{order.status}</td>
        </tr>
           ))}
       
       
                {/* <tr key={index} className=''>
                  <td className=''><img height={'120px'} width={'100px'} src={`${SERVER_URL}/uploads/${product.productimage}`} alt="" /></td>
                  <td className='text-center align-middle'>{product.label}</td>
                  <td className='text-center align-middle'>Rs {product.price}</td>
                  <td className='text-center align-middle'><div className="rounded-pill bg-secondary d-flex align-items-center justify-content-center w-50"><i class="fa-solid fa-minus btn p-2" onClick={() => decreaseQuantity(product._id)}></i>{product.quantity||1}<i class="fa-solid fa-plus btn p-2 " onClick={() => increaseQuantity(product._id)} ></i></div></td>
                  <td className='text-center align-middle px-0'>Rs {product.price*product.quantity||product.price}</td>
                  <td width={'5px'}  className='text-center align-middle p-0'><Button onClick={()=>dispatch(removeFromCart(product._id))} style={{width:'10px'}} className='btn btn-light rounded-circle d-flex align-itms-center justify-content-center'><i class="fa-solid fa-xmark"></i></Button></td>
                </tr> */}
       
            </tbody>
          </table>
     </div>
    
    </>
  )
}

export default Orders