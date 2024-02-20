import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { deleteFactory, getFactories } from "../features/factory/factorySlice";
import { ClipLoader } from "react-spinners";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    sorter: (a, b) => a.address.length - b.address.length,
  },

  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];
const Factory = () => {
  const [open, setOpen] = useState(false);
  const [factoryId, setFactoryId] = useState("");

  const hideModel = () => {
    setOpen(false);
  };
  const showModal = (e) => {
    setOpen(true);
    setFactoryId(e);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFactories());
  }, []);
  const factory_state = useSelector((state) => state.factory.factories);
  const { createdFactory, updatedFactory, deletedFactory, isLoading } =
    useSelector((state) => state.factory);

  useEffect(() => {
    dispatch(getFactories());
  }, [createdFactory, updatedFactory, deletedFactory]);
  const factoryData = [];
  for (let i = 0; i < factory_state.length; i++) {
    factoryData.push({
      key: i + 1,
      name: factory_state[i].name,
      address: factory_state[i].address,

      action: (
        <>
          <Link
            to={`/admin/mills-balance/${factory_state[i]._id}`}
            className=" fs-3 text-danger"
          >
            <FaEye />
          </Link>
          <Link
            to={`/admin/add-mill/${factory_state[i]._id}`}
            className="ms-3 fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger border-0 bg-transparent"
            onClick={() => {
              showModal(factory_state[i]._id);
            }}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteSingleFactory = (e) => {
    dispatch(deleteFactory(e));
    setOpen(false);
  };
  return (
    <div>
      {isLoading ? (
        <div className="text-center mt-5">
          <ClipLoader />
        </div>
      ) : (
        <div>
          <h3 className="mb-4"> Mills and Factories </h3>
          <Table columns={columns} dataSource={factoryData} scroll={{
                    x: 700,
                  }}></Table>
          <CustomModal
            open={open}
            title="Are you sure you want to delete this?"
            onCancel={hideModel}
            performAction={() => {
              deleteSingleFactory(factoryId);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Factory;
