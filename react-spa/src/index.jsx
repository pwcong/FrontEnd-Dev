import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

// import { BrowserRouter as Router } from 'react-router-dom';
import { HashRouter as Router } from 'react-router-dom';

import App from './pages/app';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
);
