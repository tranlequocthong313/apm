import React, { useState } from "react";
import { Flex, Table, TableProps } from "antd";
import { Product } from "../../configs/types/product";
import "./index.css";
import ToggleColumnDropdown from "../ToggleColumnDropdown";

interface Props {
  onSelect?: (product: Product) => void;
  onDelete: () => void;
  onEdit: () => void;
  onChangePage: (page: number) => void;
  products: Product[];
  selectedItem?: Product;
  page: number;
  pageSize: number;
  columns: TableProps<Product>["columns"];
  pagination?: boolean;
}

const ProductTable: React.FC<Props> = ({
  selectedItem,
  onSelect,
  onChangePage,
  products,
  page,
  pageSize,
  columns,
  pagination = true,
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

      <Table<Product>
        className="table w-full"
        scroll={{ x: true }}
        onRow={record => {
          return {
            onClick: () => onSelect?.(record),
          };
        }}
        pagination={
          pagination && {
            onChange(page) {
              onChangePage(page);
            },
            total: pageSize,
            current: page,
            pageSize: 10,
          }
        }
        rowKey={"id"}
        columns={columns!.filter(column => selectedColumns.includes(String(column.key)))}
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
    </Flex>
  );
};

export default ProductTable;
