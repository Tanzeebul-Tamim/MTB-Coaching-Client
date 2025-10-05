import { HashLink } from "react-router-hash-link";
import scrollWithOffset from "../../../../routes/utils/Scroll/ScrollWithOffset";
import { Link } from "react-router-dom";

const Legal = () => {
    return (
        <div>
            <Link
                to="/legal"
                className="uppercase text-lg lg:text-xl text-secondary hover:underline"
            >
                Legal
            </Link>
            <HashLink
                smooth
                to="/legal#privacy-policy"
                scroll={scrollWithOffset}
                className="text-sm description hover:underline"
            >
                Privacy Policy
            </HashLink>
            <HashLink
                smooth
                to="/legal#terms"
                scroll={scrollWithOffset}
                className="text-sm description hover:underline"
            >
                Terms of Service
            </HashLink>
            <HashLink
                smooth
                to="/legal#data-deletion"
                scroll={scrollWithOffset}
                className="text-sm description hover:underline"
            >
                User data deletion
            </HashLink>
            <HashLink
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
