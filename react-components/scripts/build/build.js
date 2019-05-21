const path = require('path');
const rollup = require('rollup');
const typescript = require('rollup-plugin-typescript');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const uglify = require('rollup-plugin-uglify').uglify;
const filesize = require('rollup-plugin-filesize');

module.exports = async (inputOptions, outputOptions) => {
  const esBundle = await rollup.rollup(
    Object.assign(
      {
        external: ['react', 'react-dom'].concat(
          Object.keys((inputOptions.package || {})['dependencies'] || {})
            .filter(k => /@rc-x/.test(k))
            .map(k => k)
        ),
        plugins: [
          typescript({
            tsconfig: path.resolve(__dirname, '../../tsconfig.json')
          }),
          resolve(),
          commonjs(),
          postcss(),
          filesize()
        ]
      },
      inputOptions.rollup || {}
    )
  );
  await esBundle.write({
    format: 'es',
    file: path.join(outputOptions.path, 'bundle.es.js')
  });

  const umdBundle = await rollup.rollup(
    Object.assign(
      {
        external: ['react', 'react-dom'],
        plugins: [
          typescript({
            tsconfig: path.resolve(__dirname, '../../tsconfig.json')
          }),
          resolve(),
          commonjs(),
          postcss(),
          uglify(),
          filesize()
        ]
      },
      inputOptions.rollup
    )
  );
  await umdBundle.write({
    format: 'umd',
    exports: 'named',
    file: path.join(outputOptions.path, 'bundle.min.js'),
    name: outputOptions.name,
    globals: {
      react: 'React',
      ['react-dom']: 'ReactDOM'
    }
  });
};
