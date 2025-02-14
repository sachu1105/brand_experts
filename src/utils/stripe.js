import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QVV1sHGxf2bD0m27Cm8kqVEEB6T6nUBdrwm5XoTmi4cNI56T1Nda0eFuOIH4Dk3hBEQxAOSyLDygHAZhreqzFMm00HmrNYzxN"
);

export default stripePromise;
