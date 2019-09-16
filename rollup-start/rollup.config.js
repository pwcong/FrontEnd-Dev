const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const terser = require('rollup-plugin-terser').terser;

const pkg = require('./package.json');
const version = process.env.VERSION || pkg.version;
const name = process.env.NAME || pkg.name;
const func = process.env.FUNC || name;
const author = process.env.AUTHOR || pkg.author;
const license = process.env.LICENSE || pkg.license;

const banner = `/* 
 * ${name}.js v${version}
 * ${new Date().getFullYear()} ${author}
 * @license ${license}
 */
`;

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  input: 'src/main.js',
  output: {
    file: isProduction ? `dist/${name}.min.js` : `public/${name}.debug.js`,
    format: 'umd',
    sourcemap: true,
    name: func,
    banner: banner
  },
  plugins: [
    resolve(),
    commonjs(),
    babel(),
    isProduction &&
      terser()
  ]
};
