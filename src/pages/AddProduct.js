
import CustomInput from "../components/CustomInput";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const AddProduct = () => {
    const [desc, setDesc] = useState("");

    const handleDesc = (e) => {
      setDesc(e);
    };
  const { Dragger } = Upload;
  const props = {
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <div>
      <h3 className="mb-4">Add Product</h3>

      <div>
        <form>
          <CustomInput
            className="mt-3"
            type="text"
            placeholder="Enter the product title"
          />
             <ReactQuill className="mt-3 mb-4"
            theme="snow"
            value={desc}
            placeholder="Enter the description"
            onChange={(evt) => {
              handleDesc(evt);
            }}
          />
          <CustomInput
            className="mt-3"
            type="number"
            placeholder="Enter the price"
          />
          <select name="" className="form-control py-3 mb-3">
            <option value="">Select the category</option>
          </select>
          <CustomInput
            className="mt-3"
            type="color"
            placeholder="Enter the color"
          />
          <select name="" className="form-control py-3 mb-3">
            <option value="">Select the brand name</option>
          </select>
          <CustomInput
            className="mt-3"
            type="number"
            placeholder="Enter the quantity"
          />

          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
          <button className="btn btn-success border-0 rounded-3 my-4">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
