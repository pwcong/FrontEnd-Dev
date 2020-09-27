const path = require('path');
const program = require('commander');
const prettier = require('prettier');
const inquirer = require('inquirer');
const chalk = require('chalk');

const VirtualModulesPlugin = require('webpack-virtual-modules');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const { getPackagesMap } = require('../utils');
const start = require('../utils/start');
const clean = require('../clean');

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

const startDev = (packagePath) => {
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
        template: path.join(__dirname, 'index.ejs'),
      }),
    ],
  };

  start(config, webpackConfig);
};

async function main() {
  clean();

  const packagesMap = getPackagesMap();

  program.parse(process.argv);
  const args = program.args;
  if (args.length === 1) {
    const currentPackage = packagesMap[args[0]];
    if (!currentPackage) {
      console.log(chalk.red(`component ${args[0]} not found`));
      return;
    }
    startDev(currentPackage.path);
  } else {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'package',
          message: 'Please select the component for development testing',
          choices: Object.keys(packagesMap).map((key) => {
            const package = packagesMap[key];
            return {
              name: `${package.name} (${package.description || '-'})`,
              value: package.path,
            };
          }),
        },
      ])
      .then((answers) => {
        if (!answers.package) {
          return;
        }

        startDev(answers.package);
      });
  }
}

main();
