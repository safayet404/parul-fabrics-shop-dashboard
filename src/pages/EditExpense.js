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

let dailyExpenseSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required"),

  purpose: Yup.string().required("Expense Purpose is required"),
  date: Yup.date().required("Date is required"),
});
const EditExpense = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getExpenseId = location.pathname.split("/")[3];
  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [day, month, year] = newDate.split("/");
    return [day, month, year].join("-");
  };
  useEffect(() => {
    if (getExpenseId !== undefined) {
      dispatch(getSingleExpense(getExpenseId));
    }
  }, [getExpenseId]);
  useEffect(() => {
    dispatch(getFactories());
  }, []);

  const single_expense = useSelector((state) => state.expense.singleExpense);
  const factory_state = useSelector((state) => state.factory.factories);
  const { date, purpose, amount } = single_expense;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      date: changeDateFormat(date) || "",
      purpose: purpose || "",
      amount: amount || "",
    },
    validationSchema: dailyExpenseSchema,
    onSubmit: (values) => {
      if (getExpenseId !== undefined) {
        const update_data = { id: getExpenseId, expenseData: values };
        dispatch(updateExpense(update_data));
        navigate("/admin/daily-expense");
      }
      setTimeout(() => {
        dispatch(getAllExpense());
      }, 200);
    },
  });
  return (
    <div>
      <h3 className="mb-4">Add Expense Info</h3>

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
          name="purpose"
          onChange={formik.handleChange("purpose")}
          onBlur={formik.handleBlur("purpose")}
          value={formik.values.purpose}
          placeholder="Enter purpose"
          list="expense-purpose"
        />
        <datalist id="expense-purpose">
          {factory_state.map((i, j) => {
            return (
              <option key={j} value={i.name}>
                {i.name}
              </option>
            );
          })}
        </datalist>

        <div className="error">
          {formik.touched.purpose && formik.errors.purpose}
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
          Update Expense Info
        </button>
      </form>
    </div>
  );
};

export default EditExpense;
