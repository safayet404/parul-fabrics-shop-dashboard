import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "./customerService";
import cogoToast from "cogo-toast";

export const getCustomers = createAsyncThunk(
  "customer/get-customers",
  async (thunkAPI) => {
    try {
      return await customerService.getCustomers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCustomer = createAsyncThunk("customer/create-customers",async(customerData,thunkAPI)=>{
  try{
    return await customerService.createCustomer(customerData)
  }catch(error)
  {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getSingleCustomer = createAsyncThunk("/customer/get-single-customer",async(id,thunkAPI)=>{
  try{
    return await customerService.getSingleCustomer(id)
  }
  catch(error)
  {
    return thunkAPI.rejectWithValue(error)
  }
})

export const updateCustomer = createAsyncThunk("/customer/update-customer",async(customerData,thunkAPI)=>{
  try{
    return await customerService.updateCustomer(customerData)
  }catch(error)
  {
    return thunkAPI.rejectWithValue(error)
  }
})
export const deleteCustomer = createAsyncThunk("/customer/delete-customer",async(id,thunkAPI)=>{
  try{
    return await customerService.deleteCustomer(id)
  }catch(error)
  {
    return thunkAPI.rejectWithValue(error)
  }
})
const initialState = {
  customers: [],
  singleCustomer : [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCustomers = action.payload;
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getSingleCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleCustomer = action.payload;
      })
      .addCase(getSingleCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCustomer = action.payload;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCustomer = action.payload;
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
  },
});
export default customerSlice.reducer