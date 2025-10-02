import { useEffect, useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import { saveInstructor, saveInstructorViaSocial } from "../../../api/authApi";
import Swal from "sweetalert2";
import { Flip, toast } from "react-toastify";
import useScreenSize from "../../../hooks/useScreenSize";
import useSoundEffects from "../../../hooks/useSoundEffects";

const useInstructorRegister = () => {
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState("");
    const [contactError, setContactError] = useState("");
    const [isContactValid, setIsContactValid] = useState(false);
    const [success, setSuccess] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
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
    const imageRef = useRef();
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [imageButtonText, setImageButtonText] = useState("Upload Image");
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

    useEffect(() => {
        if (!isValid) {
            setFormFields((prev) => ({
                ...prev,
                confirmPassword: "",
            }));
        }
    }, [isValid]);

    const navigate = useNavigate();
    const location = useLocation();
    const { isSmallDevice } = useScreenSize();
    const getPrevLocation = localStorage.getItem("location");
    const from = location.state?.from?.pathname || getPrevLocation;
    const { play } = useSoundEffects();
    useTitle("| Instructor-Registration");

    const handleSelectGender = (event) => {
        const selectGender = event.target.value;
        setSelectedGender(selectGender);
    };

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

    const handleRegister = (event) => {
        event.preventDefault();
        const name = formFields.name;
        const email = formFields.email;
        const contactNo = formFields.contact;
        const address = formFields.address;
        const gender = selectedGender;
        const password = formFields.password;
        const confirmPassword = formFields.confirmPassword;
        const image = formFields.image;
        const formData = new FormData();
        formData.append("image", image);
        const url = `${import.meta.env.VITE_IMGBB_API_URL}?key=${
            import.meta.env.VITE_IMGBB_KEY
        }`;

        if (image) {
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
                                                saveInstructor(user);
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
                        ); // Set the desired image type and quality (here it is JPEG with 90% quality)
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

    const handleImageButtonText = (image) => {
        const imageName = image.name;
        if (imageName.length > 20) {
            setImageButtonText(`${image.name.slice(0, 20)} . . . .`);
        } else {
            setImageButtonText(imageName);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                saveInstructorViaSocial(result.user).catch((error) => {
                    logOut().then(() => {
                        toast.warning(error.message, {
                            position: "top-center",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            transition: Flip,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        navigate("/login");
                    });
                });
            })
            .then(() => play("success"))
            .catch((error) => {
                console.error(error);
                if (error.code === "auth/user-disabled") {
                    setError("Your account has been suspended!");
                }
            })
            .finally(() => {
                setLoading(false);
                navigate(from, { replace: true });
            });
    };

    // Update field values on change
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

    // Clear the form
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
    };
};

export default useInstructorRegister;
