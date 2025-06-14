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
                onBlur={() => setFlipped(false)}
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#aab7c4",
                            "::placeholder": {
                                color: "#aab7c4",
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
                    className="btn text-md btn-sm text-white border-0 rounded-lg hover:bg-stone-800 bg-stone-700 disabled:bg-stone-950"
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
                    <button className="btn text-md btn-sm text-white border-0 rounded-lg hover:bg-stone-800 bg-stone-700">
                        Go Back
                    </button>
                </Link>
            </div>
        </form>
    );
};

export default CheckoutForm;
