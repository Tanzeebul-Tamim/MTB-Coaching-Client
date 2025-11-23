import { TbFidgetSpinner } from "react-icons/tb";
import useUpdateProfileForm from "./useUpdateProfileForm";
import PhoneInput from "react-phone-input-2";
import {
    isValidPhoneNumber,
    parsePhoneNumberFromString,
} from "libphonenumber-js";

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
        selectedGender,
        contactError,
        setContactError,
        isContactValid,
        setIsContactValid,
        country: existingCountry,
        setCountry,
    } = useUpdateProfileForm(userDetails);

    return (
        <dialog
            id="my_modal_3"
            className="modal text-base-content description"
            onClick={(e) => {
                // Only close if clicking the backdrop (not the form)
                if (e.target === e.currentTarget) {
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
                        isValidLength && !contactError
                            ? "text-base-content"
                            : "text-red-500"
                    } text-center`}
                >
                    {!isSmallDevice &&
                        (isValidLength && !contactError
                            ? "Press esc to cancel"
                            : !isValidLength
                            ? `Quote is too long! Max ${quoteMaxLength} characters`
                            : contactError)}
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
                            className="input placeholder:text-gray-500 border-gray-500 border-opacity-50 lg:border-0"
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
                                className="input placeholder:text-gray-500 border-gray-500 border-opacity-50 lg:border-0"
                            />
                        </div>

                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <strong className="label-text">
                                    Contact no{" "}
                                    {existingCountry ? (
                                        <span
                                            title={
                                                existingCountry?.name?.length >
                                                    13 || isSmallDevice
                                                    ? existingCountry?.name
                                                    : existingCountry?.code
                                            }
                                            className="text-primary"
                                        >
                                            {existingCountry?.name && (
                                                <>
                                                    {isSmallDevice
                                                        ? `(${existingCountry?.code})`
                                                        : existingCountry?.name
                                                              ?.length <= 13
                                                        ? `(${existingCountry?.name})`
                                                        : `(${existingCountry?.code})`}
                                                </>
                                            )}
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </strong>
                                <span
                                    className={`lg:hidden text-xs lg:text-sm description text-red-600 ${
                                        contactError && "visible"
                                    }`}
                                >
                                    {contactError}
                                </span>
                            </label>

                            <PhoneInput
                                country={"auto"}
                                value={userDetails?.contactNo}
                                searchPlaceholder={`${
                                    isSmallDevice ? "" : "🔎 "
                                }Search Country...`}
                                onChange={(value, country) => {
                                    const phoneWithPlus = value.startsWith("+")
                                        ? value
                                        : "+" + value;
                                    const phone =
                                        parsePhoneNumberFromString(
                                            phoneWithPlus
                                        );
                                    setCountry({
                                        name: country?.name,
                                        code: phone?.country,
                                    });
                                    const valid =
                                        isValidPhoneNumber(phoneWithPlus);
                                    setIsContactValid(valid);
                                    if (value) {
                                        if (valid) {
                                            setContactError("");
                                        } else {
                                            if (country?.name) {
                                                setContactError(
                                                    `Invalid number for ${
                                                        country.name.length > 13
                                                            ? phone?.country
                                                            : country?.name
                                                    }`
                                                );
                                            } else {
                                                setContactError(
                                                    "Invalid number"
                                                );
                                            }
                                        }
                                    } else {
                                        setContactError("");
                                    }
                                }}
                                inputProps={{
                                    name: "contact", // not used by monitorChange
                                    required: true,
                                    placeholder: "Enter your contact no",
                                    className:
                                        "input placeholder:text-gray-500 border-gray-500 border-opacity-50 lg:border-0 lg:pl-10 pl-12 description",
                                    style: {
                                        minHeight: "40px",
                                        borderRadius: "0.5rem",
                                        width: "100%",
                                        zIndex: 1001,
                                    },
                                }}
                                containerClass="w-full"
                                buttonStyle={{
                                    background: "transparent",
                                    border: "none",
                                    zIndex: 1002,
                                }}
                                dropdownStyle={{
                                    background: "#d1d5db",
                                    borderRadius: "0.5rem",
                                    zIndex: 2000,
                                }} // gray-300
                                searchStyle={{
                                    background: "#fff",
                                    borderRadius: "0.5rem",
                                    zIndex: 2001,
                                }}
                                enableAreaCodes={true}
                                enableSearch={true}
                                disableCountryCode={false}
                                disableDropdown={false}
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
                                        <div className="btn btn-sm hover:bg-base-300 bg-base-200 dark:hover:bg-stone-800 dark:bg-base-300 border-0 w-full">
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
                                        <div className="btn btn-sm hover:bg-base-300 bg-base-200 dark:hover:bg-stone-800 dark:bg-base-300 border-0 w-full">
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
                                        className="input placeholder:text-gray-500 border-gray-500 border-opacity-50 lg:border-0"
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
                                            value={selectedGender}
                                            className={`${
                                                !selectedGender &&
                                                "text-gray-500"
                                            } input select font-light text-base w-full max-w-xs border-gray-500 border-opacity-50 lg:border-0`}
                                        >
                                            <option value="" hidden>
                                                Enter your gender
                                            </option>
                                            <option
                                                className="text-base-content"
                                                value="Male"
                                            >
                                                Male
                                            </option>
                                            <option
                                                className="text-base-content"
                                                value="Female"
                                            >
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
                                        onChange={handleSelectGender}
                                        value={selectedGender}
                                        className={`${
                                            !selectedGender && "text-gray-500"
                                        } input select font-light text-base w-full max-w-xs border-gray-500 border-opacity-50 lg:border-0`}
                                    >
                                        <option value="" hidden>
                                            Enter your gender
                                        </option>
                                        <option
                                            className="text-base-content"
                                            value="Male"
                                        >
                                            Male
                                        </option>
                                        <option
                                            className="text-base-content"
                                            value="Female"
                                        >
                                            Female
                                        </option>
                                    </select>
                                </label>
                            </div>
                        </div>
                    )}

                    <div className="form-control mt-6">
                        <button
                            disabled={btnStatus || loading2 || !isContactValid}
                            type="submit"
                            className={`btn btn-md text-md rounded-md lg:border-0 w-full md:w-auto dark:disabled:bg-stone-900 disabled:bg-stone-400 bg-base-200 dark:hover:bg-stone-800 dark:bg-base-300 ${
                                loading2 &&
                                "dark:disabled:text-stone-400 disabled:text-stone-600"
                            }`}
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
