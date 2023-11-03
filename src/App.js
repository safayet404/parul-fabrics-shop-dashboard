import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Enquiries from "./pages/Enquiries";
import BlogList from "./pages/BlogList";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import BlogCategoryList from "./pages/BlogCategoryList";
import ProductList from "./pages/ProductList";
import BrandList from "./pages/BrandList";
import ColorList from "./pages/ColorList";
import CategoryList from "./pages/CategoryList";
import AddBlog from "./pages/AddBlog";
import AddBlogCategory from "./pages/AddBlogCategory";
import AddColor from "./pages/AddColor";
import AddBrand from "./pages/AddBrand";
import AddProduct from "./pages/AddProduct";
import AddProductCategory from "./pages/AddProductCategory";
import AddCupon from "./pages/AddCupon";
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

            <Route path="enquiries" element={<Enquiries />}></Route>
            
            <Route path="blog-list" element={<BlogList />}></Route>
            <Route path="add-blog" element={<AddBlog />}></Route>
            <Route path="add-blog-category" element={<AddBlogCategory />}></Route>
            <Route path="blog-category-list" element={<BlogCategoryList />}></Route>

            <Route path="order" element={<Orders />}></Route>

            <Route path="customers" element={<Customers />}></Route>

            <Route path="product-list" element={<ProductList />}></Route>
            <Route path="category-list" element={<CategoryList />}></Route>
            <Route path="product" element={<AddProduct />}></Route>
            <Route path="add-category" element={<AddProductCategory />}></Route>

            <Route path="brand-list" element={<BrandList />}></Route>
            <Route path="add-brand" element={<AddBrand />}></Route>



            <Route path="color-list" element={<ColorList />}></Route>
            <Route path="add-color" element={<AddColor />}></Route>
            <Route path="add-cupon" element={<AddCupon />}></Route>
            
           
          </Route>
        </Routes>
      </Router>
    </div>
  );
}


export default App;
