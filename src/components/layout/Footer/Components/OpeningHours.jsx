import React from "react";

const OpeningHours = () => {
    return (
        <div>
            <span className="uppercase text-lg lg:text-xl text-secondary">
                Opening Hours
            </span>
            <span className="text-sm description">
                Monday - Friday: 8:00 AM - 10:00 PM
            </span>
            <span className="text-sm description">
                Saturday: 10:00 AM - 11:00 PM
            </span>
            <span className="text-sm description">
                Sunday: 12:00 PM - 9:00 PM
            </span>
        </div>
    );
};

export default OpeningHours;
