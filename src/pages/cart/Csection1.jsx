import { ShoppingCart, X, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function Csection1() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative w-24 h-24 mx-auto">
          <ShoppingCart className="w-24 h-24 text-gray-200" strokeWidth={1} />
          <X
            className="w-12 h-12 absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-gray-300"
            strokeWidth={1.5}
          />
        </div>

        <h1 className="text-3xl font-bold text-gray-900">Your Cart Is Empty</h1>

        <div className="space-y-2 text-lg">
          <p className="text-gray-600">
            Please{" "}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign In
            </Link>{" "}
            to your account to view your cart items.
          </p>

          <p className="text-gray-600">
            Or go to the{" "}
            <Link to="/design" className="text-blue-500 hover:underline">
              design tool
            </Link>{" "}
            to create your new signs.
          </p>
        </div>

        <Link
          to="/get-started"
          className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-3 rounded-full hover:bg-emerald-700 transition-colors"
        >
          GET STARTED
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}

