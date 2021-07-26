import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import ReduxToolKitContainer from '../src/page-states/reduxToolkit/containers/RootContainer';
import RecoidContainer from '../src/page-states/recoil/containers/RootContainer';
import './App.css';

function App() {
  return (
    <div className="container">
      <div className="nav">
        <div>
          <NavLink to="reduxToolkit">redux-toolkit</NavLink>
        </div>
        <div>
          <NavLink to="recoil">recoil</NavLink>
        </div>
      </div>
      <div className="content">
        <Switch>
          <Route path="/reduxToolkit" component={ReduxToolKitContainer} />
          <Route path="/recoil" component={RecoidContainer} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
