import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { allUser, deleteUser } from '../features/dashboard-user/dashboardUserSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import CustomModal from '../components/CustomModal';

const users = [
    {
      title: "SNo",
      dataIndex: "key",
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: "Name",
      dataIndex: "name",
    
     
    },
    {
      title: "Email",
      dataIndex: "email",
      
    },
    {
      title: "Mobile",
      dataIndex: "mobile"
    },
    {
      title: "Role",
      dataIndex: "role"
    },
    {
      title: "Address",
      dataIndex: "address"
    },
    {
        title: "Action",
        dataIndex: "action",
        key: "action",
      },
  ];

const UserList = () => {
    const [open,setOpen] = useState(false)
    const [userId,setUserId] = useState("")
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(allUser())
    },[])
    const showModal = (e) =>{
        setOpen(true)
        setUserId(e)
    }
    const hideModal= () =>{
        setOpen(false)
    }
 
    const user_state = useSelector((state)=>state.user.users)
    const {updatedUser,deletedUser} = useSelector((state)=>state.user)
   console.log("ck",deletedUser);
    const userData = []

    for(let i=0; i<user_state.length; i++)
    {
        userData.push({
            key : i+1,
            name : user_state[i].name,
            email : user_state[i].email,
            mobile : user_state[i].mobile,
            role : user_state[i].role,
            address : user_state[i].address,
            action : (
                <>
                <Link to={`/admin/add-user/${user_state[i]._id}`} className='ms-3 fs-3 text-danger'>
                    <BiEdit/>
                </Link>
                <button className='ms-3 fs-3 text-danger border-0 bg-transparent' onClick={()=>showModal(user_state[i]._id)}>
                    <AiFillDelete/>
                </button>
                </>
            )
        })
    }
    const userInfoDelete = (e) =>{
        dispatch(deleteUser(e))
        setOpen(false)
    }
    useEffect(()=>{
        dispatch(allUser())
    },[updatedUser,deletedUser])
  return (
    <div>
        <div>
            <h3 className='mb-4 title'>User List</h3>
            <div>

            <Table columns={users} dataSource={userData} scroll={{
                x : 700
            }} />
            </div>
            <CustomModal
            onCancel={hideModal}
            open={open}
            performAction={()=>{
                userInfoDelete(userId)
            }}
            title="Are you sure you want to delete this?"
            />

        </div>
    </div>
  )
}

export default UserList