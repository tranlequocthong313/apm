import { Button, Flex, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Product } from "../../configs/types/product";
import CheckoutProductItem from "../CheckoutProductItem";
import { FaInfoCircle } from "react-icons/fa";
import axiosInstance from "../../configs/apis";
import PURCHASE_ENDPOINT from "../../configs/apis/endpoints/purchase";
import { Purchase } from "../../configs/types/purchase";
import "./index.css";
import CheckoutSuccess from "../CheckoutSuccess";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  products: Product[];
}

export interface CheckoutItem {
  id: string;
  price: number;
  amount: number;
}

export type PurchaseSuccess = Pick<Purchase, "id" | "totalPrice" | "createdAt">;

const randomDeliveryPrice = Math.round(Math.random() * 20);

const CheckoutModal: React.FC<Props> = ({ open, onOk, onCancel, products }) => {
  const { t } = useTranslation();
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>();
  const [purchaseSuccess, setPuchaseSuccess] = useState<PurchaseSuccess>();

  useEffect(() => {
    setCheckoutItems(
      products.map(product => ({
        id: product.id,
        amount: 1,
        price: product.basePrice - product.basePrice * (product.discountPercentage / 100),
      })),
    );
  }, [products]);

  const updateCheckoutItems = (id: string, amount: number) => {
    setCheckoutItems(items => {
      return items?.map(item => {
        if (item.id === id) {
          const product = products.find(prod => prod.id === id);
          if (!product) {
            return item;
          }
          return {
            ...item,
            amount,
            price:
              (product.basePrice - product.basePrice * (product.discountPercentage / 100)) * amount,
          };
        }
        return item;
      });
    });
  };

  const getFinalPrice = () => {
    return checkoutItems?.reduce((res, cur) => res + cur.price, 0) || 0;
  };

  const checkout = async () => {
    if (!checkoutItems) {
      return;
    }

    // TODO: This should work with multiple purchases, but the API currently doesn't support it
    try {
      const [{ data }] = await Promise.all(
        checkoutItems?.map(item => {
          return axiosInstance.post<Purchase>(PURCHASE_ENDPOINT.create, {
            productId: item.id,
            amount: item.amount,
          });
        }),
      );
      setPuchaseSuccess({
        id: data.id,
        totalPrice: data.totalPrice,
        createdAt: data.createdAt,
      });
    } catch (error) {
      console.log("Error checkout:", error);
    }
  };

  const getTotalAmount = () => {
    return checkoutItems?.reduce((res, cur) => cur.amount + res, 0);
  };

  return (
    <Modal
      title="Checkout"
      open={open}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      onCancel={() => {
        onCancel();
        setPuchaseSuccess(undefined);
      }}
      className="checkout-modal"
    >
      {purchaseSuccess ? (
        <CheckoutSuccess
          onDone={() => {
            onOk();
            setPuchaseSuccess(undefined);
          }}
          purchaseSuccess={purchaseSuccess}
        />
      ) : (
        <>
          <Flex vertical className="pb-8 pt-5 border-b-2 border-slate-200">
            {products.map(product => (
              <CheckoutProductItem
                key={product.id}
                onChangeAmount={updateCheckoutItems}
                product={product}
              />
            ))}
          </Flex>

          <Flex className="py-6 border-b-2 border-slate-200" vertical gap={10}>
            <h6 className="font-semibold mb-1">{t("havePromotionCode")}</h6>
            <Flex gap={16} align="center">
              <Input className="bg-white rounded-lg py-2.5" placeholder={t("enterCode")} />
              <Button className="h-10 !border-slate-200 text-textSecondary">
                {t("applyCode")}
              </Button>
            </Flex>
          </Flex>

          <Flex gap={10} vertical className="py-6 border-b-2 border-slate-200 border-dashed ">
            <h6 className="font-semibold mb-1">{t("orderSummary")}</h6>
            <Flex align="center" justify="space-between" className="text-textSecondary">
              <span>
                {getTotalAmount()} {t("items")}
              </span>
              <span>${getFinalPrice().toFixed(2)}</span>
            </Flex>
            <Flex align="center" justify="space-between" className="text-textSecondary">
              <Flex align="center">
                {t("deliveryCost")} <FaInfoCircle className="ml-2" />
              </Flex>
              <span>${randomDeliveryPrice}</span>
            </Flex>
          </Flex>

          <Flex align="center" justify="space-between" className="py-8">
            <span className="text-h5 font-semibold">{t("total")}:</span>
            <span className="text-h5 font-bold">${getFinalPrice().toFixed(2)}</span>
          </Flex>

          <Button
            onClick={checkout}
            type="primary"
            className="rounded-lg w-full border-none p-6 bg-tertiaryBackground hover:!bg-primaryMain"
          >
            {t("confirmCheckout")}
          </Button>
        </>
      )}
    </Modal>
  );
};

export default CheckoutModal;
