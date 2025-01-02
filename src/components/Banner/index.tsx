import "./index.css";
import { Button, Image } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import newYearBannery from "../../assets/images/chinese_newyear_banner.jpg";
import saleBanner from "../../assets/images/salebanner.jpg";
import saleBanner2 from "../../assets/images/pink_banner.jpg";
import christmasBanner from "../../assets/images/christmas_banner.jpg";

const Banner = () => {
  return (
    <div>
      <Swiper
        loop
        slidesPerView={1}
        className="w-full h-[200px] md:h-[320px] lg:h-[580px] animate__animated animate__fadeIn"
        autoplay={{
          delay: 5000,
        }}
        speed={1000}
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
      >
        <SwiperSlide>
          <div className="swiper-slide-container">
            <Image src={newYearBannery} preview={false} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-slide-container">
            <Image src={saleBanner} preview={false} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-slide-container">
            <Image src={saleBanner2} preview={false} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-slide-container">
            <Image src={christmasBanner} preview={false} />
          </div>
        </SwiperSlide>

        <Button className="custom-prev">
          <FaLongArrowAltLeft />
        </Button>
        <Button className="custom-next">
          <FaLongArrowAltRight />
        </Button>
      </Swiper>
    </div>
  );
};

export default Banner;
