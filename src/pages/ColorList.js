import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteColor, getColor } from "../features/color/colorSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { useState } from "react";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Color Name",
    dataIndex: "name",
    key: "name",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];
const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setColorId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const data2 = [];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColor());
  }, []);

  const color_state = useSelector((state) => state.color.colors);
  for (let i = 0; i < color_state.length; i++) {
    data2.push({
      key: i + 1,
      name: color_state[i].title,
      action: (
        <>
          <Link
            to={`/admin/add-color/${color_state[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(color_state[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteColors = (e) => {
    dispatch(deleteColor(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColor());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4">Color list</h3>
      <div>
        <Table columns={columns} dataSource={data2}></Table>
      </div>
      <CustomModal
        onCancel={hideModal}
        open={open}
        performAction={() => {
          deleteColors(colorId);
        }}
        title="Are you sure you want to delete this color?"
     />
    </div>
  );
};

export default ColorList;
