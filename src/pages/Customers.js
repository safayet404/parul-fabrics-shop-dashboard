import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from "react-redux";
import {
  deleteCustomer,
  getCustomers,
} from "../features/customer/customerSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { ClipLoader } from "react-spinners";


const Customers = () => {

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

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps('name'),
     
    },
    {
      title: "Address",
      dataIndex: "address",
      ...getColumnSearchProps('address'),
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  const [open, setOpen] = useState(false);

  const [customerId, setCustomerId] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  const showModal = (e) => {
    setOpen(true);
    setCustomerId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const deleteCustomerInfo = (e) => {
    dispatch(deleteCustomer(e));
    setOpen(false);
  };
  const customer_state = useSelector((state) => state.customer.customers);
  const { updatedCustomer, deletedCustomer, isLoading } = useSelector(
    (state) => state.customer
  );

  useEffect(() => {
    dispatch(getCustomers());
  }, [updatedCustomer, deletedCustomer]);

  const data1 = [];
  for (let i = 0; i < customer_state.length; i++) {
    if (customer_state[i].role !== "admin") {
      data1.push({
        key: i + 1,
        mobile: customer_state[i].mobile,
        name: customer_state[i].name,
        address: customer_state[i].address,
        action: (
          <>
            <Link
              to={`/admin/add-sells/${customer_state[i]._id}`}
              className=" fs-3 text-danger"
            >
              <FaEye />
            </Link>
            <Link
              to={`/admin/edit-customer/${customer_state[i]._id}`}
              className="ms-3 fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            {/* <button
              className="ms-3 fs-3 text-danger border-0 bg-transparent"
              onClick={() => {
                showModal(customer_state[i]._id);
              }}
            >
              <AiFillDelete />
            </button> */}
          </>
        ),
      });
    }
  }

  return (
    <div>
      {isLoading ? (
        <div className="text-center mt-5">
          <ClipLoader />
        </div>
      ) : (
        <div>
          <h3 className="mb-4 title">Customers</h3>
          <div>
            <Table
              columns={columns}
              dataSource={data1} 
              scroll={{
                x: 700,
              }}
            />
          </div>
          <CustomModal
            onCancel={hideModal}
            open={open}
            performAction={() => {
              deleteCustomerInfo(customerId);
            }}
            title="Are you sure you want to delete this Customer?"
          />
        </div>
      )}
    </div>
  );
};

export default Customers;
