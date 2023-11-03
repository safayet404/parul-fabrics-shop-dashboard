import React from "react";
import CustomInput from "../components/CustomInput";
import {Link} from "react-router-dom"
const Login = () => {
  return (
    <div
      className="py-5 text-center"
      style={{ background: "#ffd333", minHeight: "100vh" }}
    >
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Login</h3>
        <p className="text-center">Login to your account to continue</p>
     
        <form>
          <CustomInput
            type="text"
            placeholder="Email Address"
            id="email"
          ></CustomInput>
          <CustomInput
            type="password"
            placeholder="Type Your Password"
            id="pass"
          ></CustomInput>
          <Link to="/admin" className="border-0 px-3 py-2 btn btn-primary  w-100 text-center text-decoration-none">
            Login
          </Link>
          <div className="text-end mt-3">
          <Link to="/forgot-password">
          Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
