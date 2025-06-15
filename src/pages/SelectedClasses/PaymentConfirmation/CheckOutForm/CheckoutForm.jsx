import { CardElement } from "@stripe/react-stripe-js";
import { BsFillCreditCardFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import useCheckoutForm from "./useCheckoutForm";

const CheckoutForm = ({ classItem, setFlipped, cardDetails, setFocus }) => {
    const { handleSubmit, cardError, stripe } = useCheckoutForm(classItem);

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                onFocus={() => {
                    setFlipped(true);
                    setFocus("number");
                }}
                className="stripe-bg"
                onBlur={() => setFlipped(false)}
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#aab7c4",
                            "::placeholder": {
                                color: "#6b7280",
                            },
                        },
                        invalid: {
                            color: "rgb(220 38 38)",
                        },
                    },
                }}
            />
            <p
                className={`${cardError && "text-red-600"} ${
                    cardError ? "visible" : "invisible"
                } mb-1 text-sm`}
            >
                {cardError ? cardError : "a"}
            </p>
            <div className="flex justify-center mt-4 gap-5">
                <button
                    className="btn text-md btn-sm rounded-lg hover:bg-base-300 bg-base-200 dark:hover:bg-stone-800 dark:bg-base-300 border-0 dark:disabled:bg-stone-900 disabled:bg-stone-400"
                    type="submit"
                    disabled={
                        !stripe ||
                        cardDetails.number.length !== 16 ||
                        cardDetails.expiry.length !== 4 ||
                        cardDetails.cvc.length !== 3
                    }
                >
                    <BsFillCreditCardFill /> Pay $ {classItem?.classFee}
                </button>
                <Link to="/dashboard/selected-classes">
                    <button className="btn text-md btn-sm rounded-lg hover:bg-base-300 bg-base-200 dark:hover:bg-stone-800 dark:bg-base-300 border-0">
                        Go Back
                    </button>
                </Link>
            </div>
        </form>
    );
};

export default CheckoutForm;
