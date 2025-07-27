import { useEffect, useRef, useState } from "react";
import "../../../styles/bikeHacks.css";

const Dropdown = ({
    selectBikeType,
    setSelectBikeType,
    bikeHacksData,
    setShouldFetch,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const dropdownContainerRef = useRef(null);
    const placeholder = "Select the Type of Bike You Ride";

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                isFocused &&
                dropdownContainerRef.current &&
                !dropdownContainerRef.current.contains(event.target)
            ) {
                setIsFocused(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isFocused]);

    return (
        <div className="relative mb-4 flex items-center justify-center z-50">
            <span
                className={`absolute pointer-events-none transition-all duration-200 z-50 ${
                    selectBikeType &&
                    "-translate-y-[22px] text-sm bg-base-100 dark:bg-opacity-70 px-2 rounded-xl border-t border-base-content border-opacity-30"
                }`}
            >
                {placeholder}
            </span>
            <span
                className={`transition-transform duration-400 ${
                    isFocused ? "rotate-180" : ""
                } absolute lg:translate-x-[145px] translate-x-[105px] lg:text-sm text-[6px] top-1/2 -translate-y-1/2 pointer-events-none z-50`}
            >
                ▼
            </span>
            <div
                ref={dropdownContainerRef}
                className="relative custom-cursor-pointer font-light text-xs lg:text-base w-3/4 lg:w-full max-w-xs border border-base-content border-opacity-30 rounded-full dark:bg-opacity-80 bg-base-100 text-base-content"
                onClick={() => setIsFocused((prev) => !prev)}
            >
                <div className={`px-4 py-2 ${!selectBikeType && "invisible"}`}>
                    {selectBikeType || <span>{placeholder}</span>}
                </div>
                <div
                    className={`
                        absolute left-0 right-0 mt-1 z-50
                        bg-base-100 dark:bg-opacity-80 border border-base-content border-opacity-30 rounded-2xl shadow-lg p-1
                        transition-all duration-200 ease-in-out origin-top transform
                        ${
                            isFocused
                                ? "opacity-100 scale-100 pointer-events-auto"
                                : "opacity-0 scale-95 pointer-events-none"
                        }
                        max-h-80 overflow-y-auto custom-scrollbar
                    `}
                >
                    {bikeHacksData.bikeTypes.map((bikeType, idx) => (
                        <div
                            key={idx}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectBikeType(bikeType);
                                setIsFocused(false);
                                setShouldFetch(true);
                            }}
                            className={`px-3 py-2 hover:bg-base-300 hover:bg-opacity-60 transition rounded-xl ${
                                selectBikeType === bikeType && "bg-base-300"
                            }`}
                        >
                            {bikeType}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
