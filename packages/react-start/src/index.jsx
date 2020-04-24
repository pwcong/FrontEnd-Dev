import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import pages from './pages';

const { App } = pages;

ReactDOM.render(<App />, document.getElementById('app'));
