import React from "react";
import LeafletMap from "./LeafletMap/LeafletMap";

const OurLocation = ({ isSmallDevice }) => {
    return (
        <div className="lg:flex flex-col items-center text-center w-full h-full">
            <span className="uppercase text-lg lg:text-xl text-secondary tracking-widest">
                Our Location
            </span>
            <LeafletMap smallDevice={isSmallDevice}></LeafletMap>
        </div>
    );
};

export default OurLocation;
