import React, { useEffect, useState } from 'react'
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBCardBody,
    MDBIcon,
    MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTextArea,
  MDBInput,MDBInputGroup,
    
    MDBBtn,
    MDBRipple
  } from 'mdb-react-ui-kit';
  import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { addProductAPI, deleteProductAPI, getShopProductAPI } from '../Services/allAPI';

function Shopadmin() {
    const [staticModal, setStaticModal] = useState(false);
    const [fileStatus,setFileStatus] = useState(false)
    const [preview,setPreview] = useState("")
    const [allShopProducts,setallShopProducts]=useState([])


  const toggleOpen = () => setStaticModal(!staticModal);
  const [productModal,setProductModal] = useState({
    productLabel:'',caption:'',image:'',price:0,status:false
  })

  useEffect(() => {
    if(productModal.status){
    if (productModal.image.type=="image/png"||productModal.image.type=="image/jpg"||productModal.image.type=="image/jpeg") {
      setFileStatus(false)
      setPreview(URL.createObjectURL(productModal.image))
      
      
    }else{
      setFileStatus(true)
      setProductModal({...productModal,image:''})
      
    }}
    if(staticModal==false){
      setProductModal({...productModal,image:'',status:false})
      setPreview('')
    }
  },[productModal.image,productModal.status,staticModal])
  console.log(allShopProducts)

  
const getShopProducts =async()=>{
  const token=sessionStorage.getItem('token')
  if(token){
    const reqHeader={
      'Content-Type': 'multipart/form-data',
          'Authorization':`Bearer ${token}`
    }
  
  const result = await getShopProductAPI(reqHeader)
  if(result.status===200){

    setallShopProducts(result.data) 
    
  }else{
    console.log(reqHeader)
  }
}
}



  useEffect(()=>{
    getShopProducts() 

  },[])

  
  const handleAddProduct=async()=>{
    const {productLabel,caption,image,price}=productModal
    if(!productLabel||!caption||!image||!price){
      toast.info(`Fill All Fields`)
    }else{

      const reqBody=new FormData()
      reqBody.append('label',productLabel)
      reqBody.append('caption',caption)
      reqBody.append('productimage',image)
      reqBody.append('price',price)
      const token=sessionStorage.getItem('token')
      if(token){

        const reqHeader={
          'Content-Type': 'multipart/form-data',
          'Authorization':`Bearer ${token}`
        }
        try{
          const result =await addProductAPI(reqBody,reqHeader)
          if(result.status === 200){

            setStaticModal(false)
            getShopProducts() 

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
  

  const handleDelete = async(productId) => {
    console.log(productId);
    
    const result=await deleteProductAPI(productId)
    if (result.status===200) {
    getShopProducts() 
      
      

    }else{
      console.log('error');
      
    }
  }
  return (
    <>
    <div className=' my-3 ps-3 mx-0'>



        
        <div className="d-flex justify-content-between align-items-center">
            <h1>Add Products</h1>
        <MDBBtn onClick={toggleOpen} floating size='lg' tag='a' className='me-4'><MDBIcon fas icon="plus-circle" /></MDBBtn>

                        <MDBModal staticBackdrop tabIndex='-1' open={staticModal} onClose={() => setStaticModal(false)} >
                <MDBModalDialog >
                    <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Enter Product Details</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <label className='w-100 d-flex align-items-center justify-content-center flex-column mb-3 ' style={{height:'300px',borderStyle:'dashed'}}>
                          <input className='' type="file" onChange={e=>setProductModal({...productModal,image:e.target.files[0],status:true})} style={{display:'none'}}  />
                          {preview?(
                          <img width='100%' height='100%' className='' src={preview} alt="" />

                          ):(
                            <div className="d-flex align-items-center justify-content-center flex-column mb-3">
                              <img width='30px' className='' src="https://static.vecteezy.com/system/resources/thumbnails/023/454/938/small_2x/important-document-upload-logo-design-vector.jpg" alt="" />
                                <p>upload a image of the product</p>
                            </div>
                          )}
                          
                          {fileStatus&& <p className='text-danger'>Please upload (png,jpg,jpeg) formate</p>}
                        </label>
                        <MDBInput label="Product label"  onChange={e=>setProductModal({...productModal,productLabel:e.target.value})} id="formCounter" maxLength="20" showCounter={true}  />
                        <MDBTextArea label="Caption" onChange={e=>setProductModal({...productModal,caption:e.target.value})} id="textAreaExample" rows="{4}"  className='mt-4'/>
                        <MDBInputGroup onChange={e=>setProductModal({...productModal,price:e.target.value})} noWrap textBefore='₹' className='my-3'>
      <input className='form-control' type='number' placeholder='Price' />
    </MDBInputGroup>
             
                        
                        
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={toggleOpen}>
                        Close
                        </MDBBtn>
                        <MDBBtn onClick={handleAddProduct}>Add Product</MDBBtn>
                    </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
                </MDBModal>

        </div>
        
          <div className="row m-0">
            
            
          {allShopProducts.length>0?allShopProducts.slice().reverse().map((products,index)=>(
            <div className="col-sm-3 " key={index}>
            <MDBCard style={{height:'400px'}}>
      <MDBRipple  rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
        <MDBCardImage style={{height:'200px',objectFit:'fill'}}  src={`${products.productimage}`} fluid alt='...' />
        <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a>
      </MDBRipple>
      <MDBCardBody >
        <MDBCardTitle>{products.label}</MDBCardTitle>
        <MDBCardText style={{height:'70px',overflow:'hidden'}}>
        {products.caption}
        </MDBCardText>
        <MDBBtn onClick={()=>handleDelete(products._id)}>Delete</MDBBtn>
      </MDBCardBody>
    </MDBCard>
            </div>


          )):null
            

            }
          </div>
    </div>
    </>
  )
}

export default Shopadmin