import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import mainRoutes from "./mainRoutes";
import PrivateRoute from "../guard/PrivateRoute";
import Dashboard from "../../layout/Dashboard";
import dashboardRoutes from "./dashboardRoutes";
import ErrorPage from "../../components/pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: mainRoutes,
    },
    {
        path: "dashboard",
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
        children: dashboardRoutes,
    },
]);

export default router;
