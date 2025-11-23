import { HashLink } from "react-router-hash-link";
import scrollWithOffset from "../../../../routes/utils/Scroll/ScrollWithOffset";
import { Link } from "react-router-dom";

const Faq = () => {
    return (
        <div className="lg:flex flex-col items-center text-center w-full h-full">
            <Link
                to="/support"
                className="uppercase text-lg lg:text-xl text-secondary hover:underline tracking-widest"
            >
                FAQ
            </Link>
            <HashLink
                smooth
                to="/support#getting-started"
                scroll={scrollWithOffset}
                className="text-sm description hover:underline"
            >
                Getting Started
            </HashLink>
            <HashLink
                smooth
                to="/support#troubleshooting"
                scroll={scrollWithOffset}
                className="text-sm description hover:underline"
            >
                Troubleshooting
            </HashLink>
            <HashLink
                smooth
                to="/support#account-data"
                scroll={scrollWithOffset}
                className="text-sm description hover:underline"
            >
                Account & Data
            </HashLink>
            <HashLink
                smooth
                to="/support#contact-support"
                scroll={scrollWithOffset}
                className="text-sm description hover:underline"
            >
                Contact Support
            </HashLink>
        </div>
    );
};

export default Faq;
