import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';

import {Provider} from "react-redux";
import store from "./redux/store";

import Yandex from "./ga/Yandex";
import reportWebVitals from "./reportWebVitals";
import {initGA} from "./ga";

import App from './App';

initGA();

ReactDOM.render(
    <Provider store={store}>
        <App/>
        <Yandex/>
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();
