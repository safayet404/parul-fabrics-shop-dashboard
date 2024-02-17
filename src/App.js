import "./App.css";
import { BrowserRouter as Router, createBrowserRouter as Ami, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";

import Customers from "./pages/Customers";

import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";

import AddCustomer from "./pages/AddCustomer";
import AddSell from "./pages/AddSell";
import UpdateSellRcvInfo from "./pages/UpdateSellRcvInfo";
import UpdateReceiveData from "./pages/UpdateReceiveData";
import EditCustomer from "./pages/EditCustomer";
import AllSellData from "./pages/AllSellData";
import AllReceiveData from "./pages/AllReceiveData";
import Stock from "./pages/Stock";
import Factory from "./pages/Factory";
import AddMill from "./pages/AddMill";
import AddExpense from "./pages/AddExpense";
import EditExpense from "./pages/EditExpense";
import EditBalance from "./pages/EditBalance";
import MillsBalance from "./pages/MillsBalance";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>

          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<Dashboard />}></Route>

            <Route path="customers" element={<Customers />}></Route>
            <Route path="add-customers" element={<AddCustomer />}></Route>
            <Route path="edit-customer/:id" element={<EditCustomer />}></Route>
            <Route path="add-sells/:id" element={<AddSell />}></Route>
            <Route path="update-sell-rcv/:id" element={<UpdateSellRcvInfo />}></Route>
            <Route path="update-rcv/:id" element={<UpdateReceiveData />}></Route>
            <Route path="all-sell" element={<AllSellData />}></Route>
            <Route path="all-receive" element={<AllReceiveData />}></Route>
            <Route path="stock" element={<Stock />}></Route>
            <Route path="mills" element={<Factory />}></Route>
            <Route path="add-mill" element={<AddMill />}></Route>
            <Route path="add-mill/:id" element={<AddMill />}></Route>
            
            <Route path="daily-expense" element={<AddExpense />}></Route>
            <Route path="edit-expense/:id" element={<EditExpense />}></Route>
            <Route path="edit-balance/:id" element={<EditBalance />}></Route>
            <Route path="mills-balance/:id" element={<MillsBalance />}></Route>

            <Route path="product-list" element={<ProductList />}></Route>
          
            <Route path="product" element={<AddProduct />}></Route>
            <Route path="edit-product/:id" element={<AddProduct />}></Route>
   
            
           
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
