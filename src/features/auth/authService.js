import axios from "axios"
import { base_url } from "../../utils/base_url"
import cogoToast from "cogo-toast"



const login = async(userData) =>{
   
    
    try{
        
        const response = await axios.post(`${base_url}user/admin-login`,userData)
        if(response.status === 200)
        {
            cogoToast.success("Login Success")
        }
        return response.data

        
    }catch(error)
    {
        console.log(error);
        cogoToast.error("Something Went Wrong here !")
    }
  
}

const authService = {
    login,
}

export default authService