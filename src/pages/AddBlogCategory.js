import React from "react";
import CustomInput from "../components/CustomInput";

const AddBlogCategory = () => {
  return (
    <div>
      <h3 className="mb-4">Add Blog Category</h3>
      <div >
        <form className="mt-4">
          <CustomInput type="text" placeholder="Enter the blog category" />

          <button className="btn btn-success border-0 rounded-3 my-4">
            Add Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
