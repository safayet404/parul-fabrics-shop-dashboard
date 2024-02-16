import axios from "axios";
import { base_url } from "../../utils/base_url";

const createExpense = async(expenseData) =>{
    try{
        const response = await axios.post(`${base_url}expense/create-expense`,expenseData)
        
        if(response.status === 200)
        {
            
        }
        return response.data

    }catch(error)
    {
        
    }
}

const getAllExpense = async()=>{
    try{
        const response = await axios.get(`${base_url}expense/get-all-expense`)
        return response.data
    }catch(error)
    {
        
    }
}

const getSingleExpense = async (id) =>{
    try{
        const response = await axios.get(`${base_url}expense/get-single-expense/${id}`)
        return response.data
    }catch(error)
    {
        
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
            
        }
        return response.data
    }catch(error)
    {
        
    }
}

const deleteExpense = async(id)=>{
    try{
        const response = await axios.delete(`${base_url}expense/delete-expense/${id}`)

        if(response.status === 200)
        {
            
        }
    }catch(error)
    {
        
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