import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import useUserData from "../../../hooks/useUserData";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useScreenSize from "../../../hooks/useScreenSize";

const usePaymentConfirmation = () => {
    const stripePromise = loadStripe(
        `${import.meta.env.VITE_PAYMENT_GATEWAY_PK}`
    );

    const { isSmallDevice } = useScreenSize();
    const [classItem, setClassItem] = useState(null);
    const [flipped, setFlipped] = useState(false);
    const studentName = classItem?.studentName;
    const [focus, setFocus] = useState(null);
    const { studentId, itemId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [cardDetails, setCardDetails] = useState({
        cvc: "",
        expiry: "",
        name: studentName,
        number: "",
    });
    const { loading } = useAuth();
    const {
        loading: loading2,
        setLoading: setLoading2,
        userDetails,
    } = useUserData();
    useTitle("| Payment");

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
                            }
                        );

                        const fallbackLocation =
                            localStorage.getItem("lastLocation") ||
                            "/dashboard/profile";
                        navigate(fallbackLocation, {
                            state: { from: location },
                        });
                        return; // Stop further execution
                    }
                    const data = await res.json();
                    setClassItem(data);
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

    return {
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
        isSmallDevice
    };
};

export default usePaymentConfirmation;
