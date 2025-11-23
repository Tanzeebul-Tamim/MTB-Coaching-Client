import { Flip, toast } from "react-toastify";
import useUserData from "../../../../../hooks/useUserData";
import { sendMessage } from "../../../../../api/messageApi";
import useAuth from "../../../../../hooks/useAuth";
import { useEffect, useState } from "react";
import useDarkTheme from "../../../../../hooks/useDarkTheme";
import useScreen from "../../../../../hooks/useScreen";
import useSoundEffects from "../../../../../hooks/useSoundEffects";
import useGlowingTitle from "../../../../../hooks/useGlowingTitle";

const useSendMessage = () => {
    const { userDetails } = useUserData();
    const { user } = useAuth();
    const { supportGlow } = useGlowingTitle();
    const isDarkTheme = useDarkTheme();
    const { isSmallDevice } = useScreen();
    const { play } = useSoundEffects();

    const className = "uppercase text-lg lg:text-xl";
    const [glowClass, setGlowClass] = useState(className);

    const textLimit = 500;
    const [textLength, setTextLength] = useState(0);
    const [textFocus, setTextFocus] = useState(false);

    const subjectLimit = 60;
    const [subjectLength, setSubjectLength] = useState(0);
    const [subjectFocus, setSubjectFocus] = useState(false);

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

    const handleTextChange = (e) => {
        const textLength = e.target.value.length;
        setTextLength(textLength);
    };

    const handleSubjectChange = (e) => {
        const subjectLength = e.target.value.length;
        setSubjectLength(subjectLength);
    };

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
        e.preventDefault();

        setTextLength(0);
        setSubjectLength(0);
        setTextFocus(false);
        setSubjectFocus(false);

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

        e.target.reset();
        play("message");

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

    return {
        handleSendMessage,
        user,
        glowClass,
        textLimit,
        textLength,
        handleTextChange,
        textFocus,
        setTextFocus,
        subjectLimit,
        subjectLength,
        handleSubjectChange,
        subjectFocus,
        setSubjectFocus,
        isSmallDevice,
    };
};

export default useSendMessage;
