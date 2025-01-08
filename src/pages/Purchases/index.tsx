import { Flex, Pagination } from "antd";
import PurchaseList from "../../components/PurchasesList";
import { useEffect, useState } from "react";
import { Purchase } from "../../configs/types/purchase";
import axiosInstance from "../../configs/apis";
import PURCHASE_ENDPOINT from "../../configs/apis/endpoints/purchase";

const PAGE_SIZE = 5;

interface PurchaseResponse {
  purchases: Purchase[];
  total: number;
}

const Purchases = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const fetchPurchases = async (id?: string | null) => {
      try {
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
      }
    };

    const id = new URLSearchParams(window.location.search).get("id");
    fetchPurchases(id);
  }, [page]);

  return (
    <Flex vertical className="w-2/5 mx-auto pt-6 pb-20">
      <h4 className="mb-8 text-h4 font-bold">Your Purchases</h4>

      {purchases.length > 0 && (
        <Flex className="px-10 py-5 rounded-t-xl bg-secondaryBackground w-full" gap={60}>
          <Flex vertical gap={10}>
            <span className="text-textSecondary text-sm">Order placed</span>
            <strong>June 3 2024</strong>
          </Flex>

          <Flex vertical gap={10}>
            <span className="text-textSecondary text-sm">Total</span>
            <strong>${purchases.reduce((res, cur) => Number(cur.totalPrice) + res, 0)}</strong>
          </Flex>

          <Flex vertical gap={10}>
            <span className="text-textSecondary text-sm">Ship to</span>
            <strong>Ho Chi Minh</strong>
          </Flex>
        </Flex>
      )}

      <PurchaseList purchases={purchases} />

      {purchases.length > 0 && (
        <Pagination
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
