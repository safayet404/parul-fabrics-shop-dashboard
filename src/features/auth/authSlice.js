// import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
// import authService from './authService'

// const getUserfromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

// const initialState = {
//     user : [],
//     isError : false,
//     isLoading : false,
//     isSuccess : false,
//     message : ""
// }
// export const login = createAsyncThunk('auth/admin-login',async(user,thunkAPI)=>{
//     try{
//         return await authService.login(user)

//     }catch(error){
//        return thunkAPI.abort.rejectWithValue(error)
//     }
// })
// export const authSlice = createSlice({
//     name : "auth",
//     initialState,
//     reducers:{},
//     extraReducers : (buildeer) => {
//         buildeer.addCase(login.pending,(state) =>{
//             state.isLoading =  true
//         })
//         .addCase(login.fulfilled, (state, action) => {
//             state.isError = false;
//             state.isLoading = false;
//             state.isSuccess = true;
//             state.user = action.payload;
//             state.message = "success";
//           })
//         .addCase(login.rejected,(state,action) =>{
//             state.isLoading =  false;
//             state.isError = true;
//             state.isSuccess = false;
//             state.user = null
//         })

//     }
// })

// export default authSlice.reducer