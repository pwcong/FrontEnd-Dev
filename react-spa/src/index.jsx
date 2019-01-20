import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

// import { BrowserRouter as Router } from 'react-router-dom';
import { HashRouter as Router } from 'react-router-dom';

import pages from './pages';

const { App } = pages;

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
);
