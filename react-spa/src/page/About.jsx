import React from 'react';

import style from './style/about.scss';

export default class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className={style.about}>React SPA</div>;
  }
}
