import React from "react";
import { Product } from "../../configs/types/product";
import { Card, Flex, Image, Rate } from "antd";
import { CiHeart } from "react-icons/ci";
import "./index.css";
import { Link } from "react-router";
import PRODUCT_ENDPOINT from "../../configs/apis/endpoints/product";

interface Props {
  product: Product;
}

const ProductItem: React.FC<Props> = ({ product }) => {
  return (
    <Link to={PRODUCT_ENDPOINT.detail(product.urlName)}>
      <Card
        hoverable
        cover={
          <Image
            preview={false}
            alt={"image"}
            src={
              product.picture
                ? "http://" + product.picture
                : "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
            }
            className="min-h-96 max-h-96 object-cover rounded-xl"
          />
        }
        className="rounded-xl border-none p-0 hover:shadow-none hover:scale-105 product-item mb-5"
      >
        <div className="absolute top-2 right-2 px-4 py-2 font-bold text-lg bg-gradient-to-r from-red-500 to-orange-400 text-white rounded-full shadow-lg flex items-center">
          <span className="mr-1">🔥</span> {product.discountPercentage}%
        </div>

        <Flex align="center" justify="space-between">
          <Flex align="center" gap={10}>
            <Rate value={Math.random() * 4 + 1} />
            <span>({(Math.random() * 4 + 1).toFixed(2)})</span>
          </Flex>
          <CiHeart className="flex-end w-5 h-5" />
        </Flex>

        <p className="text-lg mb-4 mt-2 font-bold text-textPrimary">{product.name}</p>

        <Flex justify="space-between" align="center">
          <Flex gap={10} align="center">
            <span className="text-textSecondary line-through text-sm">${product.basePrice}</span>
            <strong className="text-primaryMain font-bold text-xl">
              ${product.basePrice - product.basePrice * (product.discountPercentage / 100)}
            </strong>
          </Flex>
          <span className="text-danger text-sm">{product.stock} items left!</span>
        </Flex>
      </Card>
    </Link>
  );
};

export default ProductItem;
