import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import RootContainer from '../src/pages/reduxToolkit/containers/RootContainer';
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
          <Route path="/reduxToolkit" component={RootContainer} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
