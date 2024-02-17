import axios from "axios";
import { base_url } from "../../utils/base_url";
import toast from "react-hot-toast";


const addSell = async (sellDetails) =>{
    try {
        const response = await axios.post(`${base_url}sell/add-sell`, sellDetails);
    
        if (response.status === 200) {
          toast.success("Sell Data Added Successfully !")
        }
        return response.data;
      } catch (error) {
        toast.error("Something Went Wrong !")
        
      }
}

const getAllSellDetails = async()=>{
  try{
      const response = await axios.get(`${base_url}sell/sell-all-details`)
      return response.data
     
    }catch(error)
    {
      toast.error("Something Went Wrong !")
    }
}

const getSingleSellDetails = async(id)=>{
  try{
    const response = await axios.get(`${base_url}sell/sell-single-details/${id}`)
    return response.data

  }catch(error)
  {
    toast.error("Something Went Wrong !")
  }
}
const getSingleSellById = async(id)=>{
  try{
    const response = await axios.get(`${base_url}sell/sell-by-id/${id}`)
    return response.data

  }catch(error)
  {
    toast.error("Something Went Wrong !")
  }
}
const updateSellDetails = async(sell)=>{
  try{
    const response = await axios.put(`${base_url}sell/update-sell-details/${sell.id}`,
    {
      date : sell.sellData.date,
      
      quantity : sell.sellData.quantity,
      price : sell.sellData.price,
      totalPrice : sell.sellData.quantity * sell.sellData.price,
     

    })

    if(response.status === 200)
    {
      toast.success("Sell Data Updated Successfully !")
    }
    return response.data

  }catch(error){
    toast.error("Something Went Wrong !")
    
  }
  
}
const deleteSellData = async(id) => {
  try{
    const response = await axios.delete(`${base_url}sell/delete-sell-data/${id}`)
    if(response.status === 200)
    {
      toast.success("Sell Data Deleted Successfully !")
    }
    return response.data
  }catch(error)
  {
    toast.error("Something Went Wrong !")
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
  