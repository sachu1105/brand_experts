export default function ReviewOrder({ onNext, onBack, formData }) {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || { cart_items: [] };
  const subtotal = cart.cart_items.reduce(
    (sum, item) => sum + parseFloat(item.total),
    0
  );
  const shipping = 0; // You can calculate this based on shipping method
  const total = subtotal + shipping;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Shipping Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Shipping Information
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Name</p>
              <p>
                {formData.shipping.firstName} {formData.shipping.lastName}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Address</p>
              <p>{formData.shipping.address}</p>
              <p>
                {formData.shipping.city}, {formData.shipping.state}{" "}
                {formData.shipping.zipCode}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900">
            Payment Information
          </h3>
          <div className="mt-4 text-sm">
            <p className="text-gray-500">
              Card ending in {formData.payment.cardNumber.slice(-4)}
            </p>
            <p className="text-gray-500">
              Expires {formData.payment.expiryDate}
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900">Order Summary</h3>
          <div className="mt-4 space-y-4">
            {cart.cart_items.map((item) => (
              <div
                key={item.timestamp}
                className="flex justify-between text-sm"
              >
                <div>
                  <p>{item.name}</p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <p>{item.total} AED</p>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{subtotal.toFixed(2)} AED</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>{shipping.toFixed(2)} AED</p>
              </div>
              <div className="flex justify-between font-medium">
                <p>Total</p>
                <p>{total.toFixed(2)} AED</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 rounded-lg"
          >
            Back
          </button>
          <button
            onClick={onNext}
            className="bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white px-6 py-3 rounded-lg"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
