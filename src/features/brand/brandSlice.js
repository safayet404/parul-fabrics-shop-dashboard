import { createSlice,createAsyncThunk,createAction} from "@reduxjs/toolkit";
import brandService from "./brandService";

export const getBrands = createAsyncThunk ("brand/all-brands",async(thunkAPI)=>{
    try{

        return await brandService.getBrands()

    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getABrand = createAsyncThunk ("brand/get-brand",async(id,thunkAPI)=>{
    try{

        return await brandService.getABrand(id)

    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const createBrands = createAsyncThunk ("brand/create-brands",async(brandData,thunkAPI)=>{
    try{

        return await brandService.createBrands(brandData)

    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const updateBrand = createAsyncThunk ("brand/update-brand",async(brand,thunkAPI)=>{
    try{

        return await brandService.updateBrand(brand)

    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const deleteBrand = createAsyncThunk ("brand/delete-brand",async(id,thunkAPI)=>{
    try{

        return await brandService.deleteBrand(id)

    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})

const initialState = {
    brands : [],
    isError : false,
    isLoading : false,
    isSuccess : false,
    message : "",
    createdBrands : []
}
export const resetState = createAction("Reset_all");

export const brandSlice = createSlice( {
    name : "brands",
    initialState,
    reducers : {},
    extraReducers : (builder) =>{
        builder
        .addCase(getBrands.pending, (state)=>{
            state.isLoading = true
        }).addCase(getBrands.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.brands = action.payload
        }).addCase(getBrands.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(createBrands.pending, (state)=>{
            state.isLoading = true
        }).addCase(createBrands.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.createdBrands = action.payload
        }).addCase(createBrands.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(getABrand.pending, (state)=>{
            state.isLoading = true
        }).addCase(getABrand.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.brandName = action.payload.title
          
        }).addCase(getABrand.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        }) 
        .addCase(updateBrand.pending, (state)=>{
            state.isLoading = true
        }).addCase(updateBrand.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.updatedBrand = action.payload
          
        }).addCase(updateBrand.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        }) 
        .addCase(deleteBrand.pending, (state)=>{
            state.isLoading = true
        }).addCase(deleteBrand.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.deletedBrand = action.payload.title
          
        }).addCase(deleteBrand.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        }) 
        
        .addCase(resetState, () => initialState);
       
    }
})

export default brandSlice.reducer