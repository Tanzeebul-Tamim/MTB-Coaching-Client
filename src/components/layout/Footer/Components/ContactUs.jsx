import React from "react";

const ContactUs = () => {
    return (
        <div className="lg:flex flex-col items-center lg:text-center w-full h-full">
            <span className="uppercase text-lg lg:text-xl text-secondary tracking-widest">
                Contact Us
            </span>
            <span className="text-sm description">
                <a
                    href="https://www.google.com/maps/place/MTB+route,+rhenen/@51.972747,5.5471453,16z/data=!4m10!1m2!2m1!1smountain+bike+trail!3m6!1s0x47c654097f4e5ef1:0x2691c597450a599b!8m2!3d51.972747!4d5.5566725!15sChNtb3VudGFpbiBiaWtlIHRyYWlsWhUiE21vdW50YWluIGJpa2UgdHJhaWySAQ5zcG9ydHNfY29tcGxleJoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VNMWR6UlRhRFpCUlJBQqoBaAoIL20vMDE5OWcKCC9tLzBfbWpwEAEqFyITbW91bnRhaW4gYmlrZSB0cmFpbCgAMh4QASIaVSV2fnus8nDHm1tfIzap4DhCiohlFPsxWzwyFxACIhNtb3VudGFpbiBiaWtlIHRyYWls4AEA-gEECAAQGg!16s%2Fg%2F11dybfjq3d?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                >
                    Autoweg, 3911 TL Rhenen,
                    <br />
                    Netherlands
                </a>
            </span>
            <span className="text-sm description">
                Phone:{" "}
                <a
                    className="hover:underline"
                    id="email"
                    href="https://wa.me/31644460635"
                >
                    +31644460635
                </a>
            </span>
            <span className="text-sm description">
                Email:{" "}
                <a
                    className="underline"
                    id="email"
                    href="mailto:tanzeebul.tamim2003@gmail.com"
                >
                    info@mtb_club.com
                </a>
            </span>
        </div>
    );
};

export default ContactUs;
