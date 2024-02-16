import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { TfiDashboard } from "react-icons/tfi";
import { GiCatapult,GiTicket } from "react-icons/gi";
import { BsFillCartCheckFill } from "react-icons/bs";
import { SiBrandfolder } from "react-icons/si";
import { LuLayoutList } from "react-icons/lu";
import {
  AiOutlineBgColors,
  AiFillFileAdd,
  AiOutlineMessage,
} from "react-icons/ai";



import { IoIosNotifications } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h1 className="text-white fs-5 text-center py-3 mb-0">
            <span className="lg-logo">PARUL FABRICS</span>
            <span className="sm-logo">PF</span>
          </h1>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <TfiDashboard className="fs-4" />,
              label: "Dashboard",
            },
          
            {
              key: "all-sell",
              icon: <FaPeopleGroup className="fs-4" />,
              label: "All Sell Data",
            },
            {
              key: "all-receive",
              icon: <FaPeopleGroup className="fs-4" />,
              label: "All Receive Data",
            },
            {
              key: "daily-expense",
              icon: <FaPeopleGroup className="fs-4" />,
              label: "Daily Expenses",
            },
            {
              key: "stock",
              icon: <FaPeopleGroup className="fs-4" />,
              label: "Stock",
            },
            {
              key: "customers",
              icon: <FaPeopleGroup className="fs-4" />,
              label: "Customers",
            },
            {
              key: "add-customers",
              icon: <FaPeopleGroup className="fs-4" />,
              label: "Add Customers",
            },
            {
              key: "product",
              icon: <AiFillFileAdd className="fs-4" />,
              label: "Add Product",
            },
            {
              key: "product-list",
              icon: <BsFillCartCheckFill className="fs-4" />,
              label: "Product List",
            },
            {
              key: "add-mill",
              icon: <BsFillCartCheckFill className="fs-4" />,
              label: "Add Yarn & Bills Factory",
            },
            {
              key: "mills",
              icon: <BsFillCartCheckFill className="fs-4" />,
              label: "Yarn & Bills Factory",
            },
            // {
            //   key: "catalog",
            //   icon: <GiCatapult className="fs-4" />,
            //   label: "Catalog",
            //   children: [
               
               
               
            //   ],
            // },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="justify-content-between d-flex ps-3 "
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-3 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img width={32} height={32} src="images/araf.jpg" alt=" " />
              </div>
              <div
               
                data-bs-toggle="dropdown"
                aria-expanded="false"
                role="button"
              >
                <h5>Navdeep</h5>
                <p>hossainsafayet187@gmail.com</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <a class="dropdown-item" href="/d">
                    Action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="/d">
                    Another action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="/d">
                    Something else here
                  </a>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
