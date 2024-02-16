import { createAsyncThunk,createSlice,createAction } from "@reduxjs/toolkit";
import colorService from "./colorService";

export const getColor = createAsyncThunk("color/all-colors",async(thunkAPI)=>{
    try {
        return await colorService.getColor()

    }catch(error)
    {
        thunkAPI.rejectWithValue(error)
    }
})
export const createColor = createAsyncThunk("color/create-colors",async(colorData,thunkAPI)=>{
    try {
        return await colorService.createColor(colorData)

    }catch(error)
    {
        thunkAPI.rejectWithValue(error)
    }
})
export const updateColor = createAsyncThunk("color/update-color",async(color,thunkAPI)=>{
    try {
        return await colorService.updateColor(color)
    }catch(error)
    {
        thunkAPI.rejectWithValue(error)
    }
})
export const getAColor = createAsyncThunk("color/get-single-colors",async(id,thunkAPI)=>{
    try {
        return await colorService.getAColor(id)

    }catch(error)
    {
        thunkAPI.rejectWithValue(error)
    }
})
export const deleteColor = createAsyncThunk("color/delete-color",async(id,thunkAPI)=>{
    try {
        return await colorService.deleteColor(id)

    }catch(error)
    {
        thunkAPI.rejectWithValue(error)
    }
})
export const resetState = createAction("Reset_all");

const initialState = {
    colors : [],
    isLoading : false,
    isError : false,
    isSuccess : false,
    message : ""
}

export const colorSlice = createSlice({
    name : "colors",
    initialState,
    reducers : {},
    extraReducers : (builder) =>[
        builder
        .addCase(getColor.pending, (state)=>{
            state.isLoading = true
        }).addCase(getColor.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.colors = action.payload
        }).addCase(getColor.rejected , (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(createColor.pending, (state)=>{
            state.isLoading = true
        }).addCase(createColor.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.createdColor = action.payload
        }).addCase(createColor.rejected , (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(getAColor.pending, (state)=>{
            state.isLoading = true
        }).addCase(getAColor.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.colorName = action.payload.title
        }).addCase(getAColor.rejected , (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(updateColor.pending, (state)=>{
            state.isLoading = true
        }).addCase(updateColor.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.updatedColor = action.payload
        }).addCase(updateColor.rejected , (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(deleteColor.pending, (state)=>{
            state.isLoading = true
        }).addCase(deleteColor.fulfilled, (state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.deletedColor = action.payload.title
        }).addCase(deleteColor.rejected , (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        .addCase(resetState, () => initialState)
    ]
})

export default colorSlice.reducer