import { getUserData } from "../../api/authApi";
import { useState } from "react";
import { useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import useTitle from "../../Helmet/useTitle";
import UpdateProfileForm from "./UpdateProfileForm";
import DashboardPageTitle from "../../shared_components/DashboardPageTitle/DashboardPageTitle";
import ChangePassword from "./ChangePassword";
import useAuth from "../../hooks/useAuth";

const MyProfile = () => {
    const { user } = useAuth();
    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const firstName = userDetails?.name?.split(" ")[0];
    const title = firstName ? `${firstName}'s` : "My";
    useTitle(`| ${title} Profile`);

    useEffect(() => {
        setLoading(true);
        getUserData(user.email)
            .then((data) => {
                setUserDetails(data);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, [user]);

    if (loading) {
        return (
            <div
                style={{ height: "400px" }}
                className="flex justify-center items-center"
            >
                <PropagateLoader color="rgb(234 179 8)" />
            </div>
        );
    }

    return (
        <>
            <DashboardPageTitle title={"My Profile"} />
            <div className="flex mt-[35%] lg:mt-0 flex-col md:flex-row mb-10 px-2 md:px-5 gap-6 md:gap-10 items-center justify-center md:justify-start w-full">
                <img
                    className="z-[10] w-32 h-32 md:w-[200px] md:h-[200px] border-zinc-400 border-[3px] lg:border-[4px] shadow-2xl rounded-full object-cover"
                    src={user.photoURL}
                    alt=""
                />
                <div className="bg-base-100 bg-opacity-70 w-full max-w-xl p-3 md:p-4 rounded-2xl">
                    <div className="description gap-2 md:gap-3 text-base md:text-xl flex justify-center flex-col text-left mb-4">
                        <p className="z-[10]">
                            <strong>Name :</strong> {user?.displayName}
                        </p>
                        <p className="z-[10]">
                            <strong>Email :</strong> {user?.email}
                        </p>
                        {userDetails.gender && (
                            <p className="z-[10]">
                                <strong>Gender :</strong> {userDetails?.gender}
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
                                onClick={() => window.my_modal_3.showModal()}
                                className="btn btn-sm rounded-xl bg-stone-700 hover:bg-stone-800 w-full sm:w-auto"
                            >
                                Update Profile Info
                            </button>
                            <button
                                onClick={() => window.my_modal_1.showModal()}
                                className="btn btn-sm rounded-xl bg-stone-700 hover:bg-stone-800 w-full sm:w-auto"
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <UpdateProfileForm userDetails={userDetails}></UpdateProfileForm>
            <ChangePassword></ChangePassword>
        </>
    );
};

export default MyProfile;
