import useTitle from "../../hooks/useTitle";
import UpdateProfileForm from "./UpdateProfileForm/UpdateProfileForm";
import DashboardPageTitle from "../../components/ui/DashboardPageTitle";
import useAuth from "../../hooks/useAuth";
import SklMyProfile from "../../components/skeletons/SklMyProfile";
import ImageWithLoader from "../../components/ui/ImageWithLoader";
import useUserData from "../../hooks/useUserData";
import ChangePassword from "./ChangePassword/ChangePassword";

const MyProfile = () => {
    const { user } = useAuth();
    const { loading, userDetails } = useUserData();
    const firstName = userDetails?.name?.split(" ")[0];
    const title = firstName ? `${firstName}'s` : "My";
    useTitle(`| ${title} Profile`);

    return (
        <>
            <DashboardPageTitle title={"My Profile"} />
            {loading ? (
                <SklMyProfile />
            ) : (
                <>
                    <div className="flex mt-[35%] lg:mt-0 flex-col md:flex-row mb-10 px-2 md:px-5 gap-6 md:gap-10 items-center justify-center w-full">
                        <ImageWithLoader
                            className="z-[10] w-32 h-32 md:w-[200px] md:h-[200px] dark:border-zinc-400 border-zinc-300 border-[3px] lg:border-[4px] shadow-2xl rounded-full object-cover"
                            src={userDetails?.image || user?.photoURL}
                            alt=""
                        />
                        <div className="bg-base-100 bg-opacity-70 w-full p-3 md:p-4 rounded-2xl">
                            <div className="description gap-2 md:gap-3 text-base text-base-content md:text-xl flex justify-center flex-col text-left mb-4">
                                <p className="z-[10]">
                                    <strong>Name :</strong> {userDetails?.name}
                                </p>
                                <p className="z-[10]">
                                    <strong>Email :</strong> {userDetails?.email}
                                </p>
                                {userDetails.gender && (
                                    <p className="z-[10]">
                                        <strong>Gender :</strong>{" "}
                                        {userDetails?.gender}
                                    </p>
                                )}
                                {userDetails.address && (
                                    <p className="z-[10]">
                                        <strong>Address :</strong>{" "}
                                        {userDetails?.address}
                                    </p>
                                )}
                                {userDetails.contactNo && (
                                    <p className="z-[10]">
                                        <strong>Contact no :</strong>{" "}
                                        {userDetails?.contactNo}
                                    </p>
                                )}
                                {userDetails.role == "Instructor" &&
                                    userDetails.quote && (
                                        <p className="z-[10]">
                                            <strong>Quote :</strong>{" "}
                                            {userDetails?.quote}
                                        </p>
                                    )}
                                <p className="z-[10]">
                                    <strong>Account Type :</strong>{" "}
                                    {userDetails?.role || "Student"}
                                </p>
                                <div className="z-[10] mt-3 flex flex-col sm:flex-row gap-2 w-full">
                                    <button
                                        onClick={() =>
                                            window.my_modal_3.showModal()
                                        }
                                        className="btn btn-sm rounded-xl hover:bg-base-300 bg-base-200 dark:hover:bg-stone-800 dark:bg-base-300 border-0 w-full sm:w-auto"
                                    >
                                        Update Profile Info
                                    </button>
                                    <button
                                        onClick={() =>
                                            window.my_modal_1.showModal()
                                        }
                                        className="btn btn-sm rounded-xl hover:bg-base-300 bg-base-200 dark:hover:bg-stone-800 dark:bg-base-300 border-0 w-full sm:w-auto"
                                    >
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <UpdateProfileForm userDetails={userDetails} />
            <ChangePassword />
        </>
    );
};

export default MyProfile;
