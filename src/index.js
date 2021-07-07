import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import store from "./redux/store";
import Yandex from "./ga/Yandex";

ReactDOM.render(
    <Provider store={store}>
        <App/>
        <Yandex/>
    </Provider>,
    document.getElementById('root')
);
