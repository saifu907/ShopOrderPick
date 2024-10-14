import React, { useEffect, useState } from 'react'
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
            </tbody>
          </table>
     </div>
    
    </>
  )
}

export default Orders