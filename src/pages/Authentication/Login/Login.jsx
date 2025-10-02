import { useState } from "react";
import { Link } from "react-router-dom";
import { LoadCanvasTemplateNoReload } from "./captcha";
import "../../../styles/captcha.css";
import useLogin from "./useLogin";

import { FaEyeSlash, FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { VscClearAll } from "react-icons/vsc";
import { IoReload } from "react-icons/io5";

const Login = () => {
    const {
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
    } = useLogin();

    const [clicked, setClicked] = useState(false);

    return (
        <div
            className="min-h-screen lg:pt-24 pt-16 lg:pb-16 pb-20 px-3 sm:px-6 md:px-10 lg:px-10 relative flex flex-col justify-center "
            style={{
                backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.600), rgba(0, 0, 0, 0.450)), url('/assets/images/login_banner.avif')",
                backgroundPosition: isSmallDevice
                    ? isIOS
                        ? "35.5% 50%"
                        : "32.5% 50%"
                    : "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: !isIOS && "fixed",
            }}
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!disabled) {
                        handleLogin(e);
                    }
                }}
                className="flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-20 w-full"
            >
                <div className="block lg:hidden w-full">
                    <h1 className="text-3xl md:text-4xl font-bold title tracking-widest uppercase text-primary text-center">
                        Login now!
                    </h1>
                </div>

                <div className="hidden lg:block z-10 text-left w-full lg:w-1/2">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold title uppercase text-primary">
                        Login now!
                    </h1>
                    <p className="py-4 md:py-6 description text-base md:text-lg lg:text-xl text-accent">
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
                <div className="card flex-shrink-0 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm shadow-2xl bg-base-100 lg:bg-opacity-90 bg-opacity-80">
                    <div className="card-body p-4 md:p-6 lg:p-8">
                        <div className="form-control">
                            <label className="label custom-cursor-default">
                                <span className="uppercase label-text font-bold tracking-widest text-base-content">
                                    Email
                                </span>
                                <button
                                    onClick={() => {
                                        setDisabled(true);
                                        setCaptchaChars(
                                            Array(captchaLength).fill("")
                                        );
                                        setCaptchaInput("");
                                        setError("");
                                        setSuccess("");
                                    }}
                                    type="reset"
                                    className="text-xs font-bold text-accent bg-secondary dark:bg-yellow-600 rounded-md px-2 flex items-center gap-1 hover:scale-95 transition-transform ease-in-out description"
                                >
                                    <span>Clear Form</span>
                                    <VscClearAll />
                                </button>
                            </label>
                            <input
                                onChange={handleFieldChange}
                                ref={emailRef}
                                type="email"
                                name="email"
                                required
                                placeholder="Enter your email"
                                className="dark:focus:outline-yellow-200 focus:outline-orange-100 focus:shadow-[0_0_5px_2px_rgba(255,255,200,0.9),0_0_15px_8px_rgba(255,193,7,0.6)] dark:focus:shadow-[0_0_10px_5px_rgba(253,224,71,0.5)] placeholder:text-gray-600 placeholder:dark:text-gray-400 bg-stone-200 bg-opacity-70 dark:bg-opacity-70 dark:bg-stone-800 border-0 input input-bordered text-sm"
                            />
                        </div>
                        <div className="z-[10] relative form-control">
                            <label className="label custom-cursor-default">
                                <span className="uppercase label-text font-bold tracking-widest text-base-content">
                                    Password
                                </span>
                            </label>
                            <input
                                onChange={handleFieldChange}
                                ref={passRef}
                                type={showPassword ? "text" : "password"}
                                autoComplete="off"
                                name="password"
                                required
                                placeholder="Enter your password"
                                className="dark:focus:outline-yellow-200 focus:outline-orange-100 focus:shadow-[0_0_5px_2px_rgba(255,255,200,0.9),0_0_15px_8px_rgba(255,193,7,0.6)] dark:focus:shadow-[0_0_10px_5px_rgba(253,224,71,0.5)] placeholder:text-gray-600 placeholder:dark:text-gray-400 bg-stone-200 bg-opacity-70 dark:bg-opacity-70 dark:bg-stone-800 border-0 input input-bordered text-sm"
                            />
                            <div
                                className="custom-cursor-pointer"
                                style={{
                                    position: "absolute",
                                    top: "43%",
                                    right: "10px",
                                    fontSize: "20px",
                                }}
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                            <label className="label custom-cursor-default z-[10]">
                                <div className="label-text-alt custom-cursor-default">
                                    <span
                                        className={
                                            clicked && "text-transparent"
                                        }
                                    >
                                        Forgot password? Please enter your email
                                        and
                                    </span>{" "}
                                    <span
                                        onClick={(e) => {
                                            handlePasswordReset(e);

                                            if (emailRef.current.value)
                                                setClicked(true);
                                        }}
                                        className={`text-primary hover:underline custom-cursor-pointer ${
                                            clicked && "text-transparent"
                                        }`}
                                    >
                                        Click here
                                    </span>
                                </div>
                            </label>
                        </div>
                        <div className="z-[10] form-control">
                            <div className="label custom-cursor-default mb-1">
                                <span className="uppercase label-text font-bold tracking-widest text-base-content flex flex-col gap-1">
                                    <span>Enter captcha code</span>
                                    <LoadCanvasTemplateNoReload />
                                </span>
                                <button
                                    onClick={reloadCaptcha}
                                    type="button"
                                    className="text-xs text-accent font-bold bg-secondary dark:bg-yellow-600 lg:rounded-xl rounded-md lg:px-3 px-2 lg:py-1 flex items-center gap-1 hover:scale-95 transition-transform ease-in-out description"
                                >
                                    <span>Refresh Code</span>
                                    <IoReload />
                                </button>
                            </div>
                            <div className="flex justify-between mt-2">
                                {Array.from({ length: captchaLength }).map(
                                    (_, idx) => (
                                        <input
                                            key={idx}
                                            type="text"
                                            inputMode="text"
                                            maxLength={1}
                                            required
                                            placeholder="_"
                                            value={captchaChars[idx]}
                                            className="lg:w-12 w-11 h-10 text-center input input-bordered bg-stone-200 bg-opacity-70 dark:bg-opacity-70 dark:bg-stone-800 border-0 dark:focus:outline-yellow-200 focus:outline-orange-100 focus:shadow-[0_0_5px_2px_rgba(255,255,200,0.9),0_0_15px_8px_rgba(255,193,7,0.6)] dark:focus:shadow-[0_0_10px_5px_rgba(253,224,71,0.5)]"
                                            onChange={(e) =>
                                                onCaptchaChange(e, idx)
                                            }
                                            onKeyDown={(e) =>
                                                onCaptchaKeyDown(
                                                    e,
                                                    idx,
                                                    captchaChars
                                                )
                                            }
                                            id={`captcha-char-${idx}`}
                                            ref={
                                                idx === 0
                                                    ? captchaRef
                                                    : undefined
                                            }
                                            name={`captcha-${idx}`}
                                            autoComplete="off"
                                        />
                                    )
                                )}
                            </div>
                            <label className="label custom-cursor-default z-[10]">
                                <Link
                                    to="/register"
                                    className="label-text-alt custom-cursor-default"
                                >
                                    Don&apos; have an account?{" "}
                                    <span className="text-primary hover:underline custom-cursor-pointer">
                                        Register now
                                    </span>
                                </Link>
                            </label>
                            <p
                                className={`z-10 text-xs lg:text-sm description ${
                                    error || success ? "visible" : "invisible"
                                } ${
                                    error
                                        ? "text-red-600"
                                        : success
                                        ? "text-green-500"
                                        : ""
                                }`}
                            >
                                {error ? error : success ? success : "a"}
                            </p>
                        </div>
                        <div className="divider text-base-content description">
                            Or
                        </div>
                        <div className="z-[10] justify-center gap-10 flex">
                            <button
                                formNoValidate
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="lg:hover:scale-105 btn btn-circle dark:hover:bg-base-300 hover:bg-[#b8aa8a] bg-base-200 border-0 z-[10] flex justify-center items-center lg:w-3/4 w-4/5"
                            >
                                <FcGoogle className="text-2xl" />{" "}
                                <span className="font-bold font-sans description text-sm text-base-content">
                                    Continue With Google
                                </span>
                            </button>
                        </div>
                        <div className="z-[10] form-control mt-6">
                            <button
                                disabled={disabled || (loading && true)}
                                type="submit"
                                className="btn bg-amber-500 dark:bg-yellow-500 disabled:bg-amber-900 dark:disabled:bg-yellow-900 disabled:text-stone-500 dark:hover:bg-yellow-600 hover:bg-amber-600 text-accent border-0 text-lg md:text-xl"
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
            <div className="absolute lg:hidden -bottom-1 left-0 w-full dark:h-1/2 h-1/3 bg-gradient-to-b from-transparent to-base-100 pointer-events-none"></div>
            <div className="absolute hidden lg:block lg:bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-base-100 pointer-events-none"></div>
        </div>
    );
};

export default Login;
