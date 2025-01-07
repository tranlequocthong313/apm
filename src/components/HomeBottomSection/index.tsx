import {
  Button,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  Pagination,
  Rate,
  Row,
  Segmented,
  Select,
  Slider,
  SliderSingleProps,
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
import debounce from "lodash.debounce";

const marks: SliderSingleProps["marks"] = {
  0: "$0",
  999: {
    label: <strong>$999</strong>,
  },
};

// TODO: verticalize labels and inputs
// TODO: put per page at the bottom next to pagination
const HomeBottomSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<{ label: string; value: string }[]>([
    { label: "", value: "" },
  ]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [category, sestCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 999]);

  const handleDebouncedQuery = useMemo(() => {
    return debounce(setDebouncedQuery, 1000);
  }, []);

  const handlePriceFilter = useMemo(() => {
    return debounce(setPriceRange, 500);
  }, []);

  const onQuery = (value: string) => {
    setQuery(value);
    handleDebouncedQuery(value);
  };

  useEffect(() => {
    setFilteredProducts(
      products.filter(prod => {
        const p = prod.basePrice - prod.basePrice * (prod.discountPercentage / 100);
        const match = p >= priceRange[0] && p <= priceRange[1];
        if (category) {
          return match && prod.categories?.map(category => category.name).includes(category);
        }
        return match;
      }),
    );
  }, [category, priceRange, products]);

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
    <Flex vertical className="lg:px-14 px-4 md:px-10 pt-10 pb-20 overflow-hidden">
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
                <MdClear className="w-5 h-5 cursor-pointer" onClick={() => onQuery("")} />
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
              labelInValue
              onChange={option => sestCategory(option.label)}
            />
          </Form.Item>

          <Form.Item name={"price"} label="Price">
            <Slider
              onChange={handlePriceFilter}
              marks={marks}
              defaultValue={[0, 999]}
              max={999}
              min={0}
              value={priceRange}
              range
              tooltip={{ open: false }}
            />
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

          <ProductList products={filteredProducts} />

          {filteredProducts.length > 0 && (
            <Pagination
              className="justify-center mt-5"
              onChange={setPage}
              total={totalPage}
              current={page}
              pageSize={pageSize}
            />
          )}
        </Col>
      </Row>
    </Flex>
  );
};

export default HomeBottomSection;
