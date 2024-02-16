import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  getRcvById,
  getSingleReceiveData,
  updateSingleReceiveData,
} from "../features/receive/receiveSlice";

let receiveSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required"),
  description: Yup.string().required("Description is required"),
  date: Yup.date().required("Date is Required"),
});
const UpdateReceiveData = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [month, day, year].join("-");
  };
  const getRcvId = location.pathname.split("/")[3];
  useEffect(() => {
    if (getRcvId !== undefined) {
      dispatch(getRcvById(getRcvId));
    }
  }, [getRcvId]);
  const rcv_state = useSelector((state) => state.receive.receiveById);
  console.log(rcv_state);

  const { description, amount, date } = rcv_state;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: description || "",

      amount: amount || "",
      date: changeDateFormat(date) || "",
    },
    validationSchema: receiveSchema,
    onSubmit: (values) => {
      if (getRcvId !== undefined) {
        const update_rcv = { id: getRcvId, receiveData: values };
        dispatch(updateSingleReceiveData(update_rcv));
        navigate(`/admin/add-sells/${rcv_state.customerId}`);
      }
    },
  });

  return (
    <div>
      <div className="row">
        <div className="col-6">
          <h3 className="mb-4">Update Receive Info</h3>

          <div>
            <form onSubmit={formik.handleSubmit}>
              <CustomInput
                type="string"
                name="date"
                onChange={formik.handleChange("date")}
                onBlur={formik.handleBlur("date")}
                value={formik.values.date}
                placeholder="Enter Expiry Data"
                id="date"
              />
              <div className="error">
                {formik.touched.date && formik.errors.date}
              </div>
              <CustomInput
                type="text"
                name="description"
                onChange={formik.handleChange("description")}
                onBlur={formik.handleBlur("description")}
                value={formik.values.description}
                placeholder="Enter description"
                id="date"
              />
              <div className="error">
                {formik.touched.description && formik.errors.description}
              </div>
              <CustomInput
                type="text"
                name="amount"
                onChange={formik.handleChange("amount")}
                onBlur={formik.handleBlur("amount")}
                value={formik.values.amount}
                placeholder="Enter Amount"
                id="date"
              />
              <div className="error">
                {formik.touched.amount && formik.errors.amount}
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

export default UpdateReceiveData;
