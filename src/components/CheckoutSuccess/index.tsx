import { Button, Flex } from "antd";
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router";
import { PurchaseSuccess } from "../CheckoutModal";
import React from "react";

interface Props {
  purchaseSuccess: PurchaseSuccess;
  onDone: () => void;
}

const CheckoutSuccess: React.FC<Props> = ({ purchaseSuccess, onDone }) => {
  const formatDatetime = (d: Date) => {
    return (
      d.getUTCFullYear() +
      "-" +
      ("0" + (d.getUTCMonth() + 1)).slice(-2) +
      "-" +
      ("0" + d.getUTCDate()).slice(-2) +
      " " +
      ("0" + d.getUTCHours()).slice(-2) +
      ":" +
      ("0" + d.getUTCMinutes()).slice(-2) +
      ":" +
      ("0" + d.getUTCSeconds()).slice(-2)
    );
  };

  return (
    <>
      <Flex vertical gap={16} align="center" className="mb-10">
        <Flex align="center" justify="center" className="w-20 h-20 rounded-full bg-primaryMain/10">
          <FaCircleCheck className="text-primaryMain !w-10 h-10" />
        </Flex>
        <span className="text-xl">Payment Success!</span>
        <strong className="font-bold text-h4">
          ${Number(purchaseSuccess.totalPrice).toFixed(2)}
        </strong>
      </Flex>

      <Flex vertical gap={20}>
        <span className="font-semibold text-lg mb-2">Payment Details</span>

        <Flex justify="space-between" align="center">
          <span className="text-textSecondary">Ref Id</span>
          <span>{purchaseSuccess.id}</span>
        </Flex>

        <Flex justify="space-between" align="center">
          <span className="text-textSecondary">Payment Status</span>
          <Flex gap={6} align="center">
            <FaCircleCheck className="text-primaryMain" />
            <span>Success</span>
          </Flex>
        </Flex>

        <Flex justify="space-between" align="center">
          <span className="text-textSecondary">Payment Time</span>
          <span>{formatDatetime(new Date(purchaseSuccess.createdAt))}</span>
        </Flex>

        <Flex
          justify="space-between"
          align="center"
          className="border-t-2 border-slate-300 border-dashed py-6 pb-9 mt-2"
        >
          <span className="text-textSecondary text-lg">Total Payment</span>
          <span className="text-xl font-bold">
            ${Number(purchaseSuccess.totalPrice).toFixed(2)}
          </span>
        </Flex>
      </Flex>

      <Flex vertical gap={14}>
        <Button className="h-12 rounded-lg bg-white text-textPrimary" type="primary">
          <Link className="w-full h-full leading-10" to={"/purchases"}>
            View Purchase Detail
          </Link>
        </Button>
        <Button className="border-none h-12 rounded-lg" type="primary" onClick={onDone}>
          Done
        </Button>
      </Flex>
    </>
  );
};

export default CheckoutSuccess;
