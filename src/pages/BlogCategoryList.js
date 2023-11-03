import { Table } from "antd";

const BlogCategoryList = () => {
    const columns = [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Age",
          dataIndex: "age",
          key: "age",
        },
        {
          title: "Address",
          dataIndex: "address",
          key: "address",
        },
      ];
    
      const data2 = [];
    
      for (let i = 0; i < 46; i++) {
        data2.push({
          key: 1,
          name: `Safayet Hossain ${i}`,
          age: 32 + i,
          address: `Faidabad, Primary School Road ${i}`,
        });
      }
  return (
    <div>
        <h3 className="mb-4">Blog Category List</h3>
        <Table columns={columns} dataSource={data2}></Table>
    </div>
  )
}

export default BlogCategoryList