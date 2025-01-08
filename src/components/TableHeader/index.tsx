import { Button, Flex, Input } from "antd";
import classNames from "classnames";
import React, { useState } from "react";
import { FaHistory } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { RiImportFill, RiShareBoxFill } from "react-icons/ri";
import { MdClear } from "react-icons/md";

interface Props {
  query?: string;
  onQuery?: (query: string) => void;
  onOpenAdd?: () => void;
}

const TableHeader: React.FC<Props> = ({ query, onQuery, onOpenAdd }) => {
  const [openSearch, setOpenSearch] = useState(false);

  const querySection = onQuery ? (
    !openSearch ? (
      <Button
        className="border-none bg-secondaryBackground rounded-full !w-12 !h-12"
        icon={<IoSearch className="w-5 h-5" />}
        onClick={() => setOpenSearch(true)}
      />
    ) : (
      <Input
        suffix={
          query && query.length === 0 ? (
            <IoSearch className="w-5 h-5" />
          ) : (
            <MdClear className="w-5 h-5 cursor-pointer" onClick={() => onQuery("")} />
          )
        }
        placeholder="Search..."
        onChange={e => onQuery(e.target.value)}
        value={query}
        className={classNames(
          "rounded-3xl",
          "px-5",
          "py-2.5",
          "transition-all",
          "duration-500",
          "mr-5",
        )}
        autoFocus
      />
    )
  ) : (
    <></>
  );

  return (
    <Flex justify="space-between" align="center" className="mb-5 flex-col md:flex-row">
      <Flex gap={16} align="center" className="lg:pl-6 mb-5 md:mb-0" justify="space-between">
        <Button
          className="border-none bg-secondaryBackground px-8 py-6 rounded-3xl"
          icon={<FaHistory />}
          iconPosition="start"
        >
          History
        </Button>
        {querySection}
      </Flex>
      <Flex gap={16} align="center" justify="space-between mb-5 md:mb-0">
        <Button
          className="border-none bg-secondaryBackground rounded-full !w-12 !h-12"
          icon={<RiImportFill className="w-5 h-5" />}
        />
        <Button
          className="border-none bg-secondaryBackground rounded-full !w-12 !h-12"
          icon={<RiShareBoxFill className="w-5 h-5" />}
        />
        {onOpenAdd && (
          <Button
            className="border-none px-8 py-6 rounded-3xl"
            type="primary"
            iconPosition="start"
            onClick={() => onOpenAdd()}
          >
            Add item
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default TableHeader;
