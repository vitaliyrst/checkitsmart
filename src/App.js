import React, {useEffect} from 'react';
import './App.css';

import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import routes from "./routes/routes";

import {useDispatch, useSelector} from "react-redux";
import {fetchAppDescription, fetchCatalog, setHeight, setIsCart, setLanguage, setOs} from "./redux/actions";
import {getLanguage} from "./redux/selectors";

function App() {
    const dispatch = useDispatch();
    const language = useSelector(getLanguage);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('language'))) {
            dispatch(setLanguage(JSON.parse(localStorage.getItem('language'))));
        } else {
            localStorage.setItem('language', JSON.stringify(window.navigator.language));
            dispatch(setLanguage(window.navigator.language));
        }

        const apple = /iP(hone|od|ad)/i
        const android = /Android/i
        const pc = /Mobile/i;
        const os = apple.test(window.navigator.userAgent) ? 'apple' :
            android.test(window.navigator.userAgent) ? 'android' :
                !pc.test(window.navigator.userAgent) ? 'pc' : null

        dispatch(setOs(os));
        dispatch(setHeight(window.innerHeight));
        dispatch(fetchAppDescription(language));
        dispatch(fetchCatalog(language));

        if (localStorage.getItem('cart')) {
            if (JSON.parse(localStorage.getItem('cart')).length) {
                dispatch(setIsCart(true));
            }
        } else {
            localStorage.setItem('cart', JSON.stringify([]));
            dispatch(setIsCart(false));
        }

    }, [dispatch, language]);

    return (
        <Router>

            <Switch>
                {routes.map(({path, Component, name, exact}) => (
                    <Route key={name} path={path} exact={exact}>
                        <Component/>
                    </Route>
                ))}
                <Redirect from='/' to='/catalog'/>
            </Switch>

        </Router>
    );
}

export default App;
