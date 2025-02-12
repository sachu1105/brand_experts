import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import Csection1 from "./Csection1";

function Cart() {
  const {
    state: { items },
  } = useCart();
  const { user } = useAuth();

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-2xl font-bold">Please Login to View Cart</h1>
          <p className="text-gray-600">
            You need to be logged in to view your cart items.
          </p>
          <Link
            to="/login"
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return <Csection1 />;
  }

  const calculateSubtotal = () => {
    return items
      .reduce(
        (total, item) => total + parseFloat(item.total) * item.quantity,
        0
      )
      .toFixed(2);
  };

  const calculateTax = () => {
    return (parseFloat(calculateSubtotal()) * 0.05).toFixed(2); // 5% VAT
  };

  const calculateTotal = () => {
    return (
      parseFloat(calculateSubtotal()) + parseFloat(calculateTax())
    ).toFixed(2);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.timestamp} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${calculateSubtotal()}</span>
            </div>
            <div className="flex justify-between">
              <span>VAT (5%)</span>
              <span>${calculateTax()}</span>
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
          </div>

          <Link
            to="/checkout"
            className="w-full mt-6 bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white py-3 rounded-lg hover:shadow-lg transition-shadow duration-200 inline-block text-center font-medium"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
