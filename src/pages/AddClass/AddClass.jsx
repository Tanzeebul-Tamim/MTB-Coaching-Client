import DashboardPageTitle from "../../components/ui/DashboardPageTitle";
import { TbFidgetSpinner } from "react-icons/tb";
import useAddClass from "./useAddClass";
import DatePicker from "../../components/ui/DatePicker";

const AddClass = () => {
    const {
        imageButtonText,
        loading2,
        handleChange,
        handleSubmit,
        isFormValid,
        formData,
        isSmallDevice,
        error,
    } = useAddClass();

    return (
        <>
            <DashboardPageTitle title={"Add a Course"} />
            <div className="flex mt-[20%] lg:mt-0 flex-col md:flex-row mb-10 px-2 md:px-5 gap-6 md:gap-10 items-center justify-center w-full">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col bg-base-100 lg:py-5 py-3 px-3 lg:px-0 rounded-2xl lg:bg-opacity-70 bg-opacity-60 description w-full max-w-xl text-base-content"
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
                                    placeholder="Enter Course Name"
                                    className="input placeholder:text-gray-500"
                                    required
                                />
                            </div>
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
                                        className="input hidden"
                                        hidden
                                        accept="image/*"
                                        required
                                    />
                                    <div className="btn btn-sm hover:bg-base-300 bg-base-200 dark:hover:bg-stone-800 dark:bg-base-300 border-0 w-full">
                                        {imageButtonText}
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between gap-2">
                            <div className="form-control z-[10] w-[47%]">
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
                                    placeholder="Enter Price"
                                    className="input placeholder:text-gray-500"
                                    min="0"
                                    required
                                />
                            </div>
                            <div className="form-control z-[10] w-[47%]">
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
                                    placeholder={`${
                                        isSmallDevice ? "" : "Enter "
                                    }Student Capacity`}
                                    className="input placeholder:text-gray-500"
                                    min="1"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex relative flex-col md:flex-row justify-between gap-2">
                            <DatePicker
                                label="Start"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                style={{
                                    position: "absolute",
                                    top: isSmallDevice ? "30%" : "61%",
                                    right: isSmallDevice ? "15px" : "300px",
                                    fontSize: "20px",
                                }}
                            />
                            <DatePicker
                                label="End"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                style={{
                                    position: "absolute",
                                    top: isSmallDevice ? "82%" : "61%",
                                    right: isSmallDevice ? "15px" : "15px",
                                    fontSize: "20px",
                                }}
                            />
                        </div>
                        <p
                            className={`text-red-500 z-10 mt-3 ${
                                !error ? "invisible" : "visible"
                            }`}
                        >
                            {error ? error : "a"}
                        </p>
                        <div className="form-control mt-3 z-[10]">
                            <button
                                type="submit"
                                className={`btn btn-md text-md rounded-md border-0 dark:disabled:bg-stone-900 disabled:bg-stone-400 bg-base-200 dark:hover:bg-stone-800 dark:bg-base-300  disabled:border-stone-600 w-full md:w-auto ${
                                    loading2 &&
                                    "dark:disabled:text-gray-600 disabled:text-stone-600"
                                }`}
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
