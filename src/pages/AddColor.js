import React from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createColor,
  getAColor,
  updateColor,
} from "../features/color/colorSlice";
import { useEffect } from "react";
import { resetState } from "../features/product/productSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});
const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getColorId = location.pathname.split("/")[3];
  const newColor = useSelector((state) => state.color);
  const { colorName } = newColor;

  console.log(getColorId);
  useEffect(() => {
   if(getColorId !== undefined)
   {
    dispatch(getAColor(getColorId));
   }
   else{
    dispatch(resetState())
   }
  }, [colorName]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        dispatch(updateColor(data));
        navigate("/admin/color-list");
      } else {
        dispatch(createColor(values));
        formik.resetForm();
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4">{getColorId !== undefined ? "Edit" : "Add"} Color</h3>

      <div>
        <form onSubmit={formik.handleSubmit} className="mt-4">
          <CustomInput
            type="text"
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
            placeholder="Enter the color name"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-4"
          >
            {getColorId !== undefined ? "Update" : "Add"} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
