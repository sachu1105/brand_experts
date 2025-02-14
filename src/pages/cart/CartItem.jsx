import { Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function CartItem({ item }) {
  const { dispatch } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      const unitPrice = item.price; // Individual item price
      const newTotalPrice = unitPrice * newQuantity;

      dispatch({
        type: "UPDATE_QUANTITY",
        payload: {
          productid: item.productid,
          quantity: newQuantity,
          price: unitPrice, // Individual price
          totalprice: newTotalPrice,
        },
      });
    }
  };

  const handleRemove = () => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: item.productid,
    });
  };

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={item.designimage}
          alt="Product"
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="flex-grow">
        <div className="flex justify-between">
          <h3 className="font-medium">{item.name}</h3>
          <button
            onClick={handleRemove}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-2 text-sm text-gray-600">
          <p>
            Size: {item.customwidth}" x {item.customheight}"
          </p>
          <p>Unit: {item.sizeunit}</p>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="px-2 py-1 border rounded"
            >
              -
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="px-2 py-1 border rounded"
            >
              +
            </button>
          </div>

          <span className="font-medium">{item.totalprice.toFixed(2)} AED</span>
        </div>
      </div>
    </div>
  );
}
