import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import sellService from "./sellService";


export const createSellInfo = createAsyncThunk(
    "sell/add-sell",
    async (sellData,thunkAPI) => {
      try {
        return await sellService.addSell(sellData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
export const getAllSellDetails = createAsyncThunk("sell/get-all-sell-details",async(thunkAPI)=>{
    try{
        return await sellService.getAllSellDetails()
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getSingleSellDetails = createAsyncThunk("sell/get-single-sell-details",async(id,thunkAPI)=>{
    try{
        return await sellService.getSingleSellDetails(id)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getSellByID = createAsyncThunk("sell/get-sell-byId",async(id,thunkAPI)=>{
    try{
        return await sellService.getSingleSellById(id)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const updateSellDetails = createAsyncThunk("sell/update-sell-details",async(sell,thunkAPI)=>{
    try{
        return await sellService.updateSellDetails(sell)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})
export const deleteSellData = createAsyncThunk("sell/delete-sell-data",async(id,thunkAPI)=>{
    try{
        return await sellService.deleteSellData(id)
    }catch(error)
    {
        return thunkAPI.rejectWithValue(error)
    }
})

  const initialState = {
    sells : [],
    singleSellData : [],
    singleSellById : [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    createStatus: null,
    message: "",
  };

  export const sellSlice = createSlice({
    name: "sells",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createSellInfo.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createSellInfo.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.createdSellData = action.payload;
        })
        .addCase(createSellInfo.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        
        .addCase(getAllSellDetails.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllSellDetails.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.sells = action.payload;
        })
        .addCase(getAllSellDetails.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(getSingleSellDetails.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getSingleSellDetails.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.singleSellData = action.payload;
        })
        .addCase(getSingleSellDetails.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(getSellByID.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getSellByID.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.singleSellById = action.payload;
        })
        .addCase(getSellByID.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(updateSellDetails.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateSellDetails.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.updatedSellData = action.payload;
        })
        .addCase(updateSellDetails.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(deleteSellData.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteSellData.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.deletedSellData = action.payload;
        })
        .addCase(deleteSellData.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
  
        
    },
  });
  
  export default sellSlice.reducer;
  