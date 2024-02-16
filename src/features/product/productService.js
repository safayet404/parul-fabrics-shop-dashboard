import axios from "axios";
import { base_url } from "../../utils/base_url";
import toast from "react-hot-toast";

const getProducts = async () => {
  try {
    const response = await axios.get(`${base_url}product/all-products`);

    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};

const createProduct = async (product) => {
  try {
    const response = await axios.post(
      `${base_url}product/create-product`,
      product);

    if (response.status === 200) {
      toast.success("Product Data Added Successfully !");
    }
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(
      `${base_url}product/delete-product/${id}`);
    if (response.status === 200) {
      toast.success("Product Data Deleted Successfully !");
    }
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};
const getSingleProduct = async (id) => {
  try {
    const response = await axios.get(`${base_url}product/single-product/${id}`);

    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};
const updateProduct = async (product) => {
  try {
    const response = await axios.put(
      `${base_url}product/update-product/${product.id}`,
      {
        title: product.productData.title,
        description: product.productData.description,

        color: product.productData.color,

        quantity: product.productData.quantity,
        date: product.productData.date,
      }
    );

    if (response.status === 200) {
      toast.success("Product Updated Successfully !");
    }
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};

const productService = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
};

export default productService;
