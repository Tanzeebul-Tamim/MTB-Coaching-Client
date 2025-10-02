import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TbFidgetSpinner } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import useInstructorRegister from "./useInstructorRegister";
import { useState } from "react";
import passwordStrengthChecker from "../utility/passwordStrengthChecker";
import { passStrength } from "../../../styles/colors.json";
import { VscClearAll } from "react-icons/vsc";
import PhoneInput from "react-phone-input-2";
import { isValidPhoneNumber } from "libphonenumber-js";
import "../../../styles/phoneNo.css"

const InstructorRegister = () => {
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
        handleRegister,
        togglePasswordVisibility,
        togglePasswordVisibility2,
        handleGoogleSignIn,
        handleFieldChange,
        formFields,
        selectedGender,
        showPassword,
        showPassword2,
        isValid,
        setIsValid,
        imageRef,
        clearForm,
        isIOS,
        contactError,
        setContactError,
        setIsContactValid,
    } = useInstructorRegister();

    const [status, setStatus] = useState("");
    const [colorCode, setColorCode] = useState("");

    const ClearFormBtn = () => (
        <button
            onClick={() => clearForm(setStatus)}
            type="reset"
            className="text-xs description font-bold text-accent bg-secondary dark:bg-yellow-600 rounded-md px-2 flex items-center gap-1 hover:scale-95 transition-transform ease-in-out"
        >
            <span>Clear Form</span>
            <VscClearAll />
        </button>
    );

    return (
        <div
            className="min-h-screen lg:pt-32 pt-16 lg:pb-24 pb-20 px-3 sm:px-6 md:px-10 lg:px-10 relative flex flex-col justify-center"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.600), rgba(0, 0, 0, 0.450)), url('/assets/images/instructor_register_banner.jpg')",
                backgroundPosition: isSmallDevice ? "40% 50%" : "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: !isIOS && "fixed",
            }}
        >
            <form
                onSubmit={handleRegister}
                className="flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-20 w-full"
            >
                <div className="block lg:hidden w-full">
                    <h1 className="text-3xl md:text-4xl font-bold title tracking-widest uppercase text-primary text-center">
                        Become an instructor!
                    </h1>
                    <div className="text-center">
                        <Link
                            to="/register"
                            className="description text-sm link link-hover"
                        >
                            <span className="text-accent">
                                Not an instructor?{" "}
                            </span>
                            <span className="text-primary underline">
                                Register as a student
                            </span>
                        </Link>
                    </div>
                </div>

                <div className="hidden lg:block z-10 text-left w-full lg:w-1/2">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold title uppercase text-primary">
                        Become an instructor!
                    </h1>
                    <p className="py-4 md:py-6 description text-base md:text-lg lg:text-xl text-accent">
                        Join our team of skilled instructors and share your
                        passion for mountain biking with others. Our instructor
                        registration page offers you the opportunity to inspire
                        and guide riders of all levels. Whether you&apos;re an
                        experienced professional or a talented rider looking to
                        take on a new role, this is your chance to make a
                        difference in the mountain biking community. Sign up now
                        and embark on a rewarding journey as a mountain biking
                        instructor!
                    </p>
                    <div>
                        <Link
                            to="/register"
                            className="description text-sm link link-hover text-white"
                        >
                            Not an instructor?{" "}
                            <strong className="text-primary">
                                Register as a student
                            </strong>
                        </Link>
                    </div>
                </div>
                <div className="card flex-shrink-0 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[500px] shadow-2xl bg-base-100 lg:bg-opacity-90 bg-opacity-70">
                    <div className="card-body p-4 md:p-6 lg:p-8">
                        {/* Responsive input fields */}
                        <div className="flex flex-col md:flex-row justify-center gap-3 w-full">
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="uppercase label-text font-bold tracking-widest text-base-content">
                                        Name
                                    </span>
                                    {isSmallDevice && <ClearFormBtn />}
                                </label>
                                <input
                                    type="text"
                                    required
                                    name="name"
                                    value={formFields.name}
                                    onChange={handleFieldChange}
                                    placeholder="Enter your full name"
                                    className="dark:focus:outline-yellow-200 focus:outline-orange-100 focus:shadow-[0_0_5px_2px_rgba(255,255,200,0.9),0_0_15px_8px_rgba(255,193,7,0.6)] dark:focus:shadow-[0_0_10px_5px_rgba(253,224,71,0.5)] placeholder:text-gray-600 placeholder:dark:text-gray-400 bg-stone-200 bg-opacity-70 dark:bg-opacity-70 dark:bg-stone-800 border-0 input input-bordered w-full text-sm"
                                />
                            </div>

                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="uppercase label-text font-bold tracking-widest text-base-content">
                                        Email
                                    </span>
                                    {!isSmallDevice && <ClearFormBtn />}
                                </label>
                                <input
                                    type="email"
                                    required
                                    name="email"
                                    value={formFields.email}
                                    onChange={handleFieldChange}
                                    placeholder="Enter your email"
                                    className="dark:focus:outline-yellow-200 focus:outline-orange-100 focus:shadow-[0_0_5px_2px_rgba(255,255,200,0.9),0_0_15px_8px_rgba(255,193,7,0.6)] dark:focus:shadow-[0_0_10px_5px_rgba(253,224,71,0.5)] placeholder:text-gray-600 placeholder:dark:text-gray-400 bg-stone-200 bg-opacity-70 dark:bg-opacity-70 dark:bg-stone-800 border-0 input input-bordered w-full text-sm custom-cursor-text"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-center gap-3 w-full">
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="uppercase label-text font-bold tracking-widest text-base-content">
                                        Contact No
                                    </span>
                                    <span
                                        className={`lg:hidden text-xs lg:text-sm description text-red-600 ${
                                            contactError && "visible"
                                        }`}
                                    >
                                        {contactError}
                                    </span>
                                </label>
                                <PhoneInput
                                    country={"auto"}
                                    value={formFields.contact}
                                    searchPlaceholder={`${
                                        isSmallDevice ? "" : "🔎 "
                                    }Search Country...`}
                                    onChange={(value, country) => {
                                        const phoneWithPlus = value.startsWith(
                                            "+"
                                        )
                                            ? value
                                            : "+" + value;

                                        setIsContactValid(
                                            isValidPhoneNumber(phoneWithPlus)
                                        );

                                        handleFieldChange({
                                            target: {
                                                name: "contact",
                                                value: phoneWithPlus,
                                            },
                                        });

                                        if (value) {
                                            if (
                                                isValidPhoneNumber(
                                                    phoneWithPlus
                                                )
                                            ) {
                                                setContactError("");
                                            } else {
                                                if (country.name) {
                                                    setContactError(
                                                        `Invalid number for ${country.name}`
                                                    );
                                                } else {
                                                    setContactError(
                                                        "Invalid number"
                                                    );
                                                }
                                            }
                                        } else {
                                            setContactError("");
                                        }
                                    }}
                                    inputProps={{
                                        name: "contact",
                                        required: true,
                                        placeholder: "Enter your contact no",
                                        className:
                                            "w-full dark:focus:outline-yellow-200 focus:outline-orange-100 focus:shadow-[0_0_5px_2px_rgba(255,255,200,0.9),0_0_15px_8px_rgba(255,193,7,0.6)] dark:focus:shadow-[0_0_10px_5px_rgba(253,224,71,0.5)] placeholder:text-gray-600 placeholder:dark:text-gray-400 bg-stone-200 bg-opacity-70 dark:bg-opacity-70 dark:bg-stone-800 border-0 input input-bordered text-sm lg:pl-10 pl-12 placeholder:text-gray-600 placeholder:dark:text-gray-400 custom-phone-input custom-cursor-text phone-input",
                                        style: {
                                            minHeight: "40px",
                                            borderRadius: "0.5rem",
                                            width: "100%",
                                            zIndex: 1001,
                                        },
                                    }}
                                    containerClass="w-full"
                                    buttonStyle={{
                                        background: "transparent",
                                        border: "none",
                                        zIndex: 1002,
                                    }}
                                    dropdownStyle={{
                                        background: "#d1d5db",
                                        borderRadius: "0.5rem",
                                        zIndex: 2000,
                                    }} // gray-300
                                    searchStyle={{
                                        background: "#fff",
                                        borderRadius: "0.5rem",
                                        zIndex: 2001,
                                    }}
                                    enableAreaCodes={true}
                                    enableSearch={true}
                                    disableCountryCode={false}
                                    disableDropdown={false}
                                />
                            </div>

                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
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
                                    className="dark:focus:outline-yellow-200 focus:outline-orange-100 focus:shadow-[0_0_5px_2px_rgba(255,255,200,0.9),0_0_15px_8px_rgba(255,193,7,0.6)] dark:focus:shadow-[0_0_10px_5px_rgba(253,224,71,0.5)] placeholder:text-gray-600 placeholder:dark:text-gray-400 bg-stone-200 bg-opacity-70 dark:bg-opacity-70 dark:bg-stone-800 border-0 input input-bordered w-full text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between gap-3 w-full">
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="uppercase label-text font-bold tracking-widest text-base-content">
                                        User image
                                    </span>
                                </label>
                                <label>
                                    <input
                                        ref={imageRef}
                                        onChange={handleFieldChange}
                                        type="file"
                                        name="image"
                                        className="input input-bordered hidden"
                                        hidden
                                        accept="image/*"
                                    />
                                    <div className="btn btn-sm bg-stone-400 dark:bg-stone-700 hover:bg-stone-500 dark:hover:bg-stone-600 bg-opacity-70 dark:bg-opacity-70 border-0 w-full">
                                        {imageButtonText}
                                    </div>
                                </label>
                            </div>

                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="uppercase label-text font-bold tracking-widest text-base-content">
                                        Gender
                                    </span>
                                </label>
                                <label>
                                    <select
                                        onChange={handleSelectGender}
                                        name="gender"
                                        className={`input input-bordered select font-light ${
                                            !selectedGender &&
                                            "text-gray-600 dark:text-gray-400"
                                        } bg-stone-200 bg-opacity-70 dark:bg-opacity-70 dark:bg-stone-800 border-0  w-full max-w-xs text-sm dark:focus:outline-yellow-200 focus:outline-orange-100 focus:shadow-[0_0_5px_2px_rgba(255,255,200,0.9),0_0_15px_8px_rgba(255,193,7,0.6)] dark:focus:shadow-[0_0_10px_5px_rgba(253,224,71,0.5)]`}
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
                                <label className="label">
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
                                    className="dark:focus:outline-yellow-200 focus:outline-orange-100 focus:shadow-[0_0_5px_2px_rgba(255,255,200,0.9),0_0_15px_8px_rgba(255,193,7,0.6)] dark:focus:shadow-[0_0_10px_5px_rgba(253,224,71,0.5)] placeholder:text-gray-600 placeholder:dark:text-gray-400 bg-stone-200 bg-opacity-70 dark:bg-opacity-70 dark:bg-stone-800 border-0 input input-bordered w-full text-sm"
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
                                <label className="label">
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
                                    className="dark:focus:outline-yellow-200 focus:outline-orange-100 focus:shadow-[0_0_5px_2px_rgba(255,255,200,0.9),0_0_15px_8px_rgba(255,193,7,0.6)] dark:focus:shadow-[0_0_10px_5px_rgba(253,224,71,0.5)] placeholder:text-gray-600 placeholder:dark:text-gray-400 dark:disabled:placeholder:text-gray-500 disabled:placeholder:text-gray-500 bg-stone-200 bg-opacity-70 disabled:bg-opacity-70 dark:disabled:bg-opacity-70 dark:bg-opacity-70 disabled:bg-stone-400 dark:bg-stone-800 dark:disabled:bg-stone-700 border-0 input input-bordered text-sm"
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
                            <div className="label-text-alt custom-cursor-default">
                                <span className="text-primary">NB:</span> All
                                fields are required
                            </div>
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
                            <span className="text-xs lg:text-sm description">
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
                                className="lg:hover:scale-105 btn btn-circle dark:hover:bg-base-300 hover:bg-[#b8aa8a] bg-base-200 border-0 z-[10] flex justify-center items-center lg:w-2/3 w-4/5"
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

export default InstructorRegister;
