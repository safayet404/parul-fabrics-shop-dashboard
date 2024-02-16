import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";


const addSell = async (sellDetails) =>{
    try {
        const response = await axios.post(`${base_url}sell/add-sell`, sellDetails);
    
        if (response.status === 200) {
         
        }
        return response.data;
      } catch (error) {
        console.log(error)
        
      }
}

const getAllSellDetails = async()=>{
  try{
      const response = await axios.get(`${base_url}sell/sell-all-details`)
      return response.data
     
    }catch(error)
    {
        
    }
}

const getSingleSellDetails = async(id)=>{
  try{
    const response = await axios.get(`${base_url}sell/sell-single-details/${id}`)
    return response.data

  }catch(error)
  {
    
  }
}
const getSingleSellById = async(id)=>{
  try{
    const response = await axios.get(`${base_url}sell/sell-by-id/${id}`)
    return response.data

  }catch(error)
  {
    
  }
}
const updateSellDetails = async(sell)=>{
  try{
    const response = await axios.put(`${base_url}sell/update-sell-details/${sell.id}`,
    {
      date : sell.sellData.date,
      description : sell.sellData.description,
      quantity : sell.sellData.quantity,
      price : sell.sellData.price,
     

    })

    if(response.status === 200)
    {
      
    }
    return response.data

  }catch(error){
    console.log("here",error);
    
  }
  
}
const deleteSellData = async(id) => {
  try{
    const response = await axios.delete(`${base_url}sell/delete-sell-data/${id}`)
    if(response.status === 200)
    {
     
    }
    return response.data
  }catch(error)
  {
    
  }
}

const sellService = {
   addSell,
   getAllSellDetails,
   getSingleSellDetails,
   updateSellDetails,
   deleteSellData,
   getSingleSellById,
  };
  
  export default sellService;
  