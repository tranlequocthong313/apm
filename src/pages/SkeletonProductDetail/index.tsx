import { Col, Flex, Row, Skeleton } from "antd";
import "./index.css";

const ACTIVE_SKELETON = true;

const SkeletonProductDetail = () => {
  // TODO: for dev purpose
  const getPlaceholderImages = (size: number = 4) => {
    const res = [];
    for (let i = 0; i < size; i++) {
      res.push(<Skeleton.Node active={ACTIVE_SKELETON} key={i} className="mb-3 !w-36 !h-36" />);
    }
    return res;
  };

  return (
    <Row className="lg:w-4/5 pt-4 pb-20 product-detail !mx-auto overflow-hidden" gutter={50}>
      <Col md={14} span={24} className="mb-5 md:mb-auto">
        <Row>
          <Col span={5}>{getPlaceholderImages()}</Col>
          <Col span={19}>
            <Skeleton.Node active={ACTIVE_SKELETON} className="rounded-xl !w-full !h-full" />
          </Col>
        </Row>
      </Col>
      <Col md={10} span={24}>
        <Flex vertical>
          <Skeleton.Node active={ACTIVE_SKELETON} className="mb-3 !h-10 !w-72" />

          <Skeleton.Node active={ACTIVE_SKELETON} className="mb-4 !h-5" />

          <Flex className="mb-5" align="center" gap={16}>
            <Skeleton.Node active={ACTIVE_SKELETON} className="!h-6" />
            <Skeleton.Node active={ACTIVE_SKELETON} className="!h-16 !w-40" />
            <Skeleton.Node active={ACTIVE_SKELETON} className="!h-8" />
          </Flex>
          <Flex gap={20} className="mb-8 text-textPrimary flex-col lg:flex-row">
            <Flex gap={16}>
              <Skeleton.Node active={ACTIVE_SKELETON} className="!w-52 !h-10" />
              <Skeleton.Node active={ACTIVE_SKELETON} className="!h-10" />
            </Flex>
            <Skeleton.Node active={ACTIVE_SKELETON} className="!h-10" />
          </Flex>
          <Skeleton.Node active={ACTIVE_SKELETON} className="!w-96 !h-10" />
        </Flex>
        <Flex gap={20} className="mt-10">
          <Skeleton.Button active={ACTIVE_SKELETON} className="flex-1 !rounded-3xl py-6 !w-full" />
          <Skeleton.Button active={ACTIVE_SKELETON} className="flex-1 !rounded-3xl py-6 !w-full" />
        </Flex>
      </Col>
    </Row>
  );
};

export default SkeletonProductDetail;
