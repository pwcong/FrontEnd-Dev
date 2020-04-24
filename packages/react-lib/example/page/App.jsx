import React from 'react';

import './style/app.scss';

import logo from '../assets/imgs/logo.png';

import { TestComponent } from '@/index';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <img src={logo} className="logo" />

        <div>
          <TestComponent label="Hello World!" />
        </div>
      </div>
    );
  }
}
