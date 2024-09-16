import CustomInput from "../components/CustomInput";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from "yup";
import { useFormik } from "formik";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { TbCurrencyTaka } from "react-icons/tb";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

import {
  createExpense,
  expenseDataDelete,
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
    title: "SNo",
    dataIndex: "key",
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Expense Purpose",
    dataIndex: "purpose",
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
const daily_rcv = [
  {
    title: "SNo",
    dataIndex: "key",
    sorter: (a, b) => a.key - b.key,
  },
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
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const daily_expense = [
    {
      title: "SNo",
      dataIndex: "key",
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Expense Purpose",
      dataIndex: "purpose",
      ...getColumnSearchProps('purpose'),
    },
    {
      title: "Description",
      dataIndex: "description",
      ...getColumnSearchProps('description'),
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
      title: "SNo",
      dataIndex: "key",
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Description",
      dataIndex: "description",
      ...getColumnSearchProps('description'),
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
    dispatch(getFactories());
    dispatch(getBalance());
  }, []);

  const expense_state = useSelector((state) => state.expense.expenses);
  const factory_state = useSelector((state) => state.factory.factories);
  const balance_state = useSelector((state) => state.balance.balances);

  const sellUpdate = useSelector((state) => state.expense);
  const { createdExpense, updatedExpense, deletedExpenseData } = sellUpdate;
  const { createdBalance, updatedBalance, deletedBalance } = useSelector(
    (state) => state.balance
  );
  const expenseLoader = useSelector((state) => state.expense.isLoading);
  const balanceLoader = useSelector((state) => state.balance.isLoading);

  const expenseDelete = (e) => {
    dispatch(expenseDataDelete(e));
    setExpenseOpen(false);
  };
  const balanceDelete = (e) => {
    dispatch(deleteBalance(e));
    setRcvOpen(false);
  };
  useEffect(() => {
    dispatch(getAllExpense());
  }, [deletedExpenseData, createdExpense, updatedExpense]);

  useEffect(() => {
    dispatch(getBalance());
  }, [createdBalance, updatedBalance, deletedBalance]);

  const expenseData = [];

  for (let i = 0; i < expense_state.length; i++) {
    expenseData.push({
      key: i + 1,
      date: changeDateFormat(expense_state[i].date),
      purpose: expense_state[i].purpose,
      description: expense_state[i].description,
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
      key: i + 1,
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
      description : "Not Applicable" || ""
    },
    validationSchema: dailyExpenseSchema,
    onSubmit: (values) => {
      dispatch(createExpense(values));
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

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < balance_state.length; index++) {
      sum = sum + balance_state[index].amount;
    }
    setRcvTotalAmount(sum);
  }, [balance_state]);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < expense_state.length; index++) {
      sum = sum + expense_state[index].amount;
    }
    setTotalAmount(sum);
  }, [expense_state]);

  return (
    <div>
      <div>
        <div className="row mb-5">
          <div className="col-6">
            <h2>
              Balance : {rcvTotalAmount - totalAmount} <TbCurrencyTaka />{" "}
            </h2>
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

              <div className="row">
                <div className="col-6">
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

                </div>
                <div className="col-6">
                <CustomInput
                className="mt-3"
                type="text"
                name="description"
                onChange={formik.handleChange("description")}
                onBlue={formik.handleBlur("description")}
                value={formik.values.description}
                placeholder="Enter the description if needed"
                
              />
                </div>
              </div>


              <div className="error">
                {formik.touched.purpose && formik.errors.purpose}
              </div>

              <CustomInput
                type="number"
                name="amount"
                onChange={formik.handleChange("amount")}
                onBlue={formik.handleBlur("amount")}
                value={formik.values.amount}
                placeholder="Enter the amount"
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
                type="number"
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
              <h3 className="mb-4 title mt-4">
                Bills : {totalAmount ? totalAmount : 0} <TbCurrencyTaka />
              </h3>
              {expenseLoader ? (
                <div className="text-center mt-5">
                  <ClipLoader />
                </div>
              ) : (
                <div>
                  <Table
                    columns={daily_expense}
                    dataSource={expenseData}
                    scroll={{
                      x: 700,
                    }}
                  />
                </div>
              )}
            </div>
            <div className="col-6">
              <h3 className="mb-4 title mt-4">
                Receive : {rcvTotalAmount ? rcvTotalAmount : 0}{" "}
                <TbCurrencyTaka />
              </h3>
              {balanceLoader ? (
                <div className="text-center mt-5">
                  {" "}
                  <ClipLoader />{" "}
                </div>
              ) : (
                <div>
                  <Table
                    columns={daily_rcv}
                    dataSource={balanceData}
                    scroll={{
                      x: 700,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <CustomModal
          open={expenseOpen}
          onCancel={hideExpenseModel}
          performAction={() => {
            expenseDelete(expenseId);
          }}
          title="Are you sure you want to delete this?"
        />
        <CustomModal
          open={rcvOpen}
          onCancel={hideRcvModal}
          performAction={() => {
            balanceDelete(rcvId);
          }}
          title="Are you sure you want to delete this?"
        />
      </div>
    </div>
  );
};

export default AddExpense;
