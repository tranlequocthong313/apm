import React from "react";
import { Space, Table, TableProps } from "antd";
import { FaTrash } from "react-icons/fa";
import { Purchase } from "../../configs/types/purchase";
import { formatDatetime } from "../../utils/formatter";

interface Props {
  onSelect?: (product: Purchase) => void;
  onDelete: () => void;
  onChangePage: (page: number) => void;
  purchases: Purchase[];
  selectedItem?: Purchase;
  page: number;
  pageSize: number;
}

const PurchaseTable: React.FC<Props> = ({
  selectedItem,
  onSelect,
  onDelete,
  onChangePage,
  purchases,
  page,
  pageSize,
}) => {
  const columns: TableProps<Purchase>["columns"] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: id => <div className="w-24 truncate">{id}</div>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Total price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "reviewNote",
      dataIndex: "reviewNote",
      key: "reviewNote",
    },
    {
      title: "reviewComment",
      dataIndex: "reviewComment",
      key: "reviewComment",
      render: comment => (
        <div title={comment} className="w-24 truncate">
          {comment}
        </div>
      ),
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: createdAt => <div>{formatDatetime(createdAt)}</div>,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <FaTrash onClick={onDelete} className="text-textSecondary hover:text-textPrimary" />
        </Space>
      ),
    },
  ];

  return (
    <Table<Purchase>
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
      dataSource={purchases}
      rowHoverable={false}
      rowSelection={{
        type: "radio",
        selectedRowKeys: selectedItem ? [selectedItem.id] : [],
        onChange: selectedKeys => {
          const selectedRow = purchases.find(purchase => purchase.id === selectedKeys[0]);
          if (selectedRow) {
            onSelect?.(selectedRow);
          }
        },
      }}
    />
  );
};

export default PurchaseTable;
