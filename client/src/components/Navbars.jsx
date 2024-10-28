import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
  MDBInput,
  } from 'mdb-react-ui-kit';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI, registerShopAPI } from '../Services/allAPI';
import  { useAuth } from '../Auth/AuthContext';


function Navbars({setShoplogin,setIsLoggedIn, isloggedIn}) {
  const { isLoggedIn, loginUser, logout } = useAuth();
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
  // const [isloggedIn,setIsLoggedIn]= useState(false)
  

  
  const handleLogout = () => {
    logout(); // Call the hook's logout function
    
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserdata({ ...userData, [name]: value });
  };

  const signIn =async () => {
    const {emailuser,password}=userData
    if (!emailuser||!password) {
      toast.info('Please fill all fields')
    }else{
      try{
        const result =await loginAPI({emailuser,password})
        if(result.status===200){
          
            loginUser(result.data); // Call the hook's login function
            setTimeout(() => {
              setCentredModal(false)
              navigate('/')
  
            }, 2000)


          
          
          resetForm()
          
         

        }else{
          toast.error("User not Found") 
        }
      }catch(err){
        toast.error(`Could not login: error: ${err}`)
      }
  }
  };

  const register =async () => {
      const {username,email,password}=userData
      if (!email||!password||!username) {
      toast.info('Please fill all fields')

      }else{
        try{
          const result =await registerAPI({username,email,password});
          console.log(result);
          if(result.status===200){
            resetForm()
            
            setloggedIn(true)
            toast.success('User Registered Successfully')
          }else{
            toast.error('User Already Exists...')
          }
        }catch(err){
          toast.error(`Could not register:${err}`)
        }
    }
  };

  const registertoShop =async () => {
    const {username,email,password,shopname,shopaddress}=userData
    if (!email||!password||!username||!shopname||!shopaddress) {
      toast.info('Please fill all fields')
      
    }else{
      try{
        const result =await registerShopAPI({username,email,password,shopname,shopaddress});
        console.log(result);
        if(result.status===200){
          
          resetForm()
          setloggedIn(true)
          toast.success('User Registered Successfully')
        }else{
          toast.error('User Already Exists...')
        }
      }catch(err){
        toast.error(`Could not register:error:${err}`)
      }
  }
};
console.log(isLoggedIn);


  const renderFields = () => {
    if (loggedIn) {
      return(
      <>
      <MDBInput name="emailuser" required onChange={handleInputChange} value={userData.emailuser} className='mt-3'  label="email or username"  type="text" /> 
      <MDBInput name="password" required onChange={handleInputChange}  value={userData.password} className='mt-3' label="password"  type="password" />
      <MDBBtn onClick={(e) => signIn(e)}  className='w-100 p-2 mt-3 '>Sign In</MDBBtn>
      
      </>
      )



    }
    else if (isShopOwner) {
      return (
        <>
      
          <MDBInput name="username" required  onChange={handleInputChange} value={userData.username} className='mt-3'   label="enter username"  type="text" /> 
          <MDBInput name="email" required onChange={handleInputChange } value={userData.email} className='mt-3'  label="enter email"  type="text" /> 
          <MDBInput name="shopname" required onChange={handleInputChange} value={userData.shopname} label="Shop Name" type="text" className='mt-3' />
          <MDBInput name="shopaddress" required onChange={handleInputChange} value={userData.shopaddress} label="Shop Address" type="text" className='mt-3' />
          <MDBInput name="password"  required onChange={handleInputChange}  value={userData.password} className='my-3' label="password"  type="password" />

          <MDBBtn onClick={registertoShop}  className='w-100 p-2 mb-3 '>Register</MDBBtn>
          {isShopOwner&&(
                      <p className='text-secondary'>User? <button  onClick={()=>setIsShopOwner(false)} className="btn btn-primary rounded-pill">Registor</button></p>)
        }


        </>
      );
    }else{
      return(

      <>
       
          <MDBInput name="email" required onChange={handleInputChange} value={userData.email} className='mt-3'  label="enter email"  type="text" /> 
          <MDBInput name="username" required onChange={handleInputChange} value={userData.username} className='mt-3'   label="enter username"  type="text" /> 
          <MDBInput name="password" required onChange={handleInputChange}  value={userData.password} className='my-3' label="password"  type="password" />
          <MDBBtn onClick={register}  className='w-100 p-2 mb-3 '>Register</MDBBtn>
          
          
          {!isShopOwner&&(
                      <p className='text-secondary'>ShopOwner? <button  onClick={()=>setIsShopOwner(true)}  className="btn btn-primary rounded-pill">Registor</button></p>)
        }



        </>
      )
      

    }
  };
  

  


  return (
    <>
      <ToastContainer />
            
                {isLoggedIn?
                
                  <div className="d-flex align-items-center justify-content-center btn bg-dark text-light shadow-5 mx-3 gap-2" onClick={handleLogout}>
                    <i class="fa-solid fa-user"></i><span className='d-none d-sm-inline'> Logout</span>
                  </div>:
                  <div className="d-flex align-items-center justify-content-center btn bg-dark text-light shadow-5 mx-3 gap-2" onClick={toggleOpen}><i class="fa-solid fa-user"></i> <span className='d-none d-sm-inline'>Login</span>
                  </div>
                  }
    

          

      <MDBModal tabIndex='-1' open={centredModal} onClose={() => {setCentredModal(false);setloggedIn(true)}}>
        <MDBModalDialog size="lg" >
          <MDBModalContent>
            
            <MDBModalBody>
              <div className="mt-4 d-flex justify-content-between ">
                <MDBBtn onClick={() =>{ setloggedIn(true); resetForm();setIsShopOwner(false)}} color={loggedIn?'primary':'secondary'}  className='w-100 p-3 mx-2'>
                        LOGIN
                      </MDBBtn>
                      <MDBBtn onClick={() => {setloggedIn(false); resetForm();}} color={loggedIn?'secondary':'primary'} className=' w-100 p-3 mx-2'>
                        REGISTOR
                      </MDBBtn>
              </div>
              <div className='my-3'>
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