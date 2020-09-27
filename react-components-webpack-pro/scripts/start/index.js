const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');

const { getPackagesMap } = require('../utils');
const clean = require('../clean');
const start = require('./start');

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
    start(currentPackage);
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
              value: package,
            };
          }),
        },
      ])
      .then((answers) => {
        if (!answers.package) {
          return;
        }

        start(answers.package);
      });
  }
}

main();
