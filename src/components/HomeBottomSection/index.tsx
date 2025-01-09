import { Flex } from "antd";
import RecentlyViewedProductList from "../RecentlyViewedProductList";
import ProductsSection from "../ProductsSection";

const HomeBottomSection = () => {
  return (
    <Flex vertical className="lg:px-14 px-4 md:px-10 pt-10 pb-20 overflow-hidden">
      <ProductsSection />

      <RecentlyViewedProductList size={4} />
    </Flex>
  );
};

export default HomeBottomSection;
