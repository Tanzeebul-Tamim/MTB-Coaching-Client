import { useEffect, useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import { Bounce, Flip, toast, Zoom } from "react-toastify";
import {
    drawCaptchaWithData,
    generateCaptchaDrawingData,
    generateCaptchaText,
    validateCaptcha,
} from "./captcha";
import { getUserData, saveUserViaSocial } from "../../../api/authApi";
import { light, dark } from "../../../styles/colors.json";
import useDarkTheme from "../../../hooks/useDarkTheme";
import useSoundEffects from "../../../hooks/useSoundEffects";
import useScreen from "../../../hooks/useScreen";
import termsConditionToast from "../utility/termsConditionToast";

const useLogin = () => {
    // Auth
    const {
        signIn,
        setLoading,
        loading,
        googleSignIn,
        logOut,
        passwordReset,
        isIOS,
    } = useAuth();

    // Navigation
    const navigate = useNavigate();
    const location = useLocation();
    const getPrevLocation = localStorage.getItem("location");
    const from = location.state?.from?.pathname || getPrevLocation;

    // Refs
    const emailRef = useRef();
    const passRef = useRef();
    const captchaRef = useRef(null);

    // UI State
    const [showPassword, setShowPassword] = useState(false);
    const [disabled, setDisabled] = useState(true);

    // Captcha
    const captchaLength = 6;
    const [captchaChars, setCaptchaChars] = useState(
        Array(captchaLength).fill("")
    );
    const [captchaInput, setCaptchaInput] = useState("");
    const [captchaData, setCaptchaData] = useState(null);
    const [reload, setReload] = useState(true);

    // Theme
    const isDarkTheme = useDarkTheme();
    const themes = {
        lightTheme: {
            background: light.base300,
            font: light.baseContent,
        },
        darkTheme: {
            background: dark.base300,
            font: dark.baseContent,
        },
    };

    // Feedback messages
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Terms & Condition
    const [agreed, setAgreed] = useState(false);
    const [highlightText, setHighlightText] = useState(false);

    // Toast Config
    const customId = "unauthorized";
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

    // Sound effects
    const { play } = useSoundEffects();

    // Screen Size
    const { isSmallDevice } = useScreen();

    // Page title
    useTitle("| Login");

    // Generate captcha and drawing data on page mount/captcha reload
    useEffect(() => {
        const text = generateCaptchaText(captchaLength);
        const data = generateCaptchaDrawingData(text);
        setCaptchaData(data);
    }, [reload]);

    // Update canvas colors when theme changes
    useEffect(() => {
        const canvas = document.getElementById("canv");

        if (canvas && captchaData) {
            const { background, font } = isDarkTheme
                ? themes.darkTheme
                : themes.lightTheme;

            drawCaptchaWithData(canvas, captchaData, background, font);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDarkTheme, captchaData]);

    // Show toast message to unauthorized users
    useEffect(() => {
        if (location.state && location.state.showToast) {
            toast.info(
                <div className="text-center">
                    To view detailed information, you have to{" "}
                    <strong>login</strong> first
                </div>,
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
        const welcomeToast = (userDetails, name) => {
            const Message = () => (
                <div className="text-center">
                    <span className="font-bold text-green-500 text-[18px]">
                        Welcome {name}
                    </span>{" "}
                    <br />
                    <span className={!isSmallDevice && " text-justify"}>
                        You have logged-in as{" "}
                        {userDetails?.role === "Instructor" ? (
                            <span>
                                an <strong>Instructor</strong>
                            </span>
                        ) : (
                            <span>
                                a <strong>Student</strong>
                            </span>
                        )}
                    </span>
                </div>
            );

            toast.success(<Message />, config);
        };

        if (
            !termsConditionToast(
                isSmallDevice,
                agreed,
                config,
                setHighlightText
            )
        )
            return;

        googleSignIn()
            .then((result) => saveUserViaSocial(result.user, welcomeToast))
            .then(() => play("alert"))
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
                    const { name } = userDetails;
                    const firstName = name?.split(" ")[0];
                    const properCasedName =
                        firstName.charAt(0).toUpperCase() +
                        firstName.slice(1).toLowerCase();

                    const Message = () => (
                        <div className="text-center">
                            <span className="font-bold text-green-500 text-[18px]">
                                Welcome {properCasedName}
                            </span>{" "}
                            <br />
                            <span
                                className={`text-sm ${
                                    !isSmallDevice && "text-justify"
                                }`}
                            >
                                You have logged-in as{" "}
                                {userDetails?.role === "Instructor" ? (
                                    <span>
                                        an <strong>Instructor</strong>
                                    </span>
                                ) : (
                                    <span>
                                        a <strong>Student</strong>
                                    </span>
                                )}
                            </span>
                        </div>
                    );

                    play("alert");
                    toast.success(<Message />, config);
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
            typeof captcha_value == "string" ? captcha_value : captchaInput;
        const emailValue = emailRef.current.value.trim();
        const passValue = passRef.current.value;

        if (!validateCaptcha(captcha_value, setSuccess, setError, play)) {
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
        setCaptchaInput(joined);
        handleFieldChange(joined);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordReset = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;

        passwordReset(email)
            .then(() => {
                toast.success(
                    <div className="text-center">
                        A password reset link has been sent to
                        <br />
                        <span className="font-bold text-green-500 text-[17px]">
                            {email}
                        </span>
                    </div>,
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

    const onCaptchaChange = (e, idx) => {
        handleCaptchaChange(idx, e.target.value);
        if (e.target.value && idx < captchaLength - 1) {
            const next = document.getElementById(`captcha-char-${idx + 1}`);
            if (next) next.focus();
        }
    };

    const onCaptchaKeyDown = (e, idx, captchaChars) => {
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
        setDisabled(true);
        setReload((reload) => !reload);
        setCaptchaChars(Array(captchaLength).fill(""));
        setCaptchaInput("");
        document.getElementById("captcha-char-0").focus();

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
        setCaptchaInput,
        onCaptchaChange,
        onCaptchaKeyDown,
        reloadCaptcha,
        setDisabled,
        isIOS,
        isSmallDevice,
        agreed,
        setAgreed,
        highlightText,
        config,
        setHighlightText,
    };
};

export default useLogin;
