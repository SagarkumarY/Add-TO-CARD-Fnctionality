import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful! 🎉</h1>
      <p className="text-lg text-gray-600 mt-2">Thank you for your purchase.</p>
      <Link to="/" className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg">
        Continue Shopping
      </Link>
    </div>
  );
};

export default Success;
