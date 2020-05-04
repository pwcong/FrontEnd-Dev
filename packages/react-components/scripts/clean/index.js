const fs = require('fs-extra');
const { getPackages } = require('../utils');

const clean = () => {
  const packages = getPackages();

  // clean dist dirs
  packages.forEach(p => {
    fs.emptyDirSync(p.distPath);
  });
};

if (require.main === module) {
  clean();
}

module.exports = clean;
