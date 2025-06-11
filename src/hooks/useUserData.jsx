import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { getUserData } from "../api/authApi";

const useUserData = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        if (user && user.email) {
            setLoading(true);
            getUserData(user.email)
                .then((data) => {
                    setUserDetails(data);
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        } else if (!user) {
            setLoading({});
        }
    }, [user]);

    return { loading, setLoading, userDetails, setUserDetails };
};

export default useUserData;
