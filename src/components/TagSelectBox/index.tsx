import { useState } from "react";
import { Select, Tag } from "antd";

const TagSelectBox = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [options] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
    { label: "Date", value: "date" },
    { label: "Elderberry", value: "elderberry" },
  ]);

  const handleSelect = (value: string) => {
    if (!selectedItems.includes(value)) {
      setSelectedItems([...selectedItems, value]);
    }
  };

  const handleDeselect = (value: string) => {
    setSelectedItems(selectedItems.filter(item => item !== value));
  };

  return (
    <div className="w-full max-w-md">
      <Select
        mode="multiple"
        placeholder="Select items"
        value={selectedItems}
        onSelect={handleSelect}
        onDeselect={handleDeselect}
        className="w-full"
        options={options.filter(option => !selectedItems.includes(option.value))}
      />
    </div>
  );
};

export default TagSelectBox;
