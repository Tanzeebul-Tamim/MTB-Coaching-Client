import { useState, useEffect } from "react";
import { FaEyeSlash, FaEye, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import useTitle from "../../../hooks/useTitle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    loadCaptchaEnginge,
    LoadCanvasTemplateNoReload,
    validateCaptcha,
} from "react-simple-captcha";
import "./Login.css";
import { useRef } from "react";
import { toast, Zoom } from "react-toastify";
import { TbFidgetSpinner } from "react-icons/tb";
import { saveUserViaSocial } from "../../../api/authApi";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
    const {
        signIn,
        setLoading,
        loading,
        googleSignIn,
        facebookSignIn,
        logOut,
        passwordReset,
    } = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const getPrevLocation = localStorage.getItem("location");
    const from = location.state?.from?.pathname || getPrevLocation;
    const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const emailRef = useRef();
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
                    progress: undefined,
                    theme: "dark",
                }
            );
        }
    }, [location.state]);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleFacebookSignIn = () => {
        facebookSignIn()
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
                        theme: "dark",
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

    return (
        <div
            className="min-h-screen lg:pt-24 pt-16 lg:pb-16 pb-20 px-3 sm:px-6 md:px-10 lg:px-10 relative flex flex-col justify-center"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.600), rgba(0, 0, 0, 0.450)), url('/login_banner.avif')",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            <form
                onSubmit={handleLogin}
                className="flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-20 w-full"
            >
                <div className="block lg:hidden w-full">
                    <h1 className="text-3xl md:text-4xl font-bold title tracking-widest uppercase text-yellow-500 text-center">
                        Login now!
                    </h1>
                </div>

                <div className="hidden lg:block z-10 text-left w-full lg:w-1/2">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold title uppercase text-yellow-500">
                        Login now!
                    </h1>
                    <p className="py-4 md:py-6 description text-base md:text-lg lg:text-xl text-white">
                        Gear up and get ready to embark on an exciting journey
                        into the world of mountain biking. Join our vibrant
                        community of riders, where you can connect, learn, and
                        share your passion for this thrilling sport. Sign in to
                        access exclusive features, personalized content, and
                        connect with fellow riders from around the globe.
                        Let&apos;s ride together and experience the thrill of
                        conquering new trails, pushing your limits, and creating
                        unforgettable memories. Log in now and let the adventure
                        begin!
                    </p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body p-4 md:p-6 lg:p-8">
                        <div className="form-control">
                            <label className="label">
                                <span className="uppercase label-text font-bold tracking-widest text-white">
                                    Email
                                </span>
                            </label>
                            <input
                                ref={emailRef}
                                type="email"
                                name="email"
                                required
                                placeholder="Enter your email"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="z-[10] relative form-control">
                            <label className="label">
                                <span className="uppercase label-text font-bold tracking-widest text-white">
                                    Password
                                </span>
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                autoComplete="off"
                                name="password"
                                required
                                placeholder="Enter your password"
                                className="input input-bordered"
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    top: "43%",
                                    right: "10px",
                                    cursor: "pointer",
                                    fontSize: "20px",
                                }}
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                            <label className="label">
                                <button
                                    onClick={handlePasswordReset}
                                    className="label-text-alt link link-hover"
                                >
                                    Forgot password? Please enter your email and{" "}
                                    <span className="text-yellow-500">
                                        Click here
                                    </span>
                                </button>
                            </label>
                        </div>
                        <div className="z-[10] form-control">
                            <label className="label">
                                <span className="uppercase label-text font-bold tracking-widest text-white">
                                    <p className="mb-1">Enter captcha code</p>
                                    <p className="font-light">
                                        <LoadCanvasTemplateNoReload />
                                    </p>
                                </span>
                            </label>
                            <input
                                onBlur={handleValidateCaptcha}
                                type="text"
                                required
                                ref={captchaRef}
                                name="captcha"
                                placeholder="Enter the above text"
                                className="input input-bordered"
                            />
                            <label className="label">
                                <Link
                                    to="/register"
                                    className="label-text-alt link link-hover"
                                >
                                    Don&apos; have an account? Please{" "}
                                    <span className="text-yellow-500">
                                        Register
                                    </span>
                                </Link>
                            </label>
                            <p
                                className={`text-red-600 ${
                                    error ? "visible" : "invisible"
                                }`}
                            >
                                {error ? error : "a"}
                            </p>
                        </div>
                        <div className="divider text-white">
                            Or continue with
                        </div>
                        <div className="z-[10] justify-center gap-10 flex">
                            <button
                                formNoValidate
                                onClick={handleGoogleSignIn}
                                className="hover:scale-110 btn hover:bg-stone-700 bg-stone-800 btn-circle"
                            >
                                <FcGoogle className="text-2xl" />
                            </button>
                            <button
                                formNoValidate
                                onClick={handleFacebookSignIn}
                                className="hover:scale-110 btn hover:bg-stone-700 bg-stone-800 btn-circle"
                            >
                                <FaFacebookF className="text-2xl text-[#1877F2]" />
                            </button>
                        </div>
                        <div className="z-[10] form-control mt-6">
                            <button
                                disabled={disabled || (loading && true)}
                                type="submit"
                                className="btn bg-yellow-500 disabled:bg-yellow-900 disabled:text-stone-500 hover:bg-yellow-600 text-white text-lg md:text-xl"
                            >
                                {loading ? (
                                    <TbFidgetSpinner className="text-2xl text-stone-400 animate-spin" />
                                ) : (
                                    "Login"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <div className="absolute lg:hidden -bottom-1 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-base-300 pointer-events-none"></div>
            <div className="absolute hidden lg:block lg:bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-base-300 pointer-events-none"></div>
        </div>
    );
};

export default Login;
