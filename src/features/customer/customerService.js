import axios from "axios";
import { base_url } from "../../utils/base_url"
import cogoToast from "cogo-toast";

const getCustomers = async () => {
  const response = await axios.get(`${base_url}customer/get-all-customers`);

  return response.data;
};

const createCustomer = async(customer)=>{
  try{
    const response = await axios.post(`${base_url}customer/create-customer`,customer)
    if(response.status === 200)
    {
      cogoToast.success("Customer Created")
    }
  }catch(error)
  {
    cogoToast.error("Something Went Wrong !")
  }
}

const getSingleCustomer = async(id)=>{
  try{
    const response = await axios.get(`${base_url}customer/get-single-customer/${id}`)
    return response.data

  }catch(error)
  {
    cogoToast.error("Something Went Wrong !")
  }
}
const updateCustomer = async(customer) =>{
  
  try{
    const response = await axios.put(`${base_url}customer/update-customer/${customer.id}`,
    {
      name : customer.customerData.name,
      email : customer.customerData.email,
      mobile : customer.customerData.mobile,
      address : customer.customerData.address
    }
    )
    if(response.status === 200)
    {
      cogoToast.success("Customer Information is Updated")
    }
    return response.data

  }catch(error)
  {
    cogoToast.error("Something Went Wrong !")
  }
  
}

const deleteCustomer = async(id) =>{
  try{
    const response = await axios.delete(`${base_url}customer/delete-customer/${id}`)
    if(response.status === 200)
    {
      cogoToast.success("Customer Deleted Successfully")
    }

  }catch(error)
  {
    cogoToast.error("Something Went Wrong!")
  }
}
const customerService = {
 getCustomers,
 createCustomer,
 getSingleCustomer,
 deleteCustomer,
 updateCustomer
};

export default customerService;