import React from 'react';

import logo from '@/assets/imgs/logo.png';

import './app.scss';

const App = () => {
  return (
    <div className="container">
      <img src={logo} className="logo" />
      <p className="welcome">React Start</p>
    </div>
  );
};

export default App;
