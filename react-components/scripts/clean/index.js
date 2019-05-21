const fs = require('fs-extra');
const { getPackages } = require('../utils');

module.exports = () => {
  const packages = getPackages();

  // clean dist dirs
  packages.forEach(p => {
    fs.emptyDirSync(p.distPath);
  });
};
