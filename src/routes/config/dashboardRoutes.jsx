import AddClass from "../../pages/AddClass/AddClass";
import EnrolledClass from "../../pages/EnrolledClass/EnrolledClass";
import MyCourses from "../../pages/MyCourses/MyCourses";
import MyStudents from "../../pages/MyCourses/MyCoursesTable/MyStudents/MyStudents";
import MyProfile from "../../pages/MyProfile/MyProfile";
import PaymentHistory from "../../pages/PaymentHistory/PaymentHistory";
import PaymentConfirmation from "../../pages/SelectedClasses/PaymentConfirmation";
import SelectedClasses from "../../pages/SelectedClasses/SelectedClasses";
import RoleRoute from "../guard/RoleRoute";

const dashboardRoutes = [
    {
        path: "profile",
        element: <MyProfile />,
    },
    {
        path: "selected-classes",
        element: (
            <RoleRoute allowedRole="Student">
                <SelectedClasses />
            </RoleRoute>
        ),
    },
    {
        path: "selected-classes/:studentId/:itemId",
        element: (
            <RoleRoute allowedRole="Student">
                <PaymentConfirmation />
            </RoleRoute>
        ),
    },
    {
        path: "enrolled-classes",
        element: (
            <RoleRoute allowedRole="Student">
                <EnrolledClass />
            </RoleRoute>
        ),
    },
    {
        path: "payment",
        element: (
            <RoleRoute allowedRole="Student">
                <PaymentHistory />
            </RoleRoute>
        ),
    },
    {
        path: "add-class",
        element: (
            <RoleRoute allowedRole="Instructor">
                <AddClass />
            </RoleRoute>
        ),
    },
    {
        path: "my-classes",
        element: (
            <RoleRoute allowedRole="Instructor">
                <MyCourses />
            </RoleRoute>
        ),
    },
    {
        path: "my-classes/students/:id/:idx",
        element: (
            <RoleRoute allowedRole="Instructor">
                <MyStudents />
            </RoleRoute>
        ),
    },
];

export default dashboardRoutes;
