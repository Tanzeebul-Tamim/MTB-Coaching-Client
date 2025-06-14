import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import AuthProvider from "./providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScreenSizeProvider from "./providers/ScreenSizeProvider";
import NetworkStatusProvider from "./providers/NetworkStatusProvider";
import router from "./routes/config/router";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <ScreenSizeProvider>
                <NetworkStatusProvider>
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
                </NetworkStatusProvider>
            </ScreenSizeProvider>
        </AuthProvider>
    </React.StrictMode>
);
