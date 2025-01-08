import { Button, Flex, Modal } from "antd";
import { FaTrash } from "react-icons/fa";

import { useCallback, useEffect, useState } from "react";
import TableHeader from "../../../components/TableHeader";
import axiosInstance from "../../../configs/apis";
import PURCHASE_ENDPOINT from "../../../configs/apis/endpoints/purchase";
import { Purchase } from "../../../configs/types/purchase";
import PurchaseTable from "../../../components/PurchaseTable";

const Purchases = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [purchase, setPurchase] = useState<Purchase>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const fetchPurchases = useCallback(async ({ p }: { p: number }) => {
    try {
      const response = await axiosInstance.get<{ purchases: Purchase[]; total: number }>(
        `${PURCHASE_ENDPOINT.adminPurchases}?page=${p}`,
      );
      setPurchases(response.data.purchases);
      setPageSize(response.data.total);
      if (response.data.purchases.length > 0) {
        setPurchase(response.data.purchases[0]);
      }
    } catch (error) {
      console.log("Error fetching purchases: ", error);
    }
  }, []);

  useEffect(() => {
    fetchPurchases({ p: page });
  }, [page, fetchPurchases]);

  useEffect(() => {
    if (purchases.length === 0) {
      setPurchase(undefined);
    }
  }, [purchases]);

  const deletePurchase = async () => {
    if (!purchase) {
      return;
    }
    try {
      await axiosInstance.delete(PURCHASE_ENDPOINT.delete(purchase.id));
      setPurchases(purchases => {
        const newPurchases = purchases.filter(cate => cate.id !== purchase.id);
        if (newPurchases.length > 0) {
          setPurchase(newPurchases[0]);
        } else {
          setPurchase(undefined);
        }
        return newPurchases;
      });
      fetchPurchases({ p: page });
    } catch (error) {
      console.log("Error deleting purchase: ", error);
    } finally {
      setOpenConfirmDelete(false);
    }
  };

  return (
    <>
      <Modal
        closable={false}
        maskClosable={true}
        open={openConfirmDelete}
        className="confirm-delete"
        onCancel={() => setOpenConfirmDelete(false)}
        centered
        width={380}
        footer={() => {
          return (
            <Flex gap={4} justify="flex-end" className="mt-5">
              <Button
                type="text"
                className="text-textPrimary border-none font-bold hover:!bg-gray-300 hover:opacity-80 rounded-lg p-5"
                onClick={() => setOpenConfirmDelete(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-danger text-white font-bold border-none hover:!bg-danger hover:opacity-80 rounded-lg p-5"
                onClick={deletePurchase}
              >
                Delete
              </Button>
            </Flex>
          );
        }}
      >
        <Flex gap={20} align="center">
          <FaTrash className="text-danger w-12 h-12" />
          <Flex vertical>
            <strong className="text-lg mb-1">Delete purchase?</strong>
            <span>A purchase will be deleted. This cannot be undone.</span>
          </Flex>
        </Flex>
      </Modal>

      {/* Right Section */}
      <TableHeader />

      <PurchaseTable
        purchases={purchases}
        selectedItem={purchase}
        onSelect={setPurchase}
        onDelete={() => setOpenConfirmDelete(true)}
        pageSize={pageSize}
        page={page}
        onChangePage={setPage}
      />
    </>
  );
};

export default Purchases;
