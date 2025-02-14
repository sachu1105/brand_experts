import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
//   "pk_test_51QVV1sHGxf2bD0m27Cm8kqVEEB6T6nUBdrwm5XoTmi4cNI56T1Nda0eFuOIH4Dk3hBEQxAOSyLDygHAZhreqzFMm00HmrNYzxN"
    "pk_live_51K9t4GClllkfU7woX1ffJ66Gs1F1FRZqdrgUKPgZ6zzsjroIezfXgQUQDB385ZEmAQcTz283mC8GiTo1LwTGORYQ0042haEpax"
);

export default stripePromise;
