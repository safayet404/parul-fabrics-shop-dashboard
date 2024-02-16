import { createAsyncThunk,createSlice,createAction } from "@reduxjs/toolkit";
import balanceService from "./balanceService";


export const getBalance = createAsyncThunk("balance/all-balance",async(thunkAPI)=>{
    try {
        return await balanceService.getBalance()
    }catch(error)
    {
        thunkAPI.rejectWithValue(error)
    }
})
export const createBalance = createAsyncThunk("balance/create-balance",async(balanceData,thunkAPI)=>{
    try {
        return await balanceService.createBalance(balanceData)

    }catch(error)
    {
        thunkAPI.rejectWithValue(error)
    }
})
export const updateBalance = createAsyncThunk("balance/update-balance",async(balance,thunkAPI)=>{
    try {
        return await balanceService.updateBalance(balance)
    }catch(error)
    {
        thunkAPI.rejectWithValue(error)
    }
})
export const getSingleBalance = createAsyncThunk("balance/get-single-balance",async(id,thunkAPI)=>{
    try {
        return await balanceService.getSingleBalance(id)

    }catch(error)
    {
        thunkAPI.rejectWithValue(error)
    }
})
export const deleteBalance = createAsyncThunk("balance/delete-balance",async(id,thunkAPI)=>{
    try {
        return await balanceService.deleteBalance(id)
    }catch(error)
    {
        thunkAPI.rejectWithValue(error)
    }
})
export const resetState = createAction("Reset_all");

const initialState = {
    balances : [],
    singleBalance : [],
    isLoading : false,
    isError : false,
    isSuccess : false,
    message : ""
}

export const balanceSlice = createSlice({
    name : "balance",
    initialState,
    reducers : {},
    extraReducers : (builder) =>[
        builder
        .addCase(getBalance.pending, (state)=>{
            state.isLoading = true
        }).addCase(getBalance.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.balances = action.payload
        }).addCase(getBalance.rejected , (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(createBalance.pending, (state)=>{
            state.isLoading = true
        }).addCase(createBalance.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.createdBalance = action.payload
        }).addCase(createBalance.rejected , (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(getSingleBalance.pending, (state)=>{
            state.isLoading = true
        }).addCase(getSingleBalance.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.singleBalance = action.payload
        }).addCase(getSingleBalance.rejected , (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(updateBalance.pending, (state)=>{
            state.isLoading = true
        }).addCase(updateBalance.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.updatedBalance = action.payload
        }).addCase(updateBalance.rejected , (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(deleteBalance.pending, (state)=>{
            state.isLoading = true
        }).addCase(deleteBalance.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.deletedBalance = action.payload
        }).addCase(deleteBalance.rejected , (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

      
    ]
})

export default balanceSlice.reducer