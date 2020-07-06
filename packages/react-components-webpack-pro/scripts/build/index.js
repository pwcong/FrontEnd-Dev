const program = require('commander');
const build = require('./build');

const { getPackagesMap } = require('../utils');

function main() {
  program.parse(process.argv);
  const args = program.args;

  const packagesMap = getPackagesMap();
  let packages = [];
  if (args.length > 0) {
    args.forEach((a) => {
      packagesMap[a] && packages.push(packagesMap[a]);
    });
  } else {
    Object.keys(packagesMap).forEach((k) => {
      packages.push(packagesMap[k]);
    });
  }

  build(packages);
}

main();
