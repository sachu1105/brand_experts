import { useCart } from "../context/CartContext";

export default function CartBadge() {
  const {
    state: { items },
  } = useCart();
  const itemCount = items.length;

  if (itemCount === 0) return null;

  return (
    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
      {itemCount}
    </div>
  );
}
