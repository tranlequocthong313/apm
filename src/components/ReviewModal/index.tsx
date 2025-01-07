import { Button, Flex, Modal, Rate } from "antd";
import { Purchase } from "../../configs/types/purchase";
import React, { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import axiosInstance from "../../configs/apis";
import PURCHASE_ENDPOINT from "../../configs/apis/endpoints/purchase";

interface Props {
  onOk: (rate: number) => void;
  onCancel: () => void;
  purchase: Purchase;
  open: boolean;
}

const ReviewModal: React.FC<Props> = ({ onOk, onCancel, purchase, open }) => {
  const [rate, setRate] = useState(purchase.reviewNote || 5);
  const [comment, setComment] = useState(purchase.reviewComment || "");

  const submit = async () => {
    try {
      await axiosInstance.patch(PURCHASE_ENDPOINT.review(purchase.id), {
        reviewComment: comment,
        reviewNote: rate,
      });
    } catch (error) {
      console.log("Error submit review:", error);
    } finally {
      onOk(rate);
    }
  };

  return (
    <Modal
      open={open}
      title="Feedback"
      onCancel={onCancel}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <Flex vertical gap={40}>
        <Flex className="text-center mt-5" vertical gap={10}>
          <h5 className="text-h5 font-bold">How are you feeling</h5>
          <span className="text-center text-sm text-textSecondary">
            Your input is valuable in helping us better understand your needs and tailor our service
            accordingly.
          </span>
        </Flex>

        <Rate className="mx-auto text-5xl" onChange={setRate} value={rate} />

        <Flex vertical gap={20}>
          <TextArea
            placeholder="Add a Comment..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={4}
            className="rounded-lg p-4"
          />

          <Button
            onClick={submit}
            type="primary"
            className="bg-primaryMain border-none rounded-lg py-6"
          >
            Submit
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default ReviewModal;
