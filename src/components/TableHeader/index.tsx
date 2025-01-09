import { Button, Flex, Input } from "antd";
import classNames from "classnames";
import React, { useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { RiImportFill, RiShareBoxFill } from "react-icons/ri";
import { MdClear } from "react-icons/md";
import { CSVLink } from "react-csv";
import Papa from "papaparse";

interface Props {
  query?: string;
  onQuery?: (query: string) => void;
  onOpenAdd?: () => void;
  exportedData: object[];
  exportedFilename: string;
  onParse: (result: string[][]) => void;
  headers?: { label: string; key: string }[];
  canImport?: boolean;
}

const TableHeader: React.FC<Props> = ({
  query,
  onQuery,
  onOpenAdd,
  exportedData,
  exportedFilename,
  onParse,
  headers,
  canImport = true,
}) => {
  const [openSearch, setOpenSearch] = useState(false);
  const importedInputRef = useRef<HTMLInputElement>(null);

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

  const handleUploadFile = () => {
    if (importedInputRef.current?.files) {
      const file = importedInputRef.current?.files[0];
      Papa.parse(file, {
        complete: results => {
          if (results.data) {
            const data = results.data as string[][];
            onParse(data);
          }
        },
        error: (error, file) => console.log("error parse csv", error, file),
      });
    }
  };

  return (
    <Flex justify="space-between" align="center" className="mb-5 flex-col md:flex-row">
      <Flex
        gap={16}
        align="center"
        className="lg:pl-6 mb-5 md:mb-0 flex-col md:flex-row"
        justify="space-between"
      >
        {querySection}
      </Flex>

      {canImport && (
        <input
          onChange={handleUploadFile}
          ref={importedInputRef}
          type="file"
          name="importedFile"
          accept=".csv"
          hidden
        />
      )}

      <Flex gap={16} align="center" justify="space-between mb-5 md:mb-0">
        {canImport && (
          <Button
            title="Import"
            className="border-none bg-secondaryBackground rounded-full !w-12 !h-12"
            icon={<RiImportFill className="w-5 h-5" />}
            onClick={() => importedInputRef.current?.click()}
          />
        )}
        <CSVLink data={exportedData} filename={exportedFilename} headers={headers}>
          <Button
            title="Export"
            className="border-none bg-secondaryBackground rounded-full !w-12 !h-12"
            icon={<RiShareBoxFill className="w-5 h-5" />}
          />
        </CSVLink>
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
