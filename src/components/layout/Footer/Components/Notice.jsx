import React from "react";

const Notice = ({ isSmallDevice }) => {
    return (
        <div
            className={`flex flex-col ${
                !isSmallDevice && "items-center"
            } text-xs`}
        >
            <h4 className="lg:text-md lg:tracking-widest">
                This website is for educational purposes only and is not
                affiliated with any official organizations or institutions.
            </h4>
            <h4 className="lg:text-md lg:tracking-widest">
                &copy; 2023-{new Date().getFullYear()} MTB Coaching Network -
                All Rights Reserved
                {isSmallDevice ? (
                    <>
                        <br />
                    </>
                ) : (
                    ` - `
                )}
                Designed & Developed by
                <a
                    href="https://github.com/Tanzeebul-Tamim"
                    className="uppercase ms-1 font-bold text-secondary underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Tanzeebul Tamim
                </a>
            </h4>
        </div>
    );
};

export default Notice;
