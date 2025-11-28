import { HashLink } from "react-router-hash-link";
import scrollWithOffset from "../../../../routes/utils/Scroll/ScrollWithOffset";
import { Link } from "react-router-dom";

const Legal = ({ functions }) => {
    const {
        handlePrivacyGlow,
        handleTermsOfServiceGlow,
        handleUserDataDeletionGlow,
        handleCookieNoticeGlow,
    } = functions;
    return (
        <div className="lg:flex flex-col items-center text-center w-full h-full">
            <Link
                to="/legal"
                className="uppercase text-lg lg:text-xl text-secondary hover:underline tracking-widest"
            >
                Legal
            </Link>
            <HashLink
                onClick={handlePrivacyGlow}
                smooth
                to="/legal#privacy-policy"
                scroll={scrollWithOffset}
                className="text-sm description hover:underline"
            >
                Privacy Policy
            </HashLink>
            <HashLink
                onClick={handleTermsOfServiceGlow}
                smooth
                to="/legal#terms"
                scroll={scrollWithOffset}
                className="text-sm description hover:underline"
            >
                Terms of Service
            </HashLink>
            <HashLink
                onClick={handleUserDataDeletionGlow}
                smooth
                to="/legal#data-deletion"
                scroll={scrollWithOffset}
                className="text-sm description hover:underline"
            >
                User data deletion
            </HashLink>
            <HashLink
                onClick={handleCookieNoticeGlow}
                smooth
                to="/legal#cookie"
                scroll={scrollWithOffset}
                className="text-sm description hover:underline"
            >
                Cookie Notice
            </HashLink>
        </div>
    );
};

export default Legal;
