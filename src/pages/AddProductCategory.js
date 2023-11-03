import React from "react";
import CustomInput from "../components/CustomInput";

const AddProductCategory = () => {
  return (
    <div>
      <h3 className="mb-4">Add Product Category</h3>
      <div>
        <form>
          <CustomInput type="text" placeholder="Add Product Category" />

          <button className="btn btn-success border-0 rounded-3 my-3">
            Add Product Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductCategory;
