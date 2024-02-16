import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
import cogoToast from "cogo-toast";



const addReceiveData = async (receiveData) =>{
    try {
        const response = await axios.post(`${base_url}receive/add-receive-data`, receiveData);
    
        if (response.status === 200) {
          cogoToast.success("Receive Information Added Successfully !");
        }
        return response.data;
      } catch (error) {
        console.log(error)
        cogoToast.error("Something Went Wrong !");
      }
}

const getAllReceiveData = async()=>{
    try{
        const response = await axios.get(`${base_url}receive/get-all-receive-data`)
        return response.data
     
    }catch(error)
    {
        cogoToast.error("Something Went Wrong in Receive GET Receive Details !")
    }
}
const getSingleReceiveData = async(id)=>{
    try{
        const response = await axios.get(`${base_url}receive/get-single-receive-data/${id}`)
        return response.data
     
    }catch(error)
    {
        cogoToast.error("Something Went Wrong  !")
    }
}
const getRcvById = async(id)=>{
    try{
        const response = await axios.get(`${base_url}receive/receive-by-id/${id}`)
        return response.data
     
    }catch(error)
    {
        cogoToast.error("Something Went Wrong  !")
    }
}
const deleteSingleReceiveData = async(id)=>{
    try{
        const response = await axios.delete(`${base_url}receive/delete-single-receive-data/${id}`)
        if(response.status === 200)
        {
          cogoToast.success("Deleted Successfully ")
        }
        return response.data

     
    }catch(error)
    {
        cogoToast.error("Something Went Wrong  !")
    }
}
const updateSingleReceiveData = async(receive)=>{
    try{
        const response = await axios.put(`${base_url}receive/update-single-receive-data/${receive.id}`,{
          date : receive.receiveData.date,
          description : receive.receiveData.description,
          amount : receive.receiveData.amount
        })
        if(response.status === 200)
        {
            cogoToast.success("Data Updated Successfully")
        }
        return response.data
     
    }catch(error)
    {
        console.log(error);
        cogoToast.error("Something Went Wrong eikahne  !")
    }
}

const receiveService = {
   addReceiveData,
   getAllReceiveData,
   getSingleReceiveData,
   updateSingleReceiveData,
   deleteSingleReceiveData,
   getRcvById
 
  };
  
export default receiveService;
  