import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  createCustomer,
  getCustomers,
  getSingleCustomer,
  updateCustomer,
} from "../features/customer/customerSlice";

let schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),

  mobile: Yup.string().required("Mobile is required"),
  address: Yup.string().required("Address is required"),
});
const EditCustomer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCustomerId = location.pathname.split("/")[3];
  console.log(getCustomerId);

  useEffect(() => {
    if (getCustomerId !== undefined) {
      dispatch(getSingleCustomer(getCustomerId));
    }
  }, [getCustomerId]);

  const singleCustomer_state = useSelector(
    (state) => state.customer.singleCustomer
  );
  console.log(singleCustomer_state);
  const { name, mobile, address } = singleCustomer_state;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: name || "",

      mobile: mobile || "",
      address: address || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCustomerId !== undefined) {
        const update_data = { id: getCustomerId, customerData: values };
        dispatch(updateCustomer(update_data));

        navigate("/admin/customers");
      }
      setTimeout(() => {
        dispatch(getCustomers());
      }, 200);
    },
  });
  return (
    <div>
      <h3 className="mb-4">
        {" "}
        {getCustomerId !== undefined
          ? "Edit Customer Information"
          : "Add Customer"}
      </h3>

      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="name"
            onChange={formik.handleChange("name")}
            onBlue={formik.handleBlur("name")}
            value={formik.values.name}
            placeholder="Enter the Customer Name"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="text"
            name="mobile"
            onChange={formik.handleChange("mobile")}
            onBlue={formik.handleBlur("mobile")}
            value={formik.values.mobile}
            placeholder="Enter the Customer Mobile"
          />
          <div className="error">
            {formik.touched.mobile && formik.errors.mobile}
          </div>
          <CustomInput
            type="text"
            name="address"
            onChange={formik.handleChange("address")}
            onBlue={formik.handleBlur("address")}
            value={formik.values.address}
            placeholder="Enter the Customer Address"
          />
          <div className="error">
            {formik.touched.address && formik.errors.address}
          </div>

          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-4"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCustomer;
