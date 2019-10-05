const path = require('path');
const fs = require('fs-extra');
const klaw = require('klaw-sync');
const changeCase = require('change-case');

const rootPath = (exports.rootPath = path.resolve(__dirname, '../..'));
const packagesPath = (exports.packagesPath = path.join(rootPath, 'packages'));

const getPackages = (exports.getPackages = () => {
  const packages = klaw(packagesPath, {
    depthLimit: 0,
    nofile: true
  })
    .filter(package => {
      return fs.existsSync(path.join(package.path, 'package.json'));
    })
    .map(package => {
      const json = fs.readJSONSync(path.join(package.path, 'package.json'));

      const baseName = path.basename(package.path);

      return Object.assign({}, json, {
        path: package.path.replace(/\\/g, '/'),
        distPath: path.join(package.path, 'dist').replace(/\\/g, '/'),
        testPath: path.join(package.path, '__tests__').replace(/\\/g, '/'),
        baseName,
        componentName: changeCase.pascalCase(baseName)
      });
    });

  return packages;
});

const getPackagesMap = (exports.getPackagesMap = () => {
  const packages = getPackages();

  const map = {};
  packages.forEach(package => {
    map[package.name] = package;
  });

  return map;
});
