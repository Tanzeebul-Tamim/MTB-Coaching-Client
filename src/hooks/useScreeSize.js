import { useContext } from "react";
import { ScreenSizeContext } from "../providers/ScreenSizeProvider";

const useScreenSize = () => useContext(ScreenSizeContext);

export default useScreenSize;