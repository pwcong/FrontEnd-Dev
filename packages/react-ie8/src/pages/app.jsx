import React from 'react';

import './app.scss';

import logo from '../assets/imgs/logo.png';

const App = () => {
  return (
    <div className="container">
      <img src={logo} className="logo" />
      <p className="welcome">React For IE8</p>
    </div>
  );
};

export default App;
