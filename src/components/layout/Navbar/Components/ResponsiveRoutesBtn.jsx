import { CgMenuGridO } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";

const ResponsiveRoutesBtn = ({ props }) => {
    const { setOpen, open } = props;
    return (
        <div className="relative w-8 h-8 flex items-center justify-center custom-cursor-pointer text-2xl lg:hidden">
            <span
                onClick={() => setOpen(!open)}
                className={`absolute transition-opacity duration-500 ease-in-out ${
                    open ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
                style={{ transitionProperty: "opacity" }}
            >
                <CgMenuGridO className="text-[#f5f3f0]" />
            </span>
            <span
                className={`absolute transition-opacity duration-500 ease-in-out ${
                    open ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                style={{ transitionProperty: "opacity" }}
            >
                <IoMdClose className="text-[#f5f3f0]" />
            </span>
        </div>
    );
};

export default ResponsiveRoutesBtn;
