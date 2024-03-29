import { Table,DatePicker  } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { getAllSellDetails } from "../features/sell/sellSlice";
import { useEffect, useState } from "react";

import { getCustomers } from "../features/customer/customerSlice";
import { ClipLoader } from "react-spinners";
import { TbCurrencyTaka } from "react-icons/tb";


const sell_column = [
  {
    title: "SNo",
    dataIndex: "key",
    sorter: (a, b) => a.key - b.key,
  },
   {
    title: "Date",
    dataIndex: "date",
    sorter: (a, b) => a.key - b.key,
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

  const [totalBill, setTotalBill] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const dispatch = useDispatch();
  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [day, month, year] = newDate.split("/");
    return [day, month, year].join("-");
  };

  useEffect(() => {
    dispatch(getAllSellDetails());
  }, []);
  const sell_state = useSelector((state) => state.sell.sells);
  const sellLoader = useSelector((state) => state.sell.isLoading);
  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  const sell_Data = [];
  for (let index = 0; index < sell_state.length; index++) {
    sell_Data.push({
      key : index+1,
      date: changeDateFormat(sell_state[index].date),
      name: sell_state[index].customerId.name,
      quantity: sell_state[index].quantity,
      description: sell_state[index].description.title,
      price: sell_state[index].price,
      totalPrice: sell_state[index].totalPrice,
    });
  }



  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < sell_state.length; index++) {
      sum = sum + sell_state[index].totalPrice;
    }
    setTotalBill(sum);
  }, [sell_state]);


  return (
    <div>
      {sellLoader ? (
        <div className="text-center">
          <ClipLoader />
        </div>
      ) : (
        <div>
          <h3 className="mb-4 title mt-4">Total Bills : {totalBill} <TbCurrencyTaka/> </h3>
          <div>
            <Table
              columns={sell_column}
              dataSource={sell_Data}
              scroll={{
                x: 700,
              }}
            />
          </div>
          <div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllSellData;
