import ActiveLink from "../../../ui/ActiveLink";
import ThemeToggle from "../../../ui/ThemeToggle/ThemeToggle";

const Routes = ({ props }) => {
    const { user, myWallRoute, userDetails } = props;

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
                <ThemeToggle />
            </div>
        </div>
    );
};

export default Routes;
