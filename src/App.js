import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import routes from "./routes/routes";
import {initGA} from "./ga";
import {useDispatch} from "react-redux";
import {fetchData, setHeight, setIsCart, setOs} from "./redux/actions";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        initGA();
        dispatch(setHeight(window.innerHeight));
        dispatch(fetchData());

        const apple = /iP(hone|od|ad)/i
        const android = /Android/i
        const pc = /Mobile/i;
        const os = apple.test(window.navigator.userAgent) ? 'apple' :
            android.test(window.navigator.userAgent) ? 'android' :
                !pc.test(window.navigator.userAgent) ? 'pc' : null

        dispatch(setOs(os));

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
