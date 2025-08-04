import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TbFidgetSpinner } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import useRegister from "./useRegister";
import { useState } from "react";
import passwordStrengthChecker from "../utility/passwordStrengthChecker";
import { passStrength } from "../../../styles/colors.json";

const Register = () => {
    const {
        success,
        setSuccess,
        error,
        setError,
        loading,
        imageButtonText,
        isSmallDevice,
        handleSelectGender,
        isFormValid,
        formFields,
        handleRegister,
        togglePasswordVisibility,
        togglePasswordVisibility2,
        handleGoogleSignIn,
        handleFieldChange,
        selectedGender,
        showPassword,
        showPassword2,
        isValid,
        setIsValid,
    } = useRegister();

    const [status, setStatus] = useState("");
    const [colorCode, setColorCode] = useState("");

    return (
        <div
            className="min-h-screen lg:pt-32 pt-16 lg:pb-24 pb-20 px-3 sm:px-6 md:px-10 lg:px-10 relative flex flex-col justify-center"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.600), rgba(0, 0, 0, 0.450)), url('/assets/register_banner.avif')",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            <form
                onSubmit={handleRegister}
                className="flex flex-col lg:flex-row-reverse items-center justify-center gap-10 md:gap-16 lg:gap-20 w-full"
            >
                <div className="block lg:hidden w-full">
                    <h1 className="text-3xl md:text-4xl font-bold title tracking-widest uppercase text-primary text-center">
                        Register now!
                    </h1>
                    <div className="text-center">
                        <Link
                            to="/instructor-register"
                            className="description text-sm"
                        >
                            <span className="text-accent">Not a student? </span>
                            <span className="text-primary underline">
                                Register as an instructor
                            </span>
                        </Link>
                    </div>
                </div>

                <div className="hidden lg:block z-10 text-right w-full lg:w-1/2">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold title uppercase text-primary text-end">
                        Register now!
                    </h1>
                    <p className="py-4 md:py-6 text-end description text-base md:text-lg lg:text-xl text-accent">
                        Create your account and become part of our vibrant
                        mountain biking community. Whether you&apos;re a
                        seasoned rider or just getting started, our registration
                        page is your gateway to unlocking a world of exciting
                        opportunities. Get ready to explore new trails,
                        challenge yourself, and embrace the thrill of riding in
                        breathtaking landscapes. Register now and let your MTB
                        journey begin!
                    </p>
                    <div className="text-end">
                        <Link
                            to="/instructor-register"
                            className="description text-sm link link-hover"
                        >
                            Not a student?{" "}
                            <span className="text-primary">
                                Register as an instructor
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="card flex-shrink-0 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[500px] shadow-2xl bg-base-100">
                    <div className="card-body p-4 md:p-6 lg:p-8">
                        {/* Responsive input fields: stack vertically on mobile, horizontally on larger screens */}
                        <div className="flex flex-col md:flex-row justify-center gap-3 w-full">
                            <div className="form-control w-full md:w-1/2">
                                <label className="label custom-cursor-default">
                                    <span className="uppercase label-text font-bold tracking-widest text-base-content">
                                        Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    name="name"
                                    value={formFields.name}
                                    onChange={handleFieldChange}
                                    placeholder="Enter your full name"
                                    className="focus:outline-secondary placeholder:text-gray-600 placeholder:dark:text-gray-400 bg-stone-300 dark:bg-stone-800 border-0 input input-bordered text-sm"
                                />
                            </div>

                            <div className="form-control w-full md:w-1/2">
                                <label className="label custom-cursor-default">
                                    <span className="uppercase label-text font-bold tracking-widest text-base-content">
                                        Email
                                    </span>
                                </label>
                                <input
                                    type="email"
                                    required
                                    name="email"
                                    value={formFields.email}
                                    onChange={handleFieldChange}
                                    placeholder="Enter your email"
                                    className="focus:outline-secondary placeholder:text-gray-600 placeholder:dark:text-gray-400 bg-stone-300 dark:bg-stone-800 border-0 input input-bordered text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-center gap-3 w-full">
                            <div className="form-control w-full md:w-1/2">
                                <label className="label custom-cursor-default">
                                    <span className="uppercase label-text font-bold tracking-widest text-base-content">
                                        Contact No
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    required
                                    name="contact"
                                    value={formFields.contact}
                                    onChange={handleFieldChange}
                                    placeholder="Enter your contact no"
                                    className="focus:outline-secondary placeholder:text-gray-600 placeholder:dark:text-gray-400 bg-stone-300 dark:bg-stone-800 border-0 input input-bordered text-sm"
                                />
                            </div>

                            <div className="form-control w-full md:w-1/2">
                                <label className="label custom-cursor-default">
                                    <span className="uppercase label-text font-bold tracking-widest text-base-content">
                                        Address
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    name="address"
                                    value={formFields.address}
                                    onChange={handleFieldChange}
                                    placeholder="Enter your address"
                                    className="focus:outline-secondary placeholder:text-gray-600 placeholder:dark:text-gray-400 bg-stone-300 dark:bg-stone-800 border-0 input input-bordered text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between gap-3 w-full">
                            <div className="form-control w-full md:w-1/2">
                                <label className="label custom-cursor-default">
                                    <span className="uppercase label-text font-bold tracking-widest text-base-content">
                                        User image
                                    </span>
                                </label>
                                <label className="custom-cursor-default">
                                    <input
                                        onChange={handleFieldChange}
                                        type="file"
                                        name="image"
                                        className="input input-bordered hidden"
                                        hidden
                                        accept="image/*"
                                    />
                                    <div className="btn btn-sm bg-stone-400 dark:bg-stone-700 hover:bg-stone-500 dark:hover:bg-stone-600 border-0 w-full custom-cursor-pointer">
                                        {imageButtonText}
                                    </div>
                                </label>
                            </div>

                            <div className="form-control w-full md:w-1/2">
                                <label className="label custom-cursor-default">
                                    <span className="uppercase label-text font-bold tracking-widest text-base-content">
                                        Gender
                                    </span>
                                </label>
                                <label>
                                    <select
                                        onChange={handleSelectGender}
                                        name="gender"
                                        className={`select font-light w-full max-w-xs ${
                                            !selectedGender &&
                                            "text-gray-600 dark:text-gray-400 focus:outline-secondary"
                                        } bg-stone-300 dark:bg-stone-800 border-0 input input-bordered text-sm`}
                                        value={selectedGender}
                                    >
                                        <option hidden>
                                            Enter your gender
                                        </option>
                                        <option
                                            className="text-base-content"
                                            value="Male"
                                        >
                                            Male
                                        </option>
                                        <option
                                            className="text-base-content"
                                            value="Female"
                                        >
                                            Female
                                        </option>
                                    </select>
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row relative justify-center gap-3 w-full">
                            <div className="z-[10] form-control w-full md:w-1/2">
                                <label className="label custom-cursor-default">
                                    <span className="uppercase label-text font-bold tracking-widest text-base-content">
                                        Password
                                    </span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    autoComplete="off"
                                    name="password"
                                    value={formFields.password}
                                    onChange={(e) => {
                                        handleFieldChange(e);
                                        const { strength, valid } =
                                            passwordStrengthChecker(
                                                e,
                                                setSuccess,
                                                setError
                                            );
                                        setStatus(strength);
                                        setColorCode(passStrength[strength]);
                                        setIsValid(valid);
                                    }}
                                    placeholder="Enter your password"
                                    className="focus:outline-secondary placeholder:text-gray-600 placeholder:dark:text-gray-400 bg-stone-300 dark:bg-stone-800 border-0 input input-bordered text-sm"
                                />
                                <div
                                    className="custom-cursor-pointer"
                                    style={{
                                        position: "absolute",
                                        top: isSmallDevice ? "28%" : "60%",
                                        left: isSmallDevice ? "90%" : "175px",
                                        fontSize: "20px",
                                    }}
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>

                            <div className="z-[10] form-control w-full md:w-1/2">
                                <label className="label custom-cursor-default">
                                    <span className="uppercase label-text font-bold tracking-widest text-base-content">
                                        Confirm Password
                                    </span>
                                </label>
                                <input
                                    type={showPassword2 ? "text" : "password"}
                                    required
                                    disabled={!isValid}
                                    autoComplete="off"
                                    name="confirmPassword"
                                    value={formFields.confirmPassword}
                                    onChange={handleFieldChange}
                                    placeholder="Confirm your password"
                                    className="focus:outline-secondary placeholder:text-gray-600 placeholder:dark:text-gray-400 dark:disabled:placeholder:text-gray-500 disabled:placeholder:text-gray-500 bg-stone-300 disabled:bg-stone-400 dark:bg-stone-800 dark:disabled:bg-stone-700 border-0 input input-bordered text-sm"
                                />
                                <div
                                    className="custom-cursor-pointer"
                                    style={{
                                        position: "absolute",
                                        top: isSmallDevice ? "82%" : "60%",
                                        left: isSmallDevice ? "90%" : "395px",
                                        fontSize: "20px",
                                    }}
                                    onClick={togglePasswordVisibility2}
                                >
                                    {isValid ? (
                                        showPassword2 ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )
                                    ) : (
                                        <FaEye
                                            className={
                                                !isValid &&
                                                "text-gray-500 cursor-not-allowed"
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <label className="label custom-cursor-default z-[10]">
                            <Link
                                to="/login"
                                className="label-text-alt custom-cursor-default"
                            >
                                Already have an account?{" "}
                                <span className="text-primary hover:underline custom-cursor-pointer">
                                    Login now
                                </span>
                            </Link>
                        </label>
                        <p
                            className={`flex flex-col lg:flex-row justify-between z-10 ${
                                error
                                    ? "text-red-600"
                                    : success
                                    ? "text-green-500"
                                    : ""
                            } ${status ? "visible" : "invisible"}`}
                        >
                            <span className="text-base-content">
                                <strong>Strength:</strong>{" "}
                                <span style={{ color: colorCode }}>
                                    {status}
                                </span>
                            </span>
                            <span>
                                {error ? error : success ? success : ""}
                            </span>
                        </p>
                        <div className="divider text-base-content description">
                            Or
                        </div>
                        <div className="z-[10] justify-center gap-10 flex">
                            <button
                                type="button"
                                formNoValidate
                                onClick={handleGoogleSignIn}
                                className="lg:hover:scale-105 btn btn-circle hover:bg-base-300 bg-base-200 border-0 z-[10] flex justify-center items-center lg:w-2/3 w-4/5"
                            >
                                <FcGoogle className="text-2xl" />{" "}
                                <span className="font-bold font-sans description text-sm text-base-content">
                                    Continue With Google
                                </span>
                            </button>
                        </div>
                        <div className="z-[10] mt-6 form-control">
                            <button
                                disabled={loading || !isFormValid}
                                type="submit"
                                className="btn bg-amber-500 dark:bg-yellow-500 disabled:bg-amber-900 dark:disabled:bg-yellow-900 disabled:text-stone-500 dark:hover:bg-yellow-600 hover:bg-amber-600 text-accent border-0 text-xl"
                            >
                                {loading ? (
                                    <TbFidgetSpinner className="text-2xl text-stone-400 animate-spin" />
                                ) : (
                                    "Register"
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

export default Register;
