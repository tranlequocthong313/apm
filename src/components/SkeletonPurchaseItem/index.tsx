import { Flex, Skeleton } from "antd";

const ACTIVE_SKELETON = true;

const SkeletonPurchaseItem = () => {
  return (
    <Flex vertical gap={20} className="md:p-10 p-5 border border-slate-300 last:rounded-b-xl">
      <Flex justify="space-between" align="center">
        <Skeleton.Node active={ACTIVE_SKELETON} className="mb-4 !w-52 !h-6" />
      </Flex>

      <Flex className="md:gap-6 gap-4">
        <Skeleton.Node
          active={ACTIVE_SKELETON}
          className="rounded-lg !w-32 !h-32 object-cover !hidden md:!block"
        />

        <Flex vertical gap={16} className="w-full">
          <Skeleton.Node active={ACTIVE_SKELETON} className="!w-64 !h-9" />

          <Flex vertical gap={20}>
            <Flex
              justify="space-between"
              className="flex-col md:flex-row items-start md:items-center"
              gap={10}
            >
              <Skeleton.Node active={ACTIVE_SKELETON} className="!w-20 !h-8" />
              <Skeleton.Node active={ACTIVE_SKELETON} className="!w-64 !h-8" />
            </Flex>
            <Flex
              justify="space-between"
              className="flex-col md:flex-row items-start md:items-center"
              gap={10}
            >
              <Skeleton.Node active={ACTIVE_SKELETON} className="!w-24 !h-8" />
              <Skeleton.Node active={ACTIVE_SKELETON} className="!w-10 !h-8" />
            </Flex>
            <Flex
              justify="space-between"
              className="flex-col md:flex-row items-start md:items-center"
              gap={10}
            >
              <Skeleton.Node active={ACTIVE_SKELETON} className="!w-28 !h-8" />
              <Skeleton.Node active={ACTIVE_SKELETON} className="!w-32 !h-8" />
            </Flex>
            <Flex
              justify="space-between"
              className="border-t-2 border-slate-300 border-dashed py-6 pb-9 mt-2 flex-col md:flex-row items-start md:items-center"
              gap={10}
            >
              <Skeleton.Node active={ACTIVE_SKELETON} className="!w-36 !h-9" />
              <Skeleton.Node active={ACTIVE_SKELETON} className="!w-24 !h-9" />
            </Flex>
          </Flex>
          <Flex className="flex-col md:flex-row" gap={10}>
            <Skeleton.Node active={ACTIVE_SKELETON} className="md:!w-32 !w-full !h-12 rounded-lg" />
            <Skeleton.Node active={ACTIVE_SKELETON} className="md:!w-32 !w-full !h-12 rounded-lg" />
            <Skeleton.Node active={ACTIVE_SKELETON} className="md:!w-32 !w-full !h-12 rounded-lg" />
            <Skeleton.Node active={ACTIVE_SKELETON} className="md:!w-16 !w-full !h-12 rounded-lg" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SkeletonPurchaseItem;
