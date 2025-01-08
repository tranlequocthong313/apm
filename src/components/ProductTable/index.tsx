import React from "react";
import { Space, Table, TableProps } from "antd";
import { Product } from "../../configs/types/product";
import { FaPen, FaTrash } from "react-icons/fa";
import "./index.css";

interface Props {
  onSelect?: (product: Product) => void;
  onDelete: () => void;
  onEdit: () => void;
  onChangePage: (page: number) => void;
  products: Product[];
  selectedItem?: Product;
  page: number;
  pageSize: number;
}

const ProductTable: React.FC<Props> = ({
  selectedItem,
  onSelect,
  onDelete,
  onChangePage,
  products,
  onEdit,
  page,
  pageSize,
}) => {
  const columns: TableProps<Product>["columns"] = [
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
      title: "Price $",
      dataIndex: "basePrice",
      key: "basePrice",
      render: text => `$${text}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Discount %",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      render: text => `${text}%`,
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
    <Table<Product>
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
      dataSource={products}
      rowHoverable={false}
      rowSelection={{
        type: "radio",
        selectedRowKeys: selectedItem ? [selectedItem.id] : [],
        onChange: selectedKeys => {
          const selectedRow = products.find(product => product.id === selectedKeys[0]);
          if (selectedRow) {
            onSelect?.(selectedRow);
          }
        },
      }}
    />
  );
};

export default ProductTable;
