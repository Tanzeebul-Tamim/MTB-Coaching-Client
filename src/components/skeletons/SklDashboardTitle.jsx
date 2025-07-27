import useScreenSize from "../../hooks/useScreenSize";

const SklDashboardTitle = () => {
    const { isSmallDevice } = useScreenSize();

    if (isSmallDevice) {
        return (
            <div className="z-[10] bg-opacity-20 rounded-xl px-3 py-2 bg-primary mx-auto drop-shadow-xl shadow-yellow-900 animate-pulse w-11/12 h-12"></div>
        );
    } else {
        return (
            <div className="z-[10] opacity-20 rounded-lg w-1/3 h-14 bg-secondary mb-10 animate-pulse"></div>
        );
    }
};

export default SklDashboardTitle;
