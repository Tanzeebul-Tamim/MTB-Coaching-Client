import { Flip, toast } from "react-toastify";
import useUserData from "../../../../hooks/useUserData";

const useSendMessage = (user) => {
    const { userDetails } = useUserData();

    const config = {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        transition: Flip,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
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
            userId: userDetails?._id,
            image: userDetails?.image || user?.photoURL,
            address: userDetails?.address,
            contactNo: userDetails?.contactNo,
            role: user && (userDetails?.role || "Student"),
        };

        fetch(`${import.meta.env.VITE_API_URL}/messages`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user ? memberMessage : guestMessage),
        })
            .then((res) => {
                res.json();
                toast.success(
                    "Thanks for reaching out! Our team will contact you shortly.",
                    config
                );
            })
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    };

    return { handleSendMessage };
};

export default useSendMessage;
