const path = require('path');
const prettier = require('prettier');

const VirtualModulesPlugin = require('webpack-virtual-modules');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const start = require('../utils/start');

const getEntryCode = (packagePath) => {
  const code = `
    import React from 'react'
    import ReactDOM from 'react-dom'
    import App from '${packagePath}'
    
    ReactDOM.render(<App />,document.getElementById('app'))
  `;

  return prettier.format(code, {
    parser: 'babel',
    semi: true,
    tabWidth: 2,
    singleQuote: true,
  });
};

module.exports = (package) => {
  const { path: packagePath, name } = package;

  const distPath = path.join(packagePath, 'dist');
  const testPath = path.join(packagePath, '__test__');

  const entryPath = path.join(testPath, 'entry.tsx');
  const virtualModules = new VirtualModulesPlugin({
    [entryPath]: getEntryCode(
      path.join(testPath, 'index.tsx').replace(/\\/g, '/')
    ),
  });

  const config = {};
  const webpackConfig = {
    entry: {
      index: entryPath,
    },
    output: {
      path: distPath,
    },
    devServer: {
      contentBase: [packagePath],
    },
    plugins: [
      virtualModules,
      new HTMLWebpackPlugin({
        title: `Test for ${name}`,
        template: path.join(__dirname, 'index.ejs'),
      }),
    ],
  };

  start(config, webpackConfig);
};
