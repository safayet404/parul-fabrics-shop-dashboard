import { Modal } from "antd";

const CustomModal = (props) => {
    const {open,onCancel,performAction,title} = props
  return (
    <Modal title="Confirmation" open={open} onOk={performAction} onCancel={onCancel} okText="OK" cancelText="Cancel">
        <p>{title}</p>
    </Modal>
  )
}

export default CustomModal