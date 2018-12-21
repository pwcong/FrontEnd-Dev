import * as React from 'react';

import style from './style/App.scss';

import logo from '@/assets/imgs/logo.png';

export default class App extends React.Component {
  render() {
    return (
      <div className={style.container}>
        <img src={logo} className={style.logo} />
        <p className={style.welcome}>React Start</p>
      </div>
    );
  }
}
