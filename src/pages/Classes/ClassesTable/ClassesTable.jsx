/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from "react";
import ClassesTableHead from "./ClassesTableHead";
import { getTotalClasses } from "../../../api/api";
import { GiTeacher } from "react-icons/gi";
import { MdLibraryAdd } from "react-icons/md";
import { bookClass, getBookedClasses } from "../../../api/bookApi";
import { AuthContext } from "../../../providers/AuthProvider";
import { getUserData } from "../../../api/authApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ClassesTable = ({ classes, tableRef }) => {
  const [totalClasses, setTotalClasses] = useState({});
  const { user, booking, setBooking, loading } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({});
  const [userLoading, setUserLoading] = useState(false);
  const [userBookings, setUserBookings] = useState([]);
  const [bookedClasses, setBookedClasses] = useState([]);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const unpaid = userBookings?.filter(
    (booking) => booking.paymentStatus === "unpaid"
  );
  const paid = userBookings?.filter(
    (booking) => booking.paymentStatus === "paid"
  );

  useEffect(() => {
    getTotalClasses()
      .then((data) => {
        setTotalClasses(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (user && user.email) {
      setUserLoading(true);
      getUserData(user.email)
        .then((data) => {
          setUserDetails(data);
          setUserLoading(false);
        })
        .catch((error) => console.error(error));
    } else if (!user) {
      setUserDetails({});
    }
  }, [user]);

  useEffect(() => {
    if (user && user.email && userDetails._id) {
      getBookedClasses(userDetails._id)
        .then((data) => {
          setUserBookings(data);
        })
        .catch((error) => console.error(error));
    } else if (!user) {
      setUserBookings(null);
      setBookedClasses(null);
      setEnrolledClasses(null);
    }
  }, [userDetails, userBookings]);

  useEffect(() => {
    if (unpaid?.length > 0) {
      const bookedClassNames = unpaid.map((booking) => booking["class-name"]);
      setBookedClasses(bookedClassNames);
    }
    if (paid?.length > 0) {
      const enrolledClassNames = paid.map((booking) => booking["class-name"]);
      setEnrolledClasses(enrolledClassNames);
    }
  }, [userBookings, user]);

  return (
    <>
      {classes?.length == 0 ? (
        <div className="text-5xl flex justify-center py-28">
          <h1>No results found for your search</h1>
        </div>
      ) : (
        <div ref={tableRef} className="overflow-x-auto pt-10">
          <div className="mb-5 flex gap-2 text-white description text-xl">
            <strong className="flex items-center gap-2">
              <GiTeacher className="text-2xl" />
              <span>Courses Count :</span>
            </strong>{" "}
            {totalClasses.totalClasses}
          </div>
          <table className="table text-center description text-white">
            {/* head */}
            <ClassesTableHead
              loading={loading}
              userLoading={userLoading}
              userDetails={userDetails}
            />
            <tbody className="text-xl">
              {classes.map((classItem, index) => {
                const availableSeat =
                  classItem?.studentSlot - classItem?.totalStudent;
                const isBooked =
                  bookedClasses && bookedClasses.includes(classItem?.name);
                const isEnrolled =
                  enrolledClasses && enrolledClasses.includes(classItem?.name);

                const handleBook = () => {
                  if (!user) {
                    toast.warning("To book courses, you have to login first", {
                      position: "top-center",
                      autoClose: 1100,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                    });
                    setTimeout(function () {
                      window.location.replace("/login");
                    }, 2000);
                  } else if (user && !isBooked) {
                    bookClass(
                      userDetails._id,
                      classItem.instructorId,
                      user.email,
                      user.displayName,
                      classItem.classIndex
                    );
                    setBooking(!booking);
                    toast.success(`"${classItem.name}" has been booked`, {
                      position: "top-center",
                      autoClose: 1100,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                    });
                  }
                };

                return (
                  <tr
                    className={availableSeat == 0 && "bg-red-950"}
                    key={classItem?._id}
                  >
                    <td>{index + 1}</td>
                    <td className="flex justify-center">
                      <img
                        className="w-32 rounded-xl h-16"
                        src={classItem?.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </td>
                    <td>
                      <div>
                        <div className="font-bold">{classItem?.name}</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <Link
                          to={`/instructor/${classItem?.instructorId}`}
                          className="font-bold"
                        >
                          {classItem?.instructorName}
                        </Link>
                      </div>
                    </td>
                    <td>
                      {availableSeat == 0 ? "Fully Booked" : availableSeat}
                    </td>
                    <td>$ {classItem?.price}</td>
                    {userDetails.role !== "Instructor" &&
                      !loading &&
                      !userLoading && (
                        <td>
                          {isBooked ? (
                            "Booked"
                          ) : isEnrolled ? (
                            availableSeat == 0 ? (
                              <div className="text-red-500">Enrolled</div>
                            ) : (
                              "Enrolled"
                            )
                          ) : (
                            <button
                              onClick={handleBook}
                              disabled={
                                availableSeat == 0 ||
                                userDetails.role == "Instructor" ||
                                isBooked ||
                                isEnrolled
                              }
                              className={`${
                                availableSeat == 0
                                  ? "disabled:bg-red-900"
                                  : "disabled:bg-stone-900"
                              } btn text-white btn-sm rounded-lg hover:bg-stone-700 bg-stone-800`}
                            >
                              <MdLibraryAdd /> <span>Book Course</span>
                            </button>
                          )}
                        </td>
                      )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ClassesTable;
