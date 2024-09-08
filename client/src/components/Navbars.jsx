import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { MDBBadge, MDBIcon,MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBInput,
  MDBModalFooter } from 'mdb-react-ui-kit';
import { loginAPI, registerAPI, registerShopAPI } from '../Services/allAPI';

function Navbars({setShoplogin}) {
  const navigate=useNavigate()
  const initialUserData = {
    username: '',
    emailuser: '',
    email: '',
    password: '',
    shopname: '',
    shopaddress: ''
  };
  
  const [userData,setUserdata]= useState(initialUserData)
  const resetForm = () => {
    setUserdata(initialUserData);
  };
  

  const [centredModal, setCentredModal] = useState(false);
  const toggleOpen = () => setCentredModal(!centredModal);

  const [isShopOwner, setIsShopOwner] = useState(false);
  const [loggedIn, setloggedIn] = useState(true);
  const [isloggedIn,setIsLoggedIn]= useState(false)
  
  useEffect(() =>{
    if(sessionStorage.getItem("token")){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
    
  },[isloggedIn,isShopOwner])
  const handlelogout=() =>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("shopname")
    setIsLoggedIn(false)
    navigate('/')
    window.location.reload();
  }



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserdata({ ...userData, [name]: value });
  };

  const signIn =async () => {
    const {emailuser,password}=userData
    if (!emailuser||!password) {
      alert('Please enter')
    }else{
      try{
        const result =await loginAPI({emailuser,password})
        if(result.status===200){
          if(result.data.existingUser){
            sessionStorage.clear();
            setShoplogin(false)
            
            sessionStorage.setItem('username',result.data.existingUser.username)
            sessionStorage.setItem('token',result.data.token)
          
          }else if(result.data.existingShop){
            sessionStorage.clear();
            setShoplogin(true)
            sessionStorage.setItem('shopname',result.data.existingShop.username)
          sessionStorage.setItem('token',result.data.token)


          }else{
            console.log('kkkk');
            
          }
          
          alert(`Successfully logged in${result}`)
          
         setloggedIn(true)
         setIsLoggedIn(true)
          resetForm()
          
          setTimeout(() => {
            setCentredModal(false)
            navigate('/')

          }, 2000)
        }
      }catch(err){
        alert(`Could not register:error:${err}`)
      }
  }
  };

  const register =async () => {
      const {username,email,password}=userData
      if (!email||!password||!username) {
        alert('Please enter')
      }else{
        try{
          const result =await registerAPI({username,email,password});
          console.log(result);
          if(result.status===200){
            alert('Register Success1')
            setUserdata({username:'',email:'',password:''})
            setloggedIn(true)
          }
        }catch(err){
          alert(`Could not register:error:${err}`)
        }
    }
  };

  const registertoShop =async () => {
    const {username,email,password,shopname,shopaddress}=userData
    if (!email||!password||!username||!shopname||!shopaddress) {
      alert('Please enter')
    }else{
      try{
        const result =await registerShopAPI({username,email,password,shopname,shopaddress});
        console.log(result);
        if(result.status===200){
          alert('Register Success')
          resetForm()
          setloggedIn(true)
        }
      }catch(err){
        alert(`Could not register:error:${err}`)
      }
  }
};
  const renderFields = () => {
    if (loggedIn) {
      return(
      <>
      <MDBInput name="emailuser" onChange={handleInputChange} value={userData.emailuser} className='mt-3'  label="email or username"  type="text" /> 
      <MDBInput name="password" onChange={handleInputChange}  value={userData.password} className='mt-3' label="password"  type="password" />
      <MDBBtn onClick={signIn}  className='w-100 p-2 mt-3 '>Sign In</MDBBtn>
      </>
      )



    }
    else if (isShopOwner) {
      return (
        <>
          <MDBInput name="username" onChange={handleInputChange} value={userData.username} className='mt-3'   label="enter username"  type="text" /> 
          <MDBInput name="email" onChange={handleInputChange } value={userData.email} className='mt-3'  label="enter email"  type="text" /> 
          <MDBInput name="shopname" onChange={handleInputChange} value={userData.shopname} label="Shop Name" type="text" className='mt-3' />
          <MDBInput name="shopaddress" onChange={handleInputChange} value={userData.shopaddress} label="Shop Address" type="text" className='mt-3' />
          <MDBInput name="password" onChange={handleInputChange}  value={userData.password} className='mt-3' label="password"  type="password" />
          <MDBInput name="" label="Confirm Password" type="password" className='my-3' />
          <MDBBtn onClick={registertoShop}  className='w-100 p-2 mb-3 '>Register</MDBBtn>
          {isShopOwner&&(
                      <p>User?<button  onClick={()=>setIsShopOwner(false)} className="btn-primary">Registor</button></p>)
        }


        </>
      );
    }else{
      return(

      <>
          <MDBInput name="email" onChange={handleInputChange} value={userData.email} className='mt-3'  label="enter email"  type="text" /> 
          <MDBInput name="username" onChange={handleInputChange} value={userData.username} className='mt-3'   label="enter username"  type="text" /> 
          <MDBInput name="password" onChange={handleInputChange}  value={userData.password} className='mt-3' label="password"  type="password" />
          <MDBInput name="" label="Confirm Password" type="password" className='my-3' />
          <MDBBtn onClick={register}  className='w-100 p-2 mb-3 '>Register</MDBBtn>
          {!isShopOwner&&(
                      <p>ShopOwner?<button  onClick={()=>setIsShopOwner(true)} className="btn-primary">Registor</button></p>)
        }



        </>
      )
      

    }
  };
  

  


  return (
    <>
      
        
          <div className="d-flex align-items-center justify-content-center mx-3">
            
                {isloggedIn?
                  <div className="d-flex align-items-center justify-content-center btn bg-dark text-light shadow-5 w-100 gap-2" onClick={handlelogout}><i class="fa-solid fa-user"></i> Logout</div>:<div className="d-flex align-items-center justify-content-center btn bg-dark text-light shadow-5 w-100 gap-2" onClick={toggleOpen}><i class="fa-solid fa-user"></i> Login</div>
                  }
          </div>

          

      <MDBModal tabIndex='-1' open={centredModal} onClose={() => {setCentredModal(false);setloggedIn(true)}}>
        <MDBModalDialog size="lg" >
          <MDBModalContent>
            
            <MDBModalBody>
              <div className="mt-4 d-flex justify-content-between mt-4 ">
                <MDBBtn onClick={() =>{ setloggedIn(true); resetForm();setIsShopOwner(false)}} color={loggedIn?'primary':'secondary'}  className='w-100 p-3 mx-2'>
                        LOGIN
                      </MDBBtn>
                      <MDBBtn onClick={() => {setloggedIn(false); resetForm();}} color={loggedIn?'secondary':'primary'} className=' w-100 p-3 mx-2'>
                        REGISTOR
                      </MDBBtn>
              </div>
              <div className='my-5 '>
              
                {renderFields()}
          
          </div>
              
                      
      
              

              
            </MDBModalBody>
            
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>


   


    
    </>
  )

}
export default Navbars