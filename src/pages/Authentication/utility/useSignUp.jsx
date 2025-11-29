import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useScreen from "../../../hooks/useScreen";
import useSoundEffects from "../../../hooks/useSoundEffects";
import useTitle from "../../../hooks/useTitle";
import { Flip, toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import {
    saveInstructor,
    saveInstructorViaSocial,
    saveStudent,
    saveStudentViaSocial,
} from "../../../api/authApi";
import Swal from "sweetalert2";
import termsConditionToast from "./termsConditionToast";

/**
 * Generic sign up hook for both students and instructors.
 * @param {Object} options
 * @param {"student"|"instructor"} options.type - Registration type
 */

// Main unified sign-up hook that handles both student and instructor registration.
// The "type" argument switches behavior between student and instructor flows.
const useSignUp = ({ type = "student" } = {}) => {
    // Building user role/type with an initial upper case letter
    const uppercaseRole = type.charAt(0).toUpperCase() + type.slice(1);

    // Auth-related methods: account creation, updates, social login, verification, loading control; and other helper hooks
    const {
        createUser,
        updateUser,
        setLoading,
        loading,
        logOut,
        googleSignIn,
        emailVerification,
        isIOS,
    } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { isSmallDevice } = useScreen();
    const { play } = useSoundEffects();

    // Redirect logic: determine where the user should go after registering.
    const getPrevLocation = localStorage.getItem("location");
    const from = location.state?.from?.pathname || getPrevLocation;

    // Dynamic helmet
    useTitle(`| ${uppercaseRole}-Registration`);

    // Default Toast configuration for consistent notifications across the hook.
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

    // Local UI states: input values, validation flags, error messages, toggles, and misc UI helpers.
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState("");
    const [contactError, setContactError] = useState("");
    const [isContactValid, setIsContactValid] = useState(false);
    const [success, setSuccess] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [country, setCountry] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [highlightText, setHighlightText] = useState(false);
    const imageRef = useRef();
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [imageButtonText, setImageButtonText] = useState("Upload Image");

    // Initial shape of the form inputs used to reset or initialize the sign-up form.
    const fields = {
        name: "",
        email: "",
        contact: "",
        address: "",
        password: "",
        confirmPassword: "",
        image: null,
    };

    const [formFields, setFormFields] = useState(fields);

    // Whenever validation fails, reset confirmPassword so the user re-enters it.
    useEffect(() => {
        if (!isValid) {
            setFormFields((prev) => ({
                ...prev,
                confirmPassword: "",
            }));
        }
    }, [isValid]);

    // Gender setter method
    const handleSelectGender = (event) => {
        const selectGender = event.target.value;
        setSelectedGender(selectGender);
    };

    // Check if all required fields and validation flags are satisfied before enabling form submission.
    let isFormValid =
        formFields.name &&
        formFields.email &&
        formFields.contact &&
        formFields.address &&
        formFields.password &&
        formFields.confirmPassword &&
        selectedGender &&
        formFields.image &&
        isValid &&
        isContactValid;

    // Normalize phone numbers by stripping symbols (in plain format removing "+", "-" and spaces) so backend validation stays consistent.
    const formatContactNo = (value) => {
        if (!value) return "";

        // remove all spaces, parentheses, and hyphens
        let cleaned = value.replace(/[\s()-]/g, "");

        // remove the leading '+' if present
        if (cleaned.startsWith("+")) cleaned = cleaned.slice(1);

        return cleaned;
    };

    // Main registration handler for email/password sign-up.
    // Handles image processing, cropping, uploading, user creation, DB saving, email verification, and redirects.
    const handleRegister = (event) => {
        // Accessing all the necessary fields and building the API URL
        event.preventDefault();
        const name = formFields.name;
        const email = formFields.email;
        const contactNo = formatContactNo(formFields.contact);
        const address = formFields.address;
        const gender = selectedGender;
        const password = formFields.password;
        const confirmPassword = formFields.confirmPassword;

        const image = formFields.image;
        const formData = new FormData();
        const url = `${import.meta.env.VITE_IMGBB_API_URL}?key=${
            import.meta.env.VITE_IMGBB_KEY
        }`;

        // Choose correct save functions
        const saveUser = type === "student" ? saveStudent : saveInstructor;

        if (image) {
            // Crop the uploaded image to a 1:1 square using a canvas before uploading to imgbb.
            if (selectedGender === "Male" || selectedGender === "Female") {
                if (!isValid) return;
                if (password === confirmPassword) {
                    // Create an HTMLImageElement to load the image
                    const imgElement = document.createElement("img");
                    imgElement.onload = () => {
                        const canvas = document.createElement("canvas");
                        const ctx = canvas.getContext("2d");

                        // Set the desired width and height for the cropped image (1:1 ratio)
                        const width = imgElement.width;
                        const height = imgElement.width;

                        // Calculate the offset for cropping the image from the top
                        const xOffset = 0;
                        const yOffset = 0;

                        // Set the canvas width and height to match the desired cropped size
                        canvas.width = width;
                        canvas.height = height;

                        // Draw the cropped image onto the canvas
                        ctx.drawImage(
                            imgElement,
                            xOffset,
                            yOffset,
                            width,
                            height,
                            0,
                            0,
                            width,
                            height
                        );

                        // Convert the canvas image to a Blob object
                        canvas.toBlob(
                            (blob) => {
                                // Append the Blob to the form data
                                formData.append("image", blob);

                                // Upload the cropped image
                                fetch(url, {
                                    method: "POST",
                                    body: formData,
                                })
                                    .then((res) => res.json())
                                    .then((imageData) => {
                                        const imageUrl =
                                            imageData.data.display_url;
                                        const user = {
                                            name,
                                            email,
                                            contactNo,
                                            address,
                                            gender,
                                            image: imageUrl,
                                        };
                                        createUser(email, password)
                                            .then((result) => {
                                                const createdUser = result.user;
                                                emailVerification(createdUser);
                                                saveUser(user);
                                                logOut();
                                                setSuccess(
                                                    "Registration Successful!"
                                                );
                                                setError("");
                                                updateUser(
                                                    name,
                                                    imageUrl,
                                                    contactNo
                                                )
                                                    .then(() => {
                                                        play("success");
                                                        Swal.fire({
                                                            title: `A verification email has been sent to ${email}`,
                                                            text: "After verifying your email you can log in",
                                                            icon: "success",
                                                            color: "white",
                                                            iconColor:
                                                                "lightgreen",
                                                            showCancelButton: false,
                                                            confirmButtonColor:
                                                                "lightgreen",
                                                            confirmButtonText:
                                                                "Okay",
                                                            background:
                                                                "#201e1e",
                                                            backdrop: "#00000",
                                                        }).then((result) => {
                                                            if (
                                                                result.isConfirmed
                                                            ) {
                                                                window.location.href =
                                                                    "/login";
                                                            }
                                                        });
                                                    })
                                                    .catch((err) => {
                                                        setLoading(false);
                                                        console.error(err);
                                                    });
                                            })
                                            .catch((error) => {
                                                console.error(error);
                                                if (
                                                    error.message.includes(
                                                        "email"
                                                    )
                                                ) {
                                                    setError(
                                                        "This email is already in use"
                                                    );
                                                    setSuccess("");
                                                    setFormFields({
                                                        ...formFields,
                                                        email: "",
                                                    });
                                                }
                                                setLoading(false);
                                            });
                                    });
                            },
                            "image/jpeg",
                            0.9
                        );
                    };

                    // Load the image file
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        imgElement.src = e.target.result;
                    };
                    reader.readAsDataURL(image);
                } else {
                    setError("Passwords do not match!");
                    setFormFields((prev) => ({
                        ...prev,
                        confirmPassword: "",
                    }));
                    return;
                }
            } else if (
                !selectedGender &&
                (!name || !email || !password || !confirmPassword)
            ) {
                return;
            } else {
                setError("Please select a gender");
                return;
            }
        } else if (
            !image &&
            (!name || !email || !password || !confirmPassword)
        ) {
            return;
        } else {
            setError("Please select an image");
            return;
        }
    };

    // Shorten long image file names so the button text stays clean.
    const handleImageButtonText = (image) => {
        const imageName = image.name;
        if (imageName.length > 20) {
            setImageButtonText(`${image.name.slice(0, 20)} . . . .`);
        } else {
            setImageButtonText(imageName);
        }
    };

    // Toggle between showing and hiding password fields.
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };

    // Google OAuth flow shared for student/instructor.
    // Handles access, saving user profile, welcoming toast, redirects, and cleanup.
    const handleGoogleSignIn = () => {
        // Choose correct save functions and toast text
        const saveUserViaSocial =
            type === "student" ? saveStudentViaSocial : saveInstructorViaSocial;

        const welcomeToast = (name) => {
            const Message = () => (
                <div className="text-center">
                    <span className="font-bold text-green-500 text-[18px]">
                        Welcome {name}
                    </span>{" "}
                    <br />
                    <span className={!isSmallDevice && " text-justify"}>
                        You have logged-in as a <strong>{uppercaseRole}</strong>
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
            .then(async (result) => {
                try {
                    await saveUserViaSocial(result.user, welcomeToast);
                    navigate(from, { replace: true });
                } catch (error) {
                    await logOut();
                    toast.warning(
                        <div className="text-center">{error.message}</div>,
                        {
                            position: "top-center",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            transition: Flip,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        }
                    );
                    navigate("/login");
                }
            })
            .then(() => play("alert"))
            .catch((error) => {
                console.error(error);
                if (error.code === "auth/user-disabled")
                    setError("Your account has been suspended!");
                else if (error.code === "auth/popup-closed-by-user")
                    setError("Sign in canceled.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Apply form input changes to state, including file selection for the image upload.
    const handleFieldChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormFields((prev) => ({
                ...prev,
                image: files[0] || null,
            }));
            if (files[0]) handleImageButtonText(files[0]);
        } else {
            setFormFields((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // Reset all fields, validation states, and UI indicators after successful submission or logout.
    const clearForm = (setStatus) => {
        imageRef.current.value = "";
        isFormValid = false;
        setIsValid(false);
        setFormFields(fields);
        setSelectedGender("");
        setStatus("");
        setImageButtonText("Upload Image");
    };

    return {
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
        imageRef,
        clearForm,
        isIOS,
        contactError,
        setContactError,
        setIsContactValid,
        country,
        setCountry,
        agreed,
        setAgreed,
        highlightText,
        setHighlightText,
        config,
    };
};

export default useSignUp;
