import React from 'react';

import style from './style/test.scss';

import PropTypes from 'prop-types';

export default class Test extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className={style.test}>{this.props.label}</div>
        );

    }

}

Test.propTypes = {
    label: PropTypes.string
};

Test.defaultProps = {
    label: 'Test'
}