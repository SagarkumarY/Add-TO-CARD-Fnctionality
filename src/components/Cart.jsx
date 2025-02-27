import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCartStore from "../store/cartStore"; // Import Zustand store
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, updateQuantity, removeItem, clearCart } = useCartStore(); // Add clearCart function
  const navigate = useNavigate(); // Initialize navigate
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // const handlePayment = async () => {
  //   const options = {
  //     key: "rzp_test_FdDI6tOcvxfnJK", // Replace with your Razorpay Key
  //     amount: totalPrice * 100, // Convert to paisa
  //     currency: "INR",
  //     name: "Your Store Name",
  //     description: "Payment for your order",
  //     image: "/logo.png", // Your store logo
  //     handler: function (response) {
  //       alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
  //       clearCart(); // Clear cart after payment
  //       navigate("/success"); // Redirect to success page
  //     },
  //     prefill: {
  //       name: "Customer Name",
  //       email: "customer@example.com",
  //       contact: "9999999999",
  //     },
  //     theme: {
  //       color: "#00a86b",
  //     },
  //   };

  //   const razorpay = new window.Razorpay(options);
  //   razorpay.open();
  // };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2">Product</th>
                <th className="p-2">Price</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Subtotal</th>
                <th className="p-2">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2 flex items-center gap-2">
                    <img src={item.image} alt={item.name} className="w-12 h-12" />
                    {item.name}
                  </td>
                  <td className="p-2">${item.price.toFixed(2)}</td>
                  <td className="p-2 flex items-center justify-center">
                    <Button onClick={() => updateQuantity(item.id, -1)}>-</Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button onClick={() => updateQuantity(item.id, 1)}>+</Button>
                  </td>
                  <td className="p-2">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="p-2">
                    <Button variant="destructive" onClick={() => removeItem(item.id)}>
                      <Trash size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total Items & Total Price Section */}
          <div className="mt-4 p-4 bg-gray-100 rounded-lg flex justify-between">
            <h3 className="text-lg font-semibold">Total Items: {totalItems}</h3>
            <h3 className="text-lg font-semibold">Total Price: ${totalPrice.toFixed(2)}</h3>
          </div>

          {/* Buy Now Button */}
          <div className="mt-4 text-right">
          <Button className="bg-blue-500 text-white px-6 py-2 rounded-lg" onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
