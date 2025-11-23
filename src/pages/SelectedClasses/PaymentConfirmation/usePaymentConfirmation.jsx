import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import useUserData from "../../../hooks/useUserData";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useScreen from "../../../hooks/useScreen";

const usePaymentConfirmation = () => {
    const { isSmallDevice } = useScreen();
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

    function calculateTotalWithTax(taxRate = 0.1) {
        const taxAmount = classItem?.classFee * taxRate;
        const total = classItem?.classFee + taxAmount;
        return {
            total: parseFloat(total.toFixed(2)),
        };
    }

    useEffect(() => {
        if (userDetails?._id && studentId && itemId) {
            setLoading2(true);
            fetch(
                `${import.meta.env.VITE_API_URL}/book-class/${
                    userDetails?._id
                }/${studentId}/${itemId}`
            )
                .then(async (res) => {
                    if (res.status === 403) {
                        toast.error(
                            <div className="text-center font-bold text-[18px] text-red-500">
                                You are not authorized to access this page!
                            </div>,
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
        calculateTotalWithTax,
    };
};

export default usePaymentConfirmation;
