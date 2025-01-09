import { Col, Flex, Image, Row } from "antd";
import { Product } from "../../configs/types/product";
import ProductItem from "../ProductItem";
import noDataFoundImage from "../../assets/images/no-data-found.jpg";
import "./index.css";
import SkeletonProductItem from "../SkeletonProductItem";

interface Props {
  products: Product[];
  loading: boolean;
  pageSize: number;
}

const ProductList: React.FC<Props> = ({ loading, products, pageSize }) => {
  if (!loading && products.length === 0) {
    return (
      <Flex vertical align="center" className="h-full mx-auto animate__animated animate__fadeIn">
        <Image preview={false} src={noDataFoundImage} width={500} />
        <h5 className="text-h5 font-bold text-textSecondary">No data</h5>
      </Flex>
    );
  }
  return (
    <Row gutter={60}>
      {loading &&
        new Array(pageSize).fill(0).map((_, index) => (
          <Col lg={8} span={24} key={index}>
            <SkeletonProductItem />
          </Col>
        ))}

      {products.map(product => (
        <Col lg={8} span={24} key={product.id}>
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
