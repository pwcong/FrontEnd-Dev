const path = require('path');
const rollup = require('rollup');
const ts = require('@rollup/plugin-typescript');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const dts = require('rollup-plugin-dts').default;
const postcss = require('rollup-plugin-postcss');
const terser = require('rollup-plugin-terser').terser;
const filesize = require('rollup-plugin-filesize');

module.exports = async (inputOptions, outputOptions) => {
  const baseExternal = ['react', 'react-dom'];
  const commonExternal = baseExternal.concat(
    Object.keys((inputOptions.package || {})['dependencies'] || {})
      .filter((k) => /@rc/.test(k))
      .map((k) => k)
  );

  const commonPlugins = [resolve(), commonjs(), postcss()];

  const esBundle = await rollup.rollup(
    Object.assign(
      {
        external: commonExternal,
        plugins: [
          ts({
            tsconfig: path.resolve(__dirname, '../../tsconfig.json'),
          }),
          ...commonPlugins,
          filesize(),
        ],
      },
      inputOptions.rollup || {}
    )
  );
  await esBundle.write({
    format: 'es',
    file: path.join(outputOptions.path, 'bundle.es.js'),
  });

  const umdBundle = await rollup.rollup(
    Object.assign(
      {
        external: baseExternal,
        plugins: [
          ts({
            tsconfig: path.resolve(__dirname, '../../tsconfig.json'),
          }),
          terser(),
          ...commonPlugins,
          filesize(),
        ],
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
      ['react-dom']: 'ReactDOM',
    },
  });

  const dtsBundle = await rollup.rollup(
    Object.assign(
      {
        external: commonExternal,
        plugins: [
          dts({
            tsconfig: path.resolve(__dirname, '../../tsconfig.json'),
          }),
          ...commonPlugins,
        ],
      },
      inputOptions.rollup || {}
    )
  );
  await dtsBundle.write({
    format: 'es',
    file: path.join(outputOptions.path, 'bundle.d.ts'),
  });
};
