import React, { useEffect, useState } from 'react'
import { MDBInput,MDBTextArea,MDBBtn } from 'mdb-react-ui-kit';
import { editShopProfileAPI, getShopProfileAPI } from '../Services/allAPI';
import { SERVER_URL } from '../Services/server_url';

function Profile() {
  const [shopData,setShopdata]=useState({profileimage:''})
const [preview,setPreview] = useState()

  console.log(shopData);
  

  

 const getShopProfile =async()=>{
   
   const token=sessionStorage.getItem('token')
   if(token){
     const reqHeader={
       'Content-Type': 'multipart/form-data',
       'Authorization':`Bearer ${token}`
      }
      
      
  const result = await getShopProfileAPI(reqHeader)
  if(result.status===200){
    setShopdata(result.data)


console.log(shopData);

    
  }else{
    console.log(reqHeader)
  }
}
}
useEffect(()=>{
  getShopProfile()
},[])
useEffect(()=>{

  if(shopData?.profileimage){
    console.log(shopData.profileimage);
    
    if (typeof shopData.profileimage === 'string') {
      setPreview(`${SERVER_URL}/uploads/${shopData.profileimage}`)
    }
}else{
  setPreview("https://cdn-icons-png.flaticon.com/512/149/149071.png");
}

}, [shopData]);


    const handleEdit=async()=>{
        const {profileimage,username,shopname,shopaddress}=shopData
        if(!username||!shopname||!shopaddress){
          alert(`empty space`)
        }else{
    
          const reqBody=new FormData()
          reqBody.append('username',username)
          reqBody.append('shopname',shopname)
          if (profileimage instanceof File) {
            reqBody.append('profileimage', profileimage);
          }
          
          reqBody.append('shopaddress',shopaddress)
          const token=sessionStorage.getItem('token')
          if(token){
            
              const reqHeader={
                'Content-Type': 'multipart/form-data',
                'Authorization':`Bearer ${token}`
              }

            
            try{
              const result =await editShopProfileAPI(reqBody,reqHeader)
              if(result.status === 200){
                alert('successfully updated')

    
    
              }else{
                alert('error'+result.response.data)
              }
    
            }catch(e){
                alert(e)
            }
          }else{
            console.log('not user');
          }
    
    
        }
      }
    const handleImage = (e) => {
      const file = e.target.files[0];
      console.log(file);
      
      if (file) {
        setShopdata({ ...shopData, profileimage: file });
        setPreview(URL.createObjectURL(file));
      }
    };

  return (
    <>  
    <div>
      <div className='d-flex align-items-center justify-content-center mt-2' >
          <div className="editimg" style={{position:'relative'}}>
      <label className='w-100 d-flex align-items-center justify-content-center flex-column mb-3 ' >
      <input className='' type="file" onChange={handleImage} style={{display:'none'}}  />
            <img width={'200px'} height={'200px'} style={{objectFit:'cover'}}  className='rounded-circle mb-3'  src={preview} alt="" />
            <i class="fa-solid fa-pen"></i>
      
        </label>
          </div>
      
      </div>
      <div className='d-flex flex-column gap-5 m-4'>
        <MDBInput value={shopData?.username} onChange={e=>setShopdata({...shopData,username:e.target.value})} label="username" id="formCounter" maxLength="20" showCounter={true} />
        <MDBInput value={shopData?.shopname} onChange={e=>setShopdata({...shopData,shopname:e.target.value})} label="Shop Name" id="formCounter" maxLength="20" showCounter={true} />
        <MDBTextArea value={shopData?.shopaddress} onChange={e=>setShopdata({...shopData,shopaddress:e.target.value})} label="shop Address" id="textAreaExample" rows="{4}" />
      </div>
      <div className=' d-flex align-items-center justify-content-end '>

      <MDBBtn onClick={handleEdit} className='m-2 px-5' color='success me-5 py-3 rounded-pill'>Save</MDBBtn> 
      </div>

      
      
    </div>
    </>
  )
}

export default Profile