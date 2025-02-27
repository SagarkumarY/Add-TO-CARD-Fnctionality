import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import useCartStore from "@/store/cartStore";
const Navbar = () => {

  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">🛍 My Store</Link>
      </h1>
      <Link to="/cart" className="relative">
        <ShoppingCart size={24} />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {cartCount}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;
