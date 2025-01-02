import "./index.css";
import { Flex } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import Banner from "../../components/Banner";
import HomeBottomSection from "../../components/HomeBottomSection";

const HomePage = () => {
  return (
    <Flex vertical className="h-screen">
      <Banner />

      <HomeBottomSection />
    </Flex>
  );
};

export default HomePage;
