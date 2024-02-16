import axios from "axios";
import { base_url } from "../../utils/base_url";
import toast from "react-hot-toast";

const addReceiveData = async (receiveData) => {
  try {
    const response = await axios.post(
      `${base_url}receive/add-receive-data`,
      receiveData
    );

    if (response.status === 200) {
      toast.success("Received Data Added Successfully !");
    }
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};

const getAllReceiveData = async () => {
  try {
    const response = await axios.get(`${base_url}receive/get-all-receive-data`);
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};
const getSingleReceiveData = async (id) => {
  try {
    const response = await axios.get(
      `${base_url}receive/get-single-receive-data/${id}`
    );
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};
const getRcvById = async (id) => {
  try {
    const response = await axios.get(`${base_url}receive/receive-by-id/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};
const deleteSingleReceiveData = async (id) => {
  try {
    const response = await axios.delete(
      `${base_url}receive/delete-single-receive-data/${id}`
    );
    if (response.status === 200) {
      toast.error("Receive Data Deleted!");
    }
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};
const updateSingleReceiveData = async (receive) => {
  try {
    const response = await axios.put(
      `${base_url}receive/update-single-receive-data/${receive.id}`,
      {
        date: receive.receiveData.date,
        description: receive.receiveData.description,
        amount: receive.receiveData.amount,
      }
    );
    if (response.status === 200) {
      toast.success("Receive Data Updated !");
    }
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};

const receiveService = {
  addReceiveData,
  getAllReceiveData,
  getSingleReceiveData,
  updateSingleReceiveData,
  deleteSingleReceiveData,
  getRcvById,
};

export default receiveService;
