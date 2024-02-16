import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { getAllExpense } from "../features/expense/expenseSlice";
import { useLocation } from "react-router-dom";
import { getSingleFactory } from "../features/factory/factorySlice";
import ChangeDateFormat from "../components/ChangeDateFormat";
const mill_balance = [
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
];
const MillsBalance = () => {
    const [millAmount,setMillAmount] = useState(null)
  const dispatch = useDispatch();
  const location = useLocation();
  const getMillId = location.pathname.split("/")[3];
  useEffect(() => {
    dispatch(getAllExpense());
  }, []);
  useEffect(() => {
    if (getMillId !== undefined) {
      dispatch(getSingleFactory(getMillId));
    }
  }, [getMillId]);

  const expense_state = useSelector((state) => state.expense.expenses);

  const factory_state = useSelector((state) => state.factory.singleFactory);
  console.log(expense_state);


  const millBalanceData = [];

  for (let i = 0; i < expense_state.length; i++) {
    if (expense_state[i].purpose === factory_state.name) {
      millBalanceData.push({
        date: ChangeDateFormat(expense_state[i].date),
        amount: expense_state[i].amount,
      });
    }
  }
  useEffect(()=>{
    let sum = 0
    for (let i = 0; i < millBalanceData.length; i++) {
       sum = sum + millBalanceData[i].amount
      }
    setMillAmount(sum)

  },[millBalanceData])


  return (
    <div>
    
      <div className="row">
      
          <h3 className="mb-4 title mt-4">Name: {factory_state.name}</h3>
          <h3 className="mb-4 title mt-4">Total Amount : {millAmount}</h3>
          <div>
            <Table columns={mill_balance} dataSource={millBalanceData} />
          </div>
       
      </div>
    </div>
  );
};

export default MillsBalance;
