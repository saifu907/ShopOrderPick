import { configureStore } from "@reduxjs/toolkit"
import whishListSlice from "../features/whishList"
import cartSlice from "../features/cartSlice"
import orderSlice from "../features/orderSlice"


const store = configureStore({
    reducer:{
        whishListReducer:whishListSlice,
        cartReducer:cartSlice,
        orderReducer:orderSlice


    }
})

export default store