import React from "react";
import { Product } from "../../configs/types/product";
import { Card, Flex, Image, Rate } from "antd";
import { CiHeart } from "react-icons/ci";
import "./index.css";

interface Props {
  product: Product;
}

const ProductItem: React.FC<Props> = ({ product }) => {
  return (
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
        <Rate />
        <CiHeart className="flex-end w-5 h-5" />
      </Flex>

      <p className="text-lg mb-4 mt-2 font-bold text-textPrimary">{product.name}</p>

      <Flex justify="space-between" align="center">
        <strong className="text-primaryMain font-bold text-lg">${product.basePrice}</strong>
        <span className="text-danger text-sm">{product.stock} items left!</span>
      </Flex>
    </Card>
  );
};

export default ProductItem;
