import { FaEyeSlash, FaEye } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import useChangePassword from "./useChangePassword";
import passwordStrengthChecker from "../../Authentication/utility/passwordStrengthChecker";
import { passStrength } from "../../../styles/colors.json";

const ChangePassword = ({ email }) => {
    const {
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
    } = useChangePassword(email);

    return (
        <dialog
            ref={modalRef}
            id="my_modal_1"
            className="modal text-base-content description"
            onClick={(e) => {
                // Only close if clicking the backdrop (not the form)
                if (e.target === e.currentTarget) {
                    e.currentTarget.close();
                }
            }}
        >
            <form
                onSubmit={handleSubmit}
                method="dialog"
                className="modal-box bg-opacity-80 lg:border-0 border border-gray-500"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
            >
                <h1 className="z-[10] text-base-content lg:text-2xl text-lg lg:tracking-[9px] tracking-[5px] text-center uppercase font-extrabold">
                    Change Password
                </h1>
                <p className="z-[10] mt-1 text-base-content text-center">
                    {!isSmallDevice && "Press esc to cancel"}
                </p>

                <div className="lg:card-body">
                    <div className="relative">
                        <div className="form-control">
                            <label className="label">
                                <strong className="label-text">
                                    Current Password
                                </strong>
                            </label>
                            <input
                                autoComplete="off"
                                type={showCurrentPassword ? "text" : "password"}
                                ref={currentPasswordRef}
                                name="currentPass"
                                value={formFields.currentPass}
                                placeholder="Enter current password"
                                className="input placeholder:text-gray-500 border-gray-500 border-opacity-50 lg:border-0"
                                onChange={(e) => {
                                    setCurrentPassInput(
                                        currentPasswordRef.current.value
                                    );
                                    handleFieldChange(e);
                                }}
                            />
                        </div>
                        <div
                            className="custom-cursor-pointer"
                            style={{
                                position: "absolute",
                                top: "61%",
                                right: "17px",
                                fontSize: "20px",
                            }}
                            onClick={toggleCurrentPasswordVisibility}
                        >
                            {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>

                    <p className="flex flex-col lg:flex-row justify-between z-10 mt-2 lg:mt-0">
                        <div className="label-text-alt text-xs custom-cursor-default">
                            Signed up via Google?{" "}
                            <span
                                onClick={(e) => {
                                    createPass(e);
                                    modalRef.current?.close();
                                    setFormFields(fields);
                                }}
                                className="text-secondary font-bold custom-cursor-pointer hover:underline"
                            >
                                Create a password
                            </span>
                        </div>
                    </p>

                    <div className="relative">
                        <div className="form-control">
                            <label className="label">
                                <strong className="label-text">
                                    New Password
                                </strong>
                            </label>
                            <input
                                type={showNewPassword ? "text" : "password"}
                                required
                                autoComplete="off"
                                ref={newPasswordRef}
                                name="newPass"
                                value={formFields.newPass}
                                placeholder="Enter new password"
                                className="input placeholder:text-gray-500 border-gray-500 border-opacity-50 lg:border-0"
                                onChange={(e) => {
                                    setNewPassInput(
                                        newPasswordRef.current.value
                                    );
                                    const { strength, valid } =
                                        passwordStrengthChecker(
                                            e,
                                            setSuccess,
                                            setError
                                        );
                                    setStatus(strength);
                                    setColorCode(passStrength[strength]);
                                    setIsValid(valid);
                                    handleFieldChange(e);
                                }}
                            />
                        </div>
                        <div
                            className="custom-cursor-pointer"
                            style={{
                                position: "absolute",
                                top: "61%",
                                right: "17px",
                                fontSize: "20px",
                            }}
                            onClick={toggleNewPasswordVisibility}
                        >
                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="form-control">
                            <label className="label">
                                <strong className="label-text">
                                    Confirm Password
                                </strong>
                            </label>
                            <input
                                autoComplete="off"
                                type={showConfirmPassword ? "text" : "password"}
                                ref={confirmPasswordRef}
                                disabled={!isValid}
                                name="confirmPass"
                                value={formFields.confirmPass}
                                placeholder="Enter new password again"
                                className="input placeholder:text-gray-500 border-gray-500 border-opacity-50 lg:border-0"
                                onChange={(e) => {
                                    setConfirmPassInput(
                                        confirmPasswordRef.current.value
                                    );
                                    handleFieldChange(e);
                                }}
                            />
                        </div>
                        <div
                            className="custom-cursor-pointer"
                            style={{
                                position: "absolute",
                                top: "61%",
                                right: "17px",
                                fontSize: "20px",
                            }}
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                    <p
                        className={`flex flex-col lg:flex-row justify-between z-10 text-xs mt-2 lg:mt-0 ${
                            error
                                ? "text-red-600"
                                : success
                                ? "text-green-500"
                                : ""
                        } ${status ? "visible" : "invisible"}`}
                    >
                        <span className="text-base-content">
                            <strong>Strength:</strong>{" "}
                            <span style={{ color: colorCode }}>{status}</span>
                        </span>
                        <span>{error ? error : success ? success : ""}</span>
                    </p>
                    <div className="form-control lg:mt-6 modal-action">
                        <button
                            type="submit"
                            disabled={!isValid || !isFormValid || loading}
                            className={`btn btn-md text-md rounded-md lg:border-0 w-full md:w-auto dark:disabled:bg-stone-900 disabled:bg-stone-400 bg-base-200 dark:hover:bg-stone-800 dark:bg-base-300 ${
                                loading &&
                                "dark:disabled:text-stone-400 disabled:text-stone-600"
                            }`}
                        >
                            {loading ? (
                                <TbFidgetSpinner className="text-2xl animate-spin" />
                            ) : (
                                "Change Password"
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </dialog>
    );
};

export default ChangePassword;
