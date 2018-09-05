import * as React from 'react';
import './App.css';

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store';

import {LoginScreen} from './components/entry-components/login-screen-component';
import {RegisterScreen} from './components/entry-components/register-screen-component';
import {EmployeeHome} from './components/employee-components/employee-home-component';
import {EmployeeTickets} from './components/employee-components/employee-tickets-component';
import {EmployeeAccount} from './components/employee-components/employee-account-component';
import {ManagerHome} from './components/manager-components/manager-home-component';
import {ManagerTickets} from './components/manager-components/manager-tickets-component';
import {ManagerAccount} from './components/manager-components/manager-account-component';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Switch>
              <Route path="/login" component={LoginScreen}/>
              <Route path="/register" component={RegisterScreen}/>
              <Route path="/employee-tickets" component={EmployeeTickets}/>
              <Route path="/employee-home" component={EmployeeHome}/>
              <Route path="/employee-account" component={EmployeeAccount}/>
              <Route path="/manager-home" component={ManagerHome}/>
              <Route path="/manager-tickets" component={ManagerTickets}/>
              <Route path="/manager-account" component={ManagerAccount}/>
              <Route component={LoginScreen}/>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
