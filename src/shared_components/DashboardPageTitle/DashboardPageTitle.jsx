import useScreenSize from "../../hooks/useScreenSize";

const DashboardPageTitle = ({ title }) => {
    const { isSmallDevice } = useScreenSize();

    if (isSmallDevice) {
        return (
            <div className="z-[10] bg-opacity-50 rounded-xl px-3 py-2 text-yellow-400 text-4xl tracking-[7px] bg-black text-center uppercase font-extrabold inline-block mx-auto drop-shadow-xl shadow-yellow-900">
                {title}
            </div>
        );
    } else {
        return (
            <h1 className="z-[10] text-yellow-600 text-5xl mb-10 tracking-[9px] text-center uppercase font-extrabold">
                {title}
            </h1>
        );
    }
};

export default DashboardPageTitle;
