import { Col, Flex, Image, Row } from "antd";
import { Product } from "../../configs/types/product";
import ProductItem from "../ProductItem";
import noDataFoundImage from "../../assets/images/no-data-found.jpg";
import "./index.css";

interface Props {
  products: Product[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <Row gutter={60}>
      {products.length > 0 ? (
        products.map(product => (
          <Col lg={8} span={24} key={product.id}>
            <ProductItem product={product} />
          </Col>
        ))
      ) : (
        <Flex vertical align="center" className="h-full mx-auto">
          <Image preview={false} src={noDataFoundImage} width={500} />
          <h5 className="text-h5 font-bold text-textSecondary">No data</h5>
        </Flex>
      )}
    </Row>
  );
};

export default ProductList;
