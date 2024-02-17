import { createAsyncThunk,createSlice,createAction } from "@reduxjs/toolkit";
import factoryService  from "../factory/factoryService"

export const getFactories = createAsyncThunk("factory/all-factory",async(thunkAPI)=>{

    try{
        return await factoryService.getFactories()

    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }

})

export const createFactory= createAsyncThunk("factory/create-factory",async(factory,thunkAPI)=>{
    try{
        return await factoryService.createFactory(factory)
    }catch(error)
    {
       
        return thunkAPI.rejectWithValue(error)
    }
})
export const getSingleFactory= createAsyncThunk("category/get-category",async(id,thunkAPI)=>{
    try{
        return await factoryService.getSingleFactory(id)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const updateFactory= createAsyncThunk("factory/update-factory",async(factory,thunkAPI)=>{
    try{
        return await factoryService.updateFactory(factory)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const deleteFactory= createAsyncThunk("factory/delete-factory",async(id,thunkAPI)=>{
    try{
        return await factoryService.deleteFactory(id)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})

const initialState ={
    factories : [],
    singleFactory : [],
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : ""
}
export const resetState = createAction("Reset_all");

export const factorySlice = createSlice({
    name : "factory",
    initialState,
    reducers : {},
    extraReducers : (builder) =>{
        builder
        .addCase(getFactories.pending,(state)=>{
            state.isLoading = true
        }).addCase(getFactories.fulfilled, (state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.factories = action.payload
        }).addCase(getFactories.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(createFactory.pending,(state)=>{
            state.isLoading = true
        }).addCase(createFactory.fulfilled, (state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.createdFactory = action.payload 
            
        }).addCase(createFactory.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(getSingleFactory.pending,(state)=>{
            state.isLoading = true
        }).addCase(getSingleFactory.fulfilled, (state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.singleFactory = action.payload
        }).addCase(getSingleFactory.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(updateFactory.pending,(state)=>{
            state.isLoading = true
        }).addCase(updateFactory.fulfilled, (state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.updatedFactory = action.payload
        }).addCase(updateFactory.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(deleteFactory.pending,(state)=>{
            state.isLoading = true
        }).addCase(deleteFactory.fulfilled, (state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.deletedFactory = action.payload
        }).addCase(deleteFactory.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        .addCase(resetState, () => initialState);
    }
})

export default factorySlice.reducer