import React from "react";
import { Space, Table, TableProps } from "antd";
import { FaPen, FaTrash } from "react-icons/fa";
import "./index.css";
import { Category } from "../../configs/types/category";

interface Props {
  onSelect?: (product: Category) => void;
  onDelete: () => void;
  onEdit: () => void;
  onChangePage: (page: number) => void;
  categories: Category[];
  selectedItem?: Category;
  page: number;
  pageSize: number;
}

const CategoryTable: React.FC<Props> = ({
  selectedItem,
  onSelect,
  onDelete,
  onChangePage,
  categories,
  onEdit,
  page,
  pageSize,
}) => {
  const columns: TableProps<Category>["columns"] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: id => <div className="w-24 truncate">{id}</div>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: text => <strong>{text}</strong>,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <FaPen onClick={onEdit} className="text-textSecondary hover:text-textPrimary" />
          <FaTrash onClick={onDelete} className="text-textSecondary hover:text-textPrimary" />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table<Category>
        className="table w-full"
        scroll={{ x: true }}
        onRow={record => {
          return {
            onClick: () => onSelect?.(record),
          };
        }}
        pagination={{
          onChange(page) {
            onChangePage(page);
          },
          total: pageSize,
          current: page,
          pageSize: 10,
        }}
        rowKey={"id"}
        columns={columns}
        dataSource={categories}
        rowHoverable={false}
        rowSelection={{
          type: "radio",
          selectedRowKeys: selectedItem ? [selectedItem.id] : [],
          onChange: selectedKeys => {
            const selectedRow = categories.find(category => category.id === selectedKeys[0]);
            if (selectedRow) {
              onSelect?.(selectedRow);
            }
          },
        }}
      />
    </>
  );
};

export default CategoryTable;
