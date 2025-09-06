import { useEcommerceContext } from "../contexts/EcommerceContext";

const WishListStatus = () => {
  const { listWish } = useEcommerceContext();
  return <span>{listWish?.filter((list) => list?.inWish).length}</span>;
};

export default WishListStatus;

