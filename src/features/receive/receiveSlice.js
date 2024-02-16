import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import receiveService from "./receiveService";


export const addReceiveData = createAsyncThunk(
    "receive/add-receive-data",
    async (receiveData,thunkAPI) => {
      try {
        return await receiveService.addReceiveData(receiveData)
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
export const getAllReceiveData = createAsyncThunk("receive/get-all-receive-details",async(thunkAPI)=>{
    try{
        return await receiveService.getAllReceiveData()
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getSingleReceiveData = createAsyncThunk("receive/get-single-receive-details",async(id,thunkAPI)=>{
    try{
        return await receiveService.getSingleReceiveData(id)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getRcvById = createAsyncThunk("receive/receive-byId",async(id,thunkAPI)=>{
    try{
        return await receiveService.getRcvById(id)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const deleteSingleReceiveData = createAsyncThunk("receive/delete-single-receive-details",async(id,thunkAPI)=>{
    try{
        return await receiveService.deleteSingleReceiveData(id)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const updateSingleReceiveData = createAsyncThunk("receive/update-single-receive-details",async(receive,thunkAPI)=>{
    try{
        return await receiveService.updateSingleReceiveData(receive)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})

  const initialState = {
    receives : [],
    singleReceiveData : [],
    updatedData : [],
    receiveById : [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    createStatus: null,
    message: "",
  };

  export const receiveSlice = createSlice({
    name: "receives",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(addReceiveData.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(addReceiveData.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.createdReceiveData = action.payload;
        })
        .addCase(addReceiveData.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(getAllReceiveData.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllReceiveData.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.receives = action.payload;
        })
        .addCase(getAllReceiveData.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(getSingleReceiveData.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getSingleReceiveData.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.singleReceiveData = action.payload;
        })
        .addCase(getSingleReceiveData.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(getRcvById.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getRcvById.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.receiveById = action.payload;
        })
        .addCase(getRcvById.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(updateSingleReceiveData.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateSingleReceiveData.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.updatedData = action.payload;
        })
        .addCase(updateSingleReceiveData.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(deleteSingleReceiveData.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteSingleReceiveData.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.deletedData = action.payload;
        })
        .addCase(deleteSingleReceiveData.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
       
      
  
        
    },
  });
  
  export default receiveSlice.reducer;
  