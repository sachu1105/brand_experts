"use client"

import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { CreditCard, CheckCircle, AlertCircle, Lock } from "lucide-react"

import Mastercard from "../../assets/svg/Mastercard.svg"
import visa from "../../assets/svg/Visa.svg"

const stripePromise = loadStripe(
  "pk_live_51K9t4GClllkfU7woX1ffJ66Gs1F1FRZqdrgUKPgZ6zzsjroIezfXgQUQDB385ZEmAQcTz283mC8GiTo1LwTGORYQ0042haEpax",
)

const confirmPayment = async (paymentIntentId, warrantyId) => {
  try {
    const response = await fetch("/api/confirm-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paymentIntentId, warrantyId }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error confirming payment:", error)
    return { status: "error" }
  }
}

const PaymentForm = ({ clientSecret, warrantyId, name, email, warrantyPlanAmount }) => {
  const [error, setError] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [warrantyNumber, setWarrantyNumber] = useState(null)
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsProcessing(true)
    setError(null)

    if (!stripe || !elements) {
      setError("Stripe has not loaded. Please try again.")
      setIsProcessing(false)
      return
    }

    const card = elements.getElement(CardElement)

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: email,
          },
        },
      })

      if (error) {
        throw new Error(error.message)
      }

      if (paymentIntent.status === "succeeded") {
        const confirmationResult = await confirmPayment(paymentIntent.id, warrantyId)
        if (confirmationResult.status === "success") {
          setPaymentSuccess(true)
          setWarrantyNumber(confirmationResult.warranty_number)
        } else {
          throw new Error("Payment failed. Please try again.")
        }
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsProcessing(false)
    }
  }

  if (paymentSuccess) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-6 flex flex-col items-center justify-center">
            <CheckCircle size={64} className="text-white mb-4" />
            <h2 className="text-2xl font-bold text-white">Payment Successful!</h2>
          </div>
          <div className="p-8 bg-white">
            <div className="mb-6 text-center">
              <p className="text-gray-600 mb-4">
                Thank you for your payment. Your warranty has been activated.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-500">Warranty Number</p>
                <p className="text-xl font-mono font-semibold text-gray-800">{warrantyNumber}</p>
              </div>
              <p className="text-sm text-gray-500">
                A confirmation email has been sent to {email}
              </p>
            </div>
            <button
              onClick={() => window.location.href = "/"}
              className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white py-3 px-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-br  from-[#BF1A1C] via-[#A11415] to-[#590C0D] p-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-white">Payment</h2>
            <div className="text-white font-medium">{warrantyPlanAmount} AED</div>
          </div>
          <div className="flex items-center text-white/80 text-sm">
            <Lock size={14} className="mr-1" />
            <span>Secure Payment</span>
          </div>
        </div>
        
        <div className="p-6">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="card-element" className="block text-sm font-medium text-gray-700">
                Card Details
              </label>
              <div className="flex space-x-1 items-center">
                <img src={visa} alt="Visa" className="h-5" />
                <img src={Mastercard} alt="Mastercard" className="h-8" />
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 transition-all focus-within:border-indigo-300 focus-within:ring-1 focus-within:ring-indigo-300">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#424770",
                      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                      iconColor: "#6366F1",
                    },
                    invalid: {
                      color: "#EF4444",
                      iconColor: "#EF4444",
                    },
                  },
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className={`w-full bg-gradient-to-r from-[#BF1A1C] via-[#A11415] to-[#590C0D] text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
              !stripe || isProcessing
                ? "opacity-70 cursor-not-allowed"
                : "hover:shadow-lg hover:from-[#D71F21] hover:via-[#B51718] hover:to-[#6D0E0F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
            }`}
            
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <CreditCard className="mr-2" />
                Pay {warrantyPlanAmount} AED
              </div>
            )}
          </button>
          
          <div className="mt-4 text-center text-xs text-gray-500 flex items-center justify-center">
            <Lock size={12} className="mr-1" />
            Your payment information is secure and encrypted
          </div>
        </div>
      </div>
    </form>
  )
}

const PaymentPage = ({ clientSecret, warrantyId, warrantyPlanAmount, name, email }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <Elements stripe={stripePromise}>
        <PaymentForm 
          clientSecret={clientSecret} 
          warrantyId={warrantyId} 
          warrantyPlanAmount={warrantyPlanAmount}
          name={name}
          email={email}
        />
      </Elements>
    </div>
  )
}

export default PaymentPage