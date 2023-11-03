import React from "react";
import CustomInput from "../components/CustomInput";

const AddCupon = () => {
  return (
    <div>
      <h3 className="mb-4">Add Cupon</h3>
      <div >
        <form className="mt-4">
          <CustomInput type="text" placeholder="Enter the blog category" />
          <CustomInput className="mt-4" type="number" placeholder="Enter the discount percentage" />

          <button className="btn btn-success border-0 rounded-3 my-3">
            Add Cupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCupon;
