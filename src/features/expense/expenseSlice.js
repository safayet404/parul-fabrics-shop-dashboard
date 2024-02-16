import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import expenseService from "./expenseService";

export const getAllExpense = createAsyncThunk("expense/all-expense",async(thunkAPI)=>{
    try{
        return await expenseService.getAllExpense()
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getSingleExpense = createAsyncThunk("expense/single-expense",async(id,thunkAPI)=>{
    try{
        return await expenseService.getSingleExpense(id)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const createExpense = createAsyncThunk("expense/create-expense",async(expenseData,thunkAPI)=>{
    try{
        return await expenseService.createExpense(expenseData)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const updateExpense = createAsyncThunk("expense/update-expense",async(expense,thunkAPI)=>{
    try{
        return await expenseService.updateExpense(expense)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteExpense = createAsyncThunk("expense/delete-expense",async(id,thunkAPI)=>{
    try{
        return await expenseService.deleteExpense(id)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})

const initialState = {
    expenses : [],
    singleExpense : [],
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : ""
}

export const resetState = createAction("Reset_all")

export const expenseSlice = createSlice({
    name : "expense",
    initialState,
    reducers : {},
    extraReducers :(builder) =>{
        builder
        .addCase(getAllExpense.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllExpense.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.expenses = action.payload
        })
        .addCase(getAllExpense.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(getSingleExpense.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getSingleExpense.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.singleExpense = action.payload
        })
        .addCase(getSingleExpense.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(createExpense.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createExpense.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.createdExpense = action.payload
        })
        .addCase(createExpense.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(updateExpense.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateExpense.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.updatedExpense = action.payload
        })
        .addCase(updateExpense.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(deleteExpense.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteExpense.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.deletedExpense = action.payload
        })
        .addCase(deleteExpense.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
    }
})


export default expenseSlice.reducer