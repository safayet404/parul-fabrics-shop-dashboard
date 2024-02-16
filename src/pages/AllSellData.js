
import { Table } from "antd";

import { useDispatch, useSelector } from "react-redux";

import {
  
  getAllSellDetails,
} from "../features/sell/sellSlice";
import { useEffect, useState } from "react";

import {
  getCustomers,
 
} from "../features/customer/customerSlice";

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
const AllSellData = () => {
    const [totalBill, setTotalBill ] = useState(null);
    const dispatch = useDispatch();
  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [day, month, year] = newDate.split("/");
    return [day, month, year].join("-");
  }
  

  

  useEffect(() => {
    dispatch(getAllSellDetails());
  }, []);
  const sell_state = useSelector((state) => state.sell.sells);
  useEffect(() => {
    dispatch(getCustomers());
  }, []);
  const customer_state = useSelector((state) => state.customer.customers);


  // const sellData = [];
  // for (let index = 0; index < sell_state.length; index++) {
  //   for (let j = 0; j < customer_state.length; j++) {
  //     if (sell_state[index].customerId === customer_state[j]._id) {
  //       sellData.push({
  //         date: changeDateFormat(sell_state[index].date),
  //         name: customer_state[j].name,
  //         quantity: sell_state[index].quantity,
  //         description: sell_state[index].description,
  //         price: sell_state[index].price,
  //         totalPrice: sell_state[index].totalPrice,
  //       });
  //     }
  //   }
  // }
  const sellData = [];
  for (let index = 0; index < sell_state.length; index++) {
    sellData.push({
      date: changeDateFormat(sell_state[index].date),
      name: sell_state[index].customerId.name,
      quantity: sell_state[index].quantity,
      description: sell_state[index].description.title,
      price: sell_state[index].price,
      totalPrice: sell_state[index].totalPrice,
    });
  }

  useEffect(()=>{
    let sum = 0
    for (let index = 0; index < sell_state.length; index++) {
       sum = sum + sell_state[index].totalPrice
        
    }
    setTotalBill(sum);
  },[sell_state])

  return (
    <div>
      {" "}
      <h3 className="mb-4 title mt-4">Total Bills : {totalBill}</h3>
      <div>
        <Table columns={sell_column} dataSource={sellData} />
      </div>
    </div>
  );
};

export default AllSellData;
