import { Flex, Image } from "antd";
import { Purchase } from "../../configs/types/purchase";
import PurchaseItem from "../PurchaseItem";
import noDataFoundImage from "../../assets/images/no-data-found.jpg";

interface Props {
  purchases: Purchase[];
}

const PurchaseList: React.FC<Props> = ({ purchases }) => {
  return (
    <div>
      {purchases.length > 0 ? (
        purchases.map(purchase => <PurchaseItem key={purchase.id} purchase={purchase} />)
      ) : (
        <Flex vertical align="center" className="h-full mx-auto">
          <Image preview={false} src={noDataFoundImage} width={500} />
          <h5 className="text-h5 font-bold text-textSecondary">No data</h5>
        </Flex>
      )}
    </div>
  );
};

export default PurchaseList;
