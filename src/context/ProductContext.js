import React, { createContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from '../features/customer/customerSlice';
import { getAllSellDetails } from '../features/sell/sellSlice';
import { getAllReceiveData } from '../features/receive/receiveSlice';
import { IoMdTrain } from 'react-icons/io';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    const [sellData, setSellData] = useState([]);
    const [marketDue,setMarketDue] = useState('')

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getCustomers())
    dispatch(getAllSellDetails())
    dispatch(getAllReceiveData())
  },[])


  const allSell = useSelector((state) => state.sell.sells);
  const sellLoader = useSelector((state) => state.sell.isLoading);
  const {createdSellData} = useSelector((state) => state.sell);
  const customerState = useSelector((state) => state.customer.customers)
  const receiveState = useSelector((state) =>  state.receive.receives)
  const {createdReceiveData} = useSelector((state) =>  state.receive)


  useEffect(() => {
    let customerMap = new Map();
  
    for (let i = 0; i < allSell.length; i++) {
      const customerId = allSell[i].customerId._id;
      const customerName = allSell[i].customerId.name;
      
      if (!customerMap.has(customerId)) {
        customerMap.set(customerId, {
          name: customerName,
          dueSum: 0,
          rcvSum: 0,
          totalDue : 0
          
        });
      }
      
      customerMap.get(customerId).dueSum += allSell[i].totalPrice;
     
    }
  
    for (let j = 0; j < receiveState.length; j++) {
      const customerId = receiveState[j].customerId;
      
      if (customerMap.has(customerId)) {
        customerMap.get(customerId).rcvSum += receiveState[j].amount;
      }
    }
  
    const updatedSellData = [];
    customerMap.forEach((value, customerId) => {
      value.totalDue = value.dueSum - value.rcvSum;
      updatedSellData.push({
        
        name: value.name,
        due: value.totalDue >= 0 ? value.totalDue : `Advance :  ${-value.totalDue}` ,
      });
    });
      setSellData(updatedSellData);
  }, [allSell, receiveState]);

  
  useEffect(() => {

    const total = sellData.reduce((acc,item)=>{
       return acc + item.due
    },0)
    setMarketDue(total)
    
  }, [sellData,createdSellData,createdReceiveData]);



  const contextValue = {
    allSell,customerState,receiveState,marketDue,sellData,sellLoader
  }

  return (
    <ProductContext.Provider
      value={contextValue}
    >
      {children}
    </ProductContext.Provider>
  );
};