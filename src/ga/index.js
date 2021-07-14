import ReactGA from "react-ga";
import config from "../config/config";

export const initGA = () => {
    ReactGA.initialize(config.ga.serviceId);
}

export const GApageView = (page) => {
    ReactGA.pageview(page);
}
