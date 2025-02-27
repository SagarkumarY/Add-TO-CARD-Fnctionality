import Cart from "@/components/Cart";
import useCartStore from "../store/cartStore";

const CartPage = () => {
  const { cart, removeItem, updateQuantity } = useCartStore();
  return (
    <div className="p-8">
      <Cart cart={cart} updateQuantity={updateQuantity} removeItem={removeItem} />
    </div>
  );
};

export default CartPage;
