import { useState } from "react";
import DashboardPageTitle from "../../shared_components/DashboardPageTitle/DashboardPageTitle";
import useTitle from "../../Helmet/useTitle";
import { getUserData, saveUser } from "../../api/authApi";
import { toast, Flip } from "react-toastify";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";

const AddClass = () => {
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
                theme: "dark",
            });
            setTimeout(() => {
                window.location.replace(`/instructor/${userDoc._id}`);
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

    return (
        <div>
            <DashboardPageTitle title={"Add a Course"} />
            <div className="flex justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col bg-base-100 py-5 rounded-2xl bg-opacity-50 description"
                >
                    <div className="card-body">
                        <div className="flex justify-between gap-2">
                            <div className="form-control z-[10]">
                                <label className="label">
                                    <span className="label-text">
                                        Course Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter course name"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control z-[10]">
                                <label className="label">
                                    <span className="label-text">
                                        Price ($)
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="Enter price"
                                    className="input input-bordered"
                                    min="0"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-between gap-2">
                            <div className="form-control z-[10]">
                                <label className="label">
                                    <span className="label-text">
                                        Course Thumbnail
                                    </span>
                                </label>
                                <label>
                                    <input
                                        onChange={handleChange}
                                        type="file"
                                        name="image"
                                        className="input input-bordered hidden"
                                        hidden
                                        accept="image/*"
                                        required
                                    />
                                    <div className="btn btn-sm hover:bg-stone-700 bg-stone-800">
                                        {imageButtonText}
                                    </div>
                                </label>
                            </div>
                            <div className="form-control z-[10]">
                                <label className="label">
                                    <span className="label-text">
                                        Student Slot
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    name="studentSlot"
                                    value={formData.studentSlot}
                                    onChange={handleChange}
                                    placeholder="Enter number of slots"
                                    className="input input-bordered"
                                    min="1"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-control mt-6 z-[10]">
                            <button
                                type="submit"
                                className="btn btn-md text-md rounded-md bg-base-200 hover:bg-stone-800 disabled:bg-stone-900"
                                disabled={!isFormValid || loading2}
                            >
                                {loading2 ? (
                                    <TbFidgetSpinner className="text-2xl animate-spin" />
                                ) : (
                                    "Add Course"
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClass;
