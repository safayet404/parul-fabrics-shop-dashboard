import axios from "axios";
import { base_url } from "../../utils/base_url";
import toast from "react-hot-toast";

const addUser = async(userData) =>{
    try{
        const response = await axios.post(`${base_url}dashboardUser/add-user`,userData)
        if(response.status === 200)
        {
            toast.success("Dashboard User Added")
        }
        return response.data
    }catch(error)
    {
        toast.error("Something Went Wrong !")
    }
}

const allUser = async()=>{
    try{
        const response = await axios.get(`${base_url}dashboardUser/all-user`)
       return response.data
    }catch(error)
    {
        toast.error("Something Went Wrong !")
    }
}

const singleUser = async(id)=>{
    try{
        const response = await axios.get(`${base_url}dashboardUser/single-user/${id}`)
        return response.data
    }catch(error)
    {
        toast.error("Something Went Wrong !")
    }
}
const singleUserByMail = async(email)=>{
    try{
        const response = await axios.get(`${base_url}dashboardUser/user-mail/${email}`)
        return response.data
    }catch(error)
    {
        console.log(error);
        toast.error("Something Went Wrong here !")
    }
}

const updateUser = async(user) =>{
    try{
        const response = await axios.put(`${base_url}dashboardUser/update-user/${user.id}`,
        {
            name : user.userData.name,
            email : user.userData.email,
            mobile : user.userData.mobile,
            role : user.userData.role,
            address : user.userData.address
        })
        if(response.status === 200)
        {
            toast.success("User Updated Successfully !")
        }
        return response.data
    }catch(error)
    {
        toast.error("Something Went Wrong !")
    }
}

const deleteUser = async(id) =>{
    try{
        const response = await axios.delete(`${base_url}dashboardUser/delete-user/${id}`)
        if(response.status === 200)
        {
            toast.success("User Deleted Successfully !")
        }
        return response.data
    }catch(error)
    {
        toast.error("Something Went Wrong !")
    }
}

const dashboardUserService = {
    addUser,
    allUser,
    singleUser,
    updateUser,
    deleteUser,
    singleUserByMail
}

export default dashboardUserService