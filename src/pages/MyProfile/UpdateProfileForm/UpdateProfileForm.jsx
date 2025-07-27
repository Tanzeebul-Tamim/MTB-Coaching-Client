import { TbFidgetSpinner } from "react-icons/tb";
import useUpdateProfileForm from "./useUpdateProfileForm";

const UpdateProfileForm = ({ userDetails }) => {
    const {
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
        setSelectedGender,
        selectedGender,
    } = useUpdateProfileForm(userDetails);

    return (
        <dialog
            id="my_modal_3"
            className="modal text-base-content description"
            onClick={(e) => {
                // Only close if clicking the backdrop (not the form) and on mobile
                if (e.target === e.currentTarget && isSmallDevice) {
                    e.currentTarget.close();
                }
            }}
        >
            <form
                onSubmit={handleSubmit}
                onChange={(event) => setBtnStatus(monitorChange(event))}
                method="dialog"
                className="modal-box bg-opacity-80 lg:border-0 border border-gray-500"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
            >
                <h1 className="z-[10] text-base-content lg:text-2xl text-lg lg:tracking-[9px] tracking-[5px] text-center uppercase font-extrabold">
                    Update Profile
                </h1>
                <p
                    className={`z-[10] mt-1 ${
                        isValidLength ? "text-base-content" : "text-red-500"
                    } text-center`}
                >
                    {!isSmallDevice &&
                        (isValidLength
                            ? "Press esc to cancel"
                            : `Quote is too long! Max ${quoteMaxLength} characters`)}
                </p>

                <div className="card-body p-0 md:p-6">
                    <div className="form-control">
                        <label className="label">
                            <strong className="label-text">Name</strong>
                        </label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={userDetails?.name}
                            placeholder="Enter your name"
                            className="input placeholder:text-gray-500"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row justify-between gap-2">
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <strong className="label-text">Address</strong>
                            </label>
                            <input
                                type="text"
                                name="address"
                                defaultValue={userDetails?.address}
                                placeholder="Enter your address"
                                className="input placeholder:text-gray-500"
                            />
                        </div>

                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <strong className="label-text">
                                    Contact no
                                </strong>
                            </label>
                            <input
                                type="number"
                                name="contact"
                                defaultValue={userDetails?.contactNo}
                                placeholder="Enter your contact no"
                                className="input placeholder:text-gray-500"
                            />
                        </div>
                    </div>

                    {userDetails?.role === "Instructor" ? (
                        <>
                            <div className="flex md:flex-row items-center justify-between gap-2">
                                <div className="form-control w-full md:w-1/2">
                                    <label className="label">
                                        <strong className="label-text">
                                            User image
                                        </strong>
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
                                            className="input hidden"
                                            hidden
                                            accept="image/*"
                                        />
                                        <div className="btn btn-sm hover:bg-base-300 bg-base-200 dark:hover:bg-stone-800 dark:bg-base-300 border-0 w-full md:w-auto">
                                            {imageButtonText}
                                        </div>
                                    </label>
                                </div>
                                <div className="form-control w-full md:w-1/2">
                                    <label className="label">
                                        <strong className="label-text">
                                            Cover image
                                        </strong>
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
                                            className="input hidden"
                                            hidden
                                            accept="image/*"
                                        />
                                        <div className="btn btn-sm hover:bg-base-300 bg-base-200 dark:hover:bg-stone-800 dark:bg-base-300 border-0 w-full md:w-auto">
                                            {coverImageButtonText}
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between gap-2">
                                <div className="form-control w-full md:w-1/2">
                                    <label className="label">
                                        <strong className="label-text">
                                            Quote
                                        </strong>
                                    </label>
                                    <input
                                        type="text"
                                        name="quote"
                                        defaultValue={userDetails?.quote}
                                        placeholder="Enter your quote"
                                        className="input placeholder:text-gray-500"
                                    />
                                </div>
                                <div className="form-control w-full md:w-1/2">
                                    <label className="label">
                                        <strong className="label-text">
                                            Gender
                                        </strong>
                                    </label>
                                    <label>
                                        <select
                                            name="gender"
                                            onChange={handleSelectGender}
                                            defaultValue={
                                                userDetails?.gender ?? ""
                                            }
                                            className="input select font-light text-base text-gray-500 w-full max-w-xs"
                                        >
                                            <option value="" disabled hidden>
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
                        <div className="flex flex-col md:flex-row justify-between gap-2">
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <strong className="label-text">
                                        User image
                                    </strong>
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
                                        className="input hidden"
                                        hidden
                                        accept="image/*"
                                    />
                                    <div className="btn btn-sm hover:bg-base-300 bg-base-200 dark:hover:bg-stone-800 dark:bg-base-300 border-0 w-full md:w-auto">
                                        {imageButtonText}
                                    </div>
                                </label>
                            </div>
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <strong className="label-text">
                                        Gender
                                    </strong>
                                </label>
                                <label>
                                    <select
                                        name="gender"
                                        value={selectedGender}
                                        onChange={(e) => {
                                            setSelectedGender(e.target.value);
                                            handleSelectGender(e);
                                        }}
                                        className="input select font-light text-base text-gray-500 w-full max-w-xs border-0"
                                    >
                                        <option value="" disabled hidden>
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
                            className="btn btn-md text-md rounded-md lg:border-0 w-full md:w-auto border dark:disabled:bg-stone-900 disabled:bg-stone-400 bg-base-200 dark:hover:bg-stone-800 dark:bg-base-300  disabled:border-stone-600"
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
