import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllExpense,
  getSingleExpense,
  updateExpense,
} from "../features/expense/expenseSlice";
import { getFactories } from "../features/factory/factorySlice";
import {
  getBalance,
  getSingleBalance,
  updateBalance,
} from "../features/balance/balanceSlice";
let receiveSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required"),
  description: Yup.string().required("Description is required"),
  date: Yup.date().required("Date is required"),
});
const EditBalance = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getRcvId = location.pathname.split("/")[3];
  console.log(getRcvId);
  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [day, month, year] = newDate.split("/");
    return [day, month, year].join("-");
  };
  useEffect(() => {
    if (getRcvId !== undefined) {
      dispatch(getSingleBalance(getRcvId));
    }
  }, [getRcvId]);

  const single_balance = useSelector((state) => state.balance.singleBalance);
  const { date, description, amount } = single_balance;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      date: changeDateFormat(date) || "",
      description: description || "",
      amount: amount || "",
    },
    validationSchema: receiveSchema,
    onSubmit: (values) => {
      if (getRcvId !== undefined) {
        const update_data = { id: getRcvId, balanceData: values };
        dispatch(updateBalance(update_data));
        navigate("/admin/daily-expense");
      }
      setTimeout(() => {
        dispatch(getBalance());
      }, 200);
    },
  });
  return (
    <div>
      <h3 className="mb-4">Update Balance Info</h3>

      <form onSubmit={formik.handleSubmit}>
        <CustomInput
          className="mt-3"
          type="text"
          name="date"
          onChange={formik.handleChange("date")}
          onBlue={formik.handleBlur("date")}
          value={formik.values.date}
          placeholder="Enter the date"
        />
        <div className="error">{formik.touched.date && formik.errors.date}</div>

        <CustomInput
          type="text"
          name="description"
          onChange={formik.handleChange("description")}
          onBlur={formik.handleBlur("description")}
          value={formik.values.description}
          placeholder="Enter description"
        />
        <div className="error">
          {formik.touched.description && formik.errors.description}
        </div>

        <CustomInput
          type="number"
          name="amount"
          onChange={formik.handleChange("amount")}
          onBlue={formik.handleBlur("amount")}
          value={formik.values.amount}
          placeholder="Enter the product amount"
        />
        <div className="error">
          {formik.touched.amount && formik.errors.amount}
        </div>

        <button type="submit" className="btn btn-success border-0 rounded-3 ">
          Update Balance Info
        </button>
      </form>
    </div>
  );
};

export default EditBalance;
