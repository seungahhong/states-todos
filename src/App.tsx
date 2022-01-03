import React from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import ReduxToolKitContainer from '../src/reduxToolkit/containers/RootContainer';
import RecoilContainer from '../src/recoil/containers/RootContainer';
import ReactQueryContainer from '../src/react-query/containers/RootContainer';
import SWRContainer from '../src/swr/containers/RootContainer';
import ReduxContainer from '../src/redux/containers/RootContainer';
import MobxContainer from '../src/mobx/containers/RootContainer';

import './App.css';

function App() {
  return (
    <div className="container">
      <div className="nav">
        <div>
          <NavLink to="reduxToolkit">redux-toolkit</NavLink>
        </div>
        <div>
          <NavLink to="redux">redux</NavLink>
        </div>
        <div>
          <NavLink to="mobx">mobx</NavLink>
        </div>
        <div>
          <NavLink to="recoil">recoil</NavLink>
        </div>
        <div>
          <NavLink to="react-query">react-query</NavLink>
        </div>
        <div>
          <NavLink to="swr">swr</NavLink>
        </div>
      </div>
      <div className="content">
        <Switch>
          <Route path="/reduxToolkit" component={ReduxToolKitContainer} />
          <Route path="/redux" component={ReduxContainer} />
          <Route path="/mobx" component={MobxContainer} />
          <Route path="/recoil" component={RecoilContainer} />
          <Route path="/react-query" component={ReactQueryContainer} />
          <Route path="/swr" component={SWRContainer} />
          <Redirect from="/" to="/reduxToolkit" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
