import { Flip, toast } from "react-toastify";
import useUserData from "../../../../hooks/useUserData";
import { sendMessage } from "../../../../api/messageApi";
import useAuth from "../../../../hooks/useAuth";
import { useEffect, useState } from "react";
import useDarkTheme from "../../../../hooks/useDarkTheme";

const useSendMessage = () => {
    const { userDetails } = useUserData();
    const { user, supportGlow } = useAuth();
    const isDarkTheme = useDarkTheme();

    const className = "uppercase text-lg lg:text-xl";
    const [glowClass, setGlowClass] = useState(className);

    useEffect(() => {
        if (supportGlow)
            setGlowClass(
                `${className} ${
                    isDarkTheme ? "text-primary" : "text-secondary"
                } support-glow scale-105`
            );
        else setGlowClass(`${className} text-secondary`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supportGlow]);

    const config = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        transition: Flip,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    const generateTicketId = () => {
        const timestamp = Date.now().toString(36); // Base36 timestamp
        const random = Math.random().toString(36).substring(2, 6); // 4 random chars
        return `TKT-${timestamp}-${random}`.toUpperCase(); // e.g., TKT-LS8EJ3Z-4G5K
    };

    const handleSendMessage = (e) => {
        const form = e.target;

        const guestMessage = {
            name: user?.displayName || form.name.value,
            email: user?.email || form.email.value,
            subject: form.subject.value,
            message: form.message.value,
            authenticated: user ? true : false,
        };

        const memberMessage = {
            ...guestMessage,
            ticketId: generateTicketId(),
            userId: userDetails?._id,
            image: userDetails?.image || user?.photoURL,
            address: userDetails?.address,
            contactNo: userDetails?.contactNo,
            role: user && (userDetails?.role || "Student"),
        };

        sendMessage(user ? memberMessage : guestMessage);

        {
            user &&
                toast.info(
                    <div className="text-center">
                        <div className="font-bold text-[20px]">Ticket No:</div>
                        {memberMessage?.ticketId}
                    </div>,
                    config
                );
        }
        setTimeout(
            () =>
                toast.success(
                    <div className="text-center">
                        <div className="font-bold text-[20px]">
                            Request received
                        </div>
                        Our team will contact you shortly.
                    </div>,
                    config
                ),
            user ? config.autoClose + 1500 : 0
        );
    };

    return { handleSendMessage, user, glowClass };
};

export default useSendMessage;
