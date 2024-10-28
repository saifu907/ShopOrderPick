import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice= createSlice({
    name:'wishlist',
    initialState:[],
    reducers:{
        addtowishList:(state,action)=>{
            state.push(action.payload)
        },
        removeFromWishlist:(state,action)=>{
            return state.filter(item=>item._id!=action.payload)
        }
    }
})

export const {addtowishList,removeFromWishlist}=wishlistSlice.actions
export default wishlistSlice.reducer