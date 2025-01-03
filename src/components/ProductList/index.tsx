import { Col, Row } from "antd";
import { Product } from "../../configs/types/product";
import ProductItem from "../ProductItem";
import "./index.css";

interface Props {
  products: Product[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <Row gutter={60}>
      {products.map(product => (
        <Col lg={8} span={24} key={product.id}>
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
