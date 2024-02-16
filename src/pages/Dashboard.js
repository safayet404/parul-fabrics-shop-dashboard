import React, { useEffect, useState } from "react";
import { BsArrowDownRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellDetails } from "../features/sell/sellSlice";
import { getProducts } from "../features/product/productSlice";
import ChangeDateFormat from "../components/ChangeDateFormat";
import { getAllExpense } from "../features/expense/expenseSlice";
import { getBalance } from "../features/balance/balanceSlice";

const Dashboard = () => {
  const [stock, setStock] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [rcvTotalAmount, setRcvTotalAmount] = useState(null);
  const dispatch = useDispatch();

  const sell_column = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Customer Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
    },
  ];


  useEffect(() => {
    dispatch(getAllSellDetails());
  }, []);
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  useEffect(() => {
    dispatch(getAllExpense());
  }, []);
  useEffect(() => {
    dispatch(getBalance());
  }, []);
  const product_state = useSelector((state) => state.product.products);
  const sell_state = useSelector((state) => state.sell.sells);
  const expense_state = useSelector((state) => state.expense.expenses);
  const balance_state = useSelector((state) => state.balance.balances);

  const productData = [];
  const updatedProductQuantity = [];

  for (let i = 0; i < product_state.length; i++) {
    let remainQty = product_state[i].quantity;

    for (let j = 0; j < sell_state.length; j++) {
      if (product_state[i]._id === sell_state[j].description._id) {
        remainQty -= sell_state[j].quantity;
      }
    }

    productData.push({
      stock: remainQty ? remainQty : product_state[i].quantity,
    });
    updatedProductQuantity.push(remainQty);
  }
  const sellData = [];
  for (let index = 0; sell_state?.length && index < sell_state.length; index++) {
   
      sellData.push({
        date: ChangeDateFormat(sell_state[index].date),
        name: sell_state[index].customerId.name,
        quantity: sell_state[index].quantity,
        description: sell_state[index].description.title,
        price: sell_state[index].price,
        totalPrice: sell_state[index].totalPrice,
       
      });
    
  }
  useEffect(() => {
    let stockSum = 0;
    for (let index = 0; index < updatedProductQuantity.length; index++) {
      stockSum = stockSum + updatedProductQuantity[index];
    }
    setStock(stockSum);
  }, [updatedProductQuantity]);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < balance_state.length; index++) {
      sum = sum + balance_state[index].amount;
      setRcvTotalAmount(sum);
    }
  }, [balance_state]);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < expense_state.length; index++) {
      sum = sum + expense_state[index].amount;
      setTotalAmount(sum);
    }
  }, [expense_state]);

  const getTotalSalesByMonth = () => {
    const salesByMonth = {};

    sell_state.forEach((sell) => {
      const date = new Date(sell.date);
      const monthName = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      const monthYearKey = `${monthName}-${year}`;

      if (!salesByMonth[monthYearKey]) {
        salesByMonth[monthYearKey] = 0;
      }

      salesByMonth[monthYearKey] += sell.totalPrice; // Assuming there is an amount field in your sell data
    });

    return Object.entries(salesByMonth).map(([monthYear, totalAmount]) => ({
      monthYear,
      totalAmount,
    }));
  };

  const totalSalesByMonth = getTotalSalesByMonth();

  const config = {
    data: totalSalesByMonth,
    xField: "monthYear",
    yField: "totalAmount",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: true,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total Balance</p>
            <h4 className="mb-0 sub-title">{rcvTotalAmount - totalAmount}</h4>
          </div>
          <div className="d-flex flex-column align-items-end"></div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total Product Stock</p>
            <h4 className="mb-0 sub-title">{stock}</h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Users</p>
            <h4 className="mb-0 sub-title">2 Person</h4>
          </div>
         
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Sell Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-4">Recent Sells</h3>
        <Table columns={sell_column} dataSource={sellData}></Table>
      </div>
    </div>
  );
};

export default Dashboard;
