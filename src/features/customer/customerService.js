import axios from "axios";
import { base_url } from "../../utils/base_url";
import toast from "react-hot-toast";

const getCustomers = async () => {
  const response = await axios.get(`${base_url}customer/get-all-customers`);

  return response.data;
};

const createCustomer = async (customer) => {
  try {
    const response = await axios.post(
      `${base_url}customer/create-customer`,
      customer
    );
    if (response.status === 200) {
      toast.success("Customer Added Successfully !");
    }
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};

const getSingleCustomer = async (id) => {
  try {
    const response = await axios.get(
      `${base_url}customer/get-single-customer/${id}`
    );
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};
const updateCustomer = async (customer) => {
  try {
    const response = await axios.put(
      `${base_url}customer/update-customer/${customer.id}`,
      {
        name: customer.customerData.name,
        mobile: customer.customerData.mobile,
        address: customer.customerData.address,
      }
    );
    if (response.status === 200) {
      toast.success("Customer Updated Successfully ! ");
    }
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};

const deleteCustomer = async (id) => {
  try {
    const response = await axios.delete(
      `${base_url}customer/delete-customer/${id}`
    );
    if (response.status === 200) {
      toast.success("Customer Deleted Successfully !");
    }

    return response.data
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};
const customerService = {
  getCustomers,
  createCustomer,
  getSingleCustomer,
  deleteCustomer,
  updateCustomer,
};

export default customerService;
