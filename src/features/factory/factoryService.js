import axios from "axios";
import { base_url } from "../../utils/base_url";
import toast from "react-hot-toast";

const getFactories = async () => {
  try {
    const response = await axios.get(`${base_url}factory/get-all-factory`);
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};
const getSingleFactory = async (id) => {
  try {
    const response = await axios.get(
      `${base_url}factory/get-single-factory/${id}`
    );
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};
const updateFactory = async (factory) => {
  try {
    const response = await axios.put(
      `${base_url}factory/update-factory/${factory.id}`,
      {
        name: factory.factoryData.name,
        address: factory.factoryData.address,
      }
    );

    if (response.status === 200) {
      toast.success("Factory Data Updated !");
    }
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};
const createFactory = async (factory) => {
  try {
    const response = await axios.post(
      `${base_url}factory/create-factory`,
      factory
    );
    if (response.status === 200) {
      toast.error("Factory Data Added Successfully !");
    }
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};
const deleteFactory = async (id) => {
  try {
    const response = await axios.delete(
      `${base_url}factory/delete-factory/${id}`
    );
    if (response.status === 200) {
      toast.success("Factory Data Deleted Successfully !");
    }

    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};

const factoryService = {
  getFactories,
  getSingleFactory,
  updateFactory,
  deleteFactory,
  createFactory,
};
export default factoryService;
