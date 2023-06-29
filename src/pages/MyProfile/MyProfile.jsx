import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { getUserData } from "../../api/authApi";
import { useState } from "react";
import { useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import useTitle from "../../Helmet/useTitle";
import UpdateProfileForm from "./UpdateProfileForm";
import DashboardPageTitle from "../../shared_components/DashboardPageTitle/DashboardPageTitle";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);
  useTitle("| My Profile");

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
      <div className="flex mb-10 px-5 gap-10 items-center justify-start ">
        <img
          className="z-[10] w-[200px] h-[200px] border-zinc-400 lg:border-[4px] shadow-2xl rounded-full"
          src={user.photoURL}
          alt=""
        />
        <div className="bg-base-100 bg-opacity-70 w-full p-4 rounded-2xl">
          <div className="description gap-3 text-xl flex justify-center flex-col text-left mb-4">
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
                <strong>Address :</strong> {userDetails?.address}
              </p>
            )}
            {userDetails.contactNo && (
              <p className="z-[10]">
                <strong>Contact no :</strong> {userDetails?.contactNo}
              </p>
            )}
            {userDetails.role == "Instructor" && userDetails.quote && (
              <p className="z-[10]">
                <strong>Quote :</strong> {userDetails?.quote}
              </p>
            )}
            <p className="z-[10]">
              <strong>Account Type :</strong> {userDetails?.role || "Student"}
            </p>
            <div className="z-[10] mt-3">
              <button
                onClick={() => window.my_modal_3.showModal()}
                className="btn btn-sm rounded-xl bg-stone-700 hover:bg-stone-800"
              >
                Update Profile Info
              </button>
            </div>
          </div>
        </div>
      </div>
      <UpdateProfileForm userDetails={userDetails}></UpdateProfileForm>
    </>
  );
};

export default MyProfile;
