import { MdDarkMode, MdLightMode } from "react-icons/md";

const MobileToggle = ({ isDark, toggleDarkMode }) => {
    return (
        <div className="flex justify-between gap-2">
            <span>
                {isDark ? (
                    <span className="text-yellow-100 flex items-center gap-1">
                        <MdLightMode className="text-sm" />
                        <span>Light</span>
                    </span>
                ) : (
                    <span className="text-blue-700 flex items-center gap-1">
                        <MdDarkMode className="text-sm" />
                        <span>Dark</span>
                    </span>
                )}
            </span>
            <label className="flex custom-cursor-pointer select-none items-center transition">
                <div className="relative">
                    <input
                        type="checkbox"
                        checked={isDark}
                        onChange={toggleDarkMode}
                        className="sr-only"
                    />
                    <div
                        className={`box block h-[16px] w-[28px] rounded-full ${
                            isDark ? "bg-yellow-500" : "bg-amber-400"
                        }`}
                    ></div>
                    {isDark ? (
                        <div className="absolute left-[2px] top-[2px] flex h-[12px] w-[12px] items-center justify-center rounded-full bg-white border-1 border-black transition"></div>
                    ) : (
                        <div
                            className="absolute left-[2px] top-[2px] flex h-[12px] w-[12px] items-center justify-center rounded-full bg-white border-1 border-black transition
                                    translate-x-full"
                        ></div>
                    )}
                </div>
            </label>
        </div>
    );
};

export default MobileToggle;
