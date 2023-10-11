import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/AxiosClient";


export const getProducts=createAsyncThunk('product/getproducts',async ()=>{
    try {
        const response=await axiosClient.get('/product/getproducts');
        
        return response.data.products;
        
    } catch (error) {
        console.log(error);
    }
})


const appConfigSlice=createSlice({
    name: 'appConfigSlice',
    initialState:{
        products:[

        ]
    },

    extraReducers:(builder)=>{
        builder.addCase(getProducts.fulfilled,(state,action)=>{
           
            state.products=action.payload;
           
        })
    },
    
})

export default appConfigSlice.reducer;

export const{getUser}=appConfigSlice.actions;