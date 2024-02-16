import axios from "axios";
import { base_url } from "../../utils/base_url"

const getCustomers = async () => {
  const response = await axios.get(`${base_url}customer/get-all-customers`);

  return response.data;
};

const createCustomer = async(customer)=>{
  try{
    const response = await axios.post(`${base_url}customer/create-customer`,customer)
    if(response.status === 200)
    {
      
    }
  }catch(error)
  {
    
  }
}

const getSingleCustomer = async(id)=>{
  try{
    const response = await axios.get(`${base_url}customer/get-single-customer/${id}`)
    return response.data

  }catch(error)
  {
    
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
     
    }
    return response.data

  }catch(error)
  {
    
  }
  
}

const deleteCustomer = async(id) =>{
  try{
    const response = await axios.delete(`${base_url}customer/delete-customer/${id}`)
    if(response.status === 200)
    {
      
    }

  }catch(error)
  {
    
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