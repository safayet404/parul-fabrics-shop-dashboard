import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../features/product/productSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Color",
    dataIndex: "color",
    key: "color",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    sorter: (a, b) => a.quantity.length - b.quantity.length,
  },
 
 
  
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

const ProductList = () => {
  const [open,setOpen] = useState(false)
  const [rcvProduct,setRcvProduct] = useState(null)
  const [prodId,setProdId] = useState("")
  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [day, month, year] = newDate.split("/");
    return [day, month, year].join("-");
  };
  const hideModel = () =>{
    setOpen(false)
  }
  const showModal = (e) =>{
    setOpen(true)
    setProdId(e)

  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const product_state = useSelector((state) => state.product.products);
  const productData = [];
  for (let i = 0; i < product_state.length; i++) {
    productData.push({
      key: i + 1,
      name: product_state[i].title,
      description: (
        <p
          dangerouslySetInnerHTML={{ __html: product_state[i].description }}
        ></p>
      ),
     
     
      quantity: product_state[i].quantity,
      
      color:  product_state[i].color,
      date:  changeDateFormat(product_state[i].date),
      

      action: (
        <>
          <Link to={`/admin/edit-product/${product_state[i]._id}`} className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <button className="ms-3 fs-3 text-danger border-0 bg-transparent" onClick={()=>{
            showModal(product_state[i]._id)
          }}>
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  useEffect(()=>{
    let sum =0
    for (let index = 0; index < product_state.length; index++) {
      sum = sum + product_state[index].quantity
    }
    setRcvProduct(sum)

  },[product_state])

  const deleteProducts = (e) =>{
    dispatch(deleteProduct(e))
    setOpen(false)
    setTimeout(()=>{
      dispatch(getProducts())
    },100)
  }
  return (
    <div>
      <h3 className="mb-4"> Total Receive Product : {rcvProduct} </h3>
      <Table columns={columns} dataSource={productData}></Table>
      <CustomModal open={open} title="Are you sure you want to delete this product?" onCancel={hideModel} performAction={()=>{
        deleteProducts(prodId)
      }} />
    </div>
  );
};

export default ProductList;
