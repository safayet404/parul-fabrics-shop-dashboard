import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
const addReceiveData = async (receiveData) =>{
    try {
        const response = await axios.post(`${base_url}receive/add-receive-data`, receiveData);
    
        if (response.status === 200) {
            
          
        }
        return response.data;
      } catch (error) {
        console.log(error)
        
      }
}

const getAllReceiveData = async()=>{
    try{
        const response = await axios.get(`${base_url}receive/get-all-receive-data`)
        return response.data
     
    }catch(error)
    {
        
    }
}
const getSingleReceiveData = async(id)=>{
    try{
        const response = await axios.get(`${base_url}receive/get-single-receive-data/${id}`)
        return response.data
     
    }catch(error)
    {
        
    }
}
const getRcvById = async(id)=>{
    try{
        const response = await axios.get(`${base_url}receive/receive-by-id/${id}`)
        return response.data
     
    }catch(error)
    {
       
    }
}
const deleteSingleReceiveData = async(id)=>{
    try{
        const response = await axios.delete(`${base_url}receive/delete-single-receive-data/${id}`)
        if(response.status === 200)
        {
          
        }
        return response.data

     
    }catch(error)
    {
       
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
            
        }
        return response.data
     
    }catch(error)
    {
        console.log(error);
        
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
  