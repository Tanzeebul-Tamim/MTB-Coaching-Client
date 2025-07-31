import {
    EmailAuthProvider,
    getAuth,
    reauthenticateWithCredential,
    updatePassword,
} from "firebase/auth";
import app from "../../../firebase/firebase.config";
import { useEffect, useRef, useState } from "react";
import useScreenSize from "../../../hooks/useScreenSize";
import { Flip, Zoom, Slide, Bounce, toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const fireToast = (message, type = "error") => {
    const time = 2100;
    const transitions = [Flip, Zoom, Slide, Bounce];
    const randomTransition =
        transitions[Math.floor(Math.random() * transitions.length)];

    const config = {
        position: "top-right",
        autoClose: time,
        hideProgressBar: false,
        limit: 3,
        transition: randomTransition,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    toast[type](message, config);
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
        passwordReset(email)
            .then(() => {
                fireToast(
                    `A password creation link has been sent to ${email}`,
                    "success"
                );
            })
            .catch((error) => {
                console.error(error);
                if (error.code === "auth/too-many-requests")
                    fireToast(
                        "Too many unsuccessful attempts! Try again later."
                    );
            })
            .finally(() => authLoading(false));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (currentPass === newPass) {
            setError("Choose a different password.");
            fireToast(
                "New password must be different from current password.",
                "warning"
            );
            setFormFields((prev) => ({
                ...prev,
                newPass: "",
                confirmPass: "",
            }));
            return;
        } else if (newPass !== confirmPass) {
            setError("Passwords do not match!");
            fireToast(
                "New password and confirm password must be the same.",
                "warning"
            );
            setFormFields((prev) => ({
                ...prev,
                confirmPass: "",
            }));
            return;
        }

        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            currentPassInput
        );
        setLoading(true);
        reauthenticateWithCredential(auth.currentUser, credential)
            .then(() => {
                return updatePassword(auth.currentUser, newPassInput).then(
                    () => {
                        fireToast("Password has been updated!", "success");
                        setError("");
                        setFormFields(fields);
                        setLoading(false);
                        modalRef.current.close();
                    }
                );
            })
            .catch((error) => {
                console.error(error);
                if (error.code === "auth/wrong-password") {
                    setError("Current password is incorrect");
                    fireToast("The current password you entered is incorrect. Please try again.");
                    setFormFields((prev) => ({
                        ...prev,
                        currentPass: "",
                    }));
                    setLoading(false);
                    return;
                } else if (error.code === "auth/too-many-requests") {
                    setError("Try again later");
                    fireToast("Too many unsuccessful attempts! Try again later");
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
        createPass,
    };
};

export default useChangePassword;
