import { useEffect, useState } from "react";
import useScreen from "../../../hooks/useScreen";
import useAuth from "../../../hooks/useAuth";
import { Flip, toast } from "react-toastify";
import { getUserData, saveUser } from "../../../api/authApi";
import useSoundEffects from "../../../hooks/useSoundEffects";
import parsePhoneNumberFromString from "libphonenumber-js";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
countries.registerLocale(enLocale);

const useUpdateProfileForm = (userDetails) => {
    const { isSmallDevice } = useScreen();
    const [imageButtonText, setImageButtonText] = useState("Upload Image");
    const [country, setCountry] = useState("");
    const [coverImageButtonText, setCoverImageButtonText] =
        useState("Upload Cover Image");
    const [contactError, setContactError] = useState("");
    const [isContactValid, setIsContactValid] = useState(true);
    const { play } = useSoundEffects();

    useEffect(() => {
        setCoverImageButtonText(
            isSmallDevice ? "Upload Image" : "Upload Cover Image"
        );
    }, [isSmallDevice]);

    const [selectedGender, setSelectedGender] = useState(
        userDetails?.gender || ""
    );

    // Get country name for user's existing contact no
    useEffect(() => {
        if (userDetails?.contactNo) {
            const phoneWithPlus = userDetails.contactNo.startsWith("+")
                ? userDetails.contactNo
                : "+" + userDetails.contactNo;

            const phone = parsePhoneNumberFromString(phoneWithPlus);

            if (phone) {
                setCountry({
                    name: countries.getName(phone.country, "en"),
                    code: phone.country,
                });
            }
        }
    }, [userDetails.contactNo]);

    const { updateUser, user, setLoading } = useAuth();
    const [loading2, setLoading2] = useState(false);
    const [, setCoverImage] = useState(null);
    const [isValidLength, setIsValidLength] = useState(true);

    const handleImageButtonText = (image) => {
        const imageName = image.name;
        if (imageName.length > 20) {
            setImageButtonText(`${image.name.slice(0, 15)} . . . .`);
        } else {
            setImageButtonText(imageName);
        }
    };

    const handleCoverImageButtonText = (image) => {
        if (!image) return;
        setCoverImage(image);
        const imageName = image.name;
        if (imageName.length > 20) {
            setCoverImageButtonText(`${image.name.slice(0, 15)} . . . .`);
        } else {
            setCoverImageButtonText(imageName);
        }
    };

    const handleSelectGender = (event) => {
        const selectGender = event?.target?.value;
        setSelectedGender(selectGender);
    };

    const quoteMaxLength = 25;

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form?.name?.value;
        const email = user.email;
        const address = form?.address?.value;
        let contactNo = form?.contact?.value;
        contactNo = contactNo && formatContactNo(contactNo);
        const gender = selectedGender;
        const quote = form?.quote?.value;

        const image = form?.image?.files[0];
        const coverImg = form?.cover?.files[0];
        const formData = new FormData();

        let quoteLength;
        let isValid;

        const userRole = userDetails?.role || "Student";

        if (userRole === "Instructor") {
            quoteLength = form?.quote.value.length;
            isValid = quoteLength <= quoteMaxLength;

            if (!isValid) {
                play("warning");
                setBtnStatus(true);
                const time = 2100;

                if (isSmallDevice) {
                    toast.error(
                        <div className="text-center">
                            <span className="font-bold text-red-500 text-[25px]">
                                Quote is too long!
                            </span>
                            <br />
                            Max {quoteMaxLength} characters
                        </div>,
                        {
                            position: "top-right",
                            autoClose: time,
                            hideProgressBar: false,
                            limit: 3,
                            transition: Flip,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        }
                    );
                } else {
                    setIsValidLength(false);
                    setTimeout(() => {
                        setIsValidLength(true);
                    }, time);
                }
                return;
            }
        }

        const url = `${import.meta.env.VITE_IMGBB_API_URL}?key=${
            import.meta.env.VITE_IMGBB_KEY
        }`;

        if (image) {
            const imgElement = document.createElement("img");
            imgElement.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                const width = imgElement.width;
                const height = imgElement.width;

                const xOffset = 0;
                const yOffset = 0;

                canvas.width = width;
                canvas.height = height;

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

                canvas.toBlob(
                    (blob) => {
                        formData.append("image", blob);
                        setLoading2(true);
                        fetch(url, {
                            method: "POST",
                            body: formData,
                        })
                            .then((res) => res.json())
                            .then((imageData) => {
                                const imageUrl = imageData.data.display_url;
                                let coverImageUrl = null;

                                if (coverImg) {
                                    // If cover image is present, upload it separately
                                    const coverFormData = new FormData();
                                    coverFormData.append("image", coverImg);
                                    fetch(url, {
                                        method: "POST",
                                        body: coverFormData,
                                    })
                                        .then((res) => res.json())
                                        .then((coverData) => {
                                            coverImageUrl =
                                                coverData.data.display_url;
                                            const user = {
                                                name,
                                                email,
                                                contactNo,
                                                address,
                                                gender,
                                                quote,
                                                image: imageUrl,
                                                cover: coverImageUrl,
                                            };

                                            updateUser(
                                                name,
                                                imageUrl,
                                                contactNo
                                            )
                                                .then(() => {
                                                    saveUser(user);
                                                    play("success");
                                                    toast.success(
                                                        <div className="text-center font-bold text-[18px] text-green-500">
                                                            Profile Updated!
                                                        </div>,
                                                        {
                                                            position:
                                                                "top-center",
                                                            autoClose: 1100,
                                                            hideProgressBar: false,
                                                            closeOnClick: true,
                                                            transition: Flip,
                                                            pauseOnHover: true,
                                                            draggable: true,
                                                            progress: undefined,
                                                        }
                                                    );
                                                    setLoading(false);
                                                    setLoading2(false);
                                                })
                                                .catch((err) => {
                                                    console.error(err);
                                                    setLoading(false);
                                                    setLoading2(false);
                                                });
                                        });
                                } else {
                                    // upload profile image only
                                    const user = {
                                        name,
                                        email,
                                        contactNo,
                                        address,
                                        gender,
                                        quote,
                                        image: imageUrl,
                                    };
                                    updateUser(name, imageUrl, contactNo)
                                        .then(() => {
                                            saveUser(user);
                                            play("success");
                                            toast.success(
                                                <div className="text-center font-bold text-[18px] text-green-500">
                                                    Profile Updated!
                                                </div>,
                                                {
                                                    position: "top-center",
                                                    autoClose: 1100,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    transition: Flip,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                }
                                            );
                                            setLoading(false);
                                            setLoading2(false);
                                        })
                                        .catch((err) => {
                                            console.error(err);
                                            setLoading(false);
                                            setLoading2(false);
                                        });
                                }
                            });
                    },
                    "image/jpeg",
                    0.9
                );
            };
            const reader = new FileReader();
            reader.onload = (e) => {
                imgElement.src = e.target.result;
            };
            reader.readAsDataURL(image);
        } else {
            const user = {
                name,
                email,
                contactNo,
                address,
                gender,
                quote,
            };

            if (coverImg) {
                // Upload cover image only
                const coverFormData = new FormData();
                coverFormData.append("image", coverImg);
                setLoading2(true);
                fetch(url, {
                    method: "POST",
                    body: coverFormData,
                })
                    .then((res) => res.json())
                    .then((coverData) => {
                        user.cover = coverData.data.display_url;
                        updateUser(name)
                            .then(() => {
                                saveUser(user);
                                play("success");
                                toast.success(
                                    <div className="text-center font-bold text-[18px] text-green-500">
                                        Profile Updated!
                                    </div>,
                                    {
                                        position: "top-center",
                                        autoClose: 1100,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        transition: Flip,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    }
                                );
                                setLoading(false);
                                setLoading2(false);
                            })
                            .catch((err) => {
                                console.error(err);
                                setLoading(false);
                                setLoading2(false);
                            });
                    });
            } else {
                // not photos to upload
                setLoading2(true);
                updateUser(name)
                    .then(() => {
                        saveUser(user);
                        play("success");
                        toast.success(
                            <div className="text-center font-bold text-[18px] text-green-500">
                                Profile Updated!
                            </div>,
                            {
                                position: "top-center",
                                autoClose: 1100,
                                hideProgressBar: false,
                                closeOnClick: true,
                                transition: Flip,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            }
                        );
                        setLoading(false);
                        setLoading2(false);
                    })
                    .catch((err) => {
                        console.error(err);
                        setLoading(false);
                        setLoading2(false);
                    });
            }
        }
    };

    const [btnStatus, setBtnStatus] = useState(true);
    const [userDoc, setUserDoc] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            const data = await getUserData(user.email);
            setUserDoc(data);
        }
        fetchUser();
    }, [user.email]);

    // Normalize phone number in plain format removing "+", "-" and spaces
    const formatContactNo = (value) => {
        if (!value) return "";

        // remove all spaces, parentheses, and hyphens
        let cleaned = value.replace(/[\s()-]/g, "");

        // remove the leading '+' if present
        if (cleaned.startsWith("+")) cleaned = cleaned.slice(1);

        return cleaned;
    };

    // Synchronous monitorChange
    const monitorChange = (event) => {
        const form = event.target.form || event.target.closest("form");
        if (!form) return true;

        const fieldMap = {
            name: userDoc.name || user?.displayName || "",
            address: userDoc.address || "",
            contact: userDoc.contactNo || "",
            gender: userDoc.gender || "",
            quote: userDoc.quote || "",
        };

        let hasChange = false;
        let allEmpty = true;

        for (const [formField, userValue] of Object.entries(fieldMap)) {
            const input = form[formField];

            if (input) {
                let currentVal = input.value.trim();

                // Special handling for contact field (react-phone-input-2)
                if (formField === "contact") {
                    currentVal = formatContactNo(currentVal);
                }

                if (currentVal !== userValue) hasChange = true;
                if (currentVal !== "") allEmpty = false;
            }
        }

        const hasImage = form.image?.files.length > 0;
        const hasCover = form.cover?.files.length > 0;

        if (hasImage || hasCover) {
            hasChange = true;
            allEmpty = false;
        }

        // Disable if nothing changed or all fields are empty
        return !hasChange || allEmpty;
    };

    useEffect(() => {
        if (userDetails?.gender) {
            setSelectedGender(userDetails?.gender);
        }
    }, [userDetails]);

    return {
        imageButtonText,
        coverImageButtonText,
        loading2,
        isValidLength,
        handleImageButtonText,
        handleCoverImageButtonText,
        handleSelectGender,
        handleSubmit,
        btnStatus,
        setBtnStatus,
        monitorChange,
        isSmallDevice,
        quoteMaxLength,
        selectedGender,
        contactError,
        setContactError,
        isContactValid,
        setIsContactValid,
        country,
        setCountry,
    };
};

export default useUpdateProfileForm;
