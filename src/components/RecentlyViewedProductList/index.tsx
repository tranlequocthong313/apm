import { Button, Flex } from "antd";
import { Product } from "../../configs/types/product";
import { useEffect, useState } from "react";
import ProductItem from "../ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import SkeletonProductItem from "../SkeletonProductItem";

interface Props {
  size: number;
  filterItem?: Product;
}

const RecentlyViewedProductList: React.FC<Props> = ({ size = 4 }) => {
  const [products, setProducts] = useState<Product[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsFromLocalStorage = () => {
      setLoading(true);
      try {
        const viewedProductsJson = localStorage.getItem("viewedProducts");
        if (viewedProductsJson) {
          setProducts(JSON.parse(viewedProductsJson));
        }
      } catch (error) {
        console.log("Error fetching recently viewed products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsFromLocalStorage();
  }, []);

  return (
    <Flex vertical className="px-3">
      <h5 className="lg:text-h5 text-h6 font-bold mt-14 mb-10">Recently viewed products</h5>

      <Swiper
        loop
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        speed={1000}
        modules={[Navigation, Autoplay]}
        centeredSlides={false}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        className="w-full"
        spaceBetween={60}
        breakpoints={{
          769: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: products ? Math.min(size, products.length) : size,
          },
        }}
      >
        {loading &&
          new Array(size).fill(0).map((_, index) => (
            <SwiperSlide key={index}>
              <SkeletonProductItem />
            </SwiperSlide>
          ))}
        {products?.map(product => (
          <SwiperSlide key={product.id}>
            <ProductItem product={product} />
          </SwiperSlide>
        ))}

        <Button className="custom-prev">
          <FaLongArrowAltLeft />
        </Button>
        <Button className="custom-next">
          <FaLongArrowAltRight />
        </Button>
      </Swiper>
    </Flex>
  );
};

export default RecentlyViewedProductList;
