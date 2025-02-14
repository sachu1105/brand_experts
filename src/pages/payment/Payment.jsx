import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaymentForm from "../checkout/components/PaymentForm";
import { toast } from "react-hot-toast";

export default function Payment() {
  const navigate = useNavigate();

  useEffect(() => {
    const cartId = sessionStorage.getItem("cart_id");
    if (!cartId) {
      toast.error("No active cart found");
      navigate("/checkout");
    }
  }, [navigate]);

  const handlePaymentSuccess = () => {
    navigate("/order-confirmation");
  };

  const handleBack = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PaymentForm onNext={handlePaymentSuccess} onBack={handleBack} />
      </div>
    </div>
  );
}
