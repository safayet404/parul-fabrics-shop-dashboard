import CustomInput from "../components/CustomInput";
import { Table } from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import {
  createExpense,
  deleteExpense,
  getAllExpense,
} from "../features/expense/expenseSlice";
import { getFactories } from "../features/factory/factorySlice";
import {
  createBalance,
  deleteBalance,
  getBalance,
} from "../features/balance/balanceSlice";
const daily_expense = [
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Expense Purpose",
    dataIndex: "purpose",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },

  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];
const daily_rcv = [
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Description",
    dataIndex: "description",
  },

  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];
let dailyExpenseSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required"),

  purpose: Yup.string().required("Expense Purpose is required"),
  date: Yup.date().required("Date is required"),
});
let receiveSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required"),
  description: Yup.string().required("Description is required"),
  date: Yup.date().required("Date is required"),
});

const AddExpense = () => {
  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [month, day, year].join("-");
  };
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(null);
  const [rcvTotalAmount, setRcvTotalAmount] = useState(null);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [rcvOpen, setRcvOpen] = useState(false);
  const [expenseId, setExpenseId] = useState("");
  const [rcvId, setRcvId] = useState("");
  const showExpenseModel = (e) => {
    setExpenseOpen(true);
    setExpenseId(e);
  };
  const hideExpenseModel = () => {
    setExpenseOpen(false);
  };
  const showRcvModal = (e) => {
    setRcvOpen(true);
    setRcvId(e);
  };
  const hideRcvModal = () => {
    setRcvOpen(false);
  };

  useEffect(() => {
    dispatch(getAllExpense());
  }, []);
  useEffect(() => {
    dispatch(getFactories());
  }, []);

  useEffect(() => {
    dispatch(getBalance());
  }, []);

  const expense_state = useSelector((state) => state.expense.expenses);
  const factory_state = useSelector((state) => state.factory.factories);
  const balance_state = useSelector((state) => state.balance.balances);

  const expenseData = [];

  for (let i = 0; i < expense_state.length; i++) {
    expenseData.push({
      date: changeDateFormat(expense_state[i].date),
      purpose: expense_state[i].purpose,
      amount: expense_state[i].amount,
      action: (
        <>
          <Link
            to={`/admin/edit-expense/${expense_state[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showExpenseModel(expense_state[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const balanceData = [];

  for (let i = 0; i < balance_state.length; i++) {
    balanceData.push({
      date: changeDateFormat(balance_state[i].date),
      description: balance_state[i].description,
      amount: balance_state[i].amount,
      action: (
        <>
          <Link
            to={`/admin/edit-balance/${balance_state[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showRcvModal(balance_state[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      date: "",
      amount: "",
      purpose: "",
    },
    validationSchema: dailyExpenseSchema,
    onSubmit: (values) => {
      dispatch(createExpense(values));

      setTimeout(() => {
        dispatch(getAllExpense());
      }, 200);
      formik.resetForm();
    },
  });
  const RcvFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: "",
      amount: "",
      date: "",
    },
    validationSchema: receiveSchema,
    onSubmit: (values) => {
      dispatch(createBalance(values));
      setTimeout(() => {
        dispatch(getBalance());
      }, 200);
      RcvFormik.resetForm();
    },
  });


  const expenseDelete = (e) => {
    dispatch(deleteExpense(e));
    setExpenseOpen(false);
    setTimeout(() => {
      dispatch(getAllExpense());
    }, 200);
  };
  
  const balanceDelete = (e) => {
    dispatch(deleteBalance(e));
    setRcvOpen(false);
    setTimeout(() => {
      dispatch(getBalance());
    }, 200);
  };

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < balance_state.length; index++) {
      sum = sum + balance_state[index].amount;
      setRcvTotalAmount(sum);
    }
  }, [balance_state]);
  useEffect(()=>{
    let sum = 0
    for (let index = 0; index < expense_state.length; index++) {
      sum = sum + expense_state[index].amount
      setTotalAmount(sum)
      
    }
  },[expense_state])
  return (
    <div>
      <div className="row mb-5">
        <div className="col-6">
          <h2>Balance : {rcvTotalAmount - totalAmount} </h2>
        </div>
        <div className="col-6">
          <h2> </h2>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <h3 className="mb-4">Add Expense Info</h3>

          <form onSubmit={formik.handleSubmit}>
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

            <button
              type="submit"
              className="btn btn-success border-0 rounded-3 "
            >
              Add Expense
            </button>
          </form>
        </div>

        <div className="col-6">
          <h3 className="mb-4">Add Receive Info</h3>

          <form onSubmit={RcvFormik.handleSubmit}>
            <CustomInput
              type="date"
              name="date"
              onChange={RcvFormik.handleChange("date")}
              onBlur={RcvFormik.handleBlur("date")}
              value={RcvFormik.values.date}
              placeholder="Enter Expiry Data"
            />
            <div className="error">
              {RcvFormik.touched.date && RcvFormik.errors.date}
            </div>
            <CustomInput
              type="text"
              name="description"
              onChange={RcvFormik.handleChange("description")}
              onBlur={RcvFormik.handleBlur("description")}
              value={RcvFormik.values.description}
              placeholder="Enter description"
              id="date"
            />
            <div className="error">
              {RcvFormik.touched.description && RcvFormik.errors.description}
            </div>
            <CustomInput
              type="text"
              name="amount"
              onChange={RcvFormik.handleChange("amount")}
              onBlur={RcvFormik.handleBlur("amount")}
              value={RcvFormik.values.amount}
              placeholder="Enter the amount"
            />
            <div className="error">
              {RcvFormik.touched.amount && RcvFormik.errors.amount}
            </div>

            <button
              type="submit"
              className="btn btn-success border-0 rounded-3 "
            >
              Add Balance Info
            </button>
          </form>
        </div>

        <div className="row">
          <div className="col-6">
            <h3 className="mb-4 title mt-4">Total Bills : {totalAmount}</h3>
            <div>
              <Table columns={daily_expense} dataSource={expenseData} />
            </div>
          </div>
          <div className="col-6">
            <h3 className="mb-4 title mt-4">
              Total Receive Amount : {rcvTotalAmount}
            </h3>
            <div>
              <Table columns={daily_rcv} dataSource={balanceData} />
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        open={expenseOpen}
        onCancel={hideExpenseModel}
        performAction={() => {
          expenseDelete(expenseId);
        }}
        title="Are you sure you want to delete sell data?"
      />
      <CustomModal
        open={rcvOpen}
        onCancel={hideRcvModal}
        performAction={() => {
          balanceDelete(rcvId);
        }}
        title="Are you sure you want to delete receive data?"
      />
    </div>
  );
};

export default AddExpense;
