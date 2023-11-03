import React from "react";
import { BsArrowDownRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
const Dashboard = () => {

 
  const data = [
    {
      type: "January",
      sales: 138,
    },
    {
      type: "February",
      sales: 152,
    },
    {
      type: "March",
      sales: 261,
    },
    {
      type: "April",
      sales: 145,
    },
    {
      type: "May",
      sales: 148,
    },
    {
      type: "June",
      sales: 105,
    },
    {
      type: "July",
      sales: 124,
    },
    {
      type: "August",
      sales: 265,
    },
    {
      type: "September",
      sales: 147,
    },
    {
      type: "October",
      sales: 128,
    },
    {
      type: "November",
      sales: 138,
    },
    {
      type: "December",
      sales: 238,
    },
  ];

  const config = {
    data,
    xField: "type",
    yField: "sales",
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
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
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
     
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
   
   
 
  ];
  // const data1 = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
      
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
      
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sydney No. 1 Lake Park',
     
  //   },
  // ];
  const data2 = []

  for(let i=0; i<46; i++)
  {
    data2.push({
      key : 1,
      name : `Safayet Hossain ${i}`,
      age : 32+i,
      address : `Faidabad, Primary School Road ${i}`
    })
  }
  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>

      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">Compared To April 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">Compared To April 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">Compared To April 2022</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-4">Recent Orders</h3>
        <Table columns={columns} dataSource={data2} ></Table>
      </div>


    </div>
  );
};

export default Dashboard;
