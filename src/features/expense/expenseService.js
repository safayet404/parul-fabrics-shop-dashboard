import axios from "axios";
import { base_url } from "../../utils/base_url";
import toast from "react-hot-toast";

const createExpense = async (expenseData) => {
  try {
    const response = await axios.post(
      `${base_url}expense/create-expense`,
      expenseData
    );

    if (response.status === 200) {
      toast.success("Expense Data Added Successfully !");
    }
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};

const getAllExpense = async () => {
  try {
    const response = await axios.get(`${base_url}expense/get-all-expense`);
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};

const getSingleExpense = async (id) => {
  try {
    const response = await axios.get(
      `${base_url}expense/get-single-expense/${id}`
    );
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};

const updateExpense = async (expense) => {
  try {
    const response = await axios.put(
      `${base_url}expense/update-expense/${expense.id}`,
      {
        date: expense.expenseData.date,
        purpose: expense.expenseData.purpose,
        description: expense.expenseData.description,
        amount: expense.expenseData.amount,
      }
    );
    if (response.status === 200) {
      toast.success("Expense Data Updated Successfully !");
    }
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong!");
  }
};

const deleteExpenseData = async (id) => {
  try {
    const response = await axios.delete(`${base_url}expense/delete-expense/${id}`)
    if(response.status === 200)
    {
      toast.success("Expense Data Deleted Successfully !")
    }
    return response.data
    
  } catch (error) {
    toast.error("Something Went Wrong !");
  }
};

const expenseService = {
  createExpense,
  getAllExpense,
  getSingleExpense,
  updateExpense,
  deleteExpenseData,
};

export default expenseService;
