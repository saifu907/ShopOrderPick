import {createSlice} from "@reduxjs/toolkit"
const cartSlice= createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        addToCart:(state,action)=>{
            state.push(action.payload)
        },
        removeFromCart:(state,action)=>{
            return state.filter(item=>item._id!=action.payload)
        },
        emptyCart:(state)=>{
            return state=[]
        },
        updateCart: (state, action) => {
            const { _id, quantity } = action.payload;
            const item = state.find(item => item._id === _id);
            if (item) {
              item.quantity = quantity;
            }
        }
    }
    
})

export const{addToCart,removeFromCart,emptyCart,updateCart}=cartSlice.actions
export default cartSlice.reducer