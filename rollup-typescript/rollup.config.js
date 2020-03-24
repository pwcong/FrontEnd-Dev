const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const terser = require('rollup-plugin-terser').terser;

const pkg = require('./package.json');
const version = pkg.version;
const name = pkg.name;
const func = pkg.function || name;
const author = pkg.author;
const license = pkg.license;

const banner = `/* 
 * ${name}.js v${version}
 * ${new Date().getFullYear()} ${author}
 * @license ${license}
 */
`;

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  input: 'src/index.ts',
  output: {
    file: isProduction ? `dist/${name}.min.js` : `public/${name}.debug.js`,
    format: 'umd',
    sourcemap: true,
    name: func,
    banner: banner
  },
  plugins: [
    resolve(),
    typescript(),
    isProduction &&
      terser()
  ]
};
