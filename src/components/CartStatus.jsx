import { useEcommerceContext } from "../contexts/EcommerceContext";

const CartStatus = () => {
  const { cart } = useEcommerceContext();
  return <span>{cart?.filter((list) => list?.inCart).length}</span>;
};

export default CartStatus;