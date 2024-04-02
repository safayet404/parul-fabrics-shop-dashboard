import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { deleteFactory, getFactories } from "../features/factory/factorySlice";
import { ClipLoader } from "react-spinners";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    sorter: (a, b) => a.address.length - b.address.length,
  },

  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];
const Factory = () => {
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
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps('address'),
      sorter: (a, b) => a.address.length - b.address.length,
    },
  
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  const [open, setOpen] = useState(false);
  const [factoryId, setFactoryId] = useState("");

  const hideModel = () => {
    setOpen(false);
  };
  const showModal = (e) => {
    setOpen(true);
    setFactoryId(e);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFactories());
  }, []);
  const factory_state = useSelector((state) => state.factory.factories);
  const { createdFactory, updatedFactory, deletedFactory, isLoading } =
    useSelector((state) => state.factory);

  useEffect(() => {
    dispatch(getFactories());
  }, [createdFactory, updatedFactory, deletedFactory]);
  const factoryData = [];
  for (let i = 0; i < factory_state.length; i++) {
    factoryData.push({
      key: i + 1,
      name: factory_state[i].name,
      address: factory_state[i].address,

      action: (
        <>
          <Link
            to={`/admin/mills-balance/${factory_state[i]._id}`}
            className=" fs-3 text-danger"
          >
            <FaEye />
          </Link>
          <Link
            to={`/admin/add-mill/${factory_state[i]._id}`}
            className="ms-3 fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger border-0 bg-transparent"
            onClick={() => {
              showModal(factory_state[i]._id);
            }}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteSingleFactory = (e) => {
    dispatch(deleteFactory(e));
    setOpen(false);
  };
  return (
    <div>
      {isLoading ? (
        <div className="text-center mt-5">
          <ClipLoader />
        </div>
      ) : (
        <div>
          <h3 className="mb-4"> Mills and Factories </h3>
          <Table columns={columns} dataSource={factoryData} scroll={{
                    x: 700,
                  }}></Table>
          <CustomModal
            open={open}
            title="Are you sure you want to delete this?"
            onCancel={hideModel}
            performAction={() => {
              deleteSingleFactory(factoryId);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Factory;
