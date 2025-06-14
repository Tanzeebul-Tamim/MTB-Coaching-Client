import { ToastContainer } from "react-toastify";
import useDarkTheme from "../../hooks/useDarkTheme";

const Toast = () => {
    const isDarkTheme = useDarkTheme();

    return (
        <ToastContainer
            className=""
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            limit={2}
            rtl={false}
            draggable
            pauseOnHover
            theme={isDarkTheme ? "dark" : "light"}
        />
    );
};

export default Toast;
