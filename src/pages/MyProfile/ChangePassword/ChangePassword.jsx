import { FaEyeSlash, FaEye } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import useChangePassword from "./useChangePassword";

const ChangePassword = () => {
    const {
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
        error,
        showCurrentPassword,
        showNewPassword,
        showConfirmPassword,
        currentPassInput,
        newPassInput,
        confirmPassInput,
    } = useChangePassword();

    return (
        <dialog
            ref={modalRef}
            id="my_modal_1"
            className="modal text-base-content description"
            onClick={(e) => {
                // Only close if clicking the backdrop (not the form) and on mobile
                if (e.target === e.currentTarget && isSmallDevice) {
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
                <p
                    className={`z-[10] mt-1 ${
                        error ? "text-red-500" : "text-base-content"
                    } text-center`}
                >
                    {!isSmallDevice && (error ? error : "Press esc to cancel")}
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
                                placeholder="Enter current password"
                                className="input placeholder:text-gray-500"
                                onChange={() =>
                                    setCurrentPassInput(
                                        currentPasswordRef.current.value
                                    )
                                }
                            />
                        </div>
                        <div
                            style={{
                                position: "absolute",
                                top: "61%",
                                right: "17px",
                                cursor: "pointer",
                                fontSize: "20px",
                            }}
                            onClick={toggleCurrentPasswordVisibility}
                        >
                            {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="form-control">
                            <label className="label">
                                <strong className="label-text">
                                    New Password
                                </strong>
                            </label>
                            <input
                                autoComplete="off"
                                type={showNewPassword ? "text" : "password"}
                                ref={newPasswordRef}
                                placeholder="Enter new password"
                                className="input placeholder:text-gray-500"
                                onChange={() =>
                                    setNewPassInput(
                                        newPasswordRef.current.value
                                    )
                                }
                            />
                        </div>
                        <div
                            style={{
                                position: "absolute",
                                top: "61%",
                                right: "17px",
                                cursor: "pointer",
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
                                placeholder="Enter new password again"
                                className="input placeholder:text-gray-500"
                                onChange={() =>
                                    setConfirmPassInput(
                                        confirmPasswordRef.current.value
                                    )
                                }
                            />
                        </div>
                        <div
                            style={{
                                position: "absolute",
                                top: "61%",
                                right: "17px",
                                cursor: "pointer",
                                fontSize: "20px",
                            }}
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                    <div className="form-control lg:mt-6 modal-action">
                        <button
                            type="submit"
                            disabled={
                                !currentPassInput ||
                                !newPassInput ||
                                !confirmPassInput ||
                                loading
                            }
                            className="btn btn-md text-md rounded-md lg:border-0 w-full md:w-auto border dark:disabled:bg-stone-900 disabled:bg-stone-400 bg-base-200 dark:hover:bg-stone-800 dark:bg-base-300  disabled:border-stone-600"
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
