// Rollup plugins
import path from 'path';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

// version manage
const version = require('../package.json').version;

const banner =
  '/*!\n' +
  ' * SimpleAuthClient.js v' + version + '\n' +
  ' * (c) 2017-' + new Date().getFullYear() + ' Akiho Nagao\n' +
  ' * Released under the MIT License.\n' +
  ' */';

const builds = {
  'web-dev': {
    dest: path.resolve(__dirname, '../dist/simple-auth-client.js'),
    sourceMap: 'inline',
    plugins: [
      'syntax-flow',
      'transform-flow-strip-types'
    ]
  },
  'web-runtime-dev': {
    dest: path.resolve(__dirname, '../dist/simple-auth-client.runtime.js'),
    sourceMap: 'inline',
    plugins: [
      'syntax-flow',
      ['flow-runtime', {
        'assert': true,
        'decorate': true
      }],
      'transform-flow-strip-types'
    ]
  },
  'web-prod': {
    dest: path.resolve(__dirname, '../dist/simple-auth-client.min.js'),
    sourceMap: true,
    plugins: [
      'syntax-flow',
      'transform-flow-strip-types'
    ]
  }
};

function genConfig (opts) {
  const config = {
    entry: path.resolve(__dirname, '../src/scripts/main.js'),
    dest: opts.dest,
    external: opts.external,
    format: 'umd',
    banner: banner,
    moduleName: 'SimpleAuthClient',
    sourceMap: opts.sourceMap,
    plugins: [
      resolve({
        jsnext: true,
        browser: true
      }),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        presets: 'es2015-rollup',
        plugins: opts.plugins
      }),
      replace({
        exclude: 'node_modules/**',
        ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }),
      (process.env.NODE_ENV === 'production' && uglify({
        output: {
          comments: function(node, comment) {
            console.log(comment.type, comment.value);
            var text = comment.value;
            var type = comment.type;
            if (type == 'comment2') {
              // multiline comment
              return /@preserve|\!|@license|@cc_on/i.test(text);
            }
          }
        }
      })),
    ]
  };

  return config;
}

export default genConfig(builds[process.env.TARGET]);
