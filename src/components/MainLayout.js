import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { TfiDashboard } from "react-icons/tfi";
import { BsFillCartCheckFill } from "react-icons/bs";
import { AiFillFileAdd } from "react-icons/ai";
import { MdSell } from "react-icons/md";
import { GiExpense } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { IoIosNotifications } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiRolledCloth } from "react-icons/gi";
import { GiFactory } from "react-icons/gi";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useUserStore from "./StateManagement";
import { getAuth, signOut } from "firebase/auth";
import app from "../utils/firebaseConfig";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { singleUserByMail } from "../features/dashboard-user/dashboardUserSlice";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();

  const { loginUser, setLoginUser } = useUserStore();
  const local_data = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);

      setLoginUser(null);
      
      navigate("/");
      localStorage.removeItem('user');
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };
  useEffect(() => {
    if (local_data === null) {
      navigate("/");
    }
  }, []);

  // useEffect(() => {
  //   if(local_data !== null)
  //   {

  //     dispatch(singleUserByMail(local_data.email));
  //   }
  // }, []);
  // const login_state = useSelector((state) => state.user.singleUserByMail);


  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="position-sticky top-0">
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
                icon: <MdSell className="fs-4" />,
                label: "All Sell Data",
              },
              {
                key: "all-receive",
                icon: <GiReceiveMoney className="fs-4" />,
                label: "All Receive Data",
              },
              {
                key: "daily-expense",
                icon: <GiExpense className="fs-4" />,
                label: "Daily Expenses",
              },
              {
                key: "stock",
                icon: <GiRolledCloth className="fs-4" />,
                label: "Stock",
              },
              {
                key: "due",
                icon: <GiRolledCloth className="fs-4" />,
                label: "All Due",
              },
              {
                key: "add-customers",
                icon: <AiFillFileAdd className="fs-4" />,
                label: "Add Customers",
              },
              {
                key: "customers",
                icon: <FaPeopleGroup className="fs-4" />,
                label: "Customers",
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
                key: "add-user",
                icon: <AiFillFileAdd className="fs-4" />,
                label: "Add User",
              },
              {
                key: "user-list",
                icon: <AiFillFileAdd className="fs-4" />,
                label: "User List",
              },
              {
                key: "add-mill",
                icon: <AiFillFileAdd className="fs-4" />,
                label: "Add Yarn & Bills Factory",
              },
              {
                key: "mills",
                icon: <GiFactory className="fs-4" />,
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
        </div>
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
                <h5> {local_data ? local_data.displayName : " "} </h5>
                <p> {local_data ? local_data.email : " "} </p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <button class="dropdown-item" onClick={handleLogout}>
                    Log Out
                  </button>
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
