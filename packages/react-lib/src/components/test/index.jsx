import React from 'react';

import PropTypes from 'prop-types';

import './style.scss';

const Test = (props) => {
  return <div className="test">{props.label}</div>;
};

Test.propTypes = {
  label: PropTypes.string,
};

Test.defaultProps = {
  label: 'Test',
};

export default Test;
