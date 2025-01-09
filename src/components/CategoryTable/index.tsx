import React, { useState } from "react";
import { Flex, Table, TableProps } from "antd";
import "./index.css";
import { Category } from "../../configs/types/category";
import ToggleColumnDropdown from "../ToggleColumnDropdown";

interface Props {
  onSelect?: (product: Category) => void;
  onDelete: () => void;
  onEdit: () => void;
  onChangePage: (page: number) => void;
  categories: Category[];
  selectedItem?: Category;
  page: number;
  pageSize: number;
  columns: TableProps<Category>["columns"];
  pagination?: boolean;
}

const CategoryTable: React.FC<Props> = ({
  selectedItem,
  onSelect,
  onChangePage,
  categories,
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

      <Table<Category>
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
    </Flex>
  );
};

export default CategoryTable;
