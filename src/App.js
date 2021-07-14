import React, {useEffect} from 'react';
import './App.css';

import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import routes from "./routes/routes";

import {useDispatch} from "react-redux";
import {fetchAppDescription, fetchCatalog, setHeight, setIsCart, setLanguage, setOs} from "./redux/actions";

function App() {
    const dispatch = useDispatch();
    console.log(window.navigator.language)
    useEffect(() => {
        const apple = /iP(hone|od|ad)/i
        const android = /Android/i
        const pc = /Mobile/i;
        const os = apple.test(window.navigator.userAgent) ? 'apple' :
            android.test(window.navigator.userAgent) ? 'android' :
                !pc.test(window.navigator.userAgent) ? 'pc' : null

        dispatch(setOs(os));
        dispatch(setLanguage(window.navigator.language));
        dispatch(setHeight(window.innerHeight));
        dispatch(fetchAppDescription(window.navigator.language));
        dispatch(fetchCatalog(window.navigator.language));


        if (localStorage.getItem('cart')) {
            if (JSON.parse(localStorage.getItem('cart')).length) {
                dispatch(setIsCart(true));
            }
        } else {
            localStorage.setItem('cart', JSON.stringify([]));
            dispatch(setIsCart(false));
        }

    }, [dispatch]);

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
