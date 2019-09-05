import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import Home from './home';
import Counter from './counter';

import logo from '../assets/imgs/logo.png';
import './style/app.scss';

export default class App extends React.Component {
  render() {
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
  }
}
