import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Employees from './Employees';
import Home from './Home';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import WorkTime from './WorkTime';
import WorkTimeReport from './WorkTimeReport';

class App extends Component {
    state = {  }
    render() { 
        return ( 
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/employees' exact={true} component={Employees}/>
                    <Route path='/employee/add' exact={true} component={AddEmployee}/>
                    <Route path='/employee/edit/:id' exact={true} component={EditEmployee}/>
                    <Route path='/employee/time/:id' exact={true} component={WorkTime}/>
                    <Route path='/employee/times/year/:year/:id' exact={true} component={WorkTimeReport}/>
                </Switch>
             </Router>

        );
    }
}
 
export default App;