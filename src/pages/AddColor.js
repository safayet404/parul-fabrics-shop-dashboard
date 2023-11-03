import React from "react";
import CustomInput from "../components/CustomInput";

const AddColor = () => {
  return (
    <div>
      <h3 className="mb-4">Add Color</h3>

      <div>
        <form>
          <CustomInput type="color" placeholder="Enter your color" />

          <button className="btn btn-success border-0 rounded-3 my-3">
          Add Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
