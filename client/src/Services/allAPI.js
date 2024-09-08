import { commonAPI } from './commonAPI';
import { SERVER_URL } from './server_url';




export const registerAPI=async (users)=>{
    return await commonAPI('POST',`${SERVER_URL}/user/registor`,users,'');
    
}
export const registerShopAPI=async (users)=>{
    return await commonAPI('POST',`${SERVER_URL}/shop/registor`,users,'');
    
}
export const loginAPI=async (users)=>{
    return await commonAPI('POST',`${SERVER_URL}/user/login`,users,'');
    
}

export const addProductAPI=async (reqBody,reqHeader)=>{
    return await commonAPI('POST',`${SERVER_URL}/addproducts`,reqBody,reqHeader);
    
}
export const getShopProductAPI=async (reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/shopproducts`,"",reqHeader);
}

export const getProductAPI=async (searchKey)=>{
    return await commonAPI('GET',`${SERVER_URL}/allproducts?search=${searchKey}`,"","");
    
}

export const getAproductAPI=async (id)=>{
    return await commonAPI('GET',`${SERVER_URL}/aproducts/${id}`,"","");
    
}

export const getAllShopProductsAPI=async (id)=>{
    return await commonAPI('GET',`${SERVER_URL}/shopsproduct/${id}`,"","");
    
}
export const addOrderAPI = async (orderData, reqHeader) => {
    return await commonAPI('PUT', `${SERVER_URL}/user/orderhistory`, orderData, reqHeader);
}

export const getOrderDataAPI=async (reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/orders`,"",reqHeader);
}
export const getShopOrderAPI=async (reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/shoporders`,"",reqHeader);
}

export const getCustomerDataAPI=async (id)=>{
    return await commonAPI('GET',`${SERVER_URL}/customerdata`,id,'');
}
export const updateStatusAPI=async(id,updateStatus)=>{
    return await commonAPI('PUT',`${SERVER_URL}/updatestatus`,{id,updateStatus},'');
}

export const deleteProductAPI = async (productId) => {
    return await commonAPI('DELETE',`${SERVER_URL}/deleteproduct`,{productId},'');
};

export const getAllShopAPI=async (searchKey)=>{
    return await commonAPI('GET',`${SERVER_URL}/shops?search=${searchKey}`,"",'');
}

export const getShopProfileAPI=async (reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/shopprofile`,"",reqHeader);
}
export const editShopProfileAPI=async (reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${SERVER_URL}/editshopprofile`,reqBody,reqHeader);
}

export const getUserChatsAPI=async (reqHeader)=>{
    return await commonAPI('get',`${SERVER_URL}/chats/all`,'',reqHeader);
}

export const getMessageAPI=async (id)=>{
    return await commonAPI('get',`${SERVER_URL}/message/${id}`,'','');
}

export const sendMessageAPI=async (reqbody)=>{
    return await commonAPI('post',`${SERVER_URL}/message`,reqbody,'');
}

export const createNewChatAPI=async (newConversationData)=>{
    return await commonAPI('post',`${SERVER_URL}/chats`,newConversationData,'');
}