import { Button, Flex, Image } from "antd";
import { Purchase } from "../../configs/types/purchase";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../configs/apis";
import PRODUCT_ENDPOINT from "../../configs/apis/endpoints/product";
import { Product } from "../../configs/types/product";
import { TfiReload } from "react-icons/tfi";
import { IoIosMore } from "react-icons/io";
import { Link } from "react-router";
import CheckoutModal from "../CheckoutModal";
import { FaStar } from "react-icons/fa";
import ReviewModal from "../ReviewModal";
import { formatDatetime } from "../../utils/formatter";
import { useTranslation } from "react-i18next";

interface Props {
  purchase: Purchase;
}

const PurchaseItem: React.FC<Props> = ({ purchase }) => {
  const { t } = useTranslation();
  const [product, setProduct] = useState<Product>();
  const [isBuyAgain, setIsBuyAgain] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [rate, setRate] = useState(purchase.reviewNote);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get<{ products: Product[]; totalCount: number }>(
          PRODUCT_ENDPOINT.products + "?productName=" + purchase.product.name,
        );
        setProduct(response.data.products[0]);
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [purchase]);

  return (
    <Flex vertical gap={20} className="md:p-10 p-5 border border-slate-300 last:rounded-b-xl">
      <Flex justify="space-between" align="center">
        <h6 className="mb-4 text-lg font-bold">{t("delivered")} June 5</h6>

        {rate && (
          <Flex align="center" gap={4}>
            <span>{rate}</span>
            <FaStar className="text-warn" />
          </Flex>
        )}
      </Flex>

      <Flex className="md:gap-6 gap-4">
        <Image
          className="rounded-lg !w-32 !h-32 object-cover hidden md:block"
          preview={false}
          src={"http://" + product?.picture}
          fallback={"https://www.svgrepo.com/show/508699/landscape-placeholder.svg"}
        />
        <Flex vertical gap={16}>
          <h5 className="font-bold text-xl text-ellipsis">{product?.name}</h5>
          <Flex vertical gap={20}>
            <Flex
              justify="space-between"
              className="flex-col md:flex-row items-start md:items-center"
            >
              <span className="text-textSecondary">{t("refId")}</span>
              <span>{purchase.id}</span>
            </Flex>
            <Flex
              justify="space-between"
              className="flex-col md:flex-row items-start md:items-center"
            >
              <span className="text-textSecondary">{t("amount")}</span>
              <span>{purchase.amount}</span>
            </Flex>
            <Flex
              justify="space-between"
              className="flex-col md:flex-row items-start md:items-center"
            >
              <span className="text-textSecondary">{t("paymentTime")}</span>
              <span>{formatDatetime(new Date(purchase.createdAt))}</span>
            </Flex>
            <Flex
              justify="space-between"
              className="border-t-2 border-slate-300 border-dashed py-6 pb-9 mt-2 flex-col md:flex-row items-start md:items-center"
            >
              <span className="text-textSecondary text-lg">{t("totalPayment")}</span>
              <span className="text-xl font-bold">${Number(purchase.totalPrice).toFixed(2)}</span>
            </Flex>
          </Flex>
          <Flex className="flex-col md:flex-row" gap={10}>
            <Button
              icon={<TfiReload />}
              className="bg-primaryMain text-white !border-primaryMain rounded-lg py-5"
              onClick={() => setIsBuyAgain(true)}
            >
              {t("buyItAgain")}
            </Button>
            <Button className="!border-slate-300 rounded-lg py-5">
              <Link to={"/products/" + product?.urlName}>{t("viewYourItem")}</Link>
            </Button>
            <Button
              onClick={() => setIsReviewing(true)}
              className="text-textPrimary bg-warn !border-warn rounded-lg py-5"
            >
              {t("reviewProduct")}
            </Button>
            <Button
              icon={<IoIosMore />}
              className="!p-5 rounded-lg !border-slate-300 !w-full md:w-auto"
            />
          </Flex>
        </Flex>
      </Flex>

      {product && (
        <CheckoutModal
          products={[product]}
          open={isBuyAgain}
          onCancel={() => setIsBuyAgain(false)}
          onOk={() => setIsBuyAgain(false)}
        />
      )}

      <ReviewModal
        onCancel={() => setIsReviewing(false)}
        onOk={(rate: number) => {
          setIsReviewing(false);
          setRate(rate);
        }}
        purchase={purchase}
        open={isReviewing}
      />
    </Flex>
  );
};

export default PurchaseItem;
