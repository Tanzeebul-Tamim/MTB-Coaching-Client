import { createContext, useEffect, useState } from "react";

export const NetworkStatusContext = createContext(true);

const NetworkStatusProvider = ({ children }) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const goOnline = () => setIsOnline(true);
        const goOffline = () => setIsOnline(false);

        window.addEventListener("online", goOnline);
        window.addEventListener("offline", goOffline);

        return () => {
            window.removeEventListener("online", goOnline);
            window.removeEventListener("offline", goOffline);
        };
    }, []);

    return (
        <NetworkStatusContext.Provider value={{ isOnline }}>
            {children}
        </NetworkStatusContext.Provider>
    );
};

export default NetworkStatusProvider;
