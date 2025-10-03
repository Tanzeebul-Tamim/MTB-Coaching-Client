import React from "react";

const Branding = () => {
    return (
        <div className="items-center grid-flow-col">
            <img style={{ height: "60px" }} src="/logo.png" alt="" />
            <p className="text-sm description">
                MTB Coaching Network Ltd. <br /> Delivering exceptional services
                since 2006.
            </p>
        </div>
    );
};

export default Branding;
