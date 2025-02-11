import { Button, Flex, Modal, Space, TableProps } from "antd";
import { FaPen, FaTrash } from "react-icons/fa";
import debounce from "lodash.debounce";

import { useCallback, useEffect, useMemo, useState } from "react";
import TableHeader from "../../../components/TableHeader";
import axiosInstance from "../../../configs/apis";
import CATEGORY_ENDPOINT from "../../../configs/apis/endpoints/category";
import { Category, categorySchema } from "../../../configs/types/category";
import CategoryTable from "../../../components/CategoryTable";
import CategoryDrawer from "../../../components/CategoryDrawer";
import { parseCSV } from "../../../utils/parser";
import { IoMdAddCircle } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

const Categories = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category>();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [isAdding, setIsAdding] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isImportedData, setIsImportedData] = useState(false);
  const [addedItems, setAddedItems] = useState<Category[]>([]);

  useEffect(() => {
    document.title = "Categories - Appscyclone Ecommerce Management";
  }, []);

  const includedItem = (category: Category) => {
    return (
      addedItems.find(item => item.id === category.id) ||
      addedItems.find(item => item.name === category.name)
    );
  };

  const columns: TableProps<Category>["columns"] = [
    {
      title: t("id"),
      dataIndex: "id",
      key: "id",
      render: id => <div className="w-24 truncate">{id}</div>,
    },
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
      render: text => <strong>{text}</strong>,
    },
    {
      title: t("action"),
      key: "action",
      render: value => (
        <Space size="middle">
          {includedItem(value) && (
            <>
              <FaPen
                onClick={() => setIsEditing(true)}
                className="text-info hover:text-textPrimary"
              />
              <FaTrash
                onClick={() => setOpenConfirmDelete(true)}
                className="text-danger hover:text-textPrimary"
              />
            </>
          )}
          {isImportedData && !includedItem(value) && (
            <IoMdAddCircle
              onClick={() => addRecord(value)}
              className="hover:text-textPrimary w-5 h-5 text-success"
            />
          )}
        </Space>
      ),
    },
  ];

  const addRecord = async (category: Category) => {
    if (!category) {
      return;
    }
    try {
      const response = await axiosInstance.post<Category>(CATEGORY_ENDPOINT.create, {
        name: category.name,
      });
      setAddedItems([...addedItems, response.data]);
      setCategories(cates =>
        cates.map(cate => {
          if (cate.id === category.id) {
            return response.data;
          }
          return cate;
        }),
      );
    } catch (error) {
      toast.error("Category already existed!");
      setAddedItems([...addedItems, category]);
      console.log("Error create category: ", error);
    }
  };

  const handleNewRecord = (record: Category) => {
    if (isEditing) {
      setCategories(cates =>
        cates.map(p => {
          if (p.id === record.id) {
            setCategory(record);
            return record;
          }
          return p;
        }),
      );
    } else {
      fetchCategories({ q: debouncedQuery, p: page });
    }
  };

  const handleQueryChange = useMemo(
    () =>
      debounce(q => {
        setDebouncedQuery(q);
        setPage(1);
      }, 1000),
    [],
  );

  const onQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    handleQueryChange(newQuery);
  };

  const fetchCategories = useCallback(async ({ q, p }: { q: string; p: number }) => {
    try {
      const response = await axiosInstance.get<{ categories: Category[]; total: number }>(
        `${CATEGORY_ENDPOINT.categories}?categoryName=${q || ""}&page=${p}`,
      );
      setCategories(response.data.categories);
      setPageSize(response.data.total);
      if (response.data.categories.length > 0) {
        setCategory(response.data.categories[0]);
      }
      setAddedItems(response.data.categories.map(cate => cate));
    } catch (error) {
      console.log("Error fetching categories: ", error);
    } finally {
      setIsImportedData(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories({ q: debouncedQuery, p: page });
  }, [debouncedQuery, page, fetchCategories]);

  useEffect(() => {
    if (categories.length === 0) {
      setCategory(undefined);
    }
  }, [categories]);

  const deleteCategory = async () => {
    if (!category) {
      return;
    }
    try {
      await axiosInstance.delete(CATEGORY_ENDPOINT.delete(category.id));
      setCategories(categories => {
        const newCategories = categories.filter(cate => cate.id !== category.id);
        if (newCategories.length > 0) {
          setCategory(newCategories[0]);
        } else {
          setCategory(undefined);
        }
        return newCategories;
      });
      fetchCategories({ q: debouncedQuery, p: page });
    } catch (error) {
      console.log("Error deleting category: ", error);
    } finally {
      setOpenConfirmDelete(false);
    }
  };

  const parse = (data: string[][]) => {
    const result: Category[] = parseCSV(data) as Category[];
    setCategories(result.filter(cate => categorySchema.isValidSync(cate)));
    setIsImportedData(true);
  };

  return (
    <>
      <ToastContainer />

      <Modal
        closable={false}
        maskClosable={true}
        open={openConfirmDelete}
        className="confirm-delete"
        onCancel={() => setOpenConfirmDelete(false)}
        centered
        width={380}
        footer={() => {
          return (
            <Flex gap={4} justify="flex-end" className="mt-5">
              <Button
                type="text"
                className="text-textPrimary border-none font-bold hover:!bg-gray-300 hover:opacity-80 rounded-lg p-5"
                onClick={() => setOpenConfirmDelete(false)}
              >
                {t("cancel")}
              </Button>
              <Button
                className="bg-danger text-white font-bold border-none hover:!bg-danger hover:opacity-80 rounded-lg p-5"
                onClick={deleteCategory}
              >
                {t("delete")}
              </Button>
            </Flex>
          );
        }}
      >
        <Flex gap={20} align="center">
          <FaTrash className="text-danger w-12 h-12" />
          <Flex vertical>
            <strong className="text-lg mb-1">{t("delete")}</strong>
            <span>{t("deleteConfirm")}</span>
          </Flex>
        </Flex>
      </Modal>

      {/* Right Section */}
      <TableHeader
        onParse={parse}
        exportedFilename={"category_" + new Date().toLocaleString()}
        exportedData={categories}
        onOpenAdd={() => setIsAdding(true)}
        onQuery={onQueryChange}
        query={query}
      />

      <CategoryTable
        categories={categories}
        selectedItem={category}
        onSelect={setCategory}
        onDelete={() => setOpenConfirmDelete(true)}
        onEdit={() => setIsEditing(true)}
        columns={columns}
        pageSize={pageSize}
        page={page}
        onChangePage={setPage}
        pagination={!isImportedData}
      />

      {(isAdding || isEditing) && (
        <CategoryDrawer
          onCreated={handleNewRecord}
          onClose={() => {
            setIsAdding(false);
            setIsEditing(false);
          }}
          isEditing={isEditing}
          category={category}
          open={isAdding || isEditing}
        />
      )}
    </>
  );
};

export default Categories;
