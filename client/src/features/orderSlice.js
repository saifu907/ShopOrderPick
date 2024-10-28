import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'order',
    initialState: [],
    reducers:{
        addtoOrderList:(state,action)=>{
            state.push(action.payload)

        }

    }

})
export const {addtoOrderList}=orderSlice.actions
export default orderSlice.reducer