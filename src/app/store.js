import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customer/customerSlice";
import productReducer from "../features/product/productSlice";
import sellReducer from "../features/sell/sellSlice";
import receiveReducer from "../features/receive/receiveSlice";
import factoryReducer from "../features/factory/factorySlice";
import expenseReducer from "../features/expense/expenseSlice";
import balanceReducer from "../features/balance/balanceSlice";
import userReducer from "../features/dashboard-user/dashboardUserSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
   
    factory : factoryReducer,
   user : userReducer,
    sell : sellReducer,
    receive : receiveReducer,
    expense : expenseReducer,
    balance : balanceReducer
    
  },
});
