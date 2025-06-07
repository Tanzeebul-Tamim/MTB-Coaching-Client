import ActiveLink from "../../activeLink/ActiveLink";
import { CgMenuGridO } from "react-icons/cg";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { SlNote } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";
import { AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineSchool, MdShoppingCart } from "react-icons/md";
import { LuLayoutDashboard, LuScale } from "react-icons/lu";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { getUserData } from "../../api/authApi";
import { getBookedClasses } from "../../api/bookApi";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut, loading, booking } = useAuth();
  const [userDetails, setUserDetails] = useState({});
  const [userBookings, setUserBookings] = useState([]);
  const location = useLocation();
  const checkPrivatePath = location.pathname === "/" ||
      location.pathname === "/instructors" ||
      location.pathname === "/classes" ||
      location.pathname === "/legal" ||
      location.pathname === "/about-us";

  if (!user && checkPrivatePath) {
    localStorage.setItem("location", location.pathname);
  }

  useEffect(() => {
    if (user && user.email) {
      getUserData(user.email)
        .then((data) => {
          setUserDetails(data);
        })
        .catch((error) => console.error(error));
    }
  }, [user]);

  useEffect(() => {
    if (user && user.email && userDetails._id) {
      getBookedClasses(userDetails._id)
        .then((data) => {
          const filteredBookings = data.filter(
            (booking) => booking.paymentStatus === "unpaid"
          );
          setUserBookings(filteredBookings);
        })
        .catch((error) => console.error(error));
    } else if (!user) {
      setUserDetails({});
      setUserBookings([]);
    }
  }, [user, userDetails._id, booking]);

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => console.error(error));
  };

  return (
    <div className="from-transparent to-black bg-gradient-to-t fixed z-[1500] gap-5 navbar px-5 lg:px-10 lg:py-8 transition ease-in-out">
      <div className="navbar-start gap-1 lg:gap-6 flex items-center">
        <div
          className={`mt-2 flex flex-col bg-opacity-80 absolute duration-300 uppercase ${
            open ? "top-10 right-5" : "top-10 -right-[150px]"
          } lg:hidden z-10 py-2 px-4 bg-base-100 rounded-md`}
        >
          <ActiveLink
            to="/"
            className="gap-2 mb-2 text-sm text-white hover:text-yellow-400"
          >
            <span className="flex items-center gap-1">
              <AiOutlineHome className="text-xs" />
              Home
            </span>
          </ActiveLink>
          <ActiveLink
            to="/instructors"
            className="block mb-2 text-sm text-white hover:text-yellow-400"
          >
            <span className="flex items-center gap-1">
              <FaChalkboardTeacher className="text-xs" />
              Instructors
            </span>
          </ActiveLink>
          <ActiveLink
            to="/classes"
            className="block mb-2 text-sm text-white hover:text-yellow-400"
          >
            <span className="flex items-center gap-1">
              <MdOutlineSchool className="text-xs" />
              Courses
            </span>
          </ActiveLink>
          {user && (
            <ActiveLink
              to="/dashboard/profile"
              className="block text-sm text-white hover:text-yellow-400"
            >
              <span className="flex items-center gap-1">
                <LuLayoutDashboard className="text-xs" />
                Dashboard
              </span>
            </ActiveLink>
          )}
          <ActiveLink
            to="/about-us"
            className="block text-sm text-white hover:text-yellow-400"
          >
            <span className="flex items-center gap-1">
              <AiOutlineInfoCircle className="text-xs" />
              About Us
            </span>
          </ActiveLink>
          <ActiveLink
            to="/legal"
            className="block text-sm text-white hover:text-yellow-400"
          >
            <span className="flex items-center gap-1">
              <LuScale className="text-xs" />
              Legal
            </span>
          </ActiveLink>
          <ActiveLink
            to="/login"
            className="block text-sm text-white hover:text-yellow-400"
          >
            <span className="flex items-center gap-1">
              <FiLogIn className="text-xs" />
              Login
            </span>
          </ActiveLink>
          <ActiveLink
            to="/register"
            className="block text-sm text-white hover:text-yellow-400"
          >
            <span className="flex items-center gap-1">
              <SlNote className="text-xs" />
              Register
            </span>
          </ActiveLink>
        </div>
        <Link to="/">
          <img
            className="lg:w-[400px] hover:scale-110 duration-200"
            src="/MTB_Coaching.png"
            alt="Logo"
          />
        </Link>
      </div>

      <div className="navbar-center uppercase lg:block hidden">
        <div className="flex nav-btn glow-effect py-3 px-6 rounded-full gap-5 tracking-[2px] text-xl">
          <ActiveLink className="hover:text-yellow-400" to="/">
            <div>Home</div>
          </ActiveLink>
          <ActiveLink className="hover:text-yellow-400" to="/instructors">
            <div>Instructors</div>
          </ActiveLink>
          <ActiveLink className="hover:text-yellow-400" to="/classes">
            <div>Courses</div>
          </ActiveLink>
          {user && (
            <ActiveLink
              className="hover:text-yellow-400"
              to="/dashboard/profile"
            >
              <div>Dashboard</div>
            </ActiveLink>
          )}
          <ActiveLink className="hover:text-yellow-400" to="/about-us">
            <div>About Us</div>
          </ActiveLink>
        </div>
      </div>
      {user ? (
        <div className="navbar-end uppercase gap-7 lg:flex hidden">
          <button
            onClick={handleLogOut}
            className="hover:scale-110 duration-200 text-yellow-400 font-light text-xl"
          >
            <div className="flex tracking-[2px] items-center gap-2">
              <FiLogOut />
              <span className="text-xl uppercase">Logout</span>
            </div>
          </button>
          <Link
            to="/dashboard/profile"
            data-tip={user?.displayName}
            className="tooltip tooltip-bottom tooltip-warning"
          >
            {user.photoURL ? (
              <div className="hover:scale-110 duration-200 flex flex-col items-center">
                <div className="indicator">
                  <img
                    className="rounded-full glow-effect cursor-pointer w-[55px] h-[55px]"
                    src={user?.photoURL}
                  />
                  {userBookings.length >= 1 && (
                    <span className="badge flex gap-1 badge-md badge-warning title indicator-item">
                      <MdShoppingCart className="text-lg" />
                      <span>{userBookings?.length}</span>
                    </span>
                  )}
                </div>
                <h1 className="text-yellow-400 text-sm">My Profile</h1>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <img
                  className="rounded-full glow-effect cursor-pointer w-[55px] h-[55px]"
                  src="/user_avatar.png"
                />
                <h1 className="text-yellow-400 text-sm">My Profile</h1>
              </div>
            )}
          </Link>
        </div>
      ) : loading ? (
        <div className="navbar-end uppercase gap-5 lg:flex hidden">
          <div className="text-transparent w-1/6 rounded-md opacity-25 border-yellow-400 border bg-transparent">
            a
          </div>
          <div className="text-transparent w-1/6 rounded-md opacity-25 border-white border bg-transparent">
            a
          </div>
        </div>
      ) : (
        <div className="navbar-end uppercase gap-5 lg:flex hidden">
          <Link
            to="/login"
            className="hover:scale-110 duration-200 font-light text-yellow-400 text-xl"
          >
            <div className="flex tracking-[2px] items-center gap-2">
              <FiLogIn />
              <span className="text-xl">Login</span>
            </div>
          </Link>
          <Link
            to="/register"
            className="hover:scale-110 duration-200 text-white font-light text-xl"
          >
            <div className="flex tracking-[2px] items-center gap-2">
              <SlNote />
              <span className="text-xl">Register</span>
            </div>
          </Link>
        </div>
      )}
      <div className="navbar-end flex gap-2 lg:hidden">
        {loading ? (
          <div>
            <img
              className="h-[35px] w-[35px] rounded-full"
              src="/user_avatar.png"
              alt=""
            />
          </div>
        ) : !loading && user ? (
          <Link
            to="/dashboard/profile"
            data-tip={user?.displayName}
            className="tooltip tooltip-bottom tooltip-warning"
          >
            {userBookings.length >= 1 && (
              <span className="absolute right-[8.5vw] -top-[1vw] badge flex gap-[2px] badge-md badge-warning title indicator-item">
                <MdShoppingCart />
                <span className="text-[0.65rem]">{userBookings?.length}</span>
              </span>
            )}
            <img
              className="h-[42.5px] w-[42.5px] rounded-full"
              src={user?.photoURL}
              alt=""
            />
          </Link>
        ) : (
          ""
        )}
        <div onClick={() => setOpen(!open)}>
          {open ? <IoMdClose /> : <CgMenuGridO />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
