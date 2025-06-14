import {
    EmailAuthProvider,
    getAuth,
    reauthenticateWithCredential,
    updatePassword,
} from "firebase/auth";
import app from "../../../firebase/firebase.config";
import { useEffect, useRef, useState } from "react";
import useScreenSize from "../../../hooks/useScreenSize";
import { Slide, toast } from "react-toastify";

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
        reauthenticateWithCredential(auth.currentUser, credential)
            .then(() => {
                if (newPassInput === confirmPassInput) {
                    if (newPassInput.length < 6) {
                        setError(
                            "Password must be at least 6 characters long!"
                        );
                        setLoading(false);
                        return;
                    } else if (!/(?=.*[A-Z])/.test(newPassInput)) {
                        setError(
                            "Password must contain at least one uppercase letter"
                        );
                        setLoading(false);
                        return;
                    } else if (!/(?=.*\d)/.test(newPassInput)) {
                        setError("Password must contain at least one digit");
                        setLoading(false);
                        return;
                    } else if (
                        !/(?=.*[!@#$%^&*()_\-+={}[\]\\|:;"'<>,.?/~])/.test(
                            newPassInput
                        )
                    ) {
                        setError(
                            "Password must contain at least one special character"
                        );
                        setLoading(false);
                        return;
                    }
                } else {
                    setError("Passwords do not match");
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
                    setError("Current password is incorrect");
                    setLoading(false);
                    return;
                } else if (error.code === "auth/too-many-requests") {
                    setError(
                        "Too many unsuccessful attempts! Try again later."
                    );
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
