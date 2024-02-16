import axios from "axios";
import { base_url } from "../../utils/base_url";
import cogoToast from "cogo-toast";

const createExpense = async(expenseData) =>{
    try{
        const response = await axios.post(`${base_url}expense/create-expense`,expenseData)
        
        if(response.status === 200)
        {
            cogoToast.success("Expense Data Added Successfully")
        }
        return response.data

    }catch(error)
    {
        cogoToast.error("Something Went Wrong !")
    }
}

const getAllExpense = async()=>{
    try{
        const response = await axios.get(`${base_url}expense/get-all-expense`)
        return response.data
    }catch(error)
    {
        cogoToast.error("Something Went Wront !")
    }
}

const getSingleExpense = async (id) =>{
    try{
        const response = await axios.get(`${base_url}expense/get-single-expense/${id}`)
        return response.data
    }catch(error)
    {
        cogoToast.error("Something Went Wrong !")
    }
}

const updateExpense = async(expense)=>{
    try{
        const response = await axios.put(`${base_url}expense/update-expense/${expense.id}`,
        {
            date : expense.expenseData.date,
            purpose : expense.expenseData.purpose,
            amount : expense.expenseData.amount
        })
        if(response.status === 200)
        {
            cogoToast.success("Expense Updated Successfully")
        }
        return response.data
    }catch(error)
    {
        cogoToast.error("Something Went Wrong here !")
    }
}

const deleteExpense = async(id)=>{
    try{
        const response = await axios.delete(`${base_url}expense/delete-expense/${id}`)

        if(response.status === 200)
        {
            cogoToast.success("Expense Data deleted Successfully")
        }
    }catch(error)
    {
        cogoToast.error("Something Went Wrong !")
    }
}

const expenseService = {
    createExpense,
    getAllExpense,
    getSingleExpense,
    updateExpense,
    deleteExpense
}

export default expenseService