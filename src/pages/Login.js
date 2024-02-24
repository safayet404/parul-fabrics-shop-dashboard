import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../utils/firebaseConfig";
import toast from "react-hot-toast";
import useUserStore from "../components/StateManagement";

const Login = () => {
  //const [loginUser, setLoginUser] = useState(null);
  const {setLoginUser} = useUserStore()

  const auth = getAuth(app);

  const navigate = useNavigate();
  let schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
       
          setLoginUser(user)
          localStorage.setItem('user', JSON.stringify(user));
          toast.success("Login Successfully !")
          navigate("/admin")
        })
        .catch((error) => {
          const errorCode = error.code;
          toast.error("Invalid Credentials !")
          const errorMessage = error.message;
        });
  

    },
  });



  return (
    <div
      className="py-5 text-center"
      style={{ background: "#001529", minHeight: "100vh" }}
    >
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Login</h3>
        <p className="text-center">Login to your account to continue</p>

        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            name="email"
            onChange={formik.handleChange("email")}
            value={formik.values.email}
            type="text"
            placeholder="Email Address"
            id="email"
          ></CustomInput>
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
          <CustomInput
            type="password"
            name="password"
            onChange={formik.handleChange("password")}
            value={formik.values.password}
            placeholder="Type Your Password"
            id="pass"
          ></CustomInput>
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
          <button
            type="submit"
            className="border-0 px-3 py-2 btn btn-primary  w-100 text-center text-decoration-none"
          >
            Login
          </button>
          <div className="text-end mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
