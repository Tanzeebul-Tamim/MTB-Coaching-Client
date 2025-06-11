import { useState } from "react";
import DashboardPageTitle from "../../shared_components/DashboardPageTitle/DashboardPageTitle";
import useTitle from "../../hooks/useTitle";
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

    return (
        <>
            <DashboardPageTitle title={"Add a Course"} />
            <div className="flex mt-[35%] lg:mt-0 flex-col md:flex-row mb-10 px-2 md:px-5 gap-6 md:gap-10 items-center justify-center w-full">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col bg-base-100 lg:py-5 py-3 px-3 lg:px-0 rounded-2xl lg:bg-opacity-50 bg-opacity-60 description w-full max-w-xl"
                >
                    <div className="card-body p-0 md:p-6">
                        <div className="flex flex-col md:flex-row justify-between gap-2">
                            <div className="form-control z-[10] w-full md:w-1/2">
                                <label className="label">
                                    <strong className="label-text">
                                        Course Name
                                    </strong>
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
                            <div className="form-control z-[10] w-full md:w-1/2">
                                <label className="label">
                                    <strong className="label-text">
                                        Price ($)
                                    </strong>
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
                        <div className="flex flex-col md:flex-row justify-between gap-2">
                            <div className="form-control z-[10] w-full md:w-1/2">
                                <label className="label">
                                    <strong className="label-text">
                                        Course Thumbnail
                                    </strong>
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
                                    <div className="btn btn-sm hover:bg-stone-700 bg-stone-800 w-full md:w-auto">
                                        {imageButtonText}
                                    </div>
                                </label>
                            </div>
                            <div className="form-control z-[10] w-full md:w-1/2">
                                <label className="label">
                                    <strong className="label-text">
                                        Student Slot
                                    </strong>
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
                                className="btn btn-md text-md rounded-md bg-base-200 hover:bg-stone-800 disabled:bg-stone-900 w-full md:w-auto"
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
        </>
    );
};

export default AddClass;
