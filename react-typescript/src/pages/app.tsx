import React from 'react';

import logo from '@/assets/imgs/logo.png';

import './app.scss';

const App: React.FunctionComponent = () => {
  return (
    <div className="container">
      <img src={logo} className="logo" />
      <p className="welcome">React TypeScript</p>
    </div>
  );
};

export default App;
