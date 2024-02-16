import axios from "axios";
import { base_url } from "../../utils/base_url";
import toast from "react-hot-toast";

const getBalance = async () => {
  try {
    const response = await axios.get(`${base_url}balance/get-all-balance`);
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};
const getSingleBalance = async (id) => {
  try {
    const response = await axios.get(
      `${base_url}balance/get-single-balance/${id}`
    );
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};
const createBalance = async (balance) => {
  try {
    const response = await axios.post(
      `${base_url}balance/create-balance`,
      balance
    );
    if (response.status === 200) {
      toast.success("Balance Addedd Successfully !")
    }
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};
const updateBalance = async (balance) => {
  try {
    const response = await axios.put(
      `${base_url}balance/update-balance/${balance.id}`,
      {
        date: balance.balanceData.date,
        description: balance.balanceData.description,
        amount: balance.balanceData.amount,
      }
    );
    if (response.status === 200) {
      toast.success("Balance Updated Successfully !");
    }
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};
const deleteBalance = async (id) => {
  try {
    const response = await axios.delete(
      `${base_url}balance/delete-balance/${id}`
    );
    if (response.status === 200) {
      toast.success("Balance Deleted Successfully !");
    }
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
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
