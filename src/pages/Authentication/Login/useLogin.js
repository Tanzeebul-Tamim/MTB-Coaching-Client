import { useEffect, useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import { Bounce, Flip, toast, Zoom } from "react-toastify";
import { loadCaptchaEngine, validateCaptcha } from "./captcha";
import { getUserData, saveUserViaSocial } from "../../../api/authApi";
import { light, dark } from "../../../styles/colors.json";
import useDarkTheme from "../../../hooks/useDarkTheme";

const useLogin = () => {
    const captchaLength = 6;
    const { signIn, setLoading, loading, googleSignIn, logOut, passwordReset } =
        useAuth();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [captchaChars, setCaptchaChars] = useState(
        Array(captchaLength).fill("")
    );
    const [captchaValue, setCaptchaValue] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const getPrevLocation = localStorage.getItem("location");
    const from = location.state?.from?.pathname || getPrevLocation;
    const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const emailRef = useRef();
    const passRef = useRef();
    const customId = "unauthorized";
    useTitle("| Login");

    const isDarkTheme = useDarkTheme();
    const [fontColor, setFontColor] = useState("");
    const [bgColor, setBgColor] = useState("");
    const [reload, setReload] = useState(true);

    const config = {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
    };

    useEffect(() => {
        setFontColor(isDarkTheme ? dark.baseContent : light.baseContent);
        setBgColor(isDarkTheme ? dark.base300 : light.base300);
    }, [isDarkTheme]);

    useEffect(() => {
        loadCaptchaEngine(captchaLength, bgColor, fontColor);
    }, [bgColor, fontColor, reload]);

    useEffect(() => {
        if (location.state && location.state.showToast) {
            toast.warning(
                "To view detailed information, you have to login first",
                {
                    ...config,
                    transition: Bounce,
                    toastId: customId,
                }
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state]);

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => saveUserViaSocial(result.user))
            .catch((error) => {
                console.error(error);
                if (error.code === "auth/user-disabled")
                    setError("Your account has been suspended!");
            })
            .finally(() => {
                setLoading(false);
                navigate(from, { replace: true });
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

                const demoStudent = "demo.student@example.com";
                const demoInstructor = "demo.instructor@example.com";
                const emailMatched =
                    createdUser.email === demoStudent ||
                    createdUser.email === demoInstructor;

                if (!emailMatched && !createdUser.emailVerified) {
                    logOut();
                    setError(
                        `Please verify your email from the verification email sent to ${createdUser.email}`
                    );
                    return;
                }

                getUserData(result.user?.email).then((userDetails) => {
                    let { name } = userDetails;
                    name = name?.split(" ")[0];
                    const message = `Welcome ${name}! You're logged-in as ${
                        userDetails?.role === "Instructor"
                            ? "an instructor"
                            : "a student"
                    }`;
                    toast.success(message, config);
                });

                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.error(error);
                if (error.code === "auth/wrong-password") {
                    setError("Incorrect password!");
                    form.password.value = "";
                } else if (error.code === "auth/user-not-found") {
                    setError("User not found! Enter a verified email.");
                    form.email.value = "";
                    form.password.value = "";
                } else if (error.code === "auth/too-many-requests") {
                    setError(
                        "Too many unsuccessful attempts! Try again later."
                    );
                    form.reset();
                }
                setDisabled(true);
            })
            .finally(() => setLoading(false));
    };

    const handleFieldChange = (captcha_value) => {
        captcha_value =
            typeof captcha_value == "string" ? captcha_value : captchaValue;
        const emailValue = emailRef.current.value.trim();
        const passValue = passRef.current.value;

        if (!validateCaptcha(captcha_value, setSuccess, setError)) {
            setDisabled(true);
            return;
        }

        if (!emailValue || !passValue || !captcha_value) {
            setDisabled(true);
            return;
        }

        if (captcha_value.length !== captchaLength) {
            setDisabled(true);
            return;
        }

        setDisabled(false);
        setError("");
    };

    const handleCaptchaChange = (idx, value) => {
        const updated = [...captchaChars];
        updated[idx] = value;
        setCaptchaChars(updated);
        const joined = updated.join("");
        handleFieldChange(joined);
        setCaptchaValue(joined);
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
                    `A password reset link has been sent to ${email}`,
                    {
                        ...config,
                        position: "top-left",
                        autoClose: 1500,
                        transition: Zoom,
                    }
                );
                event.target.newPassword.value = "";
            })
            .catch((error) => {
                console.error(error);
                if (error.code === "auth/missing-email")
                    setError("Please enter your verified email first");
                else if (error.code === "auth/user-not-found")
                    setError("User not found! Enter a verified email.");
                else if (error.code === "auth/too-many-requests")
                    setError(
                        "Too many unsuccessful attempts! Try again later."
                    );
            })
            .finally(() => setLoading(false));
    };

    const onChange = (e, idx) => {
        handleCaptchaChange(idx, e.target.value);
        if (e.target.value && idx < captchaLength - 1) {
            const next = document.getElementById(`captcha-char-${idx + 1}`);
            if (next) next.focus();
        }
    };

    const onKeyDown = (e, idx, captchaChars) => {
        // Backspace/delete: move to previous field if empty
        if (e.key === "Backspace" && !e.target.value) {
            captchaChars[idx] = "";
            const prev = document.getElementById(`captcha-char-${idx - 1}`);
            if (prev) prev.focus();
        } else if (e.key === "Delete") {
            e.target.value = "";
            captchaChars[idx] = "";
            const prev = document.getElementById(`captcha-char-${idx - 1}`);
            if (prev) prev.focus();
        }

        // ArrowRight: move to next field
        if (
            (e.key === "ArrowRight" || e.key === "Right") &&
            idx < captchaLength - 1
        ) {
            const next = document.getElementById(`captcha-char-${idx + 1}`);
            if (next) next.focus();
        }

        // ArrowLeft: move to previous field
        if ((e.key === "ArrowLeft" || e.key === "Left") && idx > 0) {
            const prev = document.getElementById(`captcha-char-${idx - 1}`);
            if (prev) prev.focus();
        }

        if (e.key === "Home" && idx > 0) {
            const prev = document.getElementById(`captcha-char-${0}`);
            if (prev) prev.focus();
        }

        if (e.key === "End" && idx < captchaLength - 1) {
            const prev = document.getElementById(
                `captcha-char-${captchaLength - 1}`
            );
            if (prev) prev.focus();
        }
    };

    const reloadCaptcha = () => {
        setReload((reload) => !reload);
        setCaptchaChars(Array(captchaLength).fill(""));
        // ! Password change triggers captcha error

        if (error && error.split(" ").includes("Captcha")) {
            setError("");
        }

        if (success && success.split(" ").includes("Captcha")) {
            setSuccess("");
        }
    };

    return {
        loading,
        error,
        setError,
        success,
        setSuccess,
        disabled,
        handleGoogleSignIn,
        handleLogin,
        togglePasswordVisibility,
        handleFieldChange,
        handlePasswordReset,
        emailRef,
        showPassword,
        captchaRef,
        passRef,
        captchaLength,
        captchaChars,
        setCaptchaChars,
        onChange,
        onKeyDown,
        reloadCaptcha,
    };
};

export default useLogin;
