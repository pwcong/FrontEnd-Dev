import React from 'react';

import style from './style/home.scss';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className={style.home}>Hello !</div>;
  }
}
