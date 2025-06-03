import { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { getUserData, saveUser } from "../../api/authApi";
import { toast } from "react-toastify";
import { TbFidgetSpinner } from "react-icons/tb";

const UpdateProfileForm = ({ userDetails }) => {
    const [imageButtonText, setImageButtonText] = useState("Upload Image");
    const [coverImageButtonText, setCoverImageButtonText] =
        useState("Upload Cover Image");
    const [selectedGender, setSelectedGender] = useState(
        userDetails.gender || ""
    );
    const { updateUser, user, setLoading } = useContext(AuthContext);
    const [loading2, setLoading2] = useState(false);
    const [, setCoverImage] = useState(null);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form?.name?.value;
        const email = user.email;
        const address = form?.address?.value;
        const contactNo = form?.contact?.value;
        const gender = selectedGender;
        const quote = form?.quote?.value;

        const image = form?.image?.files[0];
        const coverImg = form?.cover?.files[0];
        const formData = new FormData();

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
                                                    toast.success(
                                                        "Profile Updated",
                                                        {
                                                            position:
                                                                "top-center",
                                                            autoClose: 1100,
                                                            hideProgressBar: false,
                                                            closeOnClick: true,
                                                            pauseOnHover: true,
                                                            draggable: true,
                                                            progress: undefined,
                                                            theme: "dark",
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
                                            toast.success("Profile Updated", {
                                                position: "top-center",
                                                autoClose: 1100,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                                theme: "dark",
                                            });
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
                                toast.success("Profile Updated", {
                                    position: "top-center",
                                    autoClose: 1100,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "dark",
                                });
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
                        toast.success("Profile Updated", {
                            position: "top-center",
                            autoClose: 1100,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
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

    // Synchronous monitorChange
    const monitorChange = (event) => {
        if (!userDoc) return true; // disable button while loading data
        const form = event.target.form || event.target.closest('form');
        if (!form) return true;

        // Map form field names to userDoc keys
        const fieldMap = {
            name: userDoc.name || user?.displayName || "",
            address: userDoc.address || "",
            contact: userDoc.contactNo || "",
            gender: userDoc.gender || "",
            quote: userDoc.quote || "",
        };

        for (const [formField, userValue] of Object.entries(fieldMap)) {
            if (form[formField] && form[formField].value !== userValue) return false; // enable if changed
        }
        
        // Check for file changes
        if (form.image && form.image.files.length > 0) return false;
        if (form.cover && form.cover.files.length > 0) return false;
        return true; // disable if nothing changed
    };

    return (
        <dialog id="my_modal_3" className="modal text-white description">
            <form
                onSubmit={handleSubmit}
                onChange={(event) => setBtnStatus(monitorChange(event))}
                method="dialog"
                className="modal-box bg-opacity-90"
            >
                <h1 className="z-[10] text-white text-2xl tracking-[9px] text-center uppercase font-extrabold">
                    Update Profile
                </h1>
                <p className="z-[10] mt-1 text-white text-xs text-center">
                    Press esc to cancel
                </p>

                <div className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={user?.displayName}
                            placeholder="Enter your name"
                            className="input input-bordered"
                        />
                    </div>

                    <div className="flex justify-between gap-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input
                                type="text"
                                name="address"
                                defaultValue={userDetails?.address}
                                placeholder="Enter your address"
                                className="input input-bordered w-[195px]"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Contact no</span>
                            </label>
                            <input
                                type="number"
                                name="contact"
                                defaultValue={userDetails?.contactNo}
                                placeholder="Enter your contact no"
                                className="input input-bordered w-[195px]"
                            />
                        </div>
                    </div>

                    {userDetails.role === "Instructor" ? (
                        <>
                            <div className="flex justify-between gap-2">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            User image
                                        </span>
                                    </label>
                                    <label>
                                        <input
                                            onChange={(event) =>
                                                handleImageButtonText(
                                                    event.target.files[0]
                                                )
                                            }
                                            type="file"
                                            name="image"
                                            className="input input-bordered hidden"
                                            hidden
                                            accept="image/*"
                                        />
                                        <div className="btn btn-sm hover:bg-stone-800 bg-stone-700">
                                            {imageButtonText}
                                        </div>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Cover image
                                        </span>
                                    </label>
                                    <label>
                                        <input
                                            onChange={(event) =>
                                                handleCoverImageButtonText(
                                                    event.target.files[0]
                                                )
                                            }
                                            type="file"
                                            name="cover"
                                            className="input input-bordered hidden"
                                            hidden
                                            accept="image/*"
                                        />
                                        <div className="btn btn-sm hover:bg-stone-800 bg-stone-700">
                                            {coverImageButtonText}
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-between gap-2">
                                <div className="form-control w-1/2">
                                    <label className="label">
                                        <span className="label-text">
                                            Quote
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="quote"
                                        defaultValue={userDetails?.quote}
                                        placeholder="Enter your quote"
                                        className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control w-1/2">
                                    <label className="label">
                                        <span className="label-text">
                                            Gender
                                        </span>
                                    </label>
                                    <label>
                                        <select
                                            onChange={handleSelectGender}
                                            name="gender"
                                            defaultValue={userDetails.gender}
                                            className="input input-bordered select font-light text-base text-gray-400 w-full max-w-xs"
                                        >
                                            <option hidden>
                                                Enter your gender
                                            </option>
                                            <option value="Male">Male</option>
                                            <option value="Female">
                                                Female
                                            </option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-between gap-2">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        User image
                                    </span>
                                </label>
                                <label>
                                    <input
                                        onChange={(event) =>
                                            handleImageButtonText(
                                                event.target.files[0]
                                            )
                                        }
                                        type="file"
                                        name="image"
                                        className="input input-bordered hidden"
                                        hidden
                                        accept="image/*"
                                    />
                                    <div className="btn btn-sm hover:bg-stone-800 bg-stone-700">
                                        {imageButtonText}
                                    </div>
                                </label>
                            </div>
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text">Gender</span>
                                </label>
                                <label>
                                    <select
                                        onChange={handleSelectGender}
                                        name="gender"
                                        defaultValue={userDetails.gender}
                                        className="input input-bordered select font-light text-base text-gray-400 w-full max-w-xs"
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
                    )}

                    <div className="form-control mt-6">
                        <button
                            disabled={btnStatus || loading2}
                            type="submit"
                            className="btn btn-md disabled:bg-stone-900 text-md rounded-md bg-stone-700 hover:bg-stone-800"
                        >
                            {loading2 ? (
                                <TbFidgetSpinner className="text-2xl animate-spin" />
                            ) : (
                                "Update"
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </dialog>
    );
};

export default UpdateProfileForm;
