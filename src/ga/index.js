import ReactGA from "react-ga";
import config from "../config/config";

export const initGA = () => {
    ReactGA.initialize(config.ga.serviceId);
}
