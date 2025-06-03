import { GiTeacher } from "react-icons/gi";
import SelectedClassesTableHead from "./SelectedClassesTableHead";
import { BsFillCreditCardFill, BsFillTrash3Fill } from "react-icons/bs";
import { deleteAllClass, deleteClass } from "../../../api/bookApi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const SelectedClassesTable = ({ userBookings, userDetails }) => {
  const handleClearList = () => {
    Swal.fire({
      title: "Are you sure you want to clear your booking list?",
      text: "You won't be able to revert this!",
      icon: "warning",
      color: "white",
      iconColor: "rgb(234 179 8)",
      showCancelButton: true,
      confirmButtonColor: "rgb(234 179 8)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear list!",
      background: "#201e1e",
      backdrop: "#00000",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Booking List has been Cleared!",
          icon: "success",
          color: "white",
          iconColor: "lightgreen",
          confirmButtonColor: "lightgreen",
          confirmButtonText: "OK",
          background: "#201e1e",
          backdrop: "#00000",
        });
        deleteAllClass(userDetails._id);
      }
    });
  };

  if (userBookings?.length === 0) {
    return (
      <div className="flex h-[55vh] items-center justify-center">
        <h1 className="z-[10] description text-5xl">
          You Haven&apos;t Booked Any Courses Yet
        </h1>
      </div>
    );
  }

  const updateProfile = () => {
    if (
      typeof userDetails.address === "undefined" ||
      typeof userDetails.contactNo === "undefined" ||
      userDetails.gender === "undefined"
    ) {
      toast.warning(
        "To purchase classes, you have to update your profile first!",
        {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      setTimeout(function () {
        window.location.replace("/dashboard/profile");
      }, 2400);
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-5 flex justify-between gap-2 text-white description text-xl">
        <strong className="z-[100] flex items-center gap-2">
          <GiTeacher className="text-2xl" />
          <span>Booked Courses Count :</span>
          <span>{userBookings?.length}</span>
        </strong>{" "}
        <button
          onClick={handleClearList}
          className="z-[100] btn text-white btn-xs text-sx border-0 rounded-lg hover:bg-stone-800 bg-stone-700"
        >
          <span>Clear List</span>
        </button>
      </div>
      <table className="z-[100] table text-center description text-white">
        {/* head */}
        <SelectedClassesTableHead />
        <tbody className="text-sm">
          {userBookings.map((classItem, index) => {
            const handleDelete = (studentId, instructorId, classIndex) => {
              deleteClass(studentId, instructorId, classIndex);
            };

            return (
              <tr className="" key={classItem._id}>
                <td>{index + 1}</td>
                <td className="flex justify-center">
                  <img
                    className="w-16 rounded-xl h-8"
                    src={classItem.classImage}
                  />
                </td>
                <td>
                  <div>
                    <div className="font-bold">{classItem["class-name"]}</div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold">{classItem.instructorName}</div>
                  </div>
                </td>
                <td>$ {classItem.classFee}</td>
                <td>
                  <Link
                    onClick={updateProfile}
                    to={
                      userDetails.address &&
                      userDetails.contactNo &&
                      userDetails.gender &&
                      `/dashboard/payment/${classItem.studentId}/${classItem._id}`
                    }
                    className="btn text-white btn-xs text-sx border-0 rounded-lg hover:bg-stone-800 bg-stone-700"
                  >
                    <BsFillCreditCardFill /> <span>Pay</span>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleDelete(
                        classItem.studentId,
                        classItem.instructorId,
                        classItem.classIndex
                      )
                    }
                    className="btn text-white btn-xs text-sx border-0 rounded-lg hover:bg-stone-800 bg-stone-700"
                  >
                    <BsFillTrash3Fill /> <span>Delete</span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SelectedClassesTable;
