const path = require('path');
const rollup = require('rollup');
const ts = require('rollup-plugin-typescript');
const { dts } = require('rollup-plugin-dts');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const uglify = require('rollup-plugin-uglify').uglify;
const filesize = require('rollup-plugin-filesize');

module.exports = async (inputOptions, outputOptions) => {
  const commonExternal = ['react', 'react-dom'].concat(
    Object.keys((inputOptions.package || {})['dependencies'] || {})
      .filter(k => /@rc-x/.test(k))
      .map(k => k)
  );
  const commonPlugins = [resolve(), commonjs(), postcss(), filesize()];

  const esBundle = await rollup.rollup(
    Object.assign(
      {
        external: commonExternal,
        plugins: [
          ts({
            tsconfig: path.resolve(__dirname, '../../tsconfig.json')
          }),
          ...commonPlugins
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
          ts({
            tsconfig: path.resolve(__dirname, '../../tsconfig.json')
          }),
          uglify(),
          ...commonPlugins
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

  const dtsBundle = await rollup.rollup(
    Object.assign(
      {
        external: commonExternal,
        plugins: [
          dts({
            tsconfig: path.resolve(__dirname, '../../tsconfig.json')
          })
        ]
      },
      inputOptions.rollup || {}
    )
  );
  await dtsBundle.write({
    format: 'es',
    file: path.join(outputOptions.path, 'bundle.d.ts')
  });
};
