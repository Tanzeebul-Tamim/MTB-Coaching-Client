import { useState } from "react";

export default function ImageWithLoader({ src, className }) {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoad = () => {
        setIsLoading(false);
    };

    return (
        <div className="relative w-full h-auto">
            <img
                src={isLoading ? "/class-loading.gif" : src}
                onLoad={handleLoad}
                onError={() => setIsLoading(false)} // hide loader if image fails
                className={`${className} transition-opacity duration-300 ${
                    isLoading ? "opacity-0" : "opacity-100"
                }`}
            />
        </div>
    );
}
