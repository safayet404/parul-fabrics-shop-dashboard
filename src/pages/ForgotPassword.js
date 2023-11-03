import React from 'react'
import CustomInput from "../components/CustomInput";

const ForgotPassword = () => {
  return (
    <div
    className="py-5 text-center"
    style={{ background: "#ffd333", minHeight: "100vh" }}
  >
    <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
      <h3 className="text-center">Reset Password</h3>
      <p className="text-center">Enter a new password to reset</p>
   
      <form>
        <CustomInput
          type="password"
          placeholder="New password"
          id="email"
        ></CustomInput>
        <CustomInput
          type="text"
          placeholder="Confirmed the password"
          id="email"
        ></CustomInput>
      
        <button className="btn btn-primary">
       Reset Password
        </button>
      </form>
    </div>
  </div>
  )
}

export default ForgotPassword