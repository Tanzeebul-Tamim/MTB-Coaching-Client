import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { purchaseClass, updateStudentCount } from "../../../../api/bookApi";
import { toast } from "react-toastify";
import useSoundEffects from "../../../../hooks/useSoundEffects";

const useCheckoutForm = (classItem) => {
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);
    const { play } = useSoundEffects();

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
        setDisabled(true);

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
            setDisabled(false);
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
                            classItem.startDate,
                            classItem.endDate,
                            paymentInfo
                        );
                        updateStudentCount(
                            classItem.instructorId,
                            classItem.classIndex
                        );
                        play("success");
                        toast.success(
                            <div className="text-center">
                                Successfully enrolled in <br />
                                <span className="font-bold text-green-500 text-[18px]">
                                    {classItem["class-name"]}
                                </span>
                            </div>,
                            {
                                position: "top-left",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            }
                        );
                        navigate("/dashboard/enrolled-classes");
                    }
                }

                setDisabled(false);
            });
        }
    };

    return {
        handleSubmit,
        cardError,
        stripe,
        disabled,
    };
};

export default useCheckoutForm;
