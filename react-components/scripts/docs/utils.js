exports.getEntryCode = (appPath, packages) => {
  return `
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import App from '${appPath}';
const components = [
  ${packages
    .map(
      pkg => `{
        entry: React.lazy(() => import('${pkg.testPath}')),
        pkg: JSON.parse('${JSON.stringify(pkg)}')
      }`
    )
    .join(',')}
];

ReactDOM.render(
  <Router>
    <App components={components}/>
  </Router>,
  document.getElementById('app')
);

  `;
};
