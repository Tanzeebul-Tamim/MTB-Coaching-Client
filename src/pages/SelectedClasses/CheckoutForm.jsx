import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { BsFillCreditCardFill } from "react-icons/bs";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { purchaseClass, updateStudentCount } from "../../api/bookApi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const CheckoutForm = ({ classItem, setFlipped, cardDetails, setFocus }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (classItem?.classFee) {
      fetch(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ price: classItem?.classFee }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
        })
        .catch((err) => console.error(err));
    }
  }, [classItem]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("[error]", confirmError);
      setCardError(confirmError.message);
    } else {
      Swal.fire({
        title: `Are you sure you want to proceed with the payment and enroll in "${classItem["class-name"]}" course?`,
        text: "You won't be able to revert this!",
        icon: "question",
        color: "white",
        iconColor: "rgb(234 179 8)",
        showCancelButton: true,
        confirmButtonColor: "rgb(234 179 8)",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Proceed!",
        background: "#201e1e",
        backdrop: "#00000",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("[paymentIntent]", paymentIntent);
          if (paymentIntent.status === "succeeded") {
            const paymentInfo = {
              transactionId: paymentIntent.id,
              date: new Date(),
            };
            purchaseClass(
              classItem.studentId,
              classItem.instructorId,
              user.email,
              user.displayName,
              classItem.classIndex,
              paymentInfo
            );
            updateStudentCount(classItem.instructorId, classItem.classIndex);
            toast.success(`Enrolled in "${classItem["class-name"]}"`, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            navigate("/dashboard/enrolled-classes");
          }
        }
      });
    }
  };

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
