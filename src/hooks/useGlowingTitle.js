import { useContext } from "react";
import { GlowingTitleContext } from "../providers/GlowingTitleProvider";

const useGlowingTitle = () => useContext(GlowingTitleContext);

export default useGlowingTitle;