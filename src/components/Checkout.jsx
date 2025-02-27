import { useState } from "react";
import useCartStore from "../store/cartStore"; // Importing the Zustand cart store
import { useNavigate } from "react-router-dom"; // For redirection after payment
import { Button } from "@/components/ui/button"; // Importing Button component

// Array of valid coupon codes (e.g., "Madara10" gives 10% discount)
const validCoupons = ["Madara10", "Madara20", "Madara30" , "Madara40", "Madara50"];

const Checkout = () => {
  const { cart, clearCart } = useCartStore(); // Access cart state and clearCart function from Zustand store
  const navigate = useNavigate(); // Hook for navigation after payment

  // State variables for handling coupon code and discount
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const shippingFee = 5.0; // Fixed shipping fee

  // Calculate subtotal: sum of (price * quantity) for all cart items
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Final total after applying discount and adding shipping fee
  const total = subtotal + shippingFee - discount;

  // Function to apply coupon code
  const applyCoupon = () => {
    // Check if the entered coupon exists in the validCoupons array
    const foundCoupon = validCoupons.find((c) => c === coupon);

    if (foundCoupon) {
      // Extract numerical part of the coupon (e.g., "Madara10" → 10)
      const discountPercentage = parseInt(foundCoupon.replace(/\D/g, ""), 10);

      // Calculate discount amount based on percentage
      setDiscount((subtotal * discountPercentage) / 100);

      setCouponApplied(true); // Indicate that the coupon is applied
    } else {
      // If invalid coupon, reset discount and notify user
      setDiscount(0);
      setCouponApplied(false);
      alert("Invalid Coupon Code");
    }
  };

  // Function to handle payment with Razorpay
  const handlePayment = async () => {
    const options = {
      key: "rzp_test_FdDI6tOcvxfnJK", // Replace with your Razorpay API key
      amount: total * 100, // Convert total to smallest currency unit (cents)
      currency: "INR", // Indian Rupees
      name: "Your Store",
      description: "Order Payment",
      image: "/logo.png", // Your store logo
      handler: function (response) {
        alert(`Payment Successful! ID: ${response.razorpay_payment_id}`);

        clearCart(); // Clear cart after successful payment

        navigate("/success"); // Redirect to success page
      },
      prefill: {
        name: "Customer",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#00a86b", // Customize Razorpay UI color
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open(); // Open Razorpay payment modal
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      {/* Display Subtotal */}
      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      {/* Display Shipping Fee */}
      <div className="flex justify-between mb-2">
        <span>Shipping:</span>
        <span>${shippingFee.toFixed(2)}</span>
      </div>

      {/* Coupon Input Section */}
      <div className="mb-4">
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)} // Update state when user types
          placeholder="Enter coupon code"
          className="w-full border p-2 rounded-lg"
        />
        <Button
          className="mt-2 w-full bg-gray-500 text-white"
          onClick={applyCoupon}
        >
          Apply
        </Button>
      </div>

      {/* Show discount message when coupon is applied */}
      {couponApplied && (
        <div className="text-green-600 text-sm mb-2">
          Coupon applied: {coupon.replace(/\D/g, "")}% off your order
        </div>
      )}

      {/* Display Discount if applied */}
      {discount > 0 && (
        <div className="flex justify-between text-red-500 mb-2">
          <span>Discount:</span>
          <span>- ${discount.toFixed(2)}</span>
        </div>
      )}

      {/* Display Final Total */}
      <div className="flex justify-between font-bold text-lg mb-4">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>

      {/* Checkout Button - Initiates Payment */}
      <Button
        className="w-full bg-blue-500 text-white py-2 rounded-lg"
        onClick={handlePayment}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default Checkout;
