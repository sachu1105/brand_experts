import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { Steps } from "./components/Steps";
import ShippingForm from "./components/ShippingForm";
import PaymentForm from "./components/PaymentForm";
import ReviewOrder from "./components/ReviewOrder";
import OrderConfirmation from "./components/OrderConfirmation";

const steps = [
  { id: "shipping", name: "Shipping", status: "current" },
  { id: "payment", name: "Payment", status: "upcoming" },
  { id: "review", name: "Review", status: "upcoming" },
  { id: "confirmation", name: "Confirmation", status: "upcoming" },
];

export default function Checkout() {
  const { cart, total } = useCart();
  const [currentStep, setCurrentStep] = useState("shipping");

  // Calculate total from cart items
  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + parseFloat(item.total), 0);
  };

  const [customerData, setCustomerData] = useState(() => {
    const customer_id = sessionStorage.getItem("customer_id");
    const cartItems = cart || [];
    const cartTotal = calculateTotal(cartItems);

    console.log("Initializing customer data:", {
      customer_id,
      cartItems,
      cartTotal,
    });

    return {
      customer_id: parseInt(customer_id),
      cart_items: cartItems,
      total_amount: cartTotal,
    };
  });

  // Update customer data when cart changes
  useEffect(() => {
    if (cart && cart.length > 0) {
      const newTotal = calculateTotal(cart);
      setCustomerData((prev) => ({
        ...prev,
        cart_items: cart,
        total_amount: newTotal,
      }));
    }
  }, [cart]);

  const [formData, setFormData] = useState({
    shipping: {},
    payment: {},
  });

  useEffect(() => {
    // Validate required data
    if (!customerData.customer_id) {
      console.error("Customer ID not found in session");
      // Handle missing customer ID - maybe redirect to login
    }

    console.log("Customer Data:", customerData);
  }, [customerData]);

  const updateFormData = (step, data) => {
    setFormData((prev) => ({
      ...prev,
      [step]: data,
    }));
  };

  const handleNext = () => {
    const stepIndex = steps.findIndex((s) => s.id === currentStep);
    if (stepIndex < steps.length - 1) {
      setCurrentStep(steps[stepIndex + 1].id);
    }
  };

  const handleBack = () => {
    const stepIndex = steps.findIndex((s) => s.id === currentStep);
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Steps steps={steps} currentStep={currentStep} />

        <div className="mt-8">
          {currentStep === "shipping" && (
            <ShippingForm
              onNext={handleNext}
              initialData={formData.shipping}
              onSave={(data) => {
                updateFormData("shipping", data);
                // Log the shipping data for verification
                console.log("Shipping data saved:", data);
              }}
            />
          )}

          {currentStep === "payment" && customerData.total_amount > 0 && (
            <PaymentForm
              customerData={customerData}
              onNext={handleNext}
              onBack={handleBack}
              initialData={formData.payment}
              onSave={(data) => updateFormData("payment", data)}
            />
          )}

          {currentStep === "review" && (
            <ReviewOrder
              onNext={handleNext}
              onBack={handleBack}
              formData={formData}
            />
          )}

          {currentStep === "confirmation" && (
            <OrderConfirmation orderData={formData} />
          )}
        </div>
      </div>
    </div>
  );
}