import { useState } from "react";
import useTitle from "../../hooks/useTitle";
import useAuth from "../../hooks/useAuth";
import { getUserData, saveUser } from "../../api/authApi";
import { Flip, toast } from "react-toastify";

const useAddClass = () => {
    const [imageButtonText, setImageButtonText] = useState("Upload Thumbnail");
    const [helmet, setHelmet] = useState("Add a Course");
    useTitle(`| ${helmet}`);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        studentSlot: "",
        image: null,
    });
    const { user, setLoading } = useAuth();
    const [loading2, setLoading2] = useState(false);

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
            setFormData((prev) => ({ ...prev, [name]: value }));
            if (name === "name") setHelmet(value || "Add a Course");
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
                totalStudent: 0,
            };

            const updatedClasses = Array.isArray(userDoc.classes)
                ? [...userDoc.classes, newClass]
                : [newClass];

            const updatedUser = { ...userDoc, classes: updatedClasses };
            await saveUser(updatedUser);

            setFormData({ name: "", price: "", studentSlot: "", image: null });
            setImageButtonText("Upload Thumbnail");

            toast.success("Course added successfully!", {
                position: "top-center",
                autoClose: 1100,
                hideProgressBar: false,
                closeOnClick: true,
                transition: Flip,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                window.location.replace(`/instructors/${userDoc._id}`);
            }, 1200);
        } catch (err) {
            toast.error("Failed to add course. Please try again.");
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
        formData.image !== null;

    return {
        imageButtonText,
        loading2,
        handleChange,
        handleSubmit,
        isFormValid,
        formData
    };
};

export default useAddClass;
