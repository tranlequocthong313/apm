import { Card, Flex, Skeleton } from "antd";
import "./index.css";

const ACTIVE_SKELETON = true;

const SkeletonProductItem = () => {
  return (
    <Card
      cover={
        <Skeleton.Node
          active={ACTIVE_SKELETON}
          className="min-h-96 max-h-96 object-cover rounded-xl !w-full"
        />
      }
      className="rounded-xl border-none p-0 hover:shadow-none hover:scale-105 product-item mb-10 lg:mb-5"
    >
      <Flex vertical gap={10}>
        <Flex align="center" justify="space-between" gap={40}>
          <Skeleton.Node active={ACTIVE_SKELETON} className="!w-44 !h-4" />
          <Skeleton.Node active={ACTIVE_SKELETON} className="!w-4 !h-4 items-end" />
        </Flex>

        <Skeleton.Node active={ACTIVE_SKELETON} className="!w-52 !h-4" />

        <Flex align="center" justify="space-between" gap={80}>
          <Skeleton.Node active={ACTIVE_SKELETON} className="!w-28 !h-4" />
          <Skeleton.Node active={ACTIVE_SKELETON} className="!w-20 !h-4 items-end" />
        </Flex>
      </Flex>
    </Card>
  );
};

export default SkeletonProductItem;
