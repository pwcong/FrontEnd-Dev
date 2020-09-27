const fs = require('fs-extra');
const { getPackages } = require('../utils');

const clean = (dirs) => {
  if (!dirs) {
    dirs = getPackages().map((p) => p.distPath);
  }

  // clean dist dirs
  dirs.forEach((d) => {
    fs.emptyDirSync(d);
  });
};

if (require.main === module) {
  clean();
}

module.exports = clean;
