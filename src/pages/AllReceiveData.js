import { Table } from "antd";

import { useDispatch, useSelector } from "react-redux";

import { getAllSellDetails } from "../features/sell/sellSlice";
import { useEffect, useState } from "react";

import { getCustomers } from "../features/customer/customerSlice";
import { getAllReceiveData } from "../features/receive/receiveSlice";
import { ClipLoader } from "react-spinners";
import { TbCurrencyTaka } from "react-icons/tb";

const rcv_column = [
  {
    title: "SNo",
    dataIndex: "key",
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: "Date",
    dataIndex: "date",
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.name.startsWith(value),
    width: '30%',
  },
  {
    title: "Customer Name",
    dataIndex: "name",
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Category 1',
        value: 'Category 1',
      },
      {
        text: 'Category 2',
        value: 'Category 2',
      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.name.startsWith(value),
    width: '30%',
  },
  {
    title: "Description",
    dataIndex: "description",
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.name.startsWith(value),
    width: '30%',
  },

  {
    title: "Amount",
    dataIndex: "amount",
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.name.startsWith(value),
    width: '30%',
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
const AllReceiveData = () => {
  const [totalRcv, setTotalRcv] = useState(null);
  const dispatch = useDispatch();
  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [day, month, year] = newDate.split("/");
    return [day, month, year].join("-");
  };

  useEffect(() => {
    dispatch(getAllReceiveData());
    dispatch(getCustomers());
  }, []);
  const receive_state = useSelector((state) => state.receive.receives);
  const receiveLoader = useSelector((state) => state.receive.isLoading);
  const customer_state = useSelector((state) => state.customer.customers);

  const receiveData = [];
  for (let index = 0; index < receive_state.length; index++) {
    for (let j = 0; j < customer_state.length; j++) {
      if (receive_state[index].customerId === customer_state[j]._id) {
        receiveData.push({
          key : index + 1,
          date: changeDateFormat(receive_state[index].date),
          name: customer_state[j].name,

          description: receive_state[index].description,

          amount: receive_state[index].amount,
        });
      }
    }
  }

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < receive_state.length; index++) {
      sum = sum + receive_state[index].amount;
    }
    setTotalRcv(sum);
  }, [receive_state]);

  return (
    <div>
      {receiveLoader ? (
        <div className="text-center mt-5">
          <ClipLoader />
        </div>
      ) : (
        <div>
          {" "}
          <h3 className="mb-4 title mt-4">Total Receive : {totalRcv} <TbCurrencyTaka/> </h3>
          <div>
            <Table columns={rcv_column} onChange={onChange} dataSource={receiveData} scroll={{
                    x: 700,
                  }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllReceiveData;
