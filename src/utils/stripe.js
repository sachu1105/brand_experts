import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    "pk_live_51K9t4GClllkfU7woX1ffJ66Gs1F1FRZqdrgUKPgZ6zzsjroIezfXgQUQDB385ZEmAQcTz283mC8GiTo1LwTGORYQ0042haEpax"
);

export default stripePromise;
