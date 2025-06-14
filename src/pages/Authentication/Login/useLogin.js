import { useEffect, useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import { toast, Zoom } from "react-toastify";
import { loadCaptchaEnginge, validateCaptcha } from "react-simple-captcha";
import { saveUserViaSocial } from "../../../api/authApi";

const useLogin = () => {
    const { signIn, setLoading, loading, googleSignIn, logOut, passwordReset } =
        useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const getPrevLocation = localStorage.getItem("location");
    const from = location.state?.from?.pathname || getPrevLocation;
    const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const emailRef = useRef();
    const customId = "unauthorized";
    useTitle("| Login");

    useEffect(() => {
        if (location.state && location.state.showToast) {
            toast.warning(
                "To view detailed information, you have to login first",
                {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    toastId: customId,
                    progress: undefined,
                }
            );
        }
    }, [location.state]);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                saveUserViaSocial(result.user);
            })
            .then(() => {
                navigate(from, { replace: true });
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then((result) => {
                const createdUser = result.user;
                if (!createdUser.emailVerified) {
                    logOut();
                    setError(
                        `Please verify your email from the verification email sent to ${createdUser.email}`
                    );
                    return;
                }
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.error(error);
                if (error.code === "auth/wrong-password") {
                    setError("Incorrect password!");
                    setLoading(false);
                } else if (error.code === "auth/user-not-found") {
                    setError("User not found! Enter a verified email.");
                    setLoading(false);
                } else if (error.code === "auth/too-many-requests") {
                    setError(
                        "Too many unsuccessful attempts! Try again later."
                    );
                    setLoading(false);
                }
            });
    };

    const handleValidateCaptcha = () => {
        const captchaValue = captchaRef.current.value;
        if (validateCaptcha(captchaValue)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordReset = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;

        passwordReset(email)
            .then(() => {
                toast.success(
                    `A password reset email has been sent to ${email}`,
                    {
                        position: "top-left",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        transition: Zoom,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                );
                event.target.newPassword.value = "";
            })
            .catch((error) => {
                console.error(error);
                if (error.code === "auth/missing-email") {
                    setError("Please enter your verified email first");
                    setLoading(false);
                } else if (error.code === "auth/user-not-found") {
                    setError("User not found! Enter a verified email.");
                    setLoading(false);
                } else if (error.code === "auth/too-many-requests") {
                    setError(
                        "Too many unsuccessful attempts! Try again later."
                    );
                    setLoading(false);
                }
            });
    };

    return {
        loading,
        error,
        disabled,
        handleGoogleSignIn,
        handleLogin,
        togglePasswordVisibility,
        handleValidateCaptcha,
        handlePasswordReset,
        emailRef,
        showPassword,
        captchaRef,
    };
};

export default useLogin;
