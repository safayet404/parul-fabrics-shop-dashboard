import axios from "axios";
import { base_url } from "../../utils/base_url"
import { config } from "../../utils/axiosConfig";
import cogoToast from 'cogo-toast';
const getBrands = async () => {
    const response = await axios.get(`${base_url}brand/`)

    return response.data
}
const createBrands = async (brand) => {
    const response = await axios.post(`${base_url}brand`,brand ,config)
    

    if(response.status === 200)
    {
        cogoToast.success('Brand Added Successfully !');
    }
    else
    {
        cogoToast.error('Something Went Wrong !');
    }
    return response.data
}
const deleteBrand = async (id) => {
    const response = await axios.delete(`${base_url}brand/delete-brand/${id}` ,config)
    

    if(response.status === 200)
    {
        cogoToast.success('Brand Deleted Successfully !');
    }
    else
    {
        cogoToast.error('Something Went Wrong !');
    }
    return response.data
}
const updateBrand = async (brand) => {
  const response = await axios.put(
    `${base_url}brand/update-brand/${brand.id}`,
    { title: brand.brandData.title },
    config
  );

  if (response.status === 200) {
    cogoToast.success("Brand Update Successfully !");
  } else {
    cogoToast.error("Something Went Wrong !");
  }
  return response.data;
};
const getABrand = async (id) => {
    const response = await axios.get(`${base_url}brand/single-brand/${id}` ,config)
    return response.data
}
const brandService = {
    getBrands,
    createBrands,
    getABrand,
    updateBrand,
    deleteBrand
}

export default brandService