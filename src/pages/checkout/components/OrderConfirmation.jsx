import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function OrderConfirmation() {
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="max-w-2xl mx-auto text-center pt-25 pb-28">
      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        <h2 className="mt-6 text-2xl font-semibold text-gray-900">
          Thank you for your order!
        </h2>

        <p className="mt-2 text-gray-600">
          Your order has been placed and will be processed soon.
        </p>

        <div className="mt-8 space-y-4">
          <p className="text-sm text-gray-600">
            Order confirmation has been sent to your email.
          </p>
          <p className="text-sm text-gray-600">Order number: #{orderNumber}</p>
        </div>

        <div className="mt-8 space-x-4">
          <Link
            to="/orders"
            className="inline-block bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white px-6 py-3 rounded-lg"
          >
            View Orders
          </Link>
          <Link
            to="/products"
            className="inline-block px-6 py-3 border border-gray-300 rounded-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
