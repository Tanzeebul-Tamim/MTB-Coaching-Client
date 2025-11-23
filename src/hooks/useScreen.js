import { useContext } from "react";
import { ScreenContext } from "../providers/ScreenProvider";

const useScreen = () => useContext(ScreenContext);

export default useScreen;