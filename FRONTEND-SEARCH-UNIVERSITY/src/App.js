import {BrowserRouter as Router, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import React, { useContext } from "react";
import UsersContext from './UserContext.js';
import Login from './login/LoginUni.jsx'
import UniversitiesManager from './universities manager/UniversitiesManager.js';

function App(){
    return (
        <Router>
            <Switch>
                <UsersContext.Provider value = {{id:'' , userToken: ''}}>
                    <Route path="/">
                        <Redirect to = "/login" />
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route exact path="/universities">
                        <UniversitiesManager/>
                    </Route>
                </UsersContext.Provider>
            </Switch>
        </Router>
    )
}

export default App;