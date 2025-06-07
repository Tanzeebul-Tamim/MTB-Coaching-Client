import { useState } from "react";
import { FaEyeSlash, FaEye, FaFacebookF } from "react-icons/fa";
import useTitle from "../../../Helmet/useTitle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbFidgetSpinner } from "react-icons/tb";
import { saveStudent, saveStudentViaSocial } from "../../../api/authApi";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useScreenSize from "../../../hooks/useScreeSize";

const Register = () => {
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
        facebookSignIn,
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
        if (imageName.length > 40) {
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

    const handleFacebookSignIn = () => {
        facebookSignIn()
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

    return (
        <div
            className="min-h-screen lg:pt-32 pt-16 lg:pb-24 pb-20 px-3 sm:px-6 md:px-10 lg:px-10 relative flex flex-col justify-center"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.600), rgba(0, 0, 0, 0.450)), url('/register_banner.avif')",
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
                    <h1 className="text-3xl md:text-4xl font-bold title tracking-widest uppercase text-yellow-500 text-center">
                        Register now!
                    </h1>
                    <div className="text-center">
                        <Link
                            to="/instructor-register"
                            className="description text-sm link link-hover"
                        >
                            Not a student?{" "}
                            <span className="text-yellow-500 underline">
                                Register as an instructor
                            </span>
                        </Link>
                    </div>
                </div>

                <div className="hidden lg:block z-10 text-right w-full lg:w-1/2">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold title uppercase text-yellow-500 text-end">
                        Register now!
                    </h1>
                    <p className="py-4 md:py-6 text-end description text-base md:text-lg lg:text-xl text-white">
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
                            <span className="text-yellow-500">
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
                                <label className="label">
                                    <span className="uppercase label-text font-bold tracking-widest text-white">
                                        Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    name="name"
                                    value={formFields.name}
                                    onChange={handleFieldChange}
                                    placeholder="Enter your username"
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="uppercase label-text font-bold tracking-widest text-white">
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
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-center gap-3 w-full">
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="uppercase label-text font-bold tracking-widest text-white">
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
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="uppercase label-text font-bold tracking-widest text-white">
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
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between gap-3 w-full">
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="uppercase label-text font-bold tracking-widest text-white">
                                        User image
                                    </span>
                                </label>
                                <label>
                                    <input
                                        onChange={handleFieldChange}
                                        type="file"
                                        name="image"
                                        className="input input-bordered hidden"
                                        hidden
                                        accept="image/*"
                                    />
                                    <div className="btn btn-sm hover:bg-stone-700 bg-stone-800 w-full">
                                        {imageButtonText}
                                    </div>
                                </label>
                            </div>

                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="uppercase label-text font-bold tracking-widest text-white">
                                        Gender
                                    </span>
                                </label>
                                <label>
                                    <select
                                        onChange={handleSelectGender}
                                        name="gender"
                                        className="input input-bordered select font-light text-base text-gray-400 w-full max-w-xs"
                                        value={selectedGender}
                                    >
                                        <option hidden>
                                            Enter your gender
                                        </option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row relative justify-center gap-3 w-full">
                            <div className="z-[10] form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="uppercase label-text font-bold tracking-widest text-white">
                                        Password
                                    </span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    autoComplete="off"
                                    name="password"
                                    value={formFields.password}
                                    onChange={handleFieldChange}
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full"
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        top: isSmallDevice ? "28%" : "60%",
                                        left: isSmallDevice ? "90%" : "175px",
                                        cursor: "pointer",
                                        fontSize: "20px",
                                    }}
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>

                            <div className="z-[10] form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="uppercase label-text font-bold tracking-widest text-white">
                                        Confirm Password
                                    </span>
                                </label>
                                <input
                                    type={showPassword2 ? "text" : "password"}
                                    required
                                    autoComplete="off"
                                    name="confirmPassword"
                                    value={formFields.confirmPassword}
                                    onChange={handleFieldChange}
                                    placeholder="Confirm your password"
                                    className="input input-bordered w-full"
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        top: isSmallDevice ? "82%" : "60%",
                                        left: isSmallDevice ? "90%" : "395px",
                                        cursor: "pointer",
                                        fontSize: "20px",
                                    }}
                                    onClick={togglePasswordVisibility2}
                                >
                                    {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>

                        <label className="label z-[10]">
                            <Link
                                to="/login"
                                className="label-text-alt link link-hover"
                            >
                                Already have an account? Please{" "}
                                <span className="text-yellow-500">Login</span>
                            </Link>
                        </label>
                        <p
                            className={`${
                                error
                                    ? "text-red-600"
                                    : success
                                    ? "text-green-500"
                                    : ""
                            } ${error || success ? "visible" : "invisible"}`}
                        >
                            {error ? error : success ? success : "a"}
                        </p>
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
                        <div className="z-[10] mt-6 form-control">
                            <button
                                disabled={loading || !isFormValid}
                                type="submit"
                                className="btn bg-yellow-500 disabled:bg-yellow-900 disabled:text-stone-500 hover:bg-yellow-600 text-white text-xl"
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
            <div className="absolute lg:hidden -bottom-1 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-base-300 pointer-events-none"></div>
            <div className="absolute hidden lg:block lg:bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-base-300 pointer-events-none"></div>
        </div>
    );
};

export default Register;
