import AboutUs from "../../pages/AboutUs/AboutUs";
import Login from "../../pages/Authentication/Login/Login";
import InstructorRegister from "../../pages/Authentication/Register/InstructorRegister";
import Register from "../../pages/Authentication/Register/Register";
import Classes from "../../pages/Classes/Classes";
import Faq from "../../pages/Faq/Faq";
import Home from "../../pages/Home/Home";
import Instructors from "../../pages/Instructors/Instructors";
import Legal from "../../pages/Legal/Legal";
import SingleInstructorsClasses from "../../pages/SingleInstructorsClasses/SingleInstructorsClasses";
import PrivateRoute from "../guard/PrivateRoute";

const mainRoutes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "about-us",
        element: <AboutUs />,
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "register",
        element: <Register />,
    },
    {
        path: "instructor-register",
        element: <InstructorRegister />,
    },
    {
        path: "instructors",
        element: <Instructors />,
    },
    {
        path: "classes",
        element: <Classes />,
    },
    {
        path: "instructors/:id",
        element: (
            <PrivateRoute>
                <SingleInstructorsClasses />
            </PrivateRoute>
        ),
        loader: ({ params }) =>
            fetch(`${import.meta.env.VITE_API_URL}/instructor/${params.id}`),
    },
    {
        path: "legal",
        element: <Legal />,
    },
    {
        path: "support",
        element: <Faq />,
    },
];

export default mainRoutes;