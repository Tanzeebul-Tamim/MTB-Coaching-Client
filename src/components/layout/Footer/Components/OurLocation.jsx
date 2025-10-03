import React from "react";
import LeafletMap from "./LeafletMap/LeafletMap";

const OurLocation = ({ isSmallDevice }) => {
    return (
        <div>
            <span className="uppercase text-lg lg:text-xl text-secondary">
                Our Location
            </span>
            <LeafletMap smallDevice={isSmallDevice}></LeafletMap>
        </div>
    );
};

export default OurLocation;
