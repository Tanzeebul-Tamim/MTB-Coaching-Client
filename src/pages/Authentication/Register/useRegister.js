import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useScreenSize from "../../../hooks/useScreenSize";
import useTitle from "../../../hooks/useTitle";
import { saveStudent, saveStudentViaSocial } from "../../../api/authApi";
import Swal from "sweetalert2";

const useRegister = () => {
    const [error, setError] = useState("");
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
    } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [imageButtonText, setImageButtonText] = useState("Upload Image");
    const [formFields, setFormFields] = useState({
        name: "",
        email: "",
        contact: "",
        address: "",
        password: "",
        confirmPassword: "",
        image: null,
    });
    const navigate = useNavigate();
    const location = useLocation();
    const { isSmallDevice } = useScreenSize();
    const getPrevLocation = localStorage.getItem("location");
    const from = location.state?.from?.pathname || getPrevLocation;
    useTitle("| Student-Registration");

    const handleSelectGender = (event) => {
        const selectGender = event.target.value;
        setSelectedGender(selectGender);
    };

    const isFormValid =
        formFields.name &&
        formFields.email &&
        formFields.contact &&
        formFields.address &&
        formFields.password &&
        formFields.confirmPassword &&
        selectedGender &&
        formFields.image;

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
                if (password === confirmPassword) {
                    setError("");

                    if (password.length < 6) {
                        setError(
                            "Password must be at least 6 characters long!"
                        );
                        return;
                    } else if (!/(?=.*[A-Z])/.test(password)) {
                        setError(
                            "Password must contain at least one uppercase letter"
                        );
                        return;
                    } else if (!/(?=.*\d)/.test(password)) {
                        setError("Password must contain at least one digit");
                        return;
                    } else if (
                        !/(?=.*[!@#$%^&*()_\-+={}[\]\\|:;"'<>,.?/~])/.test(
                            password
                        )
                    ) {
                        setError(
                            "Password must contain at least one special character"
                        );
                        return;
                    }

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
                                                saveStudent(user);
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
                                                        "This email is already in use. Please use a different email."
                                                    );
                                                    setSuccess("");
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
            setImageButtonText(`${image.name.slice(0, 22)} . . . .`);
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
                saveStudentViaSocial(result.user);
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

    return {
        error,
        success,
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
    };
};

export default useRegister;
