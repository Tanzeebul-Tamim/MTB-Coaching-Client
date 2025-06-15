import {
    EmailAuthProvider,
    getAuth,
    reauthenticateWithCredential,
    updatePassword,
} from "firebase/auth";
import app from "../../../firebase/firebase.config";
import { useEffect, useRef, useState } from "react";
import useScreenSize from "../../../hooks/useScreenSize";
import { Flip, Slide, toast } from "react-toastify";

const fireToast = (message) => {
    const time = 2000;
    toast.error(message, {
        position: "top-right",
        autoClose: time,
        hideProgressBar: false,
        limit: 3,
        transition: Flip,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

const useChangePassword = () => {
    const auth = getAuth(app);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const currentPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();
    const modalRef = useRef(null);
    const { isSmallDevice } = useScreenSize();

    const [currentPassInput, setCurrentPassInput] = useState(null);
    const [newPassInput, setNewPassInput] = useState(null);
    const [confirmPassInput, setConfirmPassInput] = useState(null);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };
    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(""), 2000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            currentPassInput
        );
        setLoading(true);
        let message;
        reauthenticateWithCredential(auth.currentUser, credential)
            .then(() => {
                if (newPassInput === confirmPassInput) {
                    if (newPassInput.length < 6) {
                        message =
                            "Password must be at least 6 characters long!";
                        setError(message);
                        fireToast(message);
                        setLoading(false);
                        return;
                    } else if (!/(?=.*[A-Z])/.test(newPassInput)) {
                        message =
                            "Password must contain at least one uppercase letter";
                        setError(message);
                        fireToast(message);
                        setLoading(false);
                        return;
                    } else if (!/(?=.*\d)/.test(newPassInput)) {
                        message = "Password must contain at least one digit";
                        setError(message);
                        fireToast(message);
                        setLoading(false);
                        return;
                    } else if (
                        !/(?=.*[!@#$%^&*()_\-+={}[\]\\|:;"'<>,.?/~])/.test(
                            newPassInput
                        )
                    ) {
                        message =
                            "Password must contain at least one special character";
                        setError(message);
                        fireToast(message);
                        setLoading(false);
                        return;
                    }
                } else {
                    message = "Passwords do not match";
                    setError(message);
                    fireToast(message);
                    setLoading(false);
                    return;
                }
                return updatePassword(auth.currentUser, newPassInput).then(
                    () => {
                        toast.success("Password updated!", {
                            position: "top-center",
                            autoClose: 1100,
                            hideProgressBar: false,
                            closeOnClick: true,
                            transition: Slide,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        setError("");
                        setLoading(false);
                        modalRef.current.close();
                    }
                );
            })
            .catch((error) => {
                console.error(error);
                if (error.code === "auth/wrong-password") {
                    message = "Current password is incorrect";
                    setError(message);
                    fireToast(message);
                    setLoading(false);
                    return;
                } else if (error.code === "auth/too-many-requests") {
                    message = "Too many unsuccessful attempts! Try again later";
                    setError(message);
                    fireToast(message);
                    setLoading(false);
                    return;
                }
            });
    };

    return {
        currentPasswordRef,
        newPasswordRef,
        confirmPasswordRef,
        isSmallDevice,
        setCurrentPassInput,
        setNewPassInput,
        setConfirmPassInput,
        loading,
        toggleCurrentPasswordVisibility,
        toggleNewPasswordVisibility,
        toggleConfirmPasswordVisibility,
        handleSubmit,
        modalRef,
        error,
        showCurrentPassword,
        showNewPassword,
        showConfirmPassword,
        currentPassInput,
        newPassInput,
        confirmPassInput,
    };
};

export default useChangePassword;
