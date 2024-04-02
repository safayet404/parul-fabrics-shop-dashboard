import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from "react-redux";

import { getAllSellDetails } from "../features/sell/sellSlice";
import React, { useEffect, useRef, useState } from 'react';
import { getCustomers } from "../features/customer/customerSlice";
import { getAllReceiveData } from "../features/receive/receiveSlice";
import { ClipLoader } from "react-spinners";
import { TbCurrencyTaka } from "react-icons/tb";

const AllReceiveData = () => {
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
  const rcv_column = [
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
      title: "Customer Name",
      dataIndex: "name",
      ...getColumnSearchProps('name'),
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
            <Table columns={rcv_column}  dataSource={receiveData} scroll={{
                    x: 700,
                  }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllReceiveData;
