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
        user,
    } = useUpdateProfileForm(userDetails);

    return (
        <dialog
            id="my_modal_3"
            className="modal text-white description"
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
                className="modal-box bg-opacity-80 border border-gray-500"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
            >
                <h1 className="z-[10] text-white lg:text-2xl text-lg lg:tracking-[9px] tracking-[5px] text-center uppercase font-extrabold">
                    Update Profile
                </h1>
                <p
                    className={`z-[10] mt-1 ${
                        isValidLength ? "text-white" : "text-red-500"
                    } text-center`}
                >
                    {isValidLength
                        ? "Press esc to cancel"
                        : `Quote is too long! Max ${quoteMaxLength} characters`}
                </p>

                <div className="card-body p-0 md:p-6">
                    <div className="form-control">
                        <label className="label">
                            <strong className="label-text">Name</strong>
                        </label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={user?.displayName}
                            placeholder="Enter your name"
                            className="input input-bordered"
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
                                className="input input-bordered"
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
                                className="input input-bordered"
                            />
                        </div>
                    </div>

                    {userDetails.role === "Instructor" ? (
                        <>
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
                                            className="input input-bordered hidden"
                                            hidden
                                            accept="image/*"
                                        />
                                        <div className="btn btn-sm hover:bg-stone-800 bg-stone-700 w-full md:w-auto">
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
                                            className="input input-bordered hidden"
                                            hidden
                                            accept="image/*"
                                        />
                                        <div className="btn btn-sm hover:bg-stone-800 bg-stone-700 w-full md:w-auto">
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
                                        className="input input-bordered"
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
                        <div className="flex flex-col md:flex-row justify-between gap-2">
                            <div className="form-control w-full md:w-1/2">
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
                                    <div className="btn btn-sm hover:bg-stone-800 bg-stone-700 w-full md:w-auto">
                                        {imageButtonText}
                                    </div>
                                </label>
                            </div>
                            <div className="form-control w-full md:w-1/2">
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
                            className="btn btn-md disabled:bg-stone-900 text-md rounded-md bg-stone-700 hover:bg-stone-800 w-full md:w-auto border disabled:border-stone-600"
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
