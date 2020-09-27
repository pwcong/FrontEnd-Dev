import React from 'react';

import { TestComponent } from '@/index';

import logo from '../assets/imgs/logo.png';

import './app.scss';

const App = () => {
  return (
    <div className="container">
      <img src={logo} className="logo" />

      <div>
        <TestComponent label="Hello World!" />
      </div>
    </div>
  );
};

export default App;
