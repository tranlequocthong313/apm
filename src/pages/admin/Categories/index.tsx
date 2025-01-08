import { Button, Flex, Modal } from "antd";
import { FaTrash } from "react-icons/fa";
import debounce from "lodash.debounce";

import { useCallback, useEffect, useMemo, useState } from "react";
import TableHeader from "../../../components/TableHeader";
import axiosInstance from "../../../configs/apis";
import CATEGORY_ENDPOINT from "../../../configs/apis/endpoints/category";
import { Category } from "../../../configs/types/category";
import CategoryTable from "../../../components/CategoryTable";
import CategoryDrawer from "../../../components/CategoryDrawer";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category>();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [isAdding, setIsAdding] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
    } catch (error) {
      console.log("Error fetching categories: ", error);
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

  return (
    <>
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
                Cancel
              </Button>
              <Button
                className="bg-danger text-white font-bold border-none hover:!bg-danger hover:opacity-80 rounded-lg p-5"
                onClick={deleteCategory}
              >
                Delete
              </Button>
            </Flex>
          );
        }}
      >
        <Flex gap={20} align="center">
          <FaTrash className="text-danger w-12 h-12" />
          <Flex vertical>
            <strong className="text-lg mb-1">Delete category?</strong>
            <span>A category will be deleted. This cannot be undone.</span>
          </Flex>
        </Flex>
      </Modal>

      {/* Right Section */}
      <TableHeader onOpenAdd={() => setIsAdding(true)} onQuery={onQueryChange} query={query} />

      <CategoryTable
        categories={categories}
        selectedItem={category}
        onSelect={setCategory}
        onDelete={() => setOpenConfirmDelete(true)}
        onEdit={() => setIsEditing(true)}
        pageSize={pageSize}
        page={page}
        onChangePage={setPage}
      />

      <CategoryDrawer
        onCreated={cate => {
          if (isEditing) {
            setCategories(cates =>
              cates.map(p => {
                if (p.id === cate.id) {
                  setCategory(cate);
                  return cate;
                }
                return p;
              }),
            );
          } else {
            fetchCategories({ q: debouncedQuery, p: page });
          }
        }}
        onClose={() => {
          setIsAdding(false);
          setIsEditing(false);
        }}
        isEditing={isEditing}
        category={category}
        open={isAdding || isEditing}
      />
    </>
  );
};

export default Categories;
