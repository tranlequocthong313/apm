import { Flex, Pagination } from "antd";
import PurchaseList from "../../components/PurchasesList";
import { useEffect, useState } from "react";
import { Purchase } from "../../configs/types/purchase";
import axiosInstance from "../../configs/apis";
import PURCHASE_ENDPOINT from "../../configs/apis/endpoints/purchase";
import SkeletonPurchaseItem from "../../components/SkeletonPurchaseItem";
import { useTranslation } from "react-i18next";

const PAGE_SIZE = 5;

interface PurchaseResponse {
  purchases: Purchase[];
  total: number;
}

const Purchases = () => {
  const { t } = useTranslation();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Purchases - Appscyclone Ecommerce";
  }, []);

  useEffect(() => {
    const fetchPurchases = async (id?: string | null) => {
      try {
        setLoading(true);
        if (id) {
          const response = await axiosInstance.get<Purchase>(PURCHASE_ENDPOINT.detail(id));
          setPurchases([response.data]);
        } else {
          const response = await axiosInstance.get<PurchaseResponse>(
            PURCHASE_ENDPOINT.purchases + "?page=" + page + "&offset=" + PAGE_SIZE,
          );
          setPurchases(response.data.purchases);
          setTotalPage(response.data.total);
        }
      } catch (error) {
        console.log(`Error fetching purchases`, error);
      } finally {
        setLoading(false);
      }
    };

    const id = new URLSearchParams(window.location.search).get("id");
    fetchPurchases(id);
  }, [page]);

  return (
    <Flex vertical className="lg:w-2/5 mx-auto pt-6 pb-20 lg:px-auto md:px-5 px-2">
      <h4 className="mb-8 text-h4 font-bold">{t("yourPuchases")}</h4>

      <Flex className="px-10 py-5 rounded-t-xl bg-secondaryBackground w-full flex-col md:flex-row gap-3 md:gap-14">
        <Flex vertical gap={10}>
          <span className="text-textSecondary text-sm">{t("orderPlaced")}</span>
          <strong>June 3 2024</strong>
        </Flex>

        <Flex vertical gap={10}>
          <span className="text-textSecondary text-sm">{t("total")}</span>
          <strong>${purchases.reduce((res, cur) => Number(cur.totalPrice) + res, 0)}</strong>
        </Flex>

        <Flex vertical gap={10}>
          <span className="text-textSecondary text-sm">{t("shipTo")}</span>
          <strong>Ho Chi Minh</strong>
        </Flex>
      </Flex>

      {(loading || !purchases) && <SkeletonPurchaseItem />}
      <PurchaseList purchases={purchases} />

      {purchases.length > 0 && (
        <Pagination
          showSizeChanger={false}
          className="justify-center mt-5"
          onChange={setPage}
          total={totalPage}
          current={page}
          pageSize={PAGE_SIZE}
        />
      )}
    </Flex>
  );
};

export default Purchases;
