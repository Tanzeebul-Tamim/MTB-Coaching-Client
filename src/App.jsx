import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./styles/index.css";
import AuthProvider from "./providers/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import ScreenSizeProvider from "./providers/ScreenSizeProvider";
import NetworkStatusProvider from "./providers/NetworkStatusProvider";
import router from "./routes/config/router";
import Toast from "./components/ui/Toast";
import GlowingTitleProvider from "./providers/GlowingTitleProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <ScreenSizeProvider>
                <GlowingTitleProvider>
                    <NetworkStatusProvider>
                        <RouterProvider router={router} />
                        <Toast />
                    </NetworkStatusProvider>
                </GlowingTitleProvider>
            </ScreenSizeProvider>
        </AuthProvider>
    </React.StrictMode>
);
