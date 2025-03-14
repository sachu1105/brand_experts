import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { confirmPayment } from "../services/PaymentService";

// Map of full country names to ISO codes
const COUNTRY_CODES = {
  "United Arab Emirates": "AE",
  Oman: "OM",
  Bahrain: "BH",
  Qatar: "QA",
  Kuwait: "KW",
  "Saudi Arabia": "SA",
};

export default function StripePaymentForm({
  onSuccess,
  orderTotal = "0.00",
  subtotal = "0.00",
  tax = "0.00",
  vatPercentage = 5,
  transactionId,
  customerDetails,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("initial");
  const [billingDetails, setBillingDetails] = useState(null);

  useEffect(() => {
    // Load billing details from session storage
    const storedBillingDetails = sessionStorage.getItem("billing_details");
    if (storedBillingDetails) {
      setBillingDetails(JSON.parse(storedBillingDetails));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setPaymentStatus("processing");
    setIsProcessing(true);

    try {
      if (!stripe || !elements || !billingDetails) {
        throw new Error(
          "Payment system is not ready or billing details missing"
        );
      }

      // Ensure all required fields are present and correctly named
      const formattedBillingDetails = {
        name: billingDetails.name,
        email:
          billingDetails.email || sessionStorage.getItem("user_email") || "",
        phone: billingDetails.phone || "",
        address: {
          line1: billingDetails.address.line1,
          line2: billingDetails.address.line2 || "",
          city: billingDetails.address.city,
          state: billingDetails.address.state,
          postal_code:
            billingDetails.address.postal_code ||
            billingDetails.address.zip_code, // Handle both field names
          country: billingDetails.address.country,
        },
      };

      console.log("Formatted billing details:", formattedBillingDetails);

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          payment_method_data: {
            billing_details: formattedBillingDetails,
          },
          return_url: window.location.origin + "/payment-complete",
        },
        redirect: "if_required",
      });

      if (error) {
        console.error("Payment error:", error);
        setErrorMessage(error.message);
        setPaymentStatus("error");
        return;
      }

      if (paymentIntent.status === "succeeded") {
        setPaymentStatus("success");
        const confirmationResponse = await confirmPayment(paymentIntent.id);
        if (confirmationResponse.success) {
          // Clear billing details from session storage
          sessionStorage.removeItem("billing_details");
          onSuccess();
        }
      }
    } catch (error) {
      console.error("Payment submission error:", error);
      setErrorMessage(error.message);
      setPaymentStatus("error");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!billingDetails) {
    return (
      <div className="text-center p-4">
        <p className="text-red-600">
          Please complete the shipping form before proceeding to payment.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Payment Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Payment Details
            </h2>
            <p className="text-gray-600 mt-1">
              Complete your purchase securely
            </p>
          </div>
          <div className="flex space-x-2">
            <img src="/visa.svg" alt="Visa" className="h-8" />
            <img src="/mastercard.svg" alt="Mastercard" className="h-8" />
            <img src="/amex.svg" alt="Amex" className="h-8" />
          </div>
        </div>
        {transactionId && (
          <p className="text-sm text-gray-500 mt-2">
            Transaction ID: {transactionId}
          </p>
        )}
      </div>

      {/* Customer Details */}
      {customerDetails && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-md font-medium text-gray-900 mb-2">
            Customer Information
          </h3>
          <p className="text-sm text-gray-600">{customerDetails.username}</p>
          <p className="text-sm text-gray-600">{customerDetails.email}</p>
        </div>
      )}

      {/* Order Summary Card */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Order Summary
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">AED {subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">VAT ({vatPercentage}%)</span>
            <span className="font-medium">AED {tax}</span>
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span className="text-gray-900">Total Amount</span>
              <span className="text-red-600">AED {orderTotal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <PaymentElement
              options={{
                layout: {
                  type: "tabs",
                  defaultCollapsed: false,
                },
                fields: {
                  billingDetails: "never",
                },
              }}
            />
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 text-red-400 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm text-red-600">{errorMessage}</p>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className={`w-full flex items-center justify-center px-6 py-4 rounded-lg text-white text-lg font-medium transition-all duration-200
              ${
                isProcessing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-md hover:shadow-lg"
              }`}
          >
            {isProcessing ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing Payment...
              </span>
            ) : (
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Pay AED {orderTotal}
              </span>
            )}
          </button>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center space-x-2 text-gray-500">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span className="text-sm">Secured by Stripe</span>
          <span className="text-sm">•</span>
          <span className="text-sm">256-bit SSL Encryption</span>
        </div>
      </form>
    </div>
  );
}
