import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const StripeProvider = ({ children }) => (
    <Elements stripe={stripePromise}>{children}</Elements>
);

export default StripeProvider;
