import React from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  createFactory,
  getSingleFactory,
  resetState,
  updateFactory,
} from "../features/factory/factorySlice";

let schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
});
const AddMill = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getFactoryId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getFactoryId !== undefined) {
      dispatch(getSingleFactory(getFactoryId));
    } else {
      dispatch(resetState());
    }
  }, [getFactoryId]);
  const factory_state = useSelector((state) => state.factory.singleFactory);
  const { name, address } = factory_state;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: name || "",
      address: address || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: getFactoryId, factoryData: values };
      if (getFactoryId !== undefined) {
        dispatch(updateFactory(data));
        navigate("/admin/mills");
      } else {
        dispatch(createFactory(values));
        formik.resetForm();
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4">
        {getFactoryId !== undefined ? "Edit" : "Add"} Factory
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit} className="mt-4">
          <CustomInput
            type="text"
            name="name"
            onChange={formik.handleChange("name")}
            onBlur={formik.handleChange("name")}
            value={formik.values.name}
            placeholder="Enter the Factory/Mill name"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="text"
            name="address"
            onChange={formik.handleChange("address")}
            onBlur={formik.handleChange("address")}
            value={formik.values.address}
            placeholder="Enter the address"
          />
          <div className="error">
            {formik.touched.address && formik.errors.address}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-4"
          >
            {getFactoryId !== undefined ? "Update" : "Add"} Factory
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMill;
