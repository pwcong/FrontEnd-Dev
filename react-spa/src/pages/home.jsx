import React from 'react';

import './style/home.scss';

export default class Home extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="home">Hello !</div>;
  }
}
