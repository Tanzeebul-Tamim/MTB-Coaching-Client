import { createContext, useEffect, useState } from "react";

export const ScreenSizeContext = createContext(null);

const ScreenSizeProvider = ({ children }) => {
  const [isSmallDevice, setIsSmallDevice] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth <= 576);
    };

    handleResize(); // check on load

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ScreenSizeContext.Provider value={{ isSmallDevice }}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

export default ScreenSizeProvider;