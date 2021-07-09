import ReactGA from "react-ga";

export const initGA = () => {
    ReactGA.initialize('UA-201313502-1');
}

export const GApageView = (page) => {
    ReactGA.pageview(page);
}
