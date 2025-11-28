import { useLocation } from "react-router-dom";
import useGlowingTitle from "../../../hooks/useGlowingTitle";
import useScreen from "../../../hooks/useScreen";

const useFooter = () => {
    const {
        supportGlow,
        handleGettingStartedGlow,
        handleTroubleShootingGlow,
        handleAccountAndDataGlow,
        handleContactSupportGlow,
        handlePrivacyGlow,
        handleTermsOfServiceGlow,
        handleUserDataDeletionGlow,
        handleCookieNoticeGlow,
    } = useGlowingTitle();
    console.log({ bal: useGlowingTitle() });
    const location = useLocation();
    const { isSmallDevice } = useScreen();
    const bgLocations =
        location.pathname == "/instructors" || location.pathname == "/classes";

    return {
        isSmallDevice,
        supportGlow,
        bgLocations,
        handleGettingStartedGlow,
        handleTroubleShootingGlow,
        handleAccountAndDataGlow,
        handleContactSupportGlow,
        handlePrivacyGlow,
        handleTermsOfServiceGlow,
        handleUserDataDeletionGlow,
        handleCookieNoticeGlow,
    };
};

export default useFooter;
