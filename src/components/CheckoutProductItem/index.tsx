import React, { useState } from "react";
import { Product } from "../../configs/types/product";
import { Flex, Form, Image, InputNumber } from "antd";

interface Props {
  product: Product;
  onChangeAmount?: (id: string, amount: number) => void;
}

const CheckoutProductItem: React.FC<Props> = ({ product, onChangeAmount }) => {
  const [amount, setAmount] = useState(1);

  const getDiscountedPrice = () =>
    (product.basePrice - product.basePrice * (product.discountPercentage / 100)) * amount;

  return (
    <Flex justify="space-between" align="center" className="mb-3">
      <Flex gap={16} align="center">
        <Image
          src={"http://" + product.picture}
          fallback="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
          className="rounded-lg min-w-20 max-w-20 hidden md:block"
        />

        <Flex vertical className="w-40 md:w-full">
          <strong className="text-lg font-bold text-ellipsis">{product.name}</strong>
          <span title={product.description} className="text-textSecondary truncate w-60">
            {product.description}
          </span>
        </Flex>
      </Flex>

      <Flex vertical>
        <span className="font-bold mb-2">${getDiscountedPrice().toFixed(2)}</span>
        <Form.Item>
          <InputNumber
            variant="filled"
            min={1}
            max={product.stock}
            defaultValue={amount}
            value={amount}
            onChange={value => {
              if (value) {
                setAmount(value);
                onChangeAmount?.(product.id, value);
              }
            }}
          />
        </Form.Item>
      </Flex>
    </Flex>
  );
};

export default CheckoutProductItem;
