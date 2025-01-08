import { Button, Col, Flex, Image, Modal, Row, Space, TableProps, Tag } from "antd";
import ProductTable from "../../../components/ProductTable";
import { IoStatsChart } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp, FaPen, FaTrash } from "react-icons/fa";
import noDataFoundImage from "../../../assets/images/no-data-found.jpg";
import debounce from "lodash.debounce";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Product } from "../../../configs/types/product";
import TableHeader from "../../../components/TableHeader";
import ProductDrawer from "../../../components/ProductDrawer";
import axiosInstance from "../../../configs/apis";
import PRODUCT_ENDPOINT from "../../../configs/apis/endpoints/product";
import ImageWithActions from "../../../components/ImageWithActions";
import { parseCSV } from "../../../utils/parser";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ up = true }) => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Saleprice",
        data: [...new Array(7)].map(() => Math.random()),
        borderColor: up ? "#44EF44" : "#EF4444",
        fill: false,
        tension: 0.4,
      },
    ],
  };
  data.datasets[0].data.sort();
  if (!up) {
    data.datasets[0].data.reverse();
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full max-w-[400px] h-[200px] mx-auto">
      <Line data={data} options={options} className="w-full h-full" />
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [isAdding, setIsAdding] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const columns: TableProps<Product>["columns"] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: id => <div className="w-24 truncate">{id}</div>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: text => <strong>{text}</strong>,
    },
    {
      title: "Price $",
      dataIndex: "basePrice",
      key: "basePrice",
      render: text => `$${text}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Discount %",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      render: text => `${text}%`,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <FaPen
            onClick={() => setIsEditing(true)}
            className="text-textSecondary hover:text-textPrimary"
          />
          <FaTrash
            onClick={() => setOpenConfirmDelete(true)}
            className="text-textSecondary hover:text-textPrimary"
          />
        </Space>
      ),
    },
  ];

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

  const fetchProducts = useCallback(async ({ q, p }: { q: string; p: number }) => {
    try {
      const response = await axiosInstance.get<{ products: Product[]; total: number }>(
        `${PRODUCT_ENDPOINT.products}?productName=${q || ""}&page=${p}`,
      );
      setProducts(response.data.products);
      setPageSize(response.data.total);
      if (response.data.products.length > 0) {
        setProduct(response.data.products[0]);
      }
    } catch (error) {
      console.log("Error fetching products: ", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts({ q: debouncedQuery, p: page });
  }, [debouncedQuery, page, fetchProducts]);

  useEffect(() => {
    if (products.length === 0) {
      setProduct(undefined);
    }
  }, [products]);

  const deleteProduct = async () => {
    if (!product) {
      return;
    }
    try {
      await axiosInstance.delete(PRODUCT_ENDPOINT.delete(product.id));
      setProducts(prods => {
        const newProds = prods.filter(prod => prod.id !== product.id);
        if (newProds.length > 0) {
          setProduct(newProds[0]);
        } else {
          setProduct(undefined);
        }
        return newProds;
      });
      fetchProducts({ q: debouncedQuery, p: page });
    } catch (error) {
      console.log("Error deleting product: ", error);
    } finally {
      setOpenConfirmDelete(false);
    }
  };

  const handleUpload = async (image: File) => {
    if (image && product) {
      const formData = new FormData();
      formData.append("file", image);
      try {
        const response = await axiosInstance.patch<Product>(
          PRODUCT_ENDPOINT.upload(product.id),
          formData,
        );
        const prod = {
          ...product,
          picture: response.data.picture,
        };
        setProduct(prod);
        setProducts(prods =>
          prods.map(p => {
            if (p.id === prod.id) {
              return prod;
            }
            return p;
          }),
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const parse = (data: string[][]) => {
    const result: Product[] = parseCSV(data) as Product[];
    setProducts(result);
  };

  return (
    <Row>
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
                onClick={deleteProduct}
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
            <strong className="text-lg mb-1">Delete product?</strong>
            <span>A product will be deleted. This cannot be undone.</span>
          </Flex>
        </Flex>
      </Modal>

      {/* Left Section */}
      {product ? (
        <Col span={24} lg={8} className="lg:border-r-2 lg:border-secondaryBackground">
          <Flex vertical className="lg:pr-6">
            <Flex align="center" justify="space-between">
              <Flex vertical gap={8}>
                <h6 className="text-h6 font-bold">{product?.name}</h6>
                <span className="text-textSecondary text-[13px]">ID: {product.id}</span>
              </Flex>
              <Flex gap={16}>
                <Button
                  className="border-none bg-secondaryBackground px-8 py-6 rounded-3xl"
                  iconPosition="start"
                  icon={<FaPen />}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => setOpenConfirmDelete(true)}
                  className="border-none bg-secondaryBackground rounded-full !w-12 !h-12"
                  icon={<FaTrash className="w-4 h-4" />}
                />
              </Flex>
            </Flex>
            <p className="text-textSecondary my-5 text-sm">{product?.description}</p>
            <span className="text-textSecondary">
              Stock: <strong className="text-primaryMain text-xl">{product?.stock} items</strong>
            </span>
            <div className="my-7">
              {product?.categories?.map(category => (
                <Tag key={category.name} className="rounded-3xl font-bold">
                  {category.name}
                </Tag>
              ))}
            </div>

            <ImageWithActions
              modal={true}
              src={
                product.picture
                  ? "http://" + product.picture
                  : "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
              }
              onChange={handleUpload}
            />

            <Flex vertical gap={6} className="my-6 flex-1 max-w-full">
              <span className="text-textSecondary">Sales:</span>
              <Flex gap={10}>
                <strong className="text-2xl">{Math.round(Math.random() * 1000)}</strong>
                <Tag className="bg-danger text-white rounded-3xl flex items-center justify-between">
                  {(product.discountPercentage - Math.random() * 10).toFixed(1)}%{" "}
                  <FaCaretDown className="text-white" />
                </Tag>
              </Flex>
              <LineChart up={false} />
            </Flex>

            <Flex vertical gap={6} className="my-6 flex-1 max-w-full">
              <span className="text-textSecondary">Salesprice:</span>
              <Flex gap={10}>
                <strong className="text-2xl">${product.basePrice}</strong>
                <Tag className="bg-success text-white rounded-3xl flex items-center justify-between">
                  {product.discountPercentage}% <FaCaretUp className="text-white" />
                </Tag>
              </Flex>
              <LineChart up={true} />
            </Flex>

            <Button
              className="border-none bg-secondaryBackground px-8 py-6 rounded-3xl font-bold text-textPrimary"
              iconPosition="start"
              icon={<IoStatsChart />}
            >
              View detail statistics
            </Button>
          </Flex>
        </Col>
      ) : (
        <Flex vertical align="center" className="h-full">
          <Image preview={false} src={noDataFoundImage} width={500} />
          <h5 className="text-h5 font-bold text-textSecondary">No data</h5>
        </Flex>
      )}

      {/* Right Section */}
      <Col span={24} lg={16} className="mt-10 lg:mt-0">
        <TableHeader
          exportedFilename={"product_" + new Date().toLocaleString()}
          exportedData={products.map(prod => ({
            ...prod,
            categories: JSON.stringify(prod.categories),
          }))}
          onOpenAdd={() => setIsAdding(true)}
          onQuery={onQueryChange}
          query={query}
          onParse={parse}
        />

        <div className="w-full overflow-x-scroll">
          <ProductTable
            columns={columns}
            products={products}
            selectedItem={product}
            onSelect={setProduct}
            onDelete={() => setOpenConfirmDelete(true)}
            onEdit={() => setIsEditing(true)}
            pageSize={pageSize}
            page={page}
            onChangePage={setPage}
          />
        </div>

        <ProductDrawer
          onCreated={prod => {
            if (isEditing) {
              setProducts(prods =>
                prods.map(p => {
                  if (p.id === prod.id) {
                    setProduct(prod);
                    return prod;
                  }
                  return p;
                }),
              );
            } else {
              fetchProducts({ q: debouncedQuery, p: page });
            }
          }}
          onClose={() => {
            setIsAdding(false);
            setIsEditing(false);
          }}
          isEditing={isEditing}
          product={product}
          open={isAdding || isEditing}
        />
      </Col>
    </Row>
  );
};

export default Products;
