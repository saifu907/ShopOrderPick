import React, { useEffect, useState } from 'react'
import { getCustomerDataAPI, getShopOrderAPI, updateStatusAPI } from '../Services/allAPI';
import Form from 'react-bootstrap/Form';

function Shoporder() {
  const [orders, setOrders] = useState([]);
  const [customerData, setCustomerData] = useState({});
  

  const getUserData =async()=>{
    const token=sessionStorage.getItem('token')
    if(token){
      const reqHeader={
        "Content-Type": "application/json",
  
        
        'Authorization':`Bearer ${token}`
      }
    
    const result = await getShopOrderAPI(reqHeader)
    if(result.status===200){
    
    const cartArray = result.data;
    setOrders(cartArray);
    


    const customerIds=[...new Set(cartArray.map(order => order.customerid))]
    const customerPromises = customerIds.map(id => getCustomerDataAPI(id));
    const customerResult = await Promise.all(customerPromises)
    
    const customerIdData = customerResult.reduce((acc, result) => {
      if (Array.isArray(result.data)) {  // Check if result.data is an array
        result.data.forEach(customer => {  // Iterate through the array to get each customer
          if (customer._id) {  // Ensure customer has an _id
            acc[customer._id] = customer;  // Map customer _id to customer data
          }
        });
      } else {
        console.warn('Invalid customer data:', result);  // Log if resul
      }
      return acc;
    }, {});
    
    setCustomerData(customerIdData)
    
    
      
  
    }else{
      console.log(reqHeader.data)
    }
  }
  }
  
  useEffect(()=>{
    getUserData()

  },[])
  const handleStatusChange=async(id,statusUpdate) => {
    
    try {
      
        const statusReq= await updateStatusAPI(id,statusUpdate)
      if (statusReq.status===200) {

        console.log(statusReq);
        
        
      }else{
        console.log('error');
        
      }
      

    }catch(e) {
      console.log(e);
      
    }
  }
  
  return (
    <>
     <div className="m-0 table-responsive">
       <table className='table '>
            <thead >
            <tr>
       
            <th>ORDERS</th>
            <th>TIME</th>
            <th>ITEM</th>
            <th>PRICE</th>
            <th>TOTAL</th>
            <th>CUSTOMER</th>
            <th>PICKUP</th>
       
            </tr>
            </thead>
            <tbody>
            {orders.slice().reverse().map((order, index) => (
       
       
                <tr key={index}>
                  <td className=''>{index + 1}</td>
                  <td>{order.orderTime}</td>
                  <td>{order.label}</td>
                  <td className=''> ({order.price})x({order.quantity})</td>
                  <td className=''>{order.price * order.quantity}</td>
                  <td className=''>{customerData[order.customerid]?.username}</td>
                  <td>
                  <Form.Select aria-label="Default select example"
                  defaultValue={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)} >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
           </Form.Select>
                  </td>
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

export default Shoporder