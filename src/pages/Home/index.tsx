import "./index.css";
import { Flex } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import Banner from "../../components/Banner";
import HomeBottomSection from "../../components/HomeBottomSection";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = "Home - Appscyclone Ecommerce";
  }, []);

  return (
    <Flex vertical>
      <Banner />

      <HomeBottomSection />
    </Flex>
  );
};

export default HomePage;
