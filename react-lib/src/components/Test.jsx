import React from 'react';

import './style/test.scss';

import PropTypes from 'prop-types';

export default class Test extends React.Component {
  render() {
    return <div className="test">{this.props.label}</div>;
  }
}

Test.propTypes = {
  label: PropTypes.string
};

Test.defaultProps = {
  label: 'Test'
};
