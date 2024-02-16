import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrand, getBrands } from "../features/brand/brandSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import CustomModal from "../components/CustomModal";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const BrandList = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");

  const hideModel = () => {
    setOpen(false);
  };
  const showModal = (e) => {
    setOpen(true);
    setBrandId(e);
  };

  const data2 = [];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
  }, []);
  const brand_state = useSelector((state) => state.brand.brands);
  for (let i = 0; i < brand_state.length; i++) {
    data2.push({
      key: i + 1,
      brand: brand_state[i].title,
      action: (
        <>
          <Link
            to={`/admin/add-brand/${brand_state[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger border-0 bg-transparent"
            onClick={() => {
              showModal(brand_state[i]._id);
            }}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBrands = (e) => {
    dispatch(deleteBrand(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4">Brand list</h3>
      <Table columns={columns} dataSource={data2}></Table>
      <CustomModal
        open={open}
        onCancel={hideModel}
        performAction={() => {
          deleteBrands(brandId);
        }}
        title="Are you sure you want to delete this brand?"
      />
    </div>
  );
};

export default BrandList;
