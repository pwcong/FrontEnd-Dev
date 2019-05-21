const VirtualModulesPlugin = require('webpack-virtual-modules');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');

const { getPackages } = require('../utils');
const start = require('../utils/start');
const clean = require('../clean');

const packages = getPackages();

const getEntryCode = packagePath => {
  return `
import React from 'react'
import ReactDOM from 'react-dom'
import App from '${packagePath}'

ReactDOM.render(<App />,document.getElementById('app'))
  `;
};

inquirer
  .prompt([
    {
      type: 'list',
      name: 'package',
      message: '请选择开发测试的组件',
      choices: packages.map(package => {
        const json = fs.readJSONSync(path.join(package.path, 'package.json'));
        return {
          name: `${json.name} (${json.description || '-'})`,
          value: package.path
        };
      })
    }
  ])
  .then(answers => {
    if (!answers.package) {
      return;
    }

    clean();

    const packagePath = answers.package;
    const distPath = path.join(packagePath, 'dist');
    const testPath = path.join(packagePath, '__tests__');

    const entryPath = path.join(testPath, 'entry.tsx');
    const virtualModules = new VirtualModulesPlugin({
      [entryPath]: getEntryCode(
        path.join(testPath, 'index.tsx').replace(/\\/g, '/')
      )
    });

    const config = {};
    const webpackConfig = {
      entry: {
        index: entryPath
      },
      output: {
        path: distPath
      },
      plugins: [
        virtualModules,
        new HTMLWebpackPlugin({
          template: path.join(__dirname, 'index.ejs')
        })
      ]
    };

    start(config, webpackConfig);
  });
