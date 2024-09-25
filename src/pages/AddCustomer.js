import React, { useState,useRef,useEffect } from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  createCustomer,
  updateCustomer,
  getCustomers,
  deleteCustomer
} from "../features/customer/customerSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { ClipLoader } from "react-spinners";
let schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mobile: Yup.string().required("Mobile is required"),
  address: Yup.string().required("Address is required"),
});
const AddCustomer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCustomerId = location.pathname.split("/")[3];

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


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
    
      mobile: "",
      address: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCustomerId !== undefined) {
        const update_data = { id: getCustomerId, customerData: values };
        dispatch(updateCustomer(update_data));
        navigate("/admin/customers");
      } else {
        dispatch(createCustomer(values));
      }
      formik.resetForm();
    },
  });

  
  return (

    <div>

    <div className="row">
      <h3 className="mb-4">
        {" "}
        {getCustomerId !== undefined
          ? "Edit Customer Information"
          : "Add Customer"}
      </h3>

      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="name"
            onChange={formik.handleChange("name")}
            onBlue={formik.handleBlur("name")}
            value={formik.values.name}
            placeholder="Enter the Customer Name"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="text"
            name="mobile"
            onChange={formik.handleChange("mobile")}
            onBlue={formik.handleBlur("mobile")}
            value={formik.values.mobile}
            placeholder="Enter the Customer Mobile"
          />
          <div className="error">
            {formik.touched.mobile && formik.errors.mobile}
          </div>
          <CustomInput
            type="text"
            name="address"
            onChange={formik.handleChange("address")}
            onBlue={formik.handleBlur("address")}
            value={formik.values.address}
            placeholder="Enter the Customer Address"
          />
          <div className="error">
            {formik.touched.address && formik.errors.address}
          </div>

          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-4"
          >
            Add Customer
          </button>
        </form>
      </div>
    </div>

    <div className="row">
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

    </div>
  );
};

export default AddCustomer;
