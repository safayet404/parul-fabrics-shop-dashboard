import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dashboardUserService from "./dashboardUserService"


export const allUser = createAsyncThunk("dashboard/all-user",async(thunkAPI)=>{
    try{
        return await dashboardUserService.allUser()
    }
    catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})

export const singleUser = createAsyncThunk("dashboard/single-user",async(id,thunkAPI)=>{
    try{
        return await dashboardUserService.singleUser(id)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const singleUserByMail = createAsyncThunk("dashboard/user-by-mail",async(email,thunkAPI)=>{
    try{
        return await dashboardUserService.singleUserByMail(email)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})

export const addUser = createAsyncThunk("dashboard/add-user",async(userData,thunkAPI)=>{
    try{
        return await dashboardUserService.addUser(userData)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateUser = createAsyncThunk("dashboard/update-user",async(user,thunkAPI)=>{
    try{
        return await dashboardUserService.updateUser(user)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const deleteUser = createAsyncThunk("dashboard/delete-user",async(id,thunkAPI)=>{
    try{
        return await dashboardUserService.deleteUser(id)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})

const initialState={
    users : [],
    singleUser : [],
    singleUserByMail : [],
    isError : false,
    isLoading : false,
    isSuccess : false,
    message : ""
}

export const resetState = createAction("Reset_all")

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {},
    extraReducers : (builder) =>{
        builder
        .addCase(allUser.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(allUser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.users = action.payload
        })
        .addCase(allUser.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(singleUser.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(singleUser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.singleUser = action.payload
        })
        .addCase(singleUser.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(singleUserByMail.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(singleUserByMail.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.singleUserByMail = action.payload
        })
        .addCase(singleUserByMail.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(addUser.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addUser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.createdUser = action.payload
        })
        .addCase(addUser.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(updateUser.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.updatedUser = action.payload
        })
        .addCase(updateUser.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(deleteUser.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.deletedUser = action.payload
        })
        .addCase(deleteUser.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
    }
})

export default userSlice.reducer