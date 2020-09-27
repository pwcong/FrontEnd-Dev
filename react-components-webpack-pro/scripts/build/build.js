const path = require('path');
const prettier = require('prettier');
const fs = require('fs-extra');

const { generateDtsBundle } = require('dts-bundle-generator');

const build = require('../utils/build');

const libWebpackConfig = require('../config/webpack.lib.conf');

module.exports = (packages) => {
  const config = {};
  build(
    config,
    packages
      .map((package) => {
        const { path: packagePath, distPath } = package;

        let entryPath = path.join(packagePath, 'index.tsx');
        if (!fs.existsSync(entryPath)) {
          entryPath = path.join(packagePath, 'index.ts');
        }

        if (!fs.existsSync(entryPath)) {
          return;
        }

        const pkg = fs.readJSONSync(path.join(package.path, 'package.json'));

        return {
          entry: {
            index: entryPath,
          },
          output: {
            path: distPath,
            library: pkg.library,
          },
        };
      })
      .filter((d) => !!d),
    libWebpackConfig,
    (config) => {
      const typingString = generateDtsBundle([
        {
          filePath: config.entry.index,
          output: path.join(config.output.path, 'index.d.ts'),
        },
      ])[0];

      fs.outputFileSync(
        path.join(config.output.path, 'index.d.ts'),
        prettier.format(typingString, {
          parser: 'typescript',
          tabWidth: 2,
          singleQuote: true,
        })
      );
    }
  );
};
