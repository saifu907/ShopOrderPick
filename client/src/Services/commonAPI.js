import axios from 'axios';



export const commonAPI = async (httpMethod,url,reqBody,reqHeader) => {
    let reqConfig={
        method:httpMethod,
        url,
        data:reqBody,

        headers:reqHeader?reqHeader:{
            "Content-Type": "application/json"
        },
        
    }
    return await axios(reqConfig).then((res) =>{
    return res}).catch((error) => {return error})
}
