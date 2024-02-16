import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { getAllSellDetails } from "../features/sell/sellSlice";

const columns = [
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
    title: "Stock",
    dataIndex: "stock",
    key: "quantity",
    sorter: (a, b) => a.quantity.length - b.quantity.length,
  },
 
  
 
];


const Stock = () => {
  const [stock, setStock] = useState(null);

  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [day, month, year] = newDate.split("/");
    return [day, month, year].join("-");
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  useEffect(() => {
    dispatch(getAllSellDetails());
  }, []);
  const product_state = useSelector((state) => state.product.products);
  const sell_state = useSelector((state) => state.sell.sells);
  const productData = [];


 const updatedProductQuantity = []

  for (let i = 0; i < product_state.length; i++) {
    let remainQty = product_state[i].quantity
   
    for(let j=0; j<sell_state.length; j++)
    {
      if(product_state[i]._id === sell_state[j].description._id)
      {
        remainQty -= sell_state[j].quantity
       
       
      }
    }
  
    productData.push({
      
      name: product_state[i].title,
      description: (
        <p
          dangerouslySetInnerHTML={{ __html: product_state[i].description }}
        ></p>
      ),

      stock: remainQty ? remainQty : product_state[i].quantity,

      color: product_state[i].color,
      date: changeDateFormat(product_state[i].date),
    });
    updatedProductQuantity.push(
      remainQty
    )
    
   
  }

  useEffect(() => {
    let stockSum = 0;
    for (let index = 0; index < updatedProductQuantity.length; index++) {
      
      stockSum = stockSum + updatedProductQuantity[index];
    }
    setStock(stockSum);
  }, [updatedProductQuantity]);

  return (
    <div>
      <h3 className="mb-4">Total Stock : {stock} </h3>
      <Table columns={columns} dataSource={productData}></Table>
    </div>
  );
};

export default Stock;
