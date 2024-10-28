const express =require('express');
const router =new express.Router();
const usercontroller=require('../Controller/UserController')
const productcontroller=require('../Controller/ProductController')
const chatController=require('../Controller/ChatController')
const jwtMiddleware=require('../Middlewares/jwtMiddleware')
const multerConfig=require('../Middlewares/MulterMiddleware')

router.post('/user/registor',usercontroller.register)
router.post('/shop/registor',usercontroller.shopRegister)
router.post('/user/login',usercontroller.login)
router.post('/addProducts',jwtMiddleware,multerConfig.single('productimage'),productcontroller.addProducts)

router.get('/allproducts',productcontroller.getAllProducts)
router.get('/aproducts/:id',productcontroller.getAProducts)

router.put('/editshopprofile',jwtMiddleware,multerConfig.single('profileimage'),usercontroller.editshopprofile)



router.get('/shopproducts',jwtMiddleware,productcontroller.getshopProducts)

router.get('/shops',usercontroller.getshops)
router.get('/shopprofile',jwtMiddleware,usercontroller.getshopprofile)

router.get('/shopsdata',usercontroller.getshopsdata)



router.put('/user/orderhistory',jwtMiddleware, usercontroller.addOrderHistory);
router.get('/orders',jwtMiddleware,usercontroller.orders)
router.get('/shoporders',jwtMiddleware,usercontroller.shopOrders)
router.get('/customerdata',usercontroller.customerdata)
router.put('/updatestatus',usercontroller.updateStatus)
router.delete('/deleteproduct',productcontroller.deleteAProduct)

router.get('/shopsproduct/:id',productcontroller.getAllShopProducts)

router.post('/chats',chatController.createChats)
router.get('/chats/all',jwtMiddleware,chatController.getAllUserChats)
router.post('/message',chatController.createMessage)
router.get('/message/:conversationId',chatController.getMessage)




module.exports = router    