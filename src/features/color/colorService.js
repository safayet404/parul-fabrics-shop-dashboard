import axios from "axios";
import { base_url } from "../../utils/base_url"
import { config } from "../../utils/axiosConfig";

import cogoToast from 'cogo-toast';
const getColor = async () =>{
    const response = await axios.get(`${base_url}color/`)
    return response.data
}
const getAColor = async (id) =>{
    const response = await axios.get(`${base_url}color/single-color/${id}`)
    return response.data
}
const createColor = async (color) =>{
    const response = await axios.post(`${base_url}color/`,color,config)
    if(response.status === 200)
    {
        cogoToast.success('Color Added Successfully !');
    }
    else
    {
        cogoToast.error('Something Went Wrong !');
    }
    return response.data
}
const updateColor = async (color) => {
  const response = await axios.put(
    `${base_url}color/update-color/${color.id}`,
    { title: color.colorData.title },
    config
  );
  if (response.status === 200) {
    cogoToast.success("Color Updated Successfully !");
  } else {
    cogoToast.error("Something Went Wrong !");
  }
  return response.data;
};
const deleteColor = async (id) => {
  const response = await axios.delete(
    `${base_url}color/delete-color/${id}`,

    config
  );
  if (response.status === 200) {
    cogoToast.success("Color Deleted Successfully !");
  } else {
    cogoToast.error("Something Went Wrong !");
  }
  return response.data;
};

const colorService = {
    getColor,
    createColor,
    getAColor,
    updateColor,
    deleteColor
}

export default colorService