import ReactGA from "react-ga";

export const initGA = () => {
    ReactGA.initialize('UA-198795629-1');
}

export const GApageView = (page) => {
    ReactGA.pageview(page);
}