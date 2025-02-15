import React from "react";
import { useState } from "react";
import { Truck, Package, Clock, Info } from "lucide-react";
import { Link } from "react-router-dom";

// This will be replaced with actual API data
const mockOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "delivered",
    total: 249.99,
    items: [
      {
        id: 1,
        name: "Custom Metal Sign",
        quantity: 2,
        price: 124.99,
        image: "https://placehold.co/100x100",
      },
    ],
    tracking: "1Z999AA1234567890",
    deliveryDate: "2024-01-20",
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-18",
    status: "processing",
    total: 349.99,
    items: [
      {
        id: 2,
        name: "LED Business Sign",
        quantity: 1,
        price: 349.99,
        image: "https://placehold.co/100x100",
      },
    ],
  },
];

const statusColors = {
  processing: { bg: "bg-blue-100", text: "text-blue-800", icon: Clock },
  shipped: { bg: "bg-yellow-100", text: "text-yellow-800", icon: Truck },
  delivered: { bg: "bg-green-100", text: "text-green-800", icon: Package },
  cancelled: { bg: "bg-red-100", text: "text-red-800", icon: Info },
};

export default function Orders() {
  const [orders] = useState(mockOrders);

  const getStatusBadge = (status) => {
    const StatusIcon = statusColors[status]?.icon || Info;
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          statusColors[status]?.bg || "bg-gray-100"
        } ${statusColors[status]?.text || "text-gray-800"}`}
      >
        <StatusIcon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
          <p className="mt-1 text-sm text-gray-500">
            You haven't placed any orders yet.
          </p>
          <div className="mt-6">
            <Link
              to="/products"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow overflow-hidden sm:rounded-lg"
            >
              {/* Order Header */}
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Order #{order.id}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                {getStatusBadge(order.status)}
              </div>

              {/* Order Items */}
              <div className="px-4 py-5 sm:p-6">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center py-4 border-b last:border-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 object-cover rounded"
                    />
                    <div className="ml-4 flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-between items-center">
                <div className="text-sm text-gray-900">
                  Total:{" "}
                  <span className="font-medium">${order.total.toFixed(2)}</span>
                </div>
                <div className="space-x-3">
                  {order.tracking && (
                    <a
                      href={`https://www.ups.com/track?tracknum=${order.tracking}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Track Order
                    </a>
                  )}
                  <Link
                    to={`/orders/${order.id}`}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
