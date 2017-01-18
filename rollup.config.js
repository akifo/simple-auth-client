// Rollup plugins
// import flow from 'rollup-plugin-flow';
// import flow from 'rollup-plugin-flow-no-whitespace';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
// import buble from 'rollup-plugin-buble';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
// import postcss from 'rollup-plugin-postcss';
// import html from 'rollup-plugin-html';

// PostCSS plugins
// import simplevars from 'postcss-simple-vars';
// import nested from 'postcss-nested';
// import cssnext from 'postcss-cssnext';
// import cssnano from 'cssnano';

export default {
  entry: 'src/scripts/main.js',
  dest: 'dist/simple-auth-client.min.js',
  format: 'umd',
  moduleName: 'SimpleAuthClient',
  sourceMap: 'inline',
  plugins: [
    // html({
    //   include: '**/*.html'
    // }),
    // postcss({
      // plugins: [
      //   simplevars(),
      //   nested(),
      //   cssnext({warnForDuplicates: false}),
      //   cssnano()
      // ],
    //   extensions: ['.css'],
    // }),
    resolve({
      jsnext: true,
      browser: true,
    }),
    commonjs(),
    eslint({
      exclude: [
        'src/html/**',
        'src/styles/**'
      ]
    }),
    // flow(),
    // buble(),
    babel({
      exclude: 'node_modules/**',
      presets: 'es2015-rollup',
      plugins: [
        'syntax-flow',
        ['flow-runtime', {
          'assert': true,
          'decorate': true
        }],
        'transform-flow-strip-types'
      ],
    }),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
  ]
};