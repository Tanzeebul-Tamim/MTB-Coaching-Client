import { useContext } from "react";
import { NetworkStatusContext } from "../providers/NetworkStatusProvider";

const useNetworkStatus = () => useContext(NetworkStatusContext);

export default useNetworkStatus;
