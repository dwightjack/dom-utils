// Karma configuration
// Generated on Fri Jul 07 2017 15:57:57 GMT+0200 (CEST)

const production = process.env.PRODUCTION === 'true';
const { name } = require('./package.json');

const baseConfig = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
        { pattern: 'src/*.js', included: false },
        { pattern: 'test/utils.js', included: false },
        'test/**/*.spec.js',
        'test/fixtures/*.html'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'src/*.js': ['rollup'],
        'test/**/*.js': ['rollup'],
        'test/fixtures/*.html': ['html2js']
    },

    html2JsPreprocessor: {
        stripPrefix: 'test/fixtures/'
    },

    rollupPreprocessor: {
        plugins: [
            require('rollup-plugin-node-resolve')(), //eslint-disable-line
            require('rollup-plugin-commonjs')(), //eslint-disable-line
            require('rollup-plugin-babel')({ //eslint-disable-line
                plugins: ['external-helpers'],
                exclude: 'node_modules/**'
            }),
            require('rollup-plugin-replace')({ //eslint-disable-line
                'process.env.NODE_DEBUG': !production
            }),
            require('rollup-plugin-stub')(), //eslint-disable-line
            require('rollup-plugin-node-globals')() //eslint-disable-line
        ],
        output: {
            format: 'iife',               // Helps prevent naming collisions.
            name, // Required for 'iife' format.
            sourcemap: 'inline'          // Sensible for testing.
        }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
};

module.exports = (config) => {
    config.set(Object.assign({}, baseConfig, {

         // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG

        logLevel: config.LOG_INFO
    }));
};

module.exports.baseConfig = baseConfig;