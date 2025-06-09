import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./styles/CheckOutForm.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useTitle from "../../Helmet/useTitle";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "./styles/style.css";
import { getUserData } from "../../api/authApi";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_GATEWAY_PK}`);

const PaymentConfirmation = () => {
    const [classItem, setClassItem] = useState(null);
    const [flipped, setFlipped] = useState(false);
    const studentName = classItem?.studentName;
    const [focus, setFocus] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const { studentId, itemId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [cardDetails, setCardDetails] = useState({
        cvc: "",
        expiry: "",
        name: studentName,
        number: "",
    });
    const { user, loading } = useAuth();
    const [loading2, setLoading2] = useState(false);
    useTitle("| Payment");

    useEffect(() => {
        if (user?.email) {
            getUserData(user.email).then((data) => setUserDetails(data));
        }
    }, [user]);

    useEffect(() => {
        if (userDetails?._id && studentId && itemId) {
            setLoading2(true);
            fetch(
                `${import.meta.env.VITE_API_URL}/book-class/${
                    userDetails._id
                }/${studentId}/${itemId}`
            )
                .then(async (res) => {
                    if (res.status === 403) {
                        toast.warning(
                            "You are not authorized to access this page!",
                            {
                                position: "top-center",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                            }
                        );

                        const fallbackLocation =
                            localStorage.getItem("lastLocation") ||
                            "/dashboard/profile";
                        setLoading2(false);
                        navigate(fallbackLocation, {
                            state: { from: location },
                        });
                        return; // Stop further execution
                    }
                    const data = await res.json();
                    setClassItem(data);
                    setLoading2(false);
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => setLoading2(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userDetails, studentId, itemId]);

    const handleNumberChange = (event) => {
        let { value } = event.target;
        const { maxLength } = event.target;

        if (value.length > maxLength) {
            value = value.slice(0, maxLength); // Truncate the value to maxLength characters
        }

        setCardDetails((prevState) => ({
            ...prevState,
            number: value,
        }));
        setFocus(event.target.name);
    };

    const handleExpiryChange = (event) => {
        let { value } = event.target;
        const { maxLength } = event.target;

        if (value.length > maxLength) {
            value = value.slice(0, maxLength); // Truncate the value to maxLength characters
        }

        setCardDetails((prevState) => ({
            ...prevState,
            expiry: value,
        }));
        setFocus(event.target.name);
    };

    const handleCvcChange = (event) => {
        let { value } = event.target;
        const { maxLength } = event.target;

        if (value.length > maxLength) {
            value = value.slice(0, maxLength); // Truncate the value to maxLength characters
        }

        setCardDetails((prevState) => ({
            ...prevState,
            cvc: value,
        }));
        setFocus(event.target.name);
    };

    return (
        <div className="flex justify-center">
            <div className="z-10 overflow-x-auto mt-[35%] lg:mt-0 flex flex-col bg-base-100 w-full max-w-[410px] py-5 px-3 sm:px-4 rounded-2xl lg:bg-opacity-50 bg-opacity-60 description">
                <h1 className="z-[100] text-white text-lg sm:text-xl mb-3 tracking-[3px] sm:tracking-[5px] lg:tracking-[9px] text-center uppercase font-extrabold">
                    Confirm Payment
                </h1>
                <div className="z-[100] lg:text-lg">
                    <div>
                        <div>
                            <div
                                className={`pay-card-container ${
                                    flipped ? "flipped" : ""
                                }`}
                                style={{
                                    width: "100%",
                                    maxWidth: 340,
                                    margin: "0 auto",
                                }}
                            >
                                <div className="pay-card">
                                    <div className="front">
                                        <div className="z-50 flex justify-center items-center">
                                            <img
                                                src={
                                                    loading || loading2
                                                        ? "/class-loading.gif"
                                                        : classItem?.classImage
                                                }
                                                className={`w-full max-w-[340px] h-[52vw] max-h-[200px] min-h-[120px] rounded-2xl`}
                                            />
                                        </div>
                                    </div>
                                    <div className="back">
                                        <Cards
                                            cvc={cardDetails.cvc}
                                            expiry={cardDetails.expiry}
                                            focused={focus}
                                            name={studentName}
                                            number={cardDetails.number}
                                            previewIssuer={flipped}
                                            className="w-full max-w-[340px]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-7">
                            <div className="z-50 flex items-center">
                                <strong className="">Course :</strong>{" "}
                                <div className=" ml-1">
                                    {classItem?.["class-name"]}
                                </div>
                            </div>
                            <div className="z-50 flex items-center">
                                <strong className="">Instructor :</strong>{" "}
                                <div className=" ml-1">
                                    {classItem?.instructorName}
                                </div>
                            </div>
                            <div className="z-50 flex items-center">
                                <strong className="">Price :</strong>{" "}
                                <div className=" ml-1">{`$ ${classItem?.classFee}`}</div>
                            </div>
                        </div>
                    </div>

                    <div className="z-50 mt-3">
                        <input
                            maxLength={16}
                            onInput={handleNumberChange}
                            onFocus={() => setFlipped(true)}
                            onBlur={() => setFlipped(false)}
                            name="number"
                            type="number"
                            className="rounded-md w-full input input-bordered bg-[#4b4646] h-10 focus:outline-none mb-3 placeholder:text-[#aab7c4] text-[#aab7c4]"
                            placeholder="Card number"
                        />
                        <div className="flex mb-3 gap-1">
                            <input
                                maxLength={4}
                                onInput={handleExpiryChange}
                                onFocus={() => setFlipped(true)}
                                onBlur={() => setFlipped(false)}
                                name="expiry"
                                type="number"
                                className="rounded-md w-full input input-bordered bg-[#4b4646] h-10 focus:outline-none placeholder:text-[#aab7c4] text-[#aab7c4]"
                                placeholder="Expiry date"
                            />
                            <input
                                maxLength={3}
                                onInput={handleCvcChange}
                                onFocus={() => setFlipped(true)}
                                onBlur={() => setFlipped(false)}
                                name="cvc"
                                type="number"
                                className="rounded-md w-full input input-bordered bg-[#4b4646] h-10 focus:outline-none placeholder:text-[#aab7c4] text-[#aab7c4]"
                                placeholder="CVC"
                            />
                        </div>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm
                                setFocus={setFocus}
                                cardDetails={cardDetails}
                                setFlipped={setFlipped}
                                classItem={classItem}
                            ></CheckoutForm>
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentConfirmation;
