import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Main from "./layout/Main";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Login from "./pages/Authentication/Login/Login";
import Register from "./pages/Authentication/Register/Register";
import Instructors from "./pages/Instructors/Instructors";
import Classes from "./pages/Classes/Classes";
import AuthProvider from "./providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./layout/Dashboard";
import PrivateRoute from "./privateRoute/PrivateRoute";
import MyProfile from "./pages/MyProfile/MyProfile";
import SingleInstructorsClasses from "./pages/SingleInstructorsClasses/SingleInstructorsClasses";
import SelectedClasses from "./pages/SelectedClasses/SelectedClasses";
import PaymentConfirmation from "./pages/SelectedClasses/PaymentConfirmation";
import EnrolledClass from "./pages/EnrolledClass/EnrolledClass";
import PaymentHistory from "./pages/PaymentHistory/PaymentHistory";
import InstructorRegister from "./pages/Authentication/InstructorRegister/InstructorRegister";
import AddClass from "./pages/AddClass/AddClass";
import Legal from "./pages/Legal/Legal";
import RoleRoute from "./roleRoute/RoleRoute";
import MyCourses from "./pages/MyCourses/MyCourses";
import MyStudents from "./pages/MyCourses/MyCoursesTable/MyStudents/MyStudents";
import ScreenSizeProvider from "./providers/ScreenSizeProvider";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "about-us",
                element: <AboutUs></AboutUs>,
            },
            {
                path: "login",
                element: <Login></Login>,
            },
            {
                path: "register",
                element: <Register></Register>,
            },
            {
                path: "instructor-register",
                element: <InstructorRegister></InstructorRegister>,
            },
            {
                path: "instructors",
                element: <Instructors></Instructors>,
            },
            {
                path: "classes",
                element: <Classes></Classes>,
            },
            {
                path: "instructor/:id",
                element: (
                    <PrivateRoute>
                        <SingleInstructorsClasses></SingleInstructorsClasses>
                    </PrivateRoute>
                ),
                loader: ({ params }) =>
                    fetch(
                        `${import.meta.env.VITE_API_URL}/instructor/${
                            params.id
                        }`
                    ),
            },
            {
                path: "legal",
                element: <Legal></Legal>,
            },
        ],
    },
    {
        path: "dashboard",
        element: (
            <PrivateRoute>
                <Dashboard></Dashboard>
            </PrivateRoute>
        ),
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "profile",
                element: <MyProfile></MyProfile>,
            },
            {
                path: "selected-classes",
                element: (
                    <RoleRoute allowedRole="Student">
                        <SelectedClasses></SelectedClasses>
                    </RoleRoute>
                ),
            },
            {
                path: "payment/:studentId/:itemId",
                element: (
                    <RoleRoute allowedRole="Student">
                        <PaymentConfirmation></PaymentConfirmation>
                    </RoleRoute>
                ),
            },
            {
                path: "enrolled-classes",
                element: (
                    <RoleRoute allowedRole="Student">
                        <EnrolledClass></EnrolledClass>
                    </RoleRoute>
                ),
            },
            {
                path: "payment",
                element: (
                    <RoleRoute allowedRole="Student">
                        <PaymentHistory></PaymentHistory>
                    </RoleRoute>
                ),
            },
            {
                path: "add-class",
                element: (
                    <RoleRoute allowedRole="Instructor">
                        <AddClass></AddClass>
                    </RoleRoute>
                ),
            },
            {
                path: "my-classes",
                element: (
                    <RoleRoute allowedRole="Instructor">
                        <MyCourses></MyCourses>
                    </RoleRoute>
                ),
            },
            {
                path: "my-class/students/:id/:idx",
                element: (
                    <RoleRoute allowedRole="Instructor">
                        <MyStudents></MyStudents>
                    </RoleRoute>
                ),
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <ScreenSizeProvider>
                <RouterProvider router={router} />
                <ToastContainer
                    className=""
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    limit={2}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </ScreenSizeProvider>
        </AuthProvider>
    </React.StrictMode>
);
