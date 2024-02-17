import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getSellByID,

  updateSellDetails,
} from "../features/sell/sellSlice";
import {getSingleProduct } from "../features/product/productSlice";

let sellSchema = Yup.object().shape({
  quantity: Yup.number().required("Quantity is required"),
  price: Yup.number().required("Price is required"),
 
  date: Yup.date().required("Date is Required"),
});


const UpdateSellRcvInfo = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [month, day, year].join("-");
  };
  const getSellId = location.pathname.split("/")[3];


  useEffect(() => {
    if (getSellId !== undefined) {
      dispatch(getSellByID(getSellId));
    }
  }, [getSellId]);
  
  const sell_state = useSelector((state) => state.sell.singleSellById);
  useEffect(()=>{
    if(sell_state.description !== undefined)
    {
      dispatch(getSingleProduct(sell_state.description))
    }
  
    
  },[sell_state.description])
  const product_state = useSelector((state)=>state.product.singleProduct)
  console.log(product_state);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      
      quantity: sell_state.quantity || "",
      price: sell_state.price || "",
      date: changeDateFormat(sell_state.date) || "",
    },
    validationSchema: sellSchema,
    onSubmit: (values) => {
      if (getSellId !== undefined) {
        const update_sell = { id: getSellId, sellData: values };
        dispatch(updateSellDetails(update_sell));
        navigate(`/admin/add-sells/${sell_state.customerId}`)
      }
    },
  });

  return (
    <div>
      <div className="row">
        <div className="col-6">
          <h3 className="mb-4">Update Sells Info : {product_state.title} </h3>

          <div>
            <form onSubmit={formik.handleSubmit}>
              <CustomInput
                type="string"
                name="date"
                onChange={formik.handleChange("date")}
                onBlur={formik.handleBlur("date")}
                value={formik.values.date}
                placeholder="Enter Expiry Data"
               
              />
              <div className="error">
                {formik.touched.date && formik.errors.date}
              </div>

              <div className="row">
                <div className="col-6">
                  <CustomInput
                    type="number"
                    name="quantity"
                    onChange={formik.handleChange("quantity")}
                    onBlue={formik.handleBlur("quantity")}
                    value={formik.values.quantity}
                    placeholder="Enter the product quantity"
                  />
                </div>
                <div className="col-6">
                  <CustomInput
                    type="number"
                    name="price"
                    onChange={formik.handleChange("price")}
                    onBlue={formik.handleBlur("price")}
                    value={formik.values.price}
                    placeholder="Enter the product rate"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <div className="error">
                    {formik.touched.quantity && formik.errors.quantity}
                  </div>
                </div>
                <div className="col-6">
                  <div className="error">
                    {formik.touched.price && formik.errors.price}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-success border-0 rounded-3 "
              >
              Update
              </button>
            </form>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default UpdateSellRcvInfo;
