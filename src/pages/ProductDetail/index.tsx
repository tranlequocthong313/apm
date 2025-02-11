import { useEffect, useState } from "react";
import { Button, Col, Flex, Image, Rate, Row, Tag } from "antd";
import axiosInstance from "../../configs/apis";
import { useNavigate, useParams } from "react-router";
import { Product } from "../../configs/types/product";
import classNames from "classnames";
import "./index.css";
import RecommendedProductList from "../../components/RecommendedProductList";
import CheckoutModal from "../../components/CheckoutModal";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/index";
import SkeletonProductDetail from "../../components/SkeletonProductDetail";
import { useTranslation } from "react-i18next";

const ProductDetail = () => {
  const { t } = useTranslation();
  const [product, setProduct] = useState<Product>();
  const { urlName } = useParams();
  const [img, setImg] = useState<string>(
    "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
  );
  const [selectedImg, setSelectedImg] = useState(0);
  const [isCheckout, setIsCheckout] = useState(false);
  const user = useSelector((state: IRootState) => state.auth.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = product?.name + " - Appscyclone Ecommerce";
  }, [product]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/product/" + urlName);
        setProduct(res.data);
        if (res.data.picture) {
          setImg("http://" + res.data.picture);
        }
      } catch (error) {
        console.log("Error fetching product detail:::", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [urlName]);

  useEffect(() => {
    const handleViewedProducts = () => {
      if (!product) {
        return;
      }
      const viewedProductsJson = localStorage.getItem("viewedProducts");
      let viewedProducts: Product[] = [];
      if (viewedProductsJson) {
        viewedProducts = JSON.parse(viewedProductsJson);
      }
      viewedProducts = viewedProducts.filter(prod => prod.id !== product.id);
      viewedProducts.unshift(product);
      localStorage.setItem("viewedProducts", JSON.stringify(viewedProducts));
    };
    handleViewedProducts();
  }, [product]);

  // TODO: for dev purpose
  const getPlaceholderImages = (size: number = 4) => {
    const res = [];
    for (let i = 0; i < size; i++) {
      res.push(
        <Image
          key={i}
          preview={false}
          className={classNames(
            "rounded-xl cursor-pointer",
            i === selectedImg ? "border-primaryMain border-4" : "",
          )}
          onClick={() => {
            setImg("http://" + product?.picture);
            setSelectedImg(i);
          }}
          src={"http://" + product?.picture}
          fallback="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
        />,
      );
    }
    return res;
  };

  const openCheckout = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setIsCheckout(true);
  };

  return (
    <>
      {loading || !product ? (
        <SkeletonProductDetail />
      ) : (
        <Row className="lg:w-4/5 pt-4 product-detail !mx-auto overflow-hidden" gutter={50}>
          <Col md={14} span={24} className="mb-5 md:mb-auto">
            <Row gutter={20}>
              <Col span={5}>{getPlaceholderImages()}</Col>
              <Col span={19}>
                <Image className="rounded-xl" src={img} />
              </Col>
            </Row>
          </Col>
          <Col md={10} span={24}>
            <Flex vertical>
              <h4 className="text-h6 lg:text-h4 mb-3 text-textPrimary font-bold">{product.name}</h4>
              <p className="text-danger lg:text-sm text-xs mb-4">
                {product.stock} {t("itemsLeft")}
              </p>
              <Flex className="mb-5" align="center" gap={16}>
                <span className="line-through lg:text-2xl text-textSecondary">
                  ${product.basePrice}
                </span>
                <h3 className="lg:text-h3 text-h4 font-bold text-primaryMain">
                  $
                  {(
                    product.basePrice -
                    product.basePrice * (product.discountPercentage / 100)
                  ).toFixed(2)}
                </h3>
                <Tag className="bg-gradient-to-r from-red-500 to-orange-400 text-white rounded-xl lg:px-3 font-bold">
                  {product.discountPercentage}% Disc
                </Tag>
              </Flex>
              <Flex gap={20} className="mb-8 text-textPrimary flex-col lg:flex-row">
                <Flex gap={16}>
                  <Rate value={Math.random() * 4 + 1} disabled />
                  <span>({(Math.random() * 4 + 1).toFixed(1)})</span>
                </Flex>
                <span>
                  {(Math.random() * 10 + 1).toFixed(1)}k {t("reviews")}
                </span>
              </Flex>
              <p className="font-bold mb-4 text-textPrimary">{t("description")}</p>
              <p className="text-textSecondary">{product.description}</p>
            </Flex>
            <Flex gap={20} className="mt-10">
              <Button
                type="primary"
                className="bg-secondaryBackground text-slate-500 flex-1 rounded-3xl py-6 font-bold border-none"
              >
                {t("addToCart")}
              </Button>
              <Button
                onClick={openCheckout}
                className="flex-1 rounded-3xl py-6 font-bold border-none"
                type="primary"
              >
                {t("checkoutNow")}
              </Button>
            </Flex>
          </Col>

          <CheckoutModal
            products={[product]}
            open={isCheckout}
            onCancel={() => setIsCheckout(false)}
            onOk={() => setIsCheckout(false)}
          />
        </Row>
      )}

      <div className="lg:w-4/5 pb-20  product-detail !mx-auto overflow-hidden">
        <RecommendedProductList size={4} filterItem={product} />
      </div>
    </>
  );
};

export default ProductDetail;
