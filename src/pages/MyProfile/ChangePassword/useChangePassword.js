import {
    EmailAuthProvider,
    getAuth,
    reauthenticateWithCredential,
    updatePassword,
} from "firebase/auth";
import app from "../../../firebase/firebase.config";
import { useEffect, useRef, useState } from "react";
import useScreenSize from "../../../hooks/useScreenSize";
import { Flip, Slide, toast, Zoom } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

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

const useChangePassword = (email) => {
    const auth = getAuth(app);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const currentPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();
    const modalRef = useRef(null);
    const { isSmallDevice } = useScreenSize();
    const { passwordReset, setLoading: authLoading } = useAuth();

    const [currentPassInput, setCurrentPassInput] = useState(null);
    const [newPassInput, setNewPassInput] = useState(null);
    const [, setConfirmPassInput] = useState(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const [status, setStatus] = useState("");
    const [colorCode, setColorCode] = useState("");
    const [isValid, setIsValid] = useState(false);

    const fields = {
        currentPass: "",
        newPass: "",
        confirmPass: "",
    };

    const [formFields, setFormFields] = useState(fields);

    useEffect(() => {
        if (!isValid) {
            setFormFields((prev) => ({
                ...prev,
                confirmPassword: "",
            }));
        }
    }, [isValid]);

    // Update field values on change
    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormFields((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const { currentPass, newPass, confirmPass } = formFields;
    const isFormValid = currentPass && newPass && confirmPass;

    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };
    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };    

    const createPass = (event) => {
        event.preventDefault();

        const config = {
            position: "top-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            transition: Zoom,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        };

        passwordReset(email)
            .then(() => {
                toast.success(
                    `A password creation link has been sent to ${email}`,
                    config
                );
            })
            .catch((error) => {
                console.error(error);
                if (error.code === "auth/too-many-requests")
                    toast.error(
                        "Too many unsuccessful attempts! Try again later.",
                        config
                    );
            })
            .finally(() => authLoading(false));
    };

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
                return updatePassword(auth.currentUser, newPassInput).then(
                    () => {
                        toast.success("Password has been updated!", {
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
                    setFormFields((prev) => ({
                        ...prev,
                        currentPass: "",
                    }));
                    setLoading(false);
                    return;
                } else if (error.code === "auth/too-many-requests") {
                    message = "Too many unsuccessful attempts! Try again later";
                    setError(message);
                    fireToast(message);
                    setFormFields(fields);
                    setLoading(false);
                    return;
                }
            });
    };

    return {
        status,
        success,
        setSuccess,
        error,
        setError,
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
        showCurrentPassword,
        showNewPassword,
        showConfirmPassword,
        setStatus,
        setColorCode,
        isValid,
        setIsValid,
        isFormValid,
        colorCode,
        handleFieldChange,
        fields,
        formFields,
        setFormFields,
        createPass
    };
};

export default useChangePassword;
