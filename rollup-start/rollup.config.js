const resolve = require('@rollup/plugin-node-resolve');
const babel = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('rollup-plugin-terser').terser;

const pkg = require('./package.json');
const version = pkg.version;
const name = pkg.name;
const func = pkg.function || name;
const author = pkg.author;
const license = pkg.license;

const now = new Date();

const banner = `/* 
 * ${name}.js v${version}
 * ${`${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`} ${author}
 * @license ${license}
 */
`;

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  input: 'src/index.js',
  output: {
    file: isProduction ? `dist/index.min.js` : `__test__/index.debug.js`,
    format: 'umd',
    sourcemap: true,
    name: func,
    banner: banner,
  },
  plugins: [resolve(), commonjs(), babel(), isProduction && terser()],
};
