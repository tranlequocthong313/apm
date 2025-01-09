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
import classNames from "classnames";
import { IoFilter, IoSearch } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import ProductList from "../ProductList";
import { BarsOutlined, AppstoreOutlined } from "@ant-design/icons";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Category, Product } from "../../configs/types/product";
import PRODUCT_ENDPOINT from "../../configs/apis/endpoints/product";
import axiosInstance from "../../configs/apis";
import CATEGORY_ENDPOINT from "../../configs/apis/endpoints/category";

const marks: SliderSingleProps["marks"] = {
  0: "$0",
  999: {
    label: <strong>$999</strong>,
  },
};

const ProductsSection = () => {
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
  const [loadingProducts, setLoadingProducts] = useState(true);

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
    setLoadingProducts(true);
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
    setLoadingProducts(false);
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
    setLoadingProducts(true);
    try {
      const response = await axiosInstance.get<{ products: Product[]; total: number }>(
        `${PRODUCT_ENDPOINT.products}?productName=${q || ""}&page=${p}&offset=${o}`,
      );
      setProducts(response.data.products);
      setTotalPage(response.data.total);
    } catch (error) {
      console.log("Error fetching products: ", error);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts({ q: debouncedQuery, p: page, o: pageSize });
  }, [fetchProducts, page, pageSize, debouncedQuery]);

  return (
    <>
      <h5 className="text-h5 font-extrabold mt-4 mb-8">
        {totalPage} result for {query || "All"}
      </h5>

      <Row gutter={50}>
        <Col lg={6} span={24}>
          <Form>
            <Form.Item name={"categories"} label="Category" layout="vertical" className="md:mb-20">
              <Select
                placeholder="Select categories"
                className="w-full h-12  !bg-secondaryBackground"
                options={categoryOptions}
                labelInValue
                onChange={option => sestCategory(option.label)}
              />
            </Form.Item>

            <Form.Item name={"price"} label="Price" layout="vertical" className="md:mb-20">
              <Slider
                onChange={handlePriceFilter}
                marks={marks}
                max={999}
                min={0}
                value={priceRange}
                range
                tooltip={{ open: false }}
              />
            </Form.Item>

            <p className="mb-3">Rating</p>
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
          </Form>
        </Col>

        <Col lg={18} span={24}>
          <Flex
            gap={20}
            justify={"space-between"}
            className="pb-5 border-b border-gray-200 mb-10  flex-col md:flex-row items-start md:items-center"
          >
            <Segmented
              size="large"
              options={[
                { value: "Kanban", icon: <AppstoreOutlined /> },
                { value: "List", icon: <BarsOutlined /> },
              ]}
            />
            <Form className="flex items-center gap-5">
              <Form.Item className="mb-0">
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
                    "py-2",
                    "transition-all",
                    "duration-500",
                  )}
                  autoFocus
                />
              </Form.Item>
              <Button
                icon={<IoFilter />}
                size="large"
                className="!border-secondaryBackground text-textSecondary "
              >
                Sort by: <strong className="text-textPrimary hover:text-white">Popular</strong>
              </Button>
            </Form>
          </Flex>

          <ProductList pageSize={pageSize} loading={loadingProducts} products={filteredProducts} />

          {filteredProducts.length > 0 && (
            <Flex align="center" gap={10}>
              {/* <Form>
                <Form.Item name={"offset"} className="mb-0">
                  <Select
                    value={pageSize}
                    onChange={value => setPageSize(value)}
                    options={[
                      { label: "6", value: 6 },
                      { label: "8", value: 8 },
                      { label: "12", value: 12 },
                    ]}
                  />
                </Form.Item>
              </Form> */}

              <Pagination
                showSizeChanger={{
                  value: pageSize,
                  onChange: setPageSize,
                  options: [
                    { label: "6", value: 6 },
                    { label: "8", value: 8 },
                    { label: "12", value: 12 },
                  ],
                }}
                onChange={setPage}
                total={totalPage}
                current={page}
                pageSize={pageSize}
              />
            </Flex>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProductsSection;
