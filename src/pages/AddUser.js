import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addUser, resetState, singleUser, updateUser } from "../features/dashboard-user/dashboardUserSlice";
import app from "../utils/firebaseConfig";

let schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required"),
  
  mobile: Yup.string().required("Mobile is required"),
  role: Yup.string().required("Role is required"),
  address: Yup.string().required("Address is required"),
});

const AddUser = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getUserId = location.pathname.split("/")[3];
  useEffect(()=>{
    if(getUserId !== undefined)
    {
      dispatch(singleUser(getUserId))
    }
    else
    {
      dispatch(resetState())
    }
  },[getUserId])
  const single_state = useSelector((state)=>state.user.singleUser)
  const {name,email,mobile,role,address} = single_state

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: name || "",
      email: email || "",
      password:  "",
      mobile: mobile || "",
      role: role || "",
      address: address || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = {id : getUserId, userData : values}
      if(getUserId !== undefined)
      {
        dispatch(updateUser(data))
        navigate("/admin/user-list")
      }
      else
      {
        dispatch(addUser(values));
        createUserWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            updateProfile(user,{
              displayName : values.name
            })
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
          formik.resetForm()

      }
    },
  });
  return (
    <div>
      <h3 className="mb-4">
        {getUserId !== undefined ? "Edit" : "Add"} User
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit} className="mt-4">
          <CustomInput
            type="text"
            name="name"
            onChange={formik.handleChange("name")}
            onBlur={formik.handleChange("name")}
            value={formik.values.name}
            placeholder="Enter the user name"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="email"
            name="email"
            onChange={formik.handleChange("email")}
            onBlur={formik.handleChange("email")}
            value={formik.values.email}
            placeholder="Enter the email"
          />
          <div className="error">
            {formik.touched.email && formik.errors.email}
          </div>
          <CustomInput
            type="text"
            name="password"
            onChange={formik.handleChange("password")}
            onBlur={formik.handleChange("password")}
            value={formik.values.password}
            placeholder="Enter the password"
          />
          <div className="error">
            {formik.touched.password && formik.errors.password}
          </div>
          <CustomInput
            type="text"
            name="mobile"
            onChange={formik.handleChange("mobile")}
            onBlur={formik.handleChange("mobile")}
            value={formik.values.mobile}
            placeholder="Enter the mobile"
          />
          <div className="error">
            {formik.touched.mobile && formik.errors.mobile}
          </div>
          <CustomInput
            type="text"
            name="role"
            onChange={formik.handleChange("role")}
            onBlur={formik.handleChange("role")}
            value={formik.values.role}
            placeholder="Enter the role"
          />
          <div className="error">
            {formik.touched.role && formik.errors.role}
          </div>
          <CustomInput
            type="text"
            name="address"
            onChange={formik.handleChange("address")}
            onBlur={formik.handleChange("address")}
            value={formik.values.address}
            placeholder="Enter the address"
          />
          <div className="error">
            {formik.touched.address && formik.errors.address}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-4"
          >
            {getUserId !== undefined ? "Update" : "Add"} User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
