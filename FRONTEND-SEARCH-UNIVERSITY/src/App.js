import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom'
import Login from './login/LoginUni.jsx'
import UniversitiesManager from './universities manager/UniversitiesManager.js';

function App(){
    return (
        <Router>
            <Switch>
                <Route path="/login">
                  <Login/>
                </Route>
                <Route exact path="/universities" component={UniversitiesManager}/>
            </Switch>
        </Router>
    )
}

export default App;