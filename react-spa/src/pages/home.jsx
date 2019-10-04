import React from 'react';

import './style/home.scss';

export default class Home extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  sayHello = () => {
    console.log('Hello');
  }

  render() {
    return <div className="home" onClick={this.sayHello}>Hello !</div>;
  }
}
