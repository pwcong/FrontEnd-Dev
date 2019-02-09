import React from 'react';

import './style/app.scss';

import logo from '../assets/imgs/logo.png';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <img src={logo} className="logo" />
        <p className="welcome">React Start</p>
      </div>
    );
  }
}
