import CustomInput from "../components/CustomInput";
import { Switch, Table } from 'antd';
import * as Yup from "yup";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  createSellInfo,
  deleteSellData,
  getAllSellDetails,
  getSingleSellDetails,
} from "../features/sell/sellSlice";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import { Link } from "react-router-dom";
import {
  addReceiveData,
  deleteSingleReceiveData,
  getAllReceiveData,
  getRcvById,
  getSingleReceiveData,
} from "../features/receive/receiveSlice";
import { getSingleCustomer } from "../features/customer/customerSlice";
import CustomModal from "../components/CustomModal";
import { getFactories } from "../features/factory/factorySlice";
import { deleteProduct, getProducts } from "../features/product/productSlice";
import { ClipLoader } from "react-spinners";
import { TbCurrency, TbCurrencyTaka } from "react-icons/tb";
const sell_column = [
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
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    
  },
];
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
    title: "Description",
    dataIndex: "description",
  },

  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];
let sellSchema = Yup.object().shape({
  quantity: Yup.number().required("Quantity is required"),
  price: Yup.number().required("Price is required"),
  description: Yup.string().required("Description is required"),
  date: Yup.date().required("Date is required"),
});
let receiveSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required"),
  description: Yup.string().required("Description is required"),
  date: Yup.date().required("Date is required"),
});

