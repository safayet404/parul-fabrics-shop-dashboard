import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllSellDetails } from "../features/sell/sellSlice";

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

  const sell_column = [
    {
      title: "SNo",
      dataIndex: "key",
      sorter: (a, b) => a.key - b.key,
    },
     {
      title: "Date",
      dataIndex: "date",
      ...getColumnSearchProps('date'),
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: "Customer Name",
      dataIndex: "name",
      ...getColumnSearchProps('name'),
    },
    {
      title: "Description",
      dataIndex: "description",
      ...getColumnSearchProps('description'),
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
