import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
import cogoToast from "cogo-toast";
const getProducts = async () => {
  const response = await axios.get(`${base_url}product/all-products`);

  return response.data;
};


const createProduct = async (product) => {
  try {
    const response = await axios.post(`${base_url}product/create-product`, product, config);

    if (response.status === 200) {
      cogoToast.success("Product Added Successfully !");
    }
    return response.data;
  } catch (error) {
    console.log(error)
    cogoToast.error("Something Went Wrong !");
  }
};

const deleteProduct =  async(id) =>{
  const response = await axios.delete(`${base_url}product/delete-product/${id}`,config)
  if(response.status === 200)
  {
    cogoToast.success("Product Deleted Successfully")
  }
  else{
    cogoToast.error('Something Went Wrong !')
  }
  return response.data
}
const getSingleProduct =  async(id) =>{
  try{
    const response = await axios.get(`${base_url}product/single-product/${id}`)
  
  return response.data
  }catch(error)
  {
    cogoToast.error("Something Went Wrong !")
  }
}
const updateProduct = async(product) =>{
  
  try{
    const response = await axios.put(`${base_url}product/update-product/${product.id}`,
    {title : product.productData.title,
      description : product.productData.description,
     
      color : product.productData.color,
  
      quantity : product.productData.quantity,
      date : product.productData.date,
      sell : product.productData.sell,
    
    
    })

    if(response.status === 200)
    {
      cogoToast.success("Product Data Updated")
    }

  }catch(error)
  {
    throw new Error(error)
  }
}

const productService = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct
};

export default productService;
