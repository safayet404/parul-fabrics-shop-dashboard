
import { Table } from "antd";

import { useDispatch, useSelector } from "react-redux";

import {
  
  getAllSellDetails,
} from "../features/sell/sellSlice";
import { useEffect, useState } from "react";

import {
  getCustomers,
 
} from "../features/customer/customerSlice";
import { getAllReceiveData } from "../features/receive/receiveSlice";

const rcv_column = [
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
      title: "Amount",
      dataIndex: "amount",
    },
  ];
const AllReceiveData = () => {
    const [totalRcv, setTotalRcv ] = useState(null);
    const dispatch = useDispatch();
  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [day, month, year] = newDate.split("/");
    return [day, month, year].join("-");
  }
  

  

  useEffect(() => {
    dispatch(getAllReceiveData());
  }, []);
  const receive_state = useSelector((state) => state.receive.receives);
  console.log(receive_state);
  useEffect(() => {
    dispatch(getCustomers());
  }, []);
  const customer_state = useSelector((state) => state.customer.customers);


  const receiveData = [];
  for (let index = 0; index < receive_state.length; index++) {
    for (let j = 0; j < customer_state.length; j++) {
      if (receive_state[index].customerId === customer_state[j]._id) {
        receiveData.push({
          date: changeDateFormat(receive_state[index].date),
          name: customer_state[j].name,
         
          description: receive_state[index].description,
         
          amount : receive_state[index].amount,
        });
      }
    }
  }

  useEffect(()=>{
    let sum = 0
    for (let index = 0; index < receive_state.length; index++) {
       sum = sum + receive_state[index].amount
        
    }
    setTotalRcv(sum);
  },[receive_state])

  return (
    <div>
      {" "}
      <h3 className="mb-4 title mt-4">Total Receive : {totalRcv}</h3>
      <div>
        <Table columns={rcv_column} dataSource={receiveData} />
      </div>
    </div>
  );
};

export default AllReceiveData;
