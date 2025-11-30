import { IoIosArrowDown } from "react-icons/io";
import ActiveLink from "../../../../../ui/ActiveLink";

const Routes = ({ props }) => {
    const { user, myWallRoute, userDetails, dropdownOpen, setDropdownOpen } =
        props;

    return (
        <div
            className="flex nav-btn glow-effect py-3 px-6 rounded-full gap-5 tracking-[2px] text-xl items-center"
        >
            <ActiveLink dark={true} to="/">
                <div>Home</div>
            </ActiveLink>
            <ActiveLink dark={true} to="/instructors">
                <div>Instructors</div>
            </ActiveLink>
            <ActiveLink dark={true} to="/classes">
                <div>Courses</div>
            </ActiveLink>
            <ActiveLink dark={true} to="/about-us">
                <div>About Us</div>
            </ActiveLink>
            {user && (
                <ActiveLink dark={true} to="/dashboard/profile">
                    <div>Dashboard</div>
                </ActiveLink>
            )}
            {userDetails?.role === "Instructor" && (
                <ActiveLink dark={true} to={myWallRoute}>
                    <div
                        className={
                            location.pathname === myWallRoute && "text-primary"
                        }
                    >
                        My Wall
                    </div>
                </ActiveLink>
            )}
            <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
            >
                <button
                    className="rounded-full glow-effect h-7 w-7 custom-cursor-pointer bg-primary text-accent bg-opacity-60 flex items-center justify-center outline-none"
                    aria-label="Open options menu"
                    tabIndex={0}
                >
                    <div
                        className={`hover:scale-125 transition-transform duration-300 ease-in-out ${
                            dropdownOpen ? "rotate-180" : ""
                        }`}
                    >
                        <IoIosArrowDown className="text-xl" />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Routes;
