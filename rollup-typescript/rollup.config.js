const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('rollup-plugin-terser').terser;
const dts = require('rollup-plugin-dts').default;

const pkg = require('./package.json');
const version = pkg.version;
const name = pkg.name;
const func = pkg.function || name;
const author = pkg.author;
const license = pkg.license;

const now = new Date();
const banner = `/* 
 * ${name}.js v${version}
 * ${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()} ${author}
 * @license ${license}
 */
`;

const isProduction = process.env.NODE_ENV === 'production';

const srcPath = 'src/index.ts';

const commonPlugins = [
  commonjs(), resolve()
]

const config = [
  {
    input: srcPath,
    output: {
      file: isProduction ? `dist/index.min.js` : `__test__/index.debug.js`,
      format: 'umd',
      sourcemap: true,
      name: func,
      banner: banner,
    },
    plugins: [...commonPlugins, typescript(), isProduction && terser()],
  },
];

if (isProduction) {
  config.push({
    input: srcPath,
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [...commonPlugins, dts()],
  });
}

module.exports = config;
