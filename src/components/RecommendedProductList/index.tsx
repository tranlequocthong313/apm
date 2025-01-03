import { Col, Flex, Row, Spin } from "antd";
import { Product } from "../../configs/types/product";
import { useEffect, useState } from "react";
import axiosInstance from "../../configs/apis";
import PRODUCT_ENDPOINT from "../../configs/apis/endpoints/product";
import ProductItem from "../ProductItem";

interface Props {
  size: number;
  filterItem?: Product;
}

const RecommendedProductList: React.FC<Props> = ({ size = 4, filterItem }) => {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get<{ products: Product[]; total: number }>(
          PRODUCT_ENDPOINT.products + "?page=1&offset=" + (filterItem ? size + 1 : size),
        );
        setProducts(res.data.products.filter(prod => prod.id !== filterItem?.id).slice(0, size));
      } catch (error) {
        console.log("Error fetching recommended products: ", error);
      }
    };

    fetchProducts();
  }, [size, filterItem]);

  if (!products) {
    return <Spin />;
  }

  return (
    <Flex vertical className="px-3">
      <h5 className="lg:text-h5 text-h6 font-bold mt-14 mb-10">Recommended products</h5>
      <Row gutter={60}>
        {products.map(product => (
          <Col lg={6} span={24} key={product.id}>
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
    </Flex>
  );
};

export default RecommendedProductList;
