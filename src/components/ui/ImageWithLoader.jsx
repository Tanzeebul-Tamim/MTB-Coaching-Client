import { useState } from "react";

export default function ImageWithLoader({
    src,
    className,
    alt,
    gif = "/assets/loading.gif",
}) {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoad = () => {
        setIsLoading(false);
    };

    return (
        <>
            <img
                src={isLoading ? gif : src}
                alt={alt}
                onLoad={handleLoad}
                onError={() => setIsLoading(false)} // hide loader if image fails
                className={`${className} transition-opacity duration-300 ${
                    isLoading ? "opacity-0" : "opacity-100"
                }`}
            />
        </>
    );
}
