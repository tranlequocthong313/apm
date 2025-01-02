import {
  Button,
  Checkbox,
  Col,
  Flex,
  Form,
  Image,
  Input,
  Pagination,
  Rate,
  Row,
  Segmented,
  Select,
  Slider,
} from "antd";
import { IoFilter, IoSearch } from "react-icons/io5";
import { BarsOutlined, AppstoreOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Product } from "../../configs/types/product";
import ProductList from "../ProductList";
import axiosInstance from "../../configs/apis";
import PRODUCT_ENDPOINT from "../../configs/apis/endpoints/product";
import { MdClear } from "react-icons/md";
import classNames from "classnames";
import { Category } from "../../configs/types/category";
import CATEGORY_ENDPOINT from "../../configs/apis/endpoints/category";
import noDataFoundImage from "../../assets/images/no-data-found.jpg";
import debounce from "lodash.debounce";

const HomeBottomSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<{ label: string; value: string }[]>([
    { label: "", value: "" },
  ]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const handleDebouncedQuery = useMemo(() => {
    return debounce(setDebouncedQuery, 1000);
  }, []);

  const onQuery = (value: string) => {
    setQuery(value);
    handleDebouncedQuery(value);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get<{ categories: Category[]; total: number }>(
          CATEGORY_ENDPOINT.categories,
        );
        const options = response.data.categories.map(category => ({
          label: category.name,
          value: category.id || "",
        }));
        setCategoryOptions(options);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const fetchProducts = useCallback(async ({ q, p, o }: { q: string; p: number; o: number }) => {
    try {
      const response = await axiosInstance.get<{ products: Product[]; total: number }>(
        `${PRODUCT_ENDPOINT.products}?productName=${q || ""}&page=${p}&offset=${o}`,
      );
      setProducts(response.data.products);
      setTotalPage(response.data.total);
    } catch (error) {
      console.log("Error fetching products: ", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts({ q: debouncedQuery, p: page, o: pageSize });
  }, [fetchProducts, page, pageSize, debouncedQuery]);

  return (
    <Flex vertical className="lg:px-14 px-4 md:px-10 pt-10 pb-20">
      <h5 className="text-h5 font-extrabold mt-4 mb-8">
        {totalPage} result for {query || "All"}
      </h5>

      <Row gutter={50}>
        <Col lg={6} span={24}>
          <Input
            suffix={
              query.length === 0 ? (
                <IoSearch className="w-5 h-5" />
              ) : (
                <MdClear className="w-5 h-5 cursor-pointer" onClick={() => setQuery("")} />
              )
            }
            placeholder="Search..."
            onChange={e => {
              onQuery(e.target.value);
              setPage(1);
            }}
            value={query}
            className={classNames(
              "rounded-3xl",
              "px-5",
              "py-2.5",
              "transition-all",
              "duration-500",
              "mr-5",
              "mb-10",
            )}
            autoFocus
          />

          <Form.Item name={"offset"} label="Products per page">
            <Select
              value={pageSize}
              placeholder="Products per page"
              className="w-full h-12  !bg-secondaryBackground"
              onChange={value => setPageSize(value)}
              options={[
                { label: "6", value: 6 },
                { label: "8", value: 8 },
                { label: "12", value: 12 },
              ]}
            />
          </Form.Item>

          <Form.Item name={"categories"} label="Category">
            <Select
              placeholder="Select categories"
              className="w-full h-12  !bg-secondaryBackground"
              options={categoryOptions}
            />
          </Form.Item>

          <Form.Item name={"price"} label="Price">
            <Slider min={0} max={99999} />
          </Form.Item>

          <p className="mb-3">Rating:</p>
          <Form.Item>
            <Checkbox>
              <Rate disabled value={5} />
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Checkbox>
              <Rate disabled value={4} />
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Checkbox>
              <Rate disabled value={3} />
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Checkbox>
              <Rate disabled value={2} />
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Checkbox>
              <Rate disabled value={1} />
            </Checkbox>
          </Form.Item>
        </Col>

        <Col lg={18} span={24}>
          <Row justify={"space-between"} className="pb-5 border-b border-gray-200 mb-10">
            <Segmented
              size="large"
              options={[
                { value: "Kanban", icon: <AppstoreOutlined /> },
                { value: "List", icon: <BarsOutlined /> },
              ]}
            />
            <Button
              icon={<IoFilter />}
              size="large"
              className="!border-secondaryBackground text-textSecondary "
            >
              Sort by: <strong className="text-textPrimary hover:text-white">Popular</strong>
            </Button>
          </Row>

          <ProductList products={products} />

          {products.length > 0 && (
            <Pagination
              className="justify-center mt-5"
              onChange={setPage}
              total={totalPage}
              current={page}
              pageSize={pageSize}
            />
          )}

          {products.length === 0 && (
            <Flex vertical align="center" className="h-full">
              <Image preview={false} src={noDataFoundImage} width={500} />
              <h5 className="text-h5 font-bold text-textSecondary">No data</h5>
            </Flex>
          )}
        </Col>
      </Row>
    </Flex>
  );
};

export default HomeBottomSection;
