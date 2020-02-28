const ts = require('@wessberg/rollup-plugin-ts');
const html = require('rollup-plugin-html');
const postcss = require('rollup-plugin-postcss-config');
const { string } = require('rollup-plugin-string');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

// Karma configuration
// Generated on Sun Feb 16 2020 01:08:31 GMT+0100 (Central European Standard Time)
module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [{ pattern: 'src/components/**/*.spec.ts', watched: false }],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/components/**/*.ts': ['rollup'],
    },
    rollupPreprocessor: {
      /**
       * This is just a normal Rollup config object,
       * except that `input` is handled for you.
       */
      plugins: [
        commonjs(),
        resolve(),
        ts(),
        html({
          include: 'src/components/**/*.html',
          htmlMinifierOptions: {
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            conservativeCollapse: true,
            removeComments: true,
          },
        }),
        postcss({
          include: 'src/components/**/*.css',
          exclude: 'node_modules/**',
        }),
        string({
          include: 'src/components/**/*.css',
          exclude: 'node_modules/**',
        }),
      ],
      output: {
        format: 'iife', // Helps prevent naming collisions.
        name: 'components', // Required for 'iife' format.
        sourcemap: 'inline', // Sensible for testing.
      },
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'kjhtml'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Firefox'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
