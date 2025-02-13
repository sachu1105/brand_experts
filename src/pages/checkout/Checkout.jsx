import { useState } from "react";
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
  const [currentStep, setCurrentStep] = useState("shipping");
  const [formData, setFormData] = useState({
    shipping: {},
    payment: {},
  });

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
              onSave={(data) => updateFormData("shipping", data)}
            />
          )}

          {currentStep === "payment" && (
            <PaymentForm
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
