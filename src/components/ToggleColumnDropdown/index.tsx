import { Button, Checkbox, Dropdown, MenuProps } from "antd";
import { MenuItemType } from "antd/es/menu/interface";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdKeyboardArrowDown } from "react-icons/md";

interface Props {
  columns: MenuItemType[];
  selectedColumns: string[];
  setSelectedColumns: (columns: string[]) => void;
}

const ToggleColumnDropdown: React.FC<Props> = ({
  columns,
  selectedColumns,
  setSelectedColumns,
}) => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(true);

  const items: MenuProps["items"] = columns?.map(column => ({
    key: column.key,
    label: (
      <Checkbox
        checked={selectedColumns.includes(String(column.key))}
        value={column.key}
        onChange={e => {
          const key = e.target.value;
          let cols = [];
          if (selectedColumns.find(col => col === key)) {
            cols = selectedColumns.filter(col => col !== key);
          } else {
            cols = [...selectedColumns, key];
          }
          setSelectedColumns(cols);
          setShowAll(columns.length === cols.length);
        }}
        onClick={e => e?.stopPropagation()}
        className="p-3 gap-5"
      >
        {column.label}
      </Checkbox>
    ),
  }));
  items.push({
    type: "divider",
  });
  items.push({
    key: "show-all",
    label: (
      <Checkbox
        className="p-3 gap-5"
        checked={showAll}
        onClick={e => {
          e?.stopPropagation();
          setSelectedColumns(showAll ? [] : columns.map(column => String(column.key)));
          setShowAll(!showAll);
        }}
      >
        {t("showAll")}
      </Checkbox>
    ),
  });

  return (
    <Dropdown menu={{ items }} trigger={["click"]} className="w-50 ml-auto" placement="bottomRight">
      <Button
        className="px-8 py-6 rounded-lg bg-secondaryBackground border-none"
        icon={<MdKeyboardArrowDown />}
        iconPosition="end"
      >
        {t("toggleColumns")}
      </Button>
    </Dropdown>
  );
};

export default ToggleColumnDropdown;
