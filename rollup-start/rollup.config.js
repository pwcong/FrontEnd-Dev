const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify').uglify;

const pkg = require('./package.json');
const version = process.env.VERSION || pkg.version;
const name = process.env.NAME || pkg.name;
const author = process.env.AUTHOR || pkg.author;

const banner = `/* 
 * @preserve
 * ${name}.js v${version}
 * ${new Date().getFullYear()} - powered by ${author}
 */
`

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {

  input: 'src/main.js',
  output: {
    file: `dist/${name}${isProduction ? '.min.' : '.debug.'}js`,
    format: 'umd',
    name: name,
    banner: banner
  },
  plugins: [
    resolve(),
    commonjs(),
    babel(),
    isProduction && uglify({
      output: {
        comments: function (node, comment) {
          var text = comment.value;
          var type = comment.type;
          if (type == "comment2") {
            return /@preserve|@license|@cc_on/i.test(text);
          }
        }
      }
    })
  ]

}