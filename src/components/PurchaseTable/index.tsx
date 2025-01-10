import React, { useState } from "react";
import { Flex, Table, TableProps } from "antd";
import { Purchase } from "../../configs/types/purchase";
import ToggleColumnDropdown from "../ToggleColumnDropdown";

interface Props {
  onSelect?: (product: Purchase) => void;
  onDelete: () => void;
  onChangePage: (page: number) => void;
  purchases: Purchase[];
  selectedItem?: Purchase;
  page: number;
  pageSize: number;
  columns: TableProps<Purchase>["columns"];
}

const PurchaseTable: React.FC<Props> = ({
  selectedItem,
  onSelect,
  onChangePage,
  purchases,
  page,
  pageSize,
  columns,
}) => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    columns!.map(col => String(col.key)),
  );

  return (
    <Flex vertical gap={20}>
      <ToggleColumnDropdown
        columns={columns!.map(col => ({ key: String(col.key), label: String(col.title) }))}
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
      />

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
          showSizeChanger: false,
        }}
        rowKey={"id"}
        columns={columns!.filter(column => selectedColumns.includes(String(column.key)))}
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
    </Flex>
  );
};

export default PurchaseTable;
