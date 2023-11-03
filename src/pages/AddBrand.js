import React from "react";
import CustomInput from "../components/CustomInput";

const AddBrand = () => {
  return (
    <div>
      <h3 className="mb-4">Add Brand Name</h3>
      <div >
        <form className="mt-4">
          <CustomInput type="text" placeholder="Enter the brand name" />

          <button className="btn btn-success border-0 rounded-3 my-4">
            Add Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
