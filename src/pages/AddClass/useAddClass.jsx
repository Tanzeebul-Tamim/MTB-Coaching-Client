import { useEffect, useState } from "react";
import useTitle from "../../hooks/useTitle";
import useAuth from "../../hooks/useAuth";
import { getUserData, saveUser } from "../../api/authApi";
import { Flip, toast } from "react-toastify";
import useScreen from "../../hooks/useScreen";
import useSoundEffects from "../../hooks/useSoundEffects";

const useAddClass = () => {
    const [imageButtonText, setImageButtonText] = useState("Upload Thumbnail");
    const [error, setError] = useState("");
    const [helmet, setHelmet] = useState("Add a Course");
    const { isSmallDevice } = useScreen();
    const { play } = useSoundEffects();
    useTitle(`| ${helmet}`);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        studentSlot: "",
        startDate: "",
        endDate: "",
        image: null,
    });

    const { user, setLoading } = useAuth();
    const [loading2, setLoading2] = useState(false);

    useEffect(() => {
        if (formData.startDate && formData.endDate) {
            dateValidation(formData.startDate, formData.endDate);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.startDate, formData.endDate]);

    const handleImageButtonText = (image) => {
        const imageName = image.name;
        if (imageName.length > 20) {
            setImageButtonText(`${image.name.slice(0, 15)} . . . .`);
        } else {
            setImageButtonText(imageName);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setFormData((prev) => ({ ...prev, image: files[0] }));
            handleImageButtonText(files[0]);
        } else {
            const updatedFormData = { ...formData, [name]: value };
            setFormData(updatedFormData);

            if (name === "name") setHelmet(value || "Add a Course");
        }
    };

    const dateValidation = () => {
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);

        const today = new Date();
        today.setHours(0, 0, 0, 0); // remove time part

        const diffInMs =
            new Date(formData.endDate) - new Date(formData.startDate);
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

        if (startDate > endDate) {
            setError("Start date cannot be after end date");
        } else if (endDate < today) {
            setError("End date cannot be in the past");
        } else if (startDate <= today) {
            setError("Start date must be later than today");
        } else if (diffInDays < 3) {
            setError("Course duration must be at least 3 days");
        } else if (diffInDays > 30) {
            setError("Course duration cannot exceed 30 days");
        } else {
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading2(true);
        try {
            // Upload image to imgbb
            const image = formData.image;
            let imageUrl = "";
            if (image) {
                const uploadFormData = new FormData();
                uploadFormData.append("image", image);
                const url = `${import.meta.env.VITE_IMGBB_API_URL}?key=${
                    import.meta.env.VITE_IMGBB_KEY
                }`;
                const res = await fetch(url, {
                    method: "POST",
                    body: uploadFormData,
                });
                const data = await res.json();
                imageUrl = data.data.display_url;
            }

            const userDoc = await getUserData(user.email);

            const newClass = {
                name: formData.name,
                image: imageUrl,
                price: Number(formData.price),
                studentSlot: Number(formData.studentSlot),
                startDate: formData.startDate,
                endDate: formData.endDate,
                totalStudent: 0,
            };

            const updatedClasses = Array.isArray(userDoc.classes)
                ? [...userDoc.classes, newClass]
                : [newClass];

            const updatedUser = { ...userDoc, classes: updatedClasses };
            await saveUser(updatedUser);

            setFormData({ name: "", price: "", studentSlot: "", image: null });
            setImageButtonText("Upload Thumbnail");

            play("success");
            toast.success(
                <div className="text-center text-green-500">
                    Course added successfully!
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
            setTimeout(() => {
                window.location.replace(`/instructors/${userDoc._id}`);
            }, 1200);
        } catch (err) {
            toast.error(
                <div className="text-center">
                    <span className="font-bold text-green-500 text-[17px]">
                        Failed to add course!
                    </span>
                    <br />
                    Please try again
                </div>
            );
            console.error(err);
        } finally {
            setLoading2(false);
            setLoading(false);
        }
    };

    // Helper to check if all fields are filled
    const isFormValid =
        formData.name.trim() !== "" &&
        formData.price !== "" &&
        formData.studentSlot !== "" &&
        formData.studentSlot != 0 &&
        formData.startDate != "" &&
        formData.endDate != "" &&
        formData.image !== null &&
        error === "";

    return {
        imageButtonText,
        loading2,
        handleChange,
        handleSubmit,
        isFormValid,
        formData,
        isSmallDevice,
        error,
    };
};

export default useAddClass;