const AddSell = () => {
  const [totalAmount, setTotalAmount] = useState(null);
  const [rcvTotalAmount, setRcvTotalAmount] = useState(null);
  const [sellOpen, setSellOpen] = useState(false);
  const [rcvOpen, setRcvOpen] = useState(false);
  const [sellId, setSellId] = useState("");
  const [rcvId, setRcvId] = useState("");
  const [updatedStock,setUpdatedStock] = useState([])

  let dueOrBalance = totalAmount - rcvTotalAmount;
  console.log(dueOrBalance);
  const showSellModal = (e) => {
    setSellOpen(true);
    setSellId(e);
  };
  const hideSellModal = () => {
    setSellOpen(false);
  };
  const showRcvModal = (e) => {
    setRcvOpen(true);
    setRcvId(e);
  };
  const hideRcvModal = () => {
    setRcvOpen(false);
  };

  const deleteSellDetails = (e) => {
    dispatch(deleteSellData(e));
    setSellOpen(false);
    setTimeout(() => {
      dispatch(getSingleSellDetails(getCustomerId));
    }, 100);
  };
  const deleteRcvDetails = (e) => {
    dispatch(deleteSingleReceiveData(e));
    setRcvOpen(false);
    setTimeout(() => {
      dispatch(getSingleReceiveData(getCustomerId));
    }, 200);
  };
  const dispatch = useDispatch();

  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [day, month, year] = newDate.split("/");
    return [day, month, year].join("-");
  };

  const location = useLocation();
  const getCustomerId = location.pathname.split("/")[3];
  console.log(getCustomerId);
  useEffect(() => {
    dispatch(getSingleReceiveData(getCustomerId));
    dispatch(getSingleSellDetails(getCustomerId));
    dispatch(getSingleCustomer(getCustomerId));
    dispatch(getFactories());
    dispatch(getProducts());
    dispatch(getAllSellDetails())
  }, []);

  const all_sell = useSelector((state) => state.sell.sells);

  const sell_state = useSelector((state) => state.sell.singleSellData);
  const sellLoader = useSelector((state) => state.sell.isLoading);
  const receive_state = useSelector((state) => state.receive.singleReceiveData);
  const customer_state = useSelector((state) => state.customer.singleCustomer);
  const product_state = useSelector((state) => state.product.products);
  const receiveUpdate = useSelector((state) => state.receive);
  const receiveLoader = useSelector((state) => state.receive.isLoading);
  const { createdReceiveData, deletedRcvData, updatedReceivedData } =
    receiveUpdate;
  const { createdSellData, deletedSellData, updatedSellData } = useSelector(
    (state) => state.sell
  );

  useEffect(() => {
    dispatch(getSingleReceiveData(getCustomerId));
  }, [createdReceiveData, deletedRcvData, updatedReceivedData]);
  useEffect(() => {
    dispatch(getSingleSellDetails(getCustomerId));
  }, [createdSellData, deletedSellData, updatedSellData]);
  const sellData = [];
  for (
    let index = 0;
    sell_state?.length && index < sell_state.length;
    index++
  ) {
    sellData.push({
      key : index + 1,
      description: sell_state[index].description.title,
      date: changeDateFormat(sell_state[index].date),
      quantity: sell_state[index].quantity,
      price: sell_state[index].price,
      totalPrice: sell_state[index].totalPrice,
      action: (
        <>
          <Link
            to={`/admin/update-sell-rcv/${sell_state[index]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showSellModal(sell_state[index]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const receiveData = [];
  for (let i = 0; receive_state?.length && i < receive_state?.length; i++) {
    if (receive_state[i].customerId === getCustomerId) {
      receiveData.push({
        key : i +1,
        date: changeDateFormat(receive_state[i].date),
        description: receive_state[i].description,
        amount: receive_state[i].amount,
        action: (
          <>
            <Link
              to={`/admin/update-rcv/${receive_state[i]._id}`}
              className=" fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showRcvModal(receive_state[i]._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      });
    }
  }

  
  const stockProduct = []
  for (let i = 0; i < product_state.length; i++) {
    let remainQty = product_state[i].quantity;

    for (let j = 0; j < all_sell.length; j++) {
      if (product_state[i]._id === all_sell[j].description._id) {
        remainQty -= all_sell[j].quantity;
      }
    }

    if(remainQty !== 0)
    {
      stockProduct.push({
        title:  product_state[i].title + " -- " + remainQty,
        id : product_state[i]._id
      });
    }
  }


  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < sell_state.length; index++) {
      if (sell_state[index].customerId === getCustomerId) {
        sum = sum + sell_state[index].totalPrice;
      }
    }
    console.log("total price", sum);
    setTotalAmount(sum);
  }, [sell_state]);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < receive_state.length; index++) {
      if (receive_state[index].customerId === getCustomerId) {
        sum = sum + receive_state[index].amount;
      }
    }
    console.log("total price", sum);
    setRcvTotalAmount(sum);
  }, [receive_state]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: "",
      quantity: "",
      price: "",
      date: "",
      customerId: getCustomerId || "",
    },
    validationSchema: sellSchema,
    onSubmit: (values) => {
      dispatch(createSellInfo(values));
      setTimeout(() => {
        dispatch(getSingleSellDetails(getCustomerId));
      }, 200);
      formik.resetForm();
    },
  });

  const RcvFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: "",
      amount: "",
      date: "",
      customerId: getCustomerId || "",
    },
    validationSchema: receiveSchema,
    onSubmit: (values) => {
      dispatch(addReceiveData(values));

      RcvFormik.resetForm();
    },
  });

  return (
    <div>
      <div className="row mb-5">
        <div className="col-6">
          <h2>Name : {customer_state.name}</h2>
        </div>
        <div className="col-6">
          <h2>
            {" "}
            {dueOrBalance < 0
              ? `Total Advance Balance : ${-dueOrBalance} `
              : `Total Due Amount : ${dueOrBalance}`}{" "} <TbCurrencyTaka/>
          </h2>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <h3 className="mb-4">Add Sells Info</h3>

          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              className="mt-3"
              type="date"
              name="date"
              onChange={formik.handleChange("date")}
              onBlue={formik.handleBlur("date")}
              value={formik.values.date}
              placeholder="Enter the date"
            />

            <div className="error">
              {formik.touched.date && formik.errors.date}
            </div>

            <select
              name="description"
              className="form-control py-3 mb-3"
              onChange={formik.handleChange("description")}
              onBlur={formik.handleBlur("description")}
              value={formik.values.description}
            >
              <option value="">Select the Product</option>
              {stockProduct.map((i, j) => {
                return (
                  <option key={j} value={i.id}>
                    {i.title}
                  </option>
                );
              })}
            </select>
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>

            <div className="row">
              <div className="col-6">
                <CustomInput
                  type="number"
                  name="quantity"
                  onChange={formik.handleChange("quantity")}
                  onBlue={formik.handleBlur("quantity")}
                  value={formik.values.quantity}
                  placeholder="Enter the product quantity"
                />
              </div>
              <div className="col-6">
                <CustomInput
                  type="number"
                  name="price"
                  onChange={formik.handleChange("price")}
                  onBlue={formik.handleBlur("price")}
                  value={formik.values.price}
                  placeholder="Enter the product rate"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="error">
                  {formik.touched.quantity && formik.errors.quantity}
                </div>
              </div>
              <div className="col-6">
                <div className="error">
                  {formik.touched.price && formik.errors.price}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success border-0 rounded-3 "
            >
              Add Sell
            </button>
          </form>
        </div>

        <div className="col-6">
          <h3 className="mb-4">Add Receive Info</h3>

          <form onSubmit={RcvFormik.handleSubmit}>
            <CustomInput
              type="date"
              name="date"
              onChange={RcvFormik.handleChange("date")}
              onBlur={RcvFormik.handleBlur("date")}
              value={RcvFormik.values.date}
              placeholder="Enter Expiry Data"
            />
            <div className="error">
              {RcvFormik.touched.date && RcvFormik.errors.date}
            </div>
            <CustomInput
              type="text"
              name="description"
              onChange={RcvFormik.handleChange("description")}
              onBlur={RcvFormik.handleBlur("description")}
              value={RcvFormik.values.description}
              placeholder="Enter description"
              id="date"
            />
            <div className="error">
              {RcvFormik.touched.description && RcvFormik.errors.description}
            </div>
            <CustomInput
              type="number"
              name="amount"
              onChange={RcvFormik.handleChange("amount")}
              onBlur={RcvFormik.handleBlur("amount")}
              value={RcvFormik.values.amount}
              placeholder="Enter the amount"
            />
            <div className="error">
              {RcvFormik.touched.amount && RcvFormik.errors.amount}
            </div>

            <button
              type="submit"
              className="btn btn-success border-0 rounded-3 "
            >
              Add Received Info
            </button>
          </form>
        </div>

        <div className="row">
          <div className="col-6">
            {sellLoader ? (
              <div className="text-center mt-5">
                <ClipLoader />
              </div>
            ) : (
              <div>
                <h3 className="mb-4 title mt-4">Total Bills : {totalAmount} <TbCurrencyTaka/> </h3>
                <div >
                  <Table className="responsive-table" columns={sell_column} dataSource={sellData} 
                   scroll={{
                    x: 700,
                  }}

                  />
                </div>
              </div>
            )}
          </div>
          <div className="col-6">
            {receiveLoader ? (
              <div className="text-center mt-5">
                <ClipLoader />
              </div>
            ) : (
              <div>
                <h3 className="mb-4 title mt-4">
                  Total Receive Amount : {rcvTotalAmount}  <TbCurrencyTaka/>
                </h3>
                <div>
                  <Table columns={rcv_column} dataSource={receiveData}  scroll={{
                    x: 700,
                  }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <CustomModal
        open={sellOpen}
        onCancel={hideSellModal}
        performAction={() => {
          deleteSellDetails(sellId);
        }}
        title="Are you sure you want to delete sell data?"
      />
      <CustomModal
        open={rcvOpen}
        onCancel={hideRcvModal}
        performAction={() => {
          deleteRcvDetails(rcvId);
        }}
        title="Are you sure you want to delete receive data?"
      />
    </div>
  );
};

export default AddSell;
