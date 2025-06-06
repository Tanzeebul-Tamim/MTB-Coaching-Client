import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { useRef } from "react";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import app from "../../firebase/firebase.config";
import { Slide, toast } from "react-toastify";
import { TbFidgetSpinner } from "react-icons/tb";

const auth = getAuth(app);

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const modalRef = useRef(null);

  const [currentPassInput, setCurrentPassInput] = useState(null);
  const [newPassInput, setNewPassInput] = useState(null);
  const [confirmPassInput, setConfirmPassInput] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassInput
    );
    setLoading(true);
    reauthenticateWithCredential(auth.currentUser, credential)
      .then(() => {
        if (newPassInput === confirmPassInput) {
          if (newPassInput.length < 6) {
            setError("Password must be at least 6 characters long!");
            setLoading(false);
            return;
          } else if (!/(?=.*[A-Z])/.test(newPassInput)) {
            setError("Password must contain at least one uppercase letter");
            setLoading(false);
            return;
          } else if (!/(?=.*\d)/.test(newPassInput)) {
            setError("Password must contain at least one digit");
            setLoading(false);
            return;
          } else if (
            !/(?=.*[!@#$%^&*()_\-+={}[\]\\|:;"'<>,.?/~])/.test(newPassInput)
          ) {
            setError("Password must contain at least one special character");
            setLoading(false);
            return;
          }
        } else {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        return updatePassword(auth.currentUser, newPassInput).then(() => {
          toast.success("Password updated!", {
            position: "top-center",
            autoClose: 1100,
            hideProgressBar: false,
            closeOnClick: true,
            transition: Slide,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setError("");
          setLoading(false);
          modalRef.current.close();
        });
      })
      .catch((error) => {
        console.error(error);
        if (error.code === "auth/wrong-password") {
          setError("Current password is incorrect");
          setLoading(false);
          return;
        } else if (error.code === "auth/too-many-requests") {
          setError("Too many unsuccessful attempts! Try again later.");
          setLoading(false);
          return;
        }
      });
  };

  return (
    <dialog
      ref={modalRef}
      id="my_modal_1"
      className="modal text-white description"
    >
      <form
        onSubmit={handleSubmit}
        method="dialog"
        className="modal-box bg-opacity-90"
      >
        <h1 className="z-[10] text-white text-2xl tracking-[9px] text-center uppercase font-extrabold">
          Change Password
        </h1>
        <p className="z-[10] mt-1 text-white text-xs text-center">
          Press esc to cancel
        </p>

        <div className="card-body">
          <div className="relative">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Current Password</span>
              </label>
              <input
                autoComplete="off"
                type={showCurrentPassword ? "text" : "password"}
                ref={currentPasswordRef}
                placeholder="Enter current password"
                className="input input-bordered"
                onChange={() =>
                  setCurrentPassInput(currentPasswordRef.current.value)
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
                <span className="label-text">New Password</span>
              </label>
              <input
                autoComplete="off"
                type={showNewPassword ? "text" : "password"}
                ref={newPasswordRef}
                placeholder="Enter new password"
                className="input input-bordered"
                onChange={() => setNewPassInput(newPasswordRef.current.value)}
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
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                autoComplete="off"
                type={showConfirmPassword ? "text" : "password"}
                ref={confirmPasswordRef}
                placeholder="Enter new password again"
                className="input input-bordered"
                onChange={() =>
                  setConfirmPassInput(confirmPasswordRef.current.value)
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

          <p className={`text-red-600 mt-2 ${error ? "visible" : "invisible"}`}>
            {error ? error : "a"}
          </p>
          <div className="form-control mt-6 modal-action">
            <button
              type="submit"
              disabled={
                !currentPassInput ||
                !newPassInput ||
                !confirmPassInput ||
                loading
              }
              className="btn btn-md disabled:bg-stone-900 text-md rounded-md bg-stone-700 hover:bg-stone-800"
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
