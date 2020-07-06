import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import logo from '@/assets/imgs/logo.png';
import Home from './home';
import Counter from './counter';

import './app.scss';

const App: React.FunctionComponent = () => {
  return (
    <div className="container">
      <img src={logo} className="logo" />
      <ul className="nav">
        <li>
          <NavLink strict exact to="/" replace>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink strict to="/counter" replace>
            Counter
          </NavLink>
        </li>
      </ul>

      <div>
        <Route exact path="/" component={Home} />
        <Route path="/counter" component={Counter} />
      </div>
    </div>
  );
};

export default App;
