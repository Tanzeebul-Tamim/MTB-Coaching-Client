import DashboardPageTitle from "../../components/ui/DashboardPageTitle";
import { TbFidgetSpinner } from "react-icons/tb";
import useAddClass from "./useAddClass";

const AddClass = () => {
    const {
        imageButtonText,
        loading2,
        handleChange,
        handleSubmit,
        isFormValid,
        formData,
    } = useAddClass();

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
