const path = require('path');
const program = require('commander');
const fs = require('fs-extra');
const chalk = require('chalk');
const build = require('./build');

const { getPackagesMap } = require('../utils');

async function main() {
  const doneList = [];
  const failList = [];

  program.parse(process.argv);
  const args = program.args;

  const packagesMap = getPackagesMap();
  let packages = [];
  if (args.length > 0) {
    args.forEach(a => {
      packagesMap[a] && packages.push(packagesMap[a]);
    });
  } else {
    Object.keys(packagesMap).forEach(k => {
      packages.push(packagesMap[k]);
    });
  }

  for (let i = 0; i < packages.length; i++) {
    const package = packages[i];

    const distPath = path.join(package.path, 'dist');
    let inputPath = path.join(package.path, 'index.tsx');
    if (!fs.existsSync(inputPath)) {
      inputPath = path.join(package.path, 'index.ts');
    }

    if (!fs.existsSync(inputPath)) {
      return;
    }

    fs.emptyDirSync(distPath);

    const json = fs.readJSONSync(path.join(package.path, 'package.json'));

    console.log(chalk.yellow(`start building component ${json.name}`));

    try {
      await build(
        {
          rollup: {
            input: inputPath
          },
          package: json
        },
        {
          path: distPath,
          name: package.componentName
        }
      );
      doneList.push(json.name);
    } catch (e) {
      console.log(chalk.red(e));
      failList.push(json.name);
    }
  }

  if (doneList.length > 0) {
    console.log('\n****** Done ******');
    doneList.forEach(i => {
      console.log(chalk.green(i));
    });
  }

  if (failList.length > 0) {
    console.log('\n****** Failed ******');
    failList.forEach(i => {
      console.log(chalk.red(i));
    });
  }

  console.log('\n');
}

main();
