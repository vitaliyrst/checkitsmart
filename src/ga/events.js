import ReactGA from 'react-ga';

export const GAevent = (categoryName, eventName, label = ' ', value = 10) => {
    ReactGA.event({
        category: categoryName,
        action: eventName,
        label: label,
        value: value,
        nonInteraction: false
    });
}