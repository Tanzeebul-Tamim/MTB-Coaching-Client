import { useLocation, useNavigate } from "react-router-dom";
import useGlowingTitle from "../../../../hooks/useGlowingTitle";
import useSoundEffects from "../../../../hooks/useSoundEffects";
import ActiveLink from "../../../ui/ActiveLink";
import ThemeToggle from "../../../ui/ThemeToggle/ThemeToggle";
import { BiSupport } from "react-icons/bi";

const Routes = ({ props }) => {
    const { user, myWallRoute, userDetails } = props;
    const { handleScrollGlow } = useGlowingTitle();
    const { play } = useSoundEffects();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const authenticationPage = [
        "/login",
        "/register",
        "/instructor-register",
    ].includes(pathname);

    return (
        <div className="navbar-center uppercase lg:block hidden">
            <div className="flex nav-btn glow-effect py-3 px-6 rounded-full gap-5 tracking-[2px] text-xl items-center">
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
                                location.pathname === myWallRoute &&
                                "text-primary"
                            }
                        >
                            My Wall
                        </div>
                    </ActiveLink>
                )}
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            if (authenticationPage) {
                                navigate("/");
                                setTimeout(() => {
                                    handleScrollGlow();
                                    setTimeout(() => play("alert"), 1000);
                                }, 300);
                            } else {
                                handleScrollGlow();
                                setTimeout(() => play("alert"), 1000);
                            }
                        }}
                        data-tip="Support Request"
                        className="rounded-full glow-effect h-7 w-7 custom-cursor-pointer bg-primary text-accent bg-opacity-60 flex items-center justify-center outline-none tooltip tooltip-bottom tooltip-secondary tool"
                        aria-label="Toggle dark mode"
                    >
                        <div className="hover:scale-125 transition-transform duration-700 ease-in-out">
                            <BiSupport className="text-xl" />
                        </div>
                    </button>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
};

export default Routes;
