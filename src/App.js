import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import routes from "./routes/routes";
import {initGA} from "./ga";
import {useDispatch} from "react-redux";
import {fetchData, setOs} from "./redux/actions";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        initGA();
        dispatch(fetchData());
        dispatch(setOs(/iPhone|iPad|iPod/i.test(window.navigator.userAgent)));
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
