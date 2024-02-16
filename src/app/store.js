import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customer/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";

import colorReducer from "../features/color/colorSlice";
import sellReducer from "../features/sell/sellSlice";
import receiveReducer from "../features/receive/receiveSlice";
import factoryReducer from "../features/factory/factorySlice";
import expenseReducer from "../features/expense/expenseSlice";
import balanceReducer from "../features/balance/balanceSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand : brandReducer,
    factory : factoryReducer,
    color : colorReducer,
    sell : sellReducer,
    receive : receiveReducer,
    expense : expenseReducer,
    balance : balanceReducer
    
  },
});
