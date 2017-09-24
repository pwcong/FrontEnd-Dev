import React from 'react';
import ReactDOM from 'react-dom';

// import { BrowserRouter as Router } from 'react-router-dom';
import { HashRouter as Router } from 'react-router-dom';

import App from './page/App.jsx';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('app')
);