import React, {useEffect} from 'react';
import './App.css';

import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import routes from "./routes/routes";
import {initGA} from "./ga";

function App() {
    useEffect(() => {
        initGA();
    }, []);

    return (
        <Router>
            <Switch>
                {routes.map(({path, Component, exact, data}) => (
                    <Route key={path} path={path} exact={exact}>
                        <Component data={data}/>
                    </Route>
                ))}
                <Redirect from='/' to='/catalog'/>
            </Switch>
        </Router>
    );
}

export default App;
