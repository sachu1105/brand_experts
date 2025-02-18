"use client"

import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { CreditCard } from "lucide-react"

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
          alert(`Payment successful! Warranty Number: ${confirmationResult.warranty_number}`)
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

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <CreditCard className="mr-2" />
            Payment Details
          </h2>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <label htmlFor="card-element" className="block text-sm font-medium text-gray-700 mb-1">
              Credit or Debit Card
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CreditCard className="h-5 w-5 text-gray-400" />
              </div>
              <div className="pl-10 pr-3 py-2 border border-gray-300 rounded-md">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className={`w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-md font-semibold text-lg transition-all duration-200 ${
              !stripe || isProcessing
                ? "opacity-50 cursor-not-allowed"
                : "hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            }`}
          >
            {isProcessing ? "Processing..." : `Pay ₹${warrantyPlanAmount}`}
          </button>
        </div>
      </div>
    </form>
  )
}

const PaymentPage = ({ clientSecret, warrantyId, warrantyPlanAmount }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <Elements stripe={stripePromise}>
        <PaymentForm clientSecret={clientSecret} warrantyId={warrantyId} warrantyPlanAmount={warrantyPlanAmount} />
      </Elements>
    </div>
  )
}

export default PaymentPage

