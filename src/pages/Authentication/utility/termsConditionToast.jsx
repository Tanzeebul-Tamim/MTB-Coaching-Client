import { toast } from "react-toastify";
import useSoundEffects from "../../../hooks/useSoundEffects";

const termsConditionToast = (
    isSmallDevice,
    agreed,
    config,
    setHighlightText
) => {
    const Message = () => {
        useSoundEffects().play("warning");
        return (
            <div className="text-center">
                <span className="font-bold text-primary text-[17px]">
                    Action Required
                </span>
                <br />
                <span className={!isSmallDevice && " text-justify text-[13px]"}>
                    You need to agree to the{" "}
                    <strong>Terms and Conditions</strong> before continuing.
                </span>
            </div>
        );
    };

    if (agreed) return true;
    else {
        setHighlightText(true);
        setTimeout(() => setHighlightText(false), config.autoClose + 1100);
        toast.warning(<Message />, config);
        return false;
    }
};

export default termsConditionToast;
