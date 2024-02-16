import axios from "axios";
import { base_url } from "../../utils/base_url";

import cogoToast from "cogo-toast";

const getBalance = async () => {
  try {
    const response = await axios.get(`${base_url}balance/get-all-balance`);
    return response.data;
  } catch (error) {
    cogoToast.error("Something Went Wrong here !");
    console.log(error);
  }
};
const getSingleBalance = async (id) => {
  try {
    const response = await axios.get(
      `${base_url}balance/get-single-balance/${id}`
    );
    return response.data;
  } catch (error) {
    cogoToast.error("Something Went Wrong !");
  }
};
const createBalance = async (balance) => {
  const response = await axios.post(
    `${base_url}balance/create-balance`,
    balance
  );
  if (response.status === 200) {
    cogoToast.success("Balance Added Successfully !");
  } else {
    cogoToast.error("Something Went Wrong !");
  }
  return response.data;
};
const updateBalance = async (balance) => {
  const response = await axios.put(
    `${base_url}balance/update-balance/${balance.id}`,
    {
      date: balance.balanceData.date,
      description: balance.balanceData.description,
      amount: balance.balanceData.amount,
    }
  );
  if (response.status === 200) {
    cogoToast.success("Balance Updated Successfully !");
  } else {
    cogoToast.error("Something Went Wrong !");
  }
  return response.data;
};
const deleteBalance = async (id) => {

    try{
        const response = await axios.delete(
            `${base_url}balance/delete-balance/${id}`
          );
          if (response.status === 200) {
            cogoToast.success("Balance Deleted Successfully !");
          } else {
            cogoToast.error("Something Went Wrong !");
          }
          return response.data;

    }catch(error)
    {
        cogoToast.error("Something Went Wrong !")
    }
  
};

const balanceService = {
  getBalance,
  getSingleBalance,
  updateBalance,
  createBalance,
  deleteBalance,
};

export default balanceService;
