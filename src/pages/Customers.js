import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomer, getCustomers } from "../features/customer/customerSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { ClipLoader } from "react-spinners";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Address",
    dataIndex: "address",
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
const Customers = () => {
  const [open,setOpen] = useState(false)
  const [customerId,setCustomerId] = useState("")

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomers());
  }, []);
  
  const showModal = (e) =>{
    setOpen(true)
    setCustomerId(e)
   }
   const hideModal = () =>{
    setOpen(false)
   }

   const deleteCustomerInfo = (e) =>{
    dispatch(deleteCustomer(e))
    setOpen(false)
    
   }
  const customer_state = useSelector((state) => state.customer.customers);
  const {updatedCustomer,deletedCustomer,isLoading,createdProduct} = useSelector((state)=>state.customer)

  useEffect(()=>{
    dispatch(getCustomers())

  },[updatedCustomer,deletedCustomer,createdProduct])
  
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
            <Link to={`/admin/add-sells/${customer_state[i]._id}`} className=" fs-3 text-danger">
            <FaEye />
            </Link>
            <Link to={`/admin/edit-customer/${customer_state[i]._id}`} className="ms-3 fs-3 text-danger">
              <BiEdit />
            </Link>
            <button className="ms-3 fs-3 text-danger border-0 bg-transparent" 
              onClick={()=>{
                showModal(customer_state[i]._id)
              }}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      });
    }
  }

  return (
    <div>
      {isLoading ? (<div className="text-center mt-5"><ClipLoader/></div>) :
      <div>
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
      onCancel={hideModal}
      open={open}
      performAction= {()=>{
        deleteCustomerInfo(customerId)
      }}
        
        title="Are you sure you want to delete this Customer?"
        />
        </div>}
    </div>
  );
};

export default Customers;