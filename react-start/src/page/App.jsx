import React from 'react';

import style from './style/app.scss';

import logo from '../assets/imgs/logo.png';

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className={style.container}>

                <img src={logo} className={style.logo} />
                <p className={style.welcome}>Vue Start</p>

            </div>
        );

    }


}