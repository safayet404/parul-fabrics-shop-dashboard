import axios from "axios"
import { base_url } from "../../utils/base_url"

import cogoToast from 'cogo-toast';

const getFactories = async () =>{
    const response = await axios.get(`${base_url}factory/get-all-factory`)
    return response.data
}
const getSingleFactory = async (id) =>{
    const response = await axios.get(`${base_url}factory/get-single-factory/${id}`)
    return response.data
}
const updateFactory = async (factory) =>{
    const response = await axios.put(`${base_url}factory/update-factory/${factory.id}`,
    {
        name : factory.factoryData.name,
        address : factory.factoryData.address
    })
    
    if(response.status === 200)
    {
        cogoToast.success("Factory Updated Successfully !")
    }
    else
    {
        cogoToast.error("Something Went Wrong !")
    }
    return response.data
}
const createFactory = async (factory) =>{
    const response = await axios.post(`${base_url}factory/create-factory`,factory)
    if(response.status === 200)
    {
        cogoToast.success('Factory Added Successfully !');
    }
    else
    {
        cogoToast.error('Something Went Wrong !');
    }
    return response.data
}
const deleteFactory = async (id) =>{
    const response = await axios.delete(`${base_url}factory/delete-factory/${id}`)
    if(response.status === 200)
    {
        cogoToast.success('Factory Deleted Successfully !');
    }
    else
    {
        cogoToast.error('Something Went Wrong !');
    }
    return response.data
}

const factoryService = {
   getFactories,
   getSingleFactory,
   updateFactory,
   deleteFactory,
   createFactory
}
export default factoryService