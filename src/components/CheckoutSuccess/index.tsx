import { Button, Flex } from "antd";
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router";
import { PurchaseSuccess } from "../CheckoutModal";
import React from "react";
import { formatDatetime } from "../../utils/formatter";
import { useTranslation } from "react-i18next";

interface Props {
  purchaseSuccess: PurchaseSuccess;
  onDone: () => void;
}

const CheckoutSuccess: React.FC<Props> = ({ purchaseSuccess, onDone }) => {
  const { t } = useTranslation();

  return (
    <>
      <Flex vertical gap={16} align="center" className="mb-10">
        <Flex align="center" justify="center" className="w-20 h-20 rounded-full bg-primaryMain/10">
          <FaCircleCheck className="text-primaryMain !w-10 h-10" />
        </Flex>
        <span className="text-xl">{t("paymentSuccess")}!</span>
        <strong className="font-bold text-h4">
          ${Number(purchaseSuccess.totalPrice).toFixed(2)}
        </strong>
      </Flex>

      <Flex vertical gap={20}>
        <span className="font-semibold text-lg mb-2">{t("paymentDetails")}</span>

        <Flex
          justify="space-between"
          align="center"
          className="flex-col md:flex-row items-start md:items-center"
        >
          <span className="text-textSecondary">{t("refId")}</span>
          <span>{purchaseSuccess.id}</span>
        </Flex>

        <Flex
          justify="space-between"
          align="center"
          className="flex-col md:flex-row items-start md:items-center"
        >
          <span className="text-textSecondary">{t("paymentStatus")}</span>
          <Flex gap={6} align="center">
            <FaCircleCheck className="text-primaryMain" />
            <span>{t("success")}</span>
          </Flex>
        </Flex>

        <Flex
          justify="space-between"
          align="center"
          className="flex-col md:flex-row items-start md:items-center"
        >
          <span className="text-textSecondary">{t("paymentTime")}</span>
          <span>{formatDatetime(new Date(purchaseSuccess.createdAt))}</span>
        </Flex>

        <Flex
          justify="space-between"
          align="center"
          className="border-t-2 border-slate-300 border-dashed py-6 pb-9 mt-2 flex-col md:flex-row items-start md:items-center"
        >
          <span className="text-textSecondary text-lg">{t("totalPayment")}</span>
          <span className="text-xl font-bold">
            ${Number(purchaseSuccess.totalPrice).toFixed(2)}
          </span>
        </Flex>
      </Flex>

      <Flex vertical gap={14}>
        <Button className="h-12 rounded-lg bg-white text-textPrimary" type="primary">
          <Link
            onClick={onDone}
            className="w-full h-full leading-10"
            to={"/purchases?id=" + purchaseSuccess.id}
            reloadDocument
          >
            {t("viewPurchaseDetail")}
          </Link>
        </Button>
        <Button className="border-none h-12 rounded-lg" type="primary" onClick={onDone}>
          {t("done")}
        </Button>
      </Flex>
    </>
  );
};

export default CheckoutSuccess;
