import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckOutForm/CheckoutForm";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "../../../styles/creditCard.css";
import "../../../styles/checkoutForm.css";
import ImageWithLoader from "../../../components/ui/ImageWithLoader";
import usePaymentConfirmation from "./usePaymentConfirmation";
import DashboardPageTitle from "../../../components/ui/DashboardPageTitle";

const PaymentConfirmation = () => {
    const {
        stripePromise,
        flipped,
        setFlipped,
        focus,
        cardDetails,
        loading,
        loading2,
        handleNumberChange,
        handleExpiryChange,
        handleCvcChange,
        classItem,
        studentName,
        setFocus,
        isSmallDevice,
    } = usePaymentConfirmation();

    return (
        <div className="flex flex-col items-center justify-center">
            {isSmallDevice && <DashboardPageTitle title="Confirm Payment" />}
            <div className="z-10 overflow-x-auto mt-[25%] lg:mt-0 flex flex-col bg-base-100 w-full max-w-[410px] py-5 px-3 sm:px-4 rounded-2xl lg:bg-opacity-50 bg-opacity-60 description">
                {!isSmallDevice && (
                    <h1 className="z-[100] text-base-content text-lg sm:text-xl mb-3 tracking-[3px] sm:tracking-[5px] lg:tracking-[9px] text-center uppercase font-extrabold">
                        Confirm Payment
                    </h1>
                )}
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
                                            <ImageWithLoader
                                                src={
                                                    loading || loading2
                                                        ? "/assets/class-loading.gif"
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
                                <div
                                    className={
                                        loading || loading2
                                            ? "ml-2 rounded bg-gray-500 w-1/2 h-3 animate-pulse"
                                            : "ml-1"
                                    }
                                >
                                    {!loading && !loading2
                                        ? classItem?.["class-name"]
                                        : ""}
                                </div>
                            </div>
                            <div className="z-50 flex items-center">
                                <strong className="">Instructor :</strong>{" "}
                                <div
                                    className={
                                        loading || loading2
                                            ? "ml-2 rounded bg-gray-500 w-1/3 h-3 animate-pulse"
                                            : "ml-1"
                                    }
                                >
                                    {!loading && !loading2
                                        ? classItem?.instructorName
                                        : ""}
                                </div>
                            </div>
                            <div className="z-50 flex items-center">
                                <strong className="">Price :</strong>{" "}
                                <div
                                    className={
                                        loading || loading2
                                            ? "ml-2 rounded bg-gray-500 w-1/12 h-3 animate-pulse"
                                            : "ml-1"
                                    }
                                >
                                    {!loading && !loading2 && classItem
                                        ? "$ " + classItem?.classFee
                                        : ""}
                                </div>
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
                            className="rounded-md w-full placeholder:text-gray-500 input h-10 focus:outline-none mb-3"
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
                                className="rounded-md w-full placeholder:text-gray-500 input h-10 focus:outline-none"
                                placeholder="Expiry date"
                            />
                            <input
                                maxLength={3}
                                onInput={handleCvcChange}
                                onFocus={() => setFlipped(true)}
                                onBlur={() => setFlipped(false)}
                                name="cvc"
                                type="number"
                                className="rounded-md w-full placeholder:text-gray-500 input h-10 focus:outline-none"
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
