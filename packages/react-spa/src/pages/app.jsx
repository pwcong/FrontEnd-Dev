import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import Home from './home';
import About from './about';

import logo from '@/assets/imgs/logo.png';

import './app.scss';

const App = () => {
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
          <NavLink strict to="/about" replace>
            About
          </NavLink>
        </li>
      </ul>

      <div>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </div>
    </div>
  );
};

export default App;
