import { useLocation } from "react-router-dom";
import PaymentForm from "./WarrantyPaymentForm";

const PaymentPage = () => {
  const location = useLocation();
  const { client_secret, warranty_id, metadata } = location.state || {};
  const amount = metadata?.warranty_plan_amount || 0; // ✅ Default to 0 if missing
  
  if (!client_secret || !warranty_id || !metadata ) {
    return <div>Error: Missing payment details.</div>;
  }

  return (
    <div>
      <PaymentForm
        clientSecret={client_secret}
        warrantyId={warranty_id}
        customerId={location.state.customer_id}
        name={metadata.name}
        email={metadata.email}
        warrantyPlanAmount={amount} // Pass amount to PaymentForm
      />
    </div>
  );
};

export default PaymentPage;
