import CustomInput from "../components/CustomInput";
import { useEffect, useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";

import {
  createProducts,
  getProducts,
  getSingleProduct,
  resetState,
  updateProduct,
 
} from "../features/product/productSlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  quantity: Yup.number().required("Quantuty is required"),
  date: Yup.date().required("Date is required"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()

  const getProductId = location.pathname.split("/")[3];
  console.log("id",getProductId);
  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getSingleProduct(getProductId));
    } else {
      dispatch(resetState());
    }
  }, [getProductId]);
  const product_state = useSelector((state) => state.product.singleProduct);
  console.log("i",product_state);
  const { title, description, date, quantity, color,sell } = product_state;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: title || "",
      description: description || "",

      quantity: quantity || "",

      color: color || "",
    
      date: date || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getProductId !== undefined) {
        const update_date = { id: getProductId, productData: values };
        dispatch(updateProduct(update_date));
        setTimeout(()=>{
          dispatch(getProducts())
        },200)
        navigate("/admin/product-list")
      } else {
        dispatch(createProducts(values));
      }

      formik.resetForm();
    },
  });

  return (
    <div>
      <h3 className="mb-4">Add Product</h3>

      <div></div>

      <div className="row">
        <div className="col-6">
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              className="mt-3"
              type="text"
              name="title"
              onChange={formik.handleChange("title")}
              onBlue={formik.handleBlur("title")}
              value={formik.values.title}
              placeholder="Enter the product title"
            />

            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
            <CustomInput
              className="mt-3"
              type="date"
              name="date"
              onChange={formik.handleChange("date")}
              onBlue={formik.handleBlur("date")}
              value={formik.values.date}
              placeholder="Enter the date"
            />

            <div className="error">
              {formik.touched.date && formik.errors.date}
            </div>

            <ReactQuill
              className="mt-3 mb-4"
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              onBlue={formik.handleBlur("description")}
              value={formik.values.description}
              placeholder="Enter the description"
            />
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>
            <CustomInput
              className="mt-3"
              type="number"
              name="quantity"
              onChange={formik.handleChange("quantity")}
              onBlue={formik.handleBlur("quantity")}
              value={formik.values.quantity}
              placeholder="Enter the quantity"
            />
            <div className="error">
              {formik.touched.quantity && formik.errors.quantity}
            </div>
            <CustomInput
              className="mt-3"
              type="text"
              name="color"
              onChange={formik.handleChange("color")}
              onBlue={formik.handleBlur("color")}
              value={formik.values.color}
              placeholder="Enter the color"
            />
            <div className="error">
              {formik.touched.color && formik.errors.color}
            </div>

            <button
              type="submit"
              className="btn btn-success border-0 rounded-3 my-4"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-6"></div>
      </div>
    </div>
  );
};

export default AddProduct;
